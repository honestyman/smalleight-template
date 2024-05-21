import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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

import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustration.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import customerSupportIllustrationSrc from "images/customer-support-illustration.svg";

export default () => {
  const param = useParams();
  useEffect(() => {
    if(param.service){
      window.location="#service";
    }
  }, [param]);

  return (
    <AnimationRevealPage>
      <Hero />
      {/* <MainFeature /> */}
      <MainFeature2 />
      <div id="service">
        <Features />
      </div>
      {/* <BlogColumn /> */}
      {/* <ContactUsForm /> */}
      <Footer />
    </AnimationRevealPage>
  );

}