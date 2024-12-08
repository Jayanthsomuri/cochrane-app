import React, { useState, useEffect } from "react";
import reviewsData from "../data/cochrane_reviews.json";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Flatten reviews data to extract unique topics
    const uniqueTopics = Array.from(
      new Set(reviewsData.flat().map((review) => review.topic))
    );
    setTopics(uniqueTopics);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value); // Immediately pass the search query to parent

    if (!value.trim()) {
      setSuggestions([]);
    } else {
      const filteredSuggestions = topics.filter((topic) =>
        topic.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    }
  };

  const handleSuggestionClick = (topic) => {
    setSearchInput(topic);
    onSearch(topic);
    setSuggestions([]);
  };

  // Search Icon SVG Component
  const SearchIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#962d91" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      
    >
      <circle cx="10" cy="10" r="7"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );

  return (
    <div>
      <div style={{ position: "relative", textAlign: "right", marginBottom: "20px" }}>
        <div style={{ display: "inline-block", position: "relative" }}>
          <input
            type="text"
            placeholder="Search topics..."
            value={searchInput}
            onChange={handleInputChange}
            style={{
              width: "250px",
              padding: "10px 35px 10px 15px",
              border: "2px solid #962d91",
              fontSize: "16px",
              color: "#8a2c8a",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              outline: "none",
              marginTop: "5px",
              fontWeight: "bold",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <SearchIcon />
          </div>
        </div>
        {searchInput && suggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              left: "auto",
              listStyle: "none",
              margin: "5px 0 0",
              padding: "0",
              backgroundColor: "#0b2a5c",
              border: "1px solid #ccc",
              borderRadius: "4px",
              maxHeight: "150px",
              overflowY: "auto",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              width: "300px",
            }}
          >
            {suggestions.map((topic, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(topic)}
                style={{
                  padding: "10px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                  color: "white",
                }}
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;