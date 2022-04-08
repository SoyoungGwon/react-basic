import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

function Department() {
	const frame = useRef(null);
	const [members, setMembers] = useState([]);
	const path = process.env.PUBLIC_URL;
	const url = `${path}/DB/department.json`;

	useEffect(() => {
		frame.current.classList.add('on');

		axios
			.get(url)
			.then((json) => {
				console.log(json.data.data);
				setMembers(json.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<section className='department' ref={frame}>
			<div className='inner'>
				<h1>Department</h1>

				<button
					onClick={() => {
						let newMembers = [...members];
						newMembers[0].name = 'Michael';
						setMembers(newMembers);
						console.log(members);
					}}>
					멤버정보 변경
				</button>

				<ul>
					{members.map((data, idx) => {
						return (
							<li key={idx}>
								<img src={`${path}/img/${data.pic}`} />
								<h2>{data.name}</h2>
								<p>{data.position}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}

export default Department;
