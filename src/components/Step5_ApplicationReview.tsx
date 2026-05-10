import { useState } from 'react';
import type { ApplicantInfo, DocumentInfo, Service } from '../types/service.types';

interface ReviewProps {
  applicantInfo: ApplicantInfo;
  documentInfo: DocumentInfo;
  selectedService: Service | null;
  quantity: number;
}

// Custom Radio Component (Read-only version with photo styling)
function RadioOption({ label, checked }: { label: string, checked: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-default">
      <input 
        type="radio" 
        checked={checked} 
        readOnly
        className="w-4 h-4 text-[#00bcd4] border-gray-300 focus:ring-[#00bcd4]/20" 
      />
      {label}
    </label>
  );
}

// Generic Data Display Field
function DataField({ label, value, required = false }: { label: string, value: string, required?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="text-[13px] font-bold text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="w-full h-10 px-3 border border-gray-300 rounded bg-[#fcfcfc] text-sm flex items-center text-gray-800">
        {value || "-"}
      </div>
    </div>
  );
}

// Input Field Component for forms (editable)
function InputField({ 
  label, 
  subLabel, 
  field, 
  formData, 
  onChange, 
  isSelect = false, 
  required = false,
  placeholder = ""
}: { 
  label: string; 
  subLabel?: string; 
  field: string; 
  formData: any; 
  onChange: (field: string, value: string) => void; 
  isSelect?: boolean; 
  required?: boolean;
  placeholder?: string;
}) {
  // Mock options for select fields - you should replace these with actual data from your API
  const getOptions = (fieldName: string) => {
    const options: Record<string, string[]> = {
      province: ["បាត់ដំបង", "កំពង់ចាម", "ភ្នំពេញ", "សៀមរាប", "ព្រះសីហនុ"],
      district: ["ចំការមន", "ដូនពេញ", "មានជ័យ", "ទួលគោក"],
      commune: ["សង្កាត់១", "សង្កាត់២", "សង្កាត់៣", "សង្កាត់៤"],
      village: ["ភូមិកណ្តាល", "ភូមិជើង", "ភូមិត្បូង", "ភូមិលិច"],
      propertyType: ["ដីធ្លី", "ដីស្រែចំការ", "ដីលំនៅដ្ឋាន", "ដីពាណិជ្ជកម្ម"],
      creditor: ["ធនាគារ ACLEDA", "ធនាគារ ABA", "ធនាគារ Canadia", "ធនាគារ អេអាយអេ"],
      currency: ["រៀល", "ដុល្លារ", "បាត", "យួន"]
    };
    return options[fieldName] || [];
  };

  return (
    <div className="space-y-1">
      <label className="text-[13px] font-bold text-gray-700">
        {label}
        {subLabel && <span className="text-[10px] font-normal text-gray-500 ml-1">({subLabel})</span>}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {isSelect ? (
        <select
          value={formData[field] || ""}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full h-10 px-3 border border-gray-300 rounded bg-[#fcfcfc] text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]/20 focus:border-[#00bcd4]"
        >
          <option value="">-- ជ្រើសរើស {label} --</option>
          {getOptions(field).map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={formData[field] || ""}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 px-3 border border-gray-300 rounded bg-[#fcfcfc] text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]/20 focus:border-[#00bcd4]"
        />
      )}
    </div>
  );
}

// Help text with photo style
function HelpText({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 pt-2">
      <span className="text-red-500 text-sm">👉</span>
      <p className="text-red-600 text-[13px] font-medium">{text}</p>
    </div>
  );
}

// Section header
function SectionHeader({ title, khmerTitle }: { title: string; khmerTitle?: string }) {
  return (
    <div className="flex items-baseline gap-2 border-b border-gray-200 pb-2 mb-5">
      <h3 className="text-[#00bcd4] text-base font-bold">{khmerTitle || title}</h3>
      {khmerTitle && title !== khmerTitle && (
        <span className="text-xs text-gray-400 font-normal">({title})</span>
      )}
    </div>
  );
}

// Define interface for land/hypotek data
interface LandHypotekData {
  // Land information
  province: string;
  district: string;
  commune: string;
  village: string;
  landNumber: string;
  propertyType: string;
  loanAgreements: string;
  // Hypotek information
  creditor: string;
  currency: string;
}

export default function Step5_ApplicationReview({ applicantInfo, selectedService, quantity, documentInfo }: ReviewProps) {
  const [useSelfInfo] = useState(true);
  const total = selectedService ? selectedService.price * quantity : 0;
  
  // State for land and hypotek information
  const [landHypotekData, setLandHypotekData] = useState<LandHypotekData>({
    province: "",
    district: "",
    commune: "",
    village: "",
    landNumber: "",
    propertyType: "",
    loanAgreements: "",
    creditor: "",
    currency: ""
  });

  // Handle form field changes
  const handleChange = (field: string, value: string) => {
    setLandHypotekData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle add land entry
  const handleAddLandEntry = () => {
    // Here you can implement logic to save the land entry
    // For example, add to an array of land entries
    console.log("Adding land entry:", {
      landNumber: landHypotekData.landNumber,
      propertyType: landHypotekData.propertyType,
      loanAgreements: landHypotekData.loanAgreements,
      province: landHypotekData.province,
      district: landHypotekData.district,
      commune: landHypotekData.commune,
      village: landHypotekData.village
    });
    
    // Show success message or handle as needed
    alert("បានបន្ថែមព័ត៌មានក្បាលដីដោយជោគជ័យ!");
    
    // Optional: Clear the form after adding
    // setLandHypotekData(prev => ({
    //   ...prev,
    //   landNumber: "",
    //   propertyType: "",
    //   loanAgreements: ""
    // }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Main container */}
      <div className="bg-white p-6 border border-gray-200 rounded-md shadow-sm space-y-8">
        
        {/* --- Service Information Section --- */}
        <div>
          <SectionHeader title="ព័ត៌មានសេវារដ្ឋបាល" khmerTitle="ព័ត៌មានសេវារដ្ឋបាល" />
          
          <div className="space-y-1 mb-5">
            <label className="text-[13px] font-bold text-gray-700">សេវារដ្ឋបាល</label>
            <div className="w-full p-3 border border-gray-300 rounded bg-[#fcfcfc] text-sm text-gray-800">
              {selectedService?.name || "មិនមានសេវាត្រូវបានជ្រើសរើស"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <DataField label="តម្លៃសេវា (ជារៀល)" value={selectedService ? selectedService.price.toLocaleString() : "0"} />
            <DataField label="ចំនួន" value={quantity.toString()} />
            <DataField label="សរុប (ជារៀល)" value={total.toLocaleString()} />
            <DataField label="រយៈពេលផ្តល់សេវា (ថ្ងៃធ្វើការ)" value={selectedService?.duration?.toString() || "0"} />
            <DataField label="សុពលភាព" value={selectedService?.validity || "-"} />
          </div>
        </div>

        {/* --- Applicant Details Section --- */}
        <div>
          <SectionHeader title="ព័ត៌មានអ្នកស្នើសុំ" khmerTitle="ព័ត៌មានអ្នកស្នើសុំ" />
          
          <div className="flex gap-6 mb-5">
            <RadioOption label="ប្រើព័ត៌មានផ្ទាល់ខ្លួន" checked={useSelfInfo} />
            <RadioOption label="ប្រើព័ត៌មានអ្នកផ្សេង" checked={!useSelfInfo} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DataField label="លេខកូដ" value={applicantInfo.applicantCode || ""} />
            <DataField label="លេខអត្តសញ្ញាណប័ណ្ណ" value={applicantInfo.idNumber || ""} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <DataField label="នាមត្រកូល (អក្សរខ្មែរ)" value={applicantInfo.lastNameKh || ""} />
            <DataField label="នាមខ្លួន (អក្សរខ្មែរ)" value={applicantInfo.firstNameKh || ""} />
            <DataField label="នាមត្រកូល (អក្សរឡាតាំង)" value={applicantInfo.lastNameEn || ""} />
            <DataField label="នាមខ្លួន (អក្សរឡាតាំង)" value={applicantInfo.firstNameEn || ""} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-[13px] font-bold text-gray-700">ភេទ</label>
              <div className="w-full h-10 px-3 border border-gray-300 rounded bg-[#fcfcfc] text-sm flex items-center text-gray-800">
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
        </div>

        {/* --- Address Section --- */}
        <div>
          <SectionHeader title="អាសយដ្ឋានបច្ចុប្បន្ន" khmerTitle="អាសយដ្ឋានបច្ចុប្បន្ន" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DataField label="ផ្ទះលេខ" value={applicantInfo.houseNo || ""} />
            <DataField label="ផ្លូវលេខ" value={applicantInfo.streetNo || ""} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DataField label="ខេត្ត/ក្រុង" value={applicantInfo.province || ""} />
            <DataField label="ស្រុក/ខណ្ឌ" value={applicantInfo.district || ""} />
            <DataField label="ឃុំ/សង្កាត់" value={applicantInfo.commune || ""} />
            <DataField label="ភូមិ" value={applicantInfo.village || ""} />
          </div>
        </div>

        {/* --- Section 1: Land Information --- */}
        <div className="bg-white p-6 border border-gray-200 rounded-md shadow-sm">
          <h3 className="text-[#00bcd4] text-base font-bold mb-6">
            ព័ត៌មានក្បាលដី (Land Information)
          </h3>
          
          {/* Row 1: 4 Columns - Province/District/Commune/Village */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 mb-6">
            <InputField 
              label="រាជធានី/ខេត្ត" 
              subLabel="Capital" 
              field="province" 
              formData={landHypotekData} 
              onChange={handleChange} 
              isSelect 
              required 
            />
            <InputField 
              label="ក្រុង/ស្រុក/ខណ្ឌ" 
              subLabel="District" 
              field="district" 
              formData={landHypotekData} 
              onChange={handleChange} 
              isSelect 
              required 
            />
            <InputField 
              label="ឃុំ/សង្កាត់" 
              subLabel="Commune" 
              field="commune" 
              formData={landHypotekData} 
              onChange={handleChange} 
              isSelect 
              required 
            />
            <InputField 
              label="ភូមិ" 
              subLabel="Village" 
              field="village" 
              formData={landHypotekData} 
              onChange={handleChange} 
              isSelect 
              required 
            />
          </div>

          {/* Row 2: Land details with Plus Button */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-6 items-end">
            <div className="sm:col-span-3">
              <InputField 
                label="លេខក្បាលដី" 
                subLabel="Land Number" 
                field="landNumber" 
                formData={landHypotekData} 
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
                formData={landHypotekData} 
                onChange={handleChange} 
                isSelect 
                required 
              />
            </div>
            <div className="sm:col-span-4">
              <InputField 
                label="ចំនួននៃបន្ទុក" 
                subLabel="Number of Loan Agreements" 
                field="loanAgreements" 
                formData={landHypotekData} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="sm:col-span-1">
              <button 
                onClick={handleAddLandEntry}
                className="w-full h-10 flex items-center justify-center bg-[#00bcd4] text-white rounded-md hover:bg-[#00acc1] transition-colors shadow-sm font-medium text-sm"
              >
                + បន្ថែម
              </button>
            </div>
          </div>
        </div>

        {/* --- Section 2: Hypotek Information --- */}
        <div className="bg-white p-6 border border-gray-200 rounded-md shadow-sm">
          <h3 className="text-[#00bcd4] text-base font-bold mb-6">
            ព័ត៌មាន ហ៊ីប៉ូតែក/បញ្ចាំ (Hypotek Information)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
            <InputField 
              label="ឈ្មោះម្ចាស់បំណុល ឬ ធនាគារ" 
              subLabel="Creditor Or Bank" 
              field="creditor" 
              formData={landHypotekData} 
              onChange={handleChange} 
              isSelect 
              required 
            />
            <InputField 
              label="ប្រភេទទឹកប្រាក់" 
              subLabel="Loan Currency" 
              field="currency" 
              formData={landHypotekData} 
              onChange={handleChange} 
              isSelect 
              required 
            />
          </div>
        </div>

        {/* --- Single Window Location Section --- */}
        <div>
          <SectionHeader title="ទីតាំងអង្គភាពច្រកចេញចូលតែមួយ" khmerTitle="ទីតាំងអង្គភាពច្រកចេញចូលតែមួយ" />
          
          <DataField label="ទីតាំង" value={(documentInfo as any).location || "មិនទាន់ជ្រើសរើស"} />
          <HelpText text="សូមបញ្ជាក់៖ ទីតាំងដែលលោកអ្នកបានជ្រើសរើស ជាកន្លែងទទួលលទ្ធផលសម្រេច។" />
        </div>

        {/* --- Required Documents Section --- */}
        <div>
          <h4 className="text-[#00bcd4] text-sm font-bold mb-3 border-l-3 border-[#00bcd4] pl-2">ឯកសារត្រូវភ្ជាប់មកជាមួយ ៖</h4>
          <ul className="list-decimal ml-6 text-sm space-y-1 text-gray-700">
            {selectedService?.requirements?.map((req, idx) => (
              <li key={idx}>{req}</li>
            )) || (
              <>
                <li>ឯកសារថតចម្លង លិខិតអនុញ្ញាត ឬសញ្ញាបត្រ ឬសញ្ញាបត្រច្បាប់ដើម (១ ច្បាប់)</li>
              </>
            )}
          </ul>
          
          <div className="mt-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
            <p className="text-red-700 text-xs font-bold mb-1">👉 សម្គាល់ :</p>
            <p className="text-red-600 text-xs ml-2">នៅពេលលោក-លោកស្រីមកទទួលលទ្ធផលសម្រេច សូមភ្ជាប់មកជាមួយនូវ :</p>
            <p className="text-red-600 text-xs ml-5 mt-1">- ពាក្យស្នើសុំសេវាដែលមានចុះហត្ថលេខារបស់អ្នកស្នើសុំសេវា</p>
            <p className="text-red-600 text-xs ml-5">- ឯកសារពាក់ព័ន្ធផ្សេងៗ (ច្បាប់ដើម) ។</p>
          </div>
        </div>

        {/* --- Checkbox Section --- */}
        <div className="pt-4 border-t border-gray-200">
          <label className="flex items-start gap-3 text-xs font-medium text-gray-800 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-5 h-5 mt-0.5 text-[#00bcd4] border-gray-300 focus:ring-[#00bcd4]/20 rounded"
              defaultChecked
            />
            <span className="leading-relaxed">
              ខ្ញុំសូមធានាថាព័ត៌មានដែលបានផ្តល់ខាងលើនេះ គឺត្រឹមត្រូវតាមច្បាប់ជាធរមាន។ 
              <span className="text-red-600 block text-[11px] mt-1">(សូមបញ្ជាក់ថា ព័ត៌មានមិនពិតនឹងត្រូវផ្តន្ទាទោសតាមច្បាប់ជាធរមាន)</span>
            </span>
          </label>
        </div>

      </div>
    </div>
  );
}