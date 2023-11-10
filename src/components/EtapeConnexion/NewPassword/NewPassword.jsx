
import React, { useContext, useState } from 'react'
import { UserContext } from '../../../userContext/userContext';
import Button from '../../../widgets/Button/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NewPassword() {
    const {
        resetPassword,
        setResetPassword,
        loginSEtape, setLoginSEtape,
    } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false); // État pour gérer l'affichage du mot de passe



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/reset-password/:userId/:token', { resetPassword });
            if (response.status === 204) {
                toast.success('E-mail envoyé avec succès');
                setResetPassword('')
            } else {
                toast.error('Erreur lors de l\'envoi du mot de passe');
            }
        } catch (error) {
            toast.error('Erreur lors de l\'envoi du mot de passe: ' + error.message);
        }
    };

    const loginLastStep = () => {
        setLoginSEtape(loginSEtape - 1)
    }

    return (
        <form >
            <h2>Nouveau mot de passe</h2>

            <span>Veillez entrer le nouveau mot de passe</span>


            <div className="signInputSection ">
                <input className='btn-raduis' type={showPassword ? 'text' : 'password'} placeholder='Mot de passe' value={resetPassword} onChange={e => setResetPassword(e.target.value)} />

                {showPassword ? (
                    <ion-icon
                        name="eye-outline"
                        onClick={() => setShowPassword(false)} // Cliquez pour masquer le mot de passe
                    ></ion-icon>
                ) : (
                    <ion-icon
                        name="eye-off-outline"
                        onClick={() => setShowPassword(true)} // Cliquez pour afficher le mot de passe
                    ></ion-icon>
                )}

            </div>

            <Button type="submit" className='signButton'>
                Réinitialiser
            </Button>

            <div className="back" onClick={() => loginLastStep()}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
        </form>
    )
}
