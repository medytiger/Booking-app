import React from 'react'
import './Confidentialite.css'
import Footer from '../../components/Footer/Footer'

export default function Confidentialite() {
    return (
        <>
            <div className="container Confidentialite">
                <div className='ConfidentialiteContainer'>
                    <h1>Confidentialité sur MIA</h1>
                    <p>
                        Bienvenue dans la section Confidentialité de MIA. Nous respectons votre vie privée et nous engageons à protéger vos données personnelles. Découvrez comment nous gérons vos informations personnelles et comment nous les utilisons.
                    </p>

                    <div className="item">
                        <h2>Vos Données Personnelles</h2>
                        <p>
                            Nous collectons uniquement les données personnelles nécessaires pour fournir nos services. Vous avez le contrôle sur vos informations, y compris la possibilité de les mettre à jour ou de les supprimer de votre compte.
                        </p>
                    </div>


                    <div className="item">
                        <h2>Utilisation des Données</h2>
                        <p>
                            Nous utilisons vos données personnelles conformément à notre politique de confidentialité. Vos informations ne seront jamais utilisées à des fins autres que celles spécifiées, et nous ne les vendrons jamais à des tiers.
                        </p>
                    </div>

                    <div className="item">
                        <h2> Consentement</h2>
                        <p>
                            Avant de collecter vos données personnelles, nous vous demanderons toujours votre consentement explicite. Vous avez le droit de refuser ou de retirer votre consentement à tout moment.
                        </p>
                    </div>

                    <div className="item">
                        <p>
                            Chez MIA, nous sommes engagés à vous offrir la meilleure expérience possible tout en protégeant vos informations financières, en garantissant votre sécurité et en respectant votre vie privée. Si vous avez des questions ou des préoccupations concernant la facturation, la sécurité ou la confidentialité, n'hésitez pas à nous contacter à [adresse e-mail de contact]. Nous sommes là pour vous aider et répondre à vos besoins spécifiques pour chacun de ces domaines.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </>

    )
}
