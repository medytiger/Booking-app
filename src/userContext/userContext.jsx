import axios from "axios";
import { toast } from 'react-toastify';
import { createContext, useEffect, useState } from "react";
import Login from "../components/EtapeConnexion/Login/Login";
import InfosPersonel from "../components/EtapeInscription/InfosPersonel/InfosPersonel";
import InfosContact from "../components/EtapeInscription/InfosContact/InfosContact";
import Authentification from "../components/EtapeInscription/Authentification/Authentification";
import EmailForReset from "../components/EtapeConnexion/EmailForReset/EmailForReset";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [userData, setUserData] = useState({
        type: "",
        nom: "",
        nomEntreprise: "",
        email: "",
        password: "",
        facebook: "",
        tiktok: "",
        linkedin: "",
        prefixe: "",
        numero: "",
        genre: "",
        date: "",
        domaineActivite: "",
        lieu: "",
        descriptionActivite: "",
        photo: "",
    });

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [typeButton, setTypeButton] = useState(false);
    const [nomButton, setNomButton] = useState(false);
    const [nomEntrepriseButton, setNomEntrepriseButton] = useState(false);
    const [prefixeButton, setPrefixeButton] = useState(false);
    const [numeroButton, setNumeroButton] = useState(false);
    const [genreButton, setGenreButton] = useState(false);
    const [dateButton, setDateButton] = useState(false);
    const [domaineActiviteButton, setDomaineActiviteButton] = useState(false);
    const [descriptionActiviteButton, setDescriptionActiviteButton] = useState(false);
    const [lieuButton, setLieuButton] = useState(false);
    const [imailButton, setImailButton] = useState(false);
    const [facebookButton, setFacebookButton] = useState(false);
    const [tiktokButton, settiktokButton] = useState(false);
    const [linkedineButton, setLinkedineButton] = useState(false);

    const [activePanel, setActivePanel] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [registeEtape, setRegisteEtape] = useState(0);
    const [loginSEtape, setLoginSEtape] = useState(0);
    const [resetPassword, setResetPassword] = useState('');


    // useEffect(() => {
    //     let isMounted = true;

    //     async function fetchUserProfile() {
    //         try {
    //             const response = await axios.get('/profile');
    //             if (isMounted) {
    //                 setUser(response.data);
    //                 setReady(true);
    //             }
    //         } catch (error) {
    //             console.error("Erreur lors de la récupération du profil utilisateur :", error);
    //         }
    //     }

    //     if (!user) {
    //         fetchUserProfile();
    //     }

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [user]);

    useEffect(() => {
        let isMounted = true;

        async function fetchUserProfile() {
            try {
                const response = await axios.get('/profile');
                if (isMounted) {
                    setUser(response.data);
                    setReady(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // L'utilisateur n'existe plus, faites quelque chose ici, par exemple :
                    setUser(null);
                    setReady(true);
                } else {
                    console.error("Erreur lors de la récupération du profil utilisateur :", error);
                }
            }
        }

        if (!user) {
            fetchUserProfile();
        }

        return () => {
            isMounted = false;
        };
    }, [user]);


    const registeStepActive = () => {
        if (registeEtape === 0) {
            return <Authentification />
        } else if (registeEtape === 1) {
            return <InfosPersonel />
        } else if (registeEtape === 2) {
            return <InfosContact />
        }
    };

    const loginStepActive = () => {
        if (loginSEtape === 0) {
            return <Login />
        } else if (loginSEtape === 1) {
            return <EmailForReset />
        }
    };

    const registeUser = async (event) => {
        event.preventDefault();

        // Récupérez les données du formulaire d'inscription à partir du state userData
        const formData = {
            type: userData.type,
            domaineActivite: userData.domaineActivite,
            nom: userData.nom,
            nomEntreprise: userData.nomEntreprise,
            email: userData.email,
            password: userData.password,
            prefixe: userData.prefixe,
            numero: userData.numero,
            lieu: userData.lieu,
        };

        try {
            const response = await axios.post('/register', formData);

            // Traitez la réponse et éventuellement effectuez une redirection
            toast.success('Inscription réussie');
            setActivePanel(!activePanel)
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
        }
    };

    const loginUser = async (event) => {
        event.preventDefault();
        // Récupérez les données du formulaire de connexion ici
        const loginFormData = {
            loginEmail,
            loginPassword
        };

        try {
            const response = await axios.post('/login', loginFormData); // Utilisez axios.post ici

            // Traitez la réponse et éventuellement effectuez une redirection
            toast.success('Connexion réussie');
            setUser(response.data);
            setIsModalVisible(!isModalVisible);
        } catch (error) {
            if (error.response) {
                // Si le serveur a renvoyé une réponse avec un statut d'erreur
                toast.error(error.response.data.error);
            } else {
                // Si une erreur s'est produite lors de la requête (par exemple, une erreur réseau)
                toast.error('Une erreur s\'est produite lors de la connexion.');
            }
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('/logout');
            toast.success("déconnexion réussie");
            window.location.href = '/';
            setIsMenuVisible(false);
            setTimeout(() => {
                setUser();
            }, 3000);
        } catch (error) {
            toast.error("Erreur lors de la déconnexion");
            // Ici, vous pouvez ajouter une logique pour gérer les erreurs de déconnexion
        }
    };

    function handleInputChange(event) {
        const { name, value } = event.target;
        event.target.value = value; // Mettre à jour directement la valeur du champ de formulaire
        setUserData((prevState) => ({ ...prevState, [name]: value }));
    }

    async function updateUserProfil(event) {
        event.preventDefault();

        // Vérifiez si l'utilisateur est connecté avant d'accéder à user._id
        if (!user) {
            toast.error("L'utilisateur n'est pas connecté.");
            return;
        }

        try {

            // Filtrer les champs vides du userData
            const filteredUserData = Object.fromEntries(
                Object.entries(userData).filter(([key, value]) => value !== '')
            );

            // Fusionnez les champs modifiés avec les données actuelles de l'utilisateur
            const updatedUserData = {
                ...user, // Copiez toutes les données de l'utilisateur
                ...filteredUserData // Écrasez les champs modifiés non vides
            };

            const response = await axios.put(`/profile/${user._id}`, updatedUserData);
            setUser(response.data);
            toast.success('Profil mis à jour avec succès.');
            setTypeButton(false);
            setNomButton(false);
            setNomEntrepriseButton(false);
            setPrefixeButton(false);
            setNumeroButton(false);
            setGenreButton(false);
            setDateButton(false);
            setDomaineActiviteButton(false);
            setDescriptionActiviteButton(false);
            setLieuButton(false);
            setImailButton(false);
            setFacebookButton(false);
            settiktokButton(false);
            setLinkedineButton(false);
        } catch (error) {
            console.error(error);
            toast.error('Une erreur est survenue lors de la mise à jour du profil.');
        }
    }

    async function handleImageUpload(event) {
        event.preventDefault();

        // Vérifiez si l'utilisateur est connecté avant d'accéder à user._id
        if (!user) {
            toast.error("L'utilisateur n'est pas connecté.");
            return;
        }

        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        try {
            const response = await axios.put(`/profile/image/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUser(response.data);
            toast.success('Image de profil mise à jour avec succès.');
        } catch (error) {
            console.error(error);
            toast.error('Une erreur est survenue lors de la mise à jour de l\'image de profil.');
        }
    }

    return (
        <UserContext.Provider value={{
            user, setUser,
            userData, setUserData,
            ready,

            registeStepActive,
            registeEtape, setRegisteEtape,
            loginStepActive,
            loginSEtape, setLoginSEtape,

            resetPassword,
            setResetPassword,

            updateUserProfil,
            handleImageUpload,
            handleInputChange,
            isModalVisible, setIsModalVisible,
            successMessage, setSuccessMessage,
            registeUser, loginUser, handleLogout,
            loginEmail, setLoginEmail,
            loginPassword, setLoginPassword,
            errorMessage, setErrorMessage,

            imailButton, setImailButton,
            facebookButton, setFacebookButton,
            tiktokButton, settiktokButton,
            linkedineButton, setLinkedineButton,
            activePanel, setActivePanel,
            isMenuVisible, setIsMenuVisible,
            typeButton, setTypeButton,
            nomButton, setNomButton,
            nomEntrepriseButton, setNomEntrepriseButton,
            prefixeButton, setPrefixeButton,
            numeroButton, setNumeroButton,
            genreButton, setGenreButton,
            dateButton, setDateButton,
            descriptionActiviteButton, setDescriptionActiviteButton,
            domaineActiviteButton, setDomaineActiviteButton,
            lieuButton, setLieuButton,
        }}>
            {children}
        </UserContext.Provider>
    );
}
