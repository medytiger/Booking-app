import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../userContext/userContext';
import './Securite.css'
import Footer from '../../../components/Footer/Footer'
import { motion } from 'framer-motion'
import Navbar from '../../../components/Navbar/Navbar';


export default function Securite() {
    const { ready } = useContext(UserContext)
    if (!ready) {
        return <Loader />
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            <Navbar />
            <motion.div className="container Securite"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >

                <motion.div className='SecuriteConatiner'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Sécurité sur Nomade</motion.h1>
                    <motion.p>
                        Bienvenue dans la section Sécurité de Nomade. Votre sécurité est notre priorité absolue. Découvrez comment nous protégeons nos utilisateurs et maintenons un environnement sûr pour tous.
                    </motion.p>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Protection des Utilisateurs</motion.h2>
                        <motion.p>
                            Nous effectuons des vérifications de sécurité régulières pour garantir que les comptes sont authentiques. Notre équipe dédiée à la sécurité surveille les activités suspectes.
                        </motion.p>
                    </motion.div>


                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Protection des Données</motion.h2>
                        <motion.p>
                            Vos données personnelles sont stockées de manière sécurisée et ne sont pas partagées sans votre consentement. Nous utilisons des technologies de pointe pour protéger vos informations.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Signalement des Problèmes</motion.h2>
                        <motion.p>
                            Si vous rencontrez un problème ou suspectez un comportement inapproprié sur Nomade, nous encourageons le signalement. Nous enquêterons sur toutes les préoccupations liées à la sécurité et prendrons les mesures appropriées.
                        </motion.p>
                    </motion.div>
                </motion.div>

            </motion.div>
            <Footer />
        </>
    )
}
