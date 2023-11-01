import React, { useContext } from 'react';
import { UserContext } from '../../userContext/userContext';
import './IndexPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header';
import IndexMain from '../../components/IndexMain/IndexMain';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import { motion } from 'framer-motion';




export default function IndexPage() {

    const {
        ready,
    } = useContext(UserContext);

    if (!ready) {
        return <Loader />
    }

    return (
        <>
            <motion.div
                initial={{ height: '0' }}
                animate={{ height: '100%' }}
                exit={{
                    y: window.innerHeight,
                    transition: { duration: .5 }
                }}
            >
                <Navbar />
                <Header />
                <IndexMain />
                <Footer />
                <div className="whatsSapp">
                    <a target='_blank' href="https://wa.me/0706223380?"><ion-icon name="logo-whatsapp"></ion-icon></a>
                </div>
            </motion.div>
        </>
    )
}
