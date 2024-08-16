import React from "react";
import { useSearchParams } from "react-router-dom";

function MovieSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "default";

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    if (newSort === "default") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", newSort);
    }
    setSearchParams(searchParams);
  };

  const getIcon = (sortValue) => {
    switch (sortValue) {
      case "title-asc":
        return "bi-sort-alpha-down";
      case "title-desc":
        return "bi-sort-alpha-up-alt";
      case "date-asc":
      case "date-desc":
        return "bi-calendar";
      case "rating-desc":
        return "bi-star-fill";
      default:
        return "bi-arrow-down-up";
    }
  };

  return (
    <div className="d-flex align-items-center">
      <i className={`bi ${getIcon(sort)} me-2`}></i>
      <select
        className="form-select form-select-sm"
        value={sort}
        onChange={handleSortChange}
        style={{ width: "auto" }}
      >
        <option value="default">Default</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="date-asc">Release Date (Oldest First)</option>
        <option value="date-desc">Release Date (Newest First)</option>
        <option value="rating-desc">Highest Rated</option>
      </select>
    </div>
  );
}

export default MovieSort;
