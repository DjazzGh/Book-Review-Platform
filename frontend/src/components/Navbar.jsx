
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <nav className="bg-blue-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/books" className="text-xl font-bold flex items-center">
          <img src="/logo.jpg" alt="Logo" className="h-8 mr-2 animate-spin-slow" />
          Book Review
        </Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <Link to="/books" className="hover:text-blue-200 transition">Home</Link>
              <Link to="/add-book" className="hover:text-blue-200 transition">Add Book</Link>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
              <Link to="/signup" className="hover:text-blue-200 transition">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
