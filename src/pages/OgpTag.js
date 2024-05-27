import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import OgpTagContent from "components/hero/OgpTagContent";

export default () => {
  return (
    <AnimationRevealPage>
      <OgpTagContent />
      <Footer />
    </AnimationRevealPage>
  );
};
