import { useState } from 'react';
import { Link } from 'react-router-dom';
import { salesPurchaseData } from '../utils/mockData';

const SalesPurchase = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [activeCategory, setActiveCategory] = useState('采购公告');

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
      <div className="flex rounded-lg overflow-hidden shadow-sm">
        {/* 左侧菜单 */}
        <div className="w-56 bg-blue-600 text-white relative"
             style={{
               backgroundImage: `url('https://img.freepik.com/free-vector/blue-geometric-minimal-background_53876-99573.jpg')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          {/* 半透明蓝色遮罩 */}
          <div className="absolute inset-0 bg-blue-500 bg-opacity-80"></div>
          
          {/* 内容区 */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="py-3 px-4 border-b border-blue-400">
              <h3 className="text-lg font-bold">采购销售专栏</h3>
              <div className="text-blue-100 text-xs">
                优惠促销价 | 精准高效
              </div>
            </div>
            
            {/* 居中的按钮区域 */}
            <div className="flex-1 flex flex-col justify-center">
              <button 
                className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${activeCategory === '采购公告' ? 'bg-blue-700' : 'hover:bg-blue-500 hover:bg-opacity-50'}`}
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
                className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${activeCategory === '销售公告' ? 'bg-blue-700' : 'hover:bg-blue-500 hover:bg-opacity-50'}`}
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

          {/* 内容列表 */}
          <div className="p-2">
            {categoryData.length === 0 ? (
              <div className="py-6 text-center text-gray-500">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-1 text-xs">没有找到相关{activeCategory}信息</p>
              </div>
            ) : (
              <div>
                <div className="divide-y divide-gray-100">
                  {categoryData.slice(0, 5).map((item) => (
                    <div key={item.id} className="py-1.5 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center mb-0.5">
                        <span className={`inline-block px-1.5 py-0.5 text-xs rounded-sm ${
                          item.isSales ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.type}
                        </span>
                        {new Date(item.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                          <span className="ml-1 px-1.5 py-0.5 rounded-sm text-xs font-medium bg-red-100 text-red-700">
                            NEW
                          </span>
                        )}
                        <span className="ml-auto text-xs text-gray-400">{item.date}</span>
                      </div>
                      
                      <Link 
                        to={`/announcement-detail/${item.id}`}
                        className="block text-gray-900 hover:text-blue-600 font-medium text-sm leading-tight"
                      >
                        {item.title}
                      </Link>
                      
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-gray-500">
                        <span className="flex items-center">
                          <svg className="h-3 w-3 mr-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {item.company}
                        </span>
                        
                        {item.category && (
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded-sm">
                            {item.category}
                          </span>
                        )}
                        
                        {item.quantity && (
                          <span className="flex items-center">
                            <svg className="h-3 w-3 mr-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            {item.quantity}
                          </span>
                        )}
                        
                        {item.price && (
                          <span className="flex items-center text-red-600 font-medium">
                            <svg className="h-3 w-3 mr-0.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.price}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
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
    </div>
  );
};

export default SalesPurchase;