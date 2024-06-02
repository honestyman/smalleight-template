import React, {useEffect, useRef, useState } from "react";
import 'animate.css';
export const HoverButton = ({text, link}) => {
  const [hover, setHover] = useState(false);

	return (
		<div style={{ padding: '20px' }}>
			<a href={link}>
				<div 
					className="button"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<span className={hover ? 'span1 up' : 'span1'}>{text}</span>
					<span className={hover ? 'span2_center down' : 'span2'}>Let's go</span>
				</div>
			</a>
		</div>
	);
};