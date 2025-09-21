import { useEffect, useState } from "react";
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function App() {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(true);

  const getAllCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/courses`);
      const updatedCourses = res.data.courses;
      console.log(res.data.message);
      setData(updatedCourses);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCourse();
  }, [])

  const handleApply = async(id) => {
    try {
      const res = await axios.post(`${API_URL}/courses/apply/${id}`);
      const updatedCourse = res.data.course;
      setData(prev => prev.map(c => c._id === id ? updatedCourse : c))
      alert(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleDrop = async(id) => {
    try {
      const res = await axios.post(`${API_URL}/courses/drop/${id}`);
      const updatedCourse = res.data.course;
      setData(prev => prev.map(c => c._id === id ? updatedCourse : c))
      alert(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleAddRating = async (id) => {
    try {
      const res = await axios.patch(`${API_URL}/courses/rate/${id}`, { rating });
      const updatedCourse = res.data.course;
      setData(prev =>
        prev.map(c => (c._id === id ? updatedCourse : c))
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRating = (e) => {
    setRating(Number(e.target.value));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <span className="text-sm">Loading courses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-black mb-2">Courses</h1>
          <p className="text-gray-500 text-base">Manage your learning journey</p>
        </div>

        {/* Course Grid */}
        <div className="space-y-3">
          {data.map(course => (
            <div
              key={course._id}
              className="group border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 p-6"
            >
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-black">
                      {course.courseName}
                    </h2>
                    {course.isApplied && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-green-200 text-green-600 rounded-full">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        Enrolled
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 font-medium mb-3">
                    {course.courseDept}
                  </p>
                  
                  <p className="text-gray-700 text-base leading-relaxed mb-4">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Course Metadata */}
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <span>{course.duration} hours</span>
                <span>{course.noOfRatings} ratings</span>
                <span className="font-medium text-black">{course.rating}/5</span>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 pt-4">
                {course.isApplied ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {course.isRated ? (
                        <span className="text-sm text-gray-500">
                          You have already rated this course
                        </span>
                      ) : (
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-gray-700">
                            Rate course:
                          </label>
                          <select
                            value={rating}
                            onChange={handleRating}
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAddRating(course._id)}
                            className="px-4 py-1.5 bg-black text-white cursor-pointer text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleDrop(course._id)}
                      className="px-4 py-2 border cursor-pointer border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Drop Course
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleApply(course._id)}
                      className="px-6 py-2 bg-black cursor-pointer text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Enroll
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-black mb-2">No courses available</h3>
            <p className="text-gray-500">Check back later for new course offerings</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;