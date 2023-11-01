import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/Nomade_blanc.png'
import { motion } from 'framer-motion'
import { EMAIL, ORANGE, MTN } from '../../App'


export default function Footer() {

    const containerVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1
            }
        }
    };
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer">
            <motion.div
                className="footer-logo container"
                initial='offscreen'
                whileInView='onscreen'
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                transition={{ staggerChildren: 0.5 }}
            >
                <motion.div className="logo">
                    <Link className='logoLink' to="/">
                        <img src={logo} alt="logo" loading='lazy' />
                    </Link>
                </motion.div>
                <motion.div className='newsletterSection'>
                    <span>
                        Nomade est une plate-forme communautaire gestionnaire et prestataire de services immobiliers et automobiles. Que ce soit pour des locations de courte, moyenne ou longue durée, ou pour des achats à l'ère du nomadisme digital.
                    </span>
                    <div className='newsletter item-raduis'>
                        <Link to={'https://chat.whatsapp.com/FqOk82ybwjTCNecuBfSYu3'} target='_blank' className='item-raduis'>Abonnez-vous à notre newsletter</Link>
                    </div>
                </motion.div>
            </motion.div>

            <footer>
                <motion.div
                    className='footerItem'
                    initial='offscreen'
                    whileInView='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Nous contacter</motion.h3>
                    <motion.span><ion-icon name="mail-outline"></ion-icon> <a href={`mailto:${EMAIL}`}> {EMAIL} </a></motion.span>
                    <motion.span><ion-icon name="call-outline"></ion-icon> {ORANGE} / {MTN}</motion.span>

                </motion.div>
                <motion.div
                    className='footerItem'
                    initial='offscreen'
                    whileInView='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Assistance</motion.h3>
                    <motion.span><Link to="/centre-d'aide">Centre d'aide</Link></motion.span>
                    <motion.span><Link to='/litige'>Litige</Link></motion.span>
                    <motion.span> <Link to='/conditions-générales'>Conditions générales</Link> </motion.span>
                </motion.div>
                <motion.div
                    className='footerItem'
                    initial='offscreen'
                    whileInView='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Partenariat</motion.h3>
                    <motion.span><Link to='/mettre-un-bien-sur-Nomade'>Mettre un bien sur Nomade</Link></motion.span>
                    <motion.span><Link to='/travailler-chez-Nomade'>Travailler chez Nomade</Link></motion.span>
                    <motion.span><Link to='/facturation'>Facturation</Link></motion.span>
                </motion.div>
                <motion.div
                    className='footerItem'
                    initial='offscreen'
                    whileInView='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h3>Sécurité et Confidentialité</motion.h3>
                    <motion.span><Link to='/sécurité'>Sécurité</Link></motion.span>
                    <motion.span><Link to='/confidentialité'>Confidentialité</Link></motion.span>
                </motion.div>


            </footer>

            <div
                className="copyrigth container"
            >
                <motion.div className="copy">
                    &copy; Copyright {currentYear} | Tous droits réservé.
                </motion.div>
                <div
                    className="social"

                >
                    <Link to='https://www.tiktok.com/@nomade_gps' target='_blank'>
                        <ion-icon name="logo-tiktok"></ion-icon>
                    </Link>
                    <Link to='https://web.facebook.com/profile.php?id=61552170946836' target='_blank' >
                        <ion-icon name="logo-facebook"></ion-icon>
                    </Link>
                    <Link to='https://www.linkedin.com/company/nomade-gps/?viewAsMember=true' target='_blank' >
                        <ion-icon name="logo-linkedin"></ion-icon>
                    </Link>
                </div>
            </div>

        </div>
    )
}
