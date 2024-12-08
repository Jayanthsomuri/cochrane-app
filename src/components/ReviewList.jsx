import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';

const ReviewList = ({ reviews, searchTopic, onSearch }) => {
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const REVIEWS_PER_PAGE = 10;
  const observerRef = useRef(null);
  const bottomElementRef = useRef(null);

  // Flatten the reviews array
  const flattenedReviews = useMemo(() => {
    const flattened = Array.isArray(reviews[0]) ? reviews.flat() : reviews;
    return flattened || [];
  }, [reviews]);

  // Filter reviews based on the search topic
  const filteredReviews = useMemo(() => {
    if (!searchTopic || searchTopic.trim() === "") {
      return flattenedReviews;
    }
    return flattenedReviews.filter((review) =>
      review.topic.toLowerCase().includes(searchTopic.toLowerCase())
    );
  }, [flattenedReviews, searchTopic]);

  // Load more reviews
  const loadMoreReviews = useCallback(() => {
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    const newReviews = filteredReviews.slice(startIndex, endIndex);
    
    setVisibleReviews(prev => [...prev, ...newReviews]);
    setCurrentPage(prev => prev + 1);
  }, [filteredReviews, currentPage]);

  // Initial load of reviews
  useEffect(() => {
    // Reset when filters change
    setVisibleReviews(filteredReviews.slice(0, REVIEWS_PER_PAGE));
    setCurrentPage(1);
  }, [filteredReviews]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && 
            visibleReviews.length < filteredReviews.length) {
          loadMoreReviews();
        }
      },
      { threshold: 1.0 }
    );

    if (bottomElementRef.current) {
      observerRef.current = observer;
      observer.observe(bottomElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreReviews, filteredReviews.length, visibleReviews.length]);

  // Handle clearing the search
  const handleClearSearch = () => {
    onSearch("");
  };

  // If no reviews, return null
  if (filteredReviews.length === 0) {
    return null;
  }

  return (
    <div className="review-list-container">
      {/* Search Topic Header */}
      {searchTopic && searchTopic.trim() && (
        <div className="search-header">
          <div className="header-container">
            <p className="header">Topics:</p>
            <p className="tag">
              {searchTopic}{" "}
              <span 
                className="close-icon" 
                onClick={handleClearSearch}
              >
                &times;
              </span>
            </p>
          </div>
          <p className="review-summary">
            <strong>{filteredReviews.length}</strong> Cochrane Reviews matching{" "}
            <strong>{searchTopic} in Cochrane Topic</strong>
          </p>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="reviews-grid">
        {visibleReviews.map((review, index) => (
          <div 
            key={`${review.id}-${index}`} 
            className="review-card"
          >
            <div className="review-card-content">
              <h2 className="review-title">
                <a 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {review.title}
                </a>
              </h2>
              <p className="review-authors">{review.author}</p>
              <p className="review-date">{review.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Observer */}
      {visibleReviews.length < filteredReviews.length && (
        <div 
          ref={bottomElementRef} 
          className="load-more-indicator"
        >
          Loading more...
        </div>
      )}
    </div>
  );
};

export default ReviewList;