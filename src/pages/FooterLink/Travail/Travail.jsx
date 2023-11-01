import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../userContext/userContext'
import './Travail.css'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import { motion } from 'framer-motion'
import {
    EMAIL_SUPPORT,
} from '../../../App'


export default function Travail() {
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
            <motion.div className="container travail"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >

                <motion.div className='travailConatiner'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Travailler chez Nomade</motion.h1>
                    <motion.p>

                        Bienvenue sur la page dédiée aux opportunités de carrière chez Nomade, la plate-forme communautaire qui réinvente la manière dont les gens vivent et voyagent à l'ère du nomadisme digital. Chez Nomade, nous croyons en la puissance de l'innovation, de la collaboration et de la diversité pour créer un avenir où chacun peut explorer le monde tout en se sentant chez lui, où que ce soit.
                    </motion.p>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Notre Mission</motion.h2>
                        <motion.p>
                            A Nomade, notre mission est de connecter les voyageurs et les nomades digitaux avec des logements, des véhicules exceptionnels, et des terrains à travers le monde, que ce soit pour des locations de courte, moyenne ou longue durée, ou pour des achats de biens immobiliers, automobiles ou de terrain. Nous aspirons à créer des expériences de voyage inoubliables tout en favorisant la compréhension culturelle et la découverte personnelle. Notre objectif est de vous offrir une flexibilité totale dans vos choix de logement, de transport, et d'investissement, pour que vous puissiez vivre pleinement l'ère du nomadisme digital, que ce soit pour une courte escapade, une aventure à long terme, ou un investissement à long terme.                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Notre Culture</motion.h2>
                        <motion.p>
                            Chez Nomade, nous valorisons la créativité, la responsabilité, et le travail d'équipe. Nous croyons en la diversité des compétences et des perspectives, et nous encourageons nos employés à innover, à relever des défis et à évoluer dans un environnement dynamique. Notre culture est basée sur le respect mutuel, la transparence et la passion pour ce que nous faisons.
                        </motion.p>
                    </motion.div>


                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Opportunités de Carrière</motion.h2>
                        <motion.p>
                            Si vous êtes enthousiaste à l'idée de rejoindre une équipe dévouée qui repousse les limites pour offrir des solutions de voyage uniques, Nomade pourrait être l'endroit idéal pour vous. Nous sommes constamment à la recherche de talents exceptionnels pour rejoindre nos équipes dans les domaines suivants : <br /><br />
                        </motion.p>
                        <strong>- Développement informatique et technologie</strong><br />
                        <strong>- Service client et support</strong><br />
                        <strong>- Marketing et communication</strong><br />
                        <strong>- Gestion de produit</strong><br />
                        <strong>- Finance et comptabilité</strong><br />
                        <strong>- Ressources humaines</strong><br />
                        <strong>- Opérations et logistique</strong><br />

                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Pourquoi Travailler chez Nomade ?</motion.h2>
                        <motion.p>
                            <strong>Impact Mondial : </strong>Votre travail chez Nomade contribuera à améliorer la manière dont les gens vivent et voyagent dans le monde entier.<br /><br />
                        </motion.p>
                        <motion.p>
                            <strong>Environnement Collaboratif :</strong> Nous croyons en la collaboration et en l'échange d'idées pour atteindre nos objectifs communs.<br /><br />
                        </motion.p>
                        <motion.p>
                            <strong>Opportunités de Développement :</strong> Nous investissons dans nos employés en offrant des formations continues et des possibilités de croissance professionnelle.<br /><br />
                        </motion.p>
                        <motion.p>
                            <strong>Culture Inclusive :</strong> Chez Nomade, la diversité est célébrée, et nous encourageons chacun à être authentique.<br /><br />
                        </motion.p>
                        <motion.p>
                            <strong>Flexibilité :</strong> Nous comprenons les besoins des nomades digitaux et offrons une certaine flexibilité dans le travail à distance.<br /><br />
                        </motion.p>

                    </motion.div>


                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Postuler</motion.h2>
                        <motion.p>
                            Si vous êtes passionné par notre mission et que vous souhaitez rejoindre notre équipe dynamique, n'hésitez pas à nous envoyer votre CV et une lettre de motivation au <a href="mailto:konateahmed14@gmail.com">{EMAIL_SUPPORT}</a>. Nous sommes toujours à la recherche de talents exceptionnels.
                        </motion.p>
                        <motion.p>
                            Rejoignez Nomade et faites partie de l'avenir du voyage. Ensemble, nous pouvons créer des expériences de voyage exceptionnelles pour les nomades digitaux du monde entier.
                        </motion.p>
                    </motion.div>


                </motion.div>

            </motion.div>
            <Footer />
        </>
    )
}
