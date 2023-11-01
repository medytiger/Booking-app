import React, { useContext, useState } from 'react'
import axios from 'axios';
import './Images.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';


export default function Images({ homeLink, setHomeLink }) {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const { homeData, setHomeData } = useContext(CarHomeDataContext)



    function handleLinkChange(e) {
        const { value } = e.target;
        setHomeLink(value.split('\n').filter(link => link));
    }

    async function uploadByLink(e) {
        e.preventDefault();

        // Vérifier que homeLink est défini avant d'appeler la méthode post
        if (homeLink && homeLink.length > 0) {
            try {
                const filenames = await Promise.all(homeLink.map(async (link) => {
                    const { data: filename } = await axios.post('/upload-by-link', { link });
                    return filename;
                }));

                setHomeData(prevData => ({
                    ...prevData,
                    images: [...prevData.images, ...filenames]
                }));

                setHomeLink([]); // Réinitialiser le tableau d'état homeLink après l'ajout
            } catch (error) {
                console.error(error);
                // Gérer les erreurs de manière appropriée ici
            }
        }
    }

    function handleDragStart(e, index) {
        setDraggedIndex(index);
    }

    function handleDragOver(e, index) {
        e.preventDefault();
    }

    function handleDrop(e, targetIndex) {
        e.preventDefault();
        const newImages = [...homeData.images];
        const draggedImage = newImages.splice(draggedIndex, 1)[0];
        newImages.splice(targetIndex, 0, draggedImage);
        setHomeData((prevData) => ({ ...prevData, images: newImages }));
        setDraggedIndex(null);
    }

    const handleImageRemove = async (filename) => {
        try {
            // Envoyer une requête DELETE au serveur pour supprimer l'images
            await axios.delete(`http://localhost:5000/medias/${filename}`);

            // Mettre à jour l'état homeData pour supprimer l'images de l'interface utilisateur
            setHomeData(prevData => ({
                ...prevData,
                images: prevData.images.filter((images) => images !== filename)
            }));
        } catch (error) {
            console.error(error);
            // Gérer les erreurs de manière appropriée ici
        }
    };

    const handleImageUpload = async (e) => {
        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('images', e.target.files[i]);
        }

        try {
            const response = await axios.post('/upload-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Le serveur renverra les noms des imagess téléchargées
            const newImageNames = response.data;

            setHomeData(prevData => ({
                ...prevData,
                images: [...prevData.images, ...newImageNames],
            }));
        } catch (error) {
            console.error(error);
            // Gérer les erreurs de manière appropriée ici
        }
    };

    const handleVideoUpload = async (e) => {
        const formData = new FormData();
        formData.append('video', e.target.files[0]);

        try {
            const response = await axios.post('/upload-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Mettre à jour le state du composant parent avec le nom de la vidéo téléchargée
            setHomeData(prevData => {
                if (Array.isArray(prevData.video)) {
                    return {
                        ...prevData,
                        video: [...prevData.video, response.data.filename], // Stockage du nom de la vidéo dans homeData.video
                    };
                } else {
                    return {
                        ...prevData,
                        video: [response.data.filename], // Si prevData.video n'était pas encore un tableau, le créer avec le nom de la vidéo
                    };
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveVideo = async () => {
        try {
            if (homeData.video && homeData.video.length > 0) {
                const videoToDelete = homeData.video[0];

                // Supprimer la vidéo du dossier "medias"
                await axios.delete(`/medias/${videoToDelete}`);

                // Mettre à jour le state pour supprimer la vidéo
                setHomeData(prevData => ({
                    ...prevData,
                    video: prevData.video.slice(1)
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <div className='imageEtape'>
                <h3>Images</h3>
                <div className="imageConatiner">

                    <div className='linkUploadContainer'>
                        <label>Entrer le lien de l'image:</label>
                        <div className="linkArea">
                            <textarea rows="1" id="homeLink" name="homeLink" value={homeLink ? homeLink.join('\n') : ''} onChange={handleLinkChange} />
                            <button onClick={uploadByLink}>Ajouter</button>
                        </div>
                    </div>

                    <div className="ComputerUpload">

                        <div className="">
                            <label>Télécharger les images:</label>
                            <div className='imgUploadContainer inputGroup'>
                                <ion-icon name="images-outline"></ion-icon>
                                <input type="file" multiple accept=".jpg, .jpeg, .png" id="images" name="images" onChange={handleImageUpload} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="videos">Télécharger la video:</label>
                            <div className='imgUploadContainer inputGroup'>
                                <ion-icon name="videocam-outline"></ion-icon>
                                <input
                                    type="file"
                                    id="videos"
                                    name="videos"
                                    accept=".mp4, .avi, .mkv"
                                    onChange={handleVideoUpload}
                                />
                            </div>
                        </div>

                        <div className="videoContainer">
                            {homeData.video && homeData.video.length > 0 && (
                                <div className="removeVideo" onClick={handleRemoveVideo}>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </div>
                            )}
                            {homeData.video && homeData.video.length > 0 && (
                                <video controls preload="metadata">
                                    <source src={`http://localhost:5000/medias/${homeData.video[0]}`} type="video/*" />
                                    Votre navigateur ne prend pas en charge la vidéo.
                                </video>
                            )}
                        </div>

                    </div>

                </div>

                <div className="imageTelecharge">
                    {homeData.images.length > 0 &&
                        homeData.images.map((filename, index) => (
                            <div
                                className="imgContainer"
                                key={index}
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                <div className="imgRemove" onClick={() => handleImageRemove(filename)}>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </div>
                                <img src={`http://localhost:5000/medias/${filename}`} alt={filename} />
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
}

