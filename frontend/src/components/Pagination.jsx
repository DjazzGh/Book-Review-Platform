
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600 hover:bg-blue-100'
          } transition`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
