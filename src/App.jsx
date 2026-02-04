import React from 'react';
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/Home.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import LeaderboardPage from './pages/Leaderboard.jsx';
import DetailPage from './pages/Detail.jsx';
import AddThreadPage from './pages/AddThread.jsx';
import ProfilePage from './pages/Profile.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/leaderboard' element={<LeaderboardPage />} />
        <Route path='/threads/:id' element={<DetailPage />} />
        <Route path='/threads/new' element={<AddThreadPage />} />
        <Route path='/users/me' element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
