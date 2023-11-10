import React from 'react'
import './CentreAide.css'
import Footer from '../../components/Footer/Footer'

export default function CentreAide() {
    return (
        <>
            <div className="container CentreAide">
                <div className='CentreAideContainer'>
                    <h1>Centre d'Aide MIA</h1>

                    Bienvenue au Centre d'Aide de MIA, votre ressource complète pour obtenir de l'aide, des réponses à vos questions et des conseils sur l'utilisation de notre plate-forme. Chez MIA, nous sommes déterminés à rendre votre expérience utilisateur aussi fluide que possible, et notre Centre d'Aide est conçu pour vous guider à chaque étape de votre voyage.

                    <div className="item">
                        <h2>Comment Utiliser le Centre d'Aide</h2>
                        <p>
                            Le Centre d'Aide est organisé de manière à ce que vous puissiez facilement trouver les informations dont vous avez besoin. Vous pouvez parcourir les catégories ci-dessous pour accéder aux articles pertinents, ou utiliser la barre de recherche pour trouver des réponses spécifiques à vos questions.
                        </p>
                    </div>

                    <div className="item">
                        <h3>Catégories Populaires</h3>
                        <h4><strong>1- Réservations et Paiements</strong></h4>
                        <strong>- Comment réserver un logement ou un véhicule ?</strong>
                        <strong>- Comment effectuer un paiement en toute sécurité sur MIA ?</strong>
                        <strong>- Politique d'annulation : ce que vous devez savoir.</strong>

                    </div>


                    <div className="item">
                        <h4><strong>2- Utilisation de la Plate-forme</strong></h4>
                        <strong>- Comment créer un compte MIA ?</strong>
                        <strong>- Comment mettre en location votre logement ou votre véhicule ?</strong>
                        <strong>- Comment gérer vos réservations et votre profil utilisateur ?</strong>
                    </div>

                    <div className="item">
                        <h4><strong>Sécurité et Confidentialité</strong></h4>
                        <strong>- Comment MIA protège-t-il votre sécurité et vos données ?</strong>
                        <strong>- Que faire en cas de problème ou de comportement inapproprié d'un utilisateur ?</strong>
                    </div>

                    <div className="item">
                        <h4><strong>Assistance et Contact</strong></h4>
                        <strong>- Comment contacter l'équipe de support de MIA ?</strong>
                        <strong>- Foire aux questions (FAQ) : réponses aux questions courantes.</strong>
                    </div>


                    <div className="item">
                        <h2>Foire aux Questions (FAQ)</h2>
                        <p>
                            Notre Foire aux Questions (FAQ) est constamment mise à jour pour inclure les questions les plus courantes posées par nos utilisateurs. Avant de nous contacter, consultez notre FAQ pour voir si votre question a déjà une réponse.
                        </p>
                    </div>


                    <div className="item">
                        <h2>Contact Direct</h2>
                        <p>
                            Si vous ne trouvez pas de réponse à votre question dans notre Centre d'Aide, n'hésitez pas à nous contacter directement. Notre équipe de support est là pour vous aider et répondra à vos questions dans les plus brefs délais. Vous pouvez nous joindre via notre formulaire de contact en ligne [lien vers le formulaire de contact], par e-mail à [adresse e-mail de support], ou en utilisant notre chat en direct lorsque disponible.
                        </p>
                    </div>

                    <div className="item">
                        <h2>Signaler un Problème</h2>
                        <p>
                            Si vous rencontrez un problème ou avez des préoccupations concernant une réservation ou un utilisateur, utilisez notre outil de signalement intégré pour nous informer. Nous prenons au sérieux toutes les préoccupations liées à la sécurité et à l'expérience des utilisateurs sur MIA.
                        </p>
                    </div>

                    <div className="item">
                        <h2>Restez Informé</h2>
                        <p>
                            Pour rester informé des mises à jour, des conseils et des nouveautés sur MIA, n'oubliez pas de vous abonner à notre newsletter. Nous vous tiendrons au courant des dernières nouvelles et des offres spéciales.
                        </p>
                    </div>

                    <div className="item">
                        <p>
                            Chez MIA, votre satisfaction est notre priorité. Nous sommes déterminés à vous offrir une expérience de voyage inoubliable, et notre Centre d'Aide est là pour vous soutenir à chaque étape de votre parcours. Merci de faire partie de la communauté MIA !
                        </p>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}
