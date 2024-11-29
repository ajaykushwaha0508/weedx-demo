import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { InputAdornment, CircularProgress } from '@material-ui/core';
import { BsSearch } from "react-icons/bs";
import Axios from "axios";
import { useRouter } from 'next/router';
import Image from 'next/image';
import useStyles from "../../../styles/style";
import AddressSearchapi from "./AddressSearchapi";
import { modifystr } from '../../../hooks/utilis/commonfunction';
import { styled } from '@mui/material/styles';

const SearchBar = ({ path }) => {
    const router = useRouter();
    const classes = useStyles();

    const [SearchData, setSearchData] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [openLocation, setOpenLocation] = React.useState(false);
    const [searchBarWidth, setSearchBarWidth] = React.useState(false);
    const [Selctionoption, setSelctionoption] = React.useState('');
    const [debouncedSearchValue, setDebouncedSearchValue] = React.useState(input);

    // Debounce search input
    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearchValue(input), 500);
        return () => clearTimeout(handler);
    }, [input]);

    React.useEffect(() => {
        if (!debouncedSearchValue) {
            setLoading(false);
            setOpen(false)
            return;
        }
        setLoading(true);
        setOpen(true)
        Axios.post('https://api.cannabaze.com/UserPanel/Get-HomePageFilter/', {
            search: debouncedSearchValue,
        }).then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setOpen(true)
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
                setOpen(true)
            });
    }, [debouncedSearchValue]);

    React.useEffect(() => {
        const updateWidths = () => {
            const container = document.getElementById('navsearchConntainer');
            if (container) {
                const containerWidth = container.clientWidth;
                if (window.innerWidth <= 992) {
                    setSearchBarWidth(true);
                    // setOptionWidth(containerWidth);
                } else {
                    setSearchBarWidth(false);
                }
            }
        };

        window.addEventListener('resize', updateWidths);
        updateWidths(); // Run once on mount

        return () => window.removeEventListener('resize', updateWidths);
    }, []);

    const handleSearch = (event) => {
        setInput(event.target.value)
    };

    const handleImageError = (event) => {
        event.target.src = "/image/blankImage.jpg"; // Fallback image on error
    };

    const handleSearchAPI = (id, type, t) => {
        if (type === 'Product') {
            setSelctionoption(t.value)
            router.push(`/products/${modifystr(t.Category)}/${modifystr(t.SubcategoryName)}/${modifystr(t.value)}/${t.id}`);
        } else if (type === "Store") {
            setSelctionoption(t.value)
            const route = t.Store_Type === "delivery" ? 'weed-deliveries' : 'weed-dispensaries';
            router.push(`/${route}/${modifystr(t.StoreName)}/${t.id}`);
        } else if (type === "Brand") {
            setSelctionoption(t.value)
            router.push(`/brands/${modifystr(t.value)}/${t.id}`);
        } else if (type === "Sub Category") {
            setSelctionoption(t.value)
            router.push(`/Products/${modifystr(t.Category)}/${modifystr(t.value)}/${t.id}`);
        } else if (type === "Category") {
            setSelctionoption(t.value)
            router.push(`/Products/${modifystr(t.value)}/${t.id}`);
        }

        router.events.on('routeChangeComplete', () => {
            setSearchData([]); // Reset search data
            setInput(''); // Clear input
            setSelctionoption('')
        });
    };
    
    function handleclose() {
        setOpen(false)
        setLoading(false)
    }

    function handleOnfocus() {
        if (Boolean(input)) {
            setOpen(true)

        }
        else {
            setOpen(false)
        }
    }

    return (
        <div className="col_Search">
            <div className="nav_search_bar_div center" id="navsearchConntainer" style={{ display: openLocation && searchBarWidth ? 'block' : 'inline-flex' }}>
                <Autocomplete
                    id="disable-close-on-select"
                    disableClearable
                    open={open}
                    onFocus={() => handleOnfocus()}
                    onClose={() => handleclose()}
                    noOptionsText={<li className="no-result"><p>No results found</p></li>}
                    inputValue={Selctionoption || input}
                    groupBy={(option) => option.type}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option?.value || ''}
                    options={SearchData}
                    onChange={(event, value) => handleSearchAPI(value?.id, value?.type, value)}
                    renderOption={(props, t) => {
                        return (
                            <div {...props} key={t.id} className="text-dark">
                                <ul className="PopperLIst">
                                    <li onClick={() => handleSearchAPI(t.id, t.type, t)} className="searchBarListStyles">
                                        <Image
                                            unoptimized
                                            src={t.image}
                                            alt={t.value}
                                            width={35}
                                            height={35}
                                            onError={handleImageError}
                                            className="searchBarImageStyles"
                                        />
                                        <span className="searchBarSpanValue">{t.value}</span>
                                    </li>
                                </ul>
                            </div>
                        );
                    }}
                    sx={{
                        width: '100%',
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onChange={(e) => handleSearch(e)}
                            placeholder="Products, Brands, Retailers, and more"
                            className={`${classes.Bar_padding} SearchBar nav_search_bar_div ${classes.SearchBar_Text}`}
                            style={{
                                borderRadius: (open && searchBarWidth) ? "16px 16px 16px 16px" : "16px 0px 0px 16px",
                                top: "0px",
                                display: openLocation && searchBarWidth ? "none" : "inline-flex",
                                width: "100%",
                            }}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BsSearch color="#858585" size={16} />
                                    </InputAdornment>
                                ),
                                endAdornment: loading && <CircularProgress style={{ color: "#31B655" }} size={20} />,
                            }}
                        />
                    )}
                />
                <AddressSearchapi
                    openLocation={openLocation}
                    SearchBarWidth={searchBarWidth}
                    setOpenLocation={setOpenLocation}
                    open1={open}
                    path={path}
                />
            </div>
        </div>

    );
};

export default React.memo(SearchBar);
