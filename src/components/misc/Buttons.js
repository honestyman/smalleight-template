import React, {useEffect, useRef, useState } from "react";
import { message } from "antd";

import tw from "twin.macro";
import confetti from 'canvas-confetti';
import { IoMdHeart } from "react-icons/io";
import 'animate.css';
import { useDispatch, useSelector } from "react-redux";
import { addOneLike, getCounts } from "../../redux/slice/clientSlice";


export const PrimaryButton = tw.button`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;

export const ConfettiButton = () => {

  const ref = useRef(null);
  const { countData } = useSelector(state => state.clients)
  const dispatch = useDispatch();

  const [likeCount, setLikeCount] = useState(0);

  useEffect(()=>{
    dispatch(getCounts());
  },[])

  useEffect(()=>{
    setLikeCount(countData)
  },[countData])

  const Confetti = tw.button`lg:w-[120px] w-[100px] px-5 py-3 lg:ml-16 ml-10 mb-20 flex justify-center items-center font-bold rounded bg-red-500 text-gray-100 hover:bg-primary-700 hover:text-gray-200 hover:shadow-outline hover:outline-none transition duration-300`;
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

    dispatch(addOneLike()).then(()=>{
      message.success('クリックありがとうございます！');
      dispatch(getCounts())
    })
	}

	useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('wow', 'animate__animated', 'animate__heartBeat');
        } else {
          entry.target.classList.remove('wow', 'animate__animated', 'animate__heartBeat');
        }
      });
    });

    observer.observe(ref.current);

    const interval = setInterval(() => {
      const element = ref.current;
      if (element) {
        element.classList.add('wow', 'animate__animated', 'animate__heartBeat');
        setTimeout(() => {
          element.classList.remove('wow', 'animate__animated', 'animate__heartBeat');
        }, 1000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);
	return (
		<div ref={ref}>
			<Confetti onClick={handleClick}><IoMdHeart tw="mx-10"/>{likeCount}</Confetti>
		</div>
	);
};