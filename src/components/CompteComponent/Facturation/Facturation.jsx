import React, { useEffect } from 'react'
import './Facturation.css'
import { motion } from 'framer-motion'

export default function Facturation() {
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
        <motion.div className='facturation'
            initial='offscreen'
            animate='onscreen'
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <motion.h1>Facturation</motion.h1>

            <motion.div className="factureContainer"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >

                <motion.p >
                    Nomade propose une variété de moyens de paiement pour rendre votre expérience d'achat, de location et d'achat de biens aussi pratique que possible. Que vous souhaitiez louer un logement de courte, moyenne ou longue durée, ou acheter un véhicule, nous avons des options de paiement flexibles pour répondre à vos besoins. Les moyens de paiement acceptés par Nomade incluent :
                </motion.p>

                <motion.p>
                    <strong>Mobile Money :</strong> Payez rapidement et en toute sécurité avec votre compte Mobile Money. C'est l'une des méthodes de paiement les plus populaires et les plus pratiques dans de nombreuses régions.
                </motion.p>

                <motion.p>
                    <strong>Paiement Bancaire :</strong> Utilisez votre compte bancaire pour effectuer des paiements en toute confiance. Nous acceptons les transferts bancaires et les paiements par carte de crédit pour votre commodité.
                </motion.p>

                <motion.p>
                    <strong>Western Union :</strong> Vous avez également la possibilité d'utiliser les services de Western Union pour effectuer vos paiements. C'est une option idéale pour les paiements internationaux.
                </motion.p>

                <motion.p>
                    <strong>Ria Money Transfer :</strong> Ria Money Transfer est un autre choix que vous pouvez faire pour transférer de l'argent de manière sécurisée.
                </motion.p>

                <motion.p>
                    <strong>Djamo :</strong> Djamo est une méthode de paiement populaire dans notre communauté, offrant une manière simple et efficace de réaliser des transactions financières.
                </motion.p>

                <motion.p>
                    <strong>Wave :</strong> Avec Wave, vous pouvez effectuer des paiements en ligne en toute simplicité. C'est une option rapide et fiable pour effectuer vos transactions.
                </motion.p>

                <motion.p>
                    <strong>MoneyGram :</strong> MoneyGram est une solution de transfert d'argent mondialement reconnue. Vous pouvez l'utiliser pour effectuer vos paiements en toute confiance.
                </motion.p>

                <motion.h2>
                    Comment Fonctionne le Paiement avec Nomade
                </motion.h2>

                <motion.p
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    Lorsque vous effectuez une réservation ou un achat sur Nomade, vous pouvez choisir parmi ces différentes options de paiement pour régler votre transaction. Notre plateforme est conçue pour garantir la sécurité de vos informations financières, et vous pouvez effectuer des paiements en toute confiance.

                    <br /><br />Nomade agit en tant qu'intermédiaire de confiance entre les acheteurs et les vendeurs sur notre plateforme. Lorsque vous effectuez un paiement pour une réservation ou un achat, les fonds sont temporairement détenus par Nomade. Cela permet de sécuriser la transaction et de garantir que le vendeur ou le propriétaire reçoit le paiement une fois que les conditions de la transaction sont remplies.

                    <br /><br />Notre équipe dédiée s'assure que chaque transaction se déroule en douceur et en toute sécurité. Si vous avez des questions ou des préoccupations concernant les paiements, notre service client est là pour vous aider à chaque étape du processus.

                    <br /><br />Chez Nomade, nous nous engageons à vous offrir une expérience de paiement transparente et sécurisée. Nous comprenons l'importance de la confiance et de la tranquillité d'esprit lorsque vous effectuez des transactions en ligne, c'est pourquoi nous mettons tout en œuvre pour garantir la sécurité de vos paiements.

                    <br /><br />Que vous réserviez un logement pour vos voyages ou que vous achetiez un véhicule sur notre plateforme, nous sommes là pour simplifier le processus de paiement et répondre à vos besoins.

                </motion.p>
            </motion.div>
        </motion.div>
    )
}
