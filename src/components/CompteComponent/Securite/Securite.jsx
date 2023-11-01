import React, { useEffect } from 'react';
import './Securite.css';
import encryption from '../../../assets/encryption.png'
import { motion } from 'framer-motion'


export default function Securite() {
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
        <motion.div className='securite'
            initial='offscreen'
            animate='onscreen'
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <motion.h1>Connexion et sécurité</motion.h1>
            <motion.div className="securiteContent">

                <motion.div className="securiteRightBox card-raduis">
                    <motion.div className="securiteContainer"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.img src={encryption} alt="" loading='lazy' />
                        <motion.div className="securiteText">

                            <motion.p>
                                Cher utilisateur,
                                Nous tenons à vous assurer que nous prenons la sécurité de votre compte très au sérieux. Nous travaillons constamment pour améliorer nos mesures de sécurité et pour protéger vos informations personnelles contre les menaces en ligne.
                                Nous utilisons des technologies de pointe pour protéger vos données, y compris des protocoles de chiffrement avancés pour sécuriser les communications entre votre navigateur et notre serveur. Nous effectuons également des audits réguliers de sécurité pour identifier et corriger les vulnérabilités potentielles.
                            </motion.p>
                            <motion.p>
                                En outre, nous encourageons fortement tous nos utilisateurs à prendre des mesures pour protéger leur propre compte, telles que la création d'un mot de passe fort et unique et la vérification régulière de leur activité de connexion.
                            </motion.p>
                            <motion.p>
                                Nous sommes conscients que la sécurité en ligne est une préoccupation majeure pour nos utilisateurs, et nous sommes déterminés à continuer à investir dans des mesures de sécurité robustes pour protéger vos informations personnelles. Si vous avez des questions ou des préoccupations concernant la sécurité de votre compte, n'hésitez pas à nous contacter.
                                Cordialement,
                                L'équipe de Place
                            </motion.p>

                        </motion.div>
                    </motion.div>
                </motion.div>

            </motion.div>
        </motion.div>
    );
}

