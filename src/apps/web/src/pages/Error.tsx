import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import ErrorIcon from "../assets/icons/ErrorImg.svg";
import { useEffect } from "react";

export const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const img = new Image();
    img.src = ErrorIcon;
  }, []);  

  return (
    <Wrapper>
      <LeftSection>
        <ErrorMessageWrapper>
          <ErrorTitle> Oops! </ErrorTitle>
          <ErrorMessage> We can’t seem to find the page you are looking for. </ErrorMessage>
        </ErrorMessageWrapper>
        <Button
          label="Back to Home"
          variant="custom"
          width="210px"
          height="64px"
          onClick={handleGoHome}
        />
      </LeftSection>
      <img src={ErrorIcon} alt="ErrorIcon" />
    </Wrapper>
  )
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 186px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ErrorMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ErrorTitle = styled.p`
  font-size: 48px;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  font-size: 24px;
`;
