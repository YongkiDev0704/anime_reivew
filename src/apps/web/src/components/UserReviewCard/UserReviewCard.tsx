import styled from "styled-components";
import userIconDefault from "../../assets/icons/user.svg";

// type UserReviewCardProps = {
//     userName: string;
//     userComment: string;
//     userIcon?: string;
//     commentDate: Date;
//     userRating: number;
// } 


export const UserReviewCard = () => {

    return (
        <UserReviewCardWrapper>
            <UserReviewInfoWrapper>
                <UserReviewIdenWrapper>
                    {/* <ReviewUserIcon src={userIcon || userIconDefault} alt="User Icon" /> */}
                    <UserReviewIcon src={userIconDefault} alt="User Icon" />
                    <p>UserName</p>
                </UserReviewIdenWrapper>
                <UserReviewRatingBox>
                    <UserRatingScore>
                        7.28
                    </UserRatingScore>
                </UserReviewRatingBox>
            </UserReviewInfoWrapper>
            <UserReviewBorder />
            <UserReviewText>
                Conmment
            </UserReviewText>
        </UserReviewCardWrapper>
    );
};

const UserReviewCardWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--box-background);
    width: 398px;
    height: 180px;
    border-radius: 25px;
    padding: 16px;
    font-size: 14px;
    color: var(--main-text);
`;

const UserReviewInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: fit-content;
`;

const UserReviewIdenWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const UserReviewIcon = styled.img`
    width: 27px;
    height: 27px;
    margin-right: 8px;
`;

const UserReviewRatingBox = styled.div`
    background-color: var(--box-container);
    width: 51px;
    height: 21px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
`

const UserRatingScore = styled.p`
    color: var(--main-text);
    font-family: inter;
    font-weight: 400;
`;

const UserReviewBorder = styled.div`
    border: 1px solid var(--main-text);
    width: 100%;
    height: 0;
    margin: 7px 1px;
    border-radius: 50px;
`;

const UserReviewText = styled.p`
    color: var(--main-text);
    marigin: 0 3px;
`;