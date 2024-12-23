import React,{useEffect} from 'react';
import Embadedfooter from '@/component/Embeded/embededFooter/Embadedfooter';
import Embadednavbar from '@/component/Embeded/embededNavbar/Embadednavbar';
const Layout1 = ({ children }) => {
  return (
    <div>
      <Embadednavbar />
        <div className='container'>
          <main>{children}</main>
        </div>
      <Embadedfooter/>
    </div>
  );
};  
export default Layout1;