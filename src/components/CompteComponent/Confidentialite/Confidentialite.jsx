import React, { useEffect } from 'react'
import './Confidentialite.css'
import { motion } from 'framer-motion'


export default function Confidentialite() {
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

        <motion.div className='confidentialite'
            initial='offscreen'
            animate='onscreen'
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <motion.h1>Politique de confidentialite</motion.h1>

            <motion.div className="confidentialiteContainer"
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
                        Chez Nomade, nous prenons très au sérieux la confidentialité de nos utilisateurs. Cette politique de confidentialité décrit les informations que nous collectons, comment nous les utilisons et les partageons, et les choix que vous avez en ce qui concerne ces informations.
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Collecte d'informations</motion.h3>
                    <motion.p>
                        Nous collectons des informations lorsque vous utilisez notre site web ou nos services. Cela peut inclure des informations telles que votre nom, votre adresse e-mail, votre adresse IP et des informations sur votre navigateur et votre appareil.
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Utilisation d'informations</motion.h3>
                    <motion.p>
                        Nous utilisons les informations que nous collectons pour fournir et améliorer nos services, pour communiquer avec vous et pour personnaliser votre expérience.
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Partage d'informations</motion.h3>
                    <motion.p>
                        Nous ne partageons pas vos informations personnelles avec des tiers, sauf si cela est nécessaire pour fournir nos services ou si nous y sommes légalement obligés.
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Vos choix</motion.h3>
                    <motion.p>
                        Vous pouvez choisir de ne pas fournir certaines informations ou de demander la suppression de vos informations personnelles en nous contactant à [adresse e-mail de l'entreprise].
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Sécurité des informations</motion.h3>
                    <motion.p>
                        Nous prenons des mesures de sécurité appropriées pour protéger vos informations contre l'accès non autorisé ou la modification.
                    </motion.p>
                </motion.div>

                <motion.div className="item"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Modifications de cette politique</motion.h3>
                    <motion.p>
                        Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous recommandons de consulter cette page régulièrement pour rester informé des changements.
                        Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, veuillez nous contacter à <a href="konateahmed14@gmail.com" target="_blank" rel="noopener noreferrer"></a>
                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
