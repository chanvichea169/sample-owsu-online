import { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import Step1_ServiceSelection from './Step1_ServiceSelection';
import Step2_ApplicantDetails from './Step2_ApplicantDetails';
import Step3_PositionToRecieve from './Step3_PositionToRecieve';
import Step4_PaymentFinalization from './Step4_PaymentFinalization';
import Step5_ApplicationReview from './Step5_ApplicationReview';

import type { Service, ApplicantInfo, DocumentInfo, PaymentInfo } from '../types/service.types';
import sectorsData from '../data/sectors.json';
import adminServicesData from '../data/adminServices.json';

interface ServiceWizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export default function ServiceWizard({ onComplete, onCancel }: ServiceWizardProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const [applicantInfo, setApplicantInfo] = useState<ApplicantInfo>({
    applicantCode: 'APP-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'),
    idNumber: '', lastNameKh: '', firstNameKh: '', lastNameEn: '', firstNameEn: '',
    gender: 'ប្រុស', nationality: 'ខ្មែរ', dateOfBirth: '', phoneNumber: '',
    province: '', district: '', commune: '', village: ''
  });

  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>({
    documentType: '', documentNumber: '', issueDate: '', expiryDate: '', location: '', attachments: []
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: 'cash', paidAmount: 0, totalAmount: 0, changeAmount: 0, transactionId: ''
  });

  const steps = [
    { number: 1, title: "ព័ត៌មានសេវារដ្ឋបាល" },
    { number: 2, title: "ព័ត៌មានអ្នកដាក់ពាក្យ" },
    { number: 3, title: "ទីតាំងអង្គភាពច្រក.១" },
    { number: 4, title: "ឯកសារភ្ជាប់" },
    { number: 5, title: "ពិនិត្យពាក្យស្នើសុំ" }
  ];

  const handleNext = () => {
    // Basic Validation: Don't allow next if no service is selected in step 1
    if (currentStep === 1 && !selectedService) {
        alert("សូមជ្រើសរើសសេវារដ្ឋបាលជាមុនសិន!");
        return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
      totalAmount: selectedService ? selectedService.price * quantity : 0,
      submittedAt: new Date().toISOString()
    };
    
    const existingRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    existingRequests.push(formData);
    localStorage.setItem('serviceRequests', JSON.stringify(existingRequests));
    
    modalRef.current?.close();
    if (onComplete) onComplete();
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
            sectors={sectorsData}
            adminServices={adminServicesData}
          />
        );
      case 2: return <Step2_ApplicantDetails applicantInfo={applicantInfo} onUpdateApplicant={setApplicantInfo} />;
      case 3: return <Step3_PositionToRecieve documentInfo={documentInfo} onUpdateDocument={setDocumentInfo} />;
      case 4: return <Step4_PaymentFinalization paymentInfo={paymentInfo} onUpdatePayment={setPaymentInfo} />;
      case 5: return <Step5_ApplicationReview applicantInfo={applicantInfo} documentInfo={documentInfo} selectedService={selectedService} quantity={quantity} />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-khmer">
      {/* Confirmation Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-8 space-y-6 rounded-2xl">
          <h3 className="font-bold text-xl text-gray-900" style={{ fontFamily: 'Khmer OS Muol Light' }}>តើអ្នកប្រាកដទេ?</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            ព័ត៌មានដែលបានផ្តល់ខាងលើនេះ គឺត្រឹមត្រូវតាមច្បាប់ជាធរមាន។ <br/>
            <span className="text-red-600 font-bold">(សូមបញ្ជាក់ថា ព័ត៌មានមិនពិតនឹងត្រូវផ្តន្ទាទោសតាមច្បាប់ជាធរមាន)</span>
          </p>
          <div className="modal-action flex items-center gap-3 justify-end">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-outline border-gray-300 px-6 h-11 min-h-0 text-sm font-medium rounded-lg">បោះបង់</button>
            </form>
            <button onClick={handleSubmit} className="btn bg-[#0070c0] hover:bg-[#005c9e] text-white px-8 h-11 min-h-0 text-sm font-medium border-none shadow-sm rounded-lg">បាទ/ចាស</button>
          </div>
        </div>
      </dialog>

      <div className="mx-auto py-4 md:py-8 px-4 md:px-6 max-w-8xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl text-cyan-600 mb-2" style={{ fontFamily: 'Khmer OS Muol Light, serif' }}>
            ស្នើសុំសេវាថ្មី
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
            <span className="text-[#0070c0]">Portal</span>
            <ChevronRight size={12} />
            <span>ការដាក់ពាក្យស្នើសុំសេវា</span>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex justify-between items-center relative min-w-[700px] md:min-w-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-10 ${
                    currentStep > step.number 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-100' 
                        : currentStep === step.number 
                            ? 'bg-[#0070c0] text-white ring-8 ring-blue-50 shadow-lg' 
                            : 'bg-gray-200 text-gray-400'
                  }`}>
                    {currentStep > step.number ? <CheckCircle size={22} /> : step.number}
                  </div>
                  <div className="text-[11px] md:text-xs mt-4 text-center px-2 font-bold uppercase">
                    <span className={currentStep === step.number ? 'text-[#0070c0]' : 'text-gray-400'}>
                      {step.title}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-5 left-1/2 w-full h-[3px] -translate-y-1/2 transition-colors duration-500 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ width: 'calc(100% - 3rem)', left: 'calc(50% + 1.5rem)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <section className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-12 overflow-hidden transition-all">
          <div className="min-h-[450px]">
            {renderStep()}
          </div>
          
          {/* Navigation Controls */}
          <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex w-full sm:w-auto gap-4">
              {onCancel && (
                <button onClick={onCancel} className="btn btn-ghost text-gray-400 font-bold h-12 min-h-0 px-8 border border-gray-100 hover:bg-gray-50 rounded-xl text-xs uppercase">
                  បោះបង់
                </button>
              )}
              {currentStep > 1 && (
                <button onClick={handleBack} className="btn bg-gray-50 hover:bg-gray-100 border-none text-gray-600 h-12 min-h-0 px-8 rounded-xl text-xs font-bold uppercase flex items-center gap-2">
                  <ChevronLeft size={16} /> ថយក្រោយ
                </button>
              )}
            </div>
            
            <button 
                onClick={handleNext} 
                className="btn bg-[#0070c0] hover:bg-[#005c9e] border-none text-white h-12 min-h-0 px-12 rounded-xl text-xs font-bold uppercase shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center gap-2 w-full sm:w-auto"
            >
              {currentStep === 5 ? 'បញ្ជូនពាក្យស្នើសុំ' : 'បន្តទៅមុខទៀត'} 
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}