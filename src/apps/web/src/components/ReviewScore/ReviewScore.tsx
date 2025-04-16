import styled from "styled-components";
import { useState } from "react";
import ratingOutLine from "../../assets/icons/rating_outline.svg";
import ratingSushi from "../../assets/icons/rating.svg";

type ReviewScoreProps = {
    score: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
    error?: boolean;
  }

export const ReviewScore = ({ score, readOnly, onChange, error }: ReviewScoreProps) => {
    
    const [inputScore, setInputScore] = useState<string>(score);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        // 숫자와 소수점만 허용 (0-9 및 .)
        if (/^\d*\.?\d{0,2}$/.test(value)) {
          if (parseFloat(value) > 10) {
            value = "10"; // 10을 초과하면 10으로 설정
          }
          setInputScore(value);
          onChange?.(value);
        }
      };

  // Calculate width to be filled based on input score (0 to 10 scale)
  const fillWidth = (parseFloat(inputScore) / 10) * 100; // percentage for the filled color

  return (
    <ReviewScoreWrapper>
      <ScoreBox
        type="text"
        value={inputScore}
        onChange={handleInputChange}
        placeholder="0.00"
        readOnly={readOnly}
        error={error}
      />
      <ScoreIconWrapper>
        <img src={ratingOutLine} alt="Rating Outline" width="40" height="40" />
        <FilledIcon style={{ clipPath: `inset(0 ${100 - fillWidth}% 0 0)` }}>
          <img src={ratingSushi} alt="Color Filled Rating" width="40" height="40" />
        </FilledIcon>
      </ScoreIconWrapper>
    </ReviewScoreWrapper>
  );
};

const ReviewScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ScoreBox = styled.input<{ error?: boolean }>`
  background-color: var(--popup-border);
  font-size: 16px;
  width: 70px;
  height: 30px;
  border-radius: 15px;
  border: 2px solid ${({ error }) => error ? 'red' : 'transparent'};
  outline: none;
  text-align: center;
  vertical-align: middle;
  padding: 0 8px;
`;

const ScoreIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
`;

const FilledIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;