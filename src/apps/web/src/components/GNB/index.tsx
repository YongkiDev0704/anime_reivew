import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Icon from "../../assets/icons/logo.svg";
import Notification from "../../assets/icons/notifications.svg";
import User from "../../assets/icons/user.svg";
import { Search } from "../../Search";

export const GNB = () => {
  const location = useParams();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100); 
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <GNBWrapper $scrolled={scrolled}>
      <GNBInner>
        <Branding to="/">
          <img src={Icon} alt="Anigiri" width={80} />
          <Name>Anigiri</Name>
        </Branding>
        <NavItemWrapper>
          <NavItem to="/" $active={location.pathname === "/"}>Home</NavItem>
          <NavItem to="/category" $active={location.pathname === "/category"}>Category</NavItem>
          <NavItem to="/about" $active={location.pathname === "/about"}>About</NavItem>
        </NavItemWrapper>
        <UserActionsWrapper>
          <Search />
          <img src={Notification} alt="Notification" />
          <img src={User} alt="User" />
        </UserActionsWrapper>
      </GNBInner>
    </GNBWrapper>
  );
};


const GNBWrapper = styled.div<{ $scrolled: boolean }>`
  position: fixed; 
  z-index: 100;
  color: white;
  width: 1440px;
  background-color: ${({ $scrolled }) => ($scrolled ? "rgba(0, 0, 0, 0.7)" : "transparent")};
  transition: background-color 0.3s ease;
`;

const GNBInner = styled.div`
  display: flex;
  align-items: center;
  gap: 350px;
`;

const Branding = styled(Link)`
  display: flex;
  align-items: center;
  justify-cotent: center;
  color: white;
  text-decoration: none;
  gap: 8px;
`;

const Name = styled.p`
  font-weight: bold;
  font-style: italic;
  font-size: 40px;
  margin: 0;
`;

const NavItemWrapper = styled.div`
  display: flex;
  gap: 84px;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#00F5D4" : "white")};
  transition: color 0.2s ease;

  &:hover {
    color: #00F5D4;
  }
`;

const UserActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;
