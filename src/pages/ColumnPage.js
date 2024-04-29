import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/headers/light.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
import Footer from "components/footers/MiniCenteredFooter.js";

import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getColumnCategoryList, getColumnList } from "../redux/slice/columnSlice";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = tw.div`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`;
const TopDiv=tw.div`mt-5 w-full flex sm:flex-wrap`;
const CategoryList=tw.div`lg:w-2/3 sm:w-full cursor-pointer flex flex-wrap rounded-md`;
const LinkDiv=tw.div`lg:w-1/3 sm:w-full cursor-pointer flex flex-col items-center rounded-md px-5`;
const CategoryBtn = tw.button`w-32 bg-primary-500 text-sm text-gray-100 rounded-md px-2 py-1 m-2 hover:bg-gray-100 hover:text-primary-500`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Text = styled.div`
  ${tw`text-lg text-center text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const ColumnCategoryList = tw.div`flex justify-start`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose mx-2`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const LinkMoreButton = tw(PrimaryButton)`my-5 mx-auto`;



export default ({
  headingText = "Column"
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allColumnList, allColumnCategoryList } = useSelector(state=>state.columns);
  const [visible, setVisible] = useState(6);
  const [data, setData]=useState([]);

  useEffect(()=>{
    dispatch(getColumnList());
    dispatch(getColumnCategoryList());
  },[]);

  // useEffect(()=>{
  //   console.log("====>",allColumnList);
  // },[allColumnList])
  useEffect(()=>{
    if(!data.length){
      setData(allColumnList);
    }
    // console.log("allColumnList", allColumnList)
  },[allColumnList]);

  const setReset =()=>{
    setData(allColumnList)
  }
  
  const categoryFilterFunction = (text) =>{
    console.log(text);
    setData(
      allColumnList.filter(column => {
        if(column.columncategories){
          for(let i=0;i<column.columncategories.length; i++){
            return(column.columncategories[i].text===text)
          }
        }
      })
    )
  }
  const moveDetail=(id)=>{
    navigate("/columndetail/"+id);
  }

  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Posts>
            <TopDiv>
              <CategoryList>
              <CategoryBtn onClick={setReset}>すべて見る</CategoryBtn>    
                {allColumnCategoryList && allColumnCategoryList.map((category, index) =>{
                  return(
                    <CategoryBtn onClick={() => categoryFilterFunction(category.text)} key={index}>{category.text}</CategoryBtn>
                  );
                })}
              </CategoryList>
              <LinkDiv>
                <Text>
                  <h2>WebTool</h2>
                  <p>フリーのジェネレーターなど業務で役に立つWEBツールをご提供しています。</p>
                </Text>
                <Link to={"/tools"}><LinkMoreButton>WebTool</LinkMoreButton></Link>
              </LinkDiv>
            </TopDiv>
            {data.slice(0, visible).map((post, index) => (
              <PostContainer key={index} onClick={()=>moveDetail(post.id)}>
                <Post className="group">
                  <Image imageSrc={post.thumbnail?`${process.env.REACT_APP_BASE_URL}/img/${post.thumbnail}`:`https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80`} />
                  <Info>
                    <ColumnCategoryList>
                      {
                        post.columncategories && post.columncategories.map((category, index1) => {
                          return(
                            <Category key={index1}>{category.text}</Category>
                          )
                        })
                      }
                    </ColumnCategoryList>
                    {/* <Category>{post.category}</Category> */}
                    {post.createdAt && <CreationDate>{post.createdAt.slice(0,10)}</CreationDate>}
                    <Title>{post.title}</Title>
                    {/* {post.description && <Description>{post.description}</Description>} */}
                  </Info>
                </Post>
              </PostContainer>
            ))}
          </Posts>
          {visible < data.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

const getPlaceholderPost = () => ({
  imageSrc:
    "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80",
  category: "Travel Guide",
  date: "April 19, 2020",
  title: "Visit the beautiful Alps in Switzerland",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  url: "https://reddit.com"
});
