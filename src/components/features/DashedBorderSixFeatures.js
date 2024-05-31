import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings.js";
import { Link } from "react-router-dom";

import defaultCardImage from "../../images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "../../images/svg-decorator-blob-3.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import SupportIconImage from "../../images/support-icon.svg";
import ShieldIconImage from "../../images/adverb.png";
import CustomizeIconImage from "../../images/customize-icon.svg";
import FastIconImage from "../../images/lp.png";
import ReliableIconImage from "../../images/analysis.png";
import SimpleIconImage from "../../images/seo.png";

const Container = tw.div`relative bg-white`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-primary-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;

export default () => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component):
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const cards = [
    {
      imageSrc: CustomizeIconImage,
      title: "WEBツール",
      description: "パラメータ生成や見出し(hタグ)確認ツールなど、業務で役に立つWEBツールをご提供しています。",
      primaryButtonText:"Webtool",
      link: "/tools"
    },
    { 
      imageSrc: ShieldIconImage, 
      title: "広告運用サポート",
      description: "Google広告・Yahoo!広告・Microsoft広告・Meta広告をはじめとした広告運用を代行いたします。" 
    },
    { 
      imageSrc: SupportIconImage,
      title: "インハウス立ち上げ支援",
      description: "媒体選定から、アカウント構成案、運用支援/サポートなどを行っています。" 
    },
    { 
      imageSrc: ReliableIconImage, 
      title: "コンバージョン率最適化",
      description: "ランディングページの最適化、フォーム改善を含めたCVR（コンバージョン率最適化）の支援を行っています。" 
     },
    { 
      imageSrc: SimpleIconImage, 
      title: "SEO/SEOツール導入支援",
      description: "キーワード設計からコンテンツ設計、内部対策等を支援。また、SEOコンテンツ管理ツールやライティングツールの導入支援も行っています。" 
    },
    { imageSrc: FastIconImage, 
      title: "LP・サイト制作支援",
      description: "導線設計、HP・LP制作、WordPress、ララベルなどのフレームワークを利用したWEBサイト制作、システム開発及びアップデート、FlutterやReact Nativeを利用したアプリ開発を行っています。"
     }
  ];

  return (
    <Container>
      <ThreeColumnContainer>
        <Heading>スモハチの<span tw="text-primary-500">Services</span></Heading>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel."}
                </p>
              </span>
              {
              card.link && <Link to={card.link} className="linkBtn">
                <PrimaryButton>
                  {card.primaryButtonText}
                </PrimaryButton></Link>
              }
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
