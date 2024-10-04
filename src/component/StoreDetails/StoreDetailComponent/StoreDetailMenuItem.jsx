
import React from "react"
import clases from '@/styles/customstyle.module.scss'
const StoreDetailMenuItem = ({SelectionTab , tab}) => {
    const StoreDetailMenuItem = [{ item: "Menu",color:"#31B665" }, { item: "Store Details",color:"#31B665" },
     { item: "Review",color:"#31B665" },  { item: "Deals",color:"#31B665" },
    ]
    return (
                <div className={clases.StoreDetailMenuItem_container} >
                    <ul className={clases.store_detail_order_list}>
                        {
                            StoreDetailMenuItem.map((ele, index) => {
                                return (
                                    <li className={clases.store_detail_list} onClick={()=>{SelectionTab(ele.item )}}
                                        style={{color: tab === ele.item.toLowerCase().replace(" ", "-") && ele.color  }}     
                                        key={index}>
                                        <span className={clases.storeDetalMenuItemCursor}>{ele.item}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
    )
}
export default StoreDetailMenuItem