import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { salesPurchaseData } from '../utils/mockData';

const Sales = () => {
  const [activeSection, setActiveSection] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoaded, setImageLoaded] = useState({});
  const itemsPerPage = 5;

  // 创建内存中的空白占位图片数据URL
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23666666'%3E钢铁产品%3C/text%3E%3C/svg%3E";

  // 钢铁产品类别数据
  const steelCategories = [
    { 
      id: 'steel_plate', 
      name: '钢板', 
      icon: "https://img.freepik.com/free-photo/steel-sheet-factory_1127-3594.jpg?w=740&t=st=1712224626~exp=1712225226~hmac=53e51e1afe2bb93df2df94bad7aa9a8d76401b8ef09ed53e96527dd98f0f5fc5", 
      description: '各类优质钢板，厚度规格齐全' 
    },
    { 
      id: 'steel_pipe', 
      name: '钢管', 
      icon: "https://img.freepik.com/free-photo/metal-water-pipe-outdoors_23-2148240967.jpg?w=740&t=st=1712224692~exp=1712225292~hmac=d9c9c9bb4d316954c754196bb979d6126c60b8d84a6a1fca5aba9ce91c41b9fe", 
      description: '无缝钢管、焊接钢管等多种规格' 
    },
    { 
      id: 'steel_wire', 
      name: '钢丝', 
      icon: "https://img.freepik.com/free-photo/close-up-barbed-wire-fence_23-2148175332.jpg?w=740&t=st=1712224712~exp=1712225312~hmac=9f6fbeedb6a14e95e3b8e4b8d7db5fe3d3e30e1ea29c15c9d2c3a9b3be06b9a4", 
      description: '高强度钢丝，抗拉强度优异' 
    },
    { 
      id: 'steel_rail', 
      name: '钢轨', 
      icon: "https://img.freepik.com/free-photo/railroad-landscape-with-blue-sky_23-2148773708.jpg?w=740&t=st=1712224739~exp=1712225339~hmac=0b5683a89fed878c0e2f8d450ec33db2f1a4c1a3b9d5ede79de36a1f80fabb9b", 
      description: '标准钢轨，适用于各类轨道交通' 
    }
  ];

  // 热门销售产品
  const hotProducts = [
    {
      id: 1,
      name: 'H型钢',
      image: "https://img.freepik.com/free-photo/grunge-metal-texture_1048-4773.jpg?w=826&t=st=1712224814~exp=1712225414~hmac=25f97f4fe87d36e28a24e9c1fc6736c1c8eeb0aabfb0a2b3b3f0371c0a97e953",
      price: '4500-5200元/吨',
      stock: '1000吨',
      company: '沙钢集团'
    },
    {
      id: 2,
      name: '冷轧板卷',
      image: "https://img.freepik.com/free-photo/rolled-metal-warehouse-steel-sheet_93675-129215.jpg?w=740&t=st=1712224847~exp=1712225447~hmac=a0efc5faa2a1c09b272c6a022a5a6de1cf0a1a4642a2c8ea34c39b9da10b6cb8",
      price: '5200-5800元/吨',
      stock: '2000吨',
      company: '沙钢集团'
    },
    {
      id: 3,
      name: '热轧卷板',
      image: "https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30488.jpg?w=740&t=st=1712224891~exp=1712225491~hmac=0b20ed336c4c7c91a39a9e5176a6129f4ffa05b60b8d83d4f8ab1b0f6b1af75a",
      price: '4200-4800元/吨',
      stock: '1500吨',
      company: '东北特钢'
    }
  ];

  // 处理图片加载状态
  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({...prev, [id]: true}));
  };

  // 替代图片显示函数
  const renderPlaceholder = (text) => (
    <div className="flex items-center justify-center bg-gray-200 rounded-lg w-full h-full">
      <span className="text-gray-500 text-sm">{text || '图片加载失败'}</span>
    </div>
  );

  const sections = [
    { id: '全部', name: '全部' }, 
    { id: '钢材', name: '钢材' },
    { id: '废料', name: '废料' }, 
    { id: '备件', name: '备件' },
    { id: '其他', name: '其他' }
  ];

  // 筛选和排序数据
  const filteredData = salesPurchaseData
    .filter(item => {
      // 使用销售类型的数据
      if (!item.isSales) return false;
      
      const matchesSection = activeSection === '全部' || item.category === activeSection;
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSection && matchesSearch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // 分页
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 处理页面改变
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // 模拟推荐销售商品
  useEffect(() => {
    // 预加载图片
    const preloadImages = async () => {
      for (const item of [...steelCategories, ...hotProducts]) {
        const img = new Image();
        const imgSrc = item.image || item.icon;
        
        try {
          const promise = new Promise((resolve, reject) => {
            img.onload = () => {
              handleImageLoad(item.id);
              resolve();
            };
            img.onerror = () => {
              console.log(`Failed to load image for ${item.name}`);
              setImageLoaded(prev => ({...prev, [item.id]: false}));
              reject();
            };
          });
          
          img.src = imgSrc;
          await promise;
        } catch (error) {
          console.error(`Error loading image for ${item.name}:`, error);
        }
      }
    };
    
    preloadImages();
  }, []);

  // 渲染产品类别卡片
  const renderCategoryCard = (category) => (
    <div 
      key={category.id} 
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={category.icon} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          onLoad={() => handleImageLoad(category.id)}
          onError={(e) => {
            console.log(`Image failed to load: ${category.name}`);
            setImageLoaded(prev => ({...prev, [category.id]: false}));
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div 
          className="hidden items-center justify-center bg-gray-200 absolute inset-0 w-full h-full" 
          data-placeholder={category.name}
        >
          <span className="text-gray-500 text-sm">{category.name}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
        <p className="mt-1 text-sm text-gray-600">{category.description}</p>
        <Link 
          to={`/sales?category=${category.id}`} 
          className="mt-3 inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
        >
          查看产品
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );

  // 渲染热门产品卡片
  const renderProductCard = (product) => (
    <div 
      key={product.id} 
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          onLoad={() => handleImageLoad(product.id)}
          onError={(e) => {
            console.log(`Image failed to load: ${product.name}`);
            setImageLoaded(prev => ({...prev, [product.id]: false}));
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div 
          className="hidden items-center justify-center bg-gray-200 absolute inset-0 w-full h-full" 
          data-placeholder={product.name}
        >
          <span className="text-gray-500 text-sm">{product.name}</span>
        </div>
        <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 text-xs font-bold">
          热销
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm font-bold text-red-600">{product.price}</span>
          <span className="text-xs text-gray-500">库存: {product.stock}</span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-gray-500">{product.company}</span>
          <Link 
            to={`/sales-purchase/${product.id}`} 
            className="text-xs font-medium text-green-600 hover:text-green-800 flex items-center"
          >
            查看详情
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 顶部大图展示区域 */}
        <div className="relative rounded-xl overflow-hidden mb-8 shadow-md bg-gradient-to-r from-blue-700 to-blue-900">
          <img 
            src="https://img.freepik.com/premium-photo/aerial-view-steel-mill-factory-industrial-zone_93675-129538.jpg" 
            alt="钢铁工厂" 
            className="w-full h-64 object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <h1 className="text-4xl font-bold mb-2 text-center">钢铁产品销售公告</h1>
            <p className="text-xl max-w-2xl text-center">
              提供优质钢材产品，满足各行业需求，价格合理，品质保障
            </p>
          </div>
        </div>

        {/* 钢铁产品类别展示 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">钢铁产品类别</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steelCategories.map(category => renderCategoryCard(category))}
            </div>
          </div>
        </div>

        {/* 热门销售产品 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">热门销售产品</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {hotProducts.map(product => renderProductCard(product))}
            </div>
          </div>
        </div>

        {/* 销售公告列表 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">销售公告</h2>
            <p className="mt-1 text-sm text-green-100">
              查看最新钢铁产品销售信息，把握优质采购机会
            </p>
          </div>

          {/* 搜索和筛选区域 */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="w-full sm:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索产品名称、类别..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        ? 'bg-green-600 text-white'
                        : 'text-gray-500 hover:bg-gray-100'}
                    `}
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 销售公告内容 - 改为水平卡片布局 */}
          <div className="px-6 py-4">
            {currentItems.length === 0 ? (
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-4 text-gray-500">没有找到相关销售公告</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {currentItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="w-28 bg-green-50 flex-shrink-0 flex items-center justify-center p-3 border-r border-gray-200">
                      <div className="text-center">
                        <span className="block text-xs font-medium text-gray-500">类型</span>
                        <span className={`inline-block px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium ${
                          item.category === '钢材' ? 'bg-blue-100 text-blue-800' :
                          item.category === '废料' ? 'bg-amber-100 text-amber-800' :
                          item.category === '备件' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.category}
                        </span>
                        
                        <div className="mt-3">
                          <span className="block text-xs font-medium text-gray-500">单位</span>
                          <span className="text-sm font-medium text-gray-700">{item.company}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{item.date}</span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {item.quantity && (
                          <div className="flex items-center text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                            <span>{item.quantity}</span>
                          </div>
                        )}
                        
                        {item.price && (
                          <div className="flex items-center text-red-600 font-medium">
                            <svg className="h-4 w-4 mr-1 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{item.price}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <Link
                          to={`/announcement/${item.id}`}
                          className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
                        >
                          详情
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex justify-center">
              <nav className="flex items-center">
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
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                  const pageNum = currentPage <= 3
                    ? index + 1
                    : currentPage >= totalPages - 2
                      ? totalPages - 4 + index
                      : currentPage - 2 + index;
                      
                  if (pageNum <= 0 || pageNum > totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 border-green-500 bg-green-50 text-green-600'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
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
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sales; 