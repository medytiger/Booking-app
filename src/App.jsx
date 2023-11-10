import axios from 'axios'
import IndexPage from './pages/IndexPage/IndexPage'

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const CLIENT_URL = 'http://localhost:5000';
export const EMAIL = 'konateahmed14@outlook.com'
export const EMAIL_SUPPORT = 'konateahmed14@gmail.com'
export const ORANGE = '2250706223380'
export const MTN = '2250576664121'
export const NUMERO_SUPPORT = '2250576664121'

function App() {


  return (
    <>
      <IndexPage />
    </>
  )
}

export default App
