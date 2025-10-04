
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import ReviewCard from '../components/ReviewCard';
import { AuthContext } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [formData, setFormData] = useState({ rating: 1, reviewText: '' });
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookResponse = await axiosInstance.get(`/books/${id}`);
        const reviewsResponse = await axiosInstance.get(`/reviews/book/${id}`);
        setBook(bookResponse.data);
        setReviews(reviewsResponse.data.reviews);
        setAverageRating(reviewsResponse.data.averageRating);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
      setLoading(false);
    };
    fetchBook();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await axiosInstance.put(`/reviews/${editingReview._id}`, formData);
        setEditingReview(null);
      } else {
        await axiosInstance.post('/reviews', { ...formData, bookId: id });
      }
      const reviewsResponse = await axiosInstance.get(`/reviews/book/${id}`);
      setReviews(reviewsResponse.data.reviews);
      setAverageRating(reviewsResponse.data.averageRating);
      setFormData({ rating: 1, reviewText: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setFormData({ rating: review.rating, reviewText: review.reviewText });
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      const reviewsResponse = await axiosInstance.get(`/reviews/book/${id}`);
      setAverageRating(reviewsResponse.data.averageRating);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEditBook = () => {
    navigate(`/edit-book/${id}`);
  };

  const handleDeleteBook = async () => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Prepare data for rating distribution chart
  const ratingDistribution = Array(5).fill(0).map((_, i) => ({
    rating: i + 1,
    count: reviews.filter((r) => r.rating === i + 1).length,
  }));

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Average Rating:</strong> {averageRating.toFixed(1)}/5</p>
      {user && book.addedBy._id === user.id && (
        <div className="space-x-2 mb-4">
          <button onClick={handleEditBook} className="bg-blue-500 text-white px-3 py-1 rounded">
            Edit Book
          </button>
          <button onClick={handleDeleteBook} className="bg-red-500 text-white px-3 py-1 rounded">
            Delete Book
          </button>
        </div>
      )}
      <h2 className="text-xl font-bold mb-2">Reviews</h2>
      {user && (
        <form onSubmit={handleReviewSubmit} className="mb-4">
          <select
            name="rating"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            className="p-2 border rounded mr-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <input
            type="text"
            name="reviewText"
            value={formData.reviewText}
            onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
            placeholder="Write a review"
            className="p-2 border rounded w-1/2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded ml-2">
            {editingReview ? 'Update Review' : 'Add Review'}
          </button>
        </form>
      )}
      {reviews.length > 0 ? (
        <>
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onEdit={handleEditReview}
              onDelete={handleDeleteReview}
              userId={user?.id}
            />
          ))}
          <h2 className="text-xl font-bold mt-4 mb-2">Rating Distribution</h2>
          <BarChart width={500} height={300} data={ratingDistribution}>
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default BookDetails;
