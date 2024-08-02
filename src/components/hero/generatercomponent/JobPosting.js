import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import timezones from 'timezones-list';
import countryList from 'react-select-country-list';
import CurrencyList from 'currency-list'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";

//eslint-disable-next-line
import { css } from "styled-components/macro";

const Container = tw.div`relative w-full`;
const TwoColumn = tw.div`w-full flex flex-col lg:flex-row max-w-screen-xl mx-auto pb-10`;
const LeftColumn = tw.div`relative lg:w-7/12 text-center mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative lg:w-5/12 lg:mt-0 flex-1 flex flex-col`;
const Title = tw.p`text-2xl font-bold`;

const Heading = tw.h1`font-bold text-2xl md:text-3xl flex items-center lg:text-3xl xl:text-3xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 md:text-[12px] text-sm lg:text-[12px]`;

const ResultContent = tw.div`h-full flex flex-col justify-center items-start md:pl-24 pl-0 pt-10`;

// Random Decorator Blobs (shapes that you see in background)

const Form = tw.div`w-full mt-8 md:mt-10 text-sm flex flex-col mx-auto md:mx-0 bg-white`
const Label = tw.label`text-left text-sm md:text-[12px] lg:text-[12px] font-medium leading-relaxed text-secondary-100`
const Input = tw.input`mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const ResultLabel = tw.label`md:text-left md:text-4xl font-medium leading-relaxed text-center`
const Button = tw.button`w-full flex justify-center items-center rounded-md text-white px-5 py-2 text-sm border border-primary-500 bg-primary-500 transition duration-300 hover:bg-white hover:text-black`
const Select = tw.select`w-full mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`

export default () => {
  const options = useMemo(() => countryList().getData(), [])
  const [tickets, setTickets] = useState([]);
  const [currencyLists, setCurrencyLists] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [companyUrl, setCompanyUrl] = useState("");
  const [title, setTitle] = useState("");
  const [identifer, setIdentifer] = useState("");
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const [industry, setIndustry] = useState("");
  const [employment, setEmployment] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] =  useState("");
  const [postedDate, setPostedDate] =  useState("");
  const [expireDate, setExpireDate] =  useState("");
  const [remoteJob, setRemoteJob] =  useState(false);
  const [minSalary, setMinSalary] =  useState("");
  const [maxSalary, setMaxSalary] =  useState("");
  const [per, setPer] =  useState("");
  const [street, setStreet] =  useState("");
  const [city, setCity] =  useState("");
  const [country, setCountry] = useState("JP");
  const [region, setRegion] = useState("");
  const [responsabilities, setResponsabilities] =  useState("");
  const [skill, setSkill] =  useState("");
  const [qualifications, setQualifications] =  useState("");
  const [currency, setCurrency] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(()=>{
    var obj = CurrencyList.getAll('en');
    setCurrencyLists(Object.keys(obj).map(key => obj[key]));
  },[CurrencyList])
  
  const changeChecked = () => {
    if(remoteJob) {
      setRemoteJob(false)
    }else{
      setRemoteJob(true)
    }
  }

  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>Job Posting</Heading>
            <Form>
              <div tw="w-full flex flex-wrap justify-between">
                <div tw="md:w-[60%] w-full flex flex-col items-start">
                  <label>Job's title</label>
                  <Input tw="w-full" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div tw="md:w-[35%] w-full flex flex-col items-start">
                  <label>Identifer</label>
                  <Input tw="w-full" type="text" value={identifer} onChange={(e)=>setIdentifer(e.target.value)}/>
                </div>
              </div>

              <div tw="w-full flex justify-between mt-5">
                <div tw="w-full flex flex-col items-start">
                  <label>Job's description (in HTML)</label>
                  <Input tw="w-full" type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Company</label>
                  <Input tw="w-full" type="text" name="company" value={company} onChange={(e)=>setCompany(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Company URL</label>
                  <Input tw="w-full" type="text" name="companyUrl" value={companyUrl} onChange={(e)=>setCompanyUrl(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Company logo</label>
                  <Input tw="w-full" type="text" name="authorUrl" value={logo} onChange={(e)=>setLogo(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Industry</label>
                  <Input tw="w-full" type="text" name="industry" value={industry} onChange={(e)=>setIndustry(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Employment type</label>
                  <Select value={employment} onChange={(e)=>setEmployment(e.target.value)}>
                    <option value="FULL_TIME">Full time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACTOR">Contractor</option>
                    <option value="TEMPORARY">Temporary</option>
                    <option value="INTERN">Intern</option>
                    <option value="VOLUNTEER">Volunteer</option>
                    <option value="PER_DIEM">Per diem</option>
                    <option value="OTHER">Other</option>
                  </Select>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Work hours (e.g. 8am-5pm, shift)</label>
                  <Input tw="w-full" type="time" name="hours" value={hours} onChange={(e)=>setHours(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[40%] w-full flex flex-col items-start">
                  <label>Date posted</label>
                  <Input tw="w-full" type="date" name="industry" value={postedDate} onChange={(e)=>setPostedDate(e.target.value)}/>
                </div>
                <div tw="md:w-[40%] w-full flex flex-col items-start">
                  <label>Expire date </label>
                  <Input tw="w-full" type="date" name="hours" value={expireDate} onChange={(e)=>setExpireDate(e.target.value)}/>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="flex items-center mb-4">
                  <input onChange={changeChecked} id="default-checkbox" type="checkbox" value="" tw="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-checkbox" tw="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remote Job</label>
                </div>
                <div tw="md:w-[35%] w-full flex flex-col items-start">
                  <label>Country</label>
                  <Select value={country} onChange={(e)=>setCountry(e.target.value)}>
                    {
                      options && options.map((country, index)=>{
                        return(
                          <option key={index} value={country.value} tw="w-full">   
                            {country.label}
                          </option>
                        )
                      })
                    }
                  </Select>
                </div>
                <div tw="md:w-[35%] w-full flex flex-col items-start">
                  <label>State/Provice/Region</label>
                  <RegionDropdown
                    tw="w-full mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500"
                    country={
                      (options.filter((option)=>option.value==country))[0].label
                    }
                    defaultOptionLabel=""
                    value={region}
                    disabled={remoteJob?true:false}
                    onChange={(val) => setRegion(val)} />
                    
                </div>
              </div>
              
              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[40%] w-full flex flex-col items-start">
                  <label>Street</label>
                  <Input tw="w-full" type="text" name="street" value={street} onChange={(e)=>setStreet(e.target.value)} disabled={remoteJob?true:false}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>City</label>
                  <Input tw="w-full" type="text" name="city" value={city} onChange={(e)=>setCity(e.target.value)} disabled={remoteJob?true:false}/>
                </div>
                <div tw="md:w-[20%] w-full flex flex-col items-start">
                  <label>Zip Code</label>
                  <Input tw="w-full" type="number" name="zipcode" value={zipcode} onChange={(e)=>setZipcode(e.target.value)} disabled={remoteJob?true:false}/>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between items-center">
                <div tw="md:w-[20%] w-full flex flex-col items-start">
                  <label>Salary (or min. salary)</label>
                  <Input tw="w-full" type="number" name="minSalary" value={minSalary} onChange={(e)=>setMinSalary(e.target.value)}/>
                </div>
                <div tw="md:w-[20%] w-full flex flex-col items-start">
                  <label>Max. salary</label>
                  <Input tw="w-full" type="number" name="maxSalary" value={maxSalary} onChange={(e)=>setMaxSalary(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Currency</label>
                  <Select value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                    {
                      currencyLists && currencyLists.map((item, index)=>{
                        return(
                          <option key={index} value={item.code}>{`${item.name}(${item.symbol}) ${item.code}`}</option>
                        );
                      })
                    }
                  </Select>
                </div>
                <div tw="md:w-[20%] w-full flex flex-col items-start">
                  <label>Per...</label>
                  <Select value={per} onChange={(e)=>setPer(e.target.value)}>
                    <option value="HOUR">Hour</option>
                    <option value="WEEK">Week</option>
                    <option value="MONTH">Month</option>
                    <option value="YEAR">Year</option>
                  </Select>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Responsabilities</label>
                  <Input tw="w-full" type="text" name="responsabilities" value={responsabilities} onChange={(e)=>setResponsabilities(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Skills</label>
                  <Input tw="w-full" type="text" name="skills" value={skill} onChange={(e)=>setSkill(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Qualifications</label>
                  <Input tw="w-full" type="text" name="zipcode" value={qualifications} onChange={(e)=>setQualifications(e.target.value)}/>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Education Requirements</label>
                  <Input tw="w-full" type="text" name="education" value={education} onChange={(e)=>setEducation(e.target.value)}/>
                </div>
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Experience Requirements</label>
                  <Input tw="w-full" type="text" name="experience" value={experience} onChange={(e)=>setExperience(e.target.value)}/>
                </div>
              </div>

              
            </Form>
          </LeftColumn>
          <RightColumn>
            <ResultContent>
              <span>{'<script type="application/ld+json">'}</span>
              <span>{'{'}</span>
                <span tw="ml-5">{'"@context": "https://schema.org",'}</span>
                <span tw="ml-5">{`"@type": "JobPosting",`}</span>
                <span tw="ml-5">{`"title": "${title}",`}</span>
                <span tw="ml-5">{`"description": "${description}",`}</span> 
                {
                  identifer != "" && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"identifier": {`}</span> 
                    <span tw="ml-5">{`"@type": "PropertyValue",`}</span> 
                    <span tw="ml-5">{`"name": "${company}",`}</span> 
                    <span tw="ml-5">{`"value": "${identifer}",`}</span> 
                    <span>{`},`}</span>
                  </div>
                }
                <div tw="flex flex-col ml-5">
                  <span>{`"hiringOrganization" : {`}</span> 
                  <span tw="ml-5">{`"@type": "Organization",`}</span> 
                  <span tw="ml-5">{`"name": "${company}",`}</span> 
                  { companyUrl && <span tw="ml-5">{`"sameAs": "${companyUrl}",`}</span> } 
                  { logo && <span tw="ml-5">{`"logo": "${logo}",`}</span> } 
                </div>
                {
                  industry != "" && <span tw="ml-5">{`"industry": "${industry}",`}</span>
                }
                {
                  employment != "" && <span tw="ml-5">{`"employmentType": "${employment}",`}</span>
                }
                {
                  hours != "" && <span tw="ml-5">{`"workHours": "${hours}",`}</span>
                }
                <span tw="ml-5">{`"datePosted": "${postedDate}",`}</span>
                {
                  expireDate != "" && <span tw="ml-5">{`"validThrough": "${expireDate}",`}</span> 
                }
                {
                  remoteJob && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"applicantLocationRequirements": {`}</span> 
                    <span tw="ml-5">{`"@type": "Country",`}</span> 
                    <span tw="ml-5">{`"name": "${country}",`}</span> 
                    <span>{`},`}</span>
                    <span>{`"jobLocationType": "TELECOMMUTE",`}</span>
                  </div>
                }
                {
                  !remoteJob && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"jobLocation": {`}</span> 
                    <span tw="ml-5">{`"@type": "Place",`}</span>
                    <div tw="flex flex-col ml-5">
                      <span>{`"address": {`}</span>
                        <span tw="ml-5">{`"@type": "PostalAddress",`}</span>
                        <span tw="ml-5">{`"streetAddress": "${street}",`}</span>
                        <span tw="ml-5">{`"addressLocality": "${city}",`}</span>
                        <span tw="ml-5">{`"addressRegion": "${region}",`}</span>
                        <span tw="ml-5">{`"postalCode": "${zipcode}",`}</span>
                        <span tw="ml-5">{`"addressCountry": "${country}",`}</span> 
                      <span>{`}`}</span>
                    </div> 
                    <span>{`},`}</span>
                  </div>
                }
                {
                  minSalary != "" &&
                  <div tw="flex flex-col ml-5">
                    <span>{`"baseSalary": {`}</span> 
                    <span tw="ml-5">{`"@type": "MonetaryAmount",`}</span>
                    <span tw="ml-5">{`"currency": "${currency}",`}</span>
                    <div tw="flex flex-col ml-5">
                      <span>{`"value": {`}</span>
                        <span tw="ml-5">{`"@type": "QuantitativeValue",`}</span>
                        <span tw="ml-5">{`"minValue": "${minSalary}",`}</span>
                        <span tw="ml-5">{`"maxValue": "${maxSalary}",`}</span>
                        <span tw="ml-5">{`"unitText": "${per}",`}</span> 
                      <span>{`}`}</span>
                    </div> 
                    <span>{`},`}</span>
                  </div> 
                }
                {
                  responsabilities != "" && <span tw="ml-5">{`"responsibilities": "${responsabilities}",`}</span>
                }
                {
                  skill != "" && <span tw="ml-5">{`"skills": "${skill}",`}</span>
                }
                {
                  qualifications != "" && <span tw="ml-5">{`"qualifications": "${qualifications}",`}</span>
                }
                {
                  education != "" && <span tw="ml-5">{`"educationRequirements": "${education}",`}</span>
                }
                {
                  experience != "" && <span tw="ml-5">{`"experienceRequirements": "${experience}"`}</span>
                }
                
              <span>{'}'}</span>
              <span>{'<script>'}</span>
            </ResultContent>
          </RightColumn>
        </TwoColumn>
      </Container>
    </>
  );
};
