import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ReviewList from "./components/ReviewList";
import reviewsData from "./data/cochrane_reviews.json";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app">
      <SearchBar onSearch={setSearchQuery} />
      <div style={{ marginTop: "30px" }}>
        <ReviewList 
          reviews={reviewsData} 
          searchTopic={searchQuery} 
          onSearch={setSearchQuery}
        />
      </div>
    </div>
  );
};

export default App;