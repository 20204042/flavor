import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const RecomRandom = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isRestListVisible, setIsRestListVisible] = useState(false);
  const canvasRef = useRef(null);
  const lineRef = useRef(null);
  const MAX_ITEMS_PER_ROW = 2;

  const product = [
    '떡볶이', '부대찌개', '고기', '부리또', '김치찌개', 
    '밀면', '칼국수', '닭볶음탕', '김밥', '콩불', 
    '카레', '보쌈', '제육볶음', '짜장면', '샐러드', 
    '마라탕', '양꼬치', '토스트', '빵', '오리고기',
    '라면', '돈가스', '피자', '냉면', '샌드위치', 
    '치킨', '족발', '갈비탕', '파스타', '비빔밥',
    '곱창', '햄버거', '김치찜', '김피탕', '도시락',
    '닭갈비', '순대국밥', '막창', '연어덮밥', '탕수육'
  ];

  const fetchMenuInfo = async (menu) => {
    try {
      const response = await fetch(`http://localhost:3001/recomrandom?name=${encodeURIComponent(menu)}`);
      const data = await response.json();
  
      if (Array.isArray(data) && data.length > 0) {
        return data;
      } else if (data && !data.error) {
        return [data];
      } else {
        console.error('서버에서 오류 응답:', data.error);
        return null;
      }
    } catch (error) {
      console.error('메뉴 세부 정보를 가져오는 중 오류 발생:', error);
      return null;
    }
  };

  const rotate = useCallback(async () => {
    const $c = canvasRef.current;
    $c.style.transform = 'initial';
    $c.style.transition = 'initial';

    setIsRestListVisible(false);

    setTimeout(async () => {
      const ran = Math.floor(Math.random() * product.length);
      const selectedValueIndex = (ran - 8 + product.length) % product.length;
      const selectedValue = product[selectedValueIndex];

      const arc = 360 / product.length;
      const rotate = ran * arc + 3600 + arc * 3 - arc / 4;

      $c.style.transform = `rotate(-${rotate}deg)`;
      $c.style.transition = '2s';

      const selectedMenuDetails = await fetchMenuInfo(selectedValue);

      if (selectedMenuDetails && selectedMenuDetails.error) {
        console.error('서버에서 오류 응답:', selectedMenuDetails.error);
      } else {
        setSelectedMenu(selectedMenuDetails);
        setSelectedValue(selectedValue);
      }

      setTimeout(() => setIsModalOpened(true), 3000);
    }, 1);
  }, [product, setSelectedMenu, setIsModalOpened]);

  useEffect(() => {
    const $c = canvasRef.current;
    const ctx = $c.getContext('2d');

    const colors = [
      '#dc0936', '#e6471d', '#f7a416', '#efe61f', '#60b236',
      '#209b6c', '#169ed8', '#3f297e', '#87207b', '#be107f', '#e7167b',
    ];

    const newMake = () => {
      const [cw, ch] = [$c.width / 2, $c.height / 2];
      const arc = Math.PI / (product.length / 2);

      for (let i = 0; i < product.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i % (colors.length - 1)];
        ctx.moveTo(cw, ch);
        ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
        ctx.fill();
        ctx.closePath();
      }
      
      ctx.fillStyle = '#000';
      ctx.font = '18px Pretendard';
      ctx.textAlign = 'center';

      for (let i = 0; i < product.length; i++) {
        const angle = arc * i + arc / 2;

        ctx.save();

        ctx.translate(
          cw + Math.cos(angle) * (cw - 50),
          ch + Math.sin(angle) * (ch - 50),
        );

        ctx.rotate(angle + Math.PI / 2);

        product[i].split('').forEach((text, j) => {
          ctx.fillText(text, 0, 30 * j);
        });

        ctx.restore();
      }
    };

    newMake();

    const lineCanvas = lineRef.current;
    const lineCtx = lineCanvas.getContext('2d');
    lineCtx.beginPath();
    lineCtx.strokeStyle = "#000";
    lineCtx.lineWidth = 50;
    lineCtx.lineCap = "round";
    lineCtx.moveTo(100, 0);
    lineCtx.lineTo(0, 5);
    lineCtx.stroke();
    lineCtx.closePath();
  }, [product]);

  useEffect(() => {
    const restListTimeoutId = setTimeout(() => {
      setIsRestListVisible(true);
    }, 4000);

    return () => {
      clearTimeout(restListTimeoutId);
    };
  }, [setIsRestListVisible]);

  const closeModal = () => {
    setIsModalOpened(false);
    setIsRestListVisible(true);
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      width: '400px',
      height: '150px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  const blurStyle = isModalOpened ? { filter: 'blur(5px)' } : {};

  Modal.setAppElement('#root');

  return (
    <div>
      <style>
        {`
          @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

          * {
            font-family: Pretendard;
          }
        
          .container {
            display: flex;
          //   justify-content: space-between;
          //   width: 1200px;
          //   margin: 0 auto;
          }
        
          .all_box {
            width: 380px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 30px 150px 0 280px;
          }
        
          .flavor_logo {
            margin-bottom: 10px;
          }
        
          .random_button {
            margin-top: 20px;
            background: #ff6480;
            padding: .8rem 1.8rem;
            border: none;
            font-size: 1.5rem;
            color: #f9f9f9;
            border-radius: 5px;
            transition: .2s;
            cursor: pointer;
          }
        
          .random_button:hover {
            background: #c24e63;
          }
        
          .random_button:active {
            background: #f798a9;
          }
        
          .lineCanvas {
            position: absolute;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
          }
        
          .rest_list {
            padding: 20px;
            width: 800px;
            height: 300px;
            display: inline-block;
            vertical-align: top;
            margin: 30px 200px 0 0;
          }
        
          .rest_list h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
        
          .rest_box {
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px;
            margin: 10px 10px 10px 10px;
            width: 330px;
          }

          .rest_info {
            padding-left: 5px;
          }

          .rest_info h3 {
            font-size: 20px;
            margin-bottom: 5px;
          }

          .rest_info p {
            font-size: 16px;
            margin: 5px 0;
          }
        `}
      </style>
      <div style={blurStyle}>
        <div className="container">
          <div className="all_box">
            <Link to="/">
              <button type="flavor_logo" className="flavor_logo">
                <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
              </button>
            </Link>
            <canvas ref={canvasRef} width="500" height="500"></canvas>
            <canvas ref={lineRef} className="lineCanvas" width="10" height="50"></canvas>
            <button className="random_button" onClick={rotate}>룰렛 돌리기</button>          
          </div>
          <div className="rest_list">
            {selectedMenu && isRestListVisible && (
              <div>
                <h1>음식점 리스트</h1>
                {Array.isArray(selectedMenu) && selectedMenu.length > 0 ? (
                  <div>
                    {selectedMenu.map((menuInfo) => (
                      <div key={menuInfo.title} className="rest_box">
                        <div className="rest_info">
                          <h3>{menuInfo.title}</h3>
                          <p>종류: {menuInfo.type}</p>
                          <p>대표 메뉴: {menuInfo.menu}</p>
                          <p>전화번호: {menuInfo.phone_number}</p>
                          <p>주소: {menuInfo.address}</p>
                        </div>
                      </div>
                    )).reduce((rows, item, index) => {
                      const rowIndex = Math.floor(index / MAX_ITEMS_PER_ROW);
                      if (!rows[rowIndex]) {
                        rows[rowIndex] = [];
                      }
                      rows[rowIndex].push(item);
                      return rows;
                    }, []).map((row, rowIndex) => (
                      <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {row}
                      </div>
                    ))}
                  </div>
                ) : (
                  selectedMenu[0] && (
                    <div className="rest_box">
                      <div className="rest_info">
                        <h1>음식점 리스트</h1>
                        <h3>{selectedMenu[0].title}</h3>
                        <p>종류: {selectedMenu[0].type}</p>
                        <p>대표 메뉴: {selectedMenu[0].menu}</p>
                        <p>전화번호: {selectedMenu[0].phone_number}</p>
                        <p>주소: {selectedMenu[0].address}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
        <Modal
          isOpen={isModalOpened}
          onRequestClose={closeModal}
          contentLabel="Menu Details Modal"
          style={modalStyle}
        >
          <div style={modalStyle}>
            <p style={{fontSize: '18px' }}>
              {selectedMenu && <p>오늘의 추천 메뉴는 <span style={{ fontWeight: 'bold', fontSize: '25px' }}>'{selectedValue}'</span>입니다!</p>}
            </p>
          </div>
        </Modal>
    </div>
  );
};

export default RecomRandom;