import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

function Youtube() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [isPop, setIsPop] = useState(false);
	const [index, setIndex] = useState(0);

	const api_key = 'AIzaSyAmrnB5Oj1KBkDE0xtJ2_vaUpVkCUJxgG0';
	const play_list = 'PLY1tv0V8Vk1xDYOgxZyASCcD6e9_McX1n';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&playlistId=${play_list}&maxResults=5&part=snippet`;

	useEffect(() => {
		frame.current.classList.add('on');

		axios.get(url).then((json) => {
			console.log(json.data.items);
			setItems(json.data.items);
		});
	}, []);

	return (
		<>
			<section className='youtube' ref={frame}>
				<div className='inner'>
					<h1>Youtube</h1>
					{items.map((item, idx) => {
						let desc = item.snippet.description;
						let desc_len = desc.length;
						let date = item.snippet.publishedAt;					
						
						return (
							<article
								key={idx}
								onClick={() => {
									setIsPop(!isPop);

									//리스트 클릭시 해당 items의 순서값을 index state 값으로 저장
									setIndex(idx);
								}}>
								<div className='inner'>
									<div className='pic'>
										<img src={item.snippet.thumbnails.medium.url} />
									</div>
									<h2>{item.snippet.title}</h2>
									<p>{desc_len > 200 ? desc.substr(0,200) + '...' : desc}</p>
									<span>{date.split('T')[0]}</span>
								</div>
							</article>
						);
					})}
				</div>
			</section>

			{isPop ? <Popup /> : null}
		</>
	);

	function Popup() {
		useEffect(()=>{
			document.body.style.overflow = "hidden";

			return () => {
				document.body.style.overflow = "auto";
			}
		},[]);

		return (
			<aside className='popup'>
				<iframe src={'https://www.youtube.com/embed/' +
						items[index].snippet.resourceId.videoId} ></iframe>
				<span onClick={() => setIsPop(!isPop)}>close</span>
			</aside>
		);
	}
}

export default Youtube;
