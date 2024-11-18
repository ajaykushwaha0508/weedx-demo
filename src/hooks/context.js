import React, { useReducer, createContext, useEffect, useMemo } from 'react';
import Reducer from './reduser';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { WishListget } from '@/component/Whishlist/WishListApi_';
import { StaticImages } from '@/hooks/apicall/api';
const getTokenFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('User_Token_access');
    }
    return null;
};
const CreateContext = createContext();
const cookies = new Cookies();
const login = cookies.get("User_Token_access") || getTokenFromLocalStorage();
const isLoggedIn = !!login;

const initialState = {
    login: isLoggedIn,
    ApiProduct: false,
    AllProduct: [],
    DeliveryOption: false,
    DeliveryInformation: false,
    Cart_subTotal: "",
    LoadingApi: false,
    Order_place: false,
    Dispensories: [],
    DefalutLocation: "",
    Location: "",
    permission: true,
    LocationData: [],
    cookies: 1,
    CookiesMarketing: 1,
    CookiesAnalytical: 1,
    DeliveryAddress: "",
    selectDeliveryoptions: "",
    Profile: [],
    GoogleImage: "",
    WishList: [],
    Country: "",
    State: "",
    City: "",
    route: "",
    StaticImage: [],
    Loading: false,
    PromoCode: "",
    Coupoun: [],
    CoupounAmount: "",
    locationFocus: false,
    DeliveryCountry: "",
    DeliveryCity: "",
    DeliveryState: "",
    coupoun_code: "",
    DeliveryPrice: "",
    MinimumOrderPrice: "",
    Embeddedstore: [],
    havecity: false,
    havestate: false,
    havecountry: false,
    countrycode: "",
    citycode: "",
    statecode: "",
    location_Api: true,
};

const Context = (props) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        const cookies = new Cookies();
        const userToken = cookies.get("User_Token_access") || getTokenFromLocalStorage();
        
        const initializeCart = async (token) => {
            dispatch({ type: 'LoadingApi', LoadingApi: true });
            
            try {
                const { data: cartProducts } = await axios.get("https://api.cannabaze.com/UserPanel/Get-Addtocart/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                const cartSubTotal = cartProducts.reduce((total, product) => {
                    const productPrice = product.DiscountedAmount ? product.DiscountedAmount : product.TotalPrice;
                    return total + parseInt(productPrice, 10);
                }, 0);
                
                const deliveryPrice = cartProducts[0]?.DeliveryPrice || 0;
                const minimumOrderPrice = cartProducts[0]?.MinimumOrderPrice || 0;

                const calculatedDeliveryPrice = cartSubTotal > minimumOrderPrice ? 0 : deliveryPrice;
                
                dispatch({ type: 'AllProduct', AllProduct: cartProducts });
                dispatch({ type: 'Cart_subTotal', Cart_subTotal: cartSubTotal + calculatedDeliveryPrice });
                dispatch({ type: 'DeliveryPrice', DeliveryPrice: calculatedDeliveryPrice });
                dispatch({ type: 'MinimumOrderPrice', MinimumOrderPrice: minimumOrderPrice });
                dispatch({ type: 'LoadingApi', LoadingApi: false });
            } catch (error) {
                console.error(error);
                dispatch({ type: 'LoadingApi', LoadingApi: false });
            }
        };

        const initializeWishlist = async () => {
            try {
                const { data: wishlistItems } = await WishListget();
                const wishlistObject = wishlistItems.reduce((acc, item) => {
                    acc[item.id] = true;
                    return acc;
                }, {});
                dispatch({ type: 'WishList', WishList: wishlistObject });
            } catch (error) {
                console.error(error);
            }
        };

        const initializeUserProfile = async (token) => {
            try {
                const { data: userProfile } = await axios.get("https://api.cannabaze.com/UserPanel/Get-GetUserProfile/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                dispatch({ type: 'Profile', Profile: userProfile });
            } catch (error) {
                console.error(error);
            }
        };

        if (userToken) {
            dispatch({ type: 'Login', login: true });
            initializeCart(userToken);
            initializeUserProfile(userToken);
            initializeWishlist();
        } else {
            const storedCartItems = JSON.parse(localStorage.getItem("items") || "[]");
            const cartSubTotal = storedCartItems.reduce((total, item) => {
                return total + parseInt(item.Price.SalePrice * item.Cart_Quantity, 10);
            }, 0);

            dispatch({ type: 'AllProduct', AllProduct: storedCartItems });
            dispatch({ type: 'Cart_subTotal', Cart_subTotal: cartSubTotal });
            dispatch({ type: 'LoadingApi', LoadingApi: false });
        }

        // Set default location from cookies
        const defaultLocation = cookies.get("Location");
        if (defaultLocation) {
            dispatch({ type: 'DefalutLocation', DefalutLocation: defaultLocation });
        }

    }, [state.ApiProduct, state.login]);

    // Memoize the context value to prevent re-renders
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <CreateContext.Provider value={contextValue}>
            {props.children}
        </CreateContext.Provider>
    );
};

export default CreateContext;
export { Context };
