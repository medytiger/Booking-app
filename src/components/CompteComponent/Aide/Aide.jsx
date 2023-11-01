import React, { useEffect } from 'react'
import './Aide.css'
import { motion } from 'framer-motion'


export default function Aide() {
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
        <motion.div className='aide'
            initial='offscreen'
            animate='onscreen'
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <motion.h1>Aide</motion.h1>

            <motion.div className="aideContainer"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.p>
                        Bienvenue sur notre page d'aide ! Si vous avez des questions ou des problèmes concernant nos services, nous sommes là pour vous aider.
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Comment ça marche</motion.h3>
                    <motion.p>
                        [nom de l'entreprise] est une plateforme [décrire brièvement les services offerts]. Pour commencer, vous devez [décrire les étapes à suivre pour commencer à utiliser les services].
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Voici quelques-unes des questions les plus fréquemment posées par nos utilisateurs :</motion.h3>
                    <motion.p>
                        - Comment puis-je créer un compte ?<br /> Pour créer un compte, [décrire les étapes à suivre pour créer un compte].<br /><br />
                        - Comment puis-je me connecter à mon compte ?<br />Pour vous connecter à votre compte, [décrire les étapes à suivre pour se connecter].<br /><br />
                        - Comment puis-je modifier mes informations de profil ?<br /><br />
                        Pour modifier vos informations de profil, [décrire les étapes à suivre pour modifier les informations de profil].<br /><br />
                        - Comment puis-je contacter l'équipe de support ?<br /><br />
                        Pour contacter notre équipe de support, [fournir les coordonnées de contact de l'équipe de support].<br /><br />
                        Si vous avez une question qui n'est pas répertoriée ici, n'hésitez pas à nous contacter à [adresse e-mail de l'entreprise]. Nous serons ravis de vous aider !
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Résolution des problèmes</motion.h3>
                    <motion.p>
                        Si vous rencontrez un problème avec nos services, voici quelques étapes que vous pouvez suivre pour le résoudre :<br /><br />

                        1. Vérifiez que vous êtes connecté à votre compte. <br /><br />
                        2. Assurez-vous que vous utilisez la dernière version de votre navigateur web.<br /><br />
                        3. Effacez les cookies et le cache de votre navigateur.<br /><br />
                        4. Essayez d'utiliser notre service sur un autre appareil ou navigateur.<br /><br />
                        5. Si le problème persiste, contactez notre équipe de support à [adresse e-mail de l'entreprise].<br /><br />

                        Nous espérons que cette page d'aide vous a été utile. Si vous avez d'autres questions ou préoccupations, n'hésitez pas à nous contacter !

                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
