import React, {useRef, useEffect, useState } from 'react'

function Location() {
    const frame = useRef(null);
    const container = useRef(null);
    
    const { kakao } = window;

    const [map, setMap] = useState(null);
    const [traffic, setTraffic] = useState(false);

    useEffect(()=>{
        frame.current.classList.add('on');

        const options = {
            center: new kakao.maps.LatLng(37.512908, 127.0595845), // 지도의 위도, 경도
            level : 3, 
        };

        const mapInfo = new kakao.maps.Map(container.current, options);
        setMap(mapInfo);
    },[]);

    const handleTraffic = () => {
        // 여기서 if(map) 이 들어가는 이유
        // 처음 컴포넌트가 생성될때 아직 map state값이 비어있는 상태이기 때문에 map값을 읽을 수가 없어서 오류가 뜸
        // 그러므로 아래 삼항 연산자를 map값이 있을때만 실행하도록 조건문 처리
        if (map) {
            traffic ? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        }
    };

    useEffect(()=>{
        handleTraffic();
    }, [traffic]);

    return (
        <section className='location' ref={frame}>
            <div className="inner">
                <h1>Location</h1>
                <div id="map" ref={container}></div>

                <button onClick={()=> setTraffic(!traffic)}>Traffic</button>
            </div>
        </section>
    )
}

export default Location;