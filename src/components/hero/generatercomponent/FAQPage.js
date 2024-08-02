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


export default () => {
  const [pages, setPages] = useState([
    { id: Date.now(), question: '', answer:'' },
  ]);

  const Select = tw.select`w-full mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
  const handleQuestionChange = (id, event) => {
    const newPages = pages.map(page => {
      if (page.id === id) {
        return { ...page, question: event} ;
      }
      return page;
    });
    setPages(newPages);
  };

  const handleAnswerChange = (id, event) => {
    const newPages = pages.map(page => {
      if (page.id === id) {
        return { ...page, answer: event} ;
      }
      return page;
    });
    setPages(newPages);
  };

  const handleDeletePage = (id) => {
    if(pages.length > 1){
      setPages(pages.filter(page => page.id !== id));
    }
  };
  const addPage = () => {
    setPages([...pages, {id:Date.now(), question:'', answer:'' }])
  }

  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>FAQ Page</Heading>
            <Form>
              <div tw="w-full flex flex-col items-start mt-5">
                <div tw="w-full">
                  {
                    pages.map((page, index)=>{
                      return(
                        <div tw="w-full flex flex-col">
                          <div tw="w-full flex items-center justify-between"> 
                            <div tw="w-[80%] flex flex-col items-start">
                              <label>{`Question #${index+1}`}</label>
                              <Input tw="w-full" type="text" name="url" onChange={(e)=>handleQuestionChange(page.id, e.target.value)}/>
                            </div> 
                            <a href="" tw="text-[24px] text-black" 
                              onClick={(e)=>{
                                e.preventDefault(); 
                                handleDeletePage(page.id);
                              }}
                            ><AiTwotoneDelete /></a>
                          </div>
                          <div tw="w-full flex flex-col items-start">
                            <label>{`Answer #${index+1}`}</label>
                            <Input tw="w-full" type="text" name="url" onChange={(e)=>handleAnswerChange(page.id, e.target.value)}/>
                          </div> 
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div tw="w-full flex flex-wrap mt-5 items-center justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">  
                  <Button onClick={addPage}><IoIosAdd tw="mr-2"/> Page</Button>
                </div>
              </div>
              
            </Form>
          </LeftColumn>
          <RightColumn>
            <ResultContent>
              <span>{'<script type="application/ld+json">'}</span>
              <span>{'{'}</span>
                <span tw="ml-5">{'"@context": "https://schema.org",'}</span>
                <span tw="ml-5">{'"@type": "FAQPage",'}</span>
                {
                  <div tw="ml-5">
                    <span>{'"mainEntity": ['}</span>
                    {
                      pages.map((page, index)=>{
                        return(
                          <div tw="flex flex-col ml-5">
                            <span>{'{'}</span>
                            <span tw="ml-5">{'"@type": "Question",'}</span>
                            <span tw="ml-5">{`"name": "${page.question}",`}</span>
                            <div tw="flex flex-col ml-5">
                              <span>{'"acceptedAnswer": {'}</span>
                              <span tw="ml-5">{'"@type": "Answer",'}</span>
                              <span tw="ml-5">{`"text": "${page.answer}"`}</span>
                              <span>{'}'}</span>
                            </div>
                            <span>{'},'}</span>
                          </div>
                        )
                      })
                    }
                    <span>{']'}</span>
                  </div>
                }
                
              <span>{'}'}</span>
              <span>{'<script>'}</span>
            </ResultContent>
          </RightColumn>
        </TwoColumn>
      </Container>
    </>
  );
};
