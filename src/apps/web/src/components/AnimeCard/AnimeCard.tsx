import styled from "styled-components";
import ratingStar from "../../assets/icons/rating-star.svg";

// Typedef of AnimeCard's Props
type AnimeCardProps = {
    animeName: string;
    animePhotoURL?: string;
    animeRating: number;
  };

// AnimeCard Component (Photo/Name/Rating)
export const AnimeCard = ({ animeName, animePhotoURL, animeRating }: AnimeCardProps) => {
  return (
    <AnimeCardWrapper>
        {/* Wrapper to keep button insdie of photo area + action on hover control */}
        <AnimePhotoWrapper>
            <AnimePhoto src={animePhotoURL} alt={`Image poster of ${animeName}`}/>
            <ReviewButton>See Review</ReviewButton>
        </AnimePhotoWrapper>
        <AnimeName>{animeName}</AnimeName>
        <AnimeRatingWrapper>
            <RatingStar src={ratingStar} alt="Small star Icon for Review Score"/>
            {animeRating}
        </AnimeRatingWrapper>
    </AnimeCardWrapper>
  );
};


// Styles
const AnimeCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-item: center;
    margin: 10px 5px;
`

const AnimePhoto = styled.img`
    width: 215px;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
    transition: all 0.3 ease;
`

const AnimeName = styled.h3`
    max-width: 215px;
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
    margin: 0;
    margin-top: 8px;

    // prevent overflow of text
    word-wrap: break-word;
    word-break; break-word;
`

const AnimeRatingWrapper = styled.p`
    font-size: 16px;
    margin: 0;
    margin-top: 4px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
`
const RatingStar = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 4px;
`

const ReviewButton = styled.button`
    position: absolute;
    font-size: 16px;
    width: 140px;
    height: 40px;
    border-radius: 20px;
    top: 208px;
    left: 32px;
    transition: opacity 0.3 ease;
    outline: none;
    border: none;

    // Hide button before hover
    visibility: hidden;
    opacity: 0;
`

const AnimePhotoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-item: center;

    &:hover ${AnimePhoto} {
        filter: brightness(0.6);
    }

    &:hover ${ReviewButton} {
        opacity: 1;
        visibility: visible;
    }
`
