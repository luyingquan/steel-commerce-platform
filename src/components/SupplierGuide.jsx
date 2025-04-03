import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SupplierGuide = () => {
  const [activeStep, setActiveStep] = useState(0);

  // 定义步骤数据
  const steps = [
    { 
      id: 1, 
      name: '在线申请', 
      icon: 'application-form',
      description: '填写企业信息和资质材料'
    },
    { 
      id: 2, 
      name: '资质审核', 
      icon: 'audit-check',
      description: '我们将审核您提交的资料'
    },
    { 
      id: 3, 
      name: '通过认证', 
      icon: 'certification',
      description: '资质合格后获得认证资格'
    },
    { 
      id: 4, 
      name: '成为供应商', 
      icon: 'partnership',
      description: '开始参与沙钢业务合作'
    }
  ];

  // 自动轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  // 渲染SVG图标
  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'application-form':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'audit-check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'certification':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'partnership':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-xl overflow-hidden relative">
      {/* 装饰元素 */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-300 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-300 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="px-6 py-10 md:px-10 relative z-10">
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 relative inline-block">
            <span className="relative z-10">供应商指南</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-300 opacity-40 rounded-lg -z-10"></span>
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          {/* 左侧机器人/AI助手 */}
          <div className="lg:w-1/4 flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="https://img.freepik.com/free-vector/cute-robot-assistant-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5186.jpg"
                alt="供应商助手"
                className="w-48 h-48 md:w-56 md:h-56 relative z-10 rounded-full border-4 border-white shadow-lg transform transition duration-300 hover:scale-105"
              />
            </div>
            
            <div className="bg-white mt-4 py-2 px-4 rounded-full shadow-md">
              <p className="text-blue-800 font-medium text-sm">AI智能供应商助手</p>
            </div>
          </div>
          
          {/* 右侧内容 */}
          <div className="lg:w-3/4 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-2xl font-bold text-blue-900">免费 成为沙钢合格供应商四步法</h3>
                <p className="text-blue-700 mt-1">快速高效，助您开启与沙钢集团的业务合作</p>
              </div>
            </div>
            
            {/* 步骤进度条 */}
            <div className="mb-10 relative">
              <div className="h-1 bg-gray-200 rounded-full">
                <div 
                  className="h-1 bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${(activeStep + 1) * 25}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-[-10px]">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`w-6 h-6 rounded-full flex items-center justify-center relative ${
                      index <= activeStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                    } transition-colors duration-300`}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="text-xs font-medium">{step.id}</span>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className={`text-sm font-medium ${index <= activeStep ? 'text-blue-700' : 'text-gray-500'}`}>
                        {step.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 步骤展示区 */}
            <div className="bg-blue-50 p-5 rounded-xl mb-6">
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 border-2 border-blue-300">
                  {renderIcon(steps[activeStep].icon)}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-lg font-semibold text-blue-900">
                    {steps[activeStep].name} - 第{steps[activeStep].id}步
                  </h4>
                  <p className="text-blue-700 mt-1">{steps[activeStep].description}</p>
                </div>
              </div>
            </div>
            
            <div className="text-gray-600 mb-8">
              <p>沙钢云商平台欢迎各类供应商加入，提供一站式采购销售服务，帮助您快速对接沙钢业务。通过简单四步，即可成为沙钢合格供应商，获取更多商业机会。</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/supplier-register" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center group"
              >
                <span>立即申请</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link
                to="/supplier-guide"
                className="bg-white border-2 border-blue-400 text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg shadow-sm transition duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>查看详细指南</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierGuide;