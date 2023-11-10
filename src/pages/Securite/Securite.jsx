import React from 'react'
import './Securite.css'
import Footer from '../../components/Footer/Footer'

export default function Securite() {
    return (
        <>
            <div className="conatiner Securite">

                <div className='SecuriteConatiner'>
                    <h1>Sécurité sur MIA</h1>
                    <p>
                        Bienvenue dans la section Sécurité de MIA. Votre sécurité est notre priorité absolue. Découvrez comment nous protégeons nos utilisateurs et maintenons un environnement sûr pour tous.
                    </p>

                    <div className="item">
                        <h2>Protection des Utilisateurs</h2>
                        <p>
                            Nous effectuons des vérifications de sécurité régulières pour garantir que les comptes sont authentiques. Notre équipe dédiée à la sécurité surveille les activités suspectes.
                        </p>
                    </div>


                    <div className="item">
                        <h2>Protection des Données</h2>
                        <p>
                            Vos données personnelles sont stockées de manière sécurisée et ne sont pas partagées sans votre consentement. Nous utilisons des technologies de pointe pour protéger vos informations.
                        </p>
                    </div>

                    <div className="item">
                        <h2>Signalement des Problèmes</h2>
                        <p>
                            Si vous rencontrez un problème ou suspectez un comportement inapproprié sur MIA, nous encourageons le signalement. Nous enquêterons sur toutes les préoccupations liées à la sécurité et prendrons les mesures appropriées.
                        </p>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}
