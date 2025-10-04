
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance.js';
import BookCard from '../components/BookCard.jsx';
import Pagination from '../components/Pagination.jsx';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/books?page=${page}`);
        setBooks(response.data.books);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default BookList;
