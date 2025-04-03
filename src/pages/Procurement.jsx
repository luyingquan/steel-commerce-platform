import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { biddingData } from '../utils/mockData';

const Procurement = () => {
  const [activeSection, setActiveSection] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(null);
  const itemsPerPage = 8;

  // 公告横幅数据
  const announcementBanners = [
    {
      id: 1,
      bgColor: '#3B82F6',
      title: '钢材采购招标',
      description: '大型钢材采购项目现已开启招标，欢迎符合资质的供应商参与',
      date: '2025-04-15'
    },
    {
      id: 2,
      bgColor: '#4F46E5',
      title: '设备维修服务',
      description: '工业设备维修服务招标，需要专业维修团队',
      date: '2025-04-12'
    },
    {
      id: 3,
      bgColor: '#0284C7',
      title: '原材料长期供应',
      description: '寻找长期稳定的原材料供应商，合作共赢',
      date: '2025-04-10'
    },
    {
      id: 4,
      bgColor: '#0891B2',
      title: '物流运输招标',
      description: '大量货物运输业务，需要专业物流公司',
      date: '2025-04-08'
    },
    {
      id: 5,
      bgColor: '#2563EB',
      title: '技术支持服务',
      description: '工业软件技术支持服务招标，寻求专业技术团队',
      date: '2025-04-05'
    }
  ];

  // 自动滚动效果
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleAutoScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        // 如果滚动到末尾，重置到开头
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // 否则向右滚动一个卡片的宽度
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    const interval = setInterval(handleAutoScroll, 4000);
    return () => clearInterval(interval);
  }, []);

  // 业务类型
  const sections = [
    { id: '全部', name: '全部' },
    { id: '设备', name: '设备类' },
    { id: '原材料', name: '原材料类' },
    { id: '备件', name: '备件类' },
    { id: '工程', name: '工程类' },
    { id: '服务', name: '服务类' }
  ];

  // 筛选逻辑
  const filteredItems = biddingData.filter(item => {
    const matchesSection = activeSection === '全部' || item.category === activeSection;
    const matchesSearch = searchTerm === '' || 
      item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSection && matchesSearch;
  });

  // 分页逻辑
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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

  // 重置分页
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 新的水平滚动公告横幅 */}
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">最新采购招标公告</h2>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-4 pt-2 px-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {announcementBanners.map((banner) => (
              <div 
                key={banner.id}
                className="flex-shrink-0 w-[300px] mr-4 rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-transform hover:translate-y-[-5px]"
              >
                <div 
                  className="h-[120px] flex flex-col justify-center items-center p-4"
                  style={{ backgroundColor: banner.bgColor }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-medium text-gray-900">{banner.title}</h3>
                    <span className="text-xs text-gray-500">{banner.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{banner.description}</p>
                  <Link 
                    to={`/announcement/${banner.id}`}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    查看详情
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 添加自定义滚动指示器 */}
          <div className="px-4 pb-4 flex justify-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      left: index * 300,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400"
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">采购公告</h1>
            <p className="mt-1 text-sm text-blue-100">
              查看最新采购招标信息，参与供应商竞标
            </p>
          </div>

          {/* Search and filter section */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="w-full md:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索项目名称、发布单位..."
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
              </div>

              <div className="flex overflow-x-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      whitespace-nowrap px-3 py-1 mx-1 rounded-full text-sm font-medium
                      ${activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:bg-gray-100'}
                    `}
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Procurement item list */}
          <div className="overflow-hidden">
            {currentItems.length === 0 ? (
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-4 text-gray-500">没有找到相关采购公告</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        项目名称
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        发布单位
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        项目类型
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        采购方式
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        截止日期
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        发布日期
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            {/* 类型标签 */}
                            <span className={`
                              w-2 h-2 rounded-full mr-2
                              ${item.category === '备件' ? 'bg-purple-500' : 
                                item.category === '设备' ? 'bg-blue-500' : 
                                item.category === '原材料' ? 'bg-green-500' : 
                                item.category === '工程' ? 'bg-orange-500' : 
                                item.category === '服务' ? 'bg-red-500' : 'bg-gray-500'}
                            `}></span>
                            {item.projectName}
                            {new Date(item.endDate) >= new Date() && 
                             new Date(item.publishDate) >= new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                新
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.biddingMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.publishDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/announcement/${item.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            详情
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  显示 {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredItems.length)} 条，共 {filteredItems.length} 条结果
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                  >
                    上一页
                  </button>
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === number ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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

export default Procurement; 