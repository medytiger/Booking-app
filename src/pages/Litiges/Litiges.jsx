import React from 'react'
import './Litiges.css'
import Footer from '../../components/Footer/Footer'

export default function Litiges() {
    return (
        <>
            <div className="container litige">

                <div className='litigeContainer'>
                    <h1>Résolution des Litiges</h1>

                    <div className="item">
                        <h2>1. Processus de Médiation</h2>
                        <p>
                            En cas de litige entre utilisateurs de MIA, nous encourageons une résolution amiable en premier lieu. Les utilisateurs sont encouragés à communiquer directement les uns avec les autres pour résoudre le différend.
                        </p>

                    </div>

                    <div className="item">
                        <h2>2. Assistance de MIA</h2>
                        <p>

                            Si les parties ne parviennent pas à résoudre leur litige de manière amiable, MIA est là pour vous aider. Vous pouvez contacter notre équipe de support à [adresse e-mail de support] pour signaler le litige. Nous nous efforcerons de faciliter la communication entre les parties et de trouver une solution équitable.
                        </p>

                    </div>

                    <div className="item">
                        <h2>3. Arbitrage</h2>
                        <p>

                            En cas de litige non résolu par le biais de la médiation ou de l'assistance de MIA, les parties conviennent de recourir à un processus d'arbitrage. L'arbitrage sera effectué conformément aux règles d'arbitrage en vigueur du pays et sera contraignant pour toutes les parties impliquées. Les frais d'arbitrage seront partagés de manière équitable entre les parties.
                        </p>

                    </div>

                    <div className="item">
                        <h2>4. Juridiction</h2>
                        <p>
                            Tout litige ou réclamation découlant de l'utilisation de MIA sera soumis à la juridiction exclusive des tribunaux du pays.
                        </p>

                    </div>


                    <div className="item">
                        Nous encourageons nos utilisateurs à faire preuve de compréhension et de coopération dans la résolution des litiges. La médiation et l'arbitrage sont des moyens efficaces de résoudre les désaccords de manière équitable et expéditive. Si vous avez des questions ou des préoccupations concernant la résolution des litiges, veuillez nous contacter à [adresse e-mail de contact].
                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}
