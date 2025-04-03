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
      className="min-h-screen bg-gray-50 py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 顶部Banner图 */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">沙钢集团产品销售中心</h2>
              <p className="text-green-100 mb-6">
                提供优质钢材产品，规格齐全，品质可靠。沙钢集团作为中国领先的钢铁企业，
                致力于为客户提供全方位的钢铁解决方案。
              </p>
              <Link 
                to="/register" 
                className="inline-block bg-white text-green-800 font-medium px-6 py-2 rounded-md hover:bg-green-100 transition duration-200"
              >
                立即询价
              </Link>
            </div>
            <div className="md:w-1/2 p-4">
              <div className="rounded-lg overflow-hidden shadow-lg h-64 relative">
                <img 
                  src="https://img.freepik.com/free-photo/construction-concept-with-engineering-tools_23-2147768135.jpg?w=740&t=st=1712224916~exp=1712225516~hmac=32bfd2db9dbe26ea2c40e9e25e34f73f7129e20e7a42bc23e49c52909b82afa1" 
                  alt="钢铁厂全景"
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    console.log("Banner image failed to load");
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 items-center justify-center bg-gray-200">
                  <span className="text-gray-500">工厂图片加载失败</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white text-sm">沙钢集团生产基地</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 产品类别 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="border-b border-gray-200 bg-green-50 px-6 py-4">
            <h2 className="text-xl font-bold text-green-900">钢铁产品类别</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {steelCategories.map(renderCategoryCard)}
            </div>
          </div>
        </div>

        {/* 热门销售产品 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="border-b border-gray-200 bg-green-50 px-6 py-4">
            <h2 className="text-xl font-bold text-green-900">热门销售产品</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotProducts.map(renderProductCard)}
            </div>
          </div>
        </div>

        {/* 销售公告列表 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 bg-green-50 px-6 py-4">
            <h1 className="text-2xl font-bold text-green-900">销售公告</h1>
            <p className="mt-1 text-sm text-green-600">
              沙钢集团及下属企业销售信息公示平台
            </p>
          </div>

          {/* Search and filter section */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="w-full md:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索销售公告..."
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
                      whitespace-nowrap px-3 py-1 mx-1 rounded-md text-sm font-medium
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

          {/* Content */}
          <div className="overflow-hidden">
            {currentItems.length === 0 ? (
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="mt-4 text-gray-500">没有找到相关销售公告</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div className="w-full">
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-3">
                            {item.category}
                          </span>
                          <span className="text-sm text-gray-500">{item.date}</span>
                          {new Date(item.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800">
                              NEW
                            </span>
                          )}
                        </div>
                        <Link to={`/sales-purchase/${item.id}`} className="block mt-2">
                          <h3 className="text-lg font-medium text-gray-900 hover:text-green-600">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <span className="inline-flex items-center mr-3">
                            <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {item.company}
                          </span>
                          <span className="inline-flex items-center">
                            <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                            销售数量: {item.quantity || '未指定'}
                          </span>
                        </div>
                      </div>
                      <div className="hidden md:flex items-start ml-4">
                        <Link 
                          to={`/sales-purchase/${item.id}`} 
                          className="bg-white border border-green-300 rounded-md p-2 text-green-500 hover:text-green-700 hover:border-green-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end md:hidden">
                      <Link 
                        to={`/sales-purchase/${item.id}`} 
                        className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                      >
                        查看详情
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
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
                  显示 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} 条，共 {filteredData.length} 条结果
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                  >
                    上一页
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${currentPage === pageNumber ? 'text-white bg-green-600 hover:bg-green-700' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
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

export default Sales; 