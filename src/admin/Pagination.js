import React from 'react'
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

    const goToNextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <div tw='flex justify-center items-center mt-5'>
          <button tw='w-[40px] h-[40px] mx-1 p-3 bg-white rounded border border-white shadow text-[#191F4D] hover:bg-[#191F4D] hover:text-white' onClick={goToPrevPage}>
            <SlArrowLeft />
          </button>
          <div tw='max-w-md overflow-x-auto'>
            <div tw='flex items-center justify-between w-full'>
                {pageNumbers.map(pgNumber => (
                    <button key={pgNumber} tw= "w-[40px] h-[40px] rounded mx-1 border border-white shadow hover:bg-[#191F4D] hover:text-white" onClick={() => setCurrentPage(pgNumber)}>
                      {pgNumber}
                    </button>
                ))}
            </div>
          </div>
          <button tw='w-[40px] h-[40px] mx-1 p-3 bg-white rounded border border-white shadow text-[#191F4D] hover:bg-[#191F4D] hover:text-white' onClick={goToNextPage}>
            <SlArrowRight />
          </button>
        </div>
    )
}

export default Pagination