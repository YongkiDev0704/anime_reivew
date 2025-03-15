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
        {/* !!!! Need to change testing src for photo image to AnimePhotoURL later */}
        <AnimePhoto src={'https://i.pinimg.com/originals/4a/d3/89/4ad389052b4cf159fd601ae4dbd4ecbc.png'} alt={`Image poster of ${animeName}`}/>
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
`

const AnimePhoto = styled.img`
    width: 215px;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
    transition: all 0.3 ease;

    &:hover {
        filter: brightness(0.6);
    }
`

const AnimeName = styled.h3`
    max-width: 215px;
    font-size: 16px;
    font-weight: bold;
    color: lightblue;
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
`
const RatingStar = styled.img`
    width: 16px;
    height: 16px;
`