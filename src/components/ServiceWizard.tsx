import { useState, useRef } from 'react';
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
  // ប្រើ useRef ដើម្បីគ្រប់គ្រង daisyUI Modal
  const modalRef = useRef<HTMLDialogElement>(null);
  
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

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // បើក Modal នៅជំហានចុងក្រោយ
      modalRef.current?.showModal();
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
    
    // បិទ Modal និងបញ្ចប់ការងារ
    modalRef.current?.close();
    if (onComplete) {
      onComplete();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_ServiceSelection selectedService={selectedService} onSelectService={setSelectedService} quantity={quantity} onQuantityChange={setQuantity} />;
      case 2:
        return <Step2_ApplicantDetails applicantInfo={applicantInfo} onUpdateApplicant={setApplicantInfo} />;
      case 3:
        return <Step3_PositionToRecieve documentInfo={documentInfo} onUpdateDocument={setDocumentInfo} />;
      case 4:
        return <Step4_PaymentFinalization paymentInfo={paymentInfo} onUpdatePayment={setPaymentInfo} />;
      case 5:
        return <Step5_ApplicationReview applicantInfo={applicantInfo} documentInfo={documentInfo} selectedService={selectedService} quantity={quantity} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* daisyUI Modal សម្រាប់បញ្ជាក់ការដាក់ពាក្យ */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-8 space-y-6">
          <h3 className="font-bold text-xl text-gray-900" style={{ fontFamily: 'Khmer OS Muol Light' }}>តើអ្នកប្រាកដទេ?</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            ព័ត៌មានដែលបានផ្តល់ខាងលើនេះ គឺត្រឹមត្រូវតាមច្បាប់ជាធរមាន។ <br/>
            <span className="text-red-600 font-bold">(សូមបញ្ជាក់ថា ព័ត៌មានមិនពិតនឹងត្រូវផ្តន្ទាទោសតាមច្បាប់ជាធរមាន)</span>
          </p>
          <div className="modal-action flex items-center gap-3 justify-end">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-outline border-gray-300 px-6 h-10 min-h-0 text-sm font-medium">បោះបង់</button>
            </form>
            <button 
              onClick={handleSubmit} 
              className="btn bg-[#0070c0] hover:bg-[#005c9e] text-white px-8 h-10 min-h-0 text-sm font-medium border-none shadow-sm"
            >
              បាទ/ចាស
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className="mx-auto py-4 md:py-8 px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl text-cyan-600 mt-2 md:mt-4" style={{ fontFamily: 'Khmer OS Muol Light, serif' }}>
            ស្នើសុំសេវាថ្មី
          </h1>
          <nav className="flex flex-wrap items-center mt-2 gap-2 text-xs md:text-sm text-gray-500">
            <span className="uppercase font-bold text-[#0070c0]">APP</span>
            <ChevronRight size={14} />
            <span className="truncate max-w-[200px] md:max-w-none text-gray-700 font-medium">ព័ត៌មានស្នើសុំសេវា</span>
          </nav>
        </div>

        {/* Step Indicators */}
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex justify-between items-center relative min-w-[600px] md:min-w-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 z-10
                      ${currentStep > step.number 
                        ? 'bg-green-500 text-white' 
                        : currentStep === step.number 
                          ? 'bg-[#0070c0] text-white ring-4 ring-blue-100 shadow-md' 
                          : 'bg-gray-200 text-gray-500'
                      }`}
                  >
                    {currentStep > step.number ? <CheckCircle size={18} /> : step.number}
                  </div>
                  <div className="text-[10px] md:text-xs mt-3 text-center px-1 font-medium">
                    <span className={currentStep === step.number ? 'text-[#0070c0]' : 'text-gray-400'}>
                      {step.title}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2
                      ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'}
                    `}
                    style={{ width: 'calc(100% - 2.5rem)', left: 'calc(50% + 1.25rem)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-10 transition-all duration-500">
          <div className="min-h-[400px]">
            {renderStep()}
          </div>
          
          {/* Bottom Navigation Buttons */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex w-full sm:w-auto gap-3">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="btn btn-ghost text-gray-500 font-medium h-11 min-h-0 px-6 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm"
                >
                  បោះបង់
                </button>
              )}
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="btn bg-gray-100 hover:bg-gray-200 border-none text-gray-700 h-11 min-h-0 px-6 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <ChevronLeft size={18} />
                  ថយក្រោយ
                </button>
              )}
            </div>
            
            <button
              onClick={handleNext}
              className="btn bg-[#0070c0] hover:bg-[#005c9e] border-none text-white h-11 min-h-0 px-10 rounded-lg text-sm font-medium shadow-lg shadow-blue-200 flex items-center gap-2 w-full sm:w-auto"
            >
              {currentStep === 5 ? 'ដាក់ពាក្យស្នើសុំ' : 'បន្ទាប់'}
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}