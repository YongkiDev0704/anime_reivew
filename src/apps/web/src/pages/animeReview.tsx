import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useParams, useOutletContext } from "react-router-dom";

import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";
import { useWhatsNewAnime } from "../utils/whatsNewList";
import { GET_RELATED_ANIME } from "../graphql/anilistQuery";

import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";
import { AnimeList } from "../components/AnimeList/AnimeList";

import { SkeletonReviewSynops } from "../components/SkeletonReviewSynops/SkeletonReviewSynops";
import { SkeletonReviewList } from "../components/SkeletonReviewList/SkeletonReviewList";
import { SkeletonAnimeList } from "../components/SkeletonAnimeList";    

import type { AniListAnimeDetail } from "../types";

type OutletContextType = {
  animeData: AniListAnimeDetail;
};

export const AnimeReview = () => {
  const { id } = useParams<{ id: string }>();
  const anilist_id = Number(id);
  const { animeData } = useOutletContext<OutletContextType>();

  const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useQuery(
    GET_REVIEWS_BY_ANILISTID,
    {
      variables: { anilist_id },
      fetchPolicy: "network-only",
      onError: (error) => {
        const code = (error.networkError as { statusCode?: number })?.statusCode;
        if (typeof code === "number" && [429, 403, 404].includes(code)) {
          window.dispatchEvent(new Event("anilistLimitExceeded"));
        }
      }
      
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

  if (
    reviewsLoading ||
    relatedLoading ||
    whatsNewLoading
  ) {
    return renderSkeleton();
  }

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

  const animeName = animeData.title.english || animeData.title.romaji;

  return (
    <AnimeReviewWrapper>
      <ReviewSynops animeData={animeData} />
      <UserReviewList reviews={reviews} animeName={animeName} animeId={animeData.id}/>
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
