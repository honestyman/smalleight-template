import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { SectionHeading } from "components/misc/Headings";
import { Link } from "react-router-dom";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-10`;
const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;
const LinkText = tw.span`text-primary-500`;


export default ({ headingText = "Privacy Policy" }) => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Text>
            <p>
            SmallEightは、本ウェブサイト上で提供するサービス（以下「本サービス」といいます。）におけるユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシーを定めます。
            </p>

            <h2>個人情報</h2>
            <p>
            「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名、会社名、電話番号、メールアドレス、その他の記述等により特定の個人を識別できる情報及びデータなどの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
            </p>

            <h2>個人情報の収集方法</h2>
            <p>ユーザーが利用登録をする際に氏名、会社名、電話番号、メールアドレスなどの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を提携先（情報提供元、広告主、広告配信先などを含みます。以下｢提携先｣といいます。）などから収集することがあります。</p>

            <h2>個人情報を収集・利用する目的</h2>
            <p>
               本ウェブサイトが個人情報を収集・利用する目的は以下のとおりです。
            </p>
            <ul>
              <li>
                <p>
                本サービスの提供・運営のため
                </p>
              </li>
              <li>
                <p>
                ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
                </p>
              </li>
              <li>
                <p>
                ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため
                </p>
              </li>
              <li>
                <p>
                メンテナンス、重要なお知らせなど必要に応じたご連絡のため
                </p>
              </li>
              <li>
                <p>
                利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をしご利用をお断りするため
                </p>
              </li>
              <li>
                <p>
                上記の利用目的に付随する目的
                </p>
              </li>
              
            </ul>

            <h2>利用目的の変更</h2>
            <p>
            本サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
            </p>
            <p>
            利用目的の変更を行った場合には、変更後の目的について所定の方法によりユーザーに通知し、または本ウェブサイト上に公表するものとします。
            </p>

            <h2>プライバシーポリシーの変更</h2>
            <p>
            本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
            </p>
            <p>
            別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
            </p>

            <h2>免責事項</h2>
            {/* <h3>Business Transactions</h3> */}
            <p>
            本ウェブサイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
            </p>
            <p>
            また本ウェブサイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
            </p>
            <p>
            また本ウェブサイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
            </p>

            <h2>広告について</h2>
            <p>
            本ウェブサイトでは、第三者配信の広告サービスを利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
            </p>
            <p>
            Cookieを無効にする方法やGoogleアドセンスに関する詳細は<Link to={"/"}><LinkText>「広告 – ポリシーと規約 – Google」</LinkText></Link>をご確認ください。
            </p>
            <h2>アクセス解析ツールについて</h2>
            <p>
            当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
            </p>

            <br/>
            <p>
            制定日：令和6年04月01日
            </p>
          </Text>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
