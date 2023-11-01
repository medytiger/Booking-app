import React from 'react'
import Video from '../../assets/fond-ecran.mp4'
import './Header.css';
import { motion } from 'framer-motion';
import { EMAIL, ORANGE, MTN } from '../../App'


export default function Header() {

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


    return (
        <div className='header'>
            <video src={Video} autoPlay loop muted></video>

            <div className="container">
                <div className='left-box'>
                    <motion.div className="text-pricipal"
                        initial='offscreen'
                        whileInView='onscreen'
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h1 className="titre"> <span className='hub'>NOMADE</span></motion.h1>
                        <motion.h2 className="sous-titre">Gestionnaire et Prestataire de Services Immobiliers et Automobiles</motion.h2>
                    </motion.div>

                    <div className="text-secondaire">
                        <motion.span className='secondary-left-box'
                            initial='offscreen'
                            whileInView='onscreen'
                            viewport={{ once: true, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
                            <motion.p className='email card-raduis'><a href={`mailto:${EMAIL}`} className='card-raduis'><ion-icon name="mail-outline"></ion-icon>{EMAIL}</a></motion.p>
                            <motion.p className='numeros'><span className='numero card-raduis'><ion-icon name="call-outline"></ion-icon>{ORANGE}</span>  <span className='numero card-raduis'><ion-icon name="call-outline"></ion-icon>{MTN}</span></motion.p>
                        </motion.span>
                        <motion.span className='secondary-right-box'
                            initial='offscreen'
                            whileInView='onscreen'
                            viewport={{ once: true, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
                            Nomade est une plate-forme communautaire gestionnaire et prestataire de services immobiliers et automobiles. Que ce soit pour des locations de courte, moyenne ou longue durée, ou pour des achats à l'ère du nomadisme digital.
                        </motion.span>
                    </div>
                </div>

            </div>

        </div>
    )
}
