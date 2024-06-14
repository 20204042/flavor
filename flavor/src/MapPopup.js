// MapPopup.js

import React, { useEffect, useState } from 'react';

function MapPopup() {
  const [map, setMap] = useState(null);

  // 팝업창에서 지도를 생성하는 함수
  const createMapInPopup = () => {
    // Kakao Maps 스크립트를 동적으로 로드
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAPS_APP_KEY';
    script.async = true;
    script.onload = () => {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(37.5662952, 126.9779451), // 초기 지도 중심 좌표
        level: 3, // 초기 줌 레벨
      };

      // 지도를 생성하고 팝업 내에 추가
      const mapInstance = new window.kakao.maps.Map(
        document.getElementById('popup_map'), // 팝업 내에 지도를 표시할 DOM 요소
        mapOptions
      );
      setMap(mapInstance);
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    createMapInPopup();
  }, []);

  return (
    <div className="popup">
      <div id="popup_map" style={{ width: '100%', height: '300px' }}></div>
      {/* 다른 팝업 내용 */}
    </div>
  );
}

export default MapPopup;