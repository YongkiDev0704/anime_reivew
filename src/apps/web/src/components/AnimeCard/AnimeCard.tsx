import styled from "styled-components";

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
        <img src={animePhotoURL}/>
        <h3>{animeName}</h3>
        <p>
            {/* <img/> // small star icon*/}
            {animeRating}
        </p>
    </AnimeCardWrapper>
  );
};


// AnimeCard styles
const AnimeCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`