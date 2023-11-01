import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../userContext/userContext';
import './MettreUnBien.css'
import Footer from '../../../components/Footer/Footer'
import { motion } from 'framer-motion'
import Navbar from '../../../components/Navbar/Navbar';

export default function MettreUnBien() {
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
            <motion.div className="container MettreUnBien"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >

                <motion.div className='MettreUnBienContainer'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>Mettre un Bien sur Nomade : Location ou Vente</motion.h1>
                    <motion.p>
                        Bienvenue sur la page qui vous explique comment mettre votre bien en location ou en vente sur Nomade, la plate-forme communautaire dédiée aux voyageurs et aux acheteurs potentiels. En partageant ou en vendant votre bien sur Nomade, vous pouvez générer des revenus supplémentaires ou trouver un acheteur pour votre propriété.
                    </motion.p>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Pourquoi Mettre en Location ou en Vente sur Nomade</motion.h2>
                        <motion.h3>Gagnez de l'Argent</motion.h3>
                        <motion.p>
                            Mettre votre bien en location ou en vente sur Nomade est un excellent moyen de gagner de l'argent supplémentaire ou de trouver un acheteur rapidement. Vous pouvez définir vos propres tarifs ou prix de vente, ce qui vous donne un contrôle total sur la manière dont vous souhaitez partager ou vendre votre bien.
                        </motion.p>

                        <motion.h3>Rencontrez des Voyageurs ou des Acheteurs</motion.h3>
                        <motion.p>
                            En mettant votre bien sur Nomade, vous aurez l'occasion de rencontrer des voyageurs du monde entier intéressés par la location, ou des acheteurs potentiels à la recherche d'une propriété. Vous pourrez partager des expériences culturelles uniques ou trouver le meilleur acheteur pour votre bien.
                        </motion.p>

                        <motion.h3>Maximisez Votre Utilisation ou Vente</motion.h3>
                        <motion.p>
                            Si votre logement ou votre véhicule reste inutilisé pendant une période donnée, la mise en location sur Nomade vous permet de maximiser son utilisation. Si vous vendez une propriété, Nomade vous connecte avec des acheteurs potentiels rapidement.
                        </motion.p>
                    </motion.div>

                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h2>Comment Mettre un Bien en Location ou en Vente</motion.h2>

                        <motion.h3>Étape 1 : Créez un Compte</motion.h3>
                        <motion.p>
                            Si vous n'avez pas déjà un compte Nomade, commencez par créer un compte. Cela vous permettra de gérer facilement vos annonces et de communiquer avec les voyageurs ou les acheteurs potentiels.
                        </motion.p>

                        <motion.h3>Étape 2 : Créez votre Annonce</motion.h3>
                        <motion.h4>Pour la Location :</motion.h4>

                        <strong>- Téléchargez des photos de haute qualité de votre bien.</strong><br />
                        <strong>- Rédigez une description détaillée et précise de votre logement ou de votre véhicule.</strong><br />
                        <strong>- Spécifiez les tarifs, les disponibilités et les règles de votre bien.</strong><br /><br />

                        <motion.h4>Pour la Vente :</motion.h4>

                        <strong>- Téléchargez des photos de haute qualité de votre propriété.</strong><br />
                        <strong>- Rédigez une description détaillée de la propriété, y compris les caractéristiques, la localisation, et le prix de vente.</strong><br />
                        <strong>- Incluez les détails et conditions pour les acheteurs potentiels.</strong>
                        <br />
                        <motion.h3>Étape 3 : Publiez votre Bien</motion.h3>

                        <motion.p>
                            Une fois que vous avez créé votre annonce, vous pouvez la publier sur Nomade. Elle sera immédiatement visible par les voyageurs ou les acheteurs potentiels.
                        </motion.p>

                        <motion.h3>Étape 4 : Communiquez avec les Voyageurs ou les Acheteurs</motion.h3>
                        <motion.p>
                            Les voyageurs intéressés par la location ou les acheteurs potentiels peuvent vous contacter directement via la plate-forme Nomade. Assurez-vous de répondre rapidement aux demandes de réservation ou d'information et de fournir toutes les informations nécessaires.
                        </motion.p>

                        <motion.h3>Étape 5 : Acceptez les Réservations (pour la Location) ou Négociez la Vente (pour la Vente)</motion.h3>
                        <motion.p>
                            Lorsque vous recevez une demande de réservation (pour la location) ou une offre (pour la vente), vous avez la possibilité d'accepter ou de négocier. Une fois que les termes sont acceptés, la réservation est confirmée (pour la location) ou la vente est en cours (pour la vente).
                        </motion.p>
                    </motion.div>
                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <h2>Conseils pour une Expérience Réussie</h2>
                        <strong>- Soyez transparent sur les détails de votre bien ou de votre propriété.</strong>
                        <strong>- Soyez réactif et communiquez clairement avec les voyageurs, les acheteurs ou les négociateurs.</strong>
                        <strong>- Fournissez un accueil chaleureux et des informations locales utiles (pour la location).</strong>
                        <strong>- Maintenez la propreté et l'entretien de votre bien.</strong>
                    </motion.div>
                    <br />
                    <motion.div className="item"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.p>
                            Mettre votre bien en location ou en vente sur Nomade est une expérience gratifiante qui peut vous permettre de générer des revenus supplémentaires ou de trouver l'acheteur idéal pour votre propriété. Rejoignez la communauté Nomade dès aujourd'hui et partagez ou vendez votre bien avec des voyageurs ou des acheteurs potentiels.
                        </motion.p>

                    </motion.div>

                </motion.div>

            </motion.div>
            <Footer />
        </>
    )
}
