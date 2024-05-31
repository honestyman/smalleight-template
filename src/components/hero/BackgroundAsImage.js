import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import TopRigthImage from "images/topright.png";
import Enter from "images/enter.png";

import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import { ConfettiButton } from "components/misc/Buttons.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCounts } from "../../redux/slice/clientSlice.js";
import Mountain from "../../images/mountain.png";


const StyledHeader = styled(Header)`
  ${tw`pt-8 px-10 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-800 hover:border-primary-500 hover:text-primary-500`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  `;

const HeroContainer = tw.div`z-20 relative max-w-screen-3xl 2xl:px-20 mx-auto`;
const TwoColumn = tw.div`max-w-screen-xl lg:pt-24 md:px-10 pt-10 flex justify-between items-center flex-col mx-auto`;
const RightColumn = tw.div`md:h-[250px] h-[200px] w-full mt-2 lg:mt-0`;

const ConfettiDiv = tw.div`w-full h-full flex justify-center flex-col justify-center items-center rounded-md pt-10`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`flex flex-col items-center justify-center rounded bg-cover bg-no-repeat bg-center w-full h-full xl:h-full md:h-[80%]`,
]);

const Heading = styled.h1`
  ${tw`text-center lg:text-center xl:text-5xl md:text-4xl text-3xl font-black text-gray-100`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-gray-800 xl:text-5xl md:text-4xl text-3xl`}`;

const Notification = tw.span`inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-blue-500 font-medium text-sm`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

export default () => {

  const { countData } = useSelector(state => state.clients)
  const dispatch = useDispatch();

  const [likeCount, setLikeCount] = useState(0);
  const [cursor, setCursor] = useState('auto'); 

  useEffect(()=>{
    dispatch(getCounts());
  },[])

  useEffect(()=>{
    setLikeCount(countData)
  },[countData])
  
  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="/service">
        Service
      </NavLink>
      <NavLink href="/tools">
        Webtool
      </NavLink>
      {/* <NavLink href="">
        Column
      </NavLink> */}
      <NavLink href="/summary">
        Summary
      </NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink href="/contact">
        <span tw="text-gray-100">Contact</span>
      </PrimaryLink>
    </NavLinks>
  ];

  return (
    <Container>
      {/* {/* <OpacityOverlay /> */}
      <img src={Mountain} tw="absolute z-0 mt-20 right-0 md:min-w-[60%] md:h-[300px] md:min-h-[500px] lg:w-auto w-full max-w-none"/> 
      <HeroContainer>
          <StyledHeader links={navLinks} />
        {/* <div tw="lg:w-full w-[350px]">
        </div> */}
        <TwoColumn>
            <Heading>
              <div tw="flex justify-center items-center text-gray-800">
                <span tw="leading-relaxed" style={{letterSpacing:"0.1em"}}>小さなことの積み重ねで</span>
                {/* <MdKeyboardReturn tw="text-gray-100 mt-10 ml-1"/> */}
                {/* <img src={Enter} tw="md:w-[48px] w-[30px] mt-5 ml-1"/> */}
              </div>
              <br />
              <SlantedBackground style={{letterSpacing:"0.1em"}}>
                <Typewriter
                  onInit={(typewriter) => {
                      typewriter
                          .pauseFor(2000)
                          .typeString("大きく変わる")
                          .pauseFor(1000)
                          .deleteAll()
                          .typeString("違いを作る")
                          .pauseFor(1000)
                          .deleteAll()
                          .typeString("山となる！")
                          .start();
                  }}
                />
              </SlantedBackground>
            </Heading>
            {/* <Link to="/contact"><PrimaryAction>お問い合わせ</PrimaryAction></Link> */}
          <RightColumn>
            <ConfettiDiv>
              <ConfettiButton/>
              <div tw="w-[300px] h-[3px] bg-gray-800 md:mt-10 "></div>
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
