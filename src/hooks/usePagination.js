// pages/Home.jsx
import Banner from '../components/Banner';
import Announcements from '../components/Announcements';
import SalesPurchase from '../components/SalesPurchase';
import SupplierGuide from '../components/SupplierGuide';
import Bidding from '../components/Bidding';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <Announcements />
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <SalesPurchase />
        </div>
        <SupplierGuide />
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 mt-8">
          <Bidding />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;