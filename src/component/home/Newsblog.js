import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import React from 'react';
import { modifystr } from '@/hooks/utilis/commonfunction';
import clases from '@/styles/customstyle.module.css';

// Dynamically import ScrollContainer
const ScrollContainer = dynamic(() => import('react-indiana-drag-scroll'), {
    ssr: false,
    loading: () => <div>Loading...</div>, // Fallback while the component loads
});

const Newsblog = ({ data }) => {
    // Memoize the News array to avoid unnecessary re-renders
    const News = React.useMemo(() => data || [], [data]);

    return (
        <div className="px-sm-0">
            <div className="d-flex align-items-center justify-content-between">
                <h3 className={clases.section_main_title}>{'Trendings'}</h3>
                <Link href="/cannabis-news">
                    <span className={clases.viewallbtn}>
                       {' View All'} <FaArrowRight />
                    </span>
                </Link>
            </div>
            <div className="blogs_card_slider">
                <ScrollContainer className="ScrollContainerRelative">
                    {News.map((ele, index) => (
                        <NewsCard key={index} ele={ele} index={index} />
                    ))}
                </ScrollContainer>
            </div>
        </div>
    );
};
const NewsCard = React.memo(({ ele, index }) => (
    <Link
        href={`/${ele.CategoryName === 'BLOGS' ? 'blogs' : 'cannabis-news'
            }/${modifystr(ele.Title)}/${ele.id}`}
        className="d-block"
    >
        <div className={clases.new_blog_card}>
            {/* Blog Image */}
            <div className={clases.new_blog_card_img}>
                <Image
                    width={100}
                    height={100}
                    src={`${ele.Image}`}
                    alt="Weedx"
                    title={ele.Title}
                    priority={index < 2} // Load first two images eagerly, others lazily
                    placeholder="blur"
                    blurDataURL="/image/blankImage.jpg"
                    onError={(e) => (e.target.src = '/image/blankImage.jpg')} // Fallback on error
                />
            </div>
            <div className={clases.new_blog_card_text}>
                <span className={`${clases.latest_font_size} text-capitalize`}>
                    {ele.Title}
                </span>
            </div>
        </div>
    </Link>
));
Newsblog.displayName = "Newsblog"; // Add displayName here
export default React.memo(Newsblog); // Memoize the Newsblog component to avoid unnecessary re-renders