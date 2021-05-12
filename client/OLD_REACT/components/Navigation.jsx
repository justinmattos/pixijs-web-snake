import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavContainer, NavRow, UserOptions } from '../containers/Navigation';

const Navigation = () => {
  const { token } = useSelector(({ token }) => ({ token }));
  return (
    <NavContainer>
      <NavRow primary>
        <Link to="/">
          <h1>Web Snake</h1>
        </Link>
        {!!token ? (
          <UserOptions>
            <Link to="/dashboard">Profile</Link>
            <Link to="/logout">Log Out</Link>
          </UserOptions>
        ) : (
          <Link to="/login">Log In/Register</Link>
        )}
      </NavRow>
      <NavRow>
        <Link to="/snake">New Game</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/about">About</Link>
      </NavRow>
    </NavContainer>
  );
};

export default Navigation;
