import React, { useRef } from "react";

import tw from "twin.macro";
import confetti from 'canvas-confetti';


export const PrimaryButton = tw.button`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;


export const ConfettiButton = (props) => {

  const Confetti = tw.button`px-8 py-3 font-bold rounded bg-primary-700 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;
	const handleClick = (e) => {
		e.preventDefault();
		const button = e.target;
		const screenWidth = window.innerWidth;
		const { left, width } = button.getBoundingClientRect();
    // Calculate position relative to the viewport
		console.log(left);
		console.log(width);

    const x = (left + width / 2)/screenWidth;
		confetti({
			particleCount: 150,
			spread: 60,
			origin: { x: x }
		});
	}
	return (
		<div>
			<Confetti onClick={handleClick}>{props.txt}</Confetti>
		</div>
	);
};