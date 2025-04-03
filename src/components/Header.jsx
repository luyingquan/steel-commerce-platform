import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  // 根据当前路径设置选中的导航项
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') {
      setActiveLink('/');
    } else if (path.includes('/notifications')) {
      setActiveLink('/notifications');
    } else if (path.includes('/procurement')) {
      setActiveLink('/procurement');
    } else if (path.includes('/sales')) {
      setActiveLink('/sales');
    } else if (path.includes('/reports')) {
      setActiveLink('/reports');
    } else {
      setActiveLink(path);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/notifications', label: '通知公告' },
    { path: '/procurement', label: '采购公告' },
    { path: '/sales', label: '销售公告' },
    { path: '/reports', label: '报名公告' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg" 
                alt="沙钢云商Logo" 
                className="h-8 w-8 mr-2" 
              />
              <span className="text-2xl font-bold text-red-600">沙钢云商</span>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeLink === item.path 
                    ? 'text-red-600 border-red-600' 
                    : 'text-gray-600 border-transparent hover:text-red-600 hover:border-red-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden md:flex items-center">
            <div className="bg-red-600 text-white px-4 py-2 rounded-md text-sm mr-3">
              <Link to="/register" className="mr-2">注册</Link>
              <span>/</span>
              <Link to="/login" className="ml-2">登录</Link>
            </div>
            <div className="text-gray-700 text-xs">
              <div>客服电话</div>
              <div className="font-semibold">0512-35012101 35012105</div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === item.path 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center justify-between px-4">
            <div className="bg-red-600 text-white px-4 py-2 rounded-md text-sm">
              <Link to="/register" className="mr-2" onClick={() => setIsMenuOpen(false)}>注册</Link>
              <span>/</span>
              <Link to="/login" className="ml-2" onClick={() => setIsMenuOpen(false)}>登录</Link>
            </div>
            <div className="text-gray-700 text-xs text-right">
              <div>客服电话</div>
              <div className="font-semibold">0512-35012101</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;