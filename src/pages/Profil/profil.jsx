import React, { useContext, useEffect } from 'react'
import './Profil.css'
import Navbar from '../../components/Navbar/Navbar'
import Breadcrumbs from '../../widgets/Breadcrumbs/Breadcrumbs'
import Footer from '../../components/Footer/Footer'
import { UserContext } from '../../userContext/userContext'
import { Navigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import profilImg from '../../assets/profil.png'
import avatar from '../../assets/avatar.jpg'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'

export default function profil() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        user,
        ready,
        userData,
        setUserData,
        updateUserProfil,
        handleImageUpload,
        profilImage,
        handleInputChange,
        imailButton, setImailButton,
        facebookButton,
        setFacebookButton,
        tiktokButton,
        settiktokButton,
        linkedineButton,
        setLinkedineButton,
        typeButton,
        setTypeButton,
        nomButton,
        setNomButton,
        nomEntrepriseButton,
        setNomEntrepriseButton,
        prefixeButton,
        setPrefixeButton,
        numeroButton,
        setNumeroButton,
        genreButton,
        setGenreButton,
        dateButton,
        setDateButton,
        domaineActiviteButton,
        setDomaineActiviteButton,
        descriptionActiviteButton,
        setDescriptionActiviteButton,
        lieuButton,
        setLieuButton,
    } = useContext(UserContext);


    if (!ready) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to={'/'} />
    }


    const showImailupdate = (e) => {
        e.preventDefault()
        setImailButton(!imailButton)
    }

    const showFacebookUpdate = (e) => {
        e.preventDefault()
        setFacebookButton(!facebookButton)
    }

    const showTiktokUpdate = (e) => {
        e.preventDefault()
        settiktokButton(!tiktokButton)
    }

    const showLinkedinUpdate = (e) => {
        e.preventDefault()
        setLinkedineButton(!linkedineButton)
    }

    const showTypeUpdate = (e) => {
        e.preventDefault();
        setTypeButton(!typeButton);
    };

    const showNomUpdate = (e) => {
        e.preventDefault();
        setNomButton(!nomButton);
    };

    const showNomEntrepriseUpdate = (e) => {
        e.preventDefault();
        setNomEntrepriseButton(!nomEntrepriseButton);
    };

    const showPrefixeUpdate = (e) => {
        e.preventDefault();
        setPrefixeButton(!prefixeButton);
    };

    const showNumeroUpdate = (e) => {
        e.preventDefault();
        setNumeroButton(!numeroButton);
    };

    const showGenreUpdate = (e) => {
        e.preventDefault();
        setGenreButton(!genreButton);
    };

    const showDateUpdate = (e) => {
        e.preventDefault();
        setDateButton(!dateButton);
    };

    const showDomaineActiviteUpdate = (e) => {
        e.preventDefault();
        setDomaineActiviteButton(!domaineActiviteButton);
    };

    const showDescriptionActiviteUpdate = (e) => {
        e.preventDefault();
        setDescriptionActiviteButton(!descriptionActiviteButton);
    };

    const showLieuUpdate = (e) => {
        e.preventDefault();
        setLieuButton(!lieuButton);
    };


    const avatarImg = user.photo ? `http://localhost:5000/${user.photo}` : avatar;


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
            <motion.div className="container profil"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >
                <Breadcrumbs />

                <motion.div className="profilContent">

                    <motion.div className="profilHead"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >

                        <motion.div className="imagecontainer"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
                            <motion.div className="input">
                                <motion.input type="file" accept="image/*" onChange={handleImageUpload} />
                                <ion-icon name="add-outline" ></ion-icon>
                            </motion.div>
                            <motion.img src={avatarImg} className='shadow' alt="" />
                            {profilImage && <motion.img className='shadow' src={`http://localhost:5000/${user.photo}`} alt="Profil" loading='lazy' />}
                        </motion.div>

                        <motion.div className="nomPrenom"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
                            <motion.h1>{user.nom}</motion.h1>
                            <motion.span className='identifiant card-raduis'>Identifiant : {user._id}</motion.span>
                            <motion.span className='email'>{user.email}</motion.span>
                            <motion.div className="sous-titre">
                                <motion.span>{user.domaineActivite}</motion.span>
                                |
                                <motion.span >{user.lieu}</motion.span>
                            </motion.div>
                            <motion.span className='numero'>+{user.prefixe}{user.numero}</motion.span>
                        </motion.div>

                    </motion.div>

                    <motion.div className="profilMain">

                        <motion.div className='form'>
                            <motion.div className="profilLeftBox">

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Email</motion.span>
                                    <motion.span className='email'>{user.email}</motion.span>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >

                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Nom</motion.span>
                                    <motion.h5>{user.nom ? user.nom : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {nomButton && <motion.input type="text" name="nom" value={userData.nom} onChange={handleInputChange} placeholder='modifier le nom' />}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {nomButton ? (
                                                <motion.button type='submit' className='updateButton'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showNomUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Date de naissance</motion.span>
                                    <motion.h5>{user.date ? user.date : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {dateButton && (
                                            <motion.input type="text" name="date" value={userData.date} onChange={handleInputChange} placeholder="Entrez votre date de naissance" />
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {dateButton ? (
                                                <motion.button type='submit' className='updateButton'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showDateUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Genre</motion.span>
                                    <motion.h5>{user.genre ? user.genre : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {genreButton && (
                                            <motion.div className="selectContainer"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.div className="selectGroup"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.input type="radio" name="genre" id="Homme" checked={userData.genre === "Homme"} onChange={(e) => setUserData({ ...userData, genre: "Homme" })} />
                                                    <motion.label className="card-raduis shadow" htmlFor="Homme">
                                                        Homme
                                                    </motion.label>
                                                </motion.div>
                                                <motion.div className="selectGroup"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.input type="radio" name="genre" id="Femme" checked={userData.genre === "Femme"} onChange={(e) => setUserData({ ...userData, genre: "Femme" })} />
                                                    <motion.label className="card-raduis shadow" htmlFor="Femme">
                                                        Femme
                                                    </motion.label>
                                                </motion.div>
                                                <motion.div className="selectGroup"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.input type="radio" name="genre" id="Non" checked={userData.genre === "Non défini"} onChange={(e) => setUserData({ ...userData, genre: "Non défini" })} />
                                                    <motion.label className="card-raduis shadow" htmlFor="Non">
                                                        Non défini
                                                    </motion.label>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {genreButton ? (
                                                <motion.button type='submit' className='updateButton checkForm'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showGenreUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>

                                    </motion.form>
                                </motion.div>


                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Type de compte</motion.span>
                                    <motion.h5>{user.type ? user.type : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {typeButton && (
                                            <motion.div className="selectContainer"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.div className="selectGroup"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.input type="radio" name="type" id="Personnel" checked={userData.type === "Personnel"} onChange={(e) => setUserData({ ...userData, type: "Personnel" })} />
                                                    <motion.label className="card-raduis shadow" htmlFor="Personnel">
                                                        Personnel
                                                    </motion.label>
                                                </motion.div>
                                                <motion.div className="selectGroup"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.input type="radio" name="type" id="Entreprise" checked={userData.type === "Entreprise"} onChange={(e) => setUserData({ ...userData, type: "Entreprise" })} />
                                                    <motion.label className="card-raduis shadow" htmlFor="Entreprise">
                                                        Entreprise
                                                    </motion.label>
                                                </motion.div>
                                                <motion.div className="selectGroup"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.input type="radio" name="type" id="hybride" checked={userData.type === "Hybride"} onChange={(e) => setUserData({ ...userData, type: "Hybride" })} />
                                                    <motion.label className="card-raduis shadow" htmlFor="hybride">
                                                        Hybride
                                                    </motion.label>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {typeButton ? (
                                                <motion.button button type='submit' className='updateButton checkForm'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showTypeUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Nom d'entreprise</motion.span>
                                    <motion.h5>{user.nomEntreprise ? user.nomEntreprise : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {nomEntrepriseButton && (
                                            <motion.input type="text" name="nomEntreprise" value={userData.nomEntreprise} onChange={handleInputChange} placeholder="Changer le nom de l'entreprise" />
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {nomEntrepriseButton ? (
                                                <motion.button type='submit' className='updateButton' >Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showNomEntrepriseUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Domaine d'activité</motion.span>
                                    <motion.h5>{user.domaineActivite ? user.domaineActivite : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {domaineActiviteButton && (
                                            <motion.input type="text" name="domaineActivite" value={userData.domaineActivite} onChange={handleInputChange} placeholder="Changer le domaine d'activité" />
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {domaineActiviteButton ? (
                                                <motion.button type='submit' className='updateButton' >Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showDomaineActiviteUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Décrivez votre activité</motion.span>
                                    <motion.h5>{user.descriptionActivite ? user.descriptionActivite : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {descriptionActiviteButton && (
                                            <motion.textarea
                                                type="text"
                                                name="descriptionActivite"
                                                value={userData.descriptionActivite}
                                                onChange={handleInputChange}
                                                placeholder="Changer la description de votre entreprise"
                                            ></motion.textarea>
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {descriptionActiviteButton ? (
                                                <motion.button type='submit' className='updateButton'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showDescriptionActiviteUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Indicatif</motion.span>
                                    <motion.h5>{user.prefixe ? `+${user.prefixe}` : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {prefixeButton && (
                                            <motion.input type="number" name="prefixe" value={userData.prefixe} onChange={handleInputChange} placeholder="Changer d'indicatif" />
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {prefixeButton ? (
                                                <motion.button type='submit' className='updateButton' >Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showPrefixeUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Contact</motion.span>
                                    <motion.h5>{user.numero ? user.numero : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {numeroButton && (
                                            <motion.input type="number" name="numero" value={userData.numero} onChange={handleInputChange} placeholder="Changer de numéro" />
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {numeroButton ? (
                                                <motion.button type='submit' className='updateButton' >Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showNumeroUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Adresse</motion.span>
                                    <motion.h5>{user.lieu ? user.lieu : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {lieuButton && (
                                            <motion.input type="text" name="lieu" value={userData.lieu} onChange={handleInputChange} placeholder="Changer d'adresse" />
                                        )}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {lieuButton ? (
                                                <motion.button type='submit' className='updateButton'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showLieuUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>Facebook</motion.span>
                                    <motion.h5>{user.facebook ? user.facebook : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {facebookButton && <motion.input type="text" name="facebook" value={userData.facebook} onChange={handleInputChange} placeholder='modifier votre Facebook' />}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {facebookButton ? (
                                                <motion.button type='submit' className='updateButton'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showFacebookUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>TikTok</motion.span>
                                    <motion.h5>{user.tiktok ? user.tiktok : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {tiktokButton && <motion.input type="text" name="tiktok" value={userData.tiktok} onChange={handleInputChange} placeholder='modifier votre TikTok' />}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {tiktokButton ? (
                                                <motion.button className='updateButton' type='submit'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showTiktokUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                                <motion.div className="item"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span>LinkedIn</motion.span>
                                    <motion.h5>{user.linkedin ? user.linkedin : "Non défini"}</motion.h5>
                                    <motion.form onSubmit={updateUserProfil}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {linkedineButton && <motion.input type="text" name="linkedin" value={userData.linkedin} onChange={handleInputChange} placeholder='modifier votre LinkedIn' />}
                                        <motion.div className="inputButton"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {linkedineButton ? (
                                                <motion.button className='updateButton' type='submit'>Enregistrer</motion.button>
                                            ) : (
                                                <motion.button onClick={showLinkedinUpdate}>Modifier</motion.button>
                                            )}
                                        </motion.div>
                                    </motion.form>
                                </motion.div>

                            </motion.div>


                        </motion.div>

                        <motion.div className="profilRightBox card-raduis"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >

                            <motion.img src={profilImg} alt="" loading='lazy' />

                            <motion.p>
                                Nous sommes heureux de vous compter parmi nos utilisateurs. Nous tenons à vous informer que vous pouvez modifier votre profil à tout moment en accédant à votre compte. N'hésitez pas à mettre à jour vos informations personnelles, votre photo de profil et tout autre détail que vous souhaitez partager avec la communauté.
                            </motion.p>
                            <motion.p>
                                Nous vous encourageons également à procéder à la vérification de votre identité pour renforcer la confiance entre les utilisateurs de notre plateforme. La vérification de l'identité est un processus simple et rapide qui peut être effectué en fournissant une pièce d'identité valide. Nous prenons la sécurité et la confidentialité de vos informations très au sérieux, et nous ne partagerons jamais vos données avec des tiers sans votre consentement.
                            </motion.p>
                            <motion.p>
                                Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider à profiter pleinement de notre plateforme.
                            </motion.p>
                        </motion.div>
                    </motion.div>

                </motion.div>

            </motion.div>
            <Footer />
        </>
    )
}