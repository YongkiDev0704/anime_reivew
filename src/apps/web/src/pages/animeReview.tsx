import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

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
  // Parsing String into Number for API Call
  const anilist_id = Number(id);

    const {
        data: anilistData,
        loading: anilistLoading,
        error: anilistError,
      } = useQuery(GET_REVIEW_ANIME_DATA_BY_ID, {
        variables: { id: anilist_id },
        context: { clientName: "anilist" },
        fetchPolicy: 'cache-first',
        skip: isNaN(anilist_id)
    });
    
    if (isNaN(anilist_id)) {
        return <p>Invalid ID</p>;
    }

    const renderSkeleton = () => {
            <AnimeReviewWrapper>
                <SkeletonReviewBanner />
                <SkeletonReviewSynops />
                <SkeletonReviewList />
                <SkeletonAnimeList listType="Related Contents" />
                <SkeletonAnimeList listType="Something New" />
            </AnimeReviewWrapper>
    }
    
    if(anilistLoading) return renderSkeleton();

    // API Error, maybe move user to error page?
    if (anilistError) {
        return <p> {anilistError.message} </p>;
    }

    const animeData = anilistData.Media;
    
    const { 
        data: reviewsData, 
        loading: reviewsLoading, 
        error: reviewsError 
    } = useQuery(GET_REVIEWS_BY_ANILISTID, {
        variables: { anilist_id },
        fetchPolicy: 'network-only'
    });
    
    // API Error, maybe move user to error page?
    if (reviewsError) { return <p>{reviewsError.message}</p>;  }

    // const randomGenre = useMemo(() => {
    //     if (!animeData?.genres?.length) return null;
    //     return animeData.genres[Math.floor(Math.random() * animeData.genres.length)];
    //   }, [animeData.genres]);

    // const { randomFive: relatedContList, loading: relatedContLoading, error: relatedContError } = useRelatedContentAnime(randomGenre);
    
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
    
    const { randomFour: whatsNewList, loading: whatsNewLoading, error: whatsNewError } = useWhatsNewAnime();

    // if (relatedContError) {
    //     return <p>{relatedContError.message}</p>;
    // }
    if (relatedError) return <p>Error loading related anime: {relatedError.message}</p>;
    
    // API Error Redirect to Error page
    if (whatsNewError) {
        return <p>{whatsNewError.message}</p>;
    }
    
    
    if( reviewsLoading || relatedLoading || whatsNewLoading ) return renderSkeleton();
    
    const relatedAnimes = relatedData?.Page?.media || [];
    const reviews = reviewsData.getReviewsByAnilistId?.data ?? [];
    
    const formatAnime = (anime: any) => ({
        animeName: anime.title.english? anime.title.english : anime.title.romaji,
        animePhotoURL: anime.coverImage.large,
        animeRating: anime.averageScore / 10,
    });
    
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
            <AnimeList listType="Something New" data={whatsNewList.map(formatAnime)}/>
        </AnimeReviewWrapper>
    );
};

const AnimeReviewWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--main-background);
  padding-bottom: 100px;
`;
