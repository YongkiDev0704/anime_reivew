import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Query or Utils
import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";
import { GET_REVIEW_ANIME_DATA_BY_ID } from "../graphql/anilistQuery";
import { useRelatedContentAnime } from "../utils/relatedContentList";
import { useWhatsNewAnime } from "../utils/whatsNewList";

// Components
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

    const {id} = useParams<{id: string}>();

    // Parsing String into Number for API Call
    const anilist_id = Number(id);

    const navigate = useNavigate();

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

    useEffect(() => {
        if (anilistError) {
          navigate("/error");
        }
    }, [anilistError, navigate]);

    // API Error, maybe move user to error page?
    if (anilistError) {
        return null;
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

    const randomGenre = useMemo(() => {
        if (!animeData?.genres?.length) return null;
        return animeData.genres[Math.floor(Math.random() * animeData.genres.length)];
      }, [animeData.genres]);

    const { randomFive: relatedContList, loading: relatedContLoading, error: relatedContError } = useRelatedContentAnime(randomGenre);
    const { randomFour: whatsNewList, loading: whatsNewLoading, error: whatsNewError } = useWhatsNewAnime();
    

    if (relatedContError) {
        return <p>{relatedContError.message}</p>;
    }

    // API Error Redirect to Error page
    if (whatsNewError) {
        return <p>{whatsNewError.message}</p>;
    }
    
    
    if( reviewsLoading || relatedContLoading || whatsNewLoading ) return renderSkeleton();
    
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
            <AnimeList listType="Related Content" data={relatedContList.map(formatAnime)}/>
            <AnimeList listType="Something New" data={whatsNewList.map(formatAnime)}/>
        </AnimeReviewWrapper>
    );
};

const AnimeReviewWrapper = styled.section`
display: flex;
flex-direction: column;
background-color: var(--main-background);
padding-bottom: 70px;
margin-bottom: 70px;
`;
