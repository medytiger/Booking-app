import React from 'react';
import './Loader.css';

export default function Loader() {
    return (
        <div className='loaderContainer'>
            <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </div>
    );
}
