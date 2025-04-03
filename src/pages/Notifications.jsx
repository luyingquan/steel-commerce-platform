import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { announcementData } from '../utils/mockData';

const Notifications = () => {
  const [activeSection, setActiveSection] = useState('全部');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('全部');
  const [sortOrder, setSortOrder] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  // 企业部门
  const sections = [
    { id: '全部', name: '全部' }, 
    { id: '沙钢', name: '沙钢' },
    { id: '淮钢', name: '淮钢' }, 
    { id: '安阳', name: '安阳' },
    { id: '大连', name: '大连' },
    { id: '抚顺', name: '抚顺' }
  ];

  // 公告分类
  const categories = [
    { id: '全部', name: '全部分类' },
    { id: '重要', name: '重要公告' },
    { id: '常规', name: '常规公告' },
    { id: '资讯', name: '行业资讯' },
    { id: '政策', name: '政策法规' },
  ];

  // 时间筛选
  const dateRanges = [
    { id: '全部', name: '全部时间' },
    { id: '7days', name: '最近7天' },
    { id: '30days', name: '最近30天' },
    { id: '90days', name: '最近90天' },
    { id: '2023', name: '2023年' },
    { id: '2022', name: '2022年' },
  ];

  // 添加更多模拟数据（为每个公告添加随机的分类和发布部门）
  useEffect(() => {
    // 模拟对数据添加更多的详细信息
    announcementData.forEach(item => {
      if (!item.views) item.views = Math.floor(Math.random() * 2000) + 100;
      if (!item.category) {
        const randomCategories = ['重要', '常规', '资讯', '政策'];
        item.category = randomCategories[Math.floor(Math.random() * randomCategories.length)];
      }
      if (!item.department) {
        const departments = ['办公室', '采购部', '销售部', '战略发展部', '技术部', '财务部'];
        item.department = departments[Math.floor(Math.random() * departments.length)];
      }
    });
  }, []);

  // 根据日期范围获取日期限制
  const getDateLimit = () => {
    const today = new Date();
    
    switch(dateRange) {
      case '7days':
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        return sevenDaysAgo;
      case '30days':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return thirtyDaysAgo;
      case '90days':
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);
        return ninetyDaysAgo;
      case '2023':
        return new Date('2023-01-01');
      case '2022':
        return new Date('2022-01-01');
      default:
        return new Date('2000-01-01'); // 默认返回很早的日期作为全部时间
    }
  };

  // 根据日期范围筛选 
  const isInDateRange = (itemDate) => {
    const date = new Date(itemDate);
    const limitDate = getDateLimit();
    
    if (dateRange === '2023') {
      return date.getFullYear() === 2023;
    } else if (dateRange === '2022') {
      return date.getFullYear() === 2022;
    } else {
      return date >= limitDate;
    }
  };

  // 重置分页
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, activeCategory, dateRange, searchTerm]);

  // 获取已选筛选条件
  const getActiveFilters = () => {
    const filters = [];
    
    if (activeSection !== '全部') {
      const section = sections.find(s => s.id === activeSection);
      filters.push({ type: 'section', id: activeSection, name: section.name });
    }
    
    if (activeCategory !== '全部') {
      const category = categories.find(c => c.id === activeCategory);
      filters.push({ type: 'category', id: activeCategory, name: category.name });
    }
    
    if (dateRange !== '全部') {
      const range = dateRanges.find(d => d.id === dateRange);
      filters.push({ type: 'date', id: dateRange, name: range.name });
    }
    
    return filters;
  };

  // 移除筛选条件
  const removeFilter = (type) => {
    switch(type) {
      case 'section':
        setActiveSection('全部');
        break;
      case 'category':
        setActiveCategory('全部');
        break;
      case 'date':
        setDateRange('全部');
        break;
      default:
        break;
    }
  };

  // 清除所有筛选条件
  const clearAllFilters = () => {
    setActiveSection('全部');
    setActiveCategory('全部');
    setDateRange('全部');
    setSearchTerm('');
  };

  // Filter notifications based on section, category, date range and search term
  const filteredNotifications = announcementData
    .filter(item => {
      const matchesType = item.type === 'notice';
      const matchesSection = activeSection === '全部' || item.company.includes(activeSection);
      const matchesCategory = activeCategory === '全部' || item.category === activeCategory;
      const matchesDateRange = dateRange === '全部' || isInDateRange(item.date);
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesType && matchesSection && matchesCategory && matchesDateRange && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'latest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOrder === 'views') {
        return b.views - a.views;
      }
      return 0;
    });

  // 计算分页
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem);

  // 页码生成逻辑
  const pageNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pageNumbers.push(i);
      }
    }
  }

  // 处理页面改变
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // 获取活跃筛选条件
  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0 || searchTerm !== '';

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
          <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
            <h1 className="text-2xl font-bold text-blue-900">通知公告</h1>
            <p className="mt-1 text-sm text-blue-600">
              查看沙钢集团最新公告、通知和重要信息
            </p>
          </div>

          {/* Search and filter section */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* 搜索栏和筛选器切换 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="搜索公告标题、内容、发布单位..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-md text-sm text-blue-600 font-medium transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    筛选
                    {hasActiveFilters && (
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs rounded-full">
                        {activeFilters.length + (searchTerm ? 1 : 0)}
                      </span>
                    )}
                  </button>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-2">排序:</span>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="latest">最新</option>
                      <option value="oldest">最早</option>
                      <option value="views">热门</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* 已选筛选条件标签 */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500">已选条件:</span>
                  
                  {searchTerm && (
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                      搜索: {searchTerm.length > 10 ? searchTerm.substring(0, 10) + '...' : searchTerm}
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="ml-1 text-blue-400 hover:text-blue-600"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  
                  {activeFilters.map((filter) => (
                    <span key={filter.type} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                      {filter.type === 'section' ? '企业: ' : filter.type === 'category' ? '分类: ' : '时间: '}
                      {filter.name}
                      <button 
                        onClick={() => removeFilter(filter.type)}
                        className="ml-1 text-blue-400 hover:text-blue-600"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-blue-600 hover:text-blue-800 ml-2"
                    >
                      清除全部
                    </button>
                  )}
                </div>
              )}

              {/* 展开的筛选选项 */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
                  {/* 企业部门 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">企业部门</label>
                    <div className="flex flex-wrap gap-2">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`
                            whitespace-nowrap px-3 py-1 rounded-md text-xs font-medium
                            ${activeSection === section.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}
                          `}
                        >
                          {section.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 公告分类 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">公告分类</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`
                            whitespace-nowrap px-3 py-1 rounded-md text-xs font-medium
                            ${activeCategory === category.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}
                          `}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 时间范围 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">时间范围</label>
                    <div className="flex flex-wrap gap-2">
                      {dateRanges.map((range) => (
                        <button
                          key={range.id}
                          onClick={() => setDateRange(range.id)}
                          className={`
                            whitespace-nowrap px-3 py-1 rounded-md text-xs font-medium
                            ${dateRange === range.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}
                          `}
                        >
                          {range.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 结果统计 */}
              <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                找到 {filteredNotifications.length} 条结果
              </div>
            </div>
          </div>

          {/* Notification list */}
          <div className="overflow-hidden">
            {currentItems.length === 0 ? (
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-4 text-gray-500">没有找到相关通知公告</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  清除所有筛选条件
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {currentItems.map((notification, index) => (
                  <div key={notification.id} 
                    className={`flex justify-between items-center py-4 px-6 hover:bg-gray-50 ${notification.category === '重要' ? 'bg-red-50' : ''}`}
                  >
                    <Link to={`/announcement/${notification.id}`} className="flex-1 group">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <span className={`
                            text-xs font-medium px-2 py-1 rounded-sm inline-block min-w-16 text-center
                            ${notification.category === '重要' ? 'bg-red-100 text-red-800' : 
                              notification.category === '政策' ? 'bg-green-100 text-green-800' :
                              notification.category === '资讯' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'}
                          `}>
                            {notification.category}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 pr-2">
                              {notification.title}
                            </h3>
                            {new Date(notification.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                              <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <span className="inline-flex items-center mr-3">
                              <svg className="mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {notification.date}
                            </span>
                            <span className="inline-flex items-center mr-3">
                              <svg className="mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {notification.company}
                            </span>
                            <span className="inline-flex items-center mr-3">
                              <svg className="mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {notification.department || '办公室'}
                            </span>
                            <span className="inline-flex items-center">
                              <svg className="mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {notification.views || Math.floor(Math.random() * 1000) + 100} 次查看
                            </span>
                          </div>
                          {index < 3 && notification.category === '重要' && (
                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                              {notification.summary || '本公告为重要公告，请相关部门及人员务必及时查看并按要求执行。详情请点击查看完整内容。'}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                    <Link 
                      to={`/announcement/${notification.id}`} 
                      className="ml-4 bg-white border border-gray-300 rounded-md p-2 text-gray-400 hover:text-blue-500 hover:border-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  显示 {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredNotifications.length)} 条，共 {filteredNotifications.length} 条结果
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                  >
                    上一页
                  </button>
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === number ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications; 