import { useState } from 'react';
import type { ApplicantInfo, DocumentInfo, Service } from '../types/service.types';

interface ReviewProps {
  applicantInfo: ApplicantInfo;
  documentInfo: DocumentInfo;
  selectedService: Service | null;
  quantity: number;
}

// Custom Radio Component (Read-only version)
function RadioOption({ label, checked }: { label: string, checked: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 opacity-80">
      <input 
        type="radio" 
        checked={checked} 
        readOnly
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
      />
      {label}
    </label>
  );
}

// Generic Data Display Field
function DataField({ label, value, required = false }: { label: string, value: string, required?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="text-[13px] font-semibold text-gray-700">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full h-10 px-3 border border-gray-300 rounded bg-[#eee] text-sm flex items-center text-gray-800">
        {value || ""}
      </div>
    </div>
  );
}

// Red instructional text
function HelpText({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 pt-2">
      <span className="text-red-600 text-sm">👉</span>
      <p className="text-red-600 text-[13px] font-bold">{text}</p>
    </div>
  );
}

export default function Step5_ApplicationReview({ applicantInfo, selectedService, quantity, documentInfo }: ReviewProps) {
  const [useSelfInfo] = useState(true);
  const total = selectedService ? selectedService.price * quantity : 0;

  return (
    <div className="bg-[#f8f9fa] p-6 border border-gray-300 rounded-sm space-y-8 text-[#444]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-300">
        <h3 className="text-lg font-bold">ព័ត៌មានសេវារដ្ឋបាល</h3>
      </div>

      {/* --- Service & Calculation Row --- */}
      <div className="space-y-1">
        <label className="text-sm font-semibold">
          សេវារដ្ឋបាល
        </label>
        <div className="flex gap-2 p-2 bg-[#eee] border border-gray-300 rounded-md">
          <div className="flex-1 bg-transparent px-2 py-1 min-h-[40px] text-gray-700">
            {selectedService?.name || "មិនមានសេវាត្រូវបានជ្រើសរើស"}
          </div>
        </div>
      </div>

      {/* Numerical Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <DataField label="តម្លៃសេវា (ជារៀល)" value={selectedService ? selectedService.price.toLocaleString() : "0"} />
        <DataField label="ចំនួន" value={quantity.toString()} />
        <DataField label="សរុប (ជារៀល)" value={total.toLocaleString()} />
        <DataField label="រយៈពេលផ្តល់សេវា (ថ្ងៃធ្វើការ)" value={selectedService?.duration?.toString() || "0"} />
        <DataField label="សុពលភាព" value={selectedService?.validity || ""} />
      </div>

      {/* --- Applicant Details Row --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-gray-300 pb-2">ព័ត៌មានអ្នកស្នើសុំ</h3>
        <div className="flex gap-6">
          <RadioOption label="ប្រើព័ត៌មានផ្ទាល់ខ្លួន" checked={useSelfInfo} />
          <RadioOption label="ប្រើព័ត៌មានអ្នកផ្សេង" checked={!useSelfInfo} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataField label="លេខកូដ" value={applicantInfo.applicantCode || ""} />
        <DataField label="លេខអត្តសញ្ញាណប័ណ្ណ" value={applicantInfo.idNumber || ""} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DataField label="នាមត្រកូល(អក្សរខ្មែរ)" value={applicantInfo.lastNameKh || ""} />
        <DataField label="នាមខ្លួន(អក្សរខ្មែរ)" value={applicantInfo.firstNameKh || ""} />
        <DataField label="នាមត្រកូល(អក្សរឡាតាំង)" value={applicantInfo.lastNameEn || ""} />
        <DataField label="នាមខ្លួន(អក្សរឡាតាំង)" value={applicantInfo.firstNameEn || ""} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-700">ភេទ</label>
          <div className="w-full h-10 px-3 border border-gray-300 rounded bg-[#eee] text-sm flex items-center">
            {applicantInfo.gender || "ប្រុស"}
          </div>
        </div>
        <DataField label="សញ្ជាតិ" value={applicantInfo.nationality || "ខ្មែរ"} />
        <div className="lg:col-span-2">
          <DataField label="ថ្ងៃខែឆ្នាំកំណើត (dd/mm/yyyy)" value={applicantInfo.dateOfBirth || ""} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataField label="លេខទូរស័ព្ទ" value={applicantInfo.phoneNumber || ""} />
        <DataField label="លេខទូរស័ព្ទទី២" value={applicantInfo.phoneNumber2 || ""} />
      </div>

      {/* --- Address Section --- */}
      <div className="pt-4 border-t border-dashed border-gray-300 space-y-4">
        <h4 className="text-sm font-bold">អាសយដ្ឋានបច្ចុប្បន្ន</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataField label="ផ្ទះលេខ" value={applicantInfo.houseNo || ""} />
          <DataField label="ផ្លូវលេខ" value={applicantInfo.streetNo || ""} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DataField label="ខេត្ត/ក្រុង" value={applicantInfo.province || ""} />
          <DataField label="ស្រុក/ខណ្ឌ" value={applicantInfo.district || ""} />
          <DataField label="ឃុំ/សង្កាត់" value={applicantInfo.commune || ""} />
          <DataField label="ភូមិ" value={applicantInfo.village || ""} />
        </div>
      </div>

      {/* --- Single Window Location Row --- */}
      <h3 className="text-lg font-bold pt-4 border-t border-gray-300 pb-2">
        ទីតាំងអង្គភាពច្រកចេញចូលតែមួយ
      </h3>
      <div className="space-y-1">
        <DataField label="ទីតាំង" value={(documentInfo as any).location || "មិនទាន់ជ្រើសរើស"} />
        <HelpText text="សូមបញ្ជាក់៖ ទីតាំងដែលលោកអ្នកបានជ្រើសរើស ជាកន្លែងទទួលលទ្ធផលសម្រេច។" />
      </div>

      {/* --- Required Documents Row --- */}
      <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
        <h4 className="font-bold text-sm">ឯកសារត្រូវភ្ជាប់មកជាមួយ ៖</h4>
        <ul className="list-decimal ml-8 text-sm space-y-1">
          {selectedService?.requirements?.map((req, idx) => (
            <li key={idx}>{req}</li>
          )) || <li>ឯកសារថតចម្លង លិខិតអនុញ្ញាត ឬសញ្ញាបត្រ ឬសញ្ញាបត្រច្បាប់ដើម (១ ច្បាប់)</li>}
        </ul>
        <div className="mt-4 text-xs space-y-1">
          <p className="text-red-600 font-bold italic"> 👉 សម្គាល់ : នៅពេលលោក-លោកស្រីមកទទួលលទ្ធផលសម្រេច សូមភ្ជាប់មកជាមួយនូវ : </p>
          <p className="text-red-600 ml-4">- ពាក្យស្នើសុំសេវាដែលមានចុះហត្ថលេខារបស់អ្នកស្នើសុំសេវា</p>
          <p className="text-red-600 ml-4">- ឯកសារពាក់ព័ន្ធផ្សេងៗ (ច្បាប់ដើម) ។</p>
        </div>
      </div>

      {/* Checkbox Section at the very bottom */}
      <div className="pt-6 border-t border-gray-300">
        <label className="flex items-center gap-3 text-xs font-bold text-gray-800 cursor-pointer">
          <input 
            type="checkbox" 
            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
            defaultChecked
          />
          <span className="leading-relaxed">
            ខ្ញុំសូមធានាថាព័ត៌មានដែលបានផ្តល់ខាងលើនេះ គឺត្រឹមត្រូវតាមច្បាប់ជាធរមាន។ <span className="text-red-600">(សូមបញ្ជាក់ថា ព័ត៌មានមិនពិតនឹងត្រូវផ្តន្ទាទោសតាមច្បាប់ជាធរមាន)</span>
          </span>
        </label>
      </div>

    </div>
  );
}