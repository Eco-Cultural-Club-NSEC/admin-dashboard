import React, { useEffect, useState } from "react";

export default function Searchbar({ data, setSearchData, setIsSearch }) {
  const [searchBoxData, setSearchBoxData] = useState("");

  const onSearch = () => {
    const info = data.filter((name) => {
      if (Array.isArray(name.Name))
        return name.Name[0].toLowerCase().startsWith(searchBoxData.trim().toLowerCase());
      else return name.Name.toLowerCase().startsWith(searchBoxData.trim().toLowerCase());
    });
    setSearchData(info);
    setIsSearch(true);
  };

  useEffect(() => {
    if (searchBoxData === "") {
      setIsSearch(false);
    }
  }, [searchBoxData]);

  return (
    <div className="flex items-center">
      <div className="flex border border-purple-200 rounded">
        <input
          type="text"
          className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          value={searchBoxData}
          onChange={(e) => {
            setSearchBoxData(e.target.value);
          }}
        />
        <button
          className="px-4 text-white bg-purple-600 border-l rounded "
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
