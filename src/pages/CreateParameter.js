import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import CreateParameterContent from "components/hero/CreateParameterContent";

export default () => {
  return (
    <AnimationRevealPage>
      <CreateParameterContent />
      <Footer />
    </AnimationRevealPage>
  );
};
