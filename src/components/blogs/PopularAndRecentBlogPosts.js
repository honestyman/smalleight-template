import React, { useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getColumnList } from "../../redux/slice/columnSlice";

const Row = tw.div`flex flex-col lg:flex-row lg:flex-wrap -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PopularPostsContainer = tw.div`lg:w-full`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const ViewMoreDiv =tw.div`w-full flex items-center pt-20 justify-center`

const Post = tw(motion.div)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)(props => [
  `background-image: url("${props.$imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;

// const AuthorInfo = tw.div`mt-6 flex items-center`;
// const AuthorImage = tw.img`w-12 h-12 rounded-full`;
// const AuthorNameAndProfession = tw.div`ml-4`;
// const AuthorName = tw.h6`font-semibold text-lg`;
// const AuthorProfile = tw.p`text-secondary-100 text-sm`;

// const RecentPostsContainer = styled.div`
//   ${tw`mt-24 lg:mt-0 lg:w-1/3`}
//   ${PostsContainer} {
//     ${tw`flex flex-wrap lg:flex-col`}
//   }
//   ${Post} {
//     ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
//   }
//   ${Title} {
//     ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
//   }
//   ${AuthorName} {
//     ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
//   }
//   ${Image} {
//     ${tw`h-20 w-20 flex-shrink-0`}
//   }
// `;
// const PostTextContainer = tw.div``

export default () => {
  const dispatch = useDispatch();
  const  {allColumnList } = useSelector(state => state.columns);
  // This setting is for animating the post background image on hover
  useEffect(()=>{
    dispatch(getColumnList());
  },[]);

  useEffect(()=>{
    console.log(allColumnList);
  },[allColumnList])

  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%"
    },
    hover: {
      backgroundSize: "110%"
    }
  };

  //Recommended: Only 2 Items
  const popularPosts = [
    {
      postImageSrc:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80",
      // authorImageSrc:
      //   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
      title: "Tips on how to travel safely in foreign countries",
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      // authorName: "Charlotte Delos",
      // authorProfile: "Travel Advocate",
      url: "https://timerse.com"
    },
    {
      postImageSrc:
        "https://images.unsplash.com/photo-1563784462041-5f97ac9523dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80",
      // authorImageSrc:
      //   "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
      title: "Enjoying the beach life while on a vacation",
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      // authorName: "Adam Cuppy",
      // authorProfile: "Vlogger",
      url: "https://reddit.com"
    }
  ];

  // const recentPosts = [
  //   {
  //     postImageSrc:
  //       "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
  //     title: "Getting the most out of your vacation",
  //     authorName: "Aaron Patterson",
  //     url: "https://reddit.com"
  //   },
  //   {
  //     postImageSrc:
  //       "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
  //     title: "Choosing the perfect Safaris in Africa",
  //     authorName: "Sam Phipphen",
  //     url: "https://reddit.com"
  //   },
  //   {
  //     postImageSrc:
  //       "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
  //     title: "Hiking during the monsoon in Asia",
  //     authorName: "Tony Hawk",
  //     url: "https://timerse.com"
  //   },
  //   {
  //     postImageSrc:
  //       "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
  //     title: "Must carry items while travelling to Thailand",
  //     authorName: "Himali Turn",
  //     url: "https://timerse.com"
  //   },
  //   {
  //     postImageSrc:
  //       "https://images.unsplash.com/photo-1546971587-02375cbbdade?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=641&q=80",
  //     title: "An extremely funny trip to the Swiss Alps",
  //     authorName: "Naomi Watts",
  //     url: "https://timerse.com"
  //   },
  // ]

  return (
    <Container>
      <ContentWithPaddingXl>
        <Row>
          <PopularPostsContainer>
            <Heading>Column</Heading>
            <PostsContainer>
              {(allColumnList.slice(0,3)).map((post, index) => (
                <Post key={index} className="group" initial="rest" whileHover="hover" animate="rest">
                  {
                     post.thumbnail && <Image
                    transition={{ duration: 0.3 }}
                    variants={postBackgroundSizeAnimation}
                    $imageSrc={`${process.env.REACT_APP_BASE_URL}/img/${post.thumbnail}`}
                  />
                  }
                  
                  <Title>{post.title}</Title>
                  <Description>{post.description}</Description>
                  {/* <AuthorInfo>
                    <AuthorImage src={post.authorImageSrc} />
                    <AuthorNameAndProfession>
                      <AuthorName>{post.authorName}</AuthorName>
                      <AuthorProfile>{post.authorProfile}</AuthorProfile>
                    </AuthorNameAndProfession>
                  </AuthorInfo> */}
                </Post>
              ))}
            </PostsContainer>
          </PopularPostsContainer>
          {/* <RecentPostsContainer>
            <Heading>Recent Posts</Heading>
            <PostsContainer>
              {recentPosts.map((post, index) => (
              <Post key={index} href={post.url} className="group">
                <PostTextContainer>
                  <Title>{post.title}</Title>
                  <AuthorName>{post.authorName}</AuthorName>
                </PostTextContainer>
                <Image $imageSrc={post.postImageSrc} />
              </Post>
              ))}
            </PostsContainer>
          </RecentPostsContainer> */}
        </Row>
        <ViewMoreDiv>
          <Link to={"/column"}><PrimaryButton>もっと見る</PrimaryButton></Link>
        </ViewMoreDiv>
      </ContentWithPaddingXl>
    </Container>
  );
};
