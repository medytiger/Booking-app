import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../userContext/userContext';
import './ConditionsGenerales.css'
import Footer from '../../../components/Footer/Footer'
import { motion } from 'framer-motion'
import Navbar from '../../../components/Navbar/Navbar';
import {
    MTN,
    EMAIL_SUPPORT,
    NUMERO_SUPPORT
} from '../../../App'


export default function ConditionsGenerales() {

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
            <motion.div className="container ConditionsGenerales"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >
                <motion.div className='ConditionsContainer'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Conditions Générales d'Utilisation de Nomade</motion.h1>

                    <motion.p>Bienvenue sur Nomade, la plate-forme communautaire qui vous permet de trouver et de louer des logements et des véhicules à l'ère du nomadisme digital. En utilisant notre plate-forme, vous acceptez les conditions générales d'utilisation énoncées ci-dessous. Veuillez les lire attentivement.</motion.p>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>1. Inscription et Compte</motion.h2>
                        <motion.p>
                            <strong>1.1 </strong> Pour utiliser Nomade, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de votre compte et de toutes les activités qui s'y déroulent.
                        </motion.p>

                        <motion.p>
                            <strong>1.2 </strong> Vous acceptez de fournir des informations exactes, à jour et complètes lors de votre inscription sur Nomade.
                        </motion.p>

                        <motion.p>
                            <strong>1.3 </strong> Vous ne pouvez avoir qu'un seul compte Nomade, sauf autorisation expresse de notre part.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>2. Réservation et Paiement</motion.h2>

                        <motion.p>
                            <strong>2.1 </strong> En utilisant Nomade pour réserver un logement ou un véhicule, vous acceptez de payer les frais applicables tels que décrits lors de la réservation. Les paiements doivent être effectués conformément à nos instructions.
                        </motion.p>
                        <motion.p>
                            <strong>2.2 </strong> En cas d'annulation, les politiques d'annulation spécifiques du propriétaire ou du loueur s'appliquent. Veuillez les consulter avant de réserver.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>3. Responsabilités des Utilisateurs</motion.h2>

                        <motion.p>
                            <strong>3.1 </strong> En tant qu'utilisateur de Nomade, vous vous engagez à respecter les lois locales et à ne pas utiliser la plate-forme à des fins illégales ou nuisibles.
                        </motion.p>
                        <motion.p>
                            <strong>3.2 </strong> Vous acceptez de traiter les autres utilisateurs avec respect et de respecter les règles de la communauté Nomade.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>4. Annonces et Transactions</motion.h2>

                        <motion.p>
                            <strong>4.1 </strong> Les propriétaires et les locataires sont responsables de l'exactitude de leurs annonces, y compris les photos et les descriptions.
                        </motion.p>
                        <motion.p>
                            <strong>4.2 </strong> Il est possible que certaines annonces comportent des numéros de contact direct ou d'autres informations pour contacter le vendeur en dehors de notre plateforme. Cela constitue une violation de nos règles, mais nous reconnaissons que cela peut arriver. Si vous choisissez de contacter le vendeur directement pour conclure un accord et que cela se termine mal, veuillez noter que Nomade ne sera pas responsable des conséquences et ne s'impliquera pas dans le litige.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>5. Politique de Confidentialité</motion.h2>

                        <motion.p>
                            <strong>5.1 </strong> En utilisant Nomade, vous acceptez notre politique de confidentialité, qui régit la manière dont nous collectons, utilisons et divulguons vos informations personnelles.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>6. Modifications des Conditions Générales</motion.h2>

                        <motion.p>
                            <strong>6.1 </strong> Nomade se réserve le droit de modifier ces conditions générales à tout moment. Les utilisateurs seront informés des modifications importantes.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>7. Résiliation du Compte</motion.h2>

                        <motion.p>
                            <strong>7.1 </strong> Nomade peut résilier votre compte en cas de non-respect de ces conditions générales ou pour toute autre raison jugée nécessaire.
                        </motion.p>

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >

                        <motion.h2> 8. Limitation de Responsabilité</motion.h2>

                        <motion.p>
                            <strong>8.1 </strong> Nomade ne peut être tenu responsable des dommages indirects, consécutifs, spéciaux ou punitifs résultant de l'utilisation de la plate-forme.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>9. Droit Applicable et Règlement des Litiges</motion.h2>

                        <motion.p>
                            <strong>9.1 </strong> Ces conditions générales sont régies par les lois en vigueur selon le pays d'exercice, et tout litige sera soumis à la compétence exclusive des tribunaux du pays en question.
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
                            En utilisant Nomade, vous acceptez ces conditions générales dans leur intégralité. Si vous avez des questions ou des préoccupations, veuillez nous contacter à {EMAIL_SUPPORT}. Merci de faire partie de la communauté Nomade !
                        </motion.p>
                    </motion.div>


                </motion.div>
            </motion.div>
            <Footer />
        </>
    )
}
