const express = require("express");
const session = require('express-session');
const path = require('path');
const util = require('util');
const app = express();
const port = 3001; 
const db = require('./config/db');
const sessionOption = require('./config/sessionOption');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
const crypto = require('crypto');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

const secretKey = crypto.randomBytes(64).toString('hex');

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(session({  
  key: 'session_cookie_name',
  secret: secretKey,
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 365 * 24 * 60 * 60 * 1000,
    secure: false,
  },
}));

//////////////////// Default ////////////////////
app.get('/', (req, res) => {    
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

//////////////////// 메인 페이지 관련 ////////////////////
app.post('/search', async (req, res) => {
  const searchKeyword = req.body.searchKeyword; // 프론트엔드에서 검색어를 전송합니다.

  if (!searchKeyword) {
    res.status(400).json({ success: false, error: '검색어가 누락되었습니다' });
    return;
  }

  // 여기서 검색 로직을 구현하고, 검색 결과를 results 배열에 저장합니다.
  // 예를 들어, 음식 또는 음식점을 검색하는 쿼리를 실행하고 results에 결과를 할당합니다.

  try {
    // 여기서 검색 로직을 구현하세요.

    // 예: 음식 검색 결과
    const results = await db.query('SELECT * FROM foodTable WHERE name LIKE ?', [`%${searchKeyword}%`]);

    // 결과를 클라이언트에 반환
    res.json({ success: true, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: '검색 중 오류 발생' });
  }
});

app.post('/mainpage/addkeyword', async (req, res) => {
  try{
    const keyword = req.body.keyword;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if(!keyword) {
      res.status(400).json({ success: false, error: '키워드가 누락되었습니다' });
      return;
    }

    const query = 'INSERT INTO keywordTable (keyword, date) VALUES (?, ?)';
    const values = [keyword, date];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, error: '키워드 추가 중 오류 발생' });
      } else {
        res.status(201).json({ success: true, message: '키워드가 성공적으로 추가되었습니다.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: '키워드 추가 중 오류 발생' });
  }
});

app.get('/mainpage/getkeywords', async (req, res) => {
  try {
    const query = 'SELECT keyword FROM keywordTable';

    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, error: '키워드 불러오기 중 오류 발생' });
      } else {
        const keywords = results.map((result) => result.keyword);
        res.json(keywords);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: '키워드 불러오기 중 오류 발생' });
  }
});

app.delete('/mainpage/deleteallkeywords', async (req, res) => {
  try {
    const query = 'DELETE FROM keywordTable'; 

    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, error: '모든 키워드 삭제 중 오류 발생' });
      } else {
        res.json({ success: true, message: '모든 키워드가 성공적으로 삭제되었습니다.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: '모든 키워드 삭제 중 오류 발생' });
  }
});

app.delete('/mainpage/deleteonekeyword/:keyword', async (req, res) => {
  const { keyword } = req.params;

  if (keyword) {
    try {
      const query = 'DELETE FROM keywordTable WHERE keyword = ?';
      const values = [keyword];

      db.query(query, values, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ success: false, error: '키워드 삭제 중 오류 발생' });
        } else {
          res.json({ success: true, message: '키워드가 성공적으로 삭제되었습니다.' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: '키워드 삭제 중 오류 발생' });
    }
  } else {
    res.status(400).json({ success: false, error: '키워드가 누락되었습니다' });
  }
});

//////////////////// 로그인 페이지 관련 ////////////////////
app.get('/authcheck', async (req, res) => {
  const userid = req.query.userid; // 이 부분에서 쿼리 문자열의 userid 값을 가져옵니다

  // 나머지 코드는 이전과 동일합니다
  const sendData = {
    isLogin: req.session.is_logined || false,
    userid: req.session.nickname
  };

  console.log('isLogin:', sendData.isLogin);
  console.log('userid:', sendData.userid);

  res.json(sendData);
});

// function authenticateUser(req, res, next) {
//   if (req.session.userid) {
//     next(); // 사용자 인증됨
//   } else {
//     // 사용자가 로그인되지 않았을 때 사용자에게 로그인 페이지로 리다이렉트
//     res.redirect('/login');
//   }
// }

app.post("/login", async (req, res) => {
  const userData = req.body;

  if (userData.userid && userData.userPassword) {
    try {
      const query = "SELECT * FROM userTable WHERE userid = ?";
      const [results, fields] = await db.query(query, [userData.userid]);

      if (results.length > 0) {
        let isUserFound = false;
        for (const user of results) {
          if (userData.userPassword === user.password) {
            req.session.is_logined = true;
            req.session.nickname = userData.userid;
            console.log(req.session.is_logined);
            console.log(req.session.nickname);
            isUserFound = true;
            break;
          }
        }
        req.session.save(function (err) {
          if (err) {
            console.error("세션 저장 중 에러 발생:", err);
            res.status(500).json({ isLogin: false, message: "세션 저장 중 오류 발생" });
          } else {
            if (isUserFound) {
              res.json({ isLogin: true });
              // console.log(req.session.nickname);
            } else {
              res.status(401).json({ isLogin: false, message: "비밀번호가 일치하지 않습니다" });
            }
          }
        });
      } else {
        req.session.is_logined = false;
        req.session.save(function (err) {
          if (err) {
            console.error(err);
            res.status(500).json({ isLogin: false, message: "세션 저장 중 오류 발생" });
          } else {
            res.status(401).json({ isLogin: false, message: "아이디 정보가 일치하지 않습니다." });
          }
        });
      }
    } catch (error) {
      console.error(error);
      req.session.is_logined = false;
      req.session.save(function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ isLogin: false, message: "세션 저장 중 오류 발생" });
        } else {
          res.status(500).json({ isLogin: false, message: "서버 오류" });
        }
      });
    }
  } else {
    req.session.is_logined = false;
    req.session.save(function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ isLogin: false, message: "세션 저장 중 오류 발생" });
      } else {
        res.status(400).json({ isLogin: false, message: '아이디와 비밀번호를 입력하세요' });
      }
    });
  }
});

//////////////////// 회원가입 페이지 관련 ////////////////////
app.post("/signup", async (req, res) => {
  const userData = req.body;

  if (userData.name && userData.userid && userData.userPassword1 && userData.userPassword2 &&
    userData.birthdate && userData.email && userData.number && userData.userPassword1 === userData.userPassword2) {
    const query = "SELECT * FROM userTable WHERE userid = ?";
    const [existingUsers] = await db.query(query, [userData.userid]);

    if (existingUsers.length === 0) {
      const query = "INSERT INTO userTable (name, userid, password, birthdate, email, number) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [userData.name, userData.userid, userData.userPassword1, userData.birthdate, userData.email, userData.number];

      try {
        await db.query(query, values);
        res.json({ isSuccess: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ isSuccess: false, message: "서버 오류" });
      }
    } else {
      res.status(400).json({ isSuccess: false, message: "이미 사용 중인 아이디입니다." });
    }
  } else if (!userData.userid && userData.password) {
    res.status(400).json({ isLogin: false, message: '서버 아이디 오류' });
  } else if (!userData.password && userData.userid) {
    res.status(400).json({ isLogin: false, message: '서버 비밀번호 오류' });
  } else {
    res.status(400).json({ isLogin: false, message: '서버 아이디 비밀번호 오류' });
  }
});

//////////////////// 유저 정보 페이지 관련 ////////////////////
app.get('/myinfo', async (req, res) => {
  // const userid = req.query.userid;
  const userid = 'cdflavor1113';

  console.log(req.session.is_logined);
  console.log(req.session.nickname);
  if (req.session.is_logined === true) {
    console.log("사용자가 로그인했습니다.");

    try {
      const [results, fields] = await db.query('SELECT name, userid, birthdate, email, number FROM userTable WHERE userid = ?', [userid]);

      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: '사용자 정보를 찾을 수 없습니다' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    console.log("사용자가 로그인하지 않았습니다.");
    res.status(401).json({ error: '로그인이 필요합니다' });
  }
});

app.post('/myinfoheart', async (req, res) => {
  try {
    const [results, fields] = await db.query('SELECT * FROM foodTable WHERE id IN (SELECT restaurantid FROM heartTable)');

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: '찜 목록이 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ isLogin: false, message: "세션 파기 중 오류 발생" });
    } else {
      res.redirect('/'); // 로그아웃 후 홈페이지로 리디렉션
    }
  });
});

//////////////////// 지도 음식 정보 신창 ////////////////////
app.post('/mapfoodtype', async (req, res) => {
  try {
    const [results, fields] = await db.query('SELECT * FROM foodTable');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/restaurantdetail', (req, res) => {
  const { restaurantInfo, isFavorite } = req.body;
  const { id } = restaurantInfo;

  console.log('Received data:', restaurantInfo, isFavorite);

  if (isFavorite === true) {
    const insertQuery = 'INSERT INTO heartTable (restaurantid, heart, rating) VALUES (?, ?, ?)';
    db.query(insertQuery, [id, 1, null], (insError) => {
      if (insError) {
        console.error('Error executing MySQL query:', insError);
        res.status(500).json({ error: 'Error executing MySQL query' });
      } else {
        res.status(200).json({ message: 'Restaurant information saved successfully' });
      }
    });
  } else {
    const deleteQuery = 'DELETE FROM heartTable WHERE restaurantid = ?';
    db.query(deleteQuery, [id], (delError) => {
      if (delError) {
        console.error('Error executing MySQL query:', delError);
        res.status(500).json({ error: 'Error executing MySQL query' });
      } else {
        res.status(200).json({ message: 'Restaurant information removed successfully' });
      }
    });
  }
});

app.post('/saverating', (req, res) => {
  const { restaurantInfo, isFavorite } = req.body;
  const { id } = restaurantInfo;

  console.log('Received data:', restaurantInfo, isFavorite);

  const insertQuery = 'INSERT INTO heartTable (restaurantid, rating) VALUES (?, ?)';
  db.query(insertQuery, [id, 1], (insError) => {
    if (insError) {
      console.error('Error executing MySQL query:', insError);
      res.status(500).json({ error: 'Error executing MySQL query' });
    } else {
      res.status(200).json({ message: 'Restaurant information saved successfully' });
    }
  });
});

//////////////////// 구역 ///////////////////////
app.post('/mapfoodarea', async (req, res) => {
  try {
    const [results, fields] = await db.query('SELECT * FROM foodTable');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// 음식점 상세 정보 - 구역
app.get('/mapfoodarea/restaurant/:id', async (req, res) => {
  const restaurantId = req.params.id;
  
  try {
    const [results, fields] = await db.query('SELECT * FROM foodTable WHERE id = ?', [restaurantId]);
    if (results.length === 0) {
      res.status(404).json({ error: '음식점을 찾을 수 없음' });
      return;
    }

    const restaurant = results[0];
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '음식점 데이터 가져오기 오류' });
  }
});

//////////////////// 게시글 전체 목록 관련 ////////////////////
app.get("/boardlist", async (req, res) => {
  try {
    const [results, fields] = await db.query('SELECT * FROM boardTable');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/boardlist/increaseviews/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const [results, fields] = await db.query('SELECT views FROM boardTable WHERE id = ?', [postId]);
    if (results.length === 0) {
      res.status(404).json({ error: '게시물을 찾을 수 없음' });
      return;
    }

    const currentViews = results[0].views;
    const updatedViews = currentViews + 1;

    await db.query('UPDATE boardTable SET views = ? WHERE id = ?', [updatedViews, postId]);

    res.status(200).json({ message: '게시물 조회수가 증가되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '게시물 조회수 업데이트 오류' });
  }
});

//////////////////// 게시글 작성 폼 관련 ////////////////////
app.post('/boardlist/createpostform', (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 날짜 및 시간
    const views = 0; // 초기 조회수

    if (!title || !content) {
      res.status(400).json({ success: false, error: '잘못된 데이터입니다.' });
      return;
    }

    const query = 'INSERT INTO boardTable (title, date, views, content) VALUES (?, ?, ?, ?)';
    const values = [title, date, views, content];

    db.query(query, values, (error, results, fields) => {
      if (error) {
        console.error('게시물 추가 오류:', error);
        res.status(500).json({ success: false, error: '게시물을 데이터베이스에 추가하는 중에 오류가 발생했습니다.' });
      } else {
        res.status(201).json({ success: true, message: '게시물이 성공적으로 데이터베이스에 추가되었습니다.' });
      }
    });
  } catch (error) {
    console.error('게시물 추가 오류:', error);
    res.status(500).json({ success: false, error: '게시물을 추가하는 중에 오류가 발생했습니다.' });
  }
});

//////////////////// 해당 게시글 내용 관련 ////////////////////
app.get('/boardlist/post/:id', async (req, res) => {
  const postId = req.params.id;
  
  try {
    const [results, fields] = await db.query('SELECT * FROM boardTable WHERE id = ?', [postId]);
    if (results.length === 0) {
      res.status(404).json({ error: '게시물을 찾을 수 없음' });
      return;
    }

    const post = results[0];
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '게시물 데이터 가져오기 오류' });
  }
});

//////////////////// 게시글 전체 목록 관련 ////////////////////
app.get("/suggestlist", async (req, res) => {
  try {
    const [results, fields] = await db.query('SELECT * FROM suggestTable');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/suggestlist/increaseviews/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const [results, fields] = await db.query('SELECT views FROM suggestTable WHERE id = ?', [postId]);
    if (results.length === 0) {
      res.status(404).json({ error: '게시물을 찾을 수 없음' });
      return;
    }

    const currentViews = results[0].views;
    const updatedViews = currentViews + 1;

    await db.query('UPDATE suggestTable SET views = ? WHERE id = ?', [updatedViews, postId]);

    res.status(200).json({ message: '게시물 조회수가 증가되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '게시물 조회수 업데이트 오류' });
  }
});

//////////////////// 게시글 작성 폼 관련 ////////////////////
app.post('/suggestlist/createpostforms', (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 날짜 및 시간
    const views = 0; // 초기 조회수

    if (!title || !content) {
      res.status(400).json({ success: false, error: '잘못된 데이터입니다.' });
      return;
    }

    const query = 'INSERT INTO suggestTable (title, date, views, content) VALUES (?, ?, ?, ?)';
    const values = [title, date, views, content];

    db.query(query, values, (error, results, fields) => {
      if (error) {
        console.error('게시물 추가 오류:', error);
        res.status(500).json({ success: false, error: '게시물을 데이터베이스에 추가하는 중에 오류가 발생했습니다.' });
      } else {
        res.status(201).json({ success: true, message: '게시물이 성공적으로 데이터베이스에 추가되었습니다.' });
      }
    });
  } catch (error) {
    console.error('게시물 추가 오류:', error);
    res.status(500).json({ success: false, error: '게시물을 추가하는 중에 오류가 발생했습니다.' });
  }
});

//////////////////// 해당 게시글 내용 관련 ////////////////////
app.get('/suggestlist/post/:id', async (req, res) => {
  const postId = req.params.id;
  
  try {
    const [results, fields] = await db.query('SELECT * FROM suggestTable WHERE id = ?', [postId]);
    if (results.length === 0) {
      res.status(404).json({ error: '게시물을 찾을 수 없음' });
      return;
    }

    const post = results[0];
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '게시물 데이터 가져오기 오류' });
  }
});

//////////////////// 음식점 상세 정보 ////////////////////
app.get('/mapfoodtype/restaurant/:id', async (req, res) => {
  const restaurantId = req.params.id;
  
  try {
    const [results, fields] = await db.query('SELECT * FROM foodTable WHERE id = ?', [restaurantId]);
    if (results.length === 0) {
      res.status(404).json({ error: '음식점을 찾을 수 없음' });
      return;
    }

    const restaurant = results[0];
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '음식점 데이터 가져오기 오류' });
  }
});

//////////////////// 분위기 목록 ////////////////////
// app.get('/getMoods/:id', async (req, res) => {
//   const foodTableId = req.params.id;

//   try {
//     const [results, fields] = await db.query('SELECT m.name FROM restaurantMoodMapping rm JOIN moodTable m ON rm.mood_id = m.id WHERE rm.restaurant_id = ?', [foodTableId]);
//     if (results.length === 0) {
//       res.status(404).json({ error: '분위기를 찾을 수 없음' });
//       return;
//     }

//     const allMoods = results;
//     res.json(allMoods);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: '분위기 데이터 가져오기 오류' });
//   }
// });

//////////////////// 클라이언트에게 음식 데이터 전달 ////////////////////
// app.get('/recomkeyword', async (req, res) => {
//   try {
//     const [foodResults, foodFields] = await db.query('SELECT * FROM foodTable');
//     const [moodResults, moodFields] = await db.query('SELECT * FROM moodTable');

//     const combinedResults = foodResults.map((food) => {
//       const moods = moodResults
//         .filter((mood) => mood.restaurant_id === food.id)
//         .map((mood) => mood.name);

//       return { ...food, keywords: moods }; // 키워드를 배열로 변경
//     });

//     console.log('combinedResults:', combinedResults);

//     // 클라이언트에 필요한 부분만 응답합니다.
//     const responseData = {
//       foodResults: combinedResults.map((food) => ({
//         id: food.id,
//         name: food.name,
//         keywords: food.keywords,
//       })),
//     };

//     res.json(responseData);
//   } catch (error) {
//     console.error('음식 데이터를 가져오는 중에 오류 발생:', error);
//     res.status(500).json({ success: false, error: '음식 데이터 가져오기 실패' });
//   }
// });

app.get('/recomkeyword', async (req, res) => {
  try {
    const keywords = req.query.keywords.split(',');
    const conditions = req.query.conditions;

    // 수정된 부분: moodName 및 restaurantName 파라미터 가져오기
    const moodName = req.query.moodName;
    const restaurantName = req.query.restaurantName;

    const query = `
    SELECT id, title, type, phone_number, menu, address, md AS mood
    FROM foodTable
    WHERE md = ? AND title = ?;
  `;
  
  const [results, fields] = await db.query(query, [moodName, restaurantName]);  

    const responseData = {
      foodResults: results.map((food) => ({
        id: food.id,
        title: food.title,
        type: food.type,
        phone_number: food.phone_number,
        menu: food.menu,
        address: food.address,
        keywords: [food.mood], // mood를 배열로 변경
      })),
    };

    res.json(responseData);
  } catch (error) {
    console.error('음식 데이터를 가져오는 중에 오류 발생:', error);
    res.status(500).json({ success: false, error: '음식 데이터 가져오기 실패' });
  }
});

app.get('/foodworldcup', async (req, res) => {
  const finalWinner = req.query.name;

  try {
    const [results] = await db.query('SELECT * FROM foodTable WHERE menu LIKE ?', [`%${finalWinner}%`]);

    if (results.length > 0) {
      const selectedMenus = results.map(menu => {
        return {
          title: menu.title,
          menu: menu.menu,
          phone_number: menu.phone_number,
          type: menu.type,
          address: menu.address,
        };
      });

      res.json(selectedMenus);
    } else {
      res.status(404).json({ error: '메뉴를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('쿼리 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

app.get('/recomrandom', async (req, res) => {
  const menuName = req.query.name;

  try {
    const [results] = await db.query('SELECT * FROM foodTable WHERE menu LIKE ?', [`%${menuName}%`]);

    if (results.length > 0) {
      const selectedMenus = results.map(menu => {
        return {
          title: menu.title,
          menu: menu.menu,
          phone_number: menu.phone_number,
          type: menu.type,
          address: menu.address,
        };
      });

      res.json(selectedMenus);
    } else {
      res.status(404).json({ error: '메뉴를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('쿼리 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

app.post("/vote", async (req, res) => {
  const userData = req.body;

  const query = "INSERT INTO voteTable (gender, age, favoritefood, favoriterestaurant) VALUES (?, ?, ?, ?)";
  const values = [userData.userGender, userData.userAge, userData.userFavoriteFood, userData.userFavoriteRestaurant];

  try {
    await db.query(query, values);
    res.json({ isSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccess: false, message: "서버 오류" });
  }
});

app.get('/recomkeyword', async (req, res) => {
  try {
    const conditions = req.query.conditions || '';
    const keywords = req.query.keywords.split(',');

    const mdKeywords = keywords.slice(5).filter(keyword => keyword !== '').join("','");
    const mdCondition = mdKeywords ? `AND md IN ('${mdKeywords}')` : '';

    const typeKeywords = keywords.slice(2, 5).filter(keyword => keyword !== '').join("','");
    const typeCondition = typeKeywords ? `AND type IN ('${typeKeywords}')` : '';

    const whereClause = conditions ? `${conditions} ${typeCondition || mdCondition ? 'AND' : ''}` : '';

    const sqlQuery = `SELECT * FROM foodTable WHERE ${whereClause}${typeCondition}${mdCondition}`;

    console.log('SQL Query:', sqlQuery);

    const [rows] = await db.query(sqlQuery);

    console.log('Returned rows:', rows);
    res.json(rows);
  } catch (error) {
    console.error('MySQL 조회 에러:', error);
    res.status(500).send('서버 에러');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});