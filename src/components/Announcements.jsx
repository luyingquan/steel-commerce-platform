import { useState } from 'react';
import { Link } from 'react-router-dom';
import { announcementData } from '../utils/mockData';

const Announcements = () => {
  const [activeTab, setActiveTab] = useState('通知公告');
  const [activeSection, setActiveSection] = useState('全部');

  const tabs = [
    { id: '通知公告', name: '通知公告' },
    { id: '沙钢集团采购/销售计划公示', name: '沙钢集团采购/销售计划公示' }
  ];

  const sections = [
    { id: '全部', name: '全部' }, 
    { id: '沙钢', name: '沙钢' },
    { id: '淮钢', name: '淮钢' }, 
    { id: '安阳', name: '安阳' },
    { id: '大连', name: '大连' },
    { id: '抚顺', name: '抚顺' }
  ];

  // Filter announcements based on active tab and section
  const filteredAnnouncements = announcementData.filter(item => {
    const matchesTab = activeTab === '通知公告' && item.type === 'notice' || 
                      activeTab === '沙钢集团采购/销售计划公示' && item.type === 'plan';
                      
    const matchesSection = activeSection === '全部' || item.company.includes(activeSection);
    
    return matchesTab && matchesSection;
  });

  return (
    <div className="bg-white">
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <div className="flex justify-between">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.name}
                <span className="flex h-2 w-2 relative">
                  <span className={`
                    animate-ping absolute inline-flex h-full w-full rounded-full ${activeTab === tab.id ? 'bg-red-400' : 'bg-gray-400'} opacity-75
                  `}></span>
                  <span className={`
                    relative inline-flex rounded-full h-2 w-2 ${activeTab === tab.id ? 'bg-red-500' : 'bg-gray-500'}
                  `}></span>
                </span>
              </button>
            ))}
          </nav>
          <div className="flex items-center px-6">
            <Link to={activeTab === '通知公告' ? "/notifications" : "/plans"} className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center">
              更多 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Announcement section navigation */}
      <div className="border-b border-gray-200 bg-gray-50">
        <nav className="flex overflow-x-auto py-3 px-6" aria-label="Sections">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                whitespace-nowrap px-3 py-1 mx-1 rounded-full text-sm font-medium
                ${activeSection === section.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100'}
              `}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Announcement content */}
      <div className="overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="flex justify-between items-center py-3 px-6 hover:bg-gray-50">
              <Link to={`/announcement/${announcement.id}`} className="flex-1 group">
                <div className="flex items-center">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-sm mr-3">
                    {announcement.category}
                  </span>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600 truncate">
                    {announcement.title}
                  </h3>
                  {announcement.id < 3 && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      NEW
                    </span>
                  )}
                </div>
              </Link>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {announcement.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;