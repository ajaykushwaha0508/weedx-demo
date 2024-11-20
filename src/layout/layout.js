
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic'
// const Navbar = dynamic(() => import('@/component/navbar/newnavbar/nevbar'),{ ssr: false });
const Chartbot = dynamic(() => import('@/component/chartbot/Chartbot'),{ ssr: true });
import Navbar from '@/component/navbar/newnavbar/nevbar';
const Footer = dynamic(() => import('@/component/Footer/Footer'),{ ssr: true });
// import Footer from '@/component/Footer/Footer';
const Layout = ({ children }) => {
  return (
    <div>
      <div className='fixed-top' style={{zIndex:2}}>
        <Navbar/>
      </div>
      <div className='container' id='layout'>
        <Grid item xs={12} md={12} xl={12}>
          <main>{children}</main>
        </Grid>
      </div>
      <Footer/>
      <Chartbot></Chartbot>
    </div>
  );
};

export default Layout;