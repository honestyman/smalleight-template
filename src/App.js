import React from "react";
import GlobalStyles from 'styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line

import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import ThankYouPage from "ThankYouPage.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgencyLandingPage from "demos/AgencyLandingPage";
import EventLandingPage from "demos/EventLandingPage";
import ColumnPage from "pages/ColumnPage";
import PrivacyPolicy from "pages/PrivacyPolicy";
import TermsOfService from "pages/TermsOfService";
import SummaryPage from "pages/SummaryPage";
import ContactUs from "pages/ContactUs";
import ColumnDetailPage from "pages/ColumnDetailPage";
import QueryThankYouPage from "pages/QueryThankYouPage";
import WebTool from "pages/WebTool";
import CreateParameter from "pages/CreateParameter";
import Login from "admin/Login";
import Manage from "admin/Manage";
import ClientManage from "admin/admincomponent/clientmange/ClientManage";
import ClientDetail from "admin/admincomponent/clientmange/ClientDetail";
import CompanyManage from "admin/admincomponent/comanymanage/CompanyManage";
import CompanyAddPage from "admin/admincomponent/comanymanage/CompanyAddPage";
import CompanyUpdatePage from "admin/admincomponent/comanymanage/CompanyUpdatePage";
import CompanyDetail from "admin/admincomponent/comanymanage/CompanyDetail";
import ColumnManage from "admin/admincomponent/columnmanage/ColumnManage";
import ColumnAddPage from "admin/admincomponent/columnmanage/ColumnAddPage";
import ColumnManageDetail from "admin/admincomponent/columnmanage/ColumnManageDetail";
import ColumnUpdatePage from "admin/admincomponent/columnmanage/ColumnUpdatePage";
import TitleTag from "pages/TitleTag";
import OgpTag from "pages/OgpTag";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;


  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/components/:type/:subtype/:name" element={<ComponentRenderer />} />
          <Route path="/components/:type/:name" element={<ComponentRenderer />} />
          <Route path="/inquerythanks" element={<QueryThankYouPage />} />
          <Route path="/" element={<AgencyLandingPage />} /> 
          <Route path="/service" element={<AgencyLandingPage />} /> 
          <Route path="/tools" element={<WebTool />} /> 
          <Route path="tools/create-param" element={<CreateParameter />} /> 
          <Route path="tools/title-tag" element={<TitleTag />} /> 
          <Route path="tools/ogp-tag" element={<OgpTag />} /> 
          {/* <Route path="/column" element={<ColumnPage />} /> 
          <Route path='/columndetail/:id' element={<ColumnDetailPage/>}/> */}
          <Route path="/summary" element={<SummaryPage />} /> 
          <Route path="/privacy" element={<PrivacyPolicy />} /> 
          <Route path="/terms" element={<TermsOfService />} /> 
          <Route path="/contact" element={<ContactUs />} /> 

          <Route path='/admin' element={<Login/>}/>
          <Route path='/manage' element={<Manage/>}>
            <Route index element={<ClientManage/>}/>
            <Route path='client_detail/:id' element={<ClientDetail/>}/>
            <Route path='companymanage' element={<CompanyManage/>}/>
            <Route path='companymanage/company_add' element={<CompanyAddPage/>}/>
            <Route path='companymanage/company_detail/:id' element={<CompanyDetail/>}/>
            <Route path='companymanage/company_update/:id' element={<CompanyUpdatePage/>}/>
            <Route path='columnmanage' element={<ColumnManage/>}/>
            <Route path='columnmanage/column_add' element={<ColumnAddPage/>}/>
            <Route path='columnmanage/column_detail/:id' element={<ColumnManageDetail/>}/>
            <Route path='columnmanage/column_update/:id' element={<ColumnUpdatePage/>}/>

          </Route>

          {/* <Route path="/tools" element={<PrivacyPolicy />} />  */}
        </Routes>
      </Router>
    </>
  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
