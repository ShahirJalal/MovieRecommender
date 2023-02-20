import React from "react";

// Takes in total number of posts, number of posts per page and a setCurrentPage function
const Pagination = ({ totalPosts, postsPerpage, setCurrentPage }) => {
  let pages = [];

  // Loop for all pages
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++) {
    pages.push(i);
  }

  // Pagination component
  return (
    <div>
      {pages.map((page, index) => {
        return (
          <button
            className="btn btn-secondary btn-sm text-white"
            style={{ border: "1px solid white" }}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
export default Pagination;