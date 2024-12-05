import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ReviewList from "./components/ReviewList";
import reviewsData from "./data/cochrane_reviews.json";
import "./App.css";

const App = () => {
  const [filteredReviews, setFilteredReviews] = useState(reviewsData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter reviews by topic
    const filtered = reviewsData.filter((reviewArray) =>
      reviewArray[0]?.topic?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  return (
    <div className="app">
      {searchQuery && (
        <p style={{ marginTop: "10px" }}>
          Topics: <strong>{searchQuery}</strong>
        </p>
      )}

      <SearchBar onSearch={handleSearch} />

      <div style={{ marginTop: "30px" }}>
        <ReviewList reviews={filteredReviews} />
      </div>
    </div>
  );
};

export default App;