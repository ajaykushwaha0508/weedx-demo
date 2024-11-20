import * as React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useRouter } from 'next/router';
import Categoryskeleton from "../skeleton/categoryskeleton";
import { FirstLetterCaps } from "../../hooks/utilis/commonfunction"
import Image from 'next/image';
// import clases from '@/styles/customstyle.module.css'
const Category = React.memo(({ ShowCategoryProduct, Category }) => {
    const Params = useRouter().query;

    return (

        <div className={"CategoryBordrr"}>
            <div className={'catagoryTabs_section'}>
                {
                    Object.keys(Params).length === 0 ? <h2 className={'shopByCategoryHeading'}>{`Shop By Category`}</h2> : null
                }
           
           
                <ScrollContainer className="ScrollContainerRelative">
                    {Category?.map((ele, index) => {

                        return (
                            <div className={"CategorySliderImageBlock"} key={index}>

                                <Image
                                    onClick={() => { ShowCategoryProduct(ele.id, ele.name) }}
                                    src={ele.categoryImages} alt={ele.name.substr(0, 100)}
                                    title={ele.name.substr(0, 100)}
                                    width={100}
                                    height={100}
                                    priority
                                    onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                    className={"catagoriesTabImg"} />

                                <div className={`col center ${"Category_title"}`} >
                                    <p>{FirstLetterCaps(ele?.name?.substr(0, 100))}</p>
                                </div>

                            </div>
                        )
                    })}
                </ScrollContainer>

            </div>
        </div>

    )
})
Category.displayName = "Category";
export default Category





// category_container,catgory_wraper ,cat_main_div