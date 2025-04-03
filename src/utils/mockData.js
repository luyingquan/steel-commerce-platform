// Mock data for announcements
export const announcementData = [
  {
    id: 1,
    type: 'notice',
    category: '重要',
    title: '关于短期电子交易调整',
    company: '沙钢集团',
    date: '2025-03-31'
  },
  {
    id: 2,
    type: 'notice',
    category: '公告',
    title: '沙钢产品网上销售定价通知',
    company: '沙钢集团',
    date: '2025-03-26'
  },
  {
    id: 3,
    type: 'notice',
    category: '报告',
    title: '关于沙钢集团供应商基本情况统计完善的说明',
    company: '沙钢集团',
    date: '2025-02-22'
  },
  {
    id: 4,
    type: 'notice',
    category: '公告',
    title: '江苏沙钢集团贸易有限公司网上询采交易业务客户审请流程',
    company: '江苏沙钢',
    date: '2025-02-15'
  },
  {
    id: 5,
    type: 'notice',
    category: '报告',
    title: '投摩在线招标采购平台价格收费规则',
    company: '沙钢集团',
    date: '2024-12-22'
  },
  {
    id: 6,
    type: 'notice',
    category: '公告',
    title: '江苏沙钢集团有限公司 重点认证 合同管理公告',
    company: '江苏沙钢',
    date: '2024-11-06'
  },
  {
    id: 7,
    type: 'plan',
    category: '大连',
    title: '东北特殊钢集团股份有限公司2025年4月 招标/询价计划',
    company: '东北特钢',
    date: '2025-03-28'
  },
  {
    id: 8,
    type: 'plan',
    category: '淮钢',
    title: '江阴特殊钢铁有限公司国内物资、副产品高价销售项目公告',
    company: '淮钢集团',
    date: '2025-03-26'
  },
  {
    id: 9,
    type: 'plan',
    category: '抚顺',
    title: '东北特殊钢集团股份有限公司2025年3月招标计划',
    company: '东北特钢',
    date: '2025-02-22'
  },
  {
    id: 10,
    type: 'plan',
    category: '抚顺',
    title: '东北特殊钢集团股份有限公司2025年2月招标计划',
    company: '东北特钢',
    date: '2025-01-20'
  },
  {
    id: 11,
    type: 'plan',
    category: '沙钢',
    title: '沙钢集团2025年2月招标计划',
    company: '沙钢集团',
    date: '2024-01-22'
  },
  {
    id: 12,
    type: 'plan',
    category: '抚顺',
    title: '东北特殊钢集团股份有限公司2025年1月招标计划',
    company: '东北特钢',
    date: '2024-12-26'
  }
];

// Mock data for sales and purchase items
export const salesPurchaseData = [
  // 采购公告
  {
    id: 1,
    type: '大连',
    title: '东北特殊钢集团股份有限公司2025年4月 招标/询价计划',
    company: '东北特钢',
    date: '2025-03-28',
    isSales: false,
    category: '设备'
  },
  {
    id: 2,
    type: '淮钢',
    title: '江阴特殊钢铁有限公司国内物资、副产品高价销售项目公告',
    company: '淮钢集团',
    date: '2025-03-26',
    isSales: true,
    category: '钢材',
    quantity: '5000吨',
    price: '4800-5200元/吨'
  },
  {
    id: 3,
    type: '抚顺',
    title: '东北特殊钢集团股份有限公司2025年3月招标计划',
    company: '东北特钢',
    date: '2025-02-22',
    isSales: false,
    category: '原材料'
  },
  {
    id: 4,
    type: '抚顺',
    title: '东北特殊钢集团股份有限公司2025年2月招标计划',
    company: '东北特钢',
    date: '2025-01-20',
    isSales: false,
    category: '备件'
  },
  {
    id: 5,
    type: '沙钢',
    title: '沙钢集团2025年2月招标计划',
    company: '沙钢集团',
    date: '2024-01-22',
    isSales: false,
    category: '工程'
  },
  {
    id: 6,
    type: '抚顺',
    title: '东北特殊钢集团股份有限公司2025年1月招标计划',
    company: '东北特钢',
    date: '2024-12-26',
    isSales: false,
    category: '服务'
  },
  
  // 销售公告
  {
    id: 7,
    type: '沙钢',
    title: '沙钢集团螺纹钢销售公告',
    company: '沙钢集团',
    date: '2025-03-30',
    isSales: true,
    category: '钢材',
    quantity: '2000吨',
    price: '4800-5200元/吨'
  },
  {
    id: 8,
    type: '淮钢',
    title: '淮钢集团H型钢特价销售公告',
    company: '淮钢集团',
    date: '2025-03-28',
    isSales: true,
    category: '钢材',
    quantity: '1500吨',
    price: '4600-5000元/吨'
  },
  {
    id: 9,
    type: '抚顺',
    title: '东北特钢轴承钢销售公告',
    company: '东北特钢',
    date: '2025-03-25',
    isSales: true,
    category: '钢材',
    quantity: '800吨',
    price: '6800-7200元/吨'
  },
  {
    id: 10,
    type: '沙钢',
    title: '沙钢集团废旧设备处理公告',
    company: '沙钢集团',
    date: '2025-03-22',
    isSales: true,
    category: '废料',
    quantity: '批量',
    price: '面议'
  },
  {
    id: 11,
    type: '大连',
    title: '大连特钢不锈钢板销售公告',
    company: '大连特钢',
    date: '2025-03-20',
    isSales: true,
    category: '钢材',
    quantity: '1200吨',
    price: '15800-16500元/吨'
  },
  {
    id: 12,
    type: '沙钢',
    title: '沙钢集团工业用钢丝销售公告',
    company: '沙钢集团',
    date: '2025-03-18',
    isSales: true,
    category: '钢材',
    quantity: '500吨',
    price: '5500-6000元/吨'
  },
  {
    id: 13,
    type: '淮钢',
    title: '淮钢集团废旧备件销售公告',
    company: '淮钢集团',
    date: '2025-03-15',
    isSales: true,
    category: '备件',
    quantity: '一批',
    price: '详见附件'
  },
  {
    id: 14,
    type: '抚顺',
    title: '抚顺特钢厂区闲置设备处理公告',
    company: '抚顺特钢',
    date: '2025-03-12',
    isSales: true,
    category: '其他',
    quantity: '详见清单',
    price: '竞价'
  },
  {
    id: 15,
    type: '安阳',
    title: '安阳钢铁冷轧板卷销售公告',
    company: '安阳钢铁',
    date: '2025-03-10',
    isSales: true,
    category: '钢材',
    quantity: '3000吨',
    price: '5300-5700元/吨'
  },
  
  // 新增采购公告
  {
    id: 16,
    type: '安阳',
    title: '安阳钢铁2025年设备维修招标公告',
    company: '安阳钢铁',
    date: '2025-03-25',
    isSales: false,
    category: '服务'
  },
  {
    id: 17,
    type: '安阳',
    title: '安阳钢铁集团炉料采购招标公告',
    company: '安阳钢铁',
    date: '2025-03-18',
    isSales: false,
    category: '原材料'
  },
  {
    id: 18,
    type: '大连',
    title: '大连特钢厂区建设工程招标公告',
    company: '大连特钢',
    date: '2025-03-15',
    isSales: false,
    category: '工程'
  },
  {
    id: 19,
    type: '沙钢',
    title: '沙钢集团自动化控制系统招标公告',
    company: '沙钢集团',
    date: '2025-03-12',
    isSales: false,
    category: '设备'
  },
  {
    id: 20,
    type: '淮钢',
    title: '淮钢集团大修备件询价采购公告',
    company: '淮钢集团',
    date: '2025-03-08',
    isSales: false,
    category: '备件'
  },
  {
    id: 21,
    type: '安阳',
    title: '安阳钢铁环保设施升级采购项目',
    company: '安阳钢铁',
    date: '2025-03-05',
    isSales: false,
    category: '设备'
  },
  {
    id: 22,
    type: '沙钢',
    title: '沙钢集团信息系统维护服务招标',
    company: '沙钢集团',
    date: '2025-03-01',
    isSales: false,
    category: '服务'
  },
  {
    id: 23,
    type: '大连',
    title: '大连特钢自动检测设备采购公告',
    company: '大连特钢',
    date: '2025-02-28',
    isSales: false,
    category: '设备'
  },
  {
    id: 24,
    type: '淮钢',
    title: '淮钢集团耐火材料询价采购公告',
    company: '淮钢集团',
    date: '2025-02-25',
    isSales: false,
    category: '原材料'
  },
  {
    id: 25,
    type: '抚顺',
    title: '抚顺特钢设备维修服务招标公告',
    company: '抚顺特钢',
    date: '2025-02-20',
    isSales: false,
    category: '服务'
  },
  
  // 新增销售公告
  {
    id: 26,
    type: '安阳',
    title: '安阳钢铁结构钢筋销售公告',
    company: '安阳钢铁',
    date: '2025-03-27',
    isSales: true,
    category: '钢材',
    quantity: '2500吨',
    price: '4900-5300元/吨'
  },
  {
    id: 27,
    type: '大连',
    title: '大连特钢高强度合金销售公告',
    company: '大连特钢',
    date: '2025-03-24',
    isSales: true,
    category: '钢材',
    quantity: '1000吨',
    price: '8500-9000元/吨'
  },
  {
    id: 28,
    type: '沙钢',
    title: '沙钢集团优质热轧卷板销售公告',
    company: '沙钢集团',
    date: '2025-03-21',
    isSales: true,
    category: '钢材',
    quantity: '3000吨',
    price: '5100-5600元/吨'
  },
  {
    id: 29,
    type: '淮钢',
    title: '淮钢集团高品质合金结构钢销售',
    company: '淮钢集团',
    date: '2025-03-17',
    isSales: true,
    category: '钢材',
    quantity: '1800吨',
    price: '6200-6800元/吨'
  },
  {
    id: 30,
    type: '抚顺',
    title: '抚顺特钢不锈钢材料特价销售',
    company: '抚顺特钢',
    date: '2025-03-14',
    isSales: true,
    category: '钢材',
    quantity: '600吨',
    price: '15600-16200元/吨'
  },
  {
    id: 31,
    type: '安阳',
    title: '安阳钢铁废料回收利用销售公告',
    company: '安阳钢铁',
    date: '2025-03-11',
    isSales: true,
    category: '废料',
    quantity: '批量',
    price: '按重量计价'
  },
  {
    id: 32,
    type: '大连',
    title: '大连特钢闲置库存设备处置公告',
    company: '大连特钢',
    date: '2025-03-08',
    isSales: true,
    category: '备件',
    quantity: '一批',
    price: '详见清单报价'
  },
  {
    id: 33,
    type: '沙钢',
    title: '沙钢集团钢板桩材料销售公告',
    company: '沙钢集团',
    date: '2025-03-05',
    isSales: true,
    category: '钢材',
    quantity: '1500吨',
    price: '5800-6300元/吨'
  },
  {
    id: 34,
    type: '淮钢',
    title: '淮钢集团优质工模具钢销售公告',
    company: '淮钢集团',
    date: '2025-03-01',
    isSales: true,
    category: '钢材',
    quantity: '800吨',
    price: '7500-8100元/吨'
  },
  {
    id: 35,
    type: '抚顺',
    title: '抚顺特钢高强度弹簧钢销售公告',
    company: '抚顺特钢',
    date: '2025-02-26',
    isSales: true,
    category: '钢材',
    quantity: '500吨',
    price: '7800-8400元/吨'
  }
];

// Mock data for bidding items
export const biddingData = [
  {
    id: 1,
    projectName: '电极灰车外协',
    biddingMethod: '公开竞价',
    participationMethod: '报价',
    deposit: '10万',
    announcementDate: '2025-04-03',
    registrationStartDate: '2025-04-05',
    registrationEndDate: '2025-04-08',
    department: '炼钢厂'
  },
  {
    id: 2,
    projectName: '高精度四探头',
    biddingMethod: '公开招标',
    participationMethod: '报价',
    deposit: '5万',
    announcementDate: '2025-04-02',
    registrationStartDate: '2025-04-06',
    registrationEndDate: '2025-04-08',
    department: '安防厂'
  },
  {
    id: 3,
    projectName: '炼钢"蓝符"',
    biddingMethod: '公开招标',
    participationMethod: '报价',
    deposit: '10万',
    announcementDate: '2025-04-03',
    registrationStartDate: '2025-04-05',
    registrationEndDate: '2025-04-08',
    department: '炼钢厂'
  },
  {
    id: 4,
    projectName: '电动单卡车',
    biddingMethod: '公开招标',
    participationMethod: '报价',
    deposit: '5万',
    announcementDate: '2025-04-02',
    registrationStartDate: '2025-04-06',
    registrationEndDate: '2025-04-08',
    department: '安防厂'
  },
  {
    id: 5,
    projectName: '薄板回收项目',
    biddingMethod: '公开招标',
    participationMethod: '报价',
    deposit: '10万',
    announcementDate: '2025-04-03',
    registrationStartDate: '2025-04-05',
    registrationEndDate: '2025-04-08',
    department: '炼钢厂'
  },
  {
    id: 6,
    projectName: '热喷涂系统改造',
    biddingMethod: '公开招标',
    participationMethod: '报价',
    deposit: '5万',
    announcementDate: '2025-04-02',
    registrationStartDate: '2025-04-06',
    registrationEndDate: '2025-04-08',
    department: '安防厂'
  },
  {
    id: 7,
    projectName: '发动机料',
    biddingMethod: '公开招标',
    participationMethod: '报价',
    deposit: '5万',
    announcementDate: '2025-04-02',
    registrationStartDate: '2025-04-06',
    registrationEndDate: '2025-04-08',
    department: '安防厂'
  }
];