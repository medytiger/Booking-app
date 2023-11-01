import React, { useContext } from 'react'
import './infosContact.css'
import { UserContext } from '../../../userContext/userContext';
import { motion } from 'framer-motion';


export default function InfosContact() {
    const containerVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 2
            }
        }
    };
    const { userData, setUserData, } = useContext(UserContext);

    return (
        <motion.div className='infosContact'
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >

            <div className="signInputSection">
                <h3>prefixe du numéro</h3>
                <input className='btn-raduis'
                    type="Number" placeholder='Contact Exemple:(+225)'
                    value={userData.prefixe} onChange={(e) => setUserData({ ...userData, prefixe: e.target.value })} />

            </div>

            <div className="signInputSection">
                <h3>numéro de téléphone valide</h3>
                <input className='btn-raduis'
                    type="Number" placeholder='Contact Exemple:(0102030405)'
                    value={userData.numero} onChange={(e) => setUserData({ ...userData, numero: e.target.value })} />
            </div>

            <div className="signInputSection">
                <h3>Lieu d'exercice</h3>
                <input className='btn-raduis'
                    type="text"
                    placeholder='lieu Exemple:(Abidjan plateau)'
                    value={userData.lieu} onChange={(e) => setUserData({ ...userData, lieu: e.target.value })} />
            </div>
        </motion.div>
    )
}
