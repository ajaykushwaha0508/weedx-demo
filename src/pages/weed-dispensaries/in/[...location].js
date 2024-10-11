import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style";
import dynamic from 'next/dynamic'
const WeedDispansires = dynamic(() => import('../../../component/WeedDispansires/Weed_Dispansires'));
const DispensariesSco = dynamic(() => import('../../../component/ScoPage/dispensariessco'), { ssr: true });
// import { DispensariesSco } from "../ScoPage/dispensariessco"
import Createcontext from "@/hooks/context"
// import { useRouter } from 'next/router';
import Wronglocation from "../../../component/skeleton/Wronglocation";
import { modifystr } from "../../../hooks/utilis/commonfunction";
import Location from '../../../hooks/utilis/getlocation';
import Cookies from 'universal-cookie';
import cookie from 'cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography variant="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Dispensaries = (props) => {
    const cookies = new Cookies();
    const classes = useStyles()
    const [searchtext, setsearchtext] = React.useState("");
    const navigate = useRouter()
    const { state, dispatch } = React.useContext(Createcontext)
    const [value, setValue] = React.useState(0);
    let contentdata = props.content || []
    const DispensorShopLocation = [{ name: "Weed Dispensaries in", city: props.formatted_address || state.Location }]
    const locations = props?.formatted_address
    // console.log(props?.formatted_address)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    React.useEffect(() => {

        if (props.isDirectHit || props.isFromGoogle) {
            dispatch({ type: 'Location', Location: props?.formatted_address})
            if (props.locationApi === false && props.setCookies === "notnaivigation") {
                dispatch({ type: 'Location', Location: props?.formatted_address })
                dispatch({ type: 'permission', permission: true });
                dispatch({ type: 'Country', Country: props?.location?.country });
                dispatch({ type: 'countrycode', countrycode: props.location?.countrycode });
                dispatch({ type: 'State', State: props?.location?.state });
                dispatch({ type: 'statecode', statecode: props?.location?.statecode });
                dispatch({ type: 'City', City: props?.location?.city })
                dispatch({ type: 'citycode', citycode: props?.location?.citycode });
                dispatch({ type: 'route', route: props?.location?.route });
                const setLocation = {
                    country: props?.location?.country,
                    state: props?.location?.state,
                    city: props?.location?.city,
                    route: props?.location?.route,
                    formatted_address: props?.formatted_address
                };
                const date = new Date();
                date.setTime(date.getTime() + 60 * 60 * 24 * 365); // 1 year expiry
                cookies.set('fetchlocation', JSON.stringify(setLocation), {
                    expires: date,
                    path: '/' // Set the path where the cookie is accessible
                });
            }

            else if (props.locationApi && props.setCookies === "notnaivigation") {
                dispatch({ type: 'Location', Location: props?.formatted_address })
                dispatch({ type: 'permission', permission: true });
                dispatch({ type: 'Country', Country: props?.location?.country });
                dispatch({ type: 'countrycode', countrycode: props.location?.countrycode });
                dispatch({ type: 'State', State: props?.location?.state });
                dispatch({ type: 'statecode', statecode: props?.location?.statecode });
                dispatch({ type: 'City', City: props?.location?.city })
                dispatch({ type: 'citycode', citycode: props?.location?.citycode });
                const setLocation = {
                    country: props?.location?.country,
                    state: props?.location?.state,
                    city: props?.location?.city,
                    route: props?.location?.route,
                    formatted_address: props?.formatted_address
                };
                const date = new Date();
                date.setTime(date.getTime() + 60 * 60 * 24 * 365); // 1 year expiry
                cookies.set('fetchlocation', JSON.stringify(setLocation), {
                    expires: date,
                    path: '/' // Set the path where the cookie is accessible
                });
            }
            else if (props.locationApi && props.setCookies === "navigate") {
                dispatch({ type: 'Location', Location: props?.formatted_address })
                dispatch({ type: 'permission', permission: true });
                dispatch({ type: 'Country', Country: props?.location?.country });
                dispatch({ type: 'countrycode', countrycode: props.location?.countrycode });
                dispatch({ type: 'State', State: props?.location?.state });
                dispatch({ type: 'statecode', statecode: props?.location?.statecode });
                dispatch({ type: 'City', City: props?.location?.city })
                dispatch({ type: 'citycode', citycode: props?.location?.citycode });
                dispatch({ type: 'route', route: props?.location?.route });
                const setLocation = {
                    country: props?.location?.country,
                    state: props?.location?.state,
                    city: props?.location?.city,
                    route: props?.location?.route,
                    formatted_address: props?.formatted_address
                };
                const date = new Date();
                date.setTime(date.getTime() + 60 * 60 * 24 * 365); // 1 year expiry
                cookies.set('fetchlocation', JSON.stringify(setLocation), {
                    expires: date,
                    path: '/' // Set the path where the cookie is accessible
                });
                const { country, state, city, route } = props.location || {}
                let url = '/weed-dispensaries/in/';
                if (route) {
                    url += `${modifystr(country)}/${modifystr(state)}/${modifystr(city)}/${modifystr(route)}`;
                }
                else if (city) {
                    url += `${modifystr(country)}/${modifystr(state)}/${modifystr(city)}`;
                } else if (state) {
                    url += `${modifystr(country)}/${modifystr(state)}`;
                } else if (country) {
                    url += modifystr(country);
                } else {
                    url = '/weed-dispensaries/'; // Fallback URL
                }

                navigate.replace(url, 0, { shallow: true });


            }
        }
    }, [props.isDirectHit, props.isFromGoogle]);

   async function breadcrumCountry(country, state1, city) {
        // if (Boolean(city)) {
        //     dispatch({ type: 'route', route: "" })
        //     dispatch({ type: 'Location', Location: state.City })
        //     navigate.push(`/weed-dispensaries/in/${modifystr(state.Country.toLowerCase())}/${modifystr(state.State.toLowerCase())}/${modifystr(state.City.toLowerCase())}`)
        // }
        // else if (Boolean(state1)) {
        //     // dispatch({ type: 'Location', Location: state.State })
        //     // dispatch({ type: 'City', City: "" })
        //     // dispatch({ type: 'route', route: "" })
        //     // navigate.push(`/weed-dispensaries/in/${modifystr(state.Country)}/${modifystr(state?.State)}`)
        //     const l=   {
        //         resolvedUrl : `/weed-dispensaries/in/${modifystr(state.Country)}/${modifystr(state?.State)}`
        //     }   
        //    const  type = ""
        //     const k = await Location((state?.State + state.Country)  , type , l, 14, 'dispensaries'); 
        //     console.log(k)
        //     const setLocation = {
        //         country: k?.country,
        //         state: k?.state,
        //         city: k?.city,
        //         route: k?.route,
        //         formatted_address: k?.formatted_address
        //     };
        //     const date = new Date();
        //     date.setTime(date.getTime() + 60 * 60 * 24 * 365); // 1 year expiry
        //     cookies.set('fetchlocation', JSON.stringify(setLocation), {
        //         expires: date,
        //         path: '/' // Set the path where the cookie is accessible
        //     });       
        //     dispatch({ type: 'Location', Location: k?.formatted_address })
        //     dispatch({ type: 'permission', permission: true });
        //     dispatch({ type: 'Country', Country: k?.country });
        //     dispatch({ type: 'countrycode', countrycode: props.location?.countrycode });
        //     dispatch({ type: 'State', State: k?.state });
        //     dispatch({ type: 'statecode', statecode: k?.statecode });
        //     dispatch({ type: 'City', City: k?.city })
        //     dispatch({ type: 'citycode', citycode: k?.citycode });
        //     dispatch({ type: 'route', route: k?.route });                
        //     navigate.push({
        //         pathname: `/weed-dispensaries/in/${modifystr(state.Country)}/${modifystr(state?.State)}`
        //       });
        // }
        // else if (Boolean(country)) {         
        //  const l=   {
        //         resolvedUrl : `/weed-dispensaries/in/${modifystr(state.Country.toLowerCase())}/`
        //     }   
        //    const  type = ""
        //     const k = await Location(state.Country, type , l, 14, 'dispensaries'); 
        //     console.log(k)
        //     const setLocation = {
        //         country: k?.country,
        //         state: k?.state,
        //         city: k?.city,
        //         route: k?.route,
        //         formatted_address: k?.formatted_address
        //     };
        //     const date = new Date();
        //     date.setTime(date.getTime() + 60 * 60 * 24 * 365); // 1 year expiry
        //     cookies.set('fetchlocation', JSON.stringify(setLocation), {
        //         expires: date,
        //         path: '/' // Set the path where the cookie is accessible
        //     });                       
        //     navigate.push({
        //         pathname: `/weed-dispensaries/in/${modifystr(k?.country)}/`
        //       });
        // }

    }
    return (
        <div className="w-100 mx-auto  dispensaries_centers">
            <DispensariesSco location={navigate?.asPath} format_Address={props?.formatted_address} ></DispensariesSco>
            <div className="w-100">
                <div className="headerBoxdescription">
                    <div style={{ cursor: "pointer" }}>

                        <span onClick={() => navigate.push("/")}>{"Home"}</span>
                        {Boolean(props.location.country) && <span> {">"} <span onClick={() => breadcrumCountry("Country")}>{props.location.country}</span></span>}
                        {Boolean(props.location.state) && <span> {">"} <span onClick={() => breadcrumCountry("Country", "state")}>{props.location.state}</span></span>}
                        {Boolean(props.location.city) && <span> {">"} <span onClick={() => { Boolean(props.location.route) && breadcrumCountry("Country", "state", "City") }}>{props.location.city}</span></span>}
                        {Boolean(props.location.route) && <span> {">"} <span>{props.location.route}</span></span>}
                    </div>
                    {DispensorShopLocation?.map((ele, index) => {
                        return (
                            <div key={index}>
                                <h1 className="m-0"> <span className="dispensories_name">{ele.name}</span> <span className="dispensories_name">{ele.city}</span></h1>
                            </div>)
                    })}
                    <p className="m-0">{`Find Nearby Dispensaries in ${props.formatted_address} for Recreational & Medical weed. Browse Top Cannabis Products and Place Orders from Trusted Local Dispensaries.`}</p>
                </div>
            </div>
            <div className="w-100 dispensory_menu my-2">
                {
                    (props.store?.length !== 0 ?
                        <Box className={`dispensories_tabss ${classes.dispensory_tab_background}`} sx={{ width: '100%' }}>
                            <Box className={classes.open_dispensory_tab} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs scrollButtons={false} variant="scrollable" sx={{ justifyContent: 'space-around' }} value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Open" {...a11yProps(0)} />
                                    <Tab label="Storefronts" {...a11yProps(1)} />
                                    <Tab label="delivery" {...a11yProps(2)} />
                                    <Tab label="Order online" {...a11yProps(3)} />
                                </Tabs>
                            </Box>
                            <Box sx={{ "& .MuiBox-root": { paddingLeft: "0px", paddingRight: "0px", paddingTop: "20px" } }}>
                                <TabPanel value={value} index={0}>
                                    <WeedDispansires Store={props.store} location={locations} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} urlcscr={props.location} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <WeedDispansires Store={props.store} location={locations} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} urlcscr={props.location} />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <WeedDispansires Store={props.store} location={locations} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} urlcscr={props.location} />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <WeedDispansires Store={props.store} location={locations} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} urlcscr={props.location} />
                                </TabPanel>
                            </Box>
                        </Box>
                        :
                        <Wronglocation title={' No dispensaries available'} description={'We apologize, but it appears that there are no dispensaries available in your location. Would you like to enter a different address to search for a nearby dispensary?'} />
                    )
                }
            </div>
        </div>
    );
};

async function postData(createurl, value, address) {
    const url = 'https://api.cannabaze.com/UserPanel/Update-SiteMap/14';
    const data = {
        j: createurl,
        address: value,
        formate: ", " + address
    };

    try {
        const response = await fetch(url, {
            method: 'POST', // Specify the request method as POST
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        });

        if (!response.ok) {
            console.trace(`HTTP error! Staus: ${response.status}`);
        }

        const result = await response.json(); // Parse the JSON response
    } catch (error) {
        console.error('Error:', error);
    }
}


function capitalizeFirstLetter(string) {
    return string
        .split(/[\s-]/)  // Split by both space and hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize the first letter, lowercase the rest
        .join(' ');  // Join the words back with spaces
}


export const getServerSideProps= async (context) => {

    const { req, query } = context;
    const { headers: { referer }, url } = req;
    const isDirectHit = !referer || referer === req.url;
    let country1 = "", state = "", city = "", formatted_address = "", route = "", locationApi = "", setCookies = "";
    const isFromGoogle = referer?.includes('google') || false;
     let data 

    const transformString = (str) => {
        if (typeof str !== "string" || !str.trim()) {
            return '';
        }

        return str
            .replace(/-/g, " ")  // Replace hyphens with spaces
            .split(' ')          // Split the string into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize the first letter of each word
            .join(' ');          // Join the words back into a single string
    };


    if (isDirectHit || isFromGoogle ) {
        const locationParams = context.params.location || [];
        const type = {
            country: locationParams[0] || "",
            state: locationParams[1] || "",
            city: locationParams[2] || "",
            route: locationParams[3] || "",
        };

        const decodedLocation = locationParams.map((param) => decodeURIComponent(param)).reverse().join(' ');
    
        const k = await Location(decodedLocation, type, context, 14, 'dispensaries');
        country1 = k.country || "";
        state = k.state || "";
        city = k.city || "";
        route = k.route || "";
        formatted_address = k.formatted_address || "";
        locationApi = k.api,
        setCookies = k.cookies

    }

    else {
        const cookies = context.req?.headers?.cookie ? cookie.parse(context.req.headers.cookie) : {};
        cookies.fetchlocation = cookies.fetchlocation ? JSON.parse(cookies.fetchlocation) : null;
        country1 = cookies?.fetchlocation?.country || "";
        state = cookies?.fetchlocation?.state || "";
        city = cookies?.fetchlocation?.city || "";
        route = cookies?.fetchlocation?.route || "",
            formatted_address = cookies?.fetchlocation?.formatted_address || "";
        const createurl = Boolean(route) ? `https://www.weedx.io/weed-dispensaries/in/${modifystr(country1)}/${modifystr(state)}/${modifystr(city)}/${modifystr(route)}`
            : Boolean(city) ? `https://www.weedx.io/weed-dispensaries/in/${modifystr(country1)}/${modifystr(state)}/${modifystr(city)}`
                : Boolean(state) ? `https://www.weedx.io/weed-dispensaries/in/${modifystr(country1)}/${modifystr(state)}`
                    : Boolean(country1) && `https://www.weedx.io/weed-dispensaries/in/${modifystr(country1)}`
    
        await postData(createurl, false, formatted_address, 14)
    }
    
    const object = {
        City: transformString(city) || '',
        Country: transformString(country1) || '',
        State: transformString(state) || '',
    };
    const object1 = {
        ...object,
        limit: 10,
    };
    const object2 = {
        City: capitalizeFirstLetter(city.replace(/-/g, ' ')),
        State: capitalizeFirstLetter(state.replace(/-/g, ' ')),
        Country: capitalizeFirstLetter(country1.replace(/-/g, ' ')),
    };
    try {

        // Fetch product data and webpage content in parallel   
        const [productResponse, Dispensaries ,  Webcontent] = await Promise.all([
            fetch('https://api.cannabaze.com/UserPanel/Get-AllProduct/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object1),
            }),
            fetch('https://api.cannabaze.com/UserPanel/Get-Dispensaries/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object2),
            }),
          !Boolean(route) &&  fetch('https://api.cannabaze.com/UserPanel/Get-WebpageDescriptionDispensary/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object2),
            })
        ]);
 
        // Handle product response
        if (!Dispensaries.ok) {
            data = []
        }

        let products = [];
        if (productResponse.ok) {
            const productData = await productResponse.json();
            products = productData !== "No Product Found"
                ? productData.filter(item => item.Store_Type !== "dispensary")
                : [];
        }
        // Handle webpage content response
        let content = [];
        if (Webcontent.ok) {
            content = await Webcontent.json();
        }

        if (Dispensaries.ok) {
            data = await Dispensaries.json() || [];
            
        }

        

        if (data === "No Dispensary in your area") {
            return {
                props: {
                    store: [],
                    product: [],
                    location: { country: country1, state: state, city: city, route },
                    formatted_address,
                    isDirectHit,
                    locationApi,
                    setCookies,
                    isFromGoogle,
                    content,
                
                }
            };
        }

        // Return props if data is available
        return {
            props: {
                store: data,
                product: products,
                location: { country: country1, state: state, city: city, route },
                formatted_address,
                isDirectHit,
                locationApi,
                setCookies,
                isFromGoogle,
                content,
                
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        // Handle errors gracefully and return a 404 page
        return {
            notFound: true,
        };
    }
};


export default Dispensaries;