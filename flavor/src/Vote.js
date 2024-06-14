import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Vote = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [favoriteRestaurant, setFavoriteRestaurant] = useState('');

  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleFavoriteFoodChange = (event) => {
    setFavoriteFood(event.target.value);
  };

  const handleFavoriteRestaurantChange = (event) => {
    setFavoriteRestaurant(event.target.value);
  };

  const fetchVote = async () => {
    const userData = {
      userGender: gender,
      userAge: age,
      userFavoriteFood: favoriteFood,
      userFavoriteRestaurant: favoriteRestaurant,
    };
  
    try {
      const response = await fetch('http://localhost:3001/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const responseData = await response.json();
      console.log(responseData);

      alert('설문에 응답해주셔서 감사합니다.');
      navigate('/');
    } catch (error) {
      console.error('투표 데이터 전송 중 오류:', error);
    }
  };

  return (
    <div>
      <style>
        {`
        .flavor_logo {
          display: block;
          margin: 0 auto;
          margin-bottom: 10px;
        }

        .box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .content_gender,
        .content_age,
        .content_food,
        .content_rest {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          border: 2px solid #ffcbd1;
          padding: 20px;
          width: 410px;
          min-height: 80px;
          border-radius: 10px;
        }

        .content_gender label,
        .content_age label,
        .content_food label,
        .content_rest label {
          top: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 5px 2px 5px 2px;
        }

        .content_gender input,
        .content_age input,
        .content_food input,
        .content_rest input,
        .content_food textarea,
        .content_rest textarea {
          display: block;
          margin-top: 10px;
        }

        .content_gender .gender,
        .content_age .age {
          top: -4px;
          margin-right: 5px;
        }

        .content_food textarea,
        .content_rest textarea {
          display: block;
          margin-top: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          transition: border-color 0.3s ease;
          resize: none;
        }

        .content_food textarea:focus,
        .content_rest textarea:focus {
          outline: none;
          border-color: #ff6480;
        }

        .submit_button {
          background-color: #ff6480;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          margin: 5px;
          cursor: pointer;
        }
        `}
      </style>

      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      <div className="box">
        <div className="content_gender">1. 성별을 선택해주세요.
          <label>
            <input className="gender" type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} /> 남자
          </label>
          <label>
            <input className="gender" type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} /> 여자
          </label>
        </div>
        <div className="content_age"> 2. 나이를 선택해주세요.
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Array.from({ length: 12 }, (_, index) => (
              <label key={index} style={{ display: 'flex', alignItems: 'center', width: '25%' }}>
                <input className="age" type="radio" name="age" value={index === 11 ? 'professor' : 20 + index}
                  checked={age === (index === 11 ? 'professor' : `${20 + index}`)}
                  onChange={handleAgeChange} /> {index === 11 ? '30세 초과' : `${20 + index}세`}
              </label>
            ))}
          </div>
        </div>
        <div className="content_food">
          3. 좋아하는 음식을 말씀해주세요.
          <textarea value={favoriteFood} onChange={handleFavoriteFoodChange} />
        </div>
        <div className="content_rest">
          4. 좋아하는 음식점을 말씀해주세요. (신창 주변)
          <textarea value={favoriteRestaurant} onChange={handleFavoriteRestaurantChange} />
        </div>
        <button className="submit_button" onClick={fetchVote}>완료</button>
      </div>
    </div>
  );
};

export default Vote;
