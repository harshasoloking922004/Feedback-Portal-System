import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, CheckCircle, Clock, Trash2, Edit2 } from 'lucide-react';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [feedbacksRes, featuresRes] = await Promise.all([
        axios.get('/feedback'),
        axios.get('/features')
      ]);
      setFeedbacks(feedbacksRes.data);
      setFeatures(featuresRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateFeatureStatus = async (id, status) => {
    try {
      await axios.put(`/features/${id}/status`, { status });
      fetchData(); // Refresh data
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`/feedback/${id}`);
        fetchData();
      } catch (err) {
        console.error('Error deleting feedback:', err);
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading Admin Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-green-900/50">
        <ShieldAlert size={32} className="text-amber-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage feedback and feature requests</p>
        </div>
      </div>

      <div className="bg-[#111111] p-1 rounded-lg mb-8 max-w-md shadow-inner border border-white/5">
        <div className="relative flex w-full">
          {/* Apple-style Sliding Pill */}
          <div 
            className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#222222] rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/10 ${
              activeTab === 'features' ? 'translate-x-0' : 'translate-x-full'
            }`}
          />
          
          <button
            className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-300 ${
              activeTab === 'features' ? 'text-white drop-shadow-sm' : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('features')}
          >
            Feature Requests ({features.length})
          </button>
          <button
            className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-300 ${
              activeTab === 'feedbacks' ? 'text-white drop-shadow-sm' : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('feedbacks')}
          >
            General Feedback ({feedbacks.length})
          </button>
        </div>
      </div>

      {activeTab === 'features' && (
        <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-green-900/50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-black border-b border-green-900/50 text-gray-400 font-medium text-sm">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Votes</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {features.map(feature => (
                <tr key={feature._id} className="hover:bg-black">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-100">{feature.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{feature.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-[#111111] text-gray-400 px-2.5 py-1 rounded-md tracking-wide">
                      {feature.targetProduct || 'Other'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{feature.createdBy?.username}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center bg-green-950 text-green-500 font-bold w-8 h-8 rounded-full text-xs">
                      {feature.votes}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={feature.status}
                      onChange={(e) => updateFeatureStatus(feature._id, e.target.value)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border outline-none ${
                        feature.status === 'implemented' ? 'bg-green-950 border-green-800 text-green-600' :
                        feature.status === 'under_review' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                        'bg-black border-green-900/50 text-gray-400'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="under_review">Under Review</option>
                      <option value="implemented">Implemented</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-green-500 p-1 transition-colors"><Edit2 size={16} /></button>
                    <button className="text-gray-500 hover:text-red-600 p-1 ml-2 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {features.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No feature requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'feedbacks' && (
        <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-green-900/50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-black border-b border-green-900/50 text-gray-400 font-medium text-sm">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feedbacks.map(feedback => (
                <tr key={feedback._id} className="hover:bg-black">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-100">{feedback.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-md">{feedback.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-[#111111] text-gray-400 px-2.5 py-1 rounded-md tracking-wide">
                      {feedback.targetProduct || 'Other'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-[#111111] text-gray-400 px-2.5 py-1 rounded-md uppercase tracking-wide">
                      {feedback.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{feedback.createdBy?.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => deleteFeedback(feedback._id)}
                      className="text-gray-500 hover:text-red-600 p-1 transition-colors"
                      title="Delete Feedback"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {feedbacks.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No feedback found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
