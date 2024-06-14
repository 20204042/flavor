import { configureStore, createSlice } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BoardList from './BoardList';
import CreatePostForm from './CreatePostForm';
import CreatePostFormS from './CreatePostFormS';
import FindIDPW from './FindIDPW';
import FoodWorldCup from './FoodWorldCup';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import MapFoodArea from './MapFoodArea';
import MapFoodType from './MapFoodType';
import MoodList from './MoodList';
import MyInfoHeart from './MyInfoHeart';
import MyInfoPage from './MyInfoPage';
import PostDetail from './PostDetail';
import PostDetailS from './PostDetailS';
import RecomKeyword from './RecomKeyword';
import RecomRandom from './RecomRandom';
import RestaurantDetail from './RestaurantDetail';
import Setting from './Setting';
import SignUpPage from './SignUpPage';
import SuggestList from './SuggestList';
import Vote from './Vote';
import Weather from './Weather';

const historyKeywordsAddDelete = createSlice({
  name: 'historyKeywords',
  initialState: [],
  reducers: {
    addKeyword: (state, action) => {
      state.push(action.payload);
    },
    deleteAllKeywords: (state) => {
      state.length = 0;
    },
    deleteOneKeyword: (state, action) => {
      return state.filter((keyword) => keyword !== action.payload);
    },
  },
});

export const { addKeyword, deleteAllKeywords, deleteOneKeyword } = historyKeywordsAddDelete.actions;

const historyKeywordsReducer = historyKeywordsAddDelete.reducer;

const store = configureStore({
  reducer: {
    historyKeywords: historyKeywordsReducer,
  },
});

function App() {
  const [posts, setPosts] = useState([]);
  const [suggests, setSuggests] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const handleAddPost = (newPost1) => {
    const currentPostCount = posts.length;
  
    const newId = currentPostCount + 1;
  
    const newDate = new Date().toLocaleString();
    const newViews = 0;

    const createdPost = {
      id: newId,
      title: newPost1.title,
      date: newDate,
      views: newViews,
      content: newPost1.content,
    };
  
    setPosts((prevPosts) => [...prevPosts, createdPost]);
  };

  const handlePostClick = async (postId1) => {
    try {
      const response = await fetch(`http://localhost:3001/boardlist/increaseviews/${postId1}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId1) {
            return {
              ...post,
              views: post.views + 1,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        throw new Error('오류: ' + response.statusText);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      alert('오류: ' + error.message);
    }
  };
  
  const handleAddSuggest = (newPost2) => {
    const currentPostCount = posts.length;
  
    const newId = currentPostCount + 1;
  
    const newDate = new Date().toLocaleString();
    const newViews = 0;

    const createdPost = {
      id: newId,
      title: newPost2.title,
      date: newDate,
      views: newViews,
      content: newPost2.content,
    };
  
    setPosts((prevPosts) => [...prevPosts, createdPost]);
  };

  const handleSuggestClick = async (postId2) => {
    try {
      const response = await fetch(`http://localhost:3001/suggestlist/increaseviews/${postId2}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId2) {
            return {
              ...post,
              views: post.views + 1,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        throw new Error('오류: ' + response.statusText);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      alert('오류: ' + error.message);
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/authcheck/:userId" element={<MyInfoPage />}/>
          <Route path="/boardlist" element={<BoardList posts={posts} handleAddPost={handleAddPost} handlePostClick={handlePostClick} />} />
          <Route path="/boardlist/createpostform" element={<CreatePostForm handleAddPost={handleAddPost} />} />
          <Route path="/boardlist/post/:id" element={<PostDetail />} />
          <Route path="/findidpw" element={<FindIDPW />} />
          <Route path="/foodworldcup" element={<FoodWorldCup />} />
          <Route path="/getmoods/:id" element={<MoodList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mapfoodarea" element={<MapFoodArea />} />
          <Route path="/mapfoodarea/restaurant/:id" element={<RestaurantDetail restaurants={restaurants} />} />
          <Route path="/mapfoodtype" element={<MapFoodType />} />
          <Route path="/mapfoodtype/restaurant/:id" element={<RestaurantDetail restaurants={restaurants} />} />
          <Route path="/moodlist" element={<MoodList />} />
          <Route path='/myinfo' element={<MyInfoPage />} />
          {/* <Route path='/myinfo/:userid' element={<MyInfoPage />} /> */}
          <Route path='/myinfoheart' element={<MyInfoHeart />} />
          <Route path="/recomkeyword" element={<RecomKeyword />} />
          <Route path="/recomrandom" element={<RecomRandom />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/suggestlist" element={<SuggestList posts={posts} handleAddSuggest={handleAddSuggest} handleSuggestClick={handleSuggestClick} />} />
          <Route path="/suggestlist/createpostforms" element={<CreatePostFormS handleAddSuggest={handleAddSuggest} />} />
          <Route path="/suggestlist/post/:id" element={<PostDetailS />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/weather" element={<Weather latitude={36.774} longitude={126.9334} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;