import React from "react";
import { FaWheelchair } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { BsFillCarFrontFill, BsTelephone, BsCashCoin } from "react-icons/bs";
import { AiOutlinePlus, AiFillCar } from "react-icons/ai";
import { IoStorefrontSharp, IoLocationOutline } from "react-icons/io5";
import { GrDeliver } from "react-icons/gr";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdSecurity } from "react-icons/md";
import Openingtime from "./Openingtime";
import newcalsses from '@/styles/customstyle.module.scss'
const StoreDetail1 = ({ storeDetails }) => {
  return (
    <div className={`${newcalsses.StoreDetailspage} mt-3`}>
      <div className={newcalsses.amenities_container}>
       
            <h2 className={newcalsses.amenties_nameHeading}>{`Amenities`}</h2>
            <ol className={newcalsses.amenities_list}>
            
              {storeDetails[0]?.Recreational === true && (
                <li className={newcalsses.amenties_list_items}>
                  <p className={newcalsses.amenities_list_item_paragrap}>
                    <BsFillCarFrontFill /> {`Recreational`}
                  </p>
                </li>
              )}
              {storeDetails[0]?.CarParking ? (
                <li className={newcalsses.amenties_list_items}>
                  <p className={newcalsses.amenities_list_item_paragrap}>
                    <AiFillCar /> {`Car Parking`}
                  </p>
                </li>
              ) : null}
              {storeDetails[0]?.High_chairs_available ? (
                <li className={newcalsses.amenties_list_items}>
                  <p className={newcalsses.amenities_list_item_paragrap}>
                    <FaWheelchair />{` Has Wheel chairs available`} </p>
                </li>
              ) : null}

              {storeDetails[0]?.Medical ? (
                <li className={newcalsses.amenties_list_items}>
                  <p className={newcalsses.amenities_list_item_paragrap}><AiOutlinePlus /> {`Medical`} </p>
                </li>
              ) : null}
              {storeDetails[0]?.Minimum_21_years_or_older ? (
                <li className={newcalsses.amenties_list_items}>
                  <p className={newcalsses.amenities_list_item_paragrap}> <MdDoNotDisturb /> {`21 years or older`} </p>
                </li>
              ) : null}

              {storeDetails[0]?.Security_Staff ? (
                <li className={newcalsses.amenties_list_items}>
                  <p className={newcalsses.amenities_list_item_paragrap}> <MdSecurity /> {`Security`} </p>
                </li>
              ) : null}
              {storeDetails[0]?.Cash_on_Delivery ? (
                <li className={newcalsses.amenties_list_items}>
                  <p className={newcalsses.amenities_list_item_paragrap}> <BsCashCoin />{` COD`} </p>
                </li>
              ) : null}
              {
                (storeDetails[0]?.Security_Staff || storeDetails[0]?.Cash_on_Delivery || storeDetails[0]?.Minimum_21_years_or_older || storeDetails[0]?.Medical ||  storeDetails[0]?.High_chairs_available ||  storeDetails[0]?.CarParking || storeDetails[0]?.Recreational ) ||   <li className={newcalsses.amenties_list_items}>
                <p className={newcalsses.amenities_list_item_paragrap}> {`No Amenities Available`} </p>
              </li>
              }
            </ol>
       
      </div>
      <div className="row  my-2">
        <div className="col-lg-8 h-100 my-2 order-sm-first order-last">
       
            <div className="destop_view">
              <p className={newcalsses.StoreDetail_paragraph}>
              {`  About Us`}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: storeDetails[0]?.Stores_Description,
                }}
              ></div>
            </div>
            <div className="mobile_view">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <p className={newcalsses.StoreDetail_paragraph}>
                    {`About Us`}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: storeDetails[0]?.Stores_Description,
                    }}
                  ></p>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="row mx-0">
              {
                (storeDetails[0]?.CurbSide_Pickup && Boolean(storeDetails[0]?.CurbSidePickupHours)) && 
                  <div className="p-md-2 p-0 col-md-5 col-12">
                    <Openingtime
                      storeDetails={storeDetails}
                      heading={"CurbSide PickUp Hours"}
                      type={storeDetails[0]?.CurbSidePickupHours}
                      key={"CurbSidePickupHours"}
                    />
                  </div>
                }
              {
                (storeDetails[0]?.StoreFront && Boolean(storeDetails[0]?.Hours)) && (
                  <div className="p-md-2 p-0 col-md-5 col-12">
                    <Openingtime
                      storeDetails={storeDetails}
                      heading={"Store Hours"}
                      type={storeDetails[0]?.Hours}
                      key={"Hours"}
                    />
                  </div>
                )}
              {
               ( storeDetails[0]?.Delivery && Boolean(storeDetails[0]?.DeliveryHours))&& (
                  <div className="p-md-2 p-0 col-md-5 col-12">
                    <Openingtime
                      storeDetails={storeDetails}
                      heading={"Delivery Hours"}
                      type={storeDetails[0]?.DeliveryHours}
                      key={"DeliveryHours"}
                    />
                  </div>
                )}
            </div>
        </div>
        <div className="col-lg-4  my-2">
            <h3 className={newcalsses.store_detail_menu_heading} title={storeDetails[0]?.Store_Name}>
              {storeDetails[0]?.Store_Name}
            </h3>
            <ol className={newcalsses.store_detail_SideMenuBar_order_list}>
              {storeDetails[0]?.Stores_Website && (
                <li className={newcalsses.StoreDetailSidemenuBarList}>
                  <CiGlobe />

                  <span className={`${newcalsses.StoreDetailSideMenu_listItems} text-lowercase`}>
                    {storeDetails[0]?.Stores_Website}
                  </span>
                </li>
              )}
              {storeDetails[0]?.Stores_MobileNo && (
                <li className={newcalsses.StoreDetailSidemenuBarList}>
                  <BsTelephone />
                  <span className={newcalsses.StoreDetailSideMenu_listItems}>
                    
                    {storeDetails[0]?.Stores_MobileNo}
                  </span>
                </li>
              )}
              {storeDetails[0]?.Order_Type && (
                <li className={newcalsses.StoreDetailSidemenuBarList}>
                  <GrDeliver />
                  <span className={newcalsses.StoreDetailSideMenu_listItems}>
                    {" "}
                    {storeDetails[0]?.Order_Type}
                  </span>
                </li>
              )}
              {storeDetails[0]?.Store_Type && (
                <li className={newcalsses.StoreDetailSidemenuBarList}>
                  <IoStorefrontSharp />
                  <span className={newcalsses.StoreDetailSideMenu_listItems}>
                    {" "}
                    {storeDetails[0]?.Store_Type}
                  </span>
                </li>
              )}
              {storeDetails[0]?.CurbSideStreet && (
                <li className={newcalsses.StoreDetailSidemenuBarList}>
                  <IoLocationOutline />
                  <span className={newcalsses.StoreDetailSideMenu_listItems}>
                    {" "}
                    {storeDetails[0]?.CurbSideStreet}
                  </span>
                </li>
              )}
            </ol>
        </div>
      </div>
    </div>
  );
};
export default StoreDetail1;


//    *   3
//   ***  2
//  *****  1
// *******