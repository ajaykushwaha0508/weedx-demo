import React, { useState } from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useStyles from "../../../../src/styles/style";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { ProductSeo, ProductCategorySeo } from "@/component/ScoPage/ProductSeo";
import Createcontext from "@/hooks/context";
import Layout from "@/layout/layout";
import _ from "lodash";
import { SubCategoryApibyname } from "@/hooks/apicall/api";
import { modifystr } from "@/hooks/utilis/commonfunction";
const CategoryProduct = dynamic(() => import("@/component/category/category"), {
  ssr: true,
});
const ProductSearchResult = dynamic(
  () => import("@/component/productcard/ProductSearchResult"),
  { ssr: true }
);
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
export default function Product(props) {
  const navigate = useRouter();
  const { slug } = navigate.query;
  const Category = props.category;
  const params = slug
    ? slug[_.findIndex(slug, (item) => !isNaN(parseInt(item)))] || 0
    : 0;
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Createcontext);
  const [loading, SetLoading] = React.useState(false);
  const [subcategories, setsubcategories] = useState([]);
  const [Product, SetProduct] = React.useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [nomareproduct, Setnomareproduct] = useState(false);
  React.useEffect(() => {
    SetProduct(props.product);
  }, [props]);

  console.log("Product =[===========>", Product);
  async function ShowCategoryProduct(id, name) {
    SetLoading(true);
    navigate.replace(`/products/${modifystr(name)}/${id}`);
    setSelectedOption(null);
    setsubcategories([]);
    // SetLoading(false);
  }
  const selectOption = (option) => {
    SetLoading(true);
    setSelectedOption(option);
    setIsDropdownOpen(false);
    navigate.replace(
      `/products/${modifystr(slug[0])}/${modifystr(option.name)}/${option.id}`
    );
  };
  React.useEffect(() => {
    SetLoading(() => {
      return props.loading;
    });
    dispatch({ type: "Location", Location: props?.location.formatted_address });
    dispatch({ type: "permission", permission: true });
    dispatch({ type: "Country", Country: props?.location?.country });
    dispatch({ type: "State", State: props?.location?.state });
    dispatch({ type: "City", City: props?.location?.city });
    dispatch({ type: "route", route: props?.location?.route });
  }, [props]);
  React.useEffect(() => {
    if (slug?.length === 3) {
      SubCategoryApibyname(slug[0].toUpperCase())
        .then((response) => {
          setsubcategories(response.data);
        })
        .catch((error) => {
          setsubcategories([]);
          console.trace(error);
        });
    } else {
      if (slug?.length === 2) {
        SubCategoryApibyname(slug[0].toUpperCase())
          .then((response) => {
            setsubcategories(response.data);
          })
          .catch((error) => {
            setsubcategories([]);
            console.trace(error);
          });
      } else {
      }
    }
  }, [state.Location, params]);
  function breadcrumCountry(params, name) {
    if (params === "Product") {
      navigate.push(`/products`);
    } else if (params === "categoryname") {
      const categoryfind = _.find(Category, function (o) {
        return o.name === name.toUpperCase();
      });
      navigate.push(
        `/products/${modifystr(categoryfind.name)}/${categoryfind.id}`
      );
    }
  }
  const transformString = (str) => {
    return str
      ? str
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";
  };
  async function moreProduct() {
    // const [nomareproduct, Setnomareproduct] = React.useState(false)
    SetLoading(true);
    const object = {
      City: transformString(props.location.city),
      Country: transformString(props.location.country),
      State: transformString(props.location.state),
      limit: Product.length + 10,
    };
    const response = await fetch(
      "http://127.0.0.1:1331/UserPanel/Get-AllProduct/",
      {
        method: "POST", // Assuming you are making a POST request. Change if needed.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      }
    );
    const data = await response.json();
    if (data !== "No Product Found" && data.length !== 0) {
      // console.log(Product.length , data.length)
      if (Product.length === data.length) {
        Setnomareproduct(true);
      } else {
        SetLoading(false);
        SetProduct(() => data);
      }
    }
  }
  return (
    <React.Fragment>
      <div style={{ cursor: "pointer" }}>
        <span onClick={() => navigate.push("/")}>{"Home"}</span>
        {
          <span>
            {" "}
            {">"}{" "}
            <span onClick={() => breadcrumCountry("Product")}>Product</span>
          </span>
        }
        {navigate?.query?.slug !== undefined && (
          <span>
            {" "}
            {">"}{" "}
            <span
              onClick={() =>
                breadcrumCountry("categoryname", navigate?.query?.slug[0])
              }
            >
              {navigate?.query?.slug[0]}
            </span>
          </span>
        )}
        {navigate?.query?.slug !== undefined &&
          navigate?.query?.slug?.length === 3 && (
            <span>
              {" "}
              {">"} <span>{navigate?.query?.slug[1]}</span>
            </span>
          )}
      </div>
      {!Boolean(props.id) ? (
        <ProductSeo location={navigate?.asPath}></ProductSeo>
      ) : (
        <ProductCategorySeo
          categoryname={slug[0]}
          location={navigate?.asPath}
        ></ProductCategorySeo>
      )}
      <div className="row">
        <div className="col-12">
          <CategoryProduct
            Category={Category}
            ShowCategoryProduct={ShowCategoryProduct}
          ></CategoryProduct>
        </div>
        {slug?.length <= 3 && (
          <div className="col-12 my-sm-4 my-2">
            <div>product cards come here</div>
            <div className="d-flex justify-content-end align-items-center">
              <ClickAwayListener
                onClickAway={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <div className="mydropdown">
                  <div
                    className="dropdown-toggle"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                  >
                    {selectedOption && (
                      <Image
                        onError={(e) => (e.target.src = "/blankImage.jpg")}
                        width={100}
                        height={100}
                        priority
                        src={`${
                          selectedOption.SubCategoryImage ?? "/blankImage.jpg"
                        }`}
                        alt={selectedOption.name}
                        title={selectedOption.name}
                        className="dropdown-option-image"
                      />
                    )}
                    <span className="dropdown-option-label">
                      {selectedOption
                        ? selectedOption.name
                        : "Sort by Subcategory "}
                    </span>
                    <span className="dropdown-caret"></span>
                  </div>
                  <ul
                    className={`dropdown-menu image_dropdown ${
                      isDropdownOpen ? "open" : ""
                    }`}
                  >
                    {subcategories?.map((option, index) => (
                      <li key={index} onClick={() => selectOption(option)}>
                        <Image
                          onError={(e) => (e.target.src = "/blankImage.jpg")}
                          width={100}
                          height={100}
                          priority
                          src={`${
                            option.SubCategoryImage ?? "/blankImage.jpg"
                          }`}
                          alt={option.name}
                          title={option.name}
                          className="dropdown-option-image"
                        />
                        <span className="dropdown-option-label">
                          {option.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ClickAwayListener>
            </div>
          </div>
        )}
        <div className="col-12 center">
          {props.product?.length !== 0 &&
          props.product !== undefined &&
          props.product !== "No Product Found" ? (
            <div className="col-12 mt-sm-4 mt-0">
              <ProductSearchResult
                RelatedProductResult={Product}
                title={navigate.query?.slug ? slug[0] : "All Product"}
              />
              <div className="d-flex justify-content-center">
                {!slug && (
                  <>
                    {!nomareproduct ? (
                      <LoadingButton
                        sx={{
                          color: "white",
                          background: loading ? "white" : "#31b655",
                          "&:hover": {
                            background: loading ? "#ec971f" : "#279144",
                          },
                        }}
                        loadingIndicator={<CircularProgress size={20} />}
                        className="mt-2"
                        loading={loading}
                        onClick={moreProduct}
                      >
                        more Product
                      </LoadingButton>
                    ) : (
                      <p>No More Product</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="Empty_container_margin_top">
              <div className="EmtyCard_container">
                <div className="row">
                  <div className="col-12 image_container">
                    <div className="Empty_card_image">
                      <Box className={classes.muiIcons}>
                        <MdOutlineProductionQuantityLimits size={45} />
                      </Box>
                    </div>
                  </div>
                  <h2 className="height_empty_div_heading">{`No Product Found`}</h2>
                  <p className="height_empty_div_paragraph ">{`Apologies, this page is currently empty, but stay tuned as we're working to bring you exciting products soon!`}</p>
                  <br />
                  <p className=" height_empty_div_paragraph ">
                    {" "}
                    {`your weed today.`}
                  </p>
                  <div className="text-center mt-4">
                    <div className="col-md-4 col-sm-8 col-12 mx-auto">
                      <Box className={`${classes.loadingBtnTextAndBack}`}>
                        <LoadingButton
                          style={{ width: "100%", height: "100%" }}
                          variant="outlined"
                          type={"submit"}
                        >{`Shop now    Prtoduct with slug`}</LoadingButton>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
Product.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async (context) => {
  const { req, res, params, query } = context;
  let locationData = {};

  // Check for 'x-fetchlocation' header and parse it if available
  if (req.headers["x-fetchlocation"]) {
    try {
      const jsonObject = JSON.parse(req.headers["x-fetchlocation"]);
      locationData = jsonObject;
    } catch (error) {
      console.error("Error decoding or parsing fetchlocation header:", error);
    }
  } else {
    console.log("fetchlocation header not found");
  }

  // Utility function to transform strings
  const transformString = (str) => {
    return str
      ? str
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";
  };
  // Cache control
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );
  const locationObject = {
    City: transformString(locationData.city),
    Country: transformString(locationData.country),
    State: transformString(locationData.state),
    limit: 10,
  };
  let product = [];
  try {
    // Fetch category data
    const apidata = await fetch(
      "http://127.0.0.1:1331/UserPanel/Get-Categories"
    );
    const category = await apidata.json();
    console.log("Sluges===>", params.slug);
    if (params.slug?.length === 2) {
      product = await fetchProductByCategory(query.slug[1], locationObject);
      console.log("products whem slug is 2==================>", product);
      const categoryMatch =
        modifystr(product[0]?.category_name) === query.slug[0] &&
        parseInt(query.slug[1]) === product[0]?.category_id;

      if (!categoryMatch && !product.length === 0) {
        return { notFound: true };
      }
    } else if (params.slug?.length === 3) {
      // Fetch products by subcategory
      product = await fetchProductBySubCategory(query.slug[2], locationObject);
      const subcategoryMatch =
        modifystr(product[0]?.category_name) === query.slug[0] &&
        query.slug[1] === modifystr(product[0]?.SubcategoryName) &&
        parseInt(query.slug[2]) === product[0]?.Sub_Category_id;
      if (!subcategoryMatch) {
        return { notFound: true };
      }
    } else {
      // Fetch all products
      product = await fetchAllProducts(locationObject);
    }

    // Return props if products are found
    return {
      props: {
        product: product.length ? product : [],
        loading: false,
        location: locationData,
        category: category,
        id: params.slug?.length > 1 ? query.slug[1] : "",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  }
};
const fetchProductByCategory = async (categoryId, locationObject) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:1331/UserPanel/Get-ProductByCategory/${categoryId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locationObject),
      }
    );
    const data = await response.json();
    return Boolean(data.length) ? data : [];
  } catch (error) {
    return [];
  }
};
const fetchProductBySubCategory = async (subCategoryId, locationObject) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:1331/UserPanel/Get-ProductBySubCategory/${subCategoryId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locationObject),
      }
    );
    const data = await response.json();
    return data === "There is no Product" ? [] : data;
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    return [];
  }
};
const fetchAllProducts = async (locationObject) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:1331/UserPanel/Get-AllProduct/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locationObject),
      }
    );
    const data = await response.json();
    return data === "No Product Found" ? [] : data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
