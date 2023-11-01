import React from 'react';
import './LoaderSVG.css'
import { motion } from 'framer-motion'

export default function LoaderSVG() {


    const icon = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: "rgba(255, 255, 255, 1)"
        }
    };

    return (
        <div>
            <motion.svg
                version="1.1"
                id="Calque_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" // Utilisation de xmlnsXlink au lieu de xmlns: xlink
                x="0px"
                y="0px"
                viewBox="0 0 595.28 841.89"
                style={{ enableBackground: 'new 0 0 595.28 841.89' }} // Utilisation de style={{ ... }} au lieu de style="..."
                xmlSpace="preserve"
            >

                <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="214.2372" y1="438.7976" x2="291.6235" y2="394.1186">
                    <stop offset="0" style={{ stopColor: '#E3051B' }} />
                    <stop offset="0.3189" style={{ stopColor: '#E2061B' }} />
                    <stop offset="0.4864" style={{ stopColor: '#DD0719' }} />
                    <stop offset="0.6186" style={{ stopColor: '#D30917' }} />
                    <stop offset="0.7325" style={{ stopColor: '#C60C13' }} />
                    <stop offset="0.8344" style={{ stopColor: '#B40E0F' }} />
                    <stop offset="0.9266" style={{ stopColor: '#9F1008' }} />
                    <stop offset="1" style={{ stopColor: '#8A1002' }} />
                </linearGradient>
                <polygon className="st0" points="248.88,320.08 248.88,320.09 248.88,498.79 281.3,498.79 281.3,409.42 " />
                <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="329.9363" y1="310.5553" x2="329.9363" y2="489.2753">
                    <stop offset="0" style={{ stopColor: '#E6331B' }} />
                    <stop offset="0.1605" style={{ stopColor: '#DC2F19' }} />
                    <stop offset="0.4619" style={{ stopColor: '#C32412' }} />
                    <stop offset="0.8687" style={{ stopColor: '#991506' }} />
                    <stop offset="1" style={{ stopColor: '#8A1002' }} />
                </linearGradient>
                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        default: { duration: 2, ease: "easeInOut" },
                        fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                    }}
                    className="st1" d="M313.73,320.07v178.5c0.39,0.03,0.79,0.07,1.2,0.14c0.13,0.02,0.25,0.06,0.37,0.08h30.85V320.07H313.73z" />
                <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="248.8846" y1="409.3304" x2="313.7263" y2="409.3304">
                    <stop offset="0.0212" style={{ stopColor: '#E94E1B' }} />
                    <stop offset="1" style={{ stopColor: '#E30613' }} />
                </linearGradient>
                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        default: { duration: 2, ease: "easeInOut" },
                        fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                    }}
                    className="st2" d="M313.73,498.57v-89.13l-32.43-89.37l-17.02,0.01c-0.01,0-15.4,0-15.39,0.01l32.41,89.33l32.35,89.16C313.69,498.58,313.68,498.58,313.73,498.57z" />
                <g>
                    <rect x="246.06" y="502.41" className="st3" width="103.15" height="19.4" />
                    <motion.path
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                        className="st4" d="M263.12,502.41v14.32h-3.01l-7.91-9.18v9.18h-3.57v-14.32h3.27l-7.65,8.76v-8.76H263.12z" />
                    <motion.path
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                        className="st4" d="M273.94,502.22c2.44,0,4.42,0.74,5.93,2.21c1.51,1.47,2.27,3.19,2.27,5.14c0,1.98-0.77,3.7-2.3,5.16
		c-1.53,1.46-3.5,2.18-5.9,2.18c-2.43,0-4.4-0.72-5.93-2.17s-2.29-3.17-2.29-5.17c0-1.96,0.76-3.68,2.27-5.15
		C269.51,502.96,271.49,502.22,273.94,502.22z M273.94,513.94c1.35,0,2.44-0.4,3.27-1.21c0.83-0.8,1.24-1.86,1.24-3.16
		c0-1.31-0.41-2.37-1.24-3.17c-0.83-0.8-1.92-1.2-3.27-1.2c-1.36,0-2.46,0.4-3.29,1.2c-0.83,0.8-1.25,1.86-1.25,3.17
		c0-1.31,0.42-2.36,1.25-3.16C271.49,513.54,272.58,513.94,273.94,513.94z" />
                    <motion.path
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                        className="st4" d="M292.42,507.72l4.6-5.31h3.1v14.32h-3.57v-8.94l-3.87,4.49h-0.54l-3.87-4.49v8.94h-3.57v-14.32h3.1
		L292.42,507.72z" />
                    <motion.path
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                        className="st4" d="M311.68,502.41l6.36,14.32h-3.84l-1.18-2.83h-6.42l-1.07,2.83h-3.78l5.79-14.32H311.68z M311.98,511.4
		l-2.32-5.57l-2.1,5.57H311.98z" />
                    <motion.path
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                        className="st4" d="M319.67,502.41h6.32c2.44,0,4.37,0.67,5.79,2c1.42,1.34,2.13,3.06,2.13,5.18c0,2.22-0.72,3.97-2.16,5.23
		c-1.44,1.27-3.49,1.9-6.16,1.9h-5.92V502.41z M323.24,505.03v9.07h2.33c1.51,0,2.67-0.42,3.47-1.25c0.8-0.83,1.2-1.93,1.2-3.29
		c0-1.41-0.41-2.52-1.21-3.33c-0.81-0.81-1.97-1.21-3.49-1.21H323.24z" />
                    <motion.path
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                        className="st4" d="M347.13,514.11v2.62h-10.56v-14.32h10.42v2.62h-6.85v3h6.53v2.62h-6.53v3.45H347.13z" />
                </g>
            </motion.svg>
        </div>
    );
}
