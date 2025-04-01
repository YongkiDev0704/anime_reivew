import styled from "styled-components";

export const ReviewPopup = () => {
    return(
        <ReviewPopupWrapper>
            {/* Icon / UserName /// Rating Score */}
            {/* Text Box Area */}
            {/* Submit Button */}
            <ReviewPopupTop>
                <ReviewPopupUser>
                    {/* Icon / Username */}
                </ReviewPopupUser>
                {/* Rating Score */}
            </ReviewPopupTop>
            
        </ReviewPopupWrapper>
    );
};

const ReviewPopupWrapper = styled.section`
    display: flex;
    flex-flow: column wrap;
`;

const ReviewPopupTop = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ReviewPopupUser = styled.div`
    display:flex;
`