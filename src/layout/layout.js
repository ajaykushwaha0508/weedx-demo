
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import React, { useContext } from "react";
import Createcontext from "../hooks/context";
// const Navbar = dynamic(() => import('@/component/navbar/newnavbar/nevbar'),{ ssr: false });
// const Chartbot = dynamic(() => import('@/component/chartbot/Chartbot'),{ ssr: false });
import Navbar from '@/component/navbar/newnavbar/nevbar';
// const Footer = dynamic(() => import('@/component/Footer/Footer'),{ ssr: false });
import Footer from '@/component/Footer/Footer';
import Chartbot from '@/component/chartbot/Chartbot';
// import { Roboto } from '@next/font/google';
import { Inter , Roboto , Poppins } from 'next/font/google'
import Embadednavbar from '@/component/Embeded/embededNavbar/Embadednavbar';
import Embadedfooter from '@/component/Embeded/embededFooter/Embadedfooter';

  const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100',  '300', '400', '500', '700'],
    variable: '--font-roboto',
  });
  const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    weight: ['100',  '300', '400', '500', '700'],
  });
  const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    display: 'swap',
    weight: ['100',  '300', '400', '500', '700'],
  });
  const Layout = ({ children }) => {
  const { state, dispatch } = useContext(Createcontext)
    return (
        <div className={`${roboto.variable}  ${inter.variable}  ${poppins.variable}`}>
              <div className='fixed-top' style={{zIndex:2}}>
                {
                  state.Embedded_Store.StoreID === "" ? <Navbar/> : <Embadednavbar/>
                }
                {/* <Navbar/> */}
              </div>
              <div className='container' id='layout'>
                <Grid item xs={12} md={12} xl={12}>
                  <main >{children}</main>
                </Grid>
              </div>
              {
                state.Embedded_Store.StoreID === "" ?<> <Footer/>
                <Chartbot></Chartbot> </> : <Embadedfooter/>
              }
        </div>  
    );
  };

export default Layout;