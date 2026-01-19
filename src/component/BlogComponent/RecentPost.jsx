import React, { useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import clases from "@/styles/customstyle.module.css";
import { modifystr } from "@/hooks/utilis/commonfunction";
const RecentPost = () => {
  const Router = useRouter();
  const id = Router?.query?.id;
  const [News, SetNews] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:1331/UserPanel/Get-News/");
        const data = await res.json();
        const newdata = data.filter((item) => item.id !== id.id);
        SetNews(newdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <React.Fragment>
      <div className="  my-3 my-md-5">
        <h3 className={clases.section_main_title}>{`Recent Blogs`}</h3>
        <div className="blogs_card_slider">
          <ScrollContainer className="ScrollContainerRelative">
            {News?.map((ele, index) => {
              return (
                <Link
                  href={`/${
                    ele.CategoryName === "BLOGS" ? "blogs" : "cannabis-news"
                  }/${modifystr(ele.Title)}/${ele.id}`}
                  key={index}
                  className="d-block"
                >
                  <div className={clases.new_blog_card}>
                    <div className={clases.new_blog_card_img}>
                      <Image
                        width={500}
                        height={500}
                        src={`${ele.Image}`}
                        alt={ele.Title}
                        quality={70}
                        title={ele.Title}
                        priority
                        onError={(e) => (e.target.src = "/blankImage.jpg")}
                        style={{ pointerEvents: "none" }}
                      />
                    </div>
                    <div className={clases.new_blog_card_text}>
                      <span className={clases.latest_font_size}>
                        {" "}
                        {ele.Title}{" "}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ScrollContainer>
        </div>
      </div>
    </React.Fragment>
  );
};
export default RecentPost;
