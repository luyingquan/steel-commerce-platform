import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  
  // 模拟报表数据
  const reportData = {
    monthly: [
      { id: 1, title: '2023年12月沙钢集团采购月度报表', date: '2024-01-10', type: '月度报表', downloads: 156 },
      { id: 2, title: '2023年11月沙钢集团采购月度报表', date: '2023-12-10', type: '月度报表', downloads: 187 },
      { id: 3, title: '2023年10月沙钢集团采购月度报表', date: '2023-11-10', type: '月度报表', downloads: 203 },
      { id: 4, title: '2023年9月沙钢集团采购月度报表', date: '2023-10-10', type: '月度报表', downloads: 198 },
    ],
    quarterly: [
      { id: 5, title: '2023年第四季度沙钢集团经营报表', date: '2024-01-15', type: '季度报表', downloads: 245 },
      { id: 6, title: '2023年第三季度沙钢集团经营报表', date: '2023-10-15', type: '季度报表', downloads: 312 },
      { id: 7, title: '2023年第二季度沙钢集团经营报表', date: '2023-07-15', type: '季度报表', downloads: 289 },
    ],
    annual: [
      { id: 8, title: '2023年沙钢集团年度财务报表', date: '2024-03-28', type: '年度报表', downloads: 478 },
      { id: 9, title: '2022年沙钢集团年度财务报表', date: '2023-03-25', type: '年度报表', downloads: 652 },
    ],
    special: [
      { id: 10, title: '2023年钢铁行业绿色发展专题报告', date: '2023-12-20', type: '专题报告', downloads: 387 },
      { id: 11, title: '2023年沙钢集团社会责任报告', date: '2023-11-30', type: '专题报告', downloads: 274 },
      { id: 12, title: '供应链扶持项目进展报告', date: '2023-10-25', type: '专题报告', downloads: 216 },
    ]
  };

  // 处理下载报表
  const handleDownloadReport = (reportId, reportTitle) => {
    console.log(`下载报表：${reportId} - ${reportTitle}`);
    // 这里应该是实际的下载逻辑
    alert(`报表《${reportTitle}》正在下载中...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 bg-purple-50 px-6 py-4">
            <h1 className="text-2xl font-bold text-purple-900">数据报表</h1>
            <p className="mt-1 text-sm text-purple-600">
              查看和下载沙钢集团各类经营数据报表
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto py-2">
              <button
                onClick={() => setActiveTab('monthly')}
                className={`whitespace-nowrap px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'monthly'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                月度报表
              </button>
              <button
                onClick={() => setActiveTab('quarterly')}
                className={`whitespace-nowrap px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'quarterly'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                季度报表
              </button>
              <button
                onClick={() => setActiveTab('annual')}
                className={`whitespace-nowrap px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'annual'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                年度报表
              </button>
              <button
                onClick={() => setActiveTab('special')}
                className={`whitespace-nowrap px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'special'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                专题报告
              </button>
            </nav>
          </div>

          {/* Report List */}
          <div className="overflow-hidden">
            {reportData[activeTab].length === 0 ? (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4 text-gray-500">暂无报表数据</p>
              </div>
            ) : (
              <div className="overflow-hidden sm:px-6 lg:px-8">
                <div className="py-6">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            报表名称
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            类型
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            发布日期
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            下载次数
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData[activeTab].map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {report.title}
                              {new Date(report.date) >= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                  NEW
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {report.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                </svg>
                                {report.downloads}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDownloadReport(report.id, report.title)}
                                className="inline-flex items-center px-3 py-1.5 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                              >
                                <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                下载
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  报表数据仅供参考，详细数据请以公司内部官方发布为准。如需查询更多历史报表，请
                  <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
                    联系我们
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports; 