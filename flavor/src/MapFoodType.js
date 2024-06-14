import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantDetail from './RestaurantDetail';

const MapFoodType = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedFoodType, setSelectedFoodType] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=0560729fbda53d06035a69b6f812c484&libraries=services';
    script.async = true;
    script.onload = () => {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(36.769101, 126.934896),
        level: 2,
      };

      const mapInstance = new window.kakao.maps.Map(
        document.getElementById('map'),
        mapOptions
      );
      setMap(mapInstance);

      fetch('http://localhost:3001/mapfoodtype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const positions = data.map((item) => ({
              id: item.id,
              title: item.title,
              latlng: new window.kakao.maps.LatLng(item.latitude, item.longitude),
              type: item.type,
              number: item.phone_number,
              menu: item.menu,
            }));

            const markerList = positions.map((position) => {
              const marker = new window.kakao.maps.Marker({
                position: position.latlng,
                map: mapInstance,
              });
            
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding: 2px 14px 4px 14px;">${position.title}</div>`,
                removable: true,
              });
            
              window.kakao.maps.event.addListener(marker, 'click', () => {             
                setSelectedRestaurant(position);
                navigate(`/mapfoodtype/restaurant/${position.id}`);
              });
            
              window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                infowindow.open(mapInstance, marker);
              });
            
              window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                infowindow.close();
              });
            
              return { ...position, marker, infowindow };
            });

            setMarkers(markerList);
          } else {
            console.log('데이터가 비어 있습니다.');
          }
        })
        .catch((error) => {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        });
    };
    document.head.appendChild(script);
  }, []);

  const filterMarkersByFoodType = (foodType) => {
    setSelectedFoodType(foodType);

    markers.forEach((marker) => marker.marker.setMap(null));

    if (foodType === '전체') {
      markers.forEach((marker) => marker.marker.setMap(map));
    } else {
      markers
        .filter((marker) => marker.type === foodType || marker.type.includes(foodType))
        .forEach((marker) => marker.marker.setMap(map));
    }
  };

  const handleMarkerClick = (position) => {
    setSelectedRestaurant(position);
  };

  return (
    <div>
      <style>
      {`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .map_container {
          width: 70%;
          height: 640px;
          margin: 0 auto;
          position: relative;
        }

        .food_type_buttons {
          display: flex;
          gap: 2px;
          margin: 10px 0px 10px 10px;
        }
        
        .food_type_buttons button {
          background-color: #ffffff;
          color: #FF6480;
          border: 1px solid #fd98ab;
          padding: 10px 20px;
          cursor: pointer;
        }
        
        .food_type_buttons button:hover {
          background-color: #fd98ab;
          color: white;
        }

        .restaurant_info {
          margin-top: 10px;
          margin-left: 10px;
        }
      `}
      </style>
      <div className="container">
        <Link to="/">
          <button type="flavor_logo" className="flavor_logo">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
          </button>
        </Link>
        <div className="food_type_buttons">
          <button onClick={() => filterMarkersByFoodType('전체')}>전체</button>
          <button onClick={() => filterMarkersByFoodType('한식')}>한식</button>
          <button onClick={() => filterMarkersByFoodType('중식')}>중식</button>
          <button onClick={() => filterMarkersByFoodType('일식')}>일식</button>
          <button onClick={() => filterMarkersByFoodType('양식')}>양식</button>
          <button onClick={() => filterMarkersByFoodType('패스트푸드')}>패스트푸드</button>
          <button onClick={() => filterMarkersByFoodType('분식')}>분식</button>
          <button onClick={() => filterMarkersByFoodType('기타')}>기타</button>
        </div>
      </div>
      {/* <div className="search_bar">
        <input type="text" placeholder="음식점 검색" />
        <button>검색</button>
      </div> */}
      <div className="map_container" id="map"></div>
      {selectedRestaurant && (
        <RestaurantDetail
          selectedRestaurant={selectedRestaurant}
        />
      )}
    </div>
  );
};

export default MapFoodType;