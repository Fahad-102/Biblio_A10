"use client";

const SearchBooks = ({
  search = "",
  category = "",
  availability = "",
  minFee = "",
  maxFee = "",
}) => {
  return (
    <form
      action="/browse-books"
      className="flex flex-col gap-3 w-full"
    >
      {/* TOP ROW */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by title..."
          className="input input-bordered w-full flex-1 min-w-0"
        />

        <select
          name="category"
          defaultValue={category}
          className="select select-bordered w-full sm:w-40"
        >
          <option value="">All Categories</option>
          <option value="Islamic">Islamic</option>
          <option value="Novel">Novel</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Biography">Biography</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      {/* SECOND ROW */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <select
          name="availability"
          defaultValue={availability}
          className="select select-bordered w-full sm:w-40"
        >
          <option value="">All Availability</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <input
          type="number"
          name="minFee"
          defaultValue={minFee}
          placeholder="Min Fee"
          className="input input-bordered w-full sm:w-28"
        />

        <input
          type="number"
          name="maxFee"
          defaultValue={maxFee}
          placeholder="Max Fee"
          className="input input-bordered w-full sm:w-28"
        />
      </div>

      {/* BUTTON ROW */}
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary flex-1">
          Filter
        </button>

        <a href="/browse-books" className="btn btn-outline">
          Reset
        </a>
      </div>
    </form>
  );
};

export default SearchBooks;