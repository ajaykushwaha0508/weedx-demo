import { useEffect, useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';

import Navbar from '@/component/navbar/newnavbar/nevbar';

// import Footer from '@/component/Footer/Footer';

// import Chartbot from '@/component/chartbot/Chartbot';
const Layout = ({ children }) => {




  return (
    <div>
      <div className='fixed-top' style={{ zIndex: 2 }}>
        <Navbar  />
      </div>
      <div className='container' id='layout'>
        <Grid item  xs={12} md={12} xl={12}>
          <main>{children}</main> 
        </Grid>
      </div>
      {/* <Footer />
      <Chartbot /> */}
    </div>
  );
};

export default Layout;
