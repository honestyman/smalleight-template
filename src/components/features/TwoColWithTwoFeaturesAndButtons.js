import React, {useEffect, useRef, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import TeamIllustrationSrc from "../../images/bee.png";

import 'animate.css';

const Container = tw.div`w-full relative bg-white`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left sm:text-4xl lg:text-[36px] text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-[14px] font-medium leading-loose text-secondary-100`;

const Features = tw.div`mt-8 max-w-sm mx-auto md:mx-0`;
const Feature = tw.div`mt-8 flex items-start flex-col md:flex-row`;

const FeatureIconContainer = styled.div`
  ${tw`mx-auto inline-block border border-primary-500 text-center rounded-full p-2 flex-shrink-0`}
  svg {
    ${tw`w-5 h-5 text-primary-500`}
  }
`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;

export default ({
  subheading = "What is SmallEight？",
  heading = (
    <>
      <p tw="text-primary-500">SmallEight</p>
      <p>→小さい八</p>
      <p>→小さなことから末広がり。</p>
    </>
  ),
  description = "小さいことを積み重ねる事が、とんでもないところへ行くただひとつの道だと思っています。」これは、イチロー選手がメジャーリーグの年間安打記録を破ったときの記者会見で話された言葉です。地道に重ねる行動こそ「大きな力」に。SmallEightは地道な支援で末広がるサービスを提供していきたいと考えています。「SmallEight」→「スモール８」→「スモハチ」と覚えていただけると嬉しいです。",
  primaryButtonText = "Summaryページへ",
  primaryButtonUrl = "/summary",
  features = null,
  textOnLeft = true
}) => {

  const ref = useRef(null);

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('wow', 'animate__animated', 'animate__shakeY');
        } else {
          entry.target.classList.remove('wow', 'animate__animated', 'animate__shakeY');
        }
      });
    });
    observer.observe(ref.current);

    const interval = setInterval(() => {
      const element = ref.current;
      if (element) {
        element.classList.add('wow', 'animate__animated', 'animate__shakeY');
        setTimeout(() => {
          element.classList.remove('wow', 'animate__animated', 'animate__shakeY');
        }, 1000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <TwoColumn>
        <ImageColumn ref={ref}>
          <Image imageSrc={TeamIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <PrimaryButton as="a" href={primaryButtonUrl}>
              {primaryButtonText}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
