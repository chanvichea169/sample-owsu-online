import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import Step1_ServiceSelection from './Step1_ServiceSelection';
import Step2_ApplicantDetails from './Step2_ApplicantDetails';
import Step4_PaymentFinalization from './Step4_PaymentFinalization';
import Step5_ApplicationReview from './Step5_ApplicationReview';
import type { Service, ApplicantInfo, DocumentInfo, PaymentInfo } from '../types/service.types';
import Step3_PositionToRecieve from './Step3_PositionToRecieve';

interface ServiceWizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export default function ServiceWizard({ onComplete, onCancel }: ServiceWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [applicantInfo, setApplicantInfo] = useState<ApplicantInfo>({
    applicantCode: 'APP-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'),
    idNumber: '',
    lastNameKh: '',
    firstNameKh: '',
    lastNameEn: '',
    firstNameEn: '',
    gender: 'ប្រុស',
    nationality: 'ខ្មែរ',
    dateOfBirth: '',
    phoneNumber: '',
    province: '',
    district: '',
    commune: '',
    village: ''
  });
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>({
    documentType: '',
    documentNumber: '',
    issueDate: '',
    expiryDate: '',
    location: '',
    attachments: []
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: 'cash',
    paidAmount: 0,
    totalAmount: 0,
    changeAmount: 0,
    transactionId: ''
  });

  const steps = [
    { number: 1, title: "ព័ត៌មានសេវារដ្ឋបាល" },
    { number: 2, title: "ព័ត៌មានអ្នកដាក់ពាក្យ" },
    { number: 3, title: "ទីតាំងអង្គភាពច្រកចេញចូលតែមួយ" },
    { number: 4, title: "ឯកសារភ្ជាប់" },
    { number: 5, title: "ពិនិត្យពាក្យស្នើសុំ" }
  ];

  const totalAmount = selectedService ? selectedService.price * quantity : 0;

  const validateStep = () => {
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const formData = {
      service: selectedService,
      quantity,
      applicant: applicantInfo,
      documents: documentInfo,
      payment: paymentInfo,
      totalAmount,
      submittedAt: new Date().toISOString()
    };
    console.log("Form submitted:", formData);
    
    const existingRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    existingRequests.push(formData);
    localStorage.setItem('serviceRequests', JSON.stringify(existingRequests));
    
    alert("បានដាក់ពាក្យស្នើសុំដោយជោគជ័យ!");
    
    if (onComplete) {
      onComplete();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1_ServiceSelection
            selectedService={selectedService}
            onSelectService={setSelectedService}
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
        );
      case 2:
        return (
          <Step2_ApplicantDetails
            applicantInfo={applicantInfo}
            onUpdateApplicant={setApplicantInfo}
          />
        );
      case 3:
        return (
          <Step3_PositionToRecieve
            documentInfo={documentInfo}
            onUpdateDocument={setDocumentInfo}
          />
        );
      case 4:
        return (
          <Step4_PaymentFinalization
            paymentInfo={paymentInfo}
            onUpdatePayment={setPaymentInfo}
          />
        );
      case 5:
        return (
          <Step5_ApplicationReview
            applicantInfo={applicantInfo}
            documentInfo={documentInfo}
            selectedService={selectedService}
            quantity={quantity}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto py-8 px-6">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <h1 className="text-2xl text-cyan-600 mt-4" style={{ fontFamily: 'Khmer OS Muol Light, serif' }}>
            ស្នើសុំសេវាថ្មី
          </h1>
          <nav className="flex items-center mt-2 gap-2 text-sm text-gray-500">
            <span className="uppercase font-bold text-[#0070c0]">APP</span>
            <ChevronRight size={14} />
            <span>បានដាក់ពាក្យស្នើសុំ និង កំពុងរង់ចាំការពិនិត្យផ្ទៀងផ្ទាត់</span>
            <ChevronRight size={14} />
            <span className="text-gray-400">បង្កើត</span>
          </nav>
        </div>

        {/* Step Indicators - Clean style matching photo */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                      ${currentStep > step.number 
                        ? 'bg-green-500 text-white' 
                        : currentStep === step.number 
                          ? 'bg-[#0070c0] text-white ring-4 ring-blue-100' 
                          : 'bg-gray-300 text-gray-600'
                      }`}
                  >
                    {currentStep > step.number ? <CheckCircle size={14} /> : step.number}
                  </div>
                  <div className="text-xs mt-2 text-center">
                    <span className={currentStep === step.number ? 'text-[#0070c0] font-medium' : 'text-gray-500'}>
                      {step.title}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2
                      ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                    style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 1rem)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content - Clean white card */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          {renderStep()}
          
          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
            <div className="flex gap-3">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-6 py-2 text-gray-500 font-medium rounded-lg hover:text-cyan-600 transition-colors border border-gray-200"
                >
                  បោះបង់
                </button>
              )}
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  ថយក្រោយ
                </button>
              )}
            </div>
            
            <button
              onClick={handleNext}
              className="px-8 py-2 bg-[#0070c0] text-white rounded-lg hover:bg-[#005c9e] transition-all text-sm font-medium shadow-sm flex items-center gap-2"
            >
              {currentStep === 5 ? 'ដាក់ពាក្យស្នើសុំ' : 'បន្ទាប់'}
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}