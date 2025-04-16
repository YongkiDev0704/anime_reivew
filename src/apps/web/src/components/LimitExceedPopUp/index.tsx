import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ErrorIcon from "../../assets/icons/ErrorImg.svg";

export const LimitExceedPopUp = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const handlePopup = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 60000);
    };

    window.addEventListener("anilistRateLimitExceeded", handlePopup);
    return () => window.removeEventListener("anilistRateLimitExceeded", handlePopup);
  }, []);

  useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <PopUpWrapper>
      <img src={ErrorIcon} alt="ErrorIcon" width={150} height={150}/>
      <TextArea>
        <StyledP style={{ fontSize: "24px" }}>Too Many Request</StyledP>
        <StyledP style={{ fontSize: "12px" }}>Please try again later</StyledP>
      </TextArea>
    </PopUpWrapper>
  );
};

const PopUpWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 480px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background-color: #333333;
  gap: 16px;
  z-index: 9999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledP = styled.p`
  color: white;
  margin: 0;
`;
