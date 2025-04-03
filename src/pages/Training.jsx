import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Training = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟培训课程数据
  const trainingCourses = [
    {
      id: 1,
      title: '沙钢云商平台操作指南',
      category: 'platform',
      level: '初级',
      duration: '1小时',
      date: '2024-04-15',
      instructor: '张老师',
      participants: 156,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: '钢铁行业供应链管理基础',
      category: 'business',
      level: '中级',
      duration: '3小时',
      date: '2024-04-20',
      instructor: '李老师',
      participants: 98,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
    },
    {
      id: 3,
      title: '钢铁产品质量标准解读',
      category: 'technical',
      level: '高级',
      duration: '4小时',
      date: '2024-04-25',
      instructor: '王老师',
      participants: 73,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1581093806997-124204d4f2a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      title: '供应商资质认证流程详解',
      category: 'certification',
      level: '初级',
      duration: '2小时',
      date: '2024-04-10',
      instructor: '刘老师',
      participants: 127,
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 5,
      title: '电子招投标实操演练',
      category: 'platform',
      level: '中级',
      duration: '3小时',
      date: '2024-04-05',
      instructor: '赵老师',
      participants: 88,
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 6,
      title: '钢铁行业环保政策解读',
      category: 'policy',
      level: '高级',
      duration: '3小时',
      date: '2024-04-30',
      instructor: '孙老师',
      participants: 65,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ];

  // 课程分类
  const categories = [
    { id: 'all', name: '全部课程' },
    { id: 'platform', name: '平台操作' },
    { id: 'business', name: '业务知识' },
    { id: 'technical', name: '技术标准' },
    { id: 'certification', name: '资质认证' },
    { id: 'policy', name: '政策法规' },
  ];

  // 过滤课程
  const filteredCourses = trainingCourses.filter(course => {
    const matchesCategory = activeTab === 'all' || course.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // 处理报名课程
  const handleEnrollCourse = (courseId) => {
    console.log('报名课程:', courseId);
    alert('您已成功报名该课程，我们将发送培训详情到您的邮箱！');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="relative">
            <div className="h-64 bg-gradient-to-r from-indigo-800 to-indigo-600 flex items-center">
              <div className="px-8 md:px-12 lg:px-16 z-10">
                <h1 className="text-3xl font-bold text-white tracking-tight">供应商培训中心</h1>
                <p className="mt-4 text-lg text-indigo-100 max-w-3xl">
                  提升您的专业能力，获取钢铁行业知识，了解平台操作流程，成为沙钢云商优质供应商
                </p>
                <div className="mt-6">
                  <Link
                    to="/supplier-register"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    成为供应商
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-indigo-600 opacity-90"></div>
            <div className="absolute right-0 bottom-0 hidden lg:block">
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 text-indigo-700 opacity-20">
                <path fill="currentColor" d="M47.1,-57.9C60.2,-44.5,69.2,-29.2,71.3,-13.2C73.3,2.9,68.4,19.6,59.9,35.8C51.4,52,39.4,67.5,23.6,74.4C7.9,81.3,-11.6,79.5,-28.7,72.1C-45.7,64.7,-60.2,51.6,-69.5,35.1C-78.8,18.6,-82.9,-1.2,-78.1,-18.9C-73.3,-36.5,-59.7,-52,-44,-63.2C-28.3,-74.4,-10.6,-81.4,3.3,-85.3C17.2,-89.2,34,-71.2,47.1,-57.9Z" transform="translate(200 200)" />
              </svg>
            </div>
          </div>

          {/* Search and filter section */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="w-full md:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索培训课程..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`
                      whitespace-nowrap px-3 py-1 mx-1 rounded-md text-sm font-medium
                      ${activeTab === category.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-500 hover:bg-gray-100'}
                    `}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="px-6 py-8">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="mt-4 text-gray-500">没有找到相关培训课程</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="h-48 relative">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 m-2">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            course.status === 'upcoming' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {course.status === 'upcoming' ? '即将开始' : '已结束'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                          {categories.find(cat => cat.id === course.category)?.name}
                        </span>
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{course.title}</h3>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{course.date}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="inline-flex items-center mr-4">
                            <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.duration}
                          </span>
                          <span className="inline-flex items-center">
                            <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {course.instructor}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>难度: {course.level}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{course.participants} 人参与</span>
                        </div>
                        {course.status === 'upcoming' && (
                          <button
                            onClick={() => handleEnrollCourse(course.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            立即报名
                          </button>
                        )}
                        {course.status === 'completed' && (
                          <Link
                            to={`/training/${course.id}`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            查看回放
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-gray-50 px-6 py-8 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900">培训指南</h2>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium text-indigo-600">如何报名培训?</h3>
                  <p className="mt-2 text-gray-600">
                    您可以浏览培训课程列表，点击"立即报名"按钮即可报名参加。我们会将培训详情发送到您的注册邮箱。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium text-indigo-600">参与培训的好处</h3>
                  <p className="mt-2 text-gray-600">
                    通过参与培训，您可以深入了解沙钢业务流程，提高操作技能，获得优先合作机会。
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  如需定制化培训或有其他培训需求，请联系我们：training@shagang.com 或 0512-58536666-8888
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Training; 