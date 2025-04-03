import { Link } from 'react-router-dom';

const Footer = () => {
  // 帮助中心链接
  const helpLinks = [
    { id: 1, title: '供应商操作手册和问题汇总', path: '/help/supplier-faq' },
    { id: 2, title: '安徽兴光：0372-3238989', path: '/contact/anhui' },
    { id: 3, title: '供应商注册操作手册', path: '/help/supplier-register' },
    { id: 4, title: '淮钢钢铁：0517-83036823', path: '/contact/huaigang' },
    { id: 5, title: '供应商服务条款操作手册', path: '/help/terms' },
    { id: 6, title: '东北特钢：0411-62693160', path: '/contact/northeast' },
    { id: 7, title: '供应商报价操作手册', path: '/help/pricing' },
    { id: 8, title: '辽宁特钢：15040122995', path: '/contact/liaoning' },
    { id: 9, title: '项目竞标询报及定价操作手册', path: '/help/bidding' },
    { id: 10, title: '沙钢物贸：0512-58566913', path: '/contact/shagang' },
    { id: 11, title: '销售额定价操作手册', path: '/help/sales' },
    { id: 12, title: '沙钢物贸(商品)：0512-58305120', path: '/contact/shagang-commodity' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Main Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">快速导航</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-red-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  首页
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="text-gray-300 hover:text-red-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  通知公告
                </Link>
              </li>
              <li>
                <Link to="/procurement" className="text-gray-300 hover:text-red-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  采购公告
                </Link>
              </li>
              <li>
                <Link to="/sales" className="text-gray-300 hover:text-red-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  销售公告
                </Link>
              </li>
              <li>
                <Link to="/bidding" className="text-gray-300 hover:text-red-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  招投标
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <Link to="/about" className="inline-flex items-center bg-gray-800 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                <span>关于我们</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">客户服务</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400 mr-2">客服电话：</span>
                <a href="tel:0512-35012101" className="hover:text-red-400">0512-35012101</a>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 mr-2">客服邮箱：</span>
                <a href="mailto:jlwl@e9656.com" className="hover:text-red-400">jlwl@e9656.com</a>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-400 mr-2">工作时间：</span>
                <div>
                  <div>8:00-12:00</div>
                  <div>13:00-17:00</div>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 mr-2">地址：</span>
                <div>江苏省张家港市锦丰镇</div>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex items-center space-x-6">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2 rounded-md mb-2">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com" 
                      alt="沙钢云商微信公众号" 
                      className="w-24 h-24"
                    />
                  </div>
                  <span className="text-xs text-gray-400">关注沙钢云商微信公众号</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Center */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">帮助中心</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {helpLinks.map((link) => (
                <Link 
                  key={link.id} 
                  to={link.path} 
                  className="text-gray-300 hover:text-red-400 text-sm hover:underline"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-md">
                <h4 className="font-medium text-red-400 mb-2">快速入驻</h4>
                <p className="text-sm text-gray-300">
                  沙钢云商平台为供应商提供一站式服务，从资质审核到交易结算，全程在线操作，高效便捷。
                </p>
                <Link to="/supplier-register" className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md transition duration-300 inline-block">
                  立即入驻
                </Link>
              </div>
              <div className="bg-gray-800 p-4 rounded-md">
                <h4 className="font-medium text-blue-400 mb-2">在线培训</h4>
                <p className="text-sm text-gray-300">
                  提供全面的平台操作教程和使用指南，助力供应商快速掌握平台各项功能。
                </p>
                <Link to="/training" className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition duration-300 inline-block">
                  查看教程
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-4 text-center text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2023 沙钢云商采购平台 版权所有</p>
          <p className="mt-1">沪ICP备13069149号-1 京B1-20140026 苏公网安备 32058202010478号</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;