import React, { useContext } from 'react'
import './Description.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';


export default function Description() {
    const { homeData, setHomeData } = useContext(CarHomeDataContext)

    return (
        <div className='description'>
            <h2>description de la propriete</h2>
            <input type="text"
                value={homeData.titre} onChange={(e) => setHomeData({ ...homeData, titre: e.target.value })}
                placeholder='Titre de la propriété' />

            <textarea name="" className='card-raduis' id="" rows="13" cols="50"
                value={homeData.description} onChange={(e) => setHomeData({ ...homeData, description: e.target.value })}
                placeholder='Entrez une description de la propriété'></textarea>
        </div>
    )
}
