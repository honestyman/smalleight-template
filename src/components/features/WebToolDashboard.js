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

import { IoMdCode} from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiTreeStructure } from "react-icons/pi";

const Container = tw.div`relative px-10`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row md:justify-between max-w-screen-xl mx-auto py-20 md:py-20`}
`;
const Heading = tw(SectionHeading)`w-full mt-20`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col justify-between mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12`}
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

const Description = tw.p`mt-2 font-medium text-secondary-100 text-center leading-loose text-xl`;

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
      title: "UTMパラメータ生成",
      description: "生成ウェブトラフィックのソースを追跡するためのクエリパラメーターを生成できます。",
      primaryButtonText:"ツールへ",
      link: "/tools/create-param"
    },
    { 
      title: "見出し(hタグ)確認",
      description: "指定したサイトURLの文字数、 タイトル、見出しタグを確認できます。",
      primaryButtonText:"ツールへ",
      link: "/tools/title-tag"
    },
    { 
      title: "OGPタグ確認",
      description: "SNS上でWEBページのタイトル、 イメージ画像、 URL含めた詳細、 説明文などの情報を表示するためのタグを確認できます。" ,
      primaryButtonText:"ツールへ",
      link: "/tools"
    },
    { 
      title: "構造化データ生成",
      description: "JSON-LDマークアップの作成をサポートする Schema.org 構造化データを生成できます。" ,
      primaryButtonText:"ツールへ",
      link: "/tools"
     }
  ];

  return (
    <Container>
      <Heading><span tw="text-primary-500">Web Tools</span></Heading>
      <Description>業務で役に立つWEBツールをご提供しています。</Description>
      <ThreeColumnContainer>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
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
