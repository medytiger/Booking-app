import React, { useContext } from 'react'
import './Localisation.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';


export default function Localisation() {
    const { homeData, setHomeData } = useContext(CarHomeDataContext)

    return (
        <div className='localisation'>
            <h2>ADRESSE </h2>

            <div className='AddressFormContent'>

                <input className='btn-raduis'
                    type="text" placeholder='pays'
                    value={homeData.pays} onChange={(e) => setHomeData({ ...homeData, pays: e.target.value })}

                />
                <input className='btn-raduis'
                    type="text" placeholder='Ville'
                    value={homeData.ville} onChange={(e) => setHomeData({ ...homeData, ville: e.target.value })}

                />
                <input className='btn-raduis'
                    type="text" placeholder='Commune'
                    value={homeData.commune} onChange={(e) => setHomeData({ ...homeData, commune: e.target.value })}

                />
                <input className='btn-raduis'
                    type="text" placeholder='Quartier'
                    value={homeData.quartier} onChange={(e) => setHomeData({ ...homeData, quartier: e.target.value })}

                />
                <input className='btn-raduis'
                    type="text" placeholder='Nom de la rue'
                    value={homeData.nomRue} onChange={(e) => setHomeData({ ...homeData, nomRue: e.target.value })}

                />
                <input className='btn-raduis'
                    type="text" placeholder='Code postal'
                    value={homeData.codePostal} onChange={(e) => setHomeData({ ...homeData, codePostal: e.target.value })}

                />

            </div>


        </div>
    )
}
