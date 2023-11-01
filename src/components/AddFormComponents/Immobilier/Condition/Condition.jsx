import React, { useContext } from 'react'
import './Condition.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';


export default function Condition() {
    const { homeData, setHomeData } = useContext(CarHomeDataContext)

    return (
        <div className='condition'>
            <h2>CONDITIONS</h2>
            <input
                type='number'
                value={homeData.prix} onChange={(e) => setHomeData({ ...homeData, prix: e.target.value })}
                placeholder='le prix'
            />

            <div className='selectContainer'>
                <div className="selectGroup">
                    <input type="radio" name="" id="heure"
                        checked={homeData.duree === "L'heure"}
                        onChange={(e) => setHomeData({ ...homeData, duree: "L'heure" })}
                    />
                    <label className='card-raduis shadow' htmlFor="heure">
                        L'heure
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="nuit"
                        checked={homeData.duree === "La nuit"}
                        onChange={(e) => setHomeData({ ...homeData, duree: "La nuit" })}
                    />
                    <label className='card-raduis shadow' htmlFor="nuit">
                        La nuit
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="journee"
                        checked={homeData.duree === "La journée"}
                        onChange={(e) => setHomeData({ ...homeData, duree: "La journée" })}
                    />
                    <label className='card-raduis shadow' htmlFor="journee">
                        La journée
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="mois"
                        checked={homeData.duree === "Le mois"}
                        onChange={(e) => setHomeData({ ...homeData, duree: "Le mois" })}
                    />
                    <label className='card-raduis shadow' htmlFor="mois">
                        Le mois
                    </label>
                </div>
            </div>


            <textarea rows={8}
                value={homeData.condition} onChange={(e) => setHomeData({ ...homeData, condition: e.target.value })}
                placeholder='Ajouter les conditions financières et  les documents à fournir pour pouvoir occuper la propriété'></textarea>
        </div>
    )
}
