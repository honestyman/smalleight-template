import React, {useState, useEffect} from "react";

import tw from "twin.macro";
import { MdOutlineDataObject } from "react-icons/md";

//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header from "../headers/light.js";

import Article from "./generatercomponent/Article.js";
import BreadCrumb from "./generatercomponent/BreadCrumb.js";
import FAQPage from "./generatercomponent/FAQPage.js";
import Event from "./generatercomponent/Event.js";
import Howto from "./generatercomponent/Howto.js";
import JobPosting from "./generatercomponent/JobPosting.js";
import LocalBusiness from "./generatercomponent/LocalBusiness.js";

const Container = tw.div`relative px-5`;
const TwoColumn = tw.div`flex flex-col lg:flex-row max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative lg:w-7/12 lg:mt-0 flex-1 flex flex-col`;

const Heading = tw.h1`font-bold text-2xl md:text-3xl flex items-center lg:text-3xl xl:text-3xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 md:text-[12px] text-sm lg:text-[12px]`;

const MainContent = tw.div`flex flex-col lg:flex-row max-w-screen-xl mx-auto justify-start items-start`;

const Form = tw.div`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Label = tw.label`text-left text-sm md:text-[12px] lg:text-[12px] font-medium leading-relaxed text-secondary-100`


export default ({ roundedHeaderButton }) => {
  const [kind, setKind] = useState("Article");

  const Select = tw.select`mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`

  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              <span tw="text-4xl text-primary-500 mr-3"><MdOutlineDataObject/></span>Schema Markup Generator 
            </Heading>
            <Paragraph>
            このSchema.org構造化データジェネレーターを使用して、必須項目のプロパティなどをすべて含むJSON-LDマークアップを作成します。
            </Paragraph>
            <Form>
              <Label>Which Schema.org markup would you like to create?</Label>
              <Select name="kind" value={kind} onChange={(e) => setKind(e.target.value)}>
                <option>Article</option>
                <option>Breadcrumb</option>
                <option>Event</option>
                <option>PAQ Page</option>
                <option>How-to</option>
                <option>Job Posting</option>
                <option>Local Business</option>
                <option>Oganization</option>
                <option>Person</option>
                <option>Product</option>
                <option>Recipe</option>
                <option>Video</option>
                <option>Website</option>
              </Select>
            </Form>
          </LeftColumn>
          <RightColumn>
          </RightColumn>
        </TwoColumn>
        <MainContent>
          {/* {
            kind == "Article" && <Article/>
          }
          {
            kind == "Breadcrumb" && <BreadCrumb/>
          }
          {
            kind == "PAQ Page" && <FAQPage/>
          }
          {
            kind == "Event" && <Event/>
          }
          {
            kind == "How-to" && <Howto/>
          }
          {
            kind == "Job Posting" && <JobPosting/>
          } */}
          <LocalBusiness/>
        </MainContent>
      </Container>
    </>
  );
};
