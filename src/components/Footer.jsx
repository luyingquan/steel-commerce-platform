import { Link } from 'react-router-dom';

const Footer = ({ isMobile }) => {
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

  const quickLinks = [
    { name: '首页', href: '/' },
    { name: '采购公告', href: '/procurement' },
    { name: '销售公告', href: '/sales' },
    { name: '公司介绍', href: '/about' },
    { name: '联系我们', href: '/contact' },
    { name: '隐私政策', href: '/privacy' }
  ];

  const businessLinks = [
    { name: '在线竞价', href: '/bidding' },
    { name: '采购管理', href: '/procurement-management' },
    { name: '销售管理', href: '/sales-management' },
    { name: '供应商管理', href: '/supplier-management' },
    { name: '合同管理', href: '/contract-management' },
    { name: '结算管理', href: '/payment-management' }
  ];

  const serviceLinks = [
    { name: '操作手册', href: '/manual' },
    { name: '用户注册', href: '/register' },
    { name: '用户登录', href: '/login' },
    { name: '问题建议', href: '/feedback' },
    { name: '常见问题', href: '/faq' },
    { name: '网站地图', href: '/sitemap' }
  ];

  const contactInfo = [
    '客服电话：0512-35012101 35012105',
    '传真：0512-35012103',
    '地址：江苏省张家港市锦丰镇沙钢大厦',
    '邮箱：shagangservice@shasteel.cn',
    '邮编：215625'
  ];

  return (
    <footer className="bg-gray-800 text-white">
      {/* 适配移动端 */}
      {isMobile ? (
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
          <div className="grid grid-cols-1 gap-y-6">
            {/* Logo和公司描述 */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <img
                  src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg"
                  alt="沙钢云商Logo"
                  className="h-10 w-10 mr-2"
                />
                <span className="text-xl font-bold text-white">沙钢云商</span>
              </div>
              <p className="text-gray-400 text-sm">
                沙钢云商平台是沙钢集团旗下专业的电子商务平台，为客户提供采购、销售、竞价等全面的钢铁贸易服务解决方案。
              </p>
            </div>

            {/* 联系信息 - 移动端展示 */}
            <div className="mt-2 border-t border-gray-700 pt-4">
              <h3 className="text-base font-medium text-center mb-3">联系我们</h3>
              <ul className="text-gray-400 text-xs space-y-1.5 text-center">
                {contactInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </div>

            {/* 版权信息 */}
            <div className="text-gray-500 text-xs text-center mt-4 pt-4 border-t border-gray-700">
              <p>© {new Date().getFullYear()} 沙钢云商. 保留所有权利.</p>
              <p className="mt-1">沙钢电子商务平台 - 苏ICP备09019985号-4</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-5 gap-8">
            {/* Logo和公司描述 */}
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg"
                  alt="沙钢云商Logo"
                  className="h-10 w-10 mr-2"
                />
                <span className="text-xl font-bold text-white">沙钢云商</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                沙钢云商平台是沙钢集团旗下专业的电子商务平台，为客户提供采购、销售、竞价等全面的钢铁贸易服务解决方案。
              </p>
              <div className="text-gray-400 text-xs space-y-1">
                {contactInfo.map((info, index) => (
                  <p key={index}>{info}</p>
                ))}
              </div>
            </div>

            {/* 快速链接 */}
            <div>
              <h3 className="text-lg font-medium mb-3">快速链接</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 业务中心 */}
            <div>
              <h3 className="text-lg font-medium mb-3">业务中心</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                {businessLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 服务支持 */}
            <div>
              <h3 className="text-lg font-medium mb-3">服务支持</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="mt-8 pt-4 border-t border-gray-700 text-gray-500 text-sm flex justify-between items-center">
            <p>© {new Date().getFullYear()} 沙钢云商. 保留所有权利.</p>
            <p>沙钢电子商务平台 - 苏ICP备09019985号-4</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;