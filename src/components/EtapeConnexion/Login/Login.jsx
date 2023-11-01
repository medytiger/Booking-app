import React, { useContext, useState } from 'react'
import './Login.css'
import { UserContext } from '../../../userContext/userContext';
import Button from '../../../widgets/Button/Button';
import { motion } from 'framer-motion';


export default function Login() {
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
        loginUser,
        loginEmail, setLoginEmail,
        loginPassword, setLoginPassword,
        loginSEtape, setLoginSEtape,
    } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false); // État pour gérer l'affichage du mot de passe


    const loginNextStep = () => {
        setLoginSEtape(loginSEtape + 1)
    }

    return (
        <motion.form onSubmit={loginUser}
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <h2>Connexion</h2>
            <div className="social-contiainer">
                <a href="#" className='facebook'><ion-icon name="logo-facebook"></ion-icon></a>
                <a href="#" className='google'><ion-icon name="logo-google"></ion-icon></a>
                <a href="#" className='linkedin'><ion-icon name="logo-linkedin"></ion-icon></a>
            </div>
            <span>ou utilise ton compte</span>

            <div className="signInputSection loginInputGroup">
                <input className='btn-raduis' type="email" placeholder='Email' value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            </div>
            <div className="signInputSection loginInputGroup">
                <input className='btn-raduis' type={showPassword ? 'text' : 'password'} placeholder='Mot de passe' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} autoComplete="current-password" />

                {showPassword ? (
                    <ion-icon
                        name="eye-outline"
                        onClick={() => setShowPassword(false)} // Cliquez pour masquer le mot de passe
                    ></ion-icon>
                ) : (
                    <ion-icon
                        name="eye-off-outline"
                        onClick={() => setShowPassword(true)} // Cliquez pour afficher le mot de passe
                    ></ion-icon>
                )}

            </div>

            <a className='forgotPassword' onClick={() => loginNextStep()}>Mot de passe oublié</a>

            <Button type="submit" className='signButton'>
                se connecter
            </Button>
        </motion.form>
    )
}
