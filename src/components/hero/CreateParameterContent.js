import React, {useState, useEffect} from "react";

import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/design-illustration-2.svg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";

const Container = tw.div`relative px-10`;
const TwoColumn = tw.div`flex flex-col lg:flex-row justify-center items-center max-w-screen-xl mx-auto py-20`;
const LeftColumn = tw.div`relative lg:w-8/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex justify-center items-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 md:text-[12px] text-sm lg:text-[12px]`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`h-full flex justify-center items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
`;
const Form = tw.div`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Label = tw.label`text-left text-sm md:text-[12px] lg:text-[12px] font-medium leading-relaxed text-secondary-100`
const Input = tw.input`mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const ResultLabel = tw.label`md:text-left mt-10 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Required= tw.span`bg-primary-500 text-sm text-white rounded px-1 mx-1`

const Result = tw.div`mb-3 first:mt-0 h-24 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const ResultText = tw.p`break-words`;
export default ({ roundedHeaderButton }) => {
  const [url, setUrl] = useState("");
  const [campaignSource, setCampaignSource] = useState("");
  const [campaignMedium, setCampaignMedium] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [campaignContent, setCampaignContent] = useState("");
  const [campaignTerm, setCampaignTerm] = useState("");
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              <span tw="text-primary-500 mr-3">{`{#}`}</span>UTMパラメータ生成
            </Heading>
            <Paragraph>
            下記に必要な情報を入れるだけで広告などに付与するUTM パラメータを生成できます。
            </Paragraph>
            <Form>
              {/* <Valid>{validQueryKind !="" && validQueryKind}</Valid> */}
              <Label>(1) WEBサイトURLを入力してください<Required>必須</Required></Label>
              <Input type="text" name="url" placeholder="例) https://smalleight.jp/" value={url} onChange={(e)=>setUrl(e.target.value)}/>
              {/* <Valid>{validCompanyName !="" && validCompanyName}</Valid> */}
              <Label>(2) キャンペーンのソース(参照元)を入力してください<Required>必須</Required></Label>
              <Input type="text" name="campaignSource" placeholder="例) google" value={campaignSource} onChange={(e)=>setCampaignSource(e.target.value)}/>
              {/* <Valid>{validClientName !="" && validClientName}</Valid> */}
              <Label>(3) キャンペーンのメディアを入力してください<Required>必須</Required></Label>
              <Input type="email" name="campaignMedia" placeholder="例) cpc" value={campaignMedium} onChange={(e)=>setCampaignMedium(e.target.value)}/>
              {/* <Valid>{validClientEmail !="" && validClientEmail}</Valid> */}
              <Label>(4) キャンペーン名を入力してください<Required>必須</Required></Label>
              <Input type="email" name="campaignMedia" placeholder="例) brand" value={campaignName} onChange={(e)=>setCampaignName(e.target.value)}/>
              <Label>(5) キャンペーンのコンテンツを入力してください (任意)</Label>
              <Input type="email" name="campaignContent" placeholder="例) summer_event" value={campaignContent} onChange={(e)=>setCampaignContent(e.target.value)}/>
              <Label>(6) キャンペーンのキーワードを入力してください (任意)</Label>
              <Input type="email" name="campaignTerm" placeholder="例) shirt、 {keyword} など" value={campaignTerm} onChange={(e)=>setCampaignTerm(e.target.value)}/>
              <ResultLabel>生成結果</ResultLabel>
              <Result>
                <ResultText>{url && <span>{url}</span>}{url && campaignSource && <span>?utm_source={campaignSource}</span>}{url && campaignSource && campaignMedium && <span>&utm_medium={campaignMedium}</span>}{url && campaignSource && campaignMedium && campaignName && <span>&utm_campaign={campaignName}</span>}{url && campaignSource && campaignMedium && campaignName && campaignContent && <span>&utm_content={campaignContent}</span>}{url && campaignSource && campaignMedium && campaignName && campaignTerm && <span>&utm_term={campaignTerm}</span>}</ResultText>
              </Result>
              </Form>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Design Illustration" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
