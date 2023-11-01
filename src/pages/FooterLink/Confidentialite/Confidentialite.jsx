import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../userContext/userContext';
import './Confidentialite.css'
import Footer from '../../../components/Footer/Footer'
import { motion } from 'framer-motion'
import Navbar from '../../../components/Navbar/Navbar';


export default function Confidentialite() {

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
            <motion.div className="container Confidentialite"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >
                <motion.div className='ConfidentialiteContainer'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Confidentialité sur Nomade</motion.h1>
                    <motion.p>
                        Bienvenue dans la section Confidentialité de Nomade. Nous respectons votre vie privée et nous engageons à protéger vos données personnelles. Découvrez comment nous gérons vos informations personnelles et comment nous les utilisons.
                    </motion.p>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Vos Données Personnelles</motion.h2>
                        <motion.p>
                            Nous collectons uniquement les données personnelles nécessaires pour fournir nos services. Vous avez le contrôle sur vos informations, y compris la possibilité de les mettre à jour ou de les supprimer de votre compte.
                        </motion.p>
                    </motion.div>


                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Utilisation des Données</motion.h2>
                        <motion.p>
                            Nous utilisons vos données personnelles conformément à notre politique de confidentialité. Vos informations ne seront jamais utilisées à des fins autres que celles spécifiées, et nous ne les vendrons jamais à des tiers.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2> Consentement</motion.h2>
                        <motion.p>
                            Avant de collecter vos données personnelles, nous vous demanderons toujours votre consentement explicite. Vous avez le droit de refuser ou de retirer votre consentement à tout moment.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.p>
                            Chez Nomade, nous sommes engagés à vous offrir la meilleure expérience possible tout en protégeant vos informations financières, en garantissant votre sécurité et en respectant votre vie privée. Si vous avez des questions ou des préoccupations concernant la facturation, la sécurité ou la confidentialité, n'hésitez pas à nous contacter à [adresse e-mail de contact]. Nous sommes là pour vous aider et répondre à vos besoins spécifiques pour chacun de ces domaines.
                        </motion.p>
                    </motion.div>

                </motion.div>
            </motion.div>

            <Footer />
        </>

    )
}
