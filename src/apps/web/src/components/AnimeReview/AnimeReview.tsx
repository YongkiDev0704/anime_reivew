import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { GET_REVIEW_BY_USERNAME } from "../../apollo/reviewQuery";

type AnimeReviewProps = {
    username: string;
}

export const AnimeReview = ({username}: AnimeReviewProps ) => {

    const { data, loading, error } = useQuery(GET_REVIEW_BY_USERNAME, {
        variables: { username }
      });
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      if (!data?.getReviewByUsername?.success) return <p>No review found</p>;
    
      const review = data.getReviewByUsername.data;

    return (
        <AnimeReviewWrapper>
            <h3>{review.username}</h3>
            <p>Rating: {review.review_rating}</p>
            <p>Comment: {review.review_comment}</p>
        </AnimeReviewWrapper>
    );
};

const AnimeReviewWrapper = styled.section`
    display: flex;
    flex-direction: column;
`;