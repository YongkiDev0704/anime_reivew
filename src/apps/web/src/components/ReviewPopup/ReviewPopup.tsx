import styled from "styled-components";
import defaultUserIcon from "../../assets/icons/user.svg";
import ratingSushi from "../../assets/icons/rating.svg";

import { Button } from "../Button";

export const ReviewPopup = () => {
    return(
        <ReviewPopupWrapper>
            {/* Icon / UserName /// Rating Score */}
            {/* Text Box Area */}
            {/* Submit Button */}
            <ReviewPopupTop>
                <ReviewPopupUser>
                    <ReviewUserIcon src={defaultUserIcon}/>
                    <ReviewUserName>
                        Username
                    </ReviewUserName>
                </ReviewPopupUser>
                <ReviewPopupRating src={ratingSushi} />
                {/* Rating Score */}
            </ReviewPopupTop>
            <ReviewPopupTextBox placeholder="Write a review" />
            <ReviewPopupBottom>
                <Button label="Submit" variant="third" />
            </ReviewPopupBottom>
        </ReviewPopupWrapper>
    );
};

const ReviewPopupWrapper = styled.section`
    display: flex;
    flex-flow: column wrap;
    width: 860px;
    height: 620px;
    background-color: var(--box-container);
    padding: 20px 20px;
    border-radius: 25px;
`;

const ReviewPopupTop = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const ReviewPopupUser = styled.div`
    display:flex;
    align-items: center;
`;

const ReviewUserIcon = styled.img`
    margin: 0 10px;
    width: 50px;
    height: 50px;
`
const ReviewUserName = styled.p`
    color: var(--main-text);
    margin-left: 12px;
`;

const ReviewPopupRating = styled.img`
    width: 40px;
    height: 40px;
    margin: 0 10px;
`;

const ReviewPopupTextBox = styled.textarea`
    width: 785px;
    height: 428px;
    background-color: var(--box-container);
    border-radius: 25px;
    border: 2px solid var(--popup-border);
    margin: 20px 10px;
    padding: 25px;
    color: var(--main-text);
    font-family: 'Roboto';
    font-size: 16px;
    resize: none;

    &::placeholder {
        color: var(--main-text);
        opacity: 0.65;
    }
`;

const ReviewPopupBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 10px;
`;