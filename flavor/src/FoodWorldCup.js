import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const items = [
  { name: "버거", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjFfMTM0%2FMDAxNjkyNjAwODg4NDc5.lqsy_t5d5lO--dJjtNhxFYxQznnVUTax_Ac4-OcVipUg.Hj08dmfTCbphTp5Ra-8Ptt3C1bD9kTJkZHQK4N_TWVgg.JPEG.lastlune%2FIMG_4452.jpg&type=sc960_832",},
  { name: "치킨", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MTRfMTA5%2FMDAxNjk0NjU2Mzg2MDI0.gs2kR7oePgfr7d8eYo2LMQiyd0oeiy0n1ETX6Uvdn-Ig.nx--zSYvCbHXBnQdUH2Z-RWYiMAdCgC0EeUjLdi4wsUg.PNG.mjmj0906%2Fimage.png&type=sc960_832",},
  { name: "볶음밥", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDZfMjY4%2FMDAxNjkzOTUyOTczNTQ2.Flz8BbXlch7ZeZrdWg_-3EOcdl_jdObuF7hjD_a1YTog.xwKiKAw_xTkrakrVltO9DZMqOGgECbzYT9bBe-RGaeEg.JPEG.dew36%2F17.jpg&type=sc960_832",},
  { name: "파스타", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDJfMTgx%2FMDAxNjkzNjQ3MTE1MzM4.AoavkMYPp_XgfL7DYpLw9Aoiq8UBqUq25sEKziHgz7kg.F1jnhbcWXR25KAegBfKie-98qJllW2yevHjbX6IyFv4g.JPEG.yw0w_%2F20230827%25A3%25DF140644.jpg&type=sc960_832",},
  { name: "라면", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MTVfMjk2%2FMDAxNjk0NzQ0OTM4NzY5.-bYB7BlYXl0BJ8J0mV-HQN3W9cvv5-LPXwisBugP3wAg.y4n5MNjcMJBPXhqXXIFhj7GCJOvw15eypSFosAoRGBUg.PNG.pet2114%2F20230915_112747.png&type=sc960_832",},
  { name: "돈가스", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjVfMTU3%2FMDAxNjkyOTczNDU1NzI0.Lyd-q_h-XV3c90P-X5oK5_fNMmsgR-bfytKV2Gay590g.4zJM_mV1GK_Fh2ttYOfZma31jfYjE4b0D4GfqAvQ2Sgg.JPEG.sun_hee128%2FIMG_5316.jpg&type=sc960_832",},
  { name: "삼겹살", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjlfNjQg%2FMDAxNjkzMjgxMjkwODY5.7GCPjIzGifVNyySJpNjiRlC3dDA1LwaVpdFlz2iFmfwg.akkotk-bix1yZnYoh2owI4EzmIY918kgMS3EJVxCgkQg.JPEG.hhgt6212%2F20230824%25A3%25DF190446.jpg&type=sc960_832",},
  { name: "곱창", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjlfNDkg%2FMDAxNjkzMjg0ODk1Nzk0.Xa58Yo2qMsx6zTar5jFxWR9rxU_skumgm_HG75hxZ6Mg.pdgWeTP7gI-4nFaTxtQCbyBq6xqWukHHW1zOL0eUQqMg.JPEG.gywn224%2FKakaoTalk_20230829_085602063_01.jpg&type=sc960_832",},
  { name: "피자", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjhfMjkw%2FMDAxNjkzMjI1MzQzNTky.BxxP0n2qZ-M6YDN53kYVLtjUy8y5O5LngFDAxJc3tbwg.D0lJXDUJTjktdOR2DfwuQ3ezsnCLPpRZEacc0-s1ql4g.JPEG.cjfcjf8080%2FKakaoTalk_20230822_215935564_10.jpg&type=sc960_832",},
  { name: "닭갈비", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MzBfMTI0%2FMDAxNjkzMzUxODE0NTYw.dKzdJl3UwtVvDbnZkDd5e-Fg0omd2PdhwcDxhCqVbcsg._AzqKLn5Ovgsw_5M56hnY-TPIKXk31STCzIa71Epg3Ag.JPEG.skkim3378%2F20230826%25A3%25DF170541.jpg&type=sc960_832",},
  { name: "김치찌개", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MTZfMTIx%2FMDAxNjk0Nzk2MDQ5NjYz.Bz_rUxa_kuZ3HSp5pqmfHNdnHJDu8qnE_zXYWhrMXagg.-aMom5q6PxTSnx23pe_fvjAINLCrqst4U0I2WZcG538g.JPEG.cutesiwoo%2F7748412.JPG&type=sc960_832",},
  { name: "제육", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMjhfMjQ5%2FMDAxNjc0OTEyOTYxNzQy.rttLuMlwsLg6ZK3Vm7FY5VRRLKxReiAu0_7Hu3X20JUg.f02zsowJn94RdMr7V69NLd90oVBatuPxMXon2k6RCoEg.JPEG.dbwjcodbf12%2FKakaoTalk_20230128_215209019_05.jpg&type=sc960_832",},
  { name: "짜장면", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MTNfMzEg%2FMDAxNjk0NTg3Nzc5MzE4.O6TDg8NlFSHFW-TCtIeE0nxgBI9vqIofN40fDazd254g.CA6kGzfUlX6YWfaBBHoS_qiiJgPUcZXe7Y7Nf_p-yPQg.PNG.sho9970%2Fimage.png&type=sc960_832",},
  { name: "마라탕", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MDVfMTQw%2FMDAxNjg1ODkxODA3NzIx.xQE82AAyZPfYQkvTOz4-d-aYMHUqnIlnqbB_Nqr3kWMg.dlr8s5fybwnWPmLBaRCqeSqaqvuvf5TL4gpzg73qbXcg.JPEG.yein7940%2F20230604%25A3%25DF162105.jpg&type=sc960_832",},
  { name: "양꼬치", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MThfMjU5%2FMDAxNjkyMzMyNDc2MTk4.1vRBzNu-mlh9nHOt6kW5CkvrBRsNeA7_RAE7iQQs2fkg.WjAE6ltmim-6CrGxvWhty-8XwiZs6yFWwlChZd7C4V4g.JPEG.joming123%2FKakaoTalk_20230817_171023443.jpg&type=sc960_832",},
  { name: "탕수육", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MzBfMTM4%2FMDAxNjkzNDA0MDk1NjYw.BOCD3DqNpvEBg3ssV-7iSjJ3m7VU-p0xjjU3gHaebbYg.tsI71BfK0Svlxh4T0IpZmo79Y59H3omCMx_38EOR7ZUg.JPEG.ksora91%2FIMG_8138.JPG&type=sc960_832",},
  { name: "라멘", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDlfMTQz%2FMDAxNjk0MjU1MzgxOTI1.5Xa6gzRQVT6K5IvGfkg66wp5FxPDxLKestIv7PhirRcg.sHPC3e7bwr8lJzEOen-UD5yHRC2D-3gGaFyrfuSxECog.JPEG.mindsprin%2F%25B7%25CE%25C1%25F6%25B6%25F3%25B8%25E0%25BD%25BA%25C5%25C4%25B5%25E5_%25B5%25B7%25C4%25DA%25C3%25F72.jpg&type=sc960_832",},
  { name: "덮밥", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDFfOTUg%2FMDAxNjkzNTQ0ODU1MDYy.PyHwGKtOBFCT0csRwgJRXkbEuGK0tpUXTsTzTTW0z6gg.dmwN0BDOzPRvdi9jR_7lep-yV6RddfQ1utzGLMz5Ch0g.JPEG.jjw_1117%2FIMG_5345.JPG&type=sc960_832",},
  { name: "떡볶이", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjZfNTIg%2FMDAxNjk1NzE3MTUyOTc5.efZLjS31_77F62qLfBSuFY3o97sgpY8Y3vHg1_a4rDwg.nyveKtLnVeSJhXRRdJujIVp0fglvWv96p3VXiq-vYw4g.JPEG.songsunsook1003%2F20230921%25A3%25DF111923.jpg&type=sc960_832",},
  { name: "김밥", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjVfMTYg%2FMDAxNjkyOTMyNDA0Mjc2.LuSyvw_tD6P5vCyuiQRBB5dRQoPtFY4ZPLBo9wYNktsg.zVGRoMWVQSiAkGuPC_hdX4gQnHXcn91dip-LUKpan54g.JPEG.hnewskr%2FUntitled-1_copy.jpg&type=sc960_832",},
  { name: "초밥", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDZfMTYz%2FMDAxNjk0MDAyOTI4OTk0.NSFB1F60a5RQIUJOX9j1tkzuUQpR2PDi8QE64nlE7s0g.h9ZorDEop9M3YZeT4rI4SFCJW_mZmCwowE2lOCj3nO8g.JPEG.mukguni%2Foutput_591535258.jpg&type=sc960_832",},
  { name: "국밥", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjRfMTU2%2FMDAxNjkyODM3NTE0MDkw.v6pbLNiKQrqC7uMqM2u1FlcsS7hVgxtQY1fERL8Y9wAg.ANExIcUvlS38TE8XdhAg-kMa_f7u0vhuQyG-ss4hEDQg.JPEG.eub8941%2FKakaoTalk_20230824_084626700_13.jpg&type=sc960_832",},
  { name: "족발", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDRfMjAz%2FMDAxNjkzODE2MDA1NDU0.h4bbDR4c8gIe7AYVEcukIFip--2V0IgH6au-DK82KP4g.hPrAOqXg1b5MELHUeVpPdz41VBCwK0lHv5MLCIbOvVgg.JPEG.mushroom928%2FIMG_4946.JPG&type=sc960_832",},
  { name: "닭발", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20201119_37%2F1605755864272zsBdD_JPEG%2F6891647975082601_834208670.jpg&type=sc960_832",},
  { name: "찜닭", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MThfMjU1%2FMDAxNjkyMzY2NDQ5Mzg5.QQwLX6PNnEtB7Lj98kvj3ggsCJF4tOX4MyaYa1wNxUIg.U1H5VXfzDQ40PuOPq7Q8trm2gTnN0YFq6PrleFqYtWwg.JPEG.dreamplaye%2F20230817%25A3%25DF124113.jpg&type=sc960_832",},
  { name: "샌드위치", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDZfMTI4%2FMDAxNjkzOTg5NjE1NTg4.5UtwjYCNEIi6ttBxSPTdOPv-Kh62yz4F6KIf_jDppbUg.82Ce741hFBpL8LYF7tCEPJjq1jwNNhI1RbkruyecgfEg.JPEG.bae_gaeul%2FIMG_4656.jpg&type=sc960_832",},
  { name: "스테이크", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2023_09_12_811%2F572df4ee-5135-11ee-8608-a0369ffb31a0_01.jpg&type=sc960_832",},
  { name: "국수", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MTFfMTM3%2FMDAxNjk0Mzg4NDg2MDY2.0WL58Cnb20lOgrTAo9FeeQFPPmGl0zIoVBtb7pl9HQIg.Suu_vYLnytXak8NcbXwCgJTrRR6eCtC6hSiHXQ-FXKsg.JPEG.53586559%2FKakaoTalk_20230911_081107380_21.jpg&type=sc960_832",},
  { name: "전", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjhfMjkx%2FMDAxNjk1ODc1MDUyMTIy.tTfikESRgcZ2Y93opb9ttATwHBI5nBrx9YG4uUKE_nQg.34Lu9b70ObGyH7oAbhh6miLkw1B5ucvEzcv-utBHpBMg.JPEG.wltjs5963%2FIMG_8220.jpg&type=sc960_832",},
  { name: "냉면", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MzBfMjM5%2FMDAxNjkzNDAzOTAzNTM5.g9qoXlX8rY3UeK959R2aA0VdHjymR9R1y-fuc8gYtQ4g.fhmQi9c8ahIGBXcOD4I4SJP_J5ZM3IrT0aZ3IUzLqTYg.JPEG.sui221%2Foutput_505913646.jpg&type=sc960_832",},
  { name: "갈비", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MzBfMTE1%2FMDAxNjkzMzU3ODkyNzMz.8Q2Bww4CpJdaHUmyX4eD5L-04ZSuky1K-RAn-kvRCiYg.AMT455coexNW6Exht7ZJSxmnm_TydjGE56wylPoJ5P4g.JPEG.sksdnjsdb%2FIMG_6750.jpg&type=sc960_832",},
  { name: "해물찜", src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MjZfMjQ2%2FMDAxNjg1MDgyNDAwNzI4.VjbRU4bfK1WxM0EZGx3Osegks7xwZPaeHpi5DhcbIkkg.en8sVN9073LJUvdTlErEQfGuoE7P2P2hFQptXTVDNdwg.JPEG.ice4961%2F20230525%25A3%25DF183908.jpg&type=sc960_832",}
];

const itemsCopy = Array.from(new Set([...items, ...items]));

const FoodWorldCup = () => {
  const [foods, setFoods] = useState([]);
  const [displays, setDisplays] = useState([]);  
  const [winners, setWinners] = useState([]);
  const [round, setRound] = useState(1);
  const [matchCount, setMatchCount] = useState(0);
  const [totalMatches, setTotalMatches] = useState(16);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const MAX_ITEMS_PER_ROW = 300;

  const fetchFinalWinnerInfo = async (finalWinner) => {
    try {
      const response = await fetch(`http://localhost:3001/foodworldcup?name=${encodeURIComponent(finalWinner)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const recommendedRestaurant = await response.json();
        console.log('추천 음식점:', recommendedRestaurant);
        return recommendedRestaurant;
      } else {
        console.error('서버 응답 오류:', response.status);
        return null;
      }
    } catch (error) {
      console.error('음식점 추천을 위한 서버 통신 중 오류 발생:', error);
      return null;
    }
  };

  useEffect(() => {
    itemsCopy.sort(() => Math.random() - 0.5);
    setFoods(itemsCopy);
    if (itemsCopy.length >= 2) {
      setDisplays([itemsCopy[0], itemsCopy[1]]);
    } else {
      setDisplays([]); 
    }
  }, []);
  
  const clickHandler = (food) => () => {
    const clickedIndex = displays.findIndex(item => item === food);
    const isLeftClick = clickedIndex === 0;
    if (foods.length <= 2) {
      let updatedDisplays;
      if (winners.length === 0) {
        updatedDisplays = [food];
      } else {
        let updatedFood = [...winners, food];
        setFoods(updatedFood);
        updatedDisplays = [updatedFood[0], updatedFood[1]];
        setWinners([]);
        setRound(round + 1);
        setMatchCount(0);
        setTotalMatches(totalMatches / 2);
      }
      setDisplays(updatedDisplays);
    } else if (foods.length > 2) {
      setWinners([...winners, food]);

      if (foods.length === 3) {
        setDisplays([foods[2], foods[3]]);
      } else {
        setDisplays([...foods.slice(2, 4)]);
      }
      setFoods(foods.slice(2));
      setMatchCount(matchCount + 1);
    }
    if (round === 5 && totalMatches === 1) {
      if (winners.length === 0) {
        if (isLeftClick) {
          const finalWinner = displays[0];
          fetchFinalWinnerInfo(finalWinner.name)
            .then((selectedMenuDetails) => {
              if (selectedMenuDetails && !selectedMenuDetails.error) {
                setSelectedMenu(selectedMenuDetails);
                setSelectedValue(finalWinner.name);
              } else {
                console.error('서버에서 오류 응답:', selectedMenuDetails);
              }
            })
            .catch((error) => {
              console.error('음식점 추천을 위한 서버 통신 중 오류 발생:', error);
            });
        } else {
          const finalWinner = displays[1];
          fetchFinalWinnerInfo(finalWinner.name)
            .then((selectedMenuDetails) => {
              if (selectedMenuDetails && !selectedMenuDetails.error) {
                setSelectedMenu(selectedMenuDetails);
                setSelectedValue(finalWinner.name);
              } else {
                console.error('서버에서 오류 응답:', selectedMenuDetails);
              }
            })
            .catch((error) => {
              console.error('음식점 추천을 위한 서버 통신 중 오류 발생:', error);
            });
          }
        }
    }
  };

  return (
    <div>
      <style>
        {`
        .vs {
          color: #ffffff;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -10%);
          z-index: 999;
          font-size: 100px;
        }

        .title {
          position: absolute;
          top: 60px;
          left: 42.8%;
          font-size: 50px;
          background-color: #ffffff;
        }

        .flavor_logo {
          top: 10px;
          left: 20px;
        }

        .match_info {
          position: fixed;
          top: 50px;
          right: 60px;
          padding: 10px;
          font-size: 40px;
          z-index: 3;
        }

        .box {
          top: 30px;
          display: flex;
          background-color: black;
        }

        .food_list {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .food_img {
          width: 100%;
          margin-top: 70px;
          max-height: 100%;
          transition: 0.5s;
          cursor: pointer;
        }

        .food_img:hover {
          transform: scale(1.01);
          opacity: 0.8;
        }

        .name {
          color: #fff;
          font-size: 90px;
        }

        .result_button {
          left: 100px;
          margin-top: 50px;
          background: #ff6480;
          padding: .8rem 1.8rem;
          border: none;
          font-size: 1.5rem;
          color: #f9f9f9;
          border-radius: 5px;
          transition: .2s;
          cursor: pointer;
        }

        .rest_list {
          padding: 20px;
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
          width: 370px;
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
      <div className="container">
        <div className="match_info">
          {matchCount + 1} / {totalMatches}
        </div>
        <Link to="/">
          <button type="flavor_logo" className="flavor_logo">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
          </button>
        </Link>
        <h1 className="title">음식 월드컵</h1>
        <h1 className="vs" style={{ display: selectedMenu ? 'none' : 'block' }}>VS</h1>
        <div className="box">
          {displays.map((d, index) => (
            <div key={d.name} className="food_list" onClick={clickHandler(d)}>
              <img className="food_img" src={d.src} style={{ width: "500px", height: "500px" }} alt="food_world_cup" />
              <div className="name">{d.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rest_list">
        {selectedMenu && (
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
  );
};

export default FoodWorldCup;