
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    year: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await axiosInstance.get(`/books/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching book:', error.response?.data?.message || error.message);
          setError('Failed to load book data.');
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosInstance.put(`/books/${id}`, formData);
      } else {
        await axiosInstance.post('/books', formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error.response?.data?.message || error.message);
      setError('Failed to save book. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Book' : 'Add Book'}</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Published Year"
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {id ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddEditBook;
