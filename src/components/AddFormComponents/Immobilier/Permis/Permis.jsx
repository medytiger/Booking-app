import React, { useContext } from 'react'
import './Permis.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';


export default function Permis() {
    const { homeData, setHomeData } = useContext(CarHomeDataContext)

    return (
        <div className="permis">
            <h2>Permis</h2>

            <div className="selectContainer">

                <div className="selectGroup">
                    <input type="radio" name="" id="Oui"
                        checked={homeData.permis === "Oui"}
                        onChange={(e) => setHomeData({ ...homeData, permis: "Oui" })}
                    />
                    <label className='card-raduis shadow' htmlFor="Oui">
                        Oui
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="Non"
                        checked={homeData.permis === "Non"}
                        onChange={(e) => setHomeData({ ...homeData, permis: "Non" })}
                    />
                    <label className='card-raduis shadow' htmlFor="Non">
                        Non
                    </label>
                </div>
            </div>

            <div className="textareaGroup">
                <span>Si 'Non' ou si la propriété à des défaut, expliquez-nous !</span>
                <textarea name="" id="" cols="30" rows="10"
                    value={homeData.problemePermis} onChange={(e) => setHomeData({ ...homeData, problemePermis: e.target.value })}
                ></textarea>
            </div>

        </div>
    )
}
