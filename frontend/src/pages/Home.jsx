
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-700 text-white m-0 p-0 h-screen overflow-x-hidden overscroll-none">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <img src="/logo.jpg" alt="Logo" className="h-12 mr-3 animate-spin-slow" />
            <h1 className="text-3xl font-bold">Book Review Platform</h1>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Signup
            </Link>
          </div>
        </header>
        <main className="text-center mt-12">
          <h2 className="text-5xl font-extrabold mb-6 animate-fade-in">Discover Your Next Great Read</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our vibrant community to explore books, share reviews, and connect with fellow book lovers. Start your reading journey today!
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-500 transition transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
            >
              Log In
            </Link>
          </div>
          <div className="mt-12">
            <div className="w-full h-64 bg-blue-200 rounded-2xl flex items-center justify-center">
              <img src="/book.jpg" alt="Books" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </main>
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2 text-blue-900">Explore Books</h3>
            <p>Browse a vast collection of books across genres and find your next read.</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2 text-blue-900">Share Reviews</h3>
            <p>Write and share your thoughts, ratings, and insights on your favorite books.</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2 text-blue-900">Connect with Readers</h3>
            <p>Join a community of book enthusiasts and discuss your favorite stories.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
