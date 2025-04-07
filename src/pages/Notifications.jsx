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
      className="min-h-screen bg-gray-50 py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">通知公告</h1>
          <p className="mt-1 text-sm text-gray-600">
            查看最新的公司公告、政策资讯和重要通知
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* 搜索框 */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索标题、内容、发布单位..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* 筛选按钮 */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                筛选条件
                {getActiveFilters().length > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                    {getActiveFilters().length}
                  </span>
                )}
              </button>

              {/* 排序下拉框 */}
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                >
                  <option value="latest">最新发布</option>
                  <option value="oldest">最早发布</option>
                  <option value="views">阅读量优先</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 展开的筛选选项 */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {/* 筛选标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {getActiveFilters().map((filter) => (
                    <span 
                      key={filter.type} 
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {filter.name}
                      <button 
                        onClick={() => removeFilter(filter.type)}
                        className="ml-1 inline-flex items-center justify-center w-4 h-4 bg-blue-200 rounded-full text-blue-600 hover:bg-blue-300"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  {getActiveFilters().length > 0 && (
                    <button 
                      onClick={clearAllFilters}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      清除筛选
                    </button>
                  )}
                </div>

                {/* 企业部门筛选 */}
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">按发布单位</h4>
                  <div className="flex flex-wrap gap-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-3 py-1 text-xs font-medium rounded-md ${
                          activeSection === section.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {section.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 公告类型筛选 */}
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">按公告类型</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-3 py-1 text-xs font-medium rounded-md ${
                          activeCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 时间范围筛选 */}
                <div>
                  <h4 className="text-xs font-medium text-gray-500 mb-2">按发布时间</h4>
                  <div className="flex flex-wrap gap-2">
                    {dateRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setDateRange(range.id)}
                        className={`px-3 py-1 text-xs font-medium rounded-md ${
                          dateRange === range.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 公告列表 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {/* 公告统计 */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              共找到 <span className="font-medium">{filteredNotifications.length}</span> 条公告
            </div>
            {filteredNotifications.length > 0 && (
              <div className="text-xs text-gray-500">
                显示第 {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredNotifications.length)} 条
              </div>
            )}
          </div>

          {/* 空状态 */}
          {currentItems.length === 0 ? (
            <div className="py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-4 text-gray-500">没有找到符合条件的通知公告</p>
              {getActiveFilters().length > 0 && (
                <button 
                  onClick={clearAllFilters}
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  清除筛选条件
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {currentItems.map((item) => (
                <div key={item.id} className="hover:bg-gray-50 transition-colors">
                  <Link to={`/announcement-detail/${item.id}`} className="block px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      {/* 公告类型标签 */}
                      <div className="flex items-center">
                        {item.category === '重要' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mr-2">
                            重要
                          </span>
                        )}
                        {item.category === '政策' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                            政策法规
                          </span>
                        )}
                        {item.category === '资讯' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mr-2">
                            资讯
                          </span>
                        )}
                        {item.category === '常规' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                            公告
                          </span>
                        )}
                        
                        {/* 发布单位 */}
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          {item.company}
                        </span>
                      </div>
                      
                      {/* 右侧日期和阅读量 */}
                      <div className="ml-auto flex items-center text-xs text-gray-500 whitespace-nowrap">
                        <span className="inline-flex items-center mr-3">
                          <svg className="mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.date}
                        </span>
                        <span className="inline-flex items-center">
                          <svg className="mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {item.views || Math.floor(Math.random() * 1000) + 100}
                        </span>
                      </div>
                    </div>
                    
                    {/* 标题 */}
                    <h3 className="mt-2 text-base font-medium text-gray-900 leading-6">
                      {item.title}
                    </h3>
                    
                    {/* 内容摘要 */}
                    {item.content && (
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {item.content}
                      </p>
                    )}
                    
                    {/* 发布信息 */}
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="inline-flex items-center mr-3">
                        <svg className="mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        发布部门: {item.department || '公司办公室'}
                      </span>
                      
                      {new Date(item.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          NEW
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  上一页
                </button>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  下一页
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    显示第 <span className="font-medium">{indexOfFirstItem + 1}</span> 到 <span className="font-medium">{Math.min(indexOfLastItem, filteredNotifications.length)}</span> 条，共 <span className="font-medium">{filteredNotifications.length}</span> 条结果
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">上一页</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">下一页</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
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