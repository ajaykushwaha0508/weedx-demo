import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { InputAdornment, CircularProgress } from '@material-ui/core';
import { BsSearch } from "react-icons/bs";
import Axios from "axios";
import { useRouter } from 'next/router';
import Image from 'next/image';
import useStyles from "../../../styles/style";
import AddressSearchapi from "./AddressSearchapi";
import { modifystr } from '../../../hooks/utilis/commonfunction';

const SearchBar = ({ path }) => {
    const router = useRouter();
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const classes = useStyles();
    const [fullwidth, setFullWidth] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [input, setInput] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);
    const [searchBarWidth, setSearchBarWidth] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [debouncedSearchValue, setDebouncedSearchValue] = useState(input);

    // Debounce search input
    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearchValue(input), 500);
        return () => clearTimeout(handler);
    }, [input]);

    React.useEffect(() => {
        if (!debouncedSearchValue) {
            setLoading(false);
            setOpen(false);
            return;
        }
        setLoading(true);
        setOpen(true);
        Axios.post('https://api.cannabaze.com/UserPanel/Get-HomePageFilter/', {
            search: debouncedSearchValue,
        })
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setOpen(true);
                    const searchResults = Object.entries(response.data).flatMap(([type, items]) =>
                        items.map(data => ({
                            type,
                            value: data.name || data.Product_Name || data.Store_Name,
                            id: data.id,
                            image: data?.Brand_Logo || data?.categoryImages || data?.Store_Image || data?.SubCategoryImage || data.images?.[0]?.image || 'default_image_url',
                            StoreName: data.Store_Name,
                            Category: data.category_name,
                            SubCategory_id: data.Sub_Category_id,
                            SubcategoryName: data.SubcategoryName,
                            Store_Type: data.Store_Type
                        }))
                    );
                    setSearchData(searchResults);
                } else {
                    setSearchData([]);
                    setLoading(false);
                }
            })
            .catch(() => {
                setSearchData([]);
                setLoading(false);
                setOpen(true);
            });
    }, [debouncedSearchValue]);

    React.useEffect(() => {
        const updateWidths = () => {
            const container = document.getElementById('navsearchConntainer');
            if (container) {
                const containerWidth = container.clientWidth;
                if (window.innerWidth <= 900) {
                    setSearchBarWidth(true);
                } else {
                    setSearchBarWidth(false);
                }
            }
        };

        window.addEventListener('resize', updateWidths);
        updateWidths();

        return () => window.removeEventListener('resize', updateWidths);
    }, []);

    const handleSearch = (event) => {
        setInput(event.target.value);
    };

    const handleImageError = (event) => {
        event.target.src = "/image/blankImage.jpg"; // Fallback image on error
    };



    const handleSearchAPI = (id, type, t) => {
        if (type === 'Product') {
            setSelectedOption(t.value);
            router.push(`/products/${modifystr(t.Category)}/${modifystr(t.SubcategoryName)}/${modifystr(t.value)}/${t.id}`);
        } else if (type === "Store") {
            setSelectedOption(t.value);
            const route = t.Store_Type === "delivery" ? 'weed-deliveries' : 'weed-dispensaries';
            router.push(`/${route}/${modifystr(t.StoreName)}/${t.id}`);
        } else if (type === "Brand") {
            setSelectedOption(t.value);
            router.push(`/brands/${modifystr(t.value)}/${t.id}`);
        } else if (type === "Sub Category") {
            setSelectedOption(t.value);
            router.push(`/Products/${modifystr(t.Category)}/${modifystr(t.value)}/${t.id}`);
        } else if (type === "Category") {
            setSelectedOption(t.value);
            router.push(`/Products/${modifystr(t.value)}/${t.id}`);
        }

        router.events.on('routeChangeComplete', () => {
            setSearchData([]); // Reset search data
            setInput(''); // Clear input
            setSelectedOption('');
            setOpen(false);
        });
    };

    // const handleOptionClick = (option) => {
    //     console.log("adasd")
    //     handleSearchAPI(option.id, option.type, option);
    // };

    function handleOnFocus() {
        setFullWidth(true);
        if (Boolean(input)) {
            setOpen(true);
        } else {
            setOpen(false);
            setSearchData([]);
        }
    }
    function handleblur() {
        setOpen(false);
        setFullWidth(false)
    }
    const handleKeyDown = (e) => {
        console.log("adadasdadas")
        if (open && searchData.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightedIndex((prevIndex) =>
                    prevIndex < searchData.length - 1 ? prevIndex + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightedIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : searchData.length - 1
                );
            } else if (e.key === 'Enter' && highlightedIndex >= 0) {
                e.preventDefault();
                handleOptionClick(searchData[highlightedIndex]);
            }
        }
    };
    React.useEffect(() => {
        setHighlightedIndex(-1);
    }, [searchData]);

    const handleOptionClick = (option) => {
        // Your logic to handle option click
        console.log('Option selected:', option);
        setInput(option.value); // Set the input value to selected option
        setOpen(false); // Close the dropdown
        handleSearchAPI(option.id, option.type, option);
    };


    return (
        <div className="col_Search">
            <div
                className="nav_search_bar_div center"
                id="navsearchConntainer"
                style={{ display: openLocation && searchBarWidth ? 'block' : 'inline-flex', position: 'relative' }}
            >
                <TextField
                    value={input}
                    onKeyDown={handleKeyDown}
                    onChange={handleSearch}
                    onFocus={handleOnFocus}
                    onBlur={() => setTimeout(handleblur, 150)} // Add a slight delay to avoid blur conflicts
                    placeholder="Products, Brands, Retailers, and more"
                    className={`${classes.Bar_padding} SearchBar nav_search_bar_div ${classes.SearchBar_Text}`}
                    style={{
                        borderRadius: fullwidth && searchBarWidth ? "16px 16px 16px 16px" : "16px 0px 0px 16px",
                        display: openLocation && searchBarWidth ? "none" : "inline-flex",
                        width: "100%",
                        height: '45px'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BsSearch color="#858585" size={16} />
                            </InputAdornment>
                        ),
                        endAdornment: loading && <CircularProgress style={{ color: "#31B655" }} size={20} />,
                    }}
                />

                {(open && searchData.length > 0 )
                ? 
                (
                    <div
                        className="search-results"
                        style={{
                            position: "absolute",
                            top: "100%", // Position it right below the input field
                            left: 0,
                            minHeight: '100px',
                            width: "100%",
                            zIndex: 10, // Ensure the dropdown appears on top
                            backgroundColor: "#fff", // Background for the dropdown
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                            borderRadius: "0 0 16px 16px",
                            maxHeight: "300px", // Set a maximum height for the dropdown
                            overflowY: "auto" // Enable scroll if the content exceeds max height
                        }}
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur when interacting with dropdown
                    >
                        <ul  style={{ padding: 0, margin: 0 }}>
                            {searchData.map((option , index) => (
                                <li
                                    key={index} // Ensure a unique identifier is used
                                    onClick={() => handleOptionClick(option)}
                                    className="searchBarListStyles PopperLIst"
                                    style={{ cursor: 'pointer' }} // Add visual feedback for clickable items
                                >
                                    <Image
                                        unoptimized
                                        src={option.image}
                                        alt={option.value}
                                        width={35}
                                        height={35}
                                        onError={handleImageError}
                                        className="searchBarImageStyles"
                                    />
                                    <span className="searchBarSpanValue">{option.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
                    : (open) &&
                    <div  className='no-result'
                    style={{
                        position: "absolute",
                        top: "100%", // Position it right below the input field
                        left: 0,
                        color:"red" ,
                        minHeight: '90px',
                        width: '100%' ,
                        zIndex: 10, // Ensure the dropdown appears on top
                        backgroundColor: "#fff", // Background for the dropdown
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        borderRadius: "0 0 16px 16px",
                        maxHeight: "300px", // Set a maximum height for the dropdown
                        overflowY: "auto" // Enable scroll if the content exceeds max height
                    }}
                    >
                          <p >no-result found</p>
                    </div>
            }

                <AddressSearchapi
                    openLocation={openLocation}
                    SearchBarWidth={searchBarWidth}
                    setOpenLocation={setOpenLocation}
                    open1={fullwidth}
                    path={path}
                />
            </div>
        </div>


    );
};

export default SearchBar;




// import React, { useState } from 'react';
// import { TextField } from '@mui/material';
// import { InputAdornment, CircularProgress } from '@material-ui/core';
// import { BsSearch } from "react-icons/bs";
// import Axios from "axios";
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import useStyles from "../../../styles/style";
// import AddressSearchapi from "./AddressSearchapi";
// import { modifystr } from '../../../hooks/utilis/commonfunction';

// const SearchBar = ({ path }) => {
//     const router = useRouter();
//     const [highlightedIndex, setHighlightedIndex] = useState(-1);
//     const classes = useStyles();
//     const [fullwidth, setFullWidth] = useState(false);
//     const [searchData, setSearchData] = useState([]);
//     const [input, setInput] = useState('');
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [openLocation, setOpenLocation] = useState(false);
//     const [searchBarWidth, setSearchBarWidth] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');
//     const [debouncedSearchValue, setDebouncedSearchValue] = useState(input);

//     // Debounce search input
//     React.useEffect(() => {
//         const handler = setTimeout(() => setDebouncedSearchValue(input), 500);
//         return () => clearTimeout(handler);
//     }, [input]);

//     React.useEffect(() => {
//         if (!debouncedSearchValue) {
//             setLoading(false);
//             setOpen(false);
//             return;
//         }
//         setLoading(true);
//         setOpen(true);
//         Axios.post('https://api.cannabaze.com/UserPanel/Get-HomePageFilter/', {
//             search: debouncedSearchValue,
//         })
//             .then(response => {
//                 if (response.status === 200) {
//                     setLoading(false);
//                     setOpen(true);
//                     const searchResults = Object.entries(response.data).flatMap(([type, items]) =>
//                         items.map(data => ({
//                             type,
//                             value: data.name || data.Product_Name || data.Store_Name,
//                             id: data.id,
//                             image: data?.Brand_Logo || data?.categoryImages || data?.Store_Image || data?.SubCategoryImage || data.images?.[0]?.image || 'default_image_url',
//                             StoreName: data.Store_Name,
//                             Category: data.category_name,
//                             SubCategory_id: data.Sub_Category_id,
//                             SubcategoryName: data.SubcategoryName,
//                             Store_Type: data.Store_Type
//                         }))
//                     );
//                     setSearchData(searchResults);
//                 } else {
//                     setSearchData([]);
//                     setLoading(false);
//                 }
//             })
//             .catch(() => {
//                 setSearchData([]);
//                 setLoading(false);
//                 setOpen(true);
//             });
//     }, [debouncedSearchValue]);

//     React.useEffect(() => {
//         const updateWidths = () => {
//             const container = document.getElementById('navsearchConntainer');
//             if (container) {
//                 const containerWidth = container.clientWidth;
//                 if (window.innerWidth <= 900) {
//                     setSearchBarWidth(true);
//                 } else {
//                     setSearchBarWidth(false);
//                 }
//             }
//         };

//         window.addEventListener('resize', updateWidths);
//         updateWidths();

//         return () => window.removeEventListener('resize', updateWidths);
//     }, []);

//     const handleSearch = (event) => {
//         setInput(event.target.value);
//     };

//     const handleImageError = (event) => {
//         event.target.src = "/image/blankImage.jpg"; // Fallback image on error
//     };



//     const handleSearchAPI = (id, type, t) => {
//         if (type === 'Product') {
//             setSelectedOption(t.value);
//             router.push(`/products/${modifystr(t.Category)}/${modifystr(t.SubcategoryName)}/${modifystr(t.value)}/${t.id}`);
//         } else if (type === "Store") {
//             setSelectedOption(t.value);
//             const route = t.Store_Type === "delivery" ? 'weed-deliveries' : 'weed-dispensaries';
//             router.push(`/${route}/${modifystr(t.StoreName)}/${t.id}`);
//         } else if (type === "Brand") {
//             setSelectedOption(t.value);
//             router.push(`/brands/${modifystr(t.value)}/${t.id}`);
//         } else if (type === "Sub Category") {
//             setSelectedOption(t.value);
//             router.push(`/Products/${modifystr(t.Category)}/${modifystr(t.value)}/${t.id}`);
//         } else if (type === "Category") {
//             setSelectedOption(t.value);
//             router.push(`/Products/${modifystr(t.value)}/${t.id}`);
//         }

//         router.events.on('routeChangeComplete', () => {
//             setSearchData([]); // Reset search data
//             setInput(''); // Clear input
//             setSelectedOption('');
//             setOpen(false);
//         });
//     };

//     // const handleOptionClick = (option) => {
//     //     console.log("adasd")
//     //     handleSearchAPI(option.id, option.type, option);
//     // };

//     function handleOnFocus() {
//         setFullWidth(true);
//         if (Boolean(input)) {
//             setOpen(true);
//         } else {
//             setOpen(false);
//             setSearchData([]);
//         }
//     }
//     function handleblur() {
//         setOpen(false);
//         setFullWidth(false)
//     }
//     const handleKeyDown = (e) => {
//         console.log("adadasdadas")
//         if (open && searchData.length > 0) {
//             if (e.key === 'ArrowDown') {
//                 e.preventDefault();
//                 setHighlightedIndex((prevIndex) =>
//                     prevIndex < searchData.length - 1 ? prevIndex + 1 : 0
//                 );
//             } else if (e.key === 'ArrowUp') {
//                 e.preventDefault();
//                 setHighlightedIndex((prevIndex) =>
//                     prevIndex > 0 ? prevIndex - 1 : searchData.length - 1
//                 );
//             } else if (e.key === 'Enter' && highlightedIndex >= 0) {
//                 e.preventDefault();
//                 handleOptionClick(searchData[highlightedIndex]);
//             }
//         }
//     };
//     React.useEffect(() => {
//         setHighlightedIndex(-1);
//     }, [searchData]);

//     const handleOptionClick = (option) => {
//         // Your logic to handle option click
//         console.log('Option selected:', option);
//         setInput(option.value); // Set the input value to selected option
//         setOpen(false); // Close the dropdown
//         handleSearchAPI(option.id, option.type, option);
//     };


//     return (
//         <div className="col_Search">
//             <div
//                 className="nav_search_bar_div center"
//                 id="navsearchConntainer"
//                 style={{ display: openLocation && searchBarWidth ? 'block' : 'inline-flex', position: 'relative' }}
//             >
//                 <TextField
//                     value={input}
//                     onKeyDown={handleKeyDown}
//                     onChange={handleSearch}
//                     onFocus={handleOnFocus}
//                     onBlur={() => setTimeout(handleblur, 150)} // Add a slight delay to avoid blur conflicts
//                     placeholder="Products, Brands, Retailers, and more"
//                     className={`${classes.Bar_padding} SearchBar nav_search_bar_div ${classes.SearchBar_Text}`}
//                     style={{
//                         borderRadius: fullwidth && searchBarWidth ? "16px 16px 16px 16px" : "16px 0px 0px 16px",
//                         display: openLocation && searchBarWidth ? "none" : "inline-flex",
//                         width: "100%",
//                         height: '45px'
//                     }}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <BsSearch color="#858585" size={16} />
//                             </InputAdornment>
//                         ),
//                         endAdornment: loading && <CircularProgress style={{ color: "#31B655" }} size={20} />,
//                     }}
//                 />

//                 {(open && searchData.length > 0 )
//                 ? 
//                 (
//                     <div
//                         className="search-results"
//                         style={{
//                             position: "absolute",
//                             top: "100%", // Position it right below the input field
//                             left: 0,
//                             minHeight: '100px',
//                             width: "100%",
//                             zIndex: 10, // Ensure the dropdown appears on top
//                             backgroundColor: "#fff", // Background for the dropdown
//                             boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//                             borderRadius: "0 0 16px 16px",
//                             maxHeight: "300px", // Set a maximum height for the dropdown
//                             overflowY: "auto" // Enable scroll if the content exceeds max height
//                         }}
//                         onMouseDown={(e) => e.preventDefault()} // Prevent blur when interacting with dropdown
//                     >
//                         <ul  style={{ padding: 0, margin: 0 }}>
//                             {searchData.map((option , index) => (
//                                 <li
//                                     key={index} // Ensure a unique identifier is used
//                                     onClick={() => handleOptionClick(option)}
//                                     className="searchBarListStyles PopperLIst"
//                                     style={{ cursor: 'pointer' }} // Add visual feedback for clickable items
//                                 >
//                                     <Image
//                                         unoptimized
//                                         src={option.image}
//                                         alt={option.value}
//                                         width={35}
//                                         height={35}
//                                         onError={handleImageError}
//                                         className="searchBarImageStyles"
//                                     />
//                                     <span className="searchBarSpanValue">{option.value}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )
//                     : (open) &&
//                     <div  className='no-result'
//                     style={{
//                         position: "absolute",
//                         top: "100%", // Position it right below the input field
//                         left: 0,
//                         color:"red" ,
//                         minHeight: '90px',
//                         width: '100%' ,
//                         zIndex: 10, // Ensure the dropdown appears on top
//                         backgroundColor: "#fff", // Background for the dropdown
//                         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//                         borderRadius: "0 0 16px 16px",
//                         maxHeight: "300px", // Set a maximum height for the dropdown
//                         overflowY: "auto" // Enable scroll if the content exceeds max height
//                     }}
//                     >
//                           <p >no-result found</p>
//                     </div>
//             }

//                 <AddressSearchapi
//                     openLocation={openLocation}
//                     SearchBarWidth={searchBarWidth}
//                     setOpenLocation={setOpenLocation}
//                     open1={fullwidth}
//                     path={path}
//                 />
//             </div>
//         </div>


//     );
// };

// export default SearchBar;
