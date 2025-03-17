import styled from "styled-components";

import { AnimeCard } from "../AnimeCard/AnimeCard";

// typedef of props
type AnimeListProps = {
    listType: string;
    // animeList: [] (Something that holds the list of anime could be array map ..etc)
};

// animeList replaced with Array of TestData for now.
const testData = Array(6).fill({
    animeName: "anime_name-testlooooooooooonggeeeeeeer what",
    animePhotoURL: 'https://i.pinimg.com/originals/4a/d3/89/4ad389052b4cf159fd601ae4dbd4ecbc.png',
    animeRating: 7.51
});

// AnimeList component to create a list of AnimeCards from the list.
export const AnimeList = ({listType}: AnimeListProps) => {
    return (
            <AnimeListWrapper>
                <ListInteractContainer>
                    <AnimeListType>{listType}</AnimeListType>
                    <ViewAll>View All</ViewAll>
                </ListInteractContainer>
                <ListBorder/>
                <ListWrapper>
                    {testData.map((aniData, i) => (
                        <AnimeCard
                            key={i}
                            animeName={aniData.animeName}
                            animePhotoURL={aniData.animePhotoURL}
                            animeRating={aniData.animeRating}
                        />
                    ))}
                </ListWrapper>
            </AnimeListWrapper>
    );
};

const AnimeListWrapper = styled.section`
    display: flex;
    flex-direction: column;
    margin: 50px 50px;
`
const ListInteractContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AnimeListType = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: var(--main-text);
    margin: 0;
    margin-bottom: 13px;
`
const ViewAll = styled.h3`
    font-size: 16px;
    font-weight: bold;
    color: var(--main-text);
    margin: 0;
`

const ListBorder = styled.div`
    width: 1340px;
    height: 2px;
    background-color: var(--main-text);
    margin: 0;
    margin-bottom: 40px;
`

const ListWrapper = styled.div`
    display: flex;
`