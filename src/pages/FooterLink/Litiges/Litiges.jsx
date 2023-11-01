import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../userContext/userContext';
import './Litiges.css'
import Footer from '../../../components/Footer/Footer'
import { motion } from 'framer-motion'
import Navbar from '../../../components/Navbar/Navbar';
import {
    EMAIL_SUPPORT,
    NUMERO_SUPPORT
} from '../../../App'


export default function Litiges() {
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
            <motion.div className="container litige"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >

                <motion.div className='litigeContainer'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Résolution des Litiges</motion.h1>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>1. Processus de Médiation</motion.h2>
                        <motion.p>
                            En cas de litige entre utilisateurs de Nomade, nous encourageons une résolution amiable en premier lieu. Les utilisateurs sont encouragés à communiquer directement les uns avec les autres pour résoudre le différend.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>2. Assistance de Nomade</motion.h2>
                        <motion.p>
                            Si les parties ne parviennent pas à résoudre leur litige de manière amiable, Nomade est là pour vous aider. Vous pouvez contacter notre équipe de support au {EMAIL_SUPPORT} ou au {NUMERO_SUPPORT} pour signaler le litige. Nous nous efforcerons de faciliter la communication entre les parties et de trouver une solution équitable.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>3. Arbitrage</motion.h2>
                        <motion.p>
                            En cas de litige non résolu par le biais de la médiation ou de l'assistance de Nomade, les parties conviennent de recourir à un processus d'arbitrage. L'arbitrage sera effectué conformément aux règles d'arbitrage en vigueur du pays et sera contraignant pour toutes les parties impliquées. Les frais d'arbitrage seront partagés de manière équitable entre les parties.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>4. Juridiction</motion.h2>
                        <motion.p>
                            Tout litige ou réclamation découlant de l'utilisation de Nomade sera soumis à la juridiction exclusive des tribunaux du pays.
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
                            Nous encourageons nos utilisateurs à faire preuve de compréhension et de coopération dans la résolution des litiges. La médiation et l'arbitrage sont des moyens efficaces de résoudre les désaccords de manière équitable et expéditive. Si vous avez des questions ou des préoccupations concernant la résolution des litiges, veuillez nous contacter au {EMAIL_SUPPORT} ou au {NUMERO_SUPPORT}.
                        </motion.p>
                    </motion.div>

                </motion.div>

            </motion.div>
            <Footer />
        </>
    )
}
