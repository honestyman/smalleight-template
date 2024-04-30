import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";

import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full text-primary-500`;
const Description = tw(SectionDescription)`w-full text-left`;

const VerticalSpacer = tw.div`mt-10 w-full`

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;
const Business = tw.div`w-full flex justify-center items-center py-10 md:w-1/2 lg:w-full`;
const BusinessTextDiv = tw.div`sm:ml-4 text-center mt-4 sm:mt-2`;
const BusinessTitle = tw.span`mt-4 tracking-wide font-bold text-2xl leading-none`;
const BusinessDescription = tw.p`mt-1 sm:mt-4 text-left font-medium text-secondary-100 leading-loose`;

const description1="SmallEightは「日々の積み重ね」 が興す可能性を信じています。";
const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 text-center mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default ({ cards = null, heading = "小さいことの積み重ね。 末広がる。", subheading = "", description = "重要なことは 「日々の積み重ね」。地道に重ねる行動こそ 「大きな力」になると考えます。" }) => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component) or you can directly pass this using the cards prop:
   *  1) title - the title of the card
   *  2) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const defaultCards = [
    {
      title: "Secure",
      description: "We strictly only deal with vendors that provide top notch security."
    },
    { 
      title: "24/7 Support",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
    { 
      title: "Reliable",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
    { 
      title: "Easy",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
    { 
      title: "Customizable",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
    { 
      title: "Fast",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container>
      <ThreeColumnContainer>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        {description1 && <Description>{description1}</Description>}
        <VerticalSpacer />
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."}
                </p>
              </span>
            </Card>
          </Column>
        ))}
        <Business>
        <BusinessTextDiv>
          <BusinessTitle>事業内容</BusinessTitle>
          <BusinessDescription>
          ・ ビジネスマッチングサービスの運営
          </BusinessDescription>
          <BusinessDescription>
          ・ WEB広告運用をはじめとしたプロモーション業務
          </BusinessDescription>
          <BusinessDescription>
          ・ WEB解析・リサーチ業務
          </BusinessDescription>
          <BusinessDescription>
          ・ WEBサイトおよびシステムの制作・開発
          </BusinessDescription>
        </BusinessTextDiv>
        </Business>

      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
