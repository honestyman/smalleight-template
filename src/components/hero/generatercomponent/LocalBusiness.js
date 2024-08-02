import React, {useState, useEffect, useMemo} from "react";
import countryList from 'react-select-country-list';
import { RegionDropdown } from 'react-country-region-selector';
import { Select } from "antd";
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
const Button = tw.button`w-full flex justify-center items-center rounded-md text-white px-5 py-2 text-sm border border-primary-500 bg-primary-500 transition duration-300 hover:bg-white hover:text-black disabled:bg-gray-500 disabled:text-white disabled:border-gray-500`


export default () => {
  const options = useMemo(() => countryList().getData(), [])
  const [businessType, setBusinessType] = useState("");
  const [moreBusinessType, setMoreBusinessType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [idUrl, setIdUrl] = useState("");
  const [images, setImages] = useState([{ id: Date.now(), value: '' }]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("JP");
  const [region, setRegion] = useState("");
  const [hours, setHours] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [openChecked, setOpenCheckded] = useState(false)
  const [socialProfile, setSocialProfile] = useState([])

  const CustomSelect = tw.select`w-full mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
  const changeDays = (id, event) => {
    const newHours = hours.map(hour => {
      if (hour.id === id) {
        hour.days = event
      }
      return hour;
    });
    setHours(newHours);
  };
  const changeOpenHours = (id, event) => {
    const newHours = hours.map(hour => {
      if (hour.id === id) {
        hour.opens = event
      }
      return hour;
    });
    setHours(newHours);
  };
  const changeCloseHours = (id, event) => {
    const newHours = hours.map(hour => {
      if (hour.id === id) {
        hour.closes = event
      }
      return hour;
    });
    setHours(newHours);
  };

  const handleDeleteHours = (id) =>{
    setHours(hours.filter(hour => hour.id !== id));
  }

  const changeChecked = () => {
    if(openChecked) {
      setOpenCheckded(false)
    }else{
      setOpenCheckded(true)
    }
  }

  const addHours = () => {
    setHours([...hours, {id:Date.now(), days: [], opens:'', closes:'' }]);
  }
  const addDepartments = () => {
    
  }

  useEffect(()=>{
    console.log(hours)
  },[hours])

  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>Local Business</Heading>
            <Form>
              <div tw="w-full flex flex-wrap justify-between">
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>LocalBusiness @type</label>
                  <CustomSelect value={businessType} onChange={(e)=>setBusinessType(e.target.value)}>
                    <option>LocalBusiness</option>
                    <option>AnimalShelter</option>
                    <option>ArticleOganization</option>
                    <option>AutomotiveBusiness</option>
                    <option>ChildCare</option>
                    <option>Dentist</option>
                    <option>DryCleaningOrLaundry</option>
                    <option>EmergencyService</option>
                    <option>EmploymentAgency</option>
                    <option>EntertainmentBusiness</option>
                    <option>FinanicalService</option>
                    <option>FoodEstablishment</option>
                    <option>GovernmentOffice</option>
                    <option>HealthAndBeautyBusiness</option>
                    <option>HomeAndConstructionBusiness</option>
                    <option>InternetCafe</option>
                    <option>LegalService</option>
                    <option>Library</option>
                    <option>LodingBusiness</option>
                    <option>MedicalBusiness</option>
                    <option>ProfessinalService</option>
                    <option>RadioStation</option>
                    <option>RealEstateAgent</option>
                    <option>RecyclingCenter</option>
                    <option>SelfStorage</option>
                    <option>ShoppingCenter</option>
                    <option>StopActivityLocation</option>
                    <option>Store</option>
                    <option>TelevisionStation</option>
                    <option>TouristInformationCenter</option>
                    <option>TravelAgency</option>
                  </CustomSelect>
                </div>
                {
                  businessType == "StopActivityLocation" &&
                  <div tw="md:w-[45%] w-full flex flex-col items-start">
                    <label>LocalBusiness @type</label>
                    <CustomSelect value={moreBusinessType} onChange={(e)=>setMoreBusinessType(e.target.value)}>
                      <option>BowllingAlley</option>
                      <option>ExerciseGym</option>
                      <option>GolfCourse</option>
                      <option>PublicSwimmingPool</option>
                      <option>Skiresort</option>
                      <option>SportsClub</option>
                      <option>StadiumOrArena</option>
                      <option>TennisComplex</option>
                    </CustomSelect>
                  </div>
                }
                {
                  businessType != "StopActivityLocation" &&
                  <div tw="md:w-[45%] w-full flex flex-col items-start">
                    <label>LocalBusiness @type</label>
                    <CustomSelect value={moreBusinessType} disabled={businessType == "Store"?false:true} onChange={(e)=>setMoreBusinessType(e.target.value)}>
                      <option>BikeStore</option>
                      <option>BookStore</option>
                      <option>ClothingStore</option>
                      <option>ComputerStore</option>
                      <option>ConvenienceStore</option>
                      <option>DepartmentStore</option>
                      <option>ElectronicStore</option>
                      <option>Florist</option>
                      <option>FurnitureStore</option>
                      <option>GardenStore</option>
                      <option>GroceryStore</option>
                      <option>HardwareStore</option>
                      <option>HobbyStore</option>
                      <option>HomeGoodsStore</option>
                      <option>JewerlyStore</option>
                      <option>LiquorStore</option>
                      <option>MensClothingStore</option>
                      <option>MobilePhoneStore</option>
                      <option>MovieRentalStore</option>
                      <option>MusicStore</option>
                      <option>OfficeEquipmentStore</option>
                      <option>OutletStore</option>
                      <option>PawnShop</option>
                      <option>PetStore</option>
                      <option>ShopStore</option>
                      <option>SportingGoodsStore</option>
                      <option>TireShop</option>
                      <option>ToyStore</option>
                      <option>WholesaleStore</option>
                    </CustomSelect>
                  </div>
                }
              </div>         
              <div tw="w-full flex flex-wrap mt-5 items-center justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start mt-5">  
                  <label>Name</label>
                  <Input tw="w-full" type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start mt-5">  
                  <label>Image URL</label>
                  <Input tw="w-full" type="text" name="imageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start mt-5">  
                  <label>@id URL</label>
                  <Input tw="w-full" type="text" name="idUrl" value={idUrl} onChange={(e)=>setIdUrl(e.target.value)}/>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>URL</label>
                  <Input tw="w-full" type="text" name="url" placeholder="https://example.com" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Phone</label>
                  <Input tw="w-full" type="text" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Price Range</label>
                  <Input tw="w-full" type="text" name="priceRange" value={priceRange} onChange={(e)=>setPriceRange(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Street</label>
                  <Input tw="w-full" type="text" name="street" value={street} onChange={(e)=>setStreet(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>City</label>
                  <Input tw="w-full" type="text" name="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Zip Code</label>
                  <Input tw="w-full" type="number" name="zipCode" value={zipCode} onChange={(e)=>setZipCode(e.target.value)}/>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Country</label>
                  <CustomSelect value={country} onChange={(e)=>setCountry(e.target.value)}>
                    {
                      options && options.map((country, index)=>{
                        return(
                          <option key={index} value={country.value} tw="w-full">   
                            {country.label}
                          </option>
                        )
                      })
                    }
                  </CustomSelect>
                </div>
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                <label>State/Provice/Region</label>
                  <RegionDropdown
                    tw="w-full mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500"
                    country={
                      (options.filter((option)=>option.value==country))[0].label
                    }
                    defaultOptionLabel=""
                    value={region}
                    onChange={(val) => setRegion(val)} />
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between items-end">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <Button onClick={addHours} disabled={openChecked?true:false}><IoIosAdd tw="mr-2"/> ADD OPENING HOURS</Button>
                </div>
                <div tw="flex items-center mb-4">
                  <input onChange={changeChecked} id="default-checkbox" type="checkbox" value="" tw="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="default-checkbox" tw="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Open 24/7</label>
                </div>
                <div tw="md:w-[40%] w-full flex flex-col items-start">
                  <label>Social profiles</label>
                  <Select
                    tw="w-full mt-2"
                    mode="multiple"
                    options = {
                     [
                      {label:"Facebook", value:"Facebook"},
                      {label:"Twitter", value:"Twitter"},
                      {label:"Instagram", value:"Instagram"},
                      {label:"YouTube", value:"YouTube"},
                      {label:"Linkedin", value:"Linkedin"},
                      {label:"Pinterest", value:"Pinterest"},
                      {label:"SoundCloud", value:"SoundCloud"},
                      {label:"Thumblr", value:"Thumblr"},
                      {label:"Wikipedia", value:"Wikipedia"},
                      {label:"Github", value:"Github"},
                      {label:"Website", value:"Website"},
                     ] 
                    }
                    value = {socialProfile}
                    onChange={(value) => {
                      setSocialProfile(value)
                    }}
                  />
                </div>
              </div>
              {
                hours.length != 0 && hours.map((hour, index)=>{
                  return(
                    <div key={index} tw="w-full flex flex-wrap mt-5 justify-between items-center">
                      <div tw="md:w-[30%] w-full flex flex-col items-start">
                      <label>Day(s) of the week</label>
                        <Select
                          tw="w-full mt-2"
                          mode="multiple"
                          options = {
                          [
                            {label:"Monday", value:"Monday"},
                            {label:"Tuesday", value:"Tuesday"},
                            {label:"Wednesday", value:"Wednesday"},
                            {label:"Thursday", value:"Thursday"},
                            {label:"Friday", value:"Friday"},
                            {label:"Saturday", value:"Saturday"},
                            {label:"Sunday", value:"Sunday"}
                          ] 
                          }
                          onChange={(value) => {
                            changeDays(hour.id, value)
                          }}
                        />
                      </div>
                      <div tw="md:w-[25%] w-full flex flex-col items-start">
                        <label>Opens at (e.g. 08:00)</label>
                        <Input tw="w-full" type="time" name="opens" onChange={(e)=>changeOpenHours(hour.id, e.target.value)}/>
                      </div>
                      <div tw="md:w-[25%] w-full flex flex-col items-start">
                        <label>Close at (e.g. 21:00)</label>
                        <Input tw="w-full" type="time" name="close" onChange={(e)=>changeCloseHours(hour.id, e.target.value)}/>
                      </div>
                      <a href="" tw="text-[24px] text-black" 
                        onClick={(e)=>{
                          e.preventDefault(); 
                          handleDeleteHours(hour.id);
                        }}
                      ><AiTwotoneDelete /></a>
                    </div>
                  );
                })
              }
              {
                
              }
              {/* <div tw="w-full flex flex-wrap mt-5 justify-between items-end">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <Button onClick={addDepartments}><IoIosAdd tw="mr-2"/> ADD DEPARTMENT</Button>
                </div>
              </div> */}
              
            </Form>
          </LeftColumn>
          <RightColumn>
            <ResultContent>
              <span>{'<script type="application/ld+json">'}</span>
              <span>{'{'}</span>
                <span tw="ml-5">{'"@context": "https://schema.org",'}</span>
                <span tw="ml-5">{`"@type": "${(moreBusinessType!="" && (businessType =="StopActivityLocation" ||businessType == "Store"))?moreBusinessType:businessType}",`}</span>
                <span tw="ml-5">{`"name": "${name}",`}</span>
                <span tw="ml-5">{`"image": "${imageUrl}",`}</span>
                <span tw="ml-5">{`"@id": "${idUrl}",`}</span>
                <span tw="ml-5">{`"url": "${url}",`}</span>
                <span tw="ml-5">{`"telephone": "${phone}",`}</span>
                {
                  url !='' && <span tw="ml-5">{`"priceRance": "${priceRange}",`}</span>
                }
                {/* {
                  (images.length == 1) && <span tw="ml-5">{`"image": "${images[0].value}",`}</span>
                }
                {
                  (images.length > 1) && <div tw="flex flex-col ml-5">
                    <span>{'"image": ['}</span>
                    {
                      images.map((image, index)=>{ 
                        return(
                          <span tw="ml-5">{`"${image.value}",`}</span>
                        )
                      })
                    }
                    <span>{`],`}</span>
                  </div>   
                } */}
                <span tw="ml-5">{'"address": {'}</span>
                  <div tw="flex flex-col ml-5">
                    <span tw="ml-5">{`"@type": "PostalAddress",`}</span>
                    <span tw="ml-5">{`"streetAddress": "${street}",`}</span>
                    <span tw="ml-5">{`"addressLocality": "${city}",`}</span>
                    {
                      region != "" && <span tw="ml-5">{`"addressRegion": "${region}",`}</span>
                    }
                    <span tw="ml-5">{`"postalCode": "${zipCode}",`}</span>
                    <span tw="ml-5">{`"addressCountry": "${country}",`}</span>
                  </div>   
                <span tw="ml-5">{'},'}</span>
                {/* <span tw="ml-5">{'"publisher": {'}</span>
                  <div tw="flex flex-col ml-5">
                    <span tw="ml-5">{'"@type": "Organization",'}</span>
                    <span tw="ml-5">{`"name": "${publisher}",`}</span>
                    <div tw="flex flex-col ml-5">
                      <span>{'"logo": {'}</span>
                        <span tw="ml-5">{'"@type": "ImageObject",'}</span>
                        <span tw="ml-5">{`"url": "${publisherUrl}",`}</span>
                      <span>{'}'}</span>
                    </div>
                  </div> 
                <span tw="ml-5">{`"datePublished": "${publishDate}",`}</span>
                {
                  modifyDate && <span tw="ml-5">{`"dateModified": "${modifyDate}"`}</span>
                }
                <span tw="ml-5">{'},'}</span> */}
                
              <span>{'}'}</span>
              <span>{'<script>'}</span>
            </ResultContent>
          </RightColumn>
        </TwoColumn>
      </Container>
    </>
  );
};
