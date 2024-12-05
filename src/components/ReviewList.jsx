import React from "react";

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list-container">
      {reviews.length > 0 ? (
        reviews.map((reviewArray, index) => {
          const review = reviewArray[0]; // Access the first element of the inner array
          return (
            <div key={index} className="review-card">
              <h2 className="review-title">
                <a href={review.url} target="_blank" rel="noopener noreferrer">
                  {review.title}
                </a>
              </h2>
              <p className="review-authors">{review.author}</p>
              {/* <p className="review-topic">Topic: {review.topic?.toLowerCase()}</p> */}
              <p className="review-date">{review.date}</p>
            </div>
          );
        })
      ) : (
        <p className="no-results">No reviews found.</p>
      )}
    </div>
  );
};

export default ReviewList;