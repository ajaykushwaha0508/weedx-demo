
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic'
// const Navbar = dynamic(() => import('../component/navbar'),{ ssr: false });
const Chartbot = dynamic(() => import('@/component/chartbot/Chartbot'));
import Navbar from '@/component/navbar';
const Footer = dynamic(() => import('@/component/Footer/Footer'));
// import Chartbot from '@/component/chartbot/Chartbot';
import newclases from '@/styles/customstyle.module.scss';
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