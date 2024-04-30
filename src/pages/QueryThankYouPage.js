import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, Content2Xl } from "components/misc/Layouts";
import tw from "twin.macro";
// eslint-disable-next-line
import { css } from "styled-components/macro"; 
import GitHubButton from "react-github-btn";

import { LogoLink } from "components/headers/light.js";
import { SectionHeading as HeadingBase } from "components/misc/Headings";
import { SectionDescription as DescriptionBase } from "components/misc/Typography";
import Header from "components/headers/light.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
import Footer from "components/footers/MiniCenteredFooter.js";


import logo from "images/logo.svg";

/* Hero */
const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 lg:mr-12 last:mr-0 text-gray-700 border-gray-400 hocus:border-gray-700 `;

const HeroRow = tw(Row)`max-w-xl flex-col justify-between items-center py-20 lg:py-24 mx-auto`;

const Heading = tw(HeadingBase)`text-center text-primary-900 leading-snug`;
const Description = tw(DescriptionBase)`mt-4 text-center lg:text-base text-gray-700 max-w-lg mx-auto lg:mx-0`;

export default () => {
  /*
   * Using gtag like this because we only want to use Google Analytics when Main Landing Page is rendered
   * Remove this part and the the gtag script inside public/index.html if you dont need google analytics
   */
  window.gtag("js", new Date());
  window.gtag("config", "UA-45799926-9");

  const downloadUrl = "/treact-ui.zip"
  React.useEffect(() => {
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = downloadUrl
    document.body.appendChild(iframe);
  }, [])

  return (
    <AnimationRevealPage disabled>
      <Container tw="-mx-8 -mt-8 pt-8 px-8">
        <Content2Xl>
          {/* <NavRow>
            <LogoLink href="/">
              <img src={logo} alt="" />
              Treact
            </LogoLink>
            <div tw="flex flex-col lg:flex-row items-center">
              <NavLink target="_blank" href="https://owaiskhan.me/post/free-tailwindcss-react-ui-kit">
                License & Usage
              </NavLink>
              <NavLink target="_blank" href="https://twitter.com/owaiswiz">
                Twitter
              </NavLink>
              <NavLink target="_blank" href="https://owaiskhan.me">
                Who Am I ?
              </NavLink>
              <PrimaryNavLink target="_blank" href="https://gum.co/QaruQ">
                Download Now
              </PrimaryNavLink>
            </div>
          </NavRow> */}
          <Header/>
          <HeroRow>
            <Heading>Thank You!</Heading>
            <Description tw="mt-12">お問い合わせありがとうございます!</Description>
            <Description tw="mt-12">内容確認後、ご連絡させていただきますので</Description>
            <Description tw="mt-12">今しばらくお待ちください!</Description>
          </HeroRow>
        </Content2Xl>
      </Container>
      <Footer/>
    </AnimationRevealPage>
  );
};
