import React from 'react'
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Cookies from 'universal-cookie';
import { RxCross2 } from "react-icons/rx";
import Createcontext from "@/hooks/context"
import Link from 'next/link';
import Image from 'next/image';
import { modifystr } from '@/hooks/utilis/commonfunction';
import clases from '@/styles/customstyle.module.css'

 function Notification ({ notify, setnotify,Settotalnotify, Setnotificationdata, notificationdata }) {
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access');
    if (typeof window !== 'undefined') {
      token_data = localStorage.getItem('User_Token_access');
    }
  
    const { state, dispatch } = React.useContext(Createcontext);
  
    // Memoizing the time calculation function to avoid recalculating on every render
    const calculateTImefromDate = React.useCallback((value) => {
      let diffTime = Math.abs(new Date().valueOf() - new Date(value).valueOf());
      let months = Math.trunc(diffTime / (24 * 60 * 60 * 1000) / 30);
      let days = diffTime / (24 * 60 * 60 * 1000);
      let hours = (days % 1) * 24;
      let minutes = (hours % 1) * 60;
      let secs = (minutes % 1) * 60;
      [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)];
  
      if (months !== 0) {
        return months + ' Month ago';
      } else if (days !== 0) {
        return days + ' days ago';
      } else if (hours !== 0) {
        return hours + ' hours ago';
      } else if (minutes !== 0) {
        return minutes + ' minutes ago';
      } else {
        return secs + ' secs ago';
      }
    }, []);
  
    React.useEffect(() => {
      if (state?.login) {
        const config = { headers: { Authorization: `Bearer ${token_data}` } };
  
        axios
          .get(`https://api.cannabaze.com/UserPanel/GetUserNotificationByLogin/`, config)
          .then((res) => {
            let datax = [];
            res.data.forEach((item) => {
              if (item.Order.length !== 0) {
                datax.push({
                  Image: item.Order[0].StoreImages,
                  title: `Thank you for ordering with WeedX.io! Your order #${item.Order[0].OrderId} is confirmed for $${item.Order[0].subtotal}.`,
                  date: item.Order[0].OrderDate,
                  link: `/MyOrderProductDetail/${item.Order[0].OrderId}`,
                  Id: item.Notification,
                });
              }
              if (item.blog.length !== 0) {
                datax.push({
                  Image: item.blog[0].Image,
                  title: item.blog[0].Title,
                  date: item.blog[0].created,
                  link: `/${item.blog[0].category_name === 'BLOGS' ? 'blogs' : 'cannabis-news'}/${modifystr(item.blog[0].Title)}/${item.blog[0].id}`,
                  Id: item.Notification,
                });
              }
            });
  
            let sortedData = debounce.sortBy(datax, (dateObj) => dateObj.date);
            Settotalnotify(sortedData);
            Setnotificationdata(sortedData.reverse());
          }).catch((err) => {
            console.error(err);
          });
      }
    }, [state?.login]);
  
    const ClearAll = async () => {
      const config = { headers: { Authorization: `Bearer ${token_data}` } };
      const notificationIds = notificationdata.map((item) => item.Id);
  
      try {
        await axios.post(
          'https://api.cannabaze.com/UserPanel/ClearNotification/',
          { Clear: notificationIds },
          config
        );
        dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct });
        Setnotificationdata([]);
      } catch (err) {
        console.error(err);
      }
    };
  
    const Clear = async (e) => {
      const config = { headers: { Authorization: `Bearer ${token_data}` } };
  
      try {
        await axios.post(
          'https://api.cannabaze.com/UserPanel/ClearNotification/',
          { Clear: [e.Id] },
          config
        );
  
        const response = await axios.get(`https://api.cannabaze.com/UserPanel/GetUserNotificationByLogin/`, config);
  
        let datax = [];
        response.data.forEach((item) => {
          if (item.Order.length !== 0) {
            datax.push({
              Image: item.Order[0].IdCard,
              title: `Thank you for ordering with WeedX.io! Your order #${item.Order[0].OrderId} is confirmed for $${item.Order[0].subtotal}.`,
              date: item.Order[0].OrderDate,
              link: `/MyOrderProductDetail/${item.Order[0].OrderId}`,
              Id: item.Notification,
            });
          }
          if (item.blog.length !== 0) {
            datax.push({
              Image: item.blog[0].Image,
              title: item.blog[0].Title,
              date: item.blog[0].updated,
              link: `/cannabis-news/${modifystr(item.blog[0].Title)}/${item.blog[0].id}`,
              Id: item.Notification,
            });
          }
        });
  
        let sortedData = debounce.sortBy(datax, (dateObj) => dateObj.date);
        dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct });
        Setnotificationdata(sortedData.reverse());
      } catch (err) {
        console.error(err);
      }
    };

    return (
        notify &&
        <ClickAwayListener onClickAway={() => { setnotify(false) }}>
            <div className={`${clases.notificationList} ${!Boolean(notificationdata?.length) && "flex-column center"} `}>
                <div className={clases.notificationHeader}>
                    <h4 className={clases.notifytitle}>{`Notification`}</h4>
                  { ( Boolean(notificationdata?.length > state?.Profile?.RemovedNotification?.length ) && state?.login ) && <span className={clases.clearNotify} onClick={() => ClearAll()}> <RxCross2 /> </span>}
                </div>
                {
                    Boolean(state?.login) ?
                    <div className={clases.notificationContainer}>  
                    { 
                        Boolean(notificationdata?.length > state?.Profile?.RemovedNotification?.length)
                        ?
                            notificationdata?.map((data, index) => {
                                    if(Boolean(!state.Profile.RemovedNotification.includes(data.Id))){
                                        return (
                                            <div key={index} className={clases.notification_box}>

                                                <Link href={data.link} onClick={()=>{setnotify(false)}}>
                                                    <div className={clases.notification_img}>
                                                        <div className={clases.notiimgCircle}>
                                                            <Image    onError={(e) => (e.target.src = '/blankImage.jpg')} priority width={100} height={100} src={data.Image} alt={data.title} title={data.title} />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="w-100" >
                                                    <div className='d-flex justify-content-between align-items-center'> 
                                                     <Link href={data.link} onClick={()=>{setnotify(false)}}> <div className="d-flex align-items-center justify-content-between gap-5"> <h4 className={clases.notititle}>{data.title} </h4></div></Link>
                                                           <span className='cursor-pointer' onClick={(e) => Clear(data)}><RxCross2 size={15} color={"#000"} /></span>
                                                    </div>



                                                    <Link href={data.link} onClick={()=>{setnotify(false)}}>
                                                          <div className="d-flex align-items-center justify-content-between gap-5">
                                                            <span className={clases.notify_date}>{calculateTImefromDate(data.date)}</span>
                                                          </div>  
                                                    </Link>

                                                </div>

                                            </div>
                                        )
                                    }
                            })
                        :
                        <div className='w-100 h-100 d-flex align-items-center justify-content-center '>{`No New Notification`}</div>
                    }
                    </div>
                    :
                    <div className={clases.notificationContainer}>
                    { 
                        Boolean(notificationdata.length !==0)
               
                        ?   notificationdata?.map((data, index) => {
                     
                                return (
                                        <div key={index} className={clases.notification_box}>
                                            <Link href={data.link} onClick={()=>{setnotify(false) ; removenotify(data)}}>
                                                <div className={clases.notification_img}>
                                                    <div className={clases.notiimgCircle}>
                                                        <Image   priority width={100} height={100} src={data?.image} alt={data.title} title={data.title} onError={() => '/image/weedx.io logo.png'} />
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="w-100" >
                                                <div className='d-flex justify-content-between align-items-center'> <Link href={data.link} onClick={()=>{setnotify(false); removenotify(data)}}>    <span className={clases.notify_date}>{calculateTImefromDate(data.date)}</span> </Link> </div>
                                                <Link href={data.link} onClick={()=>{setnotify(false); removenotify(data)}}>  <div className="d-flex align-items-center justify-content-between gap-5"><h4 className={clases.notititle}>{data.title} </h4> </div>  </Link>
                                            </div>
                                        </div>
                                    )
                            })  :  <div className='w-100 h-100 d-flex align-items-center justify-content-center '>{`No New Notification`}</div>
                    }
                    </div>
                }
            </div>
        </ClickAwayListener>

    )
}
export default  React.memo(Notification)