import React, { useContext } from 'react'
import './Permis.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';


export default function Permis() {
    const { homeData, setHomeData } = useContext(CarHomeDataContext)

    return (
        <div className="permis">
            <h2>Document</h2>

            <div className="selectContainer">

                <div className="selectGroup">
                    <input type="radio" name="" id="ACD"
                        checked={homeData.permis === "ACD"}
                        onChange={(e) => setHomeData({ ...homeData, permis: "ACD" })}
                    />
                    <label className='card-raduis shadow' htmlFor="ACD">
                        ACD
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="Attestation villageoise"
                        checked={homeData.permis === "Attestation villageoise"}
                        onChange={(e) => setHomeData({ ...homeData, permis: "Attestation villageoise" })}
                    />
                    <label className='card-raduis shadow' htmlFor="Attestation villageoise">
                        Attestation villageoise
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="CMPF"
                        checked={homeData.permis === "CMPF"}
                        onChange={(e) => setHomeData({ ...homeData, permis: "CMPF" })}
                    />
                    <label className='card-raduis shadow' htmlFor="CMPF">
                        CMPF
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="CPF"
                        checked={homeData.permis === "CPF"}
                        onChange={(e) => setHomeData({ ...homeData, permis: "CPF" })}
                    />
                    <label className='card-raduis shadow' htmlFor="CPF">
                        CPF
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="CF"
                        checked={homeData.permis === "CF"}
                        onChange={(e) => setHomeData({ ...homeData, permis: "CF" })}
                    />
                    <label className='card-raduis shadow' htmlFor="CF">
                        CF
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="APFR"
                        checked={homeData.permis === "APFR"}
                        onChange={(e) => setHomeData({ ...homeData, permis: "APFR" })}
                    />
                    <label className='card-raduis shadow' htmlFor="APFR">
                        APFR
                    </label>
                </div>
            </div>

            <div className="textareaGroup">
                <span>Défaut ou problème de sécurité potentiel dans votre propriété</span>
                <textarea name="" id="" cols="30" rows="10"
                    value={homeData.problemePermis} onChange={(e) => setHomeData({ ...homeData, problemePermis: e.target.value })}
                ></textarea>
            </div>

        </div>
    )
}
