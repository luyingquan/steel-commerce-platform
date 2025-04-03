import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 轮播背景图数据
  const bannerBackgrounds = [
    {
      id: 1,
      imageUrl: 'https://img.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-1411.jpg',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      imageUrl: 'https://img.freepik.com/free-photo/high-angle-factory-worker-working_23-2149088520.jpg',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 3,
      imageUrl: 'https://img.freepik.com/free-photo/warehouse-worker-moving-goods-with-forklift_342744-1347.jpg',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 4,
      imageUrl: 'https://img.freepik.com/free-photo/industrial-designer-using-laptop-with-cad-software-new-component-metal-factory_342744-1373.jpg',
      color: 'from-purple-600 to-indigo-700'
    },
    {
      id: 5,
      imageUrl: 'https://img.freepik.com/free-photo/interior-warehouse-with-steel-metal-products_342744-1387.jpg',
      color: 'from-gray-700 to-gray-900'
    }
  ];

  // 自动轮播逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerBackgrounds.length]);

  // 手动切换轮播图
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentBackground = bannerBackgrounds[currentSlide];

  return (
    <section className={`relative bg-gradient-to-r ${currentBackground.color} overflow-hidden transition-colors duration-1000`}>
      {bannerBackgrounds.map((background, index) => (
        <div 
          key={background.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-10' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("${background.imageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      ))}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Banner Image */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center md:justify-start">
            <div className="relative w-64 h-64">
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-yellow-400 rounded-md flex items-center justify-center transform -rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="w-full h-full bg-blue-400 rounded-lg shadow-xl overflow-hidden border-4 border-white">
                <img 
                  src="https://img.freepik.com/free-photo/blue-steel-industrial-building_1127-3045.jpg" 
                  alt="钢铁工业" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Banner Text */}
          <div className="w-full md:w-2/3 text-center md:text-left md:pl-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider">阳光采购</h1>
            <div className="flex justify-center md:justify-start space-x-6 mb-6">
              <div className="text-2xl md:text-3xl font-medium text-white">公开</div>
              <div className="text-2xl md:text-3xl font-medium text-white">|</div>
              <div className="text-2xl md:text-3xl font-medium text-white">公平</div>
              <div className="text-2xl md:text-3xl font-medium text-white">|</div>
              <div className="text-2xl md:text-3xl font-medium text-white">公正</div>
            </div>
            <div className="hidden md:block">
              <Link to="/register" className="bg-white text-red-600 px-6 py-3 rounded-lg shadow-lg hover:bg-red-50 transition duration-300 font-semibold inline-block">
                立即注册
              </Link>
              <Link to="/procurement" className="ml-4 bg-transparent text-white border-2 border-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 transition duration-300 font-semibold inline-block">
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* 轮播指示器 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {bannerBackgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`切换到背景 ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;