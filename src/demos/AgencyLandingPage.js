import React ,{useState} from "react";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "components/hero/BackgroundAsImage.js";
import Features from "components/features/DashedBorderSixFeatures";
import MainFeature from "components/features/TwoColSingleFeatureWithStats2.js";
import MainFeature2 from "components/features/TwoColWithTwoFeaturesAndButtons.js";
import Portfolio from "components/cards/PortfolioTwoCardsWithImage.js";
// import Blog from "components/blogs/ThreeColSimpleWithImageAndDashedBorder.js";
import BlogColumn from "components/blogs/PopularAndRecentBlogPosts.js";

import Header from "components/headers/light.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustration.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import customerSupportIllustrationSrc from "images/customer-support-illustration.svg";
import SplashScreen from "pages/SplashScreen";
import splashlogo from "../images/splash_logo.png";

export default () => {
  const param = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    const serviceElement = document.getElementById("service");
    if(pathname.includes("service")){
      if (serviceElement) {
        serviceElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>   
      { 
        showSplash && <SplashScreen logo={splashlogo} onFinish={handleSplashFinish}/>
      }
      {
        !showSplash && <AnimationRevealPage>
            <Hero />
            <MainFeature2 />
            <Features />
            {/* <BlogColumn /> */}
            {/* <ContactUsForm /> */}
            <Footer />
        </AnimationRevealPage>
      }
      
    </>
  );

}