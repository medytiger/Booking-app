import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../userContext/userContext'
import './Annonce.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import image from '../../assets/undraw_Collaborators_re_hont.png'
import Button from '../../widgets/Button/Button'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader/Loader'
import { motion } from 'framer-motion';


export default function Annonce() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { ready } = useContext(UserContext);
    if (!ready) {
        return <Loader />
    }

    const containerVariants = {
        offscreen: { y: 20, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1
            }
        }
    };

    const [annonce, setAnnonce] = useState({
        type: 'Immobilier',
        nom: '',
        email: '',
        numero: '',
        titleImmo: '',
        lieuImmo: '',
        descriptionImmo: '',
        budgetImmo: '',
        marqueAuto: '',
        modelAuto: '',
        budgetAuto: '',
        descriptionAuto: '',
        lieuAuto: '',
    });


    const handleAnnonceChange = (event) => {
        const { name, value } = event.target;
        setAnnonce({ ...annonce, [name]: value });
    };

    console.log(annonce);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(annonce.email)) {
            toast.error('Veuillez saisir une adresse e-mail valide.');
            return;
        }

        try {
            const response = await axios.post('/annonce', annonce);

            if (response.status >= 200 && response.status < 300) {
                setAnnonce({
                    ...annonce,
                    type: 'Immobilier',
                    nom: '',
                    email: '',
                    numero: '',
                    description: '',
                    budget: '',
                    lieu: '',
                });

                toast.success('Données envoyées avec succès !');
            } else {
                toast.error('Erreur lors de l\'envoi des données');
            }
        } catch (error) {
            console.error('Erreur inattendue :', error);
        }
    };


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Navbar />
            <motion.div className='container annonceContainer'
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >
                <motion.div className="annonceHead shadow card-raduis"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Avec nous ne cherchez plus, trouvez !!!</motion.h1>
                    <motion.p>
                        Si malgré nos efforts vous ne trouvez pas le bien que vous recherchez, ne vous inquiétez pas. Vous avez la possibilité de poster une annonce sur notre plateforme. C'est simple et rapide ! Partagez les détails de ce que vous cherchez, et notre communauté active d'utilisateurs pourra vous aider à trouver exactement ce que vous désirez. Nous sommes là pour faciliter vos recherches et rendre votre expérience aussi agréable que possible. Ne perdez plus de temps, créez votre annonce dès maintenant et laissez-nous vous aider à réaliser vos souhaits.
                    </motion.p>
                </motion.div>
                <motion.div className="annonceBody"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.div className="annonceLeftBody shadow card-raduis">

                        <motion.form onSubmit={handleSubmit}
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >

                            <motion.div >
                                <h3 className='selectContainerTitre'>Type de bien</h3>
                                <div className="selectContainer">

                                    <div className='selectGroup'>
                                        <input
                                            type='radio'
                                            name='type'
                                            id='Immobilier'
                                            value='Immobilier'
                                            checked={annonce.type === 'Immobilier'}
                                            onChange={handleAnnonceChange}
                                        />
                                        <label className='card-raduis shadow' htmlFor='Immobilier'>
                                            Immobilier
                                        </label>
                                    </div>
                                    <div className='selectGroup'>
                                        <input
                                            type='radio'
                                            name='type'
                                            id='Automobile'
                                            value='Automobile'
                                            checked={annonce.type === 'Automobile'}
                                            onChange={handleAnnonceChange}
                                        />
                                        <label className='card-raduis shadow' htmlFor='Automobile'>
                                            Automobile
                                        </label>
                                    </div>

                                </div>
                            </motion.div>

                            <motion.div className="formGroupe">
                                <h3>Nom et prénon(s) </h3>
                                <input
                                    type="text"
                                    name="nom"
                                    value={annonce.nom}
                                    onChange={handleAnnonceChange}
                                    placeholder='Ahmed Konaté'
                                />
                            </motion.div>

                            <motion.div className="formGroupe">
                                <h3>Email</h3>
                                <input
                                    type="email"
                                    name="email"
                                    value={annonce.email}
                                    onChange={handleAnnonceChange}
                                    placeholder='exemple@gmail.com'
                                />
                            </motion.div>

                            <motion.div className="formGroupe">
                                <h3>Numéro de téléphone</h3>
                                <input
                                    type="text"
                                    name="numero"
                                    value={annonce.numero}
                                    onChange={handleAnnonceChange}
                                    placeholder='+225 0102030405'
                                />
                            </motion.div>

                            <motion.div className="formGroupe">
                                <h3>Description</h3>
                                <textarea
                                    name="description"
                                    value={annonce.description}
                                    onChange={handleAnnonceChange}
                                    cols="30"
                                    rows="7"
                                    placeholder='Exemple: Je cherche un appartement de 3 pièces avec minimum deux douches ...'
                                ></textarea>
                            </motion.div>

                            <motion.div className="formGroupe">
                                <h3>Budget</h3>
                                <input
                                    type="text"
                                    name="budget"
                                    value={annonce.budget}
                                    onChange={handleAnnonceChange}
                                    placeholder='1 000 000'
                                />
                            </motion.div>

                            <motion.div className="formGroupe">
                                <h3>Lieu</h3>
                                <input
                                    type="text"
                                    name="lieu"
                                    value={annonce.lieu}
                                    onChange={handleAnnonceChange}
                                    placeholder='Abidjan (Cocody , Yopougon , Plateau...)'
                                />
                            </motion.div>

                            <Button type="submit">Poster</Button>

                        </motion.form>

                    </motion.div>
                    <motion.div className="annonceRightBody shadow card-raduis">
                        <img src={image} alt="" />
                    </motion.div>
                </motion.div>
            </motion.div>
            <Footer />
        </>
    )
}
