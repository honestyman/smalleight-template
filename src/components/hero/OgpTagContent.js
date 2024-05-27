import React, {useState, useEffect} from "react";
import axios from "axios";

import styled from "styled-components";
import tw from "twin.macro";
import { IoShareSocialOutline } from "react-icons/io5";

//eslint-disable-next-line
import { css } from "styled-components/macro";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import Header from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/design-illustration-2.svg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";

const Container = tw.div`relative px-5`;
const TwoColumn = tw.div`flex flex-col lg:flex-row max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative lg:w-7/12 lg:mt-0 flex-1 flex flex-col`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl flex items-center lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
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

const ResultContainer = tw.div`w-full flex justify-start items-start lg:pl-20 pl-0 pt-10`;
const ResultDiv = tw.div`w-full flex flex-col items-center`;
const ResultContent = tw.div`w-full lg:h-[600px] h-[300px] rounded border shadow overflow-y-auto mt-5 p-5`;

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
const ResultLabel = tw.label`md:text-left md:text-4xl font-medium leading-relaxed text-center`


const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;

export default ({ roundedHeaderButton }) => {
  const [url, setUrl] = useState("");
  const [ogpData, setOgpData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    if(url !=""){
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/tools/fetch-ogp`, { url:url });
        setOgpData(response.data);
        setError('');
      } catch (err) {
          setError('Failed to fetch OGP data');
          setOgpData(null);
      }
    }else{
      alert("確認したいWEBサイトURLを入力してください");
    }
  };


  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              <span tw="text-6xl text-primary-500 mr-3"><IoShareSocialOutline/></span>OGPタグ確認
            </Heading>
            <Paragraph>
            facebook twitter LINEでページをシェアした際のOGP画像・タイトル・説明文を確認できます。
            </Paragraph>
            <Form>
              {/* <Valid>{validQueryKind !="" && validQueryKind}</Valid> */}
              <Label>(1)確認したいWEBサイトURLを入力してください</Label>
              <Input type="text" name="url" placeholder="例) https://smalleight.jp/" value={url} onChange={(e)=>setUrl(e.target.value)}/>
            </Form>
            <PrimaryButton onClick={fetchData}>確認する</PrimaryButton>
          </LeftColumn>
          <RightColumn>
          {ogpData && (
                <div tw="mt-10 md:mt-0 px-10">
                    <h2 tw="text-xl md:text-2xl font-bold">OGP Data</h2>
                    <p tw="text-[12px]"><strong>Title:</strong> {ogpData.title}</p>
                    <p tw="text-[12px]"><strong>Description:</strong> {ogpData.description}</p>
                    
                    {ogpData.image &&
                      <div tw="w-full flex justify-center">
                        <img src={ogpData.image} alt="OGP" style={{ maxWidth: '50%' }} />
                      </div> 
                    }
                    <h2 tw="text-xl md:text-2xl font-bold mt-10">Twitter Card Data</h2>
                    <p tw="text-[12px]"><strong>Title:</strong> {ogpData.twitterTitle}</p>
                    <p tw="text-[12px]"><strong>Description:</strong> {ogpData.twitterDescription}</p>
                    {ogpData.twitterImage &&
                      <div tw="w-full flex justify-center">
                        <img src={ogpData.twitterImage} alt="Twitter" style={{ maxWidth: '50%' }} />
                      </div> 
                    }
                    <h2 tw="text-xl md:text-2xl font-bold mt-10">LINE Data</h2>
                    <p tw="text-[12px]"><strong>Title:</strong> {ogpData.lineTitle}</p>
                    <p tw="text-[12px]"><strong>Description:</strong> {ogpData.lineDescription}</p>
                    {ogpData.lineImage &&
                      <div tw="w-full flex justify-center">
                        <img src={ogpData.lineImage} alt="LINE" style={{ maxWidth: '50%' }} />
                      </div> 
                    }
                </div>
            )}
          </RightColumn>

          
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
