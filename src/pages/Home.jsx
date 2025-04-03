import { motion } from 'framer-motion';
import Banner from '../components/Banner';
import Announcements from '../components/Announcements';
import SalesPurchase from '../components/SalesPurchase';
import Bidding from '../components/Bidding';
import SupplierGuide from '../components/SupplierGuide';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50"
    >
      {/* 首页横幅 */}
      <Banner />
      
      {/* 通知公告 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Announcements />
        </div>
      </section>
      
      {/* 采购销售信息 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SalesPurchase />
        </div>
      </section>
      
      {/* 招投标信息 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Bidding />
        </div>
      </section>
      
      {/* 供应商指南 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SupplierGuide />
        </div>
      </section>
    </motion.div>
  );
};

export default Home; 