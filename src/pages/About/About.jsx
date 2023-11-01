import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../userContext/userContext';
import './About.css'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';


export default function About() {
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
            <motion.div className="aboutConatiner container"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >

                <motion.div className='about'>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h1>Nomade</motion.h1>
                        <motion.p>
                            À l'heure actuelle, la quête d'un logement ou d'un moyen de transport est un défi de taille pour la population en général. Tant les particuliers que les professionnels de l'immobilier et de l'automobile se retrouvent confrontés à des obstacles majeurs. Dans un contexte où ces besoins cruciaux demeurent insatisfaits, il devient impératif de trouver une solution à la fois flexible et conviviale, répondant ainsi aux attentes et aux exigences des individus tout en facilitant le quotidien des acteurs de ces secteurs.                        </motion.p>
                        <motion.p>
                            Que vous soyez un professionnel cherchant à maximiser l'efficacité de votre activité ou un particulier en quête de votre prochain lieu de vie idéal ou du véhicule parfait, l'idée d'une solution plus flexible qui rassemble l'ensemble de ces besoins au sein d'un hub urbain représente sans aucun doute une option idéale et conviviale.                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Qui sommes nous ?</motion.h2>
                        <motion.p>
                            Etant le résultat de nombreuses heures de travail acharné, de réflexion approfondie et de passion.
                            Nomade est bien plus qu'une simple plate-forme : c'est une communauté dédiée à la gestion et à la prestation de services dans les domaines immobilier et automobile. Notre vision est de faciliter votre vie à l'ère du nomadisme digital en vous proposant des solutions flexibles, que vous cherchiez des locations de courte, moyenne ou longue durée, ou que vous souhaitiez faire des achats importants.
                        </motion.p>
                        <motion.p>
                            Cette plateforme communautaire se présente comme une réponse complète aux besoins en matière de services immobiliers et automobiles.    <br />
                            La conception de Nomade vise à satisfaire aussi bien les agences immobilières et les acteurs de l'industrie automobile que la population générale à la recherche de biens immobiliers et automobiles. Nous croyons en une expérience utilisateur exceptionnelle, avec des fonctionnalités intuitives et une variété d'options pour tous les utilisateurs. Cette approche vise à simplifier la vie de chacun, en transformant la recherche de biens immobiliers et automobiles en une expérience fluide et agréable.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Quelle est notre mission ?</motion.h2>
                        <motion.p>
                            Chez Nomade, notre mission est de vous accompagner à chaque étape de votre parcours, que ce soit pour trouver le lieu de vos rêves, gérer vos biens de manière optimale ou vous aider à vous déplacer en toute tranquillité. Explorez notre plate-forme et découvrez comment nous pouvons vous aider à vivre pleinement l'expérience du nomadisme digital.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Quelles sont nos offres ?</motion.h2>
                        <motion.p>
                            Nos offres incluent des locations et achats d'appartements, de maisons, de véhicules, de terrain, ainsi que des services de gestion locative pour les propriétaires et gestionnaires de biens. Nous travaillons sans relâche pour vous offrir des solutions transparentes, pratiques et adaptées à votre style de vie nomade.                        </motion.p>
                    </motion.div>

                </motion.div>

            </motion.div>
            <Footer />

        </>
    )
}
