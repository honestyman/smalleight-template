import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";

//eslint-disable-next-line
import { css } from "styled-components/macro";

const Container = tw.div`relative w-full`;
const TwoColumn = tw.div`w-full flex flex-col lg:flex-row max-w-screen-xl mx-auto pb-10`;
const LeftColumn = tw.div`relative lg:w-7/12 text-center mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative lg:w-5/12 lg:mt-0 flex-1 flex flex-col`;
const Title = tw.p`text-2xl font-bold`;

const Heading = tw.h1`font-bold text-2xl md:text-3xl flex items-center lg:text-3xl xl:text-3xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 md:text-[12px] text-sm lg:text-[12px]`;

const ResultContent = tw.div`h-full flex flex-col justify-center items-start md:pl-24 pl-0 pt-10`;

// Random Decorator Blobs (shapes that you see in background)

const Form = tw.div`w-full mt-8 md:mt-10 text-sm flex flex-col mx-auto md:mx-0 bg-white`
const Label = tw.label`text-left text-sm md:text-[12px] lg:text-[12px] font-medium leading-relaxed text-secondary-100`
const Input = tw.input`mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const ResultLabel = tw.label`md:text-left md:text-4xl font-medium leading-relaxed text-center`
const Button = tw.button`w-full flex justify-center items-center rounded-md text-white px-5 py-2 text-sm border border-primary-500 bg-primary-500 transition duration-300 hover:bg-white hover:text-black`


export default ({ roundedHeaderButton }) => {
  const [articleType, setArticleType] = useState("");
  const [url, setUrl] = useState("");
  const [headline, setHeadline] = useState("");
  const [images, setImages] = useState([{ id: Date.now(), value: '' }]);
  const [description, setDescription] = useState("");
  const [authorType, setAuthorType] = useState("");
  const [author, setAuthor] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publisherUrl, setPublisherUrl] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [modifyDate, setModifyDate] = useState("");

  const Select = tw.select`w-full mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
  const handleChange = (id, event) => {
    const newImages = images.map(image => {
      if (image.id === id) {
        return { ...image, value: event} ;
      }
      return image;
    });
    setImages(newImages);
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };
  const addImage = () => {
    setImages([...images, {id:Date.now(), value:'' }])
  }

  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>Article</Heading>
            <Form>
              <div tw="w-full flex flex-wrap justify-between">
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Article @type</label>
                  <Select value={articleType} onChange={(e)=>setArticleType(e.target.value)}>
                    <option>Article</option>
                    <option>New Articles</option>
                    <option>Blog Posting</option>
                  </Select>
                </div>
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>URL</label>
                  <Input tw="w-full" type="text" placeholder="https://example.com" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex justify-between mt-5">
                <div tw="w-full flex flex-col items-start">
                  <label>Headline</label>
                  <Input tw="w-full" type="text" name="headline" value={headline} onChange={(e)=>setHeadline(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex flex-col items-start mt-5">
                <label>Image URL</label>
                <div tw="w-full">
                  {
                    images.map((image, index)=>{
                      return(
                        <div tw="w-full flex items-center justify-between">  
                          <Input tw="w-[80%]" type="text" name="imgae" placeholder="https://example.com" onChange={(e)=>handleChange(image.id, e.target.value)}/>
                          <a href="" tw="text-[24px] text-black" 
                          onClick={(e)=>{
                            e.preventDefault();
                            handleDeleteImage(image.id);
                          }}
                          ><AiTwotoneDelete /></a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div tw="w-full flex flex-wrap mt-5 items-center justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">  
                  <Button onClick={addImage}><IoIosAdd tw="mr-2"/> Image</Button>
                </div>
                <div tw="md:w-[60%] w-full flex flex-col items-start mt-5">  
                  <label>Description</label>
                  <Input tw="w-full" type="text" name="company"/>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Author @type</label>
                  <Select value={authorType} onChange={(e)=>setAuthorType(e.target.value)}>
                    <option>Person</option>
                    <option>Oganization</option>
                  </Select>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Author</label>
                  <Input tw="w-full" type="text" name="author" value={author} onChange={(e)=>setAuthor(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Author URL</label>
                  <Input tw="w-full" type="text" name="authorUrl" placeholder="https://example.com" value={authorUrl} onChange={(e)=>setAuthorUrl(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Publisher</label>
                  <Input tw="w-full" type="text" name="publisher" value={publisher} onChange={(e)=>setPublisher(e.target.value)}/>
                </div>
                <div tw="md:w-[60%] w-full flex flex-col items-start">
                  <label>Publisher logo URL</label>
                  <Input tw="w-full" type="text" name="publisherUrl" placeholder="https://example.com" value={publisherUrl} onChange={(e)=>setPublisherUrl(e.target.value)}/>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[40%] w-full flex flex-col items-start">
                  {/* <label>Publisher</label> */}
                  <Input tw="w-full" type="date" name="publishedDate" value={publishDate} onChange={(e)=>setPublishDate(e.target.value)}/>
                </div>
                <div tw="md:w-[40%] w-full flex flex-col items-start">
                  {/* <label>Publisher logo URL</label> */}
                  <Input tw="w-full" type="date" name="modifyDate" value={modifyDate} onChange={(e)=>setModifyDate(e.target.value)}/>
                </div>
              </div>
              
            </Form>
          </LeftColumn>
          <RightColumn>
            <ResultContent>
              <span>{'<script type="application/ld+json">'}</span>
              <span>{'{'}</span>
                <span tw="ml-5">{'"@context": "https://schema.org",'}</span>
                <span tw="ml-5">{`"@type": "${articleType}",`}</span>
                <span tw="ml-5">{`"headline": "${headline}",`}</span>
                {
                  url !='' && <div tw="flex flex-col ml-5">
                    <span>{'"mainEntityOfPage": {'}</span>
                      <span tw="ml-5">{'"@type": "WebPage",'}</span>
                      <span tw="ml-5">{`"@id": "${url}",`}</span>
                    <span>{'},'}</span>
                  </div>
                }
                {
                  (images.length == 1) && <span tw="ml-5">{`"image": "${images[0].value}",`}</span>
                }
                {
                  (images.length > 1) && <div tw="flex flex-col ml-5">
                    <span>{'"image": ['}</span>
                    {
                      images.map((image, index)=>{
                        return(
                          <span tw="ml-5">{`"${image.value}",`}</span>
                        )
                      })
                    }
                    <span>{`],`}</span>
                  </div>   
                }
                <span tw="ml-5">{'"author": {'}</span>
                  <div tw="flex flex-col ml-5">
                    <span tw="ml-5">{`"@type": "${authorType}",`}</span>
                    <span tw="ml-5">{`"name": "${author}",`}</span>
                    {
                     authorUrl && <span tw="ml-5">{`"url": "${authorUrl}",`}</span>
                    }
                  </div>   
                <span tw="ml-5">{'},'}</span>
                <span tw="ml-5">{'"publisher": {'}</span>
                  <div tw="flex flex-col ml-5">
                    <span tw="ml-5">{'"@type": "Organization",'}</span>
                    <span tw="ml-5">{`"name": "${publisher}",`}</span>
                    <div tw="flex flex-col ml-5">
                      <span>{'"logo": {'}</span>
                        <span tw="ml-5">{'"@type": "ImageObject",'}</span>
                        <span tw="ml-5">{`"url": "${publisherUrl}",`}</span>
                      <span>{'}'}</span>
                    </div>
                  </div> 
                <span tw="ml-5">{`"datePublished": "${publishDate}",`}</span>
                {
                  modifyDate && <span tw="ml-5">{`"dateModified": "${modifyDate}"`}</span>
                }
                <span tw="ml-5">{'},'}</span>
                
              <span>{'}'}</span>
              <span>{'<script>'}</span>
            </ResultContent>
          </RightColumn>
        </TwoColumn>
      </Container>
    </>
  );
};
