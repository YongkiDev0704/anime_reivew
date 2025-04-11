import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";
import { useWhatsNewAnime } from "../utils/whatsNewList";
import {
  GET_REVIEW_ANIME_DATA_BY_ID,
  GET_RELATED_ANIME
} from "../graphql/anilistQuery";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";
import { AnimeList } from "../components/AnimeList/AnimeList";

// Skeletons
import { SkeletonReviewBanner } from "../components/SkeletonReviewBanner/SkeletonReviewBanner";
import { SkeletonReviewSynops } from "../components/SkeletonReviewSynops/SkeletonReviewSynops";
import { SkeletonReviewList } from "../components/SkeletonReviewList/SkeletonReviewList";
import { SkeletonAnimeList } from "../components/SkeletonAnimeList";    

export const AnimeReview = () => {
  const { id } = useParams<{ id: string }>();
  const anilist_id = Number(id);
  const navigate = useNavigate();

  // Run All GraphQL Hooks at TOP ** TOGETHER **
  const { data: anilistData, loading: anilistLoading, error: anilistError } = useQuery(
    GET_REVIEW_ANIME_DATA_BY_ID,
    {
      variables: { id: anilist_id },
      context: { clientName: "anilist" },
      fetchPolicy: "cache-first",
      skip: isNaN(anilist_id),
    }
);

    const animeData = anilistData?.Media;

  const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useQuery(
    GET_REVIEWS_BY_ANILISTID,
    {
      variables: { anilist_id },
      fetchPolicy: "network-only",
    }
  );

  const { data: relatedData, loading: relatedLoading, error: relatedError } = useQuery(
    GET_RELATED_ANIME,
    {
      variables: {
        genres: animeData?.genres,
        excludeId: animeData?.id,
      },
      context: { clientName: "anilist" },
    }
  );

  const { randomFour: whatsNewList, loading: whatsNewLoading, error: whatsNewError } = useWhatsNewAnime();

  if (isNaN(anilist_id)) {
    navigate("/error");
    return null;
  }
  
  // if Data is Loading Show Skeleton
  if (anilistLoading || reviewsLoading || relatedLoading || whatsNewLoading) return renderSkeleton();
  
  // API Request Errors
  if (anilistError) return <p>{anilistError.message}</p>;
  if (reviewsError) return <p>{reviewsError.message}</p>;
  if (relatedError) return <p>{relatedError.message}</p>;
  if (whatsNewError) return <p>{whatsNewError.message}</p>;

  const relatedAnimes = relatedData?.Page?.media || [];
  const reviews = reviewsData?.getReviewsByAnilistId?.data ?? [];

  const formatAnime = (anime: any) => ({
    animeId: anime.id.toString(),
    animeRomajiName: anime.title.romaji,
    animeEnglishName: anime.title.english,
    animePhotoURL: anime.coverImage.large,
    animeRating: anime.averageScore / 10,
  });
  
  const animeName = animeData.title.english ? animeData.title.english : animeData.title.romaji;

  return (
    <AnimeReviewWrapper>
      <ReviewBanner animeData={animeData} />
      <ReviewSynops animeData={animeData} />
      <UserReviewList reviews={reviews} animeName={animeName}/>
      <AnimeList
        listType="Related Content"
        data={relatedAnimes.map(formatAnime)}
      />
      <AnimeList 
        listType="Something New"
        data={whatsNewList.map(formatAnime)} 
      />
    </AnimeReviewWrapper>
  );
};

const renderSkeleton = () => {
  return (
    <AnimeReviewWrapper>
      <SkeletonReviewBanner />
      <SkeletonReviewSynops />
      <SkeletonReviewList />
      <SkeletonAnimeList listType="Related Contents" />
      <SkeletonAnimeList listType="Something New" />
    </AnimeReviewWrapper>
  );
};

const AnimeReviewWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--main-background);
  padding-bottom: 100px;
`;