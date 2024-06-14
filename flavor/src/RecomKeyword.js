import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecomKeyword = () => {
  const [selectedSex, setSelectedSex] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedMd, setSelectedMd] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [restaurantName, setRestaurantName] = useState(''); // 변경된 부분
  const [moodName, setMoodName] = useState(''); // 변경된 부분
  
  const handleSexClick = (sex) => {
    setSelectedSex((prev) => (prev === sex ? null : sex));
  };

  const handleAgeClick = (age) => {
    setSelectedAge((prev) => (prev === age ? null : age));
  };

  const handleTypeClick = (type) => {
    setSelectedType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : prev.length < 3 ? [...prev, type] : prev
    );
  };

  const handleMdClick = (md) => {
    setSelectedMd((prev) =>
      prev.includes(md) ? prev.filter((m) => m !== md) : prev.length < 3 ? [...prev, md] : prev
    );
  };

  useEffect(() => {
    if (selectedMd.length > 0) {
      console.log('sM: ', selectedMd);
    }
  }, [selectedMd]);

  const handleCompleteClick = async () => {
    try {
      if (!selectedSex || !selectedAge || selectedType.length === 0 || selectedMd.length === 0) {
        setSelectedKeywords('모든 항목을 선택해야 합니다.');
        return;
      }

      if (selectedType.length > 3 || selectedMd.length > 3) {
        setSelectedKeywords('음식 종류나 분위기는 최대 3개까지 선택할 수 있습니다.');
        return;
      }

      const keywords = [
        selectedSex,
        selectedAge,
        ...selectedType.filter(Boolean), // 빈 문자열 제거
        ...selectedMd.filter(Boolean), // 빈 문자열 제거
        selectedKeywords
      ].filter((keyword) => keyword !== null && keyword !== undefined);
      

      if (keywords.length === 0) {
        setSelectedKeywords('키워드를 입력해주세요!');
      } else {
        const typeConditions = selectedType.length > 0 ? `type IN ('${selectedType.join("','")}')` : '';
        const mdConditions = selectedMd.length > 0 ? `md IN ('${selectedMd.join("','")}')` : '';

        const whereClause = [typeConditions, mdConditions].filter(Boolean).join(' AND ');

        const url = `http://localhost:3001/recomkeyword?keywords=${keywords.join(',')}&conditions=${whereClause}&restaurantName=${restaurantName}&moodName=${moodName}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('서버 응답이 실패했습니다. 상태 코드:', response.status, '에러 메시지:', errorText);
          throw new Error('서버 응답이 실패했습니다.');
        }

        console.log('keywords:', keywords);
        console.log('whereClause:', whereClause);

        const recommendedFoods = await response.json();
        console.log('API 호출 후 추천된 음식점:', recommendedFoods);

        if (!recommendedFoods.foodResults || !Array.isArray(recommendedFoods.foodResults)) {
          console.error('유효하지 않은 응답 구조입니다. "foodResults" 속성이 배열이어야 합니다.');
          // 이 경우를 적절히 처리하세요
          return;
        }

        // const mdPromises = recommendedFoods.foodResults.map(async (food) => {
        //   try {
        //     const mdResponse = await fetch(`http://localhost:3001/getMoods/${food.id}`, {
        //       method: 'GET',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       credentials: 'include',
        //     });

        //     if (!mdResponse.ok) {
        //       throw new Error(`음식점 ${food.id}의 분위기 정보를 가져오는데 실패했습니다. 상태 코드: ${mdResponse.status}`);
        //     }

        //     const mdData = await mdResponse.json();
        //     return { ...food, mds: mdData };
        //   } catch (error) {
        //     console.error(`음식점 ${food.id}에서 에러 발생:`, error);
        //     throw error; // 에러를 다시 throw하여 Promise.reject가 호출되도록 함
        //   }
        // });

        // const foodsWithMds = await Promise.all(mdPromises);
        // setFoodData(foodsWithMds);
      }
    } catch (error) {
      console.error('음식점 추천 요청 에러:', error);
      setSelectedKeywords('서버 에러가 발생했습니다.');
    }
  };

  return (
    <div>
      <style>
      {`
        .flavor_logo {
          display: block;
          margin: 0 auto;
          margin-top: 20px;
          margin-bottom: 40px;
          }

        .keyword_list_box,
        .game_button {
          margin-left: 100px;
        }
      
        .keyword_button {
          background-color: gray;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          margin: 5px;
          cursor: pointer;
        }
      
        .keyword_button.active {
          background-color: black;
        }

        .keyword_button:hover {
          background-color: lightgray;
        }

        .select_button {
          top: 10px;
          margin-bottom: 30px;
        }
      
        .submit_button,
        .foodworldcup_button,
        .roulette_button {
          background-color: #ff6480;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          margin: 5px;
          cursor: pointer;
        }

        .separator {
          width: 540px;
          height: 2px;
          background-color: #ccc;
          margin: 6px;
        }
      `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="415" height="140" alt="flavor_logo" />
        </button>
      </Link>
      <div className="keyword_list_box">
      <h2>키워드 추천</h2>
      <div className="keyword_list_sex">
        <button className={`keyword_button ${selectedSex === '남자' ? 'active' : ''}`}
          onClick={() => handleSexClick('남자')}> 남자 </button>
        <button className={`keyword_button ${selectedSex === '여자' ? 'active' : ''}`}
          onClick={() => handleSexClick('여자')}> 여자 </button>
      </div>
      <div className="separator"></div>
      <div className="keyword_list_age">
        <button className={`keyword_button ${selectedAge === '10대' ? 'active' : ''}`}
          onClick={() => handleAgeClick('10대')}> 10대 </button>
        <button className={`keyword_button ${selectedAge === '20대' ? 'active' : ''}`}
          onClick={() => handleAgeClick('20대')}> 20대 </button>
        <button className={`keyword_button ${selectedAge === '30대' ? 'active' : ''}`}
          onClick={() => handleAgeClick('30대')}> 30대 </button>
        <button className={`keyword_button ${selectedAge === '40대' ? 'active' : ''}`}
          onClick={() => handleAgeClick('40대')}> 40대 </button>
      </div>
      <div className="separator"></div>
      <div className="keyword_list_type">
        {['한식', '중식', '일식', '양식', '패스트푸드', '분식', '기타'].map((type) => (
          <button key={type} className={`keyword_button ${selectedType.includes(type) ? 'active' : ''}`}
            onClick={() => handleTypeClick(type)}> {type} </button>
        ))}
      </div>
      <div className="separator"></div>
      <div className="keyword_list_md">
        {['#분위기좋은', '#깨끗한', '#저렴한', '#넓은', '#혼밥하기좋은', '#조용한', '#푸짐한', '#시끌벅적한', '#포장', '#배달'].map((md) => (
          <button key={md} className={`keyword_button ${selectedMd.includes(md) ? 'active' : ''}`}
            onClick={() => handleMdClick(md)}> {md} </button>
        ))}
      </div>
      <div className="select_button">
        <button className="submit_button" onClick={handleCompleteClick}>완료</button>
        {foodData.length > 0 && (
          <div>
            <h3>음식점 리스트</h3>
            <ul>
              {foodData.map((food, index) => (
                <li key={index}>
                <strong>{food.title}</strong> ({food.type})
                <br />
                전화번호: {food.phone_number}<br />
                대표 메뉴: {food.menu}<br />
                주소: {food.address}<br />
                {food.mds.map(md => md.name).join(', ')}<br />
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedKeywords && <p>{selectedKeywords}</p>}
      </div>
    </div>
</div>
  );
}

export default RecomKeyword;