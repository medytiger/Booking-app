import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom'
import App from './App.jsx'
import CarDetails from './pages/CarDetails/CarDetails'
import HomeDetails from './pages/HomeDetails/HomeDetails'
import Page404 from './pages/Page404/Page404.jsx'
import Compte from './pages/Compte/Compte.jsx'
import Profil from './pages/Profil/profil.jsx'
import Reservations from './components/CompteComponent/Reservations/Reservations'
import Proprietes from './components/CompteComponent/Proprietes/Proprietes'
import Securite from './components/CompteComponent/Securite/Securite.jsx'
import Facturation from './components/CompteComponent/Facturation/Facturation.jsx'
import Notification from './components/CompteComponent/Notification/Notification.jsx'
import Confidentialite from './components/CompteComponent/Confidentialite/Confidentialite.jsx'
import Aide from './components/CompteComponent/Aide/Aide.jsx'
import { UserContextProvider } from './userContext/userContext'
import { CatHomeDataProvider } from './AddDataContext/AddDataContext'

import Dashboard from './pages/Dashboard/Dashboard'
import Users from './components/DashboardComponent/Users/AllUser'
import Homes from './components/DashboardComponent/Homes/Homes'
import HomesReservations from './components/DashboardComponent/HomesReservations/homesReservations'
import Cars from './components/DashboardComponent/Cars/Cars'
import CarsReservations from './components/DashboardComponent/CarsReservations/CarsReservations'
import Annonce from './pages/Annonce/Annonce'

import CentreAide from './pages/FooterLink/CentreAide/CentreAide'
import Travail from './pages/FooterLink/Travail/Travail'
import Litiges from './pages/FooterLink/Litiges/Litiges'
import ConditionsGenerales from './pages/FooterLink/ConditionsGenerales/ConditionsGenerales'
import MettreUnBien from './pages/FooterLink/MettreUnBien/MettreUnBien'
import FooterSecurite from './pages/FooterLink/Securite/Securite'
import FooterFacturation from './pages/FooterLink/Facturation/Facturation'
import FooterConfidentialite from './pages/FooterLink/Confidentialite/Confidentialite'
import About from './pages/About/About'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const route = createBrowserRouter([

  { path: "/", element: <App /> },
  {
    path: "/annonce",
    element: <Annonce />
  },
  {
    path: "/compte",
    element: <Compte />,
    children: [
      { path: "/compte/proprietes", element: <Proprietes /> },
      { path: "/compte/reservations", element: <Reservations /> },
      { path: "/compte/securite", element: <Securite /> },
      { path: "/compte/facturation", element: <Facturation /> },
      { path: "/compte/notification", element: <Notification /> },
      { path: "/compte/confidentialite", element: <Confidentialite /> },
      { path: "/compte/aide", element: <Aide /> },
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/utilisateurs", element: <Users /> },
      { path: "/dashboard/maisons", element: <Homes /> },
      { path: "/dashboard/maisons-reservees", element: <HomesReservations /> },
      { path: "/dashboard/voitures", element: <Cars /> },
      { path: "/dashboard/voitures-reservees", element: <CarsReservations /> },
    ]
  },
  {
    path: "/profil",
    element: <Profil />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/home-details/:homeId",
    element: <HomeDetails />
  },
  {
    path: "/car-details/:carId",
    element: <CarDetails />
  },
  { path: "/centre-d'aide", element: <CentreAide /> },
  { path: "/travailler-chez-Nomade", element: <Travail /> },
  { path: "/litige", element: <Litiges /> },
  { path: "/conditions-générales", element: <ConditionsGenerales /> },
  {
    path: "/mettre-un-bien-sur-Nomade",
    element: <MettreUnBien />
  },
  {
    path: "/facturation",
    element: <FooterFacturation />
  },
  {
    path: "/sécurité",
    element: <FooterSecurite />
  },
  {
    path: "/confidentialité",
    element: <FooterConfidentialite />
  },
  {
    path: "*",
    element: <Page404 />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CatHomeDataProvider>
        <RouterProvider router={route} >
          <Outlet />
        </RouterProvider>
      </CatHomeDataProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
