import React, {useState, useEffect, useMemo} from "react";
import CurrencyList from 'currency-list';
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

const Heading = tw.h1`font-bold text-2xl md:text-3xl flex items-center lg:text-3xl xl:text-3xl text-gray-900 leading-tight`;

const ResultContent = tw.div`h-full flex flex-col justify-center items-start md:pl-24 pl-0 pt-10`;

// Random Decorator Blobs (shapes that you see in background)

const Form = tw.div`w-full mt-8 md:mt-10 text-sm flex flex-col mx-auto md:mx-0 bg-white`
const Label = tw.label`text-left text-sm md:text-[12px] lg:text-[12px] font-medium leading-relaxed text-secondary-100`
const Input = tw.input`mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const ResultLabel = tw.label`md:text-left md:text-4xl font-medium leading-relaxed text-center`
const Button = tw.button`w-full flex justify-center items-center rounded-md text-white px-5 py-2 text-sm border border-primary-500 bg-primary-500 transition duration-300 hover:bg-white hover:text-black`
const Select = tw.select`w-full mb-3 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`

export default () => {
  const [supplies, setSupplies] = useState([]);
  const [tools, setTools] = useState([]);
  const [steps, setSteps] = useState([
    {
      id:Date.now(),
      introductions:'',
      imageUrl:'',
      name:'',
      url:''
    }
  ]);
  const [currencyLists, setCurrencyLists] = useState([]);
  
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [cost, setCost] = useState("");
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
  
  const handleSupplyChange = (id, event) => {
    const newStudies = supplies.map(supply => {
      if (supply.id === id) {
        return { ...supply, value: event} ;
      }
      return supply;
    });
    setSupplies(newStudies);
  };

  const handleDeleteSupply = (id) => {
    setSupplies(supplies.filter(supply => supply.id !== id));
  };
  const addSupply = () => {
    setSupplies([...supplies, {id:Date.now(), value: '' }]);
  }

  const handleToolChange = (id, event) => {
    const newTools = tools.map(tool => {
      if (tool.id === id) {
        return { ...tool, value: event} ;
      }
      return tool;
    });
    setTools(newTools);
  };

  const handleDeleteTool = (id) => {
    setTools(tools.filter(tool => tool.id !== id));
  };
  const addTool = () => {
    setTools([...tools, {id:Date.now(), value: '' }]);
  }
// ------------step----------------
  const handleStepIntroductionChange = (id, event) => {
    const newSteps = steps.map(step => {
      if (step.id === id) {
        return { ...step, introductions: event} ;
      }
      return step;
    });
    setSteps(newSteps);
  };

  const handleStepImageUrlChange = (id, event) => {
    const newSteps = steps.map(step => {
      if (step.id === id) {
        return { ...step, imageUrl: event} ;
      }
      return step;
    });
    setSteps(newSteps);
  };
  const handleStepUrlChange = (id, event) => {
    const newSteps = steps.map(step => {
      if (step.id === id) {
        return { ...step, url: event} ;
      }
      return step;
    });
    setSteps(newSteps);
  };
  const handleStepNameChange = (id, event) => {
    const newSteps = steps.map(step => {
      if (step.id === id) {
        return { ...step, name: event} ;
      }
      return step;
    });
    setSteps(newSteps);
  };

  const handleDeleteStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
  };
  const addStep = () => {
    setSteps([...steps, 
      {
        id:Date.now(),
        introductions:'',
        imageUrl:'',
        name:'',
        url:''
      }
    ]);
  }

  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>How to</Heading>
            <Form>
              <div tw="w-full flex flex-wrap justify-between">
                <div tw="md:w-[50%] w-full flex flex-col items-start">
                  <label>Name</label>
                  <Input tw="w-full" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
              </div>
              <div tw="w-full flex justify-between mt-5">
                <div tw="w-full flex flex-col items-start">
                  <label>Description</label>
                  <Input tw="w-full" type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
              </div>

              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Total time</label>
                  <Input tw="w-full" type="number" name="totalTime" value={totalTime} onChange={(e)=>setTotalTime((e.target.value).toString())}/>
                </div>
                <div tw="md:w-[30%] w-full flex flex-col items-start">
                  <label>Estimated cost</label>
                  <Input tw="w-full" type="number" name="cost" value={cost} onChange={(e)=>setCost((e.target.value).toString())}/>
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
              </div>
              <div tw="w-full flex justify-between mt-5">
                <div tw="w-full flex flex-col items-start">
                  <label>Image URL</label>
                  <Input tw="w-full" type="text" name="url" placeholder="https://example.com" value={url}  onChange={(e)=>setUrl(e.target.value)} />
                </div>
              </div>
              <div tw="w-full flex flex-wrap mt-5 justify-between">
                <div tw="md:w-[45%] w-full flex flex-col items-start mb-5">
                  {
                    supplies && supplies.map((supply, index)=>{
                      return(
                        <div tw="w-full flex flex-wrap items-center justify-between mt-5"> 
                          <div tw="w-[90%] flex flex-col items-start">
                            <label>{`Supply #${index+1}`}</label>
                            <Input tw="w-full" type="text" name="supply" onChange={(e)=>handleSupplyChange(supply.id, e.target.value)}/>
                          </div> 
                          <a href="" tw="text-[24px] text-black" 
                            onClick={(e)=>{
                              e.preventDefault(); 
                              handleDeleteSupply(supply.id);
                            }}
                          ><AiTwotoneDelete /></a>
                        </div>
                      )
                    })
                  }
                  <Button onClick={addSupply}><IoIosAdd tw="mr-2"/> ADD SUPPLY</Button>
                </div>
                <div tw="md:w-[45%] w-full flex flex-col items-start mb-5">
                  {
                    tools && tools.map((tool, index)=>{
                      return(
                        <div tw="w-full flex flex-wrap items-center justify-between mt-5"> 
                          <div tw="w-[90%] flex flex-col items-start">
                            <label>{`Tool #${index+1}`}</label>
                            <Input tw="w-full" type="text" name="tool" onChange={(e)=>handleToolChange(tool.id, e.target.value)}/>
                          </div> 
                          <a href="" tw="text-[24px] text-black" 
                            onClick={(e)=>{
                              e.preventDefault(); 
                              handleDeleteTool(tool.id);
                            }}
                          ><AiTwotoneDelete /></a>
                        </div>
                      )
                    })
                  }
                  <Button onClick={addTool}><IoIosAdd tw="mr-2"/> ADD TOOL</Button>
                </div>
              </div>
              {
                steps && steps.map((step, index)=>{
                  return(
                    <div tw="w-full flex flex-col">
                      <div tw="w-full flex flex-wrap mt-5 justify-between">
                        <div tw="w-[80%] w-full flex flex-col items-start">
                          <label>{`step #${index+1}:Introductions`}</label>
                          <Input tw="w-full" type="text" name="introduction" onChange={(e)=>handleStepIntroductionChange(step.id, e.target.value)}/>
                        </div>
                        <a href="" tw="text-[24px] text-black" 
                            onClick={(e)=>{
                              e.preventDefault(); 
                              handleDeleteStep(step.id);
                            }}
                          ><AiTwotoneDelete /></a>
                      </div>
                      <div tw="w-full flex flex-wrap mt-5 justify-between">
                        <div tw="md:w-[30%] w-full flex flex-col items-start">
                          <label>Image URL</label>
                          <Input tw="w-full" type="text" name="imageUrl" onChange={(e)=>handleStepImageUrlChange(step.id, e.target.value)}/>
                        </div>
                        <div tw="md:w-[30%] w-full flex flex-col items-start">
                          <label>Name</label>
                          <Input tw="w-full" type="text" name="name" onChange={(e)=>handleStepNameChange(step.id, e.target.value)}/>
                        </div>
                        <div tw="md:w-[30%] w-full flex flex-col items-start">
                          <label>URL</label>
                          <Input tw="w-full" type="text" name="url" onChange={(e)=>handleStepUrlChange(step.id, e.target.value)}/>
                        </div>
                      </div>
                    </div> 
                  )
                })
              }
              <div tw="w-full flex flex-wrap mt-5 justify-between items-center">
                <div tw="md:w-[30%] w-full flex flex-col items-start">  
                  <Button onClick={addStep}><IoIosAdd tw="mr-2"/> ADD STEP</Button>
                </div>
              </div>
              
            </Form>
          </LeftColumn>
          <RightColumn>
            <ResultContent>
              <span>{'<script type="application/ld+json">'}</span>
              <span>{'{'}</span>
                <span tw="ml-5">{'"@context": "https://schema.org",'}</span>
                <span tw="ml-5">{`"@type": "HowTo",`}</span>
                <span tw="ml-5">{`"name": "${name}",`}</span>
                {
                  url != "" && <span tw="ml-5">{`"image": "${url}",`}</span> 
                }
                {
                  description != "" && <span tw="ml-5">{`"description": "${description}",`}</span> 
                }
                {
                  totalTime != "" && <span tw="ml-5">{`"totalTime": "PT${totalTime}M",`}</span> 
                }
                <div tw="flex flex-col ml-5">
                  <span>{`"estimatedCost": {`}</span>
                  <span tw="ml-5">{`"@type": "MonetaryAmount",`}</span>
                  <span tw="ml-5">{`"currency": "${currency}",`}</span>
                  <span tw="ml-5">{`"value": "${cost}",`}</span>
                  <span>{`},`}</span>
                </div>
                {
                  (supplies.length == 1) && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"supply": {`}</span>
                    <span tw="ml-5">{`"@type": "HowToSupply",`}</span>
                    <span tw="ml-5">{`"name": "${supplies[0].value}",`}</span>
                    <span>{`},`}</span>
                  </div>
                }
                {
                  (supplies.length > 1) && <div tw="flex flex-col ml-5">
                    <span>{'"supply": ['}</span>
                    {
                      supplies.map((supply, index)=>{
                        return(
                          <div key={index} tw="flex flex-col ml-5">
                            <span>{`{`}</span>
                            <span tw="ml-5">{`"@type": "HowToSupply",`}</span>
                            <span tw="ml-5">{`"name": "${supply.value}",`}</span>
                            <span>{`},`}</span>
                          </div>
                        );
                      })
                    }
                    <span>{`],`}</span>
                  </div>   
                }
                {
                  (tools.length == 1) && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"tool": {`}</span>
                    <span tw="ml-5">{`"@type": "HowToTool",`}</span>
                    <span tw="ml-5">{`"name": "${tools[0].value}",`}</span>
                    <span>{`},`}</span>
                  </div>
                }
                {
                  (tools.length > 1) && <div tw="flex flex-col ml-5">
                    <span>{'"tool": ['}</span>
                    {
                      tools.map((tool, index)=>{
                        return(
                          <div key={index} tw="flex flex-col ml-5">
                            <span>{`{`}</span>
                            <span tw="ml-5">{`"@type": "HowToTool",`}</span>
                            <span tw="ml-5">{`"name": "${tool.value}",`}</span>
                            <span>{`},`}</span>
                          </div>
                        );
                      })
                    }
                    <span>{`],`}</span>
                  </div>   
                }

                {
                  (steps.length == 1) && 
                  <div tw="flex flex-col ml-5">
                    <span>{`"step": {`}</span>
                    <span tw="ml-5">{`"@type": "HowToStep",`}</span>
                    <span tw="ml-5">{`"name": "${steps[0].introductions}",`}</span>
                    { steps[0].imageUrl != "" && <span tw="ml-5">{`"image": "${steps[0].imageUrl}",`}</span> }
                    { steps[0].name != "" && <span tw="ml-5">{`"name": "${steps[0].name}",`}</span> }
                    { steps[0].url != "" && <span tw="ml-5">{`"url": "${steps[0].url}"`}</span> }
                    <span>{`},`}</span>
                  </div>
                }
                {
                  (steps.length > 1) && <div tw="flex flex-col ml-5">
                    <span>{'"step": ['}</span>
                    {
                      steps.map((step, index)=>{
                        return(
                          <div key={index} tw="flex flex-col ml-5">
                            <span>{`{`}</span>
                            <span tw="ml-5">{`"@type": "HowToTool",`}</span>
                            <span tw="ml-5">{`"name": "${step.introductions}",`}</span>
                            { step.imageUrl != "" && <span tw="ml-5">{`"image": "${step.imageUrl}",`}</span> }
                            { step.name != "" && <span tw="ml-5">{`"name": "${step.name}",`}</span> }
                            { step.url != "" && <span tw="ml-5">{`"url": "${step.url}"`}</span> }
                            <span>{`},`}</span>
                          </div>
                        );
                      })
                    }
                    <span>{`],`}</span>
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
