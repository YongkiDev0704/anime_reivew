import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { GET_REVIEWS_BY_ANILISTID } from "../../apollo/reviewQuery";

type AnimeReviewTestProps = {
    anilist_id: number;
}

export const AnimeReviewTest = ({anilist_id}: AnimeReviewTestProps ) => {

    const { data, loading, error } = useQuery(GET_REVIEWS_BY_ANILISTID, {
        variables: { anilist_id }
      });
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      if (!data?.getReviewsByAnilistId?.success) return <p>No review found</p>;
    
      const reviews = data.getReviewsByAnilistId.data;

    return (
        <AnimeReviewTestWrapper>
            {reviews.map((review: any) => (
            <div key={review._id}>
                <h3>{review.username}</h3>
                <p>Rating: {review.review_rating}</p>
                <p>Comment: {review.review_comment}</p>
                <p>Date: {new Date(Number(review.updatedAt)).toLocaleDateString()}</p>
            </div>
            ))}
        </AnimeReviewTestWrapper>
    );
};

const AnimeReviewTestWrapper = styled.section`
    display: flex;
    flex-direction: column;
`;