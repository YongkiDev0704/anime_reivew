import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";
import {
  GET_REVIEW_ANIME_DATA_BY_ID,
  GET_RELATED_ANIME,
  GET_NEW_ANIME
} from "../graphql/anilistQuery";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";
import { AnimeList } from "../components/AnimeList/AnimeList";

type AnilistMedia = {
  title: {
    romaji: string;
  };
  coverImage: {
    large: string;
  };
  averageScore: number;
};

export const AnimeReview = () => {
  const { id } = useParams<{ id: string }>();
  const anilist_id = Number(id);

  if (isNaN(anilist_id)) {
    return <p>Invalid ID</p>;
  }

  const {
    data: anilistData,
    loading: anilistLoading,
    error: anilistError,
  } = useQuery(GET_REVIEW_ANIME_DATA_BY_ID, {
    variables: { id: anilist_id },
    context: { clientName: "anilist" },
    fetchPolicy: "cache-first",
  });

  if (anilistLoading) return <p>Loading anime info...</p>;
  if (anilistError) return <p>Error: {anilistError.message}</p>;

  const animeData = anilistData.Media;

  const {
    data: reviewsData,
    loading: reviewsLoading,
    error: reviewsError,
  } = useQuery(GET_REVIEWS_BY_ANILISTID, {
    variables: { anilist_id },
  });

  const {
    data: relatedData,
    loading: relatedLoading,
    error: relatedError,
  } = useQuery(GET_RELATED_ANIME, {
    variables: {
      genres: animeData.genres,
      excludeId: animeData.id,
    },
    context: { clientName: "anilist" },
  });

  const {
    data: newAnimeData,
    loading: newAnimeLoading,
    error: newAnimeError,
  } = useQuery(GET_NEW_ANIME, {
    context: { clientName: "anilist" },
  });

  if (reviewsLoading || relatedLoading || newAnimeLoading)
    return <p>Loading...</p>;

  if (reviewsError) return <p>Error loading reviews: {reviewsError.message}</p>;
  if (relatedError) return <p>Error loading related anime: {relatedError.message}</p>;
  if (newAnimeError) return <p>Error loading new anime: {newAnimeError.message}</p>;

  const reviews = reviewsData.getReviewsByAnilistId.data;
  const relatedAnimes = relatedData?.Page?.media || [];
  const newAnimes = newAnimeData?.Page?.media || [];

  return (
    <AnimeReviewWrapper>
      <ReviewBanner animeData={animeData} />
      <ReviewSynops animeData={animeData} />
      <UserReviewList reviews={reviews} />
      <AnimeList
        listType="Related Content"
        data={relatedAnimes.map((anime: AnilistMedia) => ({
            animeName: anime.title.romaji,
            animePhotoURL: anime.coverImage.large,
            animeRating: anime.averageScore,
        }))}
    />

    <AnimeList
        listType="Something New"
        data={newAnimes.map((anime: AnilistMedia) => ({
            animeName: anime.title.romaji,
            animePhotoURL: anime.coverImage.large,
            animeRating: anime.averageScore,
        }))}
    />

    </AnimeReviewWrapper>
  );
};

const AnimeReviewWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--main-background);
  padding-bottom: 100px;
`;
