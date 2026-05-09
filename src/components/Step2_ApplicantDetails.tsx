import { useState } from 'react';
import type { ApplicantInfo } from '../types/service.types';

interface Step2Props {
  applicantInfo: ApplicantInfo;
  onUpdateApplicant: (info: ApplicantInfo) => void;
}

interface InputFieldProps {
  label: string;
  field: keyof ApplicantInfo;
  formData: ApplicantInfo;
  onChange: (field: keyof ApplicantInfo, value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

// Custom Radio Component
function RadioOption({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
      <input 
        type="radio" 
        checked={checked} 
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
      />
      {label}
    </label>
  );
}

function InputField({ label, field, formData, onChange, type = "text", placeholder, disabled = false, required = false }: InputFieldProps) {
  const isGrey = disabled || field === 'idNumber' || field === 'dateOfBirth' || field === 'applicantCode'; 
  
  return (
    <div className="space-y-1">
      <label className="text-[13px] font-semibold text-gray-700">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        disabled={disabled}
        value={(formData[field] as string) || ''}
        onChange={(e) => onChange(field, e.target.value)}
        className={`w-full h-10 px-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition-all
          ${isGrey ? 'bg-[#eee]' : 'bg-white'}`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function Step2_ApplicantDetails({ applicantInfo, onUpdateApplicant }: Step2Props) {
  const [formData, setFormData] = useState<ApplicantInfo>(applicantInfo);
  const [useSelfInfo, setUseSelfInfo] = useState(true);

  const handleChange = (field: keyof ApplicantInfo, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateApplicant(updated);
  };

  return (
    <div className="bg-[#f8f9fa] p-6 border border-gray-300 rounded-sm space-y-8 text-[#444]">
      {/* Header & Radio Group */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-gray-300 pb-2">ព័ត៌មានអ្នកស្នើសុំ</h3>
        <div className="flex gap-6">
          <RadioOption label="ប្រើព័ត៌មានផ្ទាល់ខ្លួន" checked={useSelfInfo} onChange={() => setUseSelfInfo(true)} />
          <RadioOption label="ប្រើព័ត៌មានអ្នកផ្សេង" checked={!useSelfInfo} onChange={() => setUseSelfInfo(false)} />
        </div>
      </div>

      {/* Row 1: ID Codes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="លេខកូដ" field="applicantCode" formData={formData} onChange={handleChange} disabled />
        <InputField label="លេខអត្តសញ្ញាណប័ណ្ណ" field="idNumber" formData={formData} onChange={handleChange} />
      </div>

      {/* Row 2: Names (4 columns as seen in image) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InputField label="នាមត្រកូល(អក្សរខ្មែរ)" field="lastNameKh" formData={formData} onChange={handleChange} />
        <InputField label="នាមខ្លួន(អក្សរខ្មែរ)" field="firstNameKh" formData={formData} onChange={handleChange} />
        <InputField label="នាមត្រកូល(អក្សរឡាតាំង)" field="lastNameEn" formData={formData} onChange={handleChange} />
        <InputField label="នាមខ្លួន(អក្សរឡាតាំង)" field="firstNameEn" formData={formData} onChange={handleChange} />
      </div>

      {/* Row 3: Gender, Nationality, DOB */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-700">ភេទ</label>
          <select 
            value={formData.gender || 'ប្រុស'}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded bg-[#eee] text-sm outline-none"
          >
            <option value="ប្រុស">ប្រុស</option>
            <option value="ស្រី">ស្រី</option>
          </select>
        </div>
        <InputField label="សញ្ជាតិ" field="nationality" formData={formData} onChange={handleChange} disabled />
        <div className="lg:col-span-2">
           <InputField label="ថ្ងៃខែឆ្នាំកំណើត (dd/mm/yyyy)" field="dateOfBirth" formData={formData} onChange={handleChange} />
        </div>
      </div>

      {/* Row 4: Phone Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="លេខទូរស័ព្ទ" field="phoneNumber" formData={formData} onChange={handleChange} />
        <InputField label="លេខទូរស័ព្ទទី២" field="phoneNumber2" formData={formData} onChange={handleChange} placeholder="e.g. 010000000" />
      </div>

      {/* Address Section */}
      <div className="pt-4 border-t border-dashed border-gray-300 space-y-4">
        <h4 className="text-sm font-bold">អាសយដ្ឋានបច្ចុប្បន្ន</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="ផ្ទះលេខ" field="houseNo" formData={formData} onChange={handleChange} placeholder="e.g. No. 001" />
          <InputField label="ផ្លូវលេខ" field="streetNo" formData={formData} onChange={handleChange} placeholder="e.g. St. 001" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InputField label="ខេត្ត/ក្រុង" field="province" formData={formData} onChange={handleChange} placeholder="ជ្រើសរើស" />
          <InputField label="ស្រុក/ខណ្ឌ" field="district" formData={formData} onChange={handleChange} placeholder="ជ្រើសរើស" />
          <InputField label="ឃុំ/សង្កាត់" field="commune" formData={formData} onChange={handleChange} placeholder="ជ្រើសរើស" />
          <InputField label="ភូមិ" field="village" formData={formData} onChange={handleChange} placeholder="ជ្រើសរើស" />
        </div>
      </div>
    </div>
  );
}