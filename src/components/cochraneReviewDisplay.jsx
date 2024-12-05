import React from 'react';
import reviewsData from '../data/cochrane_reviews.json';

const CochraneReviewsDisplay = () => {
  return (
    <div className="cochrane-reviews-container">
      {reviewsData.map((review, index) => (
        <div key={index} className="cochrane-review-card">
          <h2 className="review-title">{review.title}</h2>
          <p className="review-authors">{review.author}</p>
          <p className="review-date">{review.date}</p>
          <p className="review-topic">{review.topic}</p>
          <a href={review.url} className="review-link">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default CochraneReviewsDisplay;