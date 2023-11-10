import React from 'react'
import './ConditionsGenerales.css'
import Footer from '../../components/Footer/Footer'

export default function ConditionsGenerales() {
    return (
        <>
            <div className="container ConditionsGenerales">
                <div className='ConditionsContainer'>
                    <h1>Conditions Générales d'Utilisation de MIA</h1>

                    <p>Bienvenue sur MIA, la plate-forme communautaire qui vous permet de trouver et de louer des logements et des véhicules à l'ère du nomadisme digital. En utilisant notre plate-forme, vous acceptez les conditions générales d'utilisation énoncées ci-dessous. Veuillez les lire attentivement.</p>

                    <div className="item">
                        <h2>1. Inscription et Compte</h2>
                        <p>
                            <strong>1.1.</strong> Pour utiliser MIA, vous devez créer un compte personnel. Vous êtes responsable de maintenir la confidentialité de votre compte et de toutes les activités qui s'y déroulent.
                        </p>

                        <p>
                            <strong>1.2.</strong> Vous acceptez de fournir des informations exactes, à jour et complètes lors de votre inscription sur MIA.
                        </p>

                        <p>
                            <strong>1.3.</strong> Vous ne pouvez avoir qu'un seul compte MIA, sauf autorisation expresse de notre part.
                        </p>

                    </div>

                    <div className="item">
                        <h2>2. Réservation et Paiement</h2>

                        <p>
                            <strong>2.1.</strong> En utilisant MIA pour réserver un logement ou un véhicule, vous acceptez de payer les frais applicables tels que décrits lors de la réservation. Les paiements doivent être effectués conformément à nos instructions.
                        </p>
                        <p>
                            <strong>2.2.</strong> En cas d'annulation, les politiques d'annulation spécifiques du propriétaire ou du loueur s'appliquent. Veuillez les consulter avant de réserver.
                        </p>

                    </div>

                    <div className="item">
                        <h2>3. Responsabilités des Utilisateurs</h2>

                        <p>
                            <strong>3.1.</strong> En tant qu'utilisateur de MIA, vous vous engagez à respecter les lois locales et à ne pas utiliser la plate-forme à des fins illégales ou nuisibles.
                        </p>
                        <p>
                            <strong>3.2.</strong> Vous acceptez de traiter les autres utilisateurs avec respect et de respecter les règles de la communauté MIA.
                        </p>

                    </div>

                    <div className="item">
                        <h2>4. Annonces et Transactions</h2>

                        <p>
                            <strong>4.1.</strong> Les propriétaires et les loueurs sont responsables de l'exactitude de leurs annonces, y compris les photos et les descriptions.
                        </p>
                        <p>
                            <strong>4.2.</strong> MIA n'est pas responsable des transactions entre utilisateurs, mais nous sommes là pour vous aider en cas de litige.
                        </p>

                    </div>

                    <div className="item">
                        <h2>5. Politique de Confidentialité</h2>

                        <p>
                            <strong>5.1.</strong> En utilisant MIA, vous acceptez notre politique de confidentialité, qui régit la manière dont nous collectons, utilisons et divulguons vos informations personnelles.
                        </p>

                    </div>

                    <div className="item">
                        <h2>6. Modifications des Conditions Générales</h2>

                        <p>
                            <strong>6.1.</strong> MIA se réserve le droit de modifier ces conditions générales à tout moment. Les utilisateurs seront informés des modifications importantes.
                        </p>

                    </div>

                    <div className="item">
                        <h2>7. Résiliation du Compte</h2>

                        <p>
                            <strong>7.1.</strong> MIA peut résilier votre compte en cas de non-respect de ces conditions générales ou pour toute autre raison jugée nécessaire.
                        </p>

                    </div>

                    <div className="item">

                        <h2> 8. Limitation de Responsabilité</h2>

                        <p>
                            <strong>8.1.</strong> MIA ne peut être tenu responsable des dommages indirects, consécutifs, spéciaux ou punitifs résultant de l'utilisation de la plate-forme.
                        </p>
                    </div>

                    <div className="item">
                        <h2>9. Droit Applicable et Règlement des Litiges</h2>

                        <p>
                            <strong>9.1.</strong> Ces conditions générales sont régies par les lois en vigueur selon le pays d'd'exercice, et tout litige sera soumis à la compétence exclusive des tribunaux du pays en question.
                        </p>
                    </div>

                    <div className="item">
                        <p>
                            En utilisant MIA, vous acceptez ces conditions générales dans leur intégralité. Si vous avez des questions ou des préoccupations, veuillez nous contacter à [adresse e-mail de contact]. Merci de faire partie de la communauté MIA !
                        </p>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}
