
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition">
      <h2 className="text-xl font-bold text-blue-900 mb-2">{book.title}</h2>
      <p className="text-gray-600 mb-2">by {book.author}</p>
      <p className="text-gray-500 line-clamp-3">{book.description}</p>
      <Link
        to={`/books/${book._id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
