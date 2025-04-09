import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

// Query or Utils
import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";
import { GET_REVIEW_ANIME_DATA_BY_ID } from "../graphql/anilistQuery";
import { WhatsNewAnime } from "../utils/whatsNewList";

// Components
import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";
import { AnimeList } from "../components/AnimeList/AnimeList";
import { SkeletonReviewBanner } from "../components/SkeletonReviewBanner/SkeletonReviewBanner";
import { SkeletonReviewSynops } from "../components/SkeletonReviewSynops/SkeletonReviewSynops";
import { SkeletonReviewList } from "../components/SkeletonReviewList/SkeletonReviewList";
import { SkeletonAnimeList } from "../components/SkeletonAnimeList";

export const AnimeReview = () => {

    const {id} = useParams<{id: string}>();

    // Parsing String into Number for API Call
    const anilist_id = Number(id);
    // Send user to error page maybe?
    if (isNaN(anilist_id)) {
        return <p>Invalid ID</p>;
    }

    const navigate = useNavigate();

    const {
        data: anilistData,
        loading: anilistLoading,
        error: anilistError,
      } = useQuery(GET_REVIEW_ANIME_DATA_BY_ID, {
        variables: { id: anilist_id },
        context: { clientName: "anilist" },
        fetchPolicy: 'cache-first',
      });
          // API Error, maybe move user to error page?
          if (anilistError) {
            navigate("/error");
            return null;
          }

          const { 
              data: reviewsData, 
              loading: reviewsLoading, 
        error: reviewsError 
    } = useQuery(GET_REVIEWS_BY_ANILISTID, {
            variables: { anilist_id: 12345 }
          });

          // API Error, maybe move user to error page?
          if (reviewsError) {
            navigate("/error");
            return null;
          }
          
          
          const { randomFour: whatsNewList, loading: whatsNewLoading, error: whatsNewError } = WhatsNewAnime();

          // API Error Redirect to Error page
          if (whatsNewError) {
            navigate("/error");
            return null;
          }

          if(anilistLoading || reviewsLoading || whatsNewLoading) {
            return (
                <AnimeReviewWrapper>
                    <SkeletonReviewBanner />
                    <SkeletonReviewSynops />
                    <SkeletonReviewList />
                    <SkeletonAnimeList listType="Related Contents" />
                    <SkeletonAnimeList listType="Something New" />
                </AnimeReviewWrapper>
            )
          }
          
          const animeData = anilistData.Media;
          const reviews = reviewsData.getReviewsByAnilistId.data;

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
            {/* <AnimeList listType="Related Content"/> */}
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
