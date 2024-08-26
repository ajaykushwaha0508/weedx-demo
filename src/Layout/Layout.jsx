import * as React from 'react';
import Grid from '@mui/material/Grid';
import Navbar from '../Components/Component/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Component/Footer/Footer';
import Createcontext from '../Hooks/Context';
import CheckAgeEligbilityPopup from '../Components/Page/CheckAgeEligblityPopup/CheckAgeEligbilityPopup';
import CookiesAccept from '../Components/Component/CookiesAccept/CookiesAccept';
import Cookies from 'universal-cookie';
export default function BasicGrid() {
    const cookies = new Cookies();
    const {state , dispatch} =  React.useContext(Createcontext)
   
    React.useEffect(()=>{
        let date = new Date();
        date.setTime(date.getTime() + (60 * 60 * 8000))
        if (!cookies.get('CookiesAcceptAll')) {
            cookies.set('CookiesAcceptAll', 0, { expires: date })
        }
        if (!cookies.get('Marketing')) {
            cookies.set('Marketing', 0, { expires: date })
        }
        if (!cookies.get('Analytical')) {
            cookies.set('Analytical', 0, { expires: date })
        }
        dispatch({ type: 'Cookies', Cookies: cookies.get("CookiesAcceptAll") })
        dispatch({ type: 'CookiesMarketing', CookiesMarketing: cookies.get("Marketing") })
        dispatch({ type: 'CookiesAnalytical', CookiesAnalytical: cookies.get("Analytical") })
    },[])
    return (
        <div>
              <CheckAgeEligbilityPopup value={cookies.get("CheckAge") === undefined ? true : false} ></CheckAgeEligbilityPopup>
            {
                parseInt(state.Cookies) === 0 && <CookiesAccept></CookiesAccept>
            }
            <div className='sticky-top '>
                <Navbar></Navbar>
            </div>
            <div className='container ' id='layout'>
                <Grid item={true} xs={12} md={12} xl={12}>
                    <Outlet />
                </Grid>
            </div>
            <Footer />

        </div>

    )
}