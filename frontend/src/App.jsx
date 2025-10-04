
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import BookList from './pages/BookList.jsx';
import BookDetails from './pages/BookDetails.jsx';
import AddEditBook from './pages/AddEditBook.jsx';
import './App.css';

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/books" replace /> : <Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route
            path="/add-book"
            element={
              <ProtectedRoute>
                <AddEditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-book/:id"
            element={
              <ProtectedRoute>
                <AddEditBook />
              </ProtectedRoute>
            }
          />
       
        </Routes>
      </Router>
    </div>
  );
};

export default App;
