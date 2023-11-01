import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../userContext/userContext';
import './CentreAide.css'
import Footer from '../../../components/Footer/Footer'
import { motion } from 'framer-motion'
import Navbar from '../../../components/Navbar/Navbar';
import {
    MTN,
    EMAIL_SUPPORT,
    NUMERO_SUPPORT
} from '../../../App'



export default function CentreAide() {
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
            <motion.div className="container CentreAide"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >
                <motion.div className='CentreAideContainer'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Centre d'Aide Nomade</motion.h1>

                    <motion.p>
                        Bienvenue au Centre d'Aide de Nomade, votre ressource complète pour obtenir de l'aide, des réponses à vos questions et des conseils sur l'utilisation de notre plate-forme. Chez Nomade, nous sommes déterminés à rendre votre expérience utilisateur aussi fluide que possible, et notre Centre d'Aide est conçu pour vous guider à chaque étape de votre voyage.
                    </motion.p>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Comment Utiliser le Centre d'Aide</motion.h2>
                        <motion.p>
                            Le Centre d'Aide est organisé de manière à ce que vous puissiez facilement trouver les informations dont vous avez besoin. Vous pouvez parcourir les catégories ci-dessous pour accéder aux articles pertinents et trouver des réponses spécifiques à vos questions.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Foire aux Questions (FAQ)</motion.h2>
                        <motion.p>
                            Notre Foire aux Questions (FAQ) est constamment mise à jour pour inclure les questions les plus courantes posées par nos utilisateurs. Avant de nous contacter, consultez notre FAQ pour voir si votre question a déjà une réponse.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.strong><h3>Foire aux questions (FAQ) : réponses aux questions courantes.</h3></motion.strong>

                        <motion.h4>Catégories Populaires</motion.h4>
                        <motion.h4><strong>1. Réservations et Paiements</strong></motion.h4>
                        <motion.strong><h4>1.1 Comment réserver ou acheter un logement ou un véhicule ?</h4> </motion.strong>
                        <p>
                            - En arrivant sur la page d'un bien vous verez à droite les possibilité de réservation. <br />
                            - Vous aurez la possibilité <strong>d'appeller</strong> directemént pour pouvoir réserver ou proceder à l'achat.<br />
                            - Vous aurez aussi la possibilité <strong>d'envoyer un Emeil</strong> en laissant vos coordonners.<br />
                            - Vous aurez également la possibilité de <strong>remplir un formulaire</strong> et faire votre réservation.<br />
                            - Puis la dernières étape est de nous contacter directement <strong>par WhatsApp</strong> et faire votre réservation
                        </p>
                        <motion.strong><h4>1.2 Comment effectuer un paiement en toute sécurité sur Nomade ?</h4> </motion.strong>
                        <p>Sur Nomade, il est important de noter qu'il n'y a actuellement pas de moyen de paiement direct sur notre plateforme, car nous croyons en la sécurité des paiements en personne.</p>
                        <p>Pour les paiements à distance, seul Nomade peut vous guider sur la procédure de paiement afin de garantir la sécurité de l'acheteur et du vendeur.</p>
                        <p>
                            Il est possible que certaines annonces comportent des numéros de contact direct ou d'autres informations pour contacter le vendeur en dehors de notre plateforme. Cela peut constituer une violation de nos règles, mais nous reconnaissons que cela peut arriver. Si vous choisissez de contacter le vendeur directement pour conclure un accord et que cela se termine mal, veuillez noter que Nomade ne sera pas responsable des conséquences et ne s'impliquera pas dans le litige.
                        </p>
                        <motion.strong><h4>1.3 Politique d'annulation : ce que vous devez savoir.</h4> </motion.strong>
                        <p>
                            Vous avez la possibilité d'annuler une réservation ou un processus d'achat à tout moment. Veuillez simplement nous fournir les raisons de l'annulation, ce qui nous aidera à comprendre si le problème provient de notre côté, contribuant ainsi à l'amélioration de nos services.                        </p>
                    </motion.div>


                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h4><strong>2. Utilisation de la Plate-forme</strong></motion.h4>
                        <motion.strong><h4>2.1 Comment créer un compte Nomade ?</h4></motion.strong>
                        <p>
                            - Etant sur la plate-forme, cliquez sur <strong>l'icon d'emprunte</strong> en haut à droite <br />
                            - Puis sur <strong>Authentification</strong> <br />
                            - Puis vous verez le formulaire de connexion et juste à droite vous serez invité à créer un compte en cliquant sur le bouton Inscription <br />
                            - Après vous aurez un formulaire de trois étapes à remplire et créer votre compte.
                        </p>
                        <motion.strong><h4>2.2 Comment mettre un logement ou un véhicule en location ou en ventre ?</h4></motion.strong>
                        <p>
                            - Assurez-vous d'avoir un compte. <br />
                            - Connectez-vous à votre compte et cliquez sur le bouton <strong>"+ Ajouter un bien"</strong>. <br />
                            - Suivez les étapes pour spécifier le type de bien que vous souhaitez mettre en location ou en vente.
                        </p>
                        <motion.strong><h4>2.3 Comment gérer vos réservations ?</h4></motion.strong>
                        <p>
                            La gestion de vos réservations vous permet de suivre les réservations directes effectuées sur Nomade. Vous pouvez également nous contacter si vous rencontrez des problèmes ou avez besoin d'assistance pour contacter le client.
                        </p>

                        <motion.strong><h4>2.4 Que faire en cas de problème ou de comportement inapproprié d'un utilisateur ?</h4></motion.strong>
                        <p>Vous pouvez nous contacter directement pour signaler le problème</p>
                    </motion.div>


                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h4><strong>Assistance et Contact</strong></motion.h4>
                        <motion.strong><h4>- Comment contacter l'équipe de support de Nomade ?</h4></motion.strong>
                        <p>
                            Pour contacter l'équipe de support de Nomade et obtenir de l'aide, nous mettons à votre disposition plusieurs options de communication :
                        </p>
                        <p>
                            Par E-mail : Vous pouvez envoyer un e-mail à notre équipe de support à l'adresse suivante : {EMAIL_SUPPORT}. Assurez-vous d'inclure autant de détails que possible concernant votre problème ou votre question, ainsi que votre nom d'utilisateur ou les informations pertinentes à votre compte. Notre équipe de support vous répondra dans les plus brefs délais.
                        </p>
                        <p>
                            Par Téléphone : Si vous avez besoin d'une assistance immédiate ou préférez parler à un membre de notre équipe, vous pouvez nous appeler aux numéros suivants :<br />

                            Numéro de support principal : {NUMERO_SUPPORT} <br />
                            Numéro de support secondaire : {MTN}<br />
                            Sur WhatsApp : Vous pouvez également nous contacter sur WhatsApp en ajoutant notre numéro officiel : +2250706223380. Notre équipe de support WhatsApp est disponible de 08H à 17H30 pour répondre à vos questions et vous aider.<br />
                        </p><br />
                        <p>
                            Réseaux Sociaux : Nous sommes présents sur les réseaux sociaux, ce qui vous permet de nous contacter et de suivre nos actualités. Vous pouvez nous trouver sur LinkedIn, Facebook et TikTok et nous envoyer un message directement. Notre équipe de support surveille régulièrement nos comptes sociaux pour répondre à vos questions et préoccupations.
                        </p>
                        <p>
                            Lorsque vous contactez notre équipe de support, veuillez fournir autant de détails que possible concernant votre problème. Cela nous aidera à résoudre votre question plus rapidement et plus efficacement. Notre objectif est de vous offrir une assistance de qualité et de répondre à toutes vos préoccupations. N'hésitez pas à nous contacter, nous sommes là pour vous aider !
                        </p>
                    </motion.div>


                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Contact Direct</motion.h2>
                        <motion.p>
                            Si vous ne trouvez pas de réponse à votre question dans notre Centre d'Aide, n'hésitez pas à nous contacter directement. Notre équipe de support est là pour vous aider et répondra à vos questions dans les plus brefs délais.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Signaler un Problème</motion.h2>
                        <motion.p>
                            Si vous rencontrez un problème ou avez des préoccupations concernant une réservation ou un utilisateur, contactez nous pour souligner cela. Nous prenons au sérieux toutes les préoccupations liées à la sécurité et à l'expérience des utilisateurs sur Nomade.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Restez Informé</motion.h2>
                        <motion.p>
                            Pour rester informé des mises à jour, des conseils et des nouveautés sur Nomade, n'oubliez pas de nous suivre sur WhatSapp ou intégrer notre groupe WhatSapp <a href="https://chat.whatsapp.com/FqOk82ybwjTCNecuBfSYu3" target="_blank" rel="noopener noreferrer">Newsletter</a> et nous suivre aussi sur <a href="https://web.facebook.com/profile.php?id=61552170946836" target="_blank" rel="noopener noreferrer">Facebook</a>, <a href="https://www.tiktok.com/@nomade_gps" target="_blank" rel="noopener noreferrer">TikTok</a> et <a href="https://www.linkedin.com/company/nomade-gps/?viewAsMember=true" target="_blank" rel="noopener noreferrer">LinkedIn</a>. Nous vous tiendrons au courant des dernières nouvelles et des offres spéciales.
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
                            Chez Nomade, votre satisfaction est notre priorité. Nous sommes déterminés à vous offrir une expérience inoubliable, et notre Centre d'Aide est là pour vous soutenir à chaque étape de votre parcours. Merci de faire partie de la communauté Nomade !
                        </motion.p>
                    </motion.div>
                </motion.div>

            </motion.div>
            <Footer />
        </>
    )
}
