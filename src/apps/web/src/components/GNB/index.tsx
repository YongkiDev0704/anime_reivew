import styled from "styled-components";

import Icon from "../../assets/icons/logo.svg";
import Notification from "../../assets/icons/notifications.svg";
import Search from "../../assets/icons/search.svg";
import User from "../../assets/icons/user.svg";

export const GNB = () => {
  return (
    <GNBWrapper>
      <Branding>
        <img src={Icon} alt="Anigiri" width={80} />
        <Name> Anigiri </Name>
      </Branding>
      <NavItemWrapper>
        <NavItem> Home </NavItem>
        <NavItem> Category </NavItem>
        <NavItem> About </NavItem>
      </NavItemWrapper>
      <UserActionsWrapper>
        <img src={Search} alt="Search" />
        <img src={Notification} alt="Notification" />
        <img src={User} alt="User" />
      </UserActionsWrapper>
    </GNBWrapper>
  )
};

const GNBWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  z-index: 20;
  position: absolute;
  margin-top: 20px;
  padding-left: 30px;
  max-width: 100%;
  gap: 350px;
`;

const Branding = styled.div`
  display: flex;
  align-items: center;
  justify-cotent: center;
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

const NavItem = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const UserActionsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
