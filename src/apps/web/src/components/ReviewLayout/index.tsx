// src/pages/ReviewLayout.tsx

import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { GET_REVIEW_ANIME_DATA_BY_ID } from "../../graphql/anilistQuery";
import { ReviewBanner } from "../../components/ReviewBanner/ReviewBanner";
import { SkeletonReviewBanner } from "../../components/SkeletonReviewBanner/SkeletonReviewBanner";
import { SkeletonReviewSynops } from "../../components/SkeletonReviewSynops/SkeletonReviewSynops";
import { SkeletonReviewList } from "../../components/SkeletonReviewList/SkeletonReviewList";
import { SkeletonAnimeList } from "../../components/SkeletonAnimeList";

export const ReviewLayout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const anilist_id = Number(id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data, loading, error } = useQuery(GET_REVIEW_ANIME_DATA_BY_ID, {
    variables: { id: anilist_id },
    context: { clientName: "anilist" },
    fetchPolicy: "cache-first",
    skip: isNaN(anilist_id),
  });

  const animeData = data?.Media;

  useEffect(() => {
    if (isNaN(anilist_id)) {
      navigate("/error");
    }
  }, [anilist_id, navigate]);

  useEffect(() => {
    if (!animeData?.bannerImage) return;
    const img = new Image();
    img.src = animeData.bannerImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [animeData?.bannerImage]);

  if (loading || !imageLoaded || !animeData) {
    return (
      <>
        <SkeletonReviewBanner />
        <SkeletonReviewSynops />
        <SkeletonReviewList />
        <SkeletonAnimeList listType="Related Contents" />
        <SkeletonAnimeList listType="Something New" />
      </>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <ReviewBanner animeData={animeData} />
      <Outlet context={{ animeData: data.Media, isReady: true }} />
      </>
  );
};
