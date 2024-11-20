
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import React from 'react';
// const Navbar = dynamic(() => import('@/component/navbar/newnavbar/nevbar'),{ ssr: false });
const Chartbot = dynamic(() => import('@/component/chartbot/Chartbot'),{ ssr: false });
import Navbar from '@/component/navbar/newnavbar/nevbar';
const Footer = dynamic(() => import('@/component/Footer/Footer'),{ ssr: false });
// import Footer from '@/component/Footer/Footer';
import { Roboto } from '@next/font/google';
  const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100',  '300', '400', '500', '700'],
  });
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className='fixed-top' style={{zIndex:2}}>
        <Navbar/>
      </div>
      <div className='container' id='layout'>
        <Grid item xs={12} md={12} xl={12}>
          <main className={roboto.className}>{children}</main>
        </Grid>
      </div>
      <Footer/>
      <Chartbot></Chartbot>
    </React.Fragment>
  );
};

export default Layout;