import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Newsletter from "../../Component/Newsletter/HomePageDealsSignup"
import useStyles from '../../../Style';
import Laws from './Laws/Laws';
import {  useLocation , useNavigate} from 'react-router-dom';

const LearnTabs = () => {
    const Location = useLocation()
    const Naviagte =  useNavigate()
   
    const classes = useStyles()
    const [value, setValue] = React.useState(Location.pathname);
    const handleChange = (event, newValue) => {
       
        setValue(newValue);
        Naviagte(newValue)

    };
    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [])


  
    // /learn/laws-and-regulation/:State
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <Box className={``} sx={{ width: '100%', typography: 'body1', }}>
                        <TabContext value={value}>
                            <Box className={`${classes.learn_tab_background} ${classes.learn_tab}`} sx={{ marginLeft: "-5px", borderColor: 'divider' }}>
                                <TabList scrollButtons={false} variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Law" value="/learn/laws-and-regulation" />
                                    <Tab label="All News" value="" onClick={()=>{Naviagte('/cannabis-news')}} />
                                    <Tab label="Blogs" value="" onClick={()=>{Naviagte('/blogs')}} />

                                </TabList>
                            </Box>
                            <Box className={`${classes.learnTabPadding}`}>
                                <TabPanel value="/learn/laws-and-regulation"><Laws /></TabPanel>
                            </Box>
                        </TabContext>
                    </Box>
                </div>

            </div>
            <Newsletter />
        </div>
    )
}
export default LearnTabs