import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { salesPurchaseData } from '../utils/mockData';

const SalesPurchase = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [activeCategory, setActiveCategory] = useState('采购公告');
  const [isMobile] = useOutletContext() || [false];

  const tabs = [
    { id: '全部', name: '全部' },
    { id: '沙钢', name: '沙钢' },
    { id: '淮钢', name: '淮钢' },
    { id: '安阳', name: '安阳' },
    { id: '大连', name: '大连' },
    { id: '抚顺', name: '抚顺' },
  ];

  // Filter data based on active tab
  const filteredData = activeTab === '全部' 
    ? salesPurchaseData 
    : salesPurchaseData.filter(item => item.company.includes(activeTab));

  // 过滤出当前类别的数据
  const categoryData = filteredData.filter(item => {
    if (activeCategory === '采购公告') return !item.isSales;
    if (activeCategory === '销售公告') return item.isSales;
    return true;
  });

  return (
    <div className="mb-4">
      {isMobile ? (
        // 移动端布局
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          {/* 顶部标签选择器 */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-3 text-center text-sm font-medium ${activeCategory === '采购公告' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveCategory('采购公告')}
            >
              采购公告
            </button>
            <button 
              className={`flex-1 py-3 text-center text-sm font-medium ${activeCategory === '销售公告' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveCategory('销售公告')}
            >
              销售公告
            </button>
          </div>
          
          {/* 公司过滤器 */}
          <div className="px-4 py-2 bg-gray-50 overflow-x-auto">
            <div className="flex space-x-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600 border border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* 公告列表 */}
          <div className="px-4 py-2">
            {categoryData.length === 0 ? (
              <div className="py-6 text-center text-gray-500">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-1 text-xs">没有找到相关{activeCategory}信息</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categoryData.slice(0, 8).map((item) => (
                  <div 
                    key={item.id}
                    className="border-b border-gray-100 pb-2"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded-sm ${
                        item.isSales ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <Link 
                      to={`/announcement-detail/${item.id}`}
                      className="block text-gray-900 font-medium text-sm mb-1"
                    >
                      {item.title}
                    </Link>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">{item.company.replace('集团', '').replace('有限公司', '')}</span>
                      <span className="px-1.5 py-0.5 bg-gray-100 rounded-sm">{item.category}</span>
                    </div>
                  </div>
                ))}
                <div className="text-right pt-2">
                  <Link 
                    to={`/${activeCategory === '采购公告' ? 'procurement' : 'sales'}`} 
                    className="inline-flex items-center text-xs font-medium text-blue-600"
                  >
                    查看全部
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // 桌面端布局
        <div className="flex rounded-lg overflow-hidden shadow-sm">
          {/* 左侧菜单 - 更浅色背景 */}
          <div className="w-56 bg-blue-50 text-blue-800 relative">
            {/* 内容区 */}
            <div className="relative z-10 h-full flex flex-col">
              <div className="py-3 px-4 border-b border-blue-100">
                <h3 className="text-lg font-bold text-blue-700">采购销售专栏</h3>
                <div className="text-blue-500 text-xs">
                  优惠促销价 | 精准高效
                </div>
              </div>
              
              {/* 居中的按钮区域 */}
              <div className="flex-1 flex flex-col justify-center">
                <button 
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${activeCategory === '采购公告' ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-100 hover:bg-opacity-50 text-blue-600'}`}
                  onClick={() => setActiveCategory('采购公告')}
                >
                  <div className="flex items-center justify-center">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    采购公告
                  </div>
                </button>
                <button 
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${activeCategory === '销售公告' ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-100 hover:bg-opacity-50 text-blue-600'}`}
                  onClick={() => setActiveCategory('销售公告')}
                >
                  <div className="flex items-center justify-center">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    销售公告
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="flex-1 bg-white">
            {/* 顶部标题和标签 */}
            <div className="bg-blue-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="font-medium text-blue-700 text-base">
                  {activeCategory}
                  {activeTab !== '全部' && (
                    <span className="ml-2 text-blue-400 font-normal">· {activeTab}</span>
                  )}
                </h2>
              </div>
              <div className="flex space-x-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 py-0.5 text-xs rounded-full transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 内容列表 - 紧凑表格布局 */}
            <div className="px-1 py-1">
              {categoryData.length === 0 ? (
                <div className="py-6 text-center text-gray-500">
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="mt-1 text-xs">没有找到相关{activeCategory}信息</p>
                </div>
              ) : (
                <div className="overflow-hidden">
                  {/* 紧凑表格布局 */}
                  <table className="min-w-full table-fixed text-sm">
                    <tbody className="divide-y divide-gray-100">
                      {categoryData.slice(0, 10).map((item) => (
                        <tr 
                          key={item.id}
                          className="hover:bg-blue-50 transition-colors"
                        >
                          <td className="w-14 py-1.5 pr-1">
                            <span className={`inline-block px-1.5 py-0.5 text-xs rounded-sm whitespace-nowrap ${
                              item.isSales ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="pr-1">
                            <Link 
                              to={`/announcement-detail/${item.id}`}
                              className="block text-gray-900 hover:text-blue-600 font-medium text-sm truncate"
                            >
                              {item.title}
                            </Link>
                          </td>
                          <td className="w-24 text-xs text-center whitespace-nowrap">
                            <span className="px-1.5 py-0.5 bg-gray-100 rounded-sm">
                              {item.category}
                            </span>
                          </td>
                          <td className="w-16 text-xs text-gray-500 whitespace-nowrap">
                            {item.company.replace('集团', '').replace('有限公司', '')}
                          </td>
                          <td className="w-20 text-xs text-gray-400 text-right whitespace-nowrap">
                            {item.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="mt-1 text-right">
                    <Link 
                      to={`/${activeCategory === '采购公告' ? 'procurement' : 'sales'}`} 
                      className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      查看全部
                      <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPurchase;