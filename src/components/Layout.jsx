import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isMobile={isMobile} />
      <main className={`flex-grow ${isMobile ? 'pt-2' : ''}`}>
        <Outlet context={[isMobile]} />
      </main>
      <Footer isMobile={isMobile} />
    </div>
  );
};

export default Layout; 