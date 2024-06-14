// import React, { useEffect, useState } from 'react';

// const MapPage = () => {
//   const [map, setMap] = useState(null);
//   const [keyword, setKeyword] = useState('');
//   const [searchResult, setSearchResult] = useState([]);
//   const [currentLatLon, setCurrentLatLon] = useState({
//     lat: 37.4812845080678,
//     lon: 126.952713197762
//   });

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src =
//       'https://dapi.kakao.com/v2/maps/sdk.js?appkey=0560729fbda53d06035a69b6f812c484&libraries=services';
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       initializeMap();
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const initializeMap = () => {
//     /* global kakao */
//     const mapOption = {
//       center: new kakao.maps.LatLng(37.297764, 127.069340),
//       level: 3
//     };

//     const map = new kakao.maps.Map(document.getElementById('map'), mapOption);
//     setMap(map);
//     currentLocation(map);
//   };

//   const currentLocation = (map) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         const locPosition = new kakao.maps.LatLng(lat, lon);
//         const message = '<div style="padding:5px;">현위치</div>';
//         displayMarker(map, locPosition, message);
//         setCurrentLatLon({ lat, lon });
//       });
//     } else {
//       const locPosition = new kakao.maps.LatLng(
//         currentLatLon.lat,
//         currentLatLon.lon
//       );
//       const message = '현재 위치를 알 수 없어 기본 위치로 이동합니다.';
//       displayMarker(map, locPosition, message);
//     }
//   };

//   const displayMarker = (map, locPosition, message) => {
//     const imageSize = new kakao.maps.Size(24, 35);
//     const markerImage = new kakao.maps.MarkerImage(
//       'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
//       imageSize
//     );

//     const marker = new window.kakao.maps.Marker({
//       map: map,
//       position: locPosition,
//       image: markerImage
//     });

//     const infowindow = new window.kakao.maps.InfoWindow({
//       content: message,
//       removable: true
//     });

//     infowindow.open(map, marker);
//     map.setCenter(locPosition);
//   };

//   const searchPlaces = () => {
//     if (!keyword.trim()) {
//       alert('키워드를 입력해주세요.');
//       return;
//     }

//     const ps = new window.kakao.maps.services.Places();
//     ps.keywordSearch(keyword, placesSearchCB);
//   };

//   const placesSearchCB = (data, status, pagination) => {
//     if (status === window.kakao.maps.services.Status.OK) {
//       displayPlaces(data);
//       displayPagination(pagination);
//     } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
//       setSearchResult([]);
//       alert('검색 결과가 존재하지 않습니다.');
//     } else if (status === window.kakao.maps.services.Status.ERROR) {
//       setSearchResult([]);
//       alert('검색 결과 중 오류가 발생했습니다.');
//     }
//   };

//   const displayPlaces = (places) => {
//     setSearchResult(places);
//     const bounds = new window.kakao.maps.LatLngBounds();

//     places.forEach((place) => {
//       const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
//       bounds.extend(placePosition);
//     });

//     map.setBounds(bounds);
//   };

//   const displayPagination = (pagination) => {
//     // 페이징 처리 구현 (생략)
//   };

//   return (
//     <div className="map_wrap">
//       <div id="map" style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}></div>
//       <div id="menu_wrap" className="bg_white">
//         <div className="option">
//           <div>
//             <form onSubmit={searchPlaces}>
//               <input type="text" placeholder="키워드" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
//               <button type="submit">검색</button>
//             </form>
//           </div>
//         </div>
//         <hr />
//         <ul>
//           {searchResult.map((place, index) => (
//             <li key={index}>
//               <span className={`markerbg marker_${index + 1}`}></span>
//               <div className="info">
//                 <h5>{place.place_name}</h5>
//                 {place.road_address_name ? (
//                   <div>
//                     <span>{place.road_address_name}</span>
//                     <span className="jibun gray">{place.address_name}</span>
//                   </div>
//                 ) : (
//                   <span>{place.address_name}</span>
//                 )}
//                 <span className="tel">{place.phone}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <div id="pagination"></div>
//       </div>
//     </div>
//   );
// };

// export default MapPage;


// // import React, { useEffect, useState } from 'react';

// // // ① 클릭 시 움직이는 마커 배열 = clickDynamicMarkers (내가 원하는 곳 클릭하기)
// // // ② 검색 시 정해진 음식점 마커 배열 = searchStaticMarkers (고정적으로 값 뜨게 하기)

// // const MapPage = () => {
// //     const [searchStaticMarkers, setSearchStaticMarkers] = useState([]);
// //     const [centerMarker, setCenterMarker] = useState(null); // Center marker state
// //     const [searchKeyword, setSearchKeyword] = useState(''); // 검색어 상태 추가
// //     let kakao; // kakao 변수를 전역으로 정의

// //     // 검색 결과를 표시하기 전에 기존 마커들을 지도에서 제거하는 함수를 정의합니다.
// //     const removeSearchStaticMarkers = () => {
// //         searchStaticMarkers.forEach((marker) => marker.setMap(null));
// //         setSearchStaticMarkers([]);
// //     };

// //     useEffect(() => {
// //         // 카카오 맵 API 스크립트를 동적으로 불러옵니다
// //         const script = document.createElement('script');
// //         script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=0560729fbda53d06035a69b6f812c484&libraries=services';
// //         script.async = true;
// //         document.body.appendChild(script);

// //         script.onload = () => {
// //             // 카카오 맵 API 스크립트가 로드되면, 지도를 초기화합니다
// //             initializeMap();
// //         };

// //         // 컴포넌트 언마운트 시 스크립트 정리(clean-up)
// //         return () => {
// //             document.body.removeChild(script);
// //         };
// //     }, []);

// //     const initializeMap = () => {
// //         // kakao 변수에 카카오 맵 API를 할당
// //         kakao = window.kakao;

// //         // 초기 지도 설정
// //         const mapOption = {
// //             center: new kakao.maps.LatLng(37.297764, 127.069340),
// //             level: 4
// //         };

// //         // 지도 생성
// //         const map = new kakao.maps.Map(document.getElementById('map'), mapOption);

// //         // 마커 생성
// //         const centerMarker = new kakao.maps.Marker({
// //             position: map.getCenter()
// //         });

// //         // 마커 지도에 표시
// //         centerMarker.setMap(map);

// //         // 클릭 이벤트 등록
// //         kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
// //             const latlng = mouseEvent.latLng;
// //             centerMarker.setPosition(latlng);
// //             // 클릭한 위도, 경도 정보를 가져옵니다
// //             const lat = latlng.getLat();
// //             const lng = latlng.getLng();
// //             // 클릭한 위치 정보 표시
// //             const clickDynamicMarkers = document.getElementById('click_dynamic_markers');
// //             clickDynamicMarkers.innerHTML = `클릭 위치: 위도 ${lat}, 경도 ${lng}`;
// //         });

// //         // CenterMarker 상태 업데이트
// //         setCenterMarker(centerMarker);
// //     };

// //     // 검색어 입력을 처리하는 함수
// //     const handleKeywordChange = (event) => {
// //         setSearchKeyword(event.target.value);
// //     };


// //     // 검색 함수 정의
// //     const searchPlaces = () => {
// //         const keyword = searchKeyword;
// //         // const keyword = document.getElementById('map_keyword').value;
// //         // 장소 검색 API 호출
// //         kakao.maps.services.places.keywordSearch(keyword, (result, status) => {
// //             if (status === kakao.maps.services.Status.OK) {
// //                 // 검색 결과를 표시하기 전에 기존 마커들을 지도에서 제거합니다.
// //                 removeSearchStaticMarkers();
        
// //                 // 새로운 검색 결과를 표시합니다.
// //                 displayPlaces(result);
// //             } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
// //                 alert('검색 결과가 없습니다.');
// //             } else if (status === kakao.maps.services.Status.ERROR) {
// //                 alert('검색 결과 중 오류가 발생했습니다.');
// //             }
// //         });
// //     };

// //     const displayPlaces = (places) => {
// //          // 검색 결과를 표시할 요소를 가져옵니다.
// //         const placesList = document.getElementById('places_list');

// //         // 요소가 존재하지 않는다면 함수를 종료합니다.
// //         if (!placesList) {
// //             return;
// //         }
        
// //         // 검색 결과로 받아온 places 배열을 활용하여 마커와 검색 결과 목록을 생성합니다.
// //         const map = centerMarker.getMap();
// //         const bounds = new kakao.maps.LatLngBounds();

// //         places.forEach((place) => {
// //             const marker = new kakao.maps.Marker({
// //             position: new kakao.maps.LatLng(place.y, place.x),
// //         });

// //         marker.setMap(map);

// //         // 새로운 마커들을 searchStaticMarkers 배열에 추가합니다.
// //         setSearchStaticMarkers((prevMarkers) => [...prevMarkers, marker]);

// //         // 검색 결과 목록을 생성하여 places_list에 추가합니다.
// //         const item = document.createElement('li');
// //         const title = document.createElement('h5');
// //         const info = document.createElement('p');
// //         title.textContent = place.place_name;
// //         info.textContent = place.address_name;
// //         item.appendChild(title);
// //         item.appendChild(info);
// //         item.addEventListener('click', () => {
// //             map.panTo(new kakao.maps.LatLng(place.y, place.x));
// //         });
// //         document.getElementById('places_list').appendChild(item);

// //         bounds.extend(new kakao.maps.LatLng(place.y, place.x));
// //     });

// //         // 검색 결과로 받아온 장소들이 모두 표시될 수 있도록 지도의 확대, 이동 조정
// //         map.setBounds(bounds);
// //     };

// //     return (
// //         <div className="map_wrap">
// //             <style>
// //             {`
// //                 .map_wrap,
// //                 .map_wrap * {
// //                     margin:0;
// //                     padding:0;
// //                     font-family:'Malgun Gothic', dotum,'돋움', sans-serif;
// //                     font-size:12px;
// //                 }
                
// //                 .map_wrap a,
// //                 .map_wrap a:hover,
// //                 .map_wrap a:active {
// //                     color: #cacaca;;
// //                     text-decoration: none;
// //                 }
                
// //                 .map_wrap {
// //                     position:relative;
// //                     width:100%;
// //                     height:800px;
// //                 }
                
// //                 #map_keyword {
// //                     width: 100px;
// //                     height: 20px;
// //                     padding: 10px;
// //                     font-size: 12px;
// //                     border: 1px solid #ccc;
// //                     border-radius: 5px;
// //                 }
                
// //                 #menu_wrap {
// //                     position:absolute;
// //                     top:0;
// //                     left:0;
// //                     bottom:0;
// //                     width:250px;
// //                     margin:10px 0 30px 10px;
// //                     padding:5px;
// //                     overflow-y:auto;
// //                     background:rgba(255, 255, 255, 0.7);
// //                     z-index: 1;
// //                     font-size:12px;
// //                     border-radius: 10px;
// //                 }
                
// //                 .bg_white {
// //                     background:#fff;
// //                 }
                
// //                 #menu_wrap hr {
// //                     display: block;
// //                     height: 1px;
// //                     border: 0;
// //                     border-top: 2px solid #5F5F5F;
// //                     margin:3px 0;
// //                 }
                
// //                 #menu_wrap .option{
// //                     position: relative;
// //                     text-align: center;
// //                 }
                
// //                 #menu_wrap .option p {
// //                     margin:10px 0;
// //                 }
                
// //                 #menu_wrap .option button {
// //                     margin: 2px, 3px, 2px, 5px;
// //                     padding: 10px 10px 10px 10px;
// //                     background-color: #ff6480;
// //                     color: #ffffff;
// //                     border: none;
// //                     border-radius: 3px;
// //                     cursor: pointer;
// //                 }
                
// //                 #menu_wrap .option button:hover {
// //                     background-color: #c28175;
// //                 }
                
// //                 #places_list li {
// //                     list-style: none;
// //                 }
                
// //                 #places_list .item {
// //                     position:relative;
// //                     border-bottom:1px solid #888;
// //                     overflow: hidden;
// //                     cursor: pointer;
// //                     min-height: 65px;
// //                 }
                
// //                 #places_list .item span {
// //                     display: block;
// //                     margin-top:4px;
// //                 }
                
// //                 #places_list .item h5, #places_list .item .info {
// //                     text-overflow: ellipsis;
// //                     overflow: hidden;
// //                     white-space: nowrap;
// //                 }
                
// //                 #places_list .item .info{
// //                     padding:10px 0 10px 55px;
// //                 }
                
// //                 #places_list .info .gray {
// //                     color:#8a8a8a;
// //                 }
                
// //                 #places_list .info .jibun {
// //                     padding-left:26px;
// //                     background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;
// //                 }
                
// //                 #places_list .info .tel {
// //                     color:#009900;
// //                 }
                
// //                 #places_list .item .markerbg {
// //                     float:left;
// //                     position:absolute;
// //                     width:36px;
// //                     height:37px;
// //                     margin:10px 0 0 10px;
// //                     background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
// //                 }
                
// //                 #places_list .item .marker_1 {
// //                     background-position: 0 -10px;
// //                 }
                
// //                 #places_list .item .marker_2 {
// //                     background-position: 0 -56px;
// //                 }
                
// //                 #places_list .item .marker_3 {
// //                     background-position: 0 -102px
// //                 }
                
// //                 #places_list .item .marker_4 {
// //                     background-position: 0 -148px;
// //                 }
                
// //                 #places_list .item .marker_5 {
// //                     background-position: 0 -194px;
// //                 }
                
// //                 #places_list .item .marker_6 {
// //                     background-position: 0 -240px;
// //                 }
                
// //                 #places_list .item .marker_7 {
// //                     background-position: 0 -286px;
// //                 }
                
// //                 #places_list .item .marker_8 {
// //                     background-position: 0 -332px;
// //                 }
                
// //                 #places_list .item .marker_9 {
// //                     background-position: 0 -378px;
// //                 }
                
// //                 #places_list .item .marker_10 {
// //                     background-position: 0 -423px;
// //                 }
                
// //                 #places_list .item .marker_11 {
// //                     background-position: 0 -470px;
// //                 }
                
// //                 #places_list .item .marker_12 {
// //                     background-position: 0 -516px;
// //                 }
                
// //                 #places_list .item .marker_13 {
// //                     background-position: 0 -562px;
// //                 }
                
// //                 #places_list .item .marker_14 {
// //                     background-position: 0 -608px;
// //                 }
                
// //                 #places_list .item .marker_15 {
// //                     background-position: 0 -654px;
// //                 }
                
// //                 #pagination {
// //                     margin:10px auto;text-align: center;
// //                 }
                
// //                 #pagination a {
// //                     display:inline-block;margin-right:10px;
// //                 }
                
// //                 #pagination .on {
// //                     font-weight: bold; cursor: default;color:#777;
// //                 }
// //                 `}
// //         </style>
// //         <div id="map" style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}></div>
// //             <div id="menu_wrap" className="bg_white">
// //                 <div className="option">
// //                     <div>
// //                         <div id="click_dynamic_markers"></div>
// //                         <form onSubmit={searchPlaces}>
// //                             <input type="text" placeholder="키워드" id="map_keyword" size="15" value={searchKeyword} onChange={handleKeywordChange} />
// //                             <button type="submit">검색</button>
// //                         </form>
// //                     </div>
// //                 </div>
// //                 <hr />
// //                 <ul id="places_list"></ul>
// //                 <div id="pagination"></div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MapPage;

// ///////////////////////////////////////////////////////////

// import { configureStore, createSlice } from '@reduxjs/toolkit';
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import LeftPart from './LeftPart';

// const historyKeywordsAddDelete = createSlice({
//     name: 'historyKeywords',
//     initialState: [],
//     reducers: {
//       addKeyword: (state, action) => {
//         state.push(action.payload);
//       },
//       deleteAllKeywords: (state) => {
//         state.length = 0;
//       },
//       deleteOneKeyword: (state, action) => {
//         return state.filter((keyword) => keyword !== action.payload);
//       },
//     },
//   });
  
//   export const { addKeyword, deleteAllKeywords, deleteOneKeyword } = historyKeywordsAddDelete.actions;
  
//   const historyKeywordsReducer = historyKeywordsAddDelete.reducer;
  
//   const store = configureStore({
//     reducer: {
//       historyKeywords: historyKeywordsReducer,
//     },
//   });

// // MainPage는 크게 세 부분으로 나뉨
// // LeftPart는 Left.js에 있으며, 왼쪽 사이드 바를 의미함
// // MiddlePart는 여기 App.js에 있으며, Flavor 로고와 검색 창(기록까지)을 묶어놓은 것을 의미함
// // RightPart도 여기 App.js에 있으며, 로그인 & 회원가입 버튼과 스위치 버튼을 함께 묶어놓은 것을 의미함

// function MainPage() {
//     const recentSearchBoxStyle = `
//       .no_recent_search {
//         /* "최신 검색어가 없습니다." 메시지에 대한 커스텀 스타일 */
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 100px; /* 필요에 따라 높이를 조정하세요 */
//         font-size: 20px; /* 필요에 따라 폰트 크기를 조정하세요 */
//         color: gray; /* 필요에 따라 색상을 조정하세요 */
//       }

//       .main_keyword_button {
//         position: absolute;
//         bottom: -200px;
//         left: 50%;
//         transform: translateX(-50%);
//       }
//     `;
  
//     const [isSwitchChecked, setSwitchChecked] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [map, setMap] = useState(null);

//     const navigate = useNavigate();

//     // const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);

//     // const toggleSearchBox = () => {
//     //   setSearchBoxVisible(!isSearchBoxVisible);
//     // };
  
//     const handleSwitchToggle = () => {
//       setSwitchChecked(!isSwitchChecked);
//       if (!isSwitchChecked) {
//         // requestUserLocation();
//         setShowPopup(true);
//       }
//     };

//     // 팝업창에서 지도를 생성하는 함수
//     const createMapInPopup = () => {
//       // Kakao Maps 스크립트를 동적으로 로드
//       const script = document.createElement('script');
//       script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAPS_APP_KEY';
//       script.async = true;
//       script.onload = () => {
//         const mapOptions = {
//           center: new window.kakao.maps.LatLng(37.5662952, 126.9779451), // 초기 지도 중심 좌표
//           level: 3, // 초기 줌 레벨
//         };

//         // 지도를 생성하고 팝업 내에 추가
//         const mapInstance = new window.kakao.maps.Map(
//           document.getElementById('popup_map'), // 팝업 내에 지도를 표시할 DOM 요소
//           mapOptions
//         );
//         setMap(mapInstance);
//       };
//       document.head.appendChild(script);
//     };

//     useEffect(() => {
//       createMapInPopup();
//     }, []);
  
//     // 위치 정보를 가져오고 지도의 중심을 사용자의 위치로 이동
//     // const requestUserLocation = () => {
//     //   if (navigator.geolocation && map !== null) {
//     //     navigator.geolocation.getCurrentPosition(
//     //       function (position) {
//     //         const latitude = position.coords.latitude;
//     //         const longitude = position.coords.longitude;

//     //         // 사용자의 위치로 지도의 중심을 설정
//     //         map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));

//     //         // 사용자의 위치를 표시하는 마커를 추가할 수도 있습니다
//     //         const userMarker = new window.kakao.maps.Marker({
//     //           position: new window.kakao.maps.LatLng(latitude, longitude),
//     //           map: map,
//     //           image: new window.kakao.maps.MarkerImage(
//     //             '사용자 마커 이미지 URL',
//     //             new window.kakao.maps.Size(24, 35),
//     //             {
//     //               offset: new window.kakao.maps.Point(12, 35),
//     //             }
//     //           ),
//     //         });

//     //         // 위도와 경도를 필요에 따라 사용합니다.
//     //         console.log(`사용자 위치: 위도 ${latitude}, 경도 ${longitude}`);
//     //       },
//     //       function (error) {
//     //         console.error('사용자 위치 가져오기 오류:', error.message);
//     //       }
//     //     );
//     //   } else {
//     //     console.error('귀하의 브라우저에서 Geolocation이 지원되지 않습니다.');
//     //   }
//     // };

//     const popupAgreeClick = () => {
//       // requestUserLocation();
//       setShowPopup(false);
//       setSwitchChecked(true);
//     };
  
//     const popupDisagreeClick = () => {
//       setShowPopup(false);
//       setSwitchChecked(false);
//     };
  
//     const setRandomFood = () => {
//       var foods = ["초밥", "돈까스", "냉모밀", "마라탕", "삼계탕", "치킨", "피자", "짜장면", "짬뽕", "탕수육", "떡볶이", "김치찌개", "부대찌개", "순두부찌개", "삼겹살",
//       "쫄면", "덮밥", "국수", "냉면", "곱창", "닭발", "족발", "보쌈", "스파게티", "스파게티", "찜닭", "갈비", "국밥", "제육볶음", "오징어볶음", "라면", "햄버거", "샌드위치",
//       "샐러드", "카레", "비빔밥", "김밥"];
//       var randomIndex = Math.floor(Math.random()*foods.length);
//       var inputField = document.getElementById("randomFood");
//       inputField.setAttribute("placeholder", "오늘의 추천 메뉴는 " + foods[randomIndex] + "입니다!");
//     };
  
//     const [keyword, setKeyword] = useState('');
//     const historyKeywords = useSelector((state) => state.historyKeywords);
//     // const [searchListHeight, setSearchListHeight] = useState(0); // 검색어 목록 높이 상태 추가
  
//     const dispatch = useDispatch();
  
//     const handleKeywordChange = (event) => {
//       setKeyword(event.target.value);
//     };
  
//     function handleKeywordSubmit() {
//       if (keyword.trim() !== '') {
//         dispatch(addKeyword(keyword));
//         setKeyword('');
//       }
//     };
  
//     const handleDeleteAllKeywords = () => {
//       dispatch(deleteAllKeywords());
//     };
  
//     const handleDeleteOneKeyword = (keyword) => {
//       dispatch(deleteOneKeyword(keyword));
//     };
    
//     // const renderSearchBox = () => {
//     //   if (isSwitchChecked && isSearchBoxVisible) {
//     //     return (
//     //       <div className="search_box_container">
//     //         <input type="text" className="search_box" id="randomFood" autoComplete="off" value={keyword} onChange={handleKeywordChange} onKeyUp={(event) => {
//     //             if (event.key === 'Enter' || event.target.classList.contains('search_icon')) {
//     //               handleKeywordSubmit();
//     //             }
//     //           }}
//     //         />
//     //         <ul className="keyword_list" style={{ maxHeight: `${searchListHeight}px` }}>
//     //           {historyKeywords.map((keyword) => (
//     //             <li key={keyword}>{keyword}</li>
//     //           ))}
//     //         </ul>
//     //       </div>
//     //     );
//     //   }
//     //   return null;
//     // };

//     const render = () => {
//       if (historyKeywords.length > 0) {
//         const recentKeywords = historyKeywords.slice(-10).reverse();
//         return (
//           <ul>
//             {recentKeywords.map((keyword) => (
//               <li key={keyword}>
//                 {keyword} <button onClick={() => handleDeleteOneKeyword(keyword)}>x</button>
//               </li>
//             ))}
//             {keyword.trim() !== '' && (
//               <li>
//                 {keyword} <button onClick={addKeywordToList}>x</button>
//               </li>
//             )}
//           </ul>
//         );
//       } else {
//         return (
//           <p className="no_recent_search">최신 검색어가 없습니다.</p>
//         );
//       }
//     };
  
//     // 검색어 추가 함수
//     const addKeywordToList = () => {
//       if (keyword.trim() !== '') {
//         dispatch(addKeyword(keyword));
//         setKeyword('');
//       }
//     };

//     const handleMainPageButtonClick = () => {
//       navigate('/keywordrecom');
//     }
    
//     return (
//       <div>
//         <head>
//           <meta charSet="UTF-8" />
//           <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
//           <title> 메인 화면 </title>
//           <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&display=swap" rel="stylesheet" />
//           <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
//           <style>{recentSearchBoxStyle}</style>
//         </head>
//         <body onLoad={setRandomFood}>
//           <LeftPart/>
//           {/* 메인 페이지의 로고, 검색 창 부분 */}
//           <div className="middle_part">
//             {/* 로고 */}
//             <button type="flavor_logo" className="flavor_logo">
//               <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="415" height="140" />
//             </button>
//             {/* 검색 부분 묶음 */}
//             <div className="search_part">
//               {/* 검색창 */}
//               <div className="search" id="search">
//                 <input type="text" className="search_box" id="randomFood" autoComplete="off" value={keyword} onChange={handleKeywordChange} onKeyUp={(event) => {
//                   if (event.key === 'Enter' || event.target.classList.contains('search_icon')) {
//                     handleKeywordSubmit();
//                   }
//                 }}/>
//                 {/* <div className="real_search_box" style={{ display: isSwitchChecked ? 'block' : 'none' }}> */}
//                   {/* 실제 검색 창 내용 */}
//                   {/* <input type="text" className="search_box" id="randomFood" autoComplete="off" value={keyword} onChange={handleKeywordChange}
//                     onKeyUp={(event) => {
//                       if (event.key === 'Enter' || event.target.classList.contains('search_icon')) {
//                         handleKeywordSubmit();
//                       }
//                     }}
//                   />
//                 </div> */}
//                 <button type="button" className="search_icon" onClick={handleKeywordSubmit}>
//                   <img src="https://cdn.icon-icons.com/icons2/1302/PNG/512/magnifyingglassbrowser_85768.png" className="srh_btn" width="24px" height="24px" />
//                 </button>
//               </div>
//             </div>
//             <div className="search_list">
//               {/* 추천 검색어 */}
//               <div className="suggested_search" id="suggested_search"></div>
//               {/* 최신 검색어 */}
//               {render()}
//             </div>
//             {/* 검색어 모두 지우기 */}
//             <div className="delete">
//               <button type="button" className="all_delete" onClick={handleDeleteAllKeywords}>모두 지우기</button>
//               <button type="button" className="keyword_delete" onClick={handleDeleteOneKeyword}></button>
//             </div>
//           </div>
//           <div className="main_button">
//             <button className="main_keyword_button" onClick={handleMainPageButtonClick}>중앙 버튼</button>
//           </div>
//           {/* 메인 페이지의 스위치, 로그인, 회원가입 부분 */}
//           <div className="right_part">
//             {/* 스위치 */}
//             <div className="switch">
//               <input type="checkbox" id="sw_btn" checked={isSwitchChecked} onClick={handleSwitchToggle} />
//               <label htmlFor="sw_btn" className="switch_label">
//                 <span className="onf_btn"></span>
//               </label>
//             </div>
//             <ul className="login_and_register">
//               <li><Link to="/login" className="lar">로그인</Link></li>
//               <li><Link to="/signup" className="lar">회원가입</Link></li>
//             </ul>
//           </div>
//           {/* 위치 수신 동의 팝업창 */}
//           {showPopup && (
//             <div className="popup_box" id="popup_box">
//               {/* 팝업창 내용 */}
//               <div className="popup_content">
//                 <div className="popup_text">'Flavor'이 사용자의 위치에 접근하도록 허용하시겠습니까?</div>
//                 <div className="mini_map" id="mini_map"></div>
//                 <div className="popup_actions">
//                   <button className="popup_agree" onClick={popupAgreeClick}>허용</button>
//                   <button className="popup_disagree" onClick={popupDisagreeClick}>비허용</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </body>
//       </div>
//     );
//   }

//   export default MainPage;