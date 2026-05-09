export interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: number;
  validity: string;
  description: string;
  requirements: string[];
}

export interface ApplicantInfo {
  applicantCode?: string;
  idNumber: string;
  lastNameKh: string;
  firstNameKh: string;
  lastNameEn: string;
  firstNameEn: string;
  gender: string;
  nationality: string;
  dateOfBirth: string;
  phoneNumber: string;
  phoneNumber2?: string;
  houseNo?: string;
  streetNo?: string;
  province: string;
  district: string;
  commune: string;
  village: string;
  // For backward compatibility
  fullName?: string;
  email?: string;
  address?: string;
}

export interface DocumentInfo {
  location: string;
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  attachments: File[];
}

export interface PaymentInfo {
  paymentMethod: 'cash' | 'bank' | 'aba';
  totalAmount: number;
  paidAmount: number;
  changeAmount: number;
  transactionId?: string;
}