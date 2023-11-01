import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../userContext/userContext';
import './Facturation.css'
import Footer from '../../../components/Footer/Footer'
import { motion } from 'framer-motion'
import Navbar from '../../../components/Navbar/Navbar';


export default function Facturation() {

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
            <motion.div className="container Facturation"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >
                <motion.div className='FacturationConatiner'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Facturation sur Nomade</motion.h1>
                    <motion.p>
                        Bienvenue dans la section Facturation de Nomade. Il est important de noter qu'actuellement, sur notre plateforme, nous ne proposons pas de moyen de paiement direct, car nous croyons en la sécurité des paiements en personne.
                    </motion.p>
                    <motion.p>
                        Pour les paiements à distance, seul Nomade peut vous guider sur la procédure de paiement afin de garantir la sécurité de l'acheteur et du vendeur.
                    </motion.p>
                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Paiements Sécurisés</motion.h2>
                        <motion.p>
                            Lorsque vous envisagez des transactions de paiement à distance sur Nomade, nous mettons tout en œuvre pour garantir la sécurité de ces transactions. Notre équipe est là pour vous guider à chaque étape du processus.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Frais et Tarifs</motion.h2>
                        <motion.p>
                            Lorsque vous effectuez une réservation ou une transaction sur Nomade, les frais et les tarifs sont clairement indiqués avant la confirmation. Vous saurez toujours exactement ce que vous paierez, sans frais cachés ni surprises désagréables.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Facturation Transparente</motion.h2>
                        <motion.p>
                            Nous fournissons des reçus détaillés pour toutes les transactions effectuées sur Nomade. Vous pouvez consulter et télécharger vos factures à tout moment en nous contactant.
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
                            Chez Nomade, la sécurité et la transparence de vos paiements sont au cœur de notre engagement. Si vous avez des questions concernant la procédure de paiement, n'hésitez pas à contacter notre équipe de support qui se fera un plaisir de vous guider tout au long du processus.
                            N'hésitez pas à personnaliser davantage ce texte en fonction de vos besoins spécifiques.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
            <Footer />
        </>
    )
}
