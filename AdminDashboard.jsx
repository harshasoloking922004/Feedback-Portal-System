import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, LogOut, PlusCircle, List, ShieldAlert, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#0a0a0a] shadow-md border-b border-green-900/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-green-500 flex items-center gap-2">
            <span className="bg-green-500 text-white p-1 rounded-md">
              <List size={20} />
            </span>
            FeedbackPortal
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-400 hover:text-green-500 flex items-center gap-1 transition-colors">
                  <Home size={18} /> <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link to="/feedbacks" className="text-gray-400 hover:text-green-500 flex items-center gap-1 transition-colors">
                  <MessageSquare size={18} /> <span className="hidden sm:inline">Feedbacks</span>
                </Link>
                <Link to="/submit-feedback" className="text-gray-400 hover:text-green-500 flex items-center gap-1 transition-colors">
                  <PlusCircle size={18} /> <span className="hidden sm:inline">Submit</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors">
                    <ShieldAlert size={18} /> <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}
                
                <div className="border-l pl-4 border-green-900/50 flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-300 bg-[#111111] px-3 py-1 rounded-full">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-400 hover:text-green-500 font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-medium transition-colors shadow-sm">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
