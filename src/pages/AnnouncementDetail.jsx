import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AnnouncementDetail = () => {
  const { id } = useParams();
  // 模拟从API获取公告数据
  const announcement = {
    id: parseInt(id),
    title: '关于2023年钢铁采购计划的公告',
    date: '2023-04-15',
    category: '采购公告',
    type: 'plan',
    content: '这是一个示例公告内容。实际内容将从后端API获取。'
  };

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">公告未找到</h2>
        <Link
          to="/"
          className="text-red-600 hover:text-red-500 font-medium"
        >
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gray-100 py-12"
    >
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              {announcement.category}
            </span>
            <span className="text-gray-500 text-sm">{announcement.date}</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {announcement.title}
          </h1>

          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {announcement.content}
            </p>
            
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">主要内容</h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>公告要点1</li>
                <li>公告要点2</li>
                <li>公告要点3</li>
              </ul>
            </div>

            {announcement.type === 'plan' && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 mb-2">计划详情</h3>
                <p className="text-blue-700">
                  这里将显示具体的计划内容和相关信息。
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500"
              >
                <svg 
                  className="mr-2 h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                返回列表
              </Link>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                下载附件
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnnouncementDetail; 