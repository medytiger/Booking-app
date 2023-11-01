import React from 'react'
import './ProductCard.css'
import { motion } from 'framer-motion'

export default function ProductCard(props) {
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
        <motion.div
            className='card card-raduis'
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: false, amount: .5 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            {props.children}
        </motion.div>
    )
}
