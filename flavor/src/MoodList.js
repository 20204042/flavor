import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MapWithMarkers = ({ restaurants, selectedFoodType }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // 카카오 맵 스크립트를 동적으로 로드
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=0560729fbda53d06035a69b6f812c484&libraries=services';
    script.async = true;
    script.onload = () => {
      // 스크립트가 로드된 후에 실행되는 부분
      const centerLat = 36.773536; // 중심 좌표의 위도
      const centerLng = 126.933500; // 중심 좌표의 경도

      // 카카오 지도 설정
      const mapOptions = {
        center: new window.kakao.maps.LatLng(centerLat, centerLng), // 중심 좌표로 설정
        level: 2, // 지도 확대 레벨
      };

      const map = new window.kakao.maps.Map(
        document.getElementById('map'),
        mapOptions
      );

      // 클릭 이벤트 리스너를 추가
      window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;

        const message =
          latlng.getLat().toFixed(6) + ', ' + latlng.getLng().toFixed(6);

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = message;
      });

      // 선택된 음식 종류에 해당하는 음식점만 필터링
      const filteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.type === selectedFoodType
      );

      // 마커와 정보창 생성
      filteredRestaurants.forEach((restaurant) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            restaurant.latitude,
            restaurant.longitude
          ),
          map: map,
        });

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedRestaurant(restaurant);
        });

        // 마커에 마우스 오버 이벤트
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          // 마우스를 오버하면 정보창을 표시
          setSelectedRestaurant(restaurant);
        });

        // 마커에 마우스 아웃 이벤트
        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          // 마우스를 떠나면 정보창을 숨김
          setSelectedRestaurant(null);
        });
      });
    };

    // 스크립트를 `<head>` 부분에 추가
    document.head.appendChild(script);
  }, [restaurants, selectedFoodType]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '500px', margin: '0 auto' }}></div>
      <div id="result"></div>
      {selectedRestaurant && (
        <div className="restaurant-info">
          <h3>{selectedRestaurant.name}</h3>
          <p>음식 종류: {selectedRestaurant.type}</p>
          <p>영업 시간: {selectedRestaurant.openingHours}</p>
          <p>주소: {selectedRestaurant.address}</p>
        </div>
      )}
    </div>
  );
};

function MainPage() {
  const [selectedFoodType, setSelectedFoodType] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // 실제 음식점 데이터를 가져오는 비동기 함수
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get('https://api.example.com/restaurants'); // 데이터 가져오는 API 엔드포인트
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, []);

  const foodTypes = ['한식', '중식', '일식', '양식', '패스트푸드', '분식', '기타'];

  return (
    <div className="App">
      <div className="food-type-buttons">
        {foodTypes.map((foodType, index) => (
          <button
            key={foodType}
            onClick={() => setSelectedFoodType(foodType)}
            className={selectedFoodType === foodType ? 'active' : ''}
            style={{
              backgroundColor: selectedFoodType === foodType ? 'grey' : '#ff6480',
              color: 'white',
              border: '0px solid black',
              padding: '5px 10px',
              borderRadius: '5px',
              marginTop: '5px',
              marginRight: '10px',
              marginBottom: '5px',
              cursor: 'pointer',
              marginLeft: index === 0 ? '10px' : '0',
            }}
          >
            {foodType}
          </button>
        ))}
      </div>
      <MapWithMarkers restaurants={restaurants} selectedFoodType={selectedFoodType} />
    </div>
  );
}

export default MainPage;
