import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import TopRigthImage from "images/topright.png";

import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import { ConfettiButton } from "components/misc/Buttons.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCounts } from "../../redux/slice/clientSlice.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  `;
  // background-image: url("https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80");

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-primary-500 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`w-1/2 flex flex-col items-center lg:block`;
const RightColumn = tw.div`w-[400px] h-[400px] sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

const ConfettiDiv = tw.div`w-full h-full rounded-md`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`flex flex-col items-center justify-center rounded bg-cover bg-no-repeat bg-center h-full`,
]);

const Heading = styled.h1`
  ${tw`text-center lg:text-left sm:text-4xl lg:text-3xl xl:text-5xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-500 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-blue-500 font-medium text-sm`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

// const StyledResponsiveVideoEmbed = styled(ResponsiveVideoEmbed)`
//   padding-bottom: 56.25% !important;
//   padding-top: 0px !important;
//   ${tw`rounded`}
//   iframe {
//     ${tw`rounded bg-black shadow-xl`}
//   }
// `;



export default () => {

  const { countData } = useSelector(state => state.clients)
  const dispatch = useDispatch();

  const [likeCount, setLikeCount] = useState(0);

  useEffect(()=>{
    dispatch(getCounts());
  },[])

  useEffect(()=>{
    setLikeCount(countData)
  },[countData])
  
  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="/">
        Service
      </NavLink>
      <NavLink href="/tools">
        Webtool
      </NavLink>
      <NavLink href="/column">
        Column
      </NavLink>
      <NavLink href="/summary">
        Summary
      </NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink href="/contact">
        Contact
      </PrimaryLink>
    </NavLinks>
  ];

  return (
    <Container>
      <video src= 
        {`${process.env.REACT_APP_BASE_URL}/img/back.mp4`}
            autoPlay={true} loop muted 
            tw="absolute z-0 w-auto lg:min-w-full lg:min-h-full sm:w-[300px] max-w-none"> 
        </video>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <TwoColumn>
          <LeftColumn>
            <Notification>The Buildup of Little Thing</Notification>
            <Heading>
              {/* <span>小さなことの積み重ねで</span> */}
              <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("小さなことの積み重ねで")
                        .pauseFor(1000)
                        .start();
                }}
                options={{
                  cursor: ""
                }}
              />
              <br />
              {/* <SlantedBackground>大きく変わる　/　違いを作る　/　山となる！</SlantedBackground> */}
              <SlantedBackground>
                <Typewriter
                  onInit={(typewriter) => {
                      typewriter
                          .pauseFor(2000)
                          .typeString("大きく変わる")
                          .pauseFor(1000)
                          .typeString("/ 違いを作る")
                          .start();
                  }}
                  options={{
                    cursor: ""
                  }}
                />
                <Typewriter
                  onInit={(typewriter) => {
                      typewriter
                          .pauseFor(6000)
                          .typeString("/ 山となる！")
                          .start();
                  }}
                  options={{
                    cursor: ""
                  }}
                />
              </SlantedBackground>
            </Heading>
            <Link to="/contact"><PrimaryAction>お問い合わせ</PrimaryAction></Link>
          </LeftColumn>
          <RightColumn>
            <ConfettiDiv>
              <Image imageSrc={TopRigthImage}>
                <ConfettiButton/>
              </Image>
            </ConfettiDiv>
            
            {/* <StyledResponsiveVideoEmbed
              // url="//player.vimeo.com/video/374265101?title=0&portrait=0&byline=0&autoplay=0&responsive=1"
              background="transparent"
            /> */}
          </RightColumn>
        </TwoColumn>
      </HeroContainer>
    </Container>
  );
};
