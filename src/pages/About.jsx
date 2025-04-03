import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* 公司简介 */}
          <div className="relative">
            <div className="h-80 bg-gradient-to-r from-blue-800 to-blue-600 flex items-center">
              <div className="px-8 md:px-12 lg:px-16 max-w-3xl">
                <h1 className="text-4xl font-bold text-white tracking-tight">关于沙钢云商</h1>
                <p className="mt-4 text-xl text-blue-100">
                  沙钢云商平台致力于打造钢铁产业链数字化协同平台，促进产业链资源整合与高效配置
                </p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 hidden lg:block">
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 opacity-20">
                <path fill="#fff" d="M47.1,-57.9C60.2,-44.5,69.2,-29.2,71.3,-13.2C73.3,2.9,68.4,19.6,59.9,35.8C51.4,52,39.4,67.5,23.6,74.4C7.9,81.3,-11.6,79.5,-28.7,72.1C-45.7,64.7,-60.2,51.6,-69.5,35.1C-78.8,18.6,-82.9,-1.2,-78.1,-18.9C-73.3,-36.5,-59.7,-52,-44,-63.2C-28.3,-74.4,-10.6,-81.4,3.3,-85.3C17.2,-89.2,34,-71.2,47.1,-57.9Z" transform="translate(200 200)" />
              </svg>
            </div>
          </div>

          {/* 企业简介内容 */}
          <div className="px-8 py-16 md:px-12 lg:px-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">企业简介</h2>
              <div className="mt-6 text-lg text-gray-600 space-y-6">
                <p>
                  沙钢集团有限公司创建于1975年，经过40多年的发展，现已成为以钢铁为主业，同时涉足矿业、贸易物流、金融投资、生物制药等多个产业的多元化企业集团。
                </p>
                <p>
                  2022年，沙钢集团实现销售收入2800多亿元，总资产超3000亿元，粗钢产量4300多万吨，位居中国企业500强第72位，中国制造业企业500强第24位，中国钢铁企业20强第3位。
                </p>
                <p>
                  "沙钢云商"作为集团数字化转型的重要平台，整合了采购、销售、供应商管理等核心业务流程，致力于为产业链上下游企业提供高效便捷的一站式服务。
                </p>
              </div>

              <div className="mt-12 md:mt-16">
                <h2 className="text-3xl font-bold text-gray-900">企业文化</h2>
                <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800">企业愿景</h3>
                    <p className="mt-2 text-gray-600">建设百年企业，跻身国际一流</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800">企业使命</h3>
                    <p className="mt-2 text-gray-600">为人类文明提供优质钢材，为社会进步创造卓越价值</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800">企业精神</h3>
                    <p className="mt-2 text-gray-600">艰苦创业，自强不息，务实创新，永争一流</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800">核心价值观</h3>
                    <p className="mt-2 text-gray-600">忠诚敬业、创新超越、团结协作、奉献担当</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-16">
                <h2 className="text-3xl font-bold text-gray-900">发展战略</h2>
                <div className="mt-6 text-lg text-gray-600 space-y-6">
                  <p>
                    沙钢集团坚持"创新驱动、绿色引领、数字赋能、协同发展"的战略方针，致力于打造具有全球竞争力的世界一流企业。
                  </p>
                  <p>
                    在数字化转型战略的引领下，沙钢云商平台将持续优化升级，进一步提升供应链协同效率，为企业实现高质量发展提供有力支撑。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 联系我们 */}
          <div className="bg-gray-50 px-8 py-12 md:px-12 lg:px-16 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900">联系我们</h2>
              <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">总部地址</h3>
                  <div className="mt-3 text-gray-600">
                    <p>江苏省张家港市锦丰镇沙钢大厦</p>
                    <p className="mt-1">邮编: 215625</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">联系电话</h3>
                    <p className="mt-3 text-gray-600">0512-58536666</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">电子邮箱</h3>
                  <p className="mt-3 text-gray-600">business@shagang.com</p>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">平台服务时间</h3>
                    <p className="mt-3 text-gray-600">周一至周五: 09:00 - 17:30</p>
                    <p className="text-gray-600">周六、周日: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 inline-flex rounded-md shadow">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  联系客服
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About; 