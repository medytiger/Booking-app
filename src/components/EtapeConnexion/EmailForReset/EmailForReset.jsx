import React, { useContext, useState } from 'react'
import './EmailForReset.css'
import { UserContext } from '../../../userContext/userContext';
import Button from '../../../widgets/Button/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';


export default function EmailForReset() {
    const containerVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 2
            }
        }
    };

    const {
        loginSEtape, setLoginSEtape,
    } = useContext(UserContext);
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/forgot-password', { email })
            .then(response => {
                setEmail(''); // Réinitialise l'adresse e-mail
                toast.success('E-mail envoyé avec succès');
                setLoginSEtape(loginSEtape - 1)
            })
            .catch(error => {
                toast.error(error.response.data.message);
            });
    };


    const loginLastStep = () => {
        setLoginSEtape(loginSEtape - 1)
    }

    return (
        <motion.form
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <h2>Réinitialisez votre mot de passe</h2>

            <span>Veillez Vérifier le mot de passe</span>

            <div className="signInputSection">
                <input className='btn-raduis' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <Button type="submit" className='signButton' onClick={handleSubmit}>
                Envoyer
            </Button>


            <div className="back" onClick={() => loginLastStep()}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
        </motion.form>
    )
}
