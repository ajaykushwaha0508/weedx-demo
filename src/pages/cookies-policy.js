
import React from "react";
import Newsletter from "@/component/home/HomePageDealsSignup/";
import { CookiesPolicy } from '@/component/ScoPage/CommenpageSeo';
import Link from "next/link";
import Cockiestable from "@/component/tableofcontent/Cockiestable";
import { useRef } from "react";
import styled from '@/styles/customstyle.module.scss'
const Termsconditions = () => {
  const ref = useRef(null);
  return (
    <>
      <CookiesPolicy></CookiesPolicy>
      <div className={styled.term_condition}>
        <div className="container-fluid">
          <div className={styled.tc_hero}>
            <h1 className={styled.page_heading}> {` Weedx.io Cookies policy`}</h1>
          </div>
          <div className={`row ${styled.tc_content} justify-content-between`}>
            <div className={`col-md-7 ${styled.tc_main_centent}`}>
              <ol ref={ref}>
                <li id="introduction">
                  <span className={styled.question}>{`Introduction`}</span>
                  <span className={styled.answer}>
                    {`  Welcome to `}
                    <Link href={'/'}>{`weedx.io`}</Link>
                    {` (the "Website"), owned and operated by selnox infotech ("we," "us," "our"). This Cookie Policy explains how we use cookies and similar tracking technologies when you access or use our Website.
                    `}
                  </span>
                </li>
                <li id="what_are_cookies">
                  <span className={styled.question}>{`What Are Cookies?`}</span>
                  <span className={styled.answer}>
                    {`  Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences, enhance your browsing experience, and collect information about your usage.
               `}{" "}
                  </span>
                </li>
                <li id="types_of_Cookies_we_use">
                  <span className={styled.question}> {`Types of Cookies We Use`}</span>
                  <span className={styled.answer}>
                    {` We may use the following types of cookies:

                Essential Cookies: These cookies are necessary for the basic functioning of our Website and enable you to access and navigate our Website.

                Analytical/Performance Cookies: These cookies help us analyze how users interact with our Website, allowing us to improve its performance and user experience.

                Functionality Cookies: These cookies remember your preferences and choices, such as language or region settings, to enhance your experience.

                Targeting/Advertising Cookies: These cookies are used to deliver relevant advertisements and content to you based on your interests and online behavior.`}
                  </span>
                </li>
                <li id="how_we_use_cookies">
                  <span className={styled.question}>{` How We Use Cookies`}</span>
                  <span className={styled.answer}>
                    {` We use cookies for various purposes, including:
                    Recognizing your device when you visit our Website.
                    Remembering your preferences and settings.
                    Analyzing user behavior to improve our Website.
                    Delivering targeted advertisements.`}
                  </span>
                </li>
                <li id="managing_your_cookie_preferences">
                  <span className={styled.question}>
                    {" "}
                    {`Managing Your Cookie Preferences`}
                  </span>
                  <span className={styled.answer}>
                    {`  You can manage your cookie preferences through your browser settings. Most browsers allow you to control cookies, including accepting or rejecting them and deleting existing cookies.`}
                  </span>
                </li>
                <li id="third_party_cookies">
                  <span className={styled.question}> {`Third-Party Cookies`} </span>
                  <span className={styled.answer}>
                    {`    We may allow third-party service providers to place cookies on our Website to analyze user behavior and deliver targeted advertisements. These third-party cookies are subject to the privacy policies of the respective providers.`}
                  </span>
                </li>
                <li id="changes_to_this_cookie_policy">
                  <span className={styled.question}>
                    {`Changes to This Cookie Policy`}{" "}
                  </span>
                  <span className={styled.answer}>
                    {`  We may update this Cookie Policy to reflect changes in our cookie usage practices. We will post the updated Cookie Policy on this page with a revised "Last Updated" date.`}
                  </span>
                </li>
                <li id="contact_us">
                  <span className={styled.question}>{`Contact Us`}</span>
                  <span className={styled.answer}>
                    {` If you have any questions, concerns, or requests regarding this Cookie Policy, please contact us at info@weedx.io`}
                  </span>
                </li>
              </ol>
            </div>
            <div className="col-md-4">
              <Cockiestable referal={ref}/>
            </div>
          </div>
        </div>
      </div>
      <Newsletter></Newsletter>
    </>
  );
};

export default Termsconditions;
