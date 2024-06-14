import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Weather = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = '87d2f57ca24ab7697c385e1b5634b562';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('날씨 정보를 가져오는 중 오류가 발생했습니다.', error);
        setLoading(false);
      });
  }, [latitude, longitude]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  const { main, weather, wind } = weatherData;
  const temperature = main.temp - 269.95;

  let recommendedMenu = '';
  if (weather[0].main === 'Rain') {
    recommendedMenu = '파전';
  } else if (temperature >= -10 && temperature < 15) {
    const menuOptions = ['우동', '순두부찌개', '부대찌개', '된장찌개', '김치찌개', '감자탕', '조개전골', '어묵탕', '만두', '국수',
  '카레', '죽', '해물탕', '삼계탕', '갈비탕', '닭볶음탕', '라면', '칼국수', '떡볶이'];
    const randomIndex = Math.floor(Math.random() * menuOptions.length);
    recommendedMenu = menuOptions[randomIndex];
  } else if (temperature >= 15 && temperature < 30) {
    const menuOptions = ['초밥', '국수', '쫄면', '돈까스', '버거', '샐러드', '타코', '스테이크', '그라탕', '파스타'];
    const randomIndex = Math.floor(Math.random() * menuOptions.length);
    recommendedMenu = menuOptions[randomIndex];
  } else if (temperature >= 30) {
    const menuOptions = ['냉면', '콩국수', '삼계탕', '비빔면', '샐러드', '냉우동', '냉모밀', '샌드위치'];
    const randomIndex = Math.floor(Math.random() * menuOptions.length);
    recommendedMenu = menuOptions[randomIndex];
  } else if (wind.speed >= 10) {
    recommendedMenu = '고기';
  }

  return (
    <div>
      <style>
        {`
        .flavor_logo {
          display: block;
          margin: 0 auto;
          margin-bottom: 10px;
        }

        .container {
          top: 10px;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f0f0f0;
          border-radius: 10px;
          text-align: center;
        }
        
        .header {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .container p {
          font-size: 20px;
          margin: 4px 0px 8px 0px;
        }

        .recommended-menu {
          font-size: 20px;
          margin-bottom: 2px;
          font-weight: bold;
          color: #ff6480;
        }

        .question {
          margin: 70px 0px 40px 0px;
          text-align: center;
        }

        .buttons {
          text-align: center;
        }

        .foodworldcup,
        .roulette {
          margin: 10px 20px 0px 20px;
          padding: 12px 20px;
          font-size: 20px;
          background-color: #ffb4bc;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      <div className="container">
        <h2 className="header">신창 날씨 정보</h2>
        <p>기온: {temperature.toFixed(1)}°C</p>
        <p>날씨: {weather[0].description}</p>
        <p>풍속: {weatherData.wind.speed} m/s</p>
        <p>풍향: {weatherData.wind.deg}°</p>
        <p>습도: {weatherData.main.humidity}%</p>
        <p>구름: {weatherData.clouds.all}%</p>
        {weatherData.rain && <p>비: {weatherData.rain['1h']}mm</p>}
        <p>일출 시간: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>일몰 시간: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        <br />
        <h2 className="header">오늘의 추천 메뉴</h2>
        <p className="recommended-menu">{recommendedMenu}</p>
      </div>
      <h2 className="question">음식 추천 받으러 가고 싶다면?</h2>
      <div className="buttons">
        <Link to="/foodworldcup">
          <button className="foodworldcup">음식 월드컵 하러 가기</button>
        </Link>
        <Link to="/recomrandom">
          <button className="roulette">룰렛 하러 가기</button>
        </Link>
      </div>
    </div>
  );
};

export default Weather;