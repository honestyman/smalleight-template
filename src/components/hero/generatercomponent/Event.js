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
  
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState([{ id: Date.now(), value: '' }]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] =  useState("Scheduled");
  const [attendance, setAttendance] =  useState("Online");
  const [streamUrl, setStreamUrl] =  useState("");
  const [performer, setPerformer] =  useState("Person");
  const [timezoneValue, setTimeZoneValue] =  useState("");
  const [place, setPlace] =  useState("");
  const [street, setStreet] =  useState("");
  const [city, setCity] =  useState("");
  const [country, setCountry] = useState("JP");
  const [region, setRegion] = useState("");
  const [performerName, setPerformerName] =  useState("");
  const [currency, setCurrency] = useState("");
  const [zipcode, setZipcode] = useState("");

  useEffect(()=>{
    var obj = CurrencyList.getAll('en');
    setCurrencyLists(Object.keys(obj).map(key => obj[key]));
  },[CurrencyList])
  
  const handleTicketNameChange = (id, event) => {
    const newTickets = tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, ticketName: event} ;
      }
      return ticket;
    });
    setTickets(newTickets);
  };
  const handlePriceChange = (id, event) => {
    const newTickets = tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, price: event.toString()} ;
      }
      return ticket;
    });
    setTickets(newTickets);
  };
  const handleDateChange = (id, event) => {
    const newTickets = tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, date: event} ;
      }
      return ticket;
    });
    setTickets(newTickets);
  };
  const handleUrlChange = (id, event) => {
    const newTickets = tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, url: event} ;
      }
      return ticket;
    });
    setTickets(newTickets);
  };
  const handleAvailabilityChange = (id, event) => {
    const newTickets = tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, availability: event} ;
      }
      return ticket;
    });
    setTickets(newTickets);
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };
  const addTicket = () => {
    setTickets([...tickets, {id:Date.now(), ticketName: '', price: '', date: '', url: '', availability: '' }]);
  }


  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>Event</Heading>
            <Form>
              <div tw="w-full flex flex-wrap justify-between">
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Name</label>
                  <Input tw="w-full" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Image URL</label>
                  <Input tw="w-full" type="text" placeholder="https://example.com" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex justify-between mt-5">
                <div tw="w-full flex flex-col items-start">
                  <label>Event's description</label>
                  <Input tw="w-full" type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[20%] w-full flex flex-col items-start">
                  <label>Start Date</label>
                  <Input tw="w-full" type="date" name="author" value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
                </div>
                <div tw="md:w-[20%] w-full flex flex-col items-start">
                  <label>Start Time</label>
                  <Input tw="w-full" type="time" name="author" value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
                </div>
                <div tw="md:w-[20%] w-full flex flex-col items-start">
                  <label>End Date</label>
                  <Input tw="w-full" type="date" name="authorUrl" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
                </div>
                <div tw="md:w-[20%] w-full flex flex-col items-start">
                  <label>End Time</label>
                  <Input tw="w-full" type="time" name="authorUrl" value={endTime} onChange={(e)=>setEndTime(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Event Status</label>
                  <Select value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option>Scheduled</option>
                    <option>Postponed</option>
                    <option>Moved Online</option>
                  </Select>
                </div>
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Attendance Mode</label>
                  <Select value={attendance} onChange={(e)=>setAttendance(e.target.value)}>
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Mixed</option>
                  </Select>
                </div>
              </div>
              {
                attendance == "Online" && 
                <div tw="w-full flex flex-wrap mt-5 justify-between">
                  <div tw="md:w-[60%] w-full flex flex-col items-start">
                    <label>Stream URL</label>
                    <Input tw="w-full" type="text" placeholder="https://example.com" value={name} onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div tw="md:w-[30%] w-full flex flex-col items-start">
                    <label>Timezone</label>
                    <Select value={timezoneValue} onChange={(e)=>setTimeZoneValue(e.target.value)}>
                      {
                        timezones && timezones.map((timezone, index)=>{
                          return(
                            <option key={index} value={timezone.utc}>{timezone.label}</option>
                          )
                        })
                      }
                    </Select>
                  </div>
                </div>
              }
              {
                attendance == "Offline" &&
                <div tw="w-full flex flex-col">
                  <div tw="w-full flex flex-wrap mt-5 justify-between">
                    <div tw="md:w-[30%] w-full flex flex-col items-start">
                      <label>Venue's name</label>
                      <Input tw="w-full" type="text" name="place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
                    </div>
                    <div tw="md:w-[30%] w-full flex flex-col items-start">
                      <label>Street</label>
                      <Input tw="w-full" type="text" name="street" value={street} onChange={(e)=>setStreet(e.target.value)}/>
                    </div>
                    <div tw="md:w-[30%] w-full flex flex-col items-start">
                      <label>City</label>
                      <Input tw="w-full" type="text" name="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                  </div>
                  <div tw="w-full flex flex-wrap mt-5 justify-between">
                    <div tw="md:w-[35%] w-full flex flex-col items-start">
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
                    <div tw="md:w-[15%] w-full flex flex-col items-start">
                      <label>Zip Code</label>
                      <Input tw="w-full" type="number" name="zipcode" value={zipcode} onChange={(e)=>setZipcode(e.target.value)}/>
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
                  </div>
                </div> 
              }

              {
                attendance == "Mixed" &&
                  <div tw="w-full flex flex-col">
                    <div tw="w-full flex flex-wrap mt-5 justify-between">
                    <div tw="md:w-[60%] w-full flex flex-col items-start">
                      <label>Stream URL</label>
                      <Input tw="w-full" type="text" name="name" value={streamUrl} onChange={(e)=>setStreamUrl(e.target.value)}/>
                    </div>
                    <div tw="md:w-[30%] w-full flex flex-col items-start">
                      <label>Timezone</label>
                      <Select value={timezoneValue} onChange={(e)=>setTimeZoneValue(e.target.value)}>
                        {
                          timezones && timezones.map((timezone, index)=>{
                            return(
                              <option key={index} value={timezone.utc}>{timezone.label}</option>
                            )
                          })
                        }
                      </Select>
                    </div>
                  </div>
                  <div tw="w-full flex flex-wrap mt-5 justify-between">
                    <div tw="md:w-[30%] w-full flex flex-col items-start">
                      <label>Venue's name</label>
                      <Input tw="w-full" type="text" name="place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
                    </div>
                    <div tw="md:w-[30%] w-full flex flex-col items-start">
                      <label>Street</label>
                      <Input tw="w-full" type="text" name="street" value={street} onChange={(e)=>setStreet(e.target.value)}/>
                    </div>
                    <div tw="md:w-[30%] w-full flex flex-col items-start">
                      <label>City</label>
                      <Input tw="w-full" type="text" name="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                  </div>
                  <div tw="w-full flex flex-wrap mt-5 justify-between">
                    <div tw="md:w-[35%] w-full flex flex-col items-start">
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
                    <div tw="md:w-[15%] w-full flex flex-col items-start">
                      <label>Zip Code</label>
                      <Input tw="w-full" type="number" name="zipcode" value={zipcode} onChange={(e)=>setZipcode(e.target.value)}/>
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
                  </div>
                </div> 
              }

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Performer @type</label>
                  <Select value={performer} onChange={(e)=>setPerformer(e.target.value)}>
                    <option>Person</option>
                    <option>Performing Group</option>
                    <option>Music Group</option>
                    <option>Dance Group</option>
                    <option>Theater Group</option>
                  </Select>
                </div>
                <div tw="md:w-[45%] w-full flex flex-col items-start">
                  <label>Performer's name</label>
                  <Input tw="w-full" type="text" name="performName" value={performerName} onChange={(e)=>setPerformerName(e.target.value)}/>
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between items-center">
                <div tw="md:w-[30%] w-full flex flex-col items-start">  
                  <Button onClick={addTicket}><IoIosAdd tw="mr-2"/> ADD TICKET</Button>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start mt-5">
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
              </div>
              <div tw="w-full flex flex-col items-start mt-5">
                <div tw="w-full">
                  {
                    tickets.map((ticket, index)=>{
                      return(
                        <div tw="w-full flex flex-wrap items-center justify-between mt-5"> 
                          <div tw="md:w-[10%] w-full flex flex-col items-start">
                            <label>Name</label>
                            <Input tw="w-full" type="text" name="ticketName" onChange={(e)=>handleTicketNameChange(ticket.id, e.target.value)}/>
                          </div>
                          <div tw="md:w-[10%] w-full flex flex-col items-start">
                            <label>Price</label>
                            <Input tw="w-full" type="number" name="price" onChange={(e)=>handlePriceChange(ticket.id, e.target.value)}/>
                          </div>
                          <div tw="md:w-[20%] w-full flex flex-col items-start">
                            <label>Available from</label>
                            <Input tw="w-full" type="date" name="date" onChange={(e)=>handleDateChange(ticket.id, e.target.value)}/>
                          </div> 
                          <div tw="md:w-[20%] w-full flex flex-col items-start">
                            <label>URL</label>
                            <Input tw="w-full" type="text" name="url" onChange={(e)=>handleUrlChange(ticket.id, e.target.value)}/>
                          </div> 
                          <div tw="md:w-[20%] w-full flex flex-col items-start">
                            <label>Availability</label>
                            <Select tw="w-full" onChange={(e)=>handleAvailabilityChange(ticket.id, e.target.value)}>
                              <option>In stock</option>
                              <option>Sold out</option>
                              <option>Pre-order</option>
                              <option>Not specified</option>
                            </Select>
                          </div> 
                          <a href="" tw="text-[24px] text-black" 
                            onClick={(e)=>{
                              e.preventDefault(); 
                              handleDeleteTicket(ticket.id);
                            }}
                          ><AiTwotoneDelete /></a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              
            </Form>
          </LeftColumn>
          <RightColumn>
            <ResultContent>
              <span>{'<script type="application/ld+json">'}</span>
              <span>{'{'}</span>
                <span tw="ml-5">{'"@context": "https://schema.org",'}</span>
                <span tw="ml-5">{`"@type": "Event",`}</span>
                <span tw="ml-5">{`"name": "${name}",`}</span>
                {
                  url != "" && <span tw="ml-5">{`"image": "${url}",`}</span> 
                }
                {
                  description != "" && <span tw="ml-5">{`"description": "${description}",`}</span> 
                }
                <span tw="ml-5">{`"startDate": "${startDate}${startTime!=""?`T${startTime}`:''}${timezoneValue !=""?timezoneValue:''}",`}</span>
                {
                  endDate != "" && <span tw="ml-5">{`"endtDate": "${endDate}${endTime!=""?`T${endTime}`:''}${timezoneValue !=""?timezoneValue:''}",`}</span> 
                }
                {
                  status != "" && <span tw="ml-5">{`"eventStatus": "https://schema.org/Event${status}",`}</span>
                }
                {
                  attendance == "Online" && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",`}</span>
                    <div tw="flex flex-col">
                      <span>{`"location": {`}</span>
                      <span tw="ml-5">{` "@type": "VirtualLocation",`}</span>
                      <span tw="ml-5">{` "url": "${streamUrl}",`}</span>
                      <span>{`},`}</span>
                    </div>
                  </div>
                }
                {
                  attendance == "Offline" && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",`}</span>
                    <div tw="flex flex-col">
                      <span>{`"location": {`}</span>
                      <span tw="ml-5">{`"@type": "Place",`}</span>
                      <span tw="ml-5">{`"name": "${place}",`}</span>
                      <div tw="flex flex-col ml-5">
                        <span>{`"address": {`}</span>
                          <span tw="ml-5">{`"@type": "PostalAddress",`}</span>
                          <span tw="ml-5">{`"streetAddress": "${street}",`}</span>
                          <span tw="ml-5">{`"addressLocality": "${city}",`}</span>
                          {
                            region!="" && <span tw="ml-5">{`"addressRegion": "${region}",`}</span>
                          }
                          <span tw="ml-5">{`"postalCode": "${zipcode}",`}</span>
                          <span tw="ml-5">{`"addressCountry": "${country}",`}</span>
                        <span>{`},`}</span>
                      </div>
                    </div>
                  </div>
                }
                {
                  attendance == "Mixed" && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",`}</span>
                    <div tw="flex flex-col">
                      <span>{`"location": [`}</span>
                        <div tw="flex flex-col ml-5">
                          <span>{`{`}</span>
                            <span tw="ml-5">{` "@type": "VirtualLocation",`}</span>
                            <span tw="ml-5">{` "url": "${streamUrl}",`}</span>
                          <span>{`},`}</span>
                        </div>
                        <div tw="flex flex-col ml-5">
                          <span>{`{`}</span>
                            <span tw="ml-5">{`"@type": "Place",`}</span>
                            <span tw="ml-5">{`"name": "${place}",`}</span>
                            <div tw="flex flex-col ml-5">
                              <span>{`"address": {`}</span>
                                <span tw="ml-5">{`"@type": "PostalAddress",`}</span>
                                <span tw="ml-5">{`"streetAddress": "${street}",`}</span>
                                <span tw="ml-5">{`"addressLocality": "${city}",`}</span>
                                {
                                  region!="" && <span tw="ml-5">{`"addressRegion": "${region}",`}</span>
                                }
                                <span tw="ml-5">{`"postalCode": "${zipcode}",`}</span>
                                <span tw="ml-5">{`"addressCountry": "${country}",`}</span>
                              <span>{`}`}</span>
                            </div>
                          <span>{`}`}</span>
                        </div>
                      <span>{`],`}</span>
                    </div>
                  </div>
                }
                {
                  performer != "" && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"performer": {`}</span>
                      <span tw="ml-5">{`"@type": "${performer}",`}</span>
                      <span tw="ml-5">{`"name": "${performerName}",`}</span>
                    <span>{`}`}</span>
                  </div>
                }
                {
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
                }
                {
                  (tickets.length == 1) && 
                  <div div tw="flex flex-col ml-5">
                    <span>{`"offers": {`}</span>
                      <span tw="ml-5">{`"@type": "Offer",`}</span>
                      <span tw="ml-5">{`"name": "${tickets[0].ticketName}",`}</span>
                      <span tw="ml-5">{`"price": "${tickets[0].price}",`}</span>
                      <span tw="ml-5">{`"priceCurrency": "${currency}",`}</span>
                      <span tw="ml-5">{`"validFrom": "${tickets[0].date}",`}</span>
                      <span tw="ml-5">{`"url": "${tickets[0].url}",`}</span>
                      <span tw="ml-5">{`"availability": "${tickets[0].availability}",`}</span>
                    <span>{`}`}</span>
                  </div> 
                }
                {
                  (tickets.length > 1) && 
                  <div div tw="flex flex-col ml-5">
                    <span>{`"offers": [`}</span>
                      
                        {
                          tickets.map((ticket, index) =>{
                            return(
                              <div key={index} tw="flex flex-col ml-5">
                                <span>{`{`}</span>
                                  <span tw="ml-5">{`"@type": "Offer",`}</span>
                                  <span tw="ml-5">{`"name": "${ticket.ticketName}",`}</span>
                                  <span tw="ml-5">{`"price": "${ticket.price}",`}</span>
                                  <span tw="ml-5">{`"priceCurrency": "${currency}",`}</span>
                                  <span tw="ml-5">{`"validFrom": "${ticket.date}",`}</span>
                                  <span tw="ml-5">{`"url": "${ticket.url}",`}</span>
                                  <span tw="ml-5">{`"availability": "${ticket.availability}",`}</span>
                                <span>{`},`}</span>
                              </div>
                            )
                          })
                        }
                    <span>{`]`}</span>
                  </div> 
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
