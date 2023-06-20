import React, { useState, useEffect } from "react";
import getAllItems from "../../utils/getAllItems";

const ItemSearch = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        console.log("Error retrieving items:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setSearchResults(filteredItems);
  }, [items, search]);

  const handleChange = (event) => {
    event.preventDefault();
    console.log('Search query:', search);
  };

  return (
    <div>
      <form onSubmit={handleChange}>
        <input
          type="text"
          placeholder="Search for an item..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((item) => {
          <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </div>
  );
};

export default ItemSearch;