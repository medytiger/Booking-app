import React from 'react'
import './Section.css'
import { motion } from 'framer-motion';


export default function Section(props) {
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
    return (
        <motion.section
            className='section'
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            {props.children}
        </motion.section>
    )
}
