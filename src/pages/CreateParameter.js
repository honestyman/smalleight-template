import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import TwoColumnWithInput from "components/hero/TwoColumnWithInput";

export default () => {
  return (
    <AnimationRevealPage>
      {/* <Header /> */}
      <TwoColumnWithInput />
      <Footer />
    </AnimationRevealPage>
  );
};
