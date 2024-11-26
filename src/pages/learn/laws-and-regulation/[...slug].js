import React, { useEffect, useRef, useState } from "react";
import LawStateContent from "@/component/LawsComponent/LawStateContent";
import Content from "@/component/LawsComponent/LawContentsJson";
import _ from "lodash";
import classes from '@/styles/customstyle.module.css';
import { LawState } from '../../../component/ScoPage/LearnSeo';
import { useRouter } from "next/router";
import { modifystr } from "@/hooks/utilis/commonfunction";
const Index = (props) => {
  const ref = useRef(null);
  const router = useRouter()
  return (
    <React.Fragment>
      <LawState Title={`Cannabis Law in ${props?.initialData?.name}` === "Yukon" ? "Cannabis Laws in Yukon, Canada | Legal Age, Possession & Rules" : `Cannabis Law in ${props?.initialData?.name}`} State={props?.initialData?.Country} location={router.asPath}></LawState>
      <div className="container-fluid">
        <div className="row">
          <div className='bgHedaer'>
            <div className='text_on_Learn_banner'>
              <h2>{props.initialData?.name}</h2>
              </div>
          </div>
          <div className={classes.law_contertn}>
              <h1 className={classes.LawStateDescriptionHeading}>
                {`Cannabis Law in `}{props.initialData?.name}
              </h1> 
              <hr />
            <div className="col-12 d-flex">
              <div className={"col-xl-8 col-md-12"} ref={ref}>
                {props?.initialData?.content?.map((data1, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className={data1.title.replaceAll(' ', '_')} id={data1.title.replaceAll(' ', '_')}>
                        <h2 id="isweedLegalHeadings" className={classes.isweedLegalHeading}>{data1.title}</h2>
                        <div className="col-12"  >
                          <section className={classes.isWeedLegalParagraph}>
                            <div dangerouslySetInnerHTML={{ __html: data1?.content }}></div>
                          </section>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <p className={classes.lawDisclaimer}> <b>{`Note :-`}</b> {`By understanding the cannabis laws and regulations in ${props.initialData?.name}, residents and visitors alike can ensure they are compliant and informed. Whether you're purchasing, consuming, or considering cultivation, it's crucial to stay updated with the latest legal guidelines.`}</p>
              </div>

              <div className={"col-4  d-none"}>
                <LawStateContent head={props?.initialData?.content} refrence={ref} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;


export async function getServerSideProps(context) {
  let responseData = {}
  await Content?.forEach((data) => {
    data?.state?.forEach((item) => {
      if (item.id === parseInt(context.params.slug[1])) {
          responseData = item;
      }
    })
  })
  if ("cannabis-law-in-" + modifystr(responseData.name) === context.params.slug[0] && responseData.id === parseInt(context.params.slug[1])) { 
    responseData = await JSON.stringify(responseData)
    responseData = await JSON.parse(responseData)
  }
  else {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialData: responseData,
    },
  };
}
