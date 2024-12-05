import React, { useState, useEffect } from "react";
import ReviewList from "./ReviewList";
import reviewsData from "../data/cochrane_reviews.json";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  // Extract unique topics from the reviews data
  useEffect(() => {
    const topics = Array.from(new Set(reviewsData.map((review) => review[0].topic)));
    setSuggestions(topics);
  }, []);

  // Handle input change and generate suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Filter suggestions based on the input value
    const filteredSuggestions = suggestions.filter((topic) =>
      topic && typeof topic === "string" && topic.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to 5 suggestions

    // Filter reviews based on the input value
    const filteredReviews = reviewsData.filter((review) =>
      review[0].topic && review[0].topic.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredReviews(filteredReviews);
  };

  // Handle suggestion click
  const handleSuggestionClick = (topic) => {
    setSearchInput(topic);
    const filteredReviews = reviewsData.filter((review) => review[0].topic === topic);
    setFilteredReviews(filteredReviews);
  };

  return (
    <div>
      <div style={{ position: "relative", textAlign: "right", marginBottom: "20px" }}>
        {/* Search Input with Icon */}
        <div style={{ display: "inline-block", position: "relative" }}>
          <input
            type="text"
            placeholder="Search by Topic..."
            value={searchInput}
            onChange={handleInputChange}
            style={{
              width: "250px",
              padding: "10px 35px 10px 15px",
              border: "2px solid #962d91",
              fontSize: "16px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              outline: "none",
              marginTop: "5px",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
              color: "#962d91",
              cursor: "pointer",
            }}
          >
            🔍 {/* Search Icon */}
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              left: "auto",
              listStyle: "none",
              margin: "5px 0 0",
              padding: "0",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              maxHeight: "150px",
              overflowY: "auto",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              width: "250px",
            }}
          >
            {suggestions.map((topic, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(topic)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                  color: "#007bff",
                }}
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Review List */}
      <ReviewList reviews={filteredReviews} />
    </div>
  );
};

export default SearchBar;