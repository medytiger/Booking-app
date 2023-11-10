import React from 'react'
import './Facturation.css'
import Footer from '../../components/Footer/Footer'

export default function Facturation() {
    return (
        <>
            <div className="container Facturation">
                <div className='FacturationConatiner'>
                    <h1>Facturation sur MIA</h1>
                    <p>
                        Bienvenue dans la section Facturation de MIA. Chez MIA, nous tenons à vous offrir une expérience de paiement sécurisée et transparente. Découvrez comment nous gérons vos paiements et assurez-vous que votre expérience de réservation soit sans souci.
                    </p>
                    <div className="item">
                        <h2>Paiements Sécurisés</h2>
                        <p>
                            Sur MIA, nous utilisons des méthodes de cryptage avancées pour protéger vos informations financières. Soyez assuré que vos paiements sont traités en toute sécurité.
                        </p>
                    </div>

                    <div className="item">
                        <h2>Frais et Tarifs</h2>
                        <p>
                            Lorsque vous effectuez une réservation ou une transaction sur MIA, les frais et les tarifs sont clairement indiqués avant la confirmation. Vous saurez toujours exactement ce que vous paierez, sans frais cachés.
                        </p>
                    </div>

                    <div className="item">
                        <h2>Facturation Transparente</h2>
                        <p>
                            Nous fournissons des reçus détaillés pour toutes les transactions effectuées sur MIA. Vous pouvez consulter et télécharger vos factures à tout moment depuis votre compte utilisateur.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
