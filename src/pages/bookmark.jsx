import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Bookmark() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/bookmarks")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("error", err));
  }, []);

  const searchData = data.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  const del = async (id) => {
    if (window.confirm("Delete this?")) {
      await fetch(`http://localhost:3001/bookmarks/${id}`, {
        method: "DELETE",
      });
      setData((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div>
      <h3>Show the bookmark</h3>
      <input
        type="search"
        value={search}
        placeholder="search title"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {searchData.length > 0 ? (
          searchData.map((d) => (
            <li key={d.id}>
              {d.title} | {d.category} |
              <a href={d.url} target="_blank">
                {d.url}
              </a>
              <button onClick={() => del(d.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No bookmark</li>
        )}
      </ul>
    </div>
  );
}

export default Bookmark;
