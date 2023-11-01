import React, { useContext, useEffect, useState } from 'react'
import './Notification.css'
import notif from '../../../assets/undraw_No_data_re_kwbl.png'
import axios from 'axios';
import { UserContext } from '../../../userContext/userContext';
import Loader from '../../Loader/Loader';
import { motion } from 'framer-motion'


export default function Notification() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { ready } = useContext(UserContext);
    if (!ready) {
        return <Loader />
    }

    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const response = await axios.get('/annonces');
                const sortedAnnonces = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAnnonces(sortedAnnonces);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnnonces();
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
        <motion.div className='notification'
            initial='offscreen'
            animate='onscreen'
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <motion.h1>Notification</motion.h1>
            <motion.div className="notificationContainer"
                initial='offscreen'
                animate='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >
                {annonces.length > 0 ? (
                    <motion.ul
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        {annonces.map((annonce) => (
                            <>
                                <motion.li className='card-raduis' key={annonce._id}
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.span className='typeBien card-raduis'>
                                        {annonce.type}
                                    </motion.span>

                                    <>
                                        <motion.p>Zone : <strong>{annonce.lieu} </strong>avec un budget de : <strong>{annonce.budget}</strong> XOF </motion.p>
                                        <motion.p>{annonce.description}</motion.p>
                                        <motion.div
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            <motion.span>Publié par {annonce.nom} </motion.span>
                                            <motion.span className='dateDePublication'>le {new Date(annonce.createdAt).toLocaleDateString()}</motion.span>
                                            <motion.p>Email: {annonce.email} </motion.p>
                                            <motion.p>Numéro: {annonce.numero} </motion.p>
                                        </motion.div>
                                    </>


                                </motion.li>


                            </>

                        ))}
                    </motion.ul>
                ) : (
                    <motion.img src={notif} alt="" loading='lazy' />
                )}

            </motion.div>
        </motion.div>
    )
}