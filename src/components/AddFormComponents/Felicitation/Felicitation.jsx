import React from 'react'
import './Felicitation.css'
import felicitation from '../../../assets/felicitation.png'

export default function Felicitation() {
    return (
        <div className='felicitation'>
            <img src={felicitation} alt="" loading='lazy' />
        </div>
    )
}
