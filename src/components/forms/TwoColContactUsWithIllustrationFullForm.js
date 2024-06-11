import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import { postQuery } from "../../redux/slice/clientSlice";

const Container = tw.div`relative px-10`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-primary-500 text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.div`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Label = tw.label`text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
const Input = tw.input`mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Select = tw.select`mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Required= tw.span`bg-primary-500 text-sm text-white rounded px-1 mx-1`
const Valid = tw.p`text-red-500 mb-5`;

const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButton)`inline-block mt-8`

export default ({
  heading = <>お問い合わせ</>
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [clientName, setClientName] = useState("");
  const [clientCompanyName, setClientCompanyName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [queryKind, setQueryKind] = useState("WEBツールについて");
  const [questionContent, setQuestionContent] = useState("");

  const [validQueryKind, setValidQueryKind] = useState("");
  const [validCompanyName, setValidCompanyName] = useState("");
  const [validClientName, setValidClientName] = useState("");
  const [validClientEmail, setValidClientEmail] = useState("");
  const [validQuestionContent, setValidQuestionContent] = useState("");

const clickQueryHandler = async () => {
  var flag=true;
  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  if(queryKind == ""){
    setValidQueryKind("※この項目は必須入力項目です。");
    flag=false;
  }else{
    setValidQueryKind("");
  }
  if(clientCompanyName == ""){
    setValidCompanyName("※この項目は必須入力項目です。");
    flag=false;
  }else{
    setValidCompanyName("");
  }
  if(clientName == ""){
    setValidClientName("※この項目は必須入力項目です。");
    flag=false;
  }else{
    setValidClientName("");
  }
  if(clientEmail == ""){
    setValidClientEmail("※この項目は必須入力項目です。");
    flag=false;
  }else{
    if(!emailRegex.test(clientEmail)){
      setValidClientEmail("正確なメール形式ではありません。")
      flag=false;
    }
    if(clientEmail.includes("gmail.com") || clientEmail.includes("yahoo")){
      setValidClientEmail("ビジネス用のメールアドレスをご入力ください。")
    }
    else{
      setValidClientEmail("");
    }
  }
  if(questionContent == ""){
    setValidQuestionContent("※この項目は必須入力項目です。")
    flag=false;
  }else{
    setValidQuestionContent("");
  }

  if(flag == true){
    const payload={
      kind:queryKind,
      name:clientName,
      companyName:clientCompanyName,
      email:clientEmail,
      questionContent:questionContent
    }
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        apikey: "0cd49013-33db-494a-ae35-78574c3af2be",
        subject: "SmallEight",
        Content: 
          `- お問い合わせ種類:\n
            ${queryKind}\n 
              - 会社名: \n
            ${clientCompanyName}\n
            - お名前: \n
            ${clientName}\n
            - メールアドレス: \n
            ${clientEmail}\n
            - 問い合わせ内容: \n
            ${questionContent}`
      }),
    })

    if(res.status == 200){
      dispatch(postQuery(payload)).then(()=>{
        navigate("/inquerythanks");
      });
    }
  }
  }

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn>
          <TextContent>
            <Heading>{heading}</Heading>
            <Form>
              <Label>お問い合わせ種類<Required>必須</Required></Label>
              <Select name="kind" value={queryKind} onChange={(e) => setQueryKind(e.target.value)}>
                <option value="Mitsukeについて">WEBツールについて</option>
                <option value="Small Eightについて">広告運用サポートについて</option>
                <option value="Small Eightについて">インハウス立ち上げ支援について</option>
                <option value="その他">コンバージョン率最適化について</option>
                <option value="その他">SEO/SEOツール導入支援について</option>
                <option value="その他">LP・サイト制作支援について</option>
                <option value="その他">その他</option>
              </Select>
              <Valid>{validQueryKind !="" && validQueryKind}</Valid>
              <Label>会社名<Required>必須</Required></Label>
              <Input type="text" name="company" placeholder="株式会社○○" value={clientCompanyName} onChange={(e) => setClientCompanyName(e.target.value)}/>
              <Valid>{validCompanyName !="" && validCompanyName}</Valid>
              <Label>お名前<Required>必須</Required></Label>
              <Input type="text" name="subject" placeholder="田中 太郎" value={clientName} onChange={(e) => setClientName(e.target.value)}/>
              <Valid>{validClientName !="" && validClientName}</Valid>
              <Label>メールアドレス<Required>必須</Required></Label>
              <Input type="email" name="subject" placeholder="ビジネス用メールアドレスを入力ください。" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)}/>
              <Valid>{validClientEmail !="" && validClientEmail}</Valid>
              <Label>問い合わせ内容<Required>必須</Required></Label>
              <Textarea maxLength={1000} name="contents" placeholder="恐れ入りますが、 お問い合わせにご対応しかねる場合がございます。 あらかじめご了承ください。" value={questionContent} onChange={(e) => setQuestionContent(e.target.value)}/>
              <Valid>{validQuestionContent !="" && validQuestionContent}</Valid>
              <SubmitButton onClick={clickQueryHandler}>お問い合わせ</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
