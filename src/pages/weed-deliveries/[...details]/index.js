
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from 'next/dynamic'
import useStyles from "../../../styles/style"
const ProductFilter = dynamic(() => import('../../../component/Filter/ProductFilter'), { ssr: true });
const ProductList = dynamic(() => import('../../../component/productcard/ProductList'), { ssr: true });
import { BsLayoutSplit } from "react-icons/bs"
import { MdOutlineBrandingWatermark } from "react-icons/md"
import { MdOutlinePriceChange } from "react-icons/md"
import { BsStripe } from "react-icons/bs"
import { GiWeightScale } from "react-icons/gi"
import _ from "lodash"
import newclases from '@/styles/customstyle.module.css'
const NewFlavourBanner = dynamic(() => import('../../../component/StoreDetails/NewFlavourBanner'), { ssr: true });
const StoreDetailMenuItem = dynamic(() => import('../../../component/StoreDetails/StoreDetailComponent/StoreDetailMenuItem'), { ssr: true });
import CategoryProduct from "../../../component/category/category";
const ComponentStoreDetails = dynamic(() => import('../../../component/StoreDetails/StoreDetailComponent/ComponentStoreDetails'), { ssr: true });
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import Layout from "@/layout/layout";
import Review from "../../../component/Review/Review";
const StoreDetails = dynamic(() => import('../../../component/ScoPage/StoreDetails'), { ssr: true });
import { Store_Add_Review, Store_OverAllGet_Review, Store_Get_UserComment, Store_Get_Review, Delete_StoreReview, StoreHelpFull } from "../../../hooks/apicall/api";
import Createcontext from "../../../hooks/context"
import DispensoriesAddressSkeleton from "../../../component/skeleton/DashBoardSkeleton/DispensoriesAddressSkeleton";
import { modifystr } from "../../../hooks/utilis/commonfunction";
import Swal from 'sweetalert2';
import Image from "next/image";
import clases from '@/styles/customstyle.module.css'
import Oops from "@/component/Oops/Oops";
import Reviewextrs from '@/component/storedetailsfootecomponent/review';
import Fqa from '@/component/storedetailsfootecomponent/faq'
export default function DispensoriesDetails(props) {
    const navigate = useRouter()
    var { id, storeData, product , allProduct  , storeDelivery , review} = props.params
    let tab = (navigate.query.details.length === 2) ? "menu" : navigate.query.details[1]
    const Despen = [storeData] || []
    const [DespensariesData, setproduct] = React.useState(product || [])
    const [categoryProduct, SetCategoryProduct] = React.useState([])
    const data = false
    const { state, dispatch } = React.useContext(Createcontext)
    const location = useRouter()
    const params = useRouter();
    const [reviewtype, setReviewtype] = React.useState('All')
    const classes = useStyles()
    const [category, SetCategory] = React.useState([])
    const [reviewloading, setReviewloading] = React.useState(false)
    const [productload, setProductload] = React.useState(false)
    const [Rating, SetRating] = React.useState()
    const [api, SetApi] = React.useState(false)
    const [AllReview, SetReview] = React.useState([])
    var date = new Date();
    const easternTime = date.toLocaleString("en-US", { timeZone: "America/New_York" })
    let day = new Date(easternTime)
    const [GetProductReview, SetGetProductReview] = React.useState({
        value: 0,
        comment: '',
        Title: "",
        media: [],
        popup: false
    })
    React.useEffect(() => {
        if (Boolean(data)) {

            SetDespens(data)
            dispatch({ type: 'Embeddedstore', Embeddedstore: data })
        }
        axios.post("https://api.cannabaze.com/UserPanel/Get-CategoryByStore/", {
            "Store_Id": parseInt(id)
        })
            .then(async (response) => {
                // Extract the first element of each data item
                const d = response.data.map(data => data[0]);

                // Remove duplicates by 'id'
                const uniqueUsersByID = _.uniqBy(d, 'id');

                // Set unique categories
                SetCategory(uniqueUsersByID);

                // If Category is defined, check for matching categories
                if (category) {
                    uniqueUsersByID.forEach((data) => {
                        if (category === data.name.toLowerCase()) {
                            ShowCategoryProduct(data.id, category);
                        }
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [id])

    useEffect(() => {

        if (reviewtype === "All") {
            axios.get(`https://api.cannabaze.com/UserPanel/Get-AllAverage/${id}`).then((res) => {
                SetRating(res.data)



            }).catch(() => { })
        } else if (reviewtype === "product") {
            axios.get(`https://api.cannabaze.com/UserPanel/Get-AverageofProduct/${id}`).then((res) => {
                SetRating(res.data)


            }).catch(() => { })
        } else {
            Store_OverAllGet_Review(id).then((res) => {
                SetRating(res)


            }).catch(() => { })
        }
    }, [reviewtype, id, api])

    function SelectionTab(item) {
        if (Boolean(location.asPath.slice(0, 16) === "/weed-deliveries") || Boolean(location.asPath.slice(0, 18) === "/weed-dispensaries")) {

            navigate.replace( item === "Menu" ? `${location.asPath.slice(0, 16) === "/weed-deliveries" ? "/weed-deliveries" : "/weed-dispensaries"}/${modifystr(Despen[0]?.Store_Name)}/${id}` : `${location.asPath.slice(0, 16) === "/weed-deliveries" ? "/weed-deliveries" : "/weed-dispensaries"}/${modifystr(Despen[0]?.Store_Name)}/${modifystr(item)}/${id}`, 0, { shallow: true })
        }
        else {
            navigate.replace(`/menu-integration/${modifystr(Despen[0]?.Store_Name)}/${modifystr(item)}/${id}`, 0, { shallow: true })

        }

    }

    function ShowCategoryProduct(Id, name) {
        dispatch({ type: 'Loading', Loading: true })
        axios.post(`https://api.cannabaze.com/UserPanel/Get-filterProductbyStoreandCategory/`,
            {
                "Store_Id": parseInt(id),
                "Category_Id": Id
            }
        ).then(response => {
            dispatch({ type: 'Loading', Loading: false })
            SetCategoryProduct(response.data)
            setProductload(false)
        }).catch(
            function (error) {

            })
    }
    const ProductFilterData = [{ Id: 1, Name: "Category", Type1: "Flower", Type2: "CBD", Icons: <BsLayoutSplit className={classes.muiIcons} /> },
    { Id: 2, Name: "Brand", Type1: "Leafly", Type2: "CBD", Icons: <MdOutlineBrandingWatermark className={classes.muiIcons} /> },
    { Id: 3, Name: "Strain", Type1: "Indica", Type2: "Hybrid", Icons: <BsStripe className={classes.muiIcons} /> },
    { Id: 4, Name: "Price", Type1: "Any", Type2: "$25", Price: "$100", Icons: <MdOutlinePriceChange className={classes.muiIcons} /> },
    { Id: 5, Name: "Weight", Type1: "Any", Type2: "$25", Price: "$100", Icons: <GiWeightScale className={classes.muiIcons} /> },
    { Id: 6, Name: "Unit", Type1: "Any", Type2: "$25", Price: "$100", Icons: <AiOutlineDeploymentUnit className={classes.muiIcons} /> },
    ]

    useEffect(() => {
        if (reviewtype === "product") {
            axios.post('https://api.cannabaze.com/UserPanel/GetallProductReviewbyStore/', {
                "store": id
            }).then((res) => {
                SetReview(res.data)
            })
        } else if (reviewtype === "store") {
            Store_Get_Review(id).then((res) => {
                SetReview(() => {
                    return res.data
                })
                var Obj = _.find(res.data, { user: state.Profile.id });
                SetGetProductReview({ ...GetProductReview, 'popup': false, 'value': Obj.rating, 'Title': Obj.Title, 'comment': Obj.comment })
            }).catch((e) => {
                console.error(e)
            })
        } else {

            Store_Get_Review(id).then((res) => {


                axios.post('https://api.cannabaze.com/UserPanel/GetallProductReviewbyStore/', {
                    "store": id
                }).then((response) => {
                    SetReview([...res.data, ...response.data])
                })
            }).catch((e) => {
                console.error(e)
            })

        }
    }, [reviewtype, id, api])
    React.useEffect(() => {
        if (state.login && state.Profile.id !== undefined && id !== undefined) {
            Store_Get_UserComment(state.Profile.id, id).then((res) => {

                if (res.data.length !== 0) {
                    SetGetProductReview({
                        ...GetProductReview, "comment": res.data[0]?.comment,
                        "Title": res.data[0]?.Title, "value": res.data[0]?.rating
                    })
                }
                else {
                    SetGetProductReview({
                        ...GetProductReview, "comment": '',
                        "Title": '', "value": 0
                    })
                }
            }).catch((error) => {
                console.trace(error)
            })

        }
    }, [state.Profile, id, api])



    const onSubmit = () => {

        const formdata = new FormData();
        let a = GetProductReview?.media?.filter((item) => {
            return item?.type.includes('image')
        })
        let b = GetProductReview?.media?.filter((item) => {
            return item?.type.includes('video')
        })
        formdata.append('Store', id)
        formdata.append('rating', GetProductReview.value)
        formdata.append('Title', GetProductReview.Title)
        formdata.append('comment', GetProductReview.comment)
        for (let i = 0; i < a.length; i++) {
            formdata.append('multipleimages', a[i]);
        }
        for (let i = 0; i < b.length; i++) {
            formdata.append('multiplevideos', b[i]);
        }


        setReviewloading(true)
        Store_Add_Review(formdata).then((res) => {

            SetGetProductReview({ ...GetProductReview, 'popup': false })
            SetApi(!api)
            setReviewloading(false)

        }).catch(() => {
            setReviewloading(false)

        })
    };

    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You are sure to want to delete this comment",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#31B655",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Delete_StoreReview(id).then((response) => {
                    response.data.status === 'success' && SetApi(!api)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your comment has been deleted.",
                        icon: "success"
                    });
                })

            }
        });

    }
    function handleEdit() {
        SetGetProductReview({ ...GetProductReview, 'popup': true })
    }
    function HellFull(ReviewId) {
        if ("ProductName" in ReviewId) {
            ProductHelpFull(ReviewId.id, state.Profile.id).then((res) => {
                SetApi(!api)
            }).catch(() => {
            })
        } else {
            StoreHelpFull(ReviewId.id, state.Profile.id).then((res) => {
                SetApi(!api)
            }).catch(() => {
            })
        }
    }
    function navigationtab(route, store, id) {

        if (Boolean(store)) {

            navigate.push(`${route}/${store.toLowerCase()}/${id}`)
        }
        else if (Boolean(route)) {
            if (Boolean(state.City)) {
                navigate.push(`${route}/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}`)
            }
            else if (Boolean(state.State)) {
                navigate.push(`${route}/in/${modifystr(state.Country)}/${modifystr(state.State)}`)
            }
            else {
                navigate.push(`${(route)}/in/${modifystr(state.Country)}`)
            }
        }
    }
    const faq = [
        {
          title: `What is the service area for ${Despen[0]?.Store_Name} ?`,
          answer:
            <span
              dangerouslySetInnerHTML={{
                __html: ` ${Despen[0].Store_Name} delivers to <a target="#" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(Despen[0]?.Store_Address)}" style="cursor: pointer; color: #31B665; text-decoration: underline;">${Despen[0].Store_Address}</a>`
              }}
            />
    
    
        },
        {
          title: `What are the delivery hours for  ${Despen[0]?.Store_Name}?`,
          answer: (
            <div>
              <span>{Despen[0]?.Store_Name}</span>
              <span>{` offers delivery from`}</span>
    
              {Despen[0]?.Hours?.map((items, idxe) => {
                const isToday = day.getDay() - 1 === idxe;
                if (items.close) {
                  return (
                    <p
                      key={idxe}
                      className={`${isToday ? "highlightToday" : ""} d-flex`}>
                      <span className="w-50">{`${items.day} `}</span>
                      <span className="w-50">Close</span>
                    </p>
                  );
                } else {
                  return items.Open?.map((ite, index) => {
                    if (index === 0) {
                      if (ite.Time1 === "24 Hours" || ite.Time2 === "24 Hours") {
                        return (
                          <p
                            key={index}
                            className={`${isToday ? "highlightToday" : ""} d-flex`}
                          >
                            <span className="w-50">{`${items.day} `}</span>
                            <span className="w-50">24 Hours</span>
                          </p>
                        );
                      } else if (ite.Time1 === "00:00" || ite.Time2 === "00:00") {
                        return (
                          <p
                            key={index}
                            className={`${isToday ? "highlightToday" : ""} d-flex`}
                          >
                            <span className="w-50">{`${items.day} `}</span>
                            <span className="w-50">Closed</span>
                          </p>
                        );
                      } else {
                        return (
                          <p
                            key={index}
                            className={`${isToday ? "highlightToday" : ""} d-flex`}
                          >
                            <span className="w-50">{`${items.day} `}</span>
                            <span className="w-50">{`${ite.Time1} - ${ite.Time2}`}</span>
                          </p>
                        );
                      }
                    }
                    return null;
                  });
                }
              })}
    
            </div>
          )
        },
        {
          title: `How can I contact ${Despen[0]?.Store_Name}?`,
          answer: <span
            dangerouslySetInnerHTML={{
              __html: `You can contact ${Despen[0].Store_Name} by phone at <a  href="tel:${Despen[0].Stores_MobileNo}" style="cursor: pointer; color: #31B665; text-decoration: underline;">${Despen[0].Stores_MobileNo}</a>`
            }}
          />
        }
      ];
    
    return (
        <div>
            <div>
                {Boolean((location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries"))
                    ?

                    <StoreDetails Despen={Despen} locationStore={location.asPath}></StoreDetails>
                    :
                    // <Embedded Despen={Despen} locationStore={location.asPath}></Embedded>
                    ""
                }
                <div className={clases.page_breadcrum}>

                    <span onClick={() => navigationtab(location.asPath.slice(0, 18) === "/weed-dispensaries" ? '/weed-dispensaries' : "/weed-deliveries")}> {location.asPath.slice(0, 18) === "/weed-dispensaries" ? 'weed-dispensaries' : "weed-deliveries"} {" > "}</span>
                    <span onClick={() => navigationtab(location.asPath.slice(0, 18) === "/weed-dispensaries" ? '/weed-dispensaries' : "/weed-deliveries", modifystr(Despen[0]?.Store_Name), id)}>{Despen[0]?.Store_Name}</span>
                    {Boolean(params?.tab) && <span> {" > "}{params?.tab}</span>}
                </div>

            </div>
            {Boolean((location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries"))
                ? "" : ""
            }
            <div className=" product_container" >
                {!location.asPath.includes('/menu-integration') && <NewFlavourBanner delBtn={Despen}></NewFlavourBanner>}
                <div className="">

                    {Boolean((location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries")) && <StoreDetailMenuItem tab={tab || "Menu"} SelectionTab={SelectionTab}></StoreDetailMenuItem>}

                    {
                        (tab === 'menu' || tab === undefined) &&
                        <React.Fragment>
                            {!productload ? <> {!location.asPath.includes('/menu-integration') ?
                                (Boolean(DespensariesData.length) ?
                                    <>
                                        <CategoryProduct Category={category} ShowCategoryProduct={ShowCategoryProduct}> </CategoryProduct>
                                            <div className="row">
                                                <div className="col-12 productCat_cont" style={{ display: "contents" }}>
                                                    <ProductFilter Store_id={Despen[0]?.id}
                                                        id={id}
                                                        ProductFilterData={ProductFilterData}
                                                        Setarr1={setproduct}
                                                        arr={DespensariesData}
                                                    />
                                                    <div className={"col-12 col-lg-9 col-xxl-10"}>
                                                        <ProductList arr={Boolean(categoryProduct.length) ? categoryProduct : DespensariesData} link={Boolean(location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries") ? "products" : "menu-integration"} />
                                                    </div>
                                                </div>
                                                    <Reviewextrs AllReview = {AllReview || []} storename={Despen[0].Store_Name} ></Reviewextrs>
                                                    <Fqa faq={faq} ></Fqa>
                                            </div>
                                    </>
                                    :
                                    <div>
                                      <Oops  allproduct={props?.params?.extradata?.products || []}
                                        location={{ country: state.Country, state: state.State, city: state.City }}
                                        store={props?.params?.extradata?.dispensaries || []}
                                        HellFull={HellFull}
                                        type={`store`}
                                        reviewtype={reviewtype}
                                        setReviewtype={setReviewtype}
                                        delBtn={Despen}
                                        handleEdit={handleEdit}
                                        reviewloading={reviewloading}
                                        handleDelete={handleDelete}
                                        Rating={Rating}
                                        onSubmit={onSubmit}
                                        GetProductReview={GetProductReview}
                                        SetGetProductReview={SetGetProductReview}
                                        AllReview={review}/>
                                    </div>
                                ) :
                                (!productload ?
                                    (Boolean(DespensariesData.length) ?
                                        <div className="col-12 productCat_cont" >
                                            <ProductFilter Store_id={Despen[0]?.id}
                                                ProductFilterData={ProductFilterData}
                                                Setarr1={SetDespensariesProductData}
                                                arr={DespensariesData}
                                                id={id}
                                            />
                                            <div className={"col-12 col-lg-9 col-xxl-10"}>
                                                <ProductList arr={Boolean(categoryProduct.length) ? categoryProduct : DespensariesData} link={Boolean(location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries") ? "products" : "menu-integration"} />
                                            </div>
                                     
                                        </div>
                                        :

                                        <Oops 
                                        allproduct={props?.params?.extradata?.products || []}
                                        location={{ country: state.Country, state: state.State, city: state.City }}
                                        store={props?.params?.extradata?.dispensaries || []}
                                        HellFull={HellFull}
                                        type={`store`}
                                        reviewtype={reviewtype}
                                        setReviewtype={setReviewtype}
                                        delBtn={Despen}
                                        handleEdit={handleEdit}
                                        reviewloading={reviewloading}
                                        handleDelete={handleDelete}
                                        Rating={Rating}
                                        onSubmit={onSubmit}
                                        GetProductReview={GetProductReview}
                                        SetGetProductReview={SetGetProductReview}
                                        AllReview={review}/>
                                    )
                                    :
                                    <DispensoriesAddressSkeleton />
                                )
                            }
                            </> :
                                <DispensoriesAddressSkeleton />}
                        </React.Fragment>
                    }
                    {
                        tab === 'store-details' && <ComponentStoreDetails storeDetails={Despen}></ComponentStoreDetails>
                    }
                    {
                        tab === 'review' && <Review
                            HellFull={HellFull}
                            type={`store`}
                            reviewtype={reviewtype}
                            setReviewtype={setReviewtype}
                            delBtn={Despen}
                            handleEdit={handleEdit}
                            reviewloading={reviewloading}
                            handleDelete={handleDelete}
                            Rating={Rating}
                            onSubmit={onSubmit}
                            GetProductReview={GetProductReview}
                            SetGetProductReview={SetGetProductReview}
                            AllReview={AllReview}
                            SetReview={SetReview}
                        ></Review>
                    }
                    {
                        tab === 'deals' && <div className={newclases.noReview}>
                            <div className={newclases.noreviewicon}>
                                <div className={newclases.iconcircl}> <Image onError={(e) => (e.target.src = '/blankImage.jpg')} priority width={100} height={100} src={'/image/nodeal.png'} className="nodealsicon" alt="no Deals" title="no Deals" /></div>
                            </div>
                            <h3 className={newclases.noreview_title}>{`Discover More Savings Soon!`}</h3>
                            <p className={`${newclases.noreview_description} w-lg-50`} >{`It looks like there are no active deals at the moment at `}<b>{Despen[0]?.Store_Name}</b>{`. Don't worry, though – our partnered stores frequently update their promotions. Be sure to check back regularly for exciting discounts and special offers on your favorite products.`}</p>
                            <p className={`${newclases.noreview_description} w-lg-50`}>{`In the meantime, explore the diverse range of products available at `}<b>{Despen[0]?.Store_Name}</b>{`. We're constantly working to bring you the best deals, so stay tuned for upcoming promotions.`}</p>
                        </div>
                    }
                </div>
                <div>
         
                </div>
            </div>
        </div>

    )
}

DispensoriesDetails.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
const fetchDispensariesAndProducts = async (id, country, state, city) => {
    const object2 = {
        City: city,
        State: state,
        Country: country,
        limit: 10
    };

    try {
        // Fetch dispensaries and products concurrently
        const [dispensariesResponse, productsResponse ,  review] = await Promise.all([
            axios.post('https://api.cannabaze.com/UserPanel/Get-GetDeliveryStoresHomepage/', object2, {
                headers: { 'Content-Type': 'application/json' },
            }),
            fetch('https://api.cannabaze.com/UserPanel/Get-AllProduct/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object2),
            }),
            
            axios.get(`https://api.cannabaze.com/UserPanel/Get-StoreReview/${id}`),
        ]);
        // Setallstore(dispensariesResponse.data);
        const productsData = await productsResponse.json();
        // Setallallproduct(productsData)
        // console.log(review)
        return ([{ product: productsData, delivery: dispensariesResponse.data, review:review.data }])
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export async function getStaticPaths() {
    const paths = [];

    return {
        paths,
        fallback: 'blocking', // Set to 'blocking' to generate pages on-demand
    };
}

export async function getStaticProps(context) {
    const storeId = _.findIndex(context.params.details, item => !isNaN(item) && !isNaN(parseFloat(item)));
    let data = [];
    let productdata = [];
    let extradata = []
    try {
        const response = await axios.get(`https://api.cannabaze.com/UserPanel/Get-StoreById/${context.params.details[storeId]}`);
        const product = await axios.get(`https://api.cannabaze.com/UserPanel/Get-ProductAccordingToDispensaries/${context.params.details[storeId]}`);
        extradata = await fetchDispensariesAndProducts(context.params.details[storeId], response.data[0].Country, response.data[0].State, response.data[0].City)
        productdata = product.data;
        data = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    if (data.length === 0) {
        return {
            notFound: true, // Redirect to 404 if no data found
        };
    } else {
        if (
            storeId === 1 &&
            modifystr(data[0].Store_Name) === context.params.details[0] &&
            parseInt(context.params.details[storeId]) === data[0]?.id
        ) {
            return {
                props: {
                    params: {
                        id: context.params.details[storeId],
                        tab: !isNaN(parseInt(context.params.details[1])) ? "menu" : context.params.details[1],
                        storeData: data[0],
                        product: productdata,
                        allProduct: extradata[0]?.product,
                        storeDelivery: extradata[0]?.delivery,
                        review: extradata[0]?.review
                    },
                },
                revalidate: 60, // Revalidate the page every 60 seconds
            };
        } else if (
            storeId !== 1 &&
            modifystr(data[0].Store_Name) === context.params.details[0] &&
            ["menu", "store-details", "review", "deals"].includes(context.params.details[1]) &&
            parseInt(context.params.details[storeId]) === data[0].id
        ) {
            return {
                props: {
                    params: {
                        id: context.params.details[storeId],
                        tab: !isNaN(parseInt(context.params.details[1])) ? "menu" : context.params.details[1],
                        storeData: data[0],
                        product: productdata,
                        allProduct: extradata[0]?.product,
                        storeDelivery: extradata[0]?.delivery,
                        review: extradata[0]?.review
                    },
                },
                revalidate: 60,
            };
        } else {
            return {
                notFound: true,
            };
        }
    }
}