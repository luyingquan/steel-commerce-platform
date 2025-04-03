import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SupplierRegister = () => {
  // 表单状态
  const [formData, setFormData] = useState({
    companyName: '',
    businessLicense: '',
    socialCreditCode: '',
    companyAddress: '',
    contactPerson: '',
    contactPhone: '',
    email: '',
    businessScope: '',
    supplierType: 'manufacturer',
    qualifications: [],
    hasExperience: false,
    experienceDescription: '',
    agreeTerms: false
  });
  
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // 清除错误
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // 处理资质选择
  const handleQualificationChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        qualifications: [...formData.qualifications, value]
      });
    } else {
      setFormData({
        ...formData,
        qualifications: formData.qualifications.filter(item => item !== value)
      });
    }
  };

  // 表单验证
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = '请输入企业名称';
    }
    
    if (!formData.socialCreditCode.trim()) {
      newErrors.socialCreditCode = '请输入统一社会信用代码';
    } else if (formData.socialCreditCode.length !== 18) {
      newErrors.socialCreditCode = '统一社会信用代码必须为18位';
    }
    
    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = '请输入企业地址';
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = '请输入联系人姓名';
    }
    
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = '请输入联系电话';
    } else if (!/^1[3-9]\d{9}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = '请输入有效的手机号码';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '请输入电子邮箱';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = '请输入有效的电子邮箱地址';
    }
    
    if (!formData.businessScope.trim()) {
      newErrors.businessScope = '请输入经营范围';
    }
    
    if (formData.hasExperience && !formData.experienceDescription.trim()) {
      newErrors.experienceDescription = '请描述您的合作经验';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '您需要同意服务条款才能注册';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // 模拟提交到服务器的过程
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // 重置表单
        setTimeout(() => {
          setFormData({
            companyName: '',
            businessLicense: '',
            socialCreditCode: '',
            companyAddress: '',
            contactPerson: '',
            contactPhone: '',
            email: '',
            businessScope: '',
            supplierType: 'manufacturer',
            qualifications: [],
            hasExperience: false,
            experienceDescription: '',
            agreeTerms: false
          });
          setShowSuccess(false);
        }, 5000);
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
            <h1 className="text-2xl font-bold text-blue-900">供应商注册</h1>
            <p className="mt-1 text-sm text-blue-600">
              注册成为沙钢云商平台供应商，获取更多合作机会
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    注册申请提交成功！我们将在3个工作日内审核您的信息，并通过邮件通知您审核结果。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-8 md:px-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              {/* 企业名称 */}
              <div className="sm:col-span-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  企业名称 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.companyName ? 'border-red-300' : ''}`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>
              </div>

              {/* 营业执照 */}
              <div className="sm:col-span-2">
                <label htmlFor="businessLicense" className="block text-sm font-medium text-gray-700">
                  营业执照上传
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    name="businessLicense"
                    id="businessLicense"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="sr-only"
                  />
                  <label
                    htmlFor="businessLicense"
                    className="cursor-pointer rounded-md bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    选择文件
                  </label>
                  <span className="ml-3 text-sm text-gray-500">支持 JPG、PNG、PDF 格式，大小不超过5MB</span>
                </div>
              </div>

              {/* 统一社会信用代码 */}
              <div className="sm:col-span-2">
                <label htmlFor="socialCreditCode" className="block text-sm font-medium text-gray-700">
                  统一社会信用代码 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="socialCreditCode"
                    id="socialCreditCode"
                    value={formData.socialCreditCode}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.socialCreditCode ? 'border-red-300' : ''}`}
                  />
                  {errors.socialCreditCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.socialCreditCode}</p>
                  )}
                </div>
              </div>

              {/* 企业地址 */}
              <div className="sm:col-span-2">
                <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">
                  企业地址 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="companyAddress"
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.companyAddress ? 'border-red-300' : ''}`}
                  />
                  {errors.companyAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyAddress}</p>
                  )}
                </div>
              </div>

              {/* 联系人 */}
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                  联系人 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="contactPerson"
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.contactPerson ? 'border-red-300' : ''}`}
                  />
                  {errors.contactPerson && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>
                  )}
                </div>
              </div>

              {/* 联系电话 */}
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                  联系电话 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="contactPhone"
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.contactPhone ? 'border-red-300' : ''}`}
                  />
                  {errors.contactPhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
                  )}
                </div>
              </div>

              {/* 电子邮箱 */}
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  电子邮箱 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email ? 'border-red-300' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* 经营范围 */}
              <div className="sm:col-span-2">
                <label htmlFor="businessScope" className="block text-sm font-medium text-gray-700">
                  经营范围 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    name="businessScope"
                    id="businessScope"
                    rows={3}
                    value={formData.businessScope}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.businessScope ? 'border-red-300' : ''}`}
                  />
                  {errors.businessScope && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessScope}</p>
                  )}
                </div>
              </div>

              {/* 供应商类型 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">供应商类型</label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center">
                    <input
                      id="manufacturer"
                      name="supplierType"
                      type="radio"
                      value="manufacturer"
                      checked={formData.supplierType === 'manufacturer'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="manufacturer" className="ml-3 block text-sm font-medium text-gray-700">
                      生产制造商
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="agent"
                      name="supplierType"
                      type="radio"
                      value="agent"
                      checked={formData.supplierType === 'agent'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="agent" className="ml-3 block text-sm font-medium text-gray-700">
                      代理商
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="service"
                      name="supplierType"
                      type="radio"
                      value="service"
                      checked={formData.supplierType === 'service'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="service" className="ml-3 block text-sm font-medium text-gray-700">
                      服务提供商
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="other"
                      name="supplierType"
                      type="radio"
                      value="other"
                      checked={formData.supplierType === 'other'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="other" className="ml-3 block text-sm font-medium text-gray-700">
                      其他
                    </label>
                  </div>
                </div>
              </div>

              {/* 资质证明 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">资质证明（可多选）</label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="iso9001"
                        name="qualifications"
                        type="checkbox"
                        value="ISO9001"
                        checked={formData.qualifications.includes('ISO9001')}
                        onChange={handleQualificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="iso9001" className="font-medium text-gray-700">ISO9001质量管理体系认证</label>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="iso14001"
                        name="qualifications"
                        type="checkbox"
                        value="ISO14001"
                        checked={formData.qualifications.includes('ISO14001')}
                        onChange={handleQualificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="iso14001" className="font-medium text-gray-700">ISO14001环境管理体系认证</label>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="ohsas18001"
                        name="qualifications"
                        type="checkbox"
                        value="OHSAS18001"
                        checked={formData.qualifications.includes('OHSAS18001')}
                        onChange={handleQualificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="ohsas18001" className="font-medium text-gray-700">OHSAS18001职业健康安全管理体系认证</label>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="other_cert"
                        name="qualifications"
                        type="checkbox"
                        value="其他"
                        checked={formData.qualifications.includes('其他')}
                        onChange={handleQualificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="other_cert" className="font-medium text-gray-700">其他行业专业资质</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 合作经验 */}
              <div className="sm:col-span-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="hasExperience"
                      name="hasExperience"
                      type="checkbox"
                      checked={formData.hasExperience}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="hasExperience" className="font-medium text-gray-700">是否有钢铁行业相关合作经验？</label>
                  </div>
                </div>
                
                {formData.hasExperience && (
                  <div className="mt-3">
                    <label htmlFor="experienceDescription" className="block text-sm font-medium text-gray-700">
                      请简要描述您的合作经验 <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="experienceDescription"
                        id="experienceDescription"
                        rows={3}
                        value={formData.experienceDescription}
                        onChange={handleChange}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.experienceDescription ? 'border-red-300' : ''}`}
                        placeholder="请描述您的合作项目、合作方、合作时间等信息..."
                      />
                      {errors.experienceDescription && (
                        <p className="mt-1 text-sm text-red-600">{errors.experienceDescription}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 服务条款 */}
              <div className="sm:col-span-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${errors.agreeTerms ? 'border-red-300' : ''}`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                      我已阅读并同意
                      <Link to="/terms" className="text-blue-600 hover:text-blue-500 ml-1">
                        《沙钢云商平台服务条款》
                      </Link>
                    </label>
                    {errors.agreeTerms && (
                      <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end space-x-3">
              <Link
                to="/"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                取消
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    提交中...
                  </>
                ) : '提交申请'}
              </button>
            </div>
          </form>

          {/* 提示信息 */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <p>
                <span className="text-red-500">*</span> 为必填项
              </p>
              <p className="mt-1">
                提交申请后，我们将在3个工作日内审核您的信息，并通过邮件通知您审核结果。
              </p>
              <p className="mt-1">
                如有任何疑问，请联系：400-8888-9999
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupplierRegister; 