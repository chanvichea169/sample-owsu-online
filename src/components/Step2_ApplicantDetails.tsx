import { useState } from 'react';
import type { ApplicantInfo } from '../types/service.types';

interface Step2Props {
  applicantInfo: ApplicantInfo;
  onUpdateApplicant: (info: ApplicantInfo) => void;
}

interface InputFieldProps {
  label: string;
  subLabel?: string;
  field: string;
  formData: any;
  onChange: (field: string, value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  isSelect?: boolean;
  options?: Array<{ value: string; label: string }>;
}

// Reusable Input Component with daisyUI styling
function InputField({ 
  label, 
  subLabel, 
  field, 
  formData, 
  onChange, 
  type = "text", 
  placeholder, 
  disabled = false, 
  required = false, 
  isSelect = false,
  options = []
}: InputFieldProps) {
  const isGrey = disabled;
  
  return (
    <div className="space-y-1">
      <label className="block text-[13px] font-bold text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        {subLabel && <span className="block text-[11px] font-normal text-gray-400 mt-[-2px]">{subLabel}</span>}
      </label>
      
      <div className="relative">
        {isSelect ? (
          <>
            <select 
              disabled={disabled}
              value={formData[field] || ''}
              onChange={(e) => onChange(field, e.target.value)}
              className={`select select-bordered w-full h-10 min-h-0 py-2 text-sm
                ${isGrey ? 'bg-[#eee]' : 'bg-[#fcfcfc]'}
                focus:border-[#00bcd4] focus:outline-none`}
            >
              <option value="">{placeholder || "ជ្រើសរើស"}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        ) : (
          <input
            type={type}
            disabled={disabled}
            value={formData[field] || ''}
            onChange={(e) => onChange(field, e.target.value)}
            placeholder={placeholder}
            className={`input input-bordered w-full h-10 py-2 text-sm placeholder:text-gray-300
              ${isGrey ? 'bg-[#eee]' : 'bg-[#fcfcfc]'}
              focus:border-[#00bcd4] focus:outline-none`}
          />
        )}
      </div>
    </div>
  );
}

// Sample options data
const GENDER_OPTIONS = [
  { value: 'MALE', label: 'ប្រុស' },
  { value: 'FEMALE', label: 'ស្រី' },
  { value: 'OTHER', label: 'ផ្សេងៗ' }
];

const PROVINCE_OPTIONS = [
  { value: 'PP', label: 'ភ្នំពេញ' },
  { value: 'SR', label: 'សៀមរាប' },
  { value: 'BTB', label: 'បាត់ដំបង' },
  { value: 'KK', label: 'កំពង់ចាម' },
  { value: 'KT', label: 'ក្រចេះ' },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: 'RESIDENTIAL', label: 'លំនៅដ្ឋាន' },
  { value: 'COMMERCIAL', label: 'ពាណិជ្ជកម្ម' },
  { value: 'AGRICULTURAL', label: 'កសិកម្ម' },
  { value: 'INDUSTRIAL', label: 'ឧស្សាហកម្ម' }
];

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'ដុល្លារ (USD)' },
  { value: 'KHR', label: 'រៀល (KHR)' },
  { value: 'THB', label: 'បាត (THB)' }
];

const CREDITOR_OPTIONS = [
  { value: 'ABA', label: 'ABA Bank' },
  { value: 'ACLEDA', label: 'ACLEDA Bank' },
  { value: 'WING', label: 'Wing Bank' },
  { value: 'PHILLIP', label: 'Phillip Bank' },
  { value: 'OTHER', label: 'ផ្សេងៗ' }
];

export default function Step2_ApplicantDetails({ applicantInfo, onUpdateApplicant }: Step2Props) {
  const [formData, setFormData] = useState<any>(applicantInfo);
  const [landEntries, setLandEntries] = useState<any[]>([]);
  const [serviceType, setServiceType] = useState<'self' | 'guardian'>('self');

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateApplicant(updated);
  };

  // Add new land entry
  const handleAddLandEntry = () => {
    const newLandEntry = {
      id: Date.now(),
      landNumber: formData.landNumber || '',
      propertyType: formData.propertyType || '',
      loanAgreements: formData.loanAgreements || '',
      province: formData.landProvince || '',
      district: formData.landDistrict || '',
      commune: formData.landCommune || '',
      village: formData.landVillage || ''
    };
    
    if (!newLandEntry.landNumber || !newLandEntry.propertyType) {
      alert("សូមបំពេញព័ត៌មានក្បាលដីជាមុនសិន!");
      return;
    }
    
    setLandEntries([...landEntries, newLandEntry]);
    
    // Clear the form fields after adding
    setFormData({
      ...formData,
      landNumber: '',
      propertyType: '',
      loanAgreements: '',
      landProvince: '',
      landDistrict: '',
      landCommune: '',
      landVillage: ''
    });
    
    alert("បានបន្ថែមព័ត៌មានក្បាលដីដោយជោគជ័យ!");
  };

  return (
    <div className="w-full space-y-6">
      {/* --- Service Type Selection (New Top Section) --- */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-base font-bold border-b border-gray-200 pb-2 mb-6">
          ប្រភេទសេវាកម្ម (Service Type)
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Self Service Option */}
          <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-lg hover:bg-base-200 transition-colors flex-1">
            <input
              type="radio"
              name="serviceType"
              className="radio radio-primary radio-sm"
              checked={serviceType === 'self'}
              onChange={() => setServiceType('self')}
            />
            <div className="flex-1">
              <span className="font-medium text-gray-700">ស្នើសុំសេវាផ្ទាល់ខ្លួន</span>
              <p className="text-xs text-gray-500 mt-1">រៀបចំសេវាកម្មដោយខ្លួនឯង</p>
            </div>
          </label>

          {/* Guardian Service Option */}
          <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-lg hover:bg-base-200 transition-colors flex-1">
            <input
              type="radio"
              name="serviceType"
              className="radio radio-primary radio-sm"
              checked={serviceType === 'guardian'}
              onChange={() => setServiceType('guardian')}
            />
            <div className="flex-1">
              <span className="font-medium text-gray-700">ស្នើសុំជំនួស</span>
            </div>
          </label>
        </div>

        {/* Additional info when guardian service is selected */}
        {serviceType === 'guardian' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-blue-800 font-medium">ព័ត៌មានបន្ថែម</p>
                <p className="text-xs text-blue-600 mt-1">សូមបំពេញព័ត៌មានអាណាព្យាបាលនៅក្នុងផ្នែកខាងក្រោម</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Applicant Info Section --- */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-base font-bold border-b border-gray-200 pb-2 mb-6">
          ព័ត៌មានអ្នកស្នើសុំ (Applicant Info)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InputField label="លេខកូដ" subLabel="Code" field="applicantCode" formData={formData} onChange={handleChange} disabled />
          <InputField label="លេខអត្តសញ្ញាណប័ណ្ណ" subLabel="ID Card Number" field="idNumber" formData={formData} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <InputField label="នាមត្រកូល(ខ្មែរ)" field="lastNameKh" formData={formData} onChange={handleChange} />
          <InputField label="នាមខ្លួន(ខ្មែរ)" field="firstNameKh" formData={formData} onChange={handleChange} />
          <InputField label="នាមត្រកូល(EN)" field="lastNameEn" formData={formData} onChange={handleChange} />
          <InputField label="នាមខ្លួន(EN)" field="firstNameEn" formData={formData} onChange={handleChange} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <InputField 
            label="លេខទូរស័ព្ទ" 
            subLabel="Phone Number" 
            field="phoneNumber" 
            formData={formData} 
            onChange={handleChange} 
            type="tel"
            placeholder="012345678"
            required 
          />
          <InputField 
            label="លេខទូរស័ព្ទទី២" 
            subLabel="Secondary Phone" 
            field="phoneNumber2" 
            formData={formData} 
            onChange={handleChange} 
            type="tel"
            placeholder="098765432"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <InputField 
            label="ភេទ" 
            subLabel="Gender" 
            field="gender" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={GENDER_OPTIONS}
            required 
          />
          <InputField 
            label="ថ្ងៃខែឆ្នាំកំណើត" 
            subLabel="Date of Birth (DD/MM/YYYY)" 
            field="dateOfBirth" 
            formData={formData} 
            onChange={handleChange} 
            type="date"
            required 
          />
        </div>
      </div>

      {/* --- Guardian Info Section (Conditional) --- */}
      {serviceType === 'guardian' && (
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-gray-700 text-base font-bold border-b border-gray-200 pb-2 mb-6">
            ព័ត៌មានអាណាព្យាបាល (Guardian Info)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <InputField label="នាមត្រកូលអាណាព្យាបាល" subLabel="Guardian Last Name" field="guardianLastName" formData={formData} onChange={handleChange} required />
            <InputField label="នាមខ្លួនអាណាព្យាបាល" subLabel="Guardian First Name" field="guardianFirstName" formData={formData} onChange={handleChange} required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="លេខទូរស័ព្ទអាណាព្យាបាល" 
              subLabel="Guardian Phone" 
              field="guardianPhone" 
              formData={formData} 
              onChange={handleChange} 
              type="tel"
              required 
            />
            <InputField 
              label="ទំនាក់ទំនង" 
              subLabel="Relationship" 
              field="guardianRelation" 
              formData={formData} 
              onChange={handleChange} 
              isSelect 
              options={[
                { value: 'PARENT', label: 'មាតាបិតា' },
                { value: 'RELATIVE', label: 'សាច់ញាតិ' },
                { value: 'LEGAL', label: 'អាណាព្យាបាលស្របច្បាប់' },
                { value: 'OTHER', label: 'ផ្សេងៗ' }
              ]}
              required 
            />
          </div>
        </div>
      )}

      {/* --- Current Address Section --- */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-base font-bold border-b border-gray-200 pb-2 mb-6">
          អាសយដ្ឋានបច្ចុប្បន្ន (Current Address)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InputField 
            label="ផ្ទះលេខ" 
            subLabel="House No." 
            field="houseNo" 
            formData={formData} 
            onChange={handleChange} 
            placeholder="ឧ: 123A"
          />
          <InputField 
            label="ផ្លូវលេខ" 
            subLabel="Street No." 
            field="streetNo" 
            formData={formData} 
            onChange={handleChange} 
            placeholder="ឧ: 456"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField 
            label="ខេត្ត/ក្រុង" 
            subLabel="Province/City" 
            field="province" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={PROVINCE_OPTIONS}
            required 
          />
          <InputField 
            label="ស្រុក/ខណ្ឌ" 
            subLabel="District/Khan" 
            field="district" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={PROVINCE_OPTIONS}
            required 
          />
          <InputField 
            label="ឃុំ/សង្កាត់" 
            subLabel="Commune/Sangkat" 
            field="commune" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={PROVINCE_OPTIONS}
            required 
          />
          <InputField 
            label="ភូមិ" 
            subLabel="Village" 
            field="village" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={PROVINCE_OPTIONS}
            required 
          />
        </div>
      </div>
      
      {/* --- Land Information Section --- */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-[#00bcd4] text-base font-bold mb-6">
          ព័ត៌មានក្បាលដី (Land Information)
        </h3>
        
        {/* Display existing land entries */}
        {landEntries.length > 0 && (
          <div className="mb-6 space-y-3">
            <label className="text-sm font-medium text-gray-700">ក្បាលដីដែលបានបន្ថែម</label>
            {landEntries.map((entry, index) => (
              <div key={entry.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">ក្បាលដីទី {index + 1}: {entry.landNumber}</span>
                  <button 
                    onClick={() => setLandEntries(landEntries.filter((_, i) => i !== index))}
                    className="btn btn-ghost btn-xs text-red-500 hover:text-red-700"
                  >
                    លុប
                  </button>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {entry.propertyType} | {entry.loanAgreements} បន្ទុក
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 mb-6">
          <InputField 
            label="រាជធានី/ខេត្ត" 
            subLabel="Capital" 
            field="landProvince" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={PROVINCE_OPTIONS}
            required 
          />
          <InputField 
            label="ក្រុង/ស្រុក/ខណ្ឌ" 
            subLabel="District" 
            field="landDistrict" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={PROVINCE_OPTIONS}
            required 
          />
          <InputField 
            label="ឃុំ/សង្កាត់" 
            subLabel="Commune" 
            field="landCommune" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={PROVINCE_OPTIONS}
            required 
          />
          <InputField 
            label="ភូមិ" 
            subLabel="Village" 
            field="landVillage" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={PROVINCE_OPTIONS}
            required 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-6 items-end">
          <div className="sm:col-span-3">
            <InputField 
              label="លេខក្បាលដី" 
              subLabel="Land Number" 
              field="landNumber" 
              formData={formData} 
              onChange={handleChange} 
              placeholder="00000000-0000" 
              required 
            />
          </div>
          <div className="sm:col-span-4">
            <InputField 
              label="ប្រភេទដី" 
              subLabel="Property Type" 
              field="propertyType" 
              formData={formData} 
              onChange={handleChange} 
              isSelect 
              options={PROPERTY_TYPE_OPTIONS}
              required 
            />
          </div>
          <div className="sm:col-span-4">
            <InputField 
              label="ចំនួននៃបន្ទុក" 
              subLabel="Number of Loan Agreements" 
              field="loanAgreements" 
              formData={formData} 
              onChange={handleChange} 
              type="number"
              required 
            />
          </div>
          <div className="sm:col-span-1">
            <button 
              onClick={handleAddLandEntry}
              className="btn btn-primary btn-sm w-full bg-[#00bcd4] hover:bg-[#00acc1] border-none text-white"
            >
              + បន្ថែម
            </button>
          </div>
        </div>
      </div>

      {/* --- Hypotek Information Section --- */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-[#00bcd4] text-base font-bold mb-6">
          ព័ត៌មាន ហ៊ីប៉ូតែក/បញ្ចាំ (Hypotek Information)
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
          <InputField 
            label="ឈ្មោះម្ចាស់បំណុល ឬ ធនាគារ" 
            subLabel="Creditor Or Bank" 
            field="creditor" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={CREDITOR_OPTIONS}
            required 
          />
          <InputField 
            label="ប្រភេទទឹកប្រាក់" 
            subLabel="Loan Currency" 
            field="currency" 
            formData={formData} 
            onChange={handleChange} 
            isSelect 
            options={CURRENCY_OPTIONS}
            required 
          />
        </div>
      </div>
    </div>
  );
}