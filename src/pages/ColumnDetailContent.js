import React, { useState, useEffect, useRef } from 'react';
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Link, useNavigate } from 'react-router-dom';
import { Link as MenuLink } from 'react-scroll';

import { useDispatch, useSelector } from 'react-redux';
import { SlArrowRight } from "react-icons/sl";
import { getOneColumn } from "../redux/slice/columnSlice";
import { TfiMenuAlt } from "react-icons/tfi";

// import computer from '../../img/computer.webp';


// import WOW from 'wow.js';
// import 'animate.css';

const ColumnDetailContent = (props) => {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const navigate= useNavigate();

  const [date, setDate]=useState("")

  const  {oneColumnData } = useSelector(state => state.columns);
  const Title = tw.h1`lg:text-3xl font-bold lg:mt-20 text-center sm:text-xl mt-10`;
  const H2 = tw.h2`ml-2 sm:text-base font-bold lg:text-2xl`;
  const ParentContainer = tw.div`w-full`
  const TextPath = tw.div`lg:mx-10 lg:pb-10 pb-0 text-left text-sm sm:mx-2`;
  const Maindiv = tw.div`w-full flex justify-center pb-10 sm:rounded-[20px] sm:flex-wrap-reverse`;
  const MainContainer = tw.div`flex flex-col text-left sm:px-5 sm:w-full`;
  const FirstDiv = tw.div`flex mt-5 py-2 justify-between items-center flex-wrap`;
  const Description = tw.div`my-10 leading-loose tracking-wider lg:text-base text-sm`;
  const CategoryList = styled.div`${tw`flex`}
  span {
    ${tw`lg:mx-3 lg:text-sm text-xs font-bold bg-primary-500 text-gray-100 rounded-md sm:text-xs px-2 py-1 mx-1`}
  }`;
  const DateText = tw.p`lg:text-xl text-sm text-[#191F4D] font-bold mx-5 text-gray-700`
  
  const NavLink = tw.a`bg-primary-500 px-3 py-1 text-gray-100 rounded-md`;
  const MenuDiv = styled.div`${tw`bg-[#f4f8f9] lg:p-10 flex flex-col p-5`}
  
  `;
  const MenuTitleDiv = tw.div`flex items-center text-primary-500 font-bold justify-center lg:text-2xl sm:text-xl py-5`
  const MenuTitle = tw.p`ml-2`;
  const MenuH1Mark =tw.div`flex lg:text-base font-bold lg:p-3 items-center sm:text-xl pt-2`;
  const MenuH2Mark =tw.div`w-full py-2 pl-20 font-bold sm:pl-10 mt-2`;
  const MenuDivH1 = tw.div`rounded-full text-sm mr-2 text-white p-2 bg-primary-500`;

  const ThumbnailDiv = styled.div`${tw`w-full flex justify-center py-5`}
    img {
      ${tw`rounded hover:opacity-50 hover:scale-110`}
    }
  `;
  const H1Title = styled.div`${tw`flex lg:text-2xl font-bold text-[#191F4D] lg:px-5 lg:py-2 bg-[#f4f8f9] items-center sm:text-xl sm:pt-0`}
  div {
    ${tw`rounded-full text-sm text-white p-3 bg-[#191F4D]`}
  }`;
  const Image = styled.div`${tw`w-full flex justify-center py-5`}
  img {
    ${tw`rounded hover:opacity-50 hover:scale-110`}
  }`;
const H1Description = tw.p`my-10 lg:text-base leading-loose tracking-wider text-sm`;
const H3Title = styled.div`${tw`w-full border-b-[2px] border-dashed p-3 border-primary-500`}
  h3 {
    ${tw`lg:text-xl font-bold sm:text-[16px]`}
  }`;
const H3Description = tw.p`my-10 lg:text-base leading-loose tracking-wider text-sm`


  useEffect(() => {
    dispatch(getOneColumn(props.columnId));
  },[]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(()=>{
    console.log(oneColumnData);
  },[oneColumnData]);

    
  return (
      <ParentContainer>
        <TextPath><NavLink href="/">Top</NavLink> / <NavLink href="/column">Column</NavLink> / {oneColumnData.title}</TextPath>
        <Maindiv>
          <MainContainer>
            <Title><span>{oneColumnData.title}</span></Title>
            <FirstDiv>
              <CategoryList>
                {
                  oneColumnData.columncategories && oneColumnData.columncategories.map((category, index)=>{
                    return(
                      <span key={index} >{category.text}</span>
                    );
                  })
                }
              </CategoryList> 
              <DateText>{oneColumnData.createdAt?oneColumnData.createdAt.slice(0,10):""}</DateText>
            </FirstDiv>
            <Description>{oneColumnData.description}</Description>
            <MenuDiv>
              <MenuTitleDiv>
                <TfiMenuAlt/>
                <MenuTitle>目次</MenuTitle>
              </MenuTitleDiv>
              {
                oneColumnData.columnfirstchildren && oneColumnData.columnfirstchildren.map((section1, index1)=>{
                  return(
                    <div key={index1}>
                      <MenuLink to={`h2_${section1.id}`} smooth={true} duration={500}>
                        <MenuH1Mark>
                          <MenuDivH1>
                            <span>{index1<=9?`0${index1+1}`:index1+1}</span>
                          </MenuDivH1>
                          <h2>{section1.title}</h2>
                        </MenuH1Mark>
                      </MenuLink>
                      {/* <p className='my-10 leading-loose tracking-wider sp:text-xs'>{section1.description}</p> */}
                      {
                        section1 && section1.columnsecondchildren.map((section2, index2)=>{
                          return(
                            <div key={index2}>
                              <MenuLink to={`h3_${section2.id}`} smooth={true} duration={500}>
                                <MenuH2Mark>
                                  <h3>- {section2.title}</h3>
                                </MenuH2Mark>
                              </MenuLink>
                              {/* <p className='my-10 leading-loose tracking-wider sp:text-xs'>{section2.description}</p> */}
                            </div>
                          )
                        })
                      }
                    </div>
                  );
                })
              }
            </MenuDiv>
            <ThumbnailDiv>
              {oneColumnData.thumbnail && <img src={`${process.env.REACT_APP_BASE_URL}/img/${oneColumnData.thumbnail}`} alt={oneColumnData.alt?oneColumnData.alt:""}/>}
            </ThumbnailDiv>
            <div>
              {
                oneColumnData.columnfirstchildren && oneColumnData.columnfirstchildren.map((section1, index1)=>{
                  return(
                    <div key={index1} id={`h2_${section1.id}`}>
                      <H1Title>
                        <div>
                            <SlArrowRight />
                        </div>
                        <H2>{section1.title}</H2>
                      </H1Title>
                      <H1Description>{section1.description}</H1Description>
                      <Image>
                        {section1.image && <img src={`${process.env.REACT_APP_BASE_URL}/img/${section1.image}`} alt={section1.alt?section1.alt:""}/>}
                      </Image>
                      {
                        section1 && section1.columnsecondchildren.map((section2, index2)=>{
                          return(
                            <div key={index2} id={`h3_${section2.id}`}>
                              <H3Title>
                                <h3>{section2.title}</h3>
                              </H3Title>
                              <H3Description>{section2.description}</H3Description>
                              <Image>
                                {section2.image && <img src={`${process.env.REACT_APP_BASE_URL}/img/${section2.image}`} alt={section2.alt?section2.alt:""}/>}
                              </Image>
                            </div>
                          )
                        })
                      }
                    </div>
                  );
                })
              }
            </div>
          </MainContainer>
            
        </Maindiv>
      </ParentContainer>
  );
};

export default ColumnDetailContent;