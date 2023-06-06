import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import palette from '../../lib/styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import SideNav from './sideNav';
import { useState } from 'react';

const HeaderBlock = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: none;
  z-index: 999;
  padding: 0;
  margin: 0;
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    white-space: nowrap;
  }
  h1 {
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
  }
  ${(props) =>
    props.styled &&
    css`
      background-color: rgba(255, 255, 255, 0.8);
      a {
        color: black;
      }
    `}
  @media all and (min-width: 768px) {
    justify-content: space-between;
    padding: 0 9rem;
  }
  @media all and (min-width: 1200px) {
    padding: 0 9rem;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  display: none;
  @media all and (min-width: 768px) {
    display: flex;
  }
  li {
    font-size: 0.9rem;
    margin: 0 30px;
  }
`;

const AccountList = styled.ul`
  align-items: center;
  list-style: none;
  display: none;
  @media all and (min-width: 768px) {
    display: flex;
  }
  li {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    margin: 0 8px;
  }
`;

const Account = styled.div`
  display: flex;
  align-items: center;
  .user-img {
    border-radius: 10px;
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 1.5rem;
`;

const Header = ({ account }) => {
  const headerRef = useRef();
  const [styled, setStyled] = useState(false);

  const headerStyling = () => {
    if (window.pageYOffset === 0) {
      setStyled(false);
    } else {
      setStyled(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', headerStyling);

    return () => {
      window.removeEventListener('scroll', headerStyling);
    };
  });

  return (
    <HeaderBlock ref={headerRef} styled={styled}>
      <h1>
        <Link to="/">한국다봄</Link>
      </h1>
      <MenuList>
        <li>
          <Link to="/PlannerList">플래너</Link>
        </li>
        <li>
          <Link to="/ReviewList">커뮤니티</Link>
        </li>
        <li>
          <Link to="/Spot">여행지</Link>
        </li>
      </MenuList>
      {account ? (
        <Account>
          {/* <img className="user-img" src="logo192.png"></img> */}
          <Link to="/Profile">{account.nickname}</Link>
        </Account>
      ) : (
        <AccountList>
          <li>
            <StyledFontAwesomeIcon icon={faCircleUser} />
            <Link to="/Login">로그인</Link>
          </li>
          {/* <li>
            <Link to="/Register">회원가입</Link>
          </li> */}
        </AccountList>
      )}
      <SideNav />
    </HeaderBlock>
  );
};

export default Header;
