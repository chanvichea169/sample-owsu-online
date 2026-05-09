import { Icon } from './Icon';
import profileImage from '../../assets/profile.png';


interface TopNavbarProps {
  pageTitle?: string;
  onNewRequest?: () => void;
}

export default function TopNavbar({ pageTitle, onNewRequest }: TopNavbarProps) {
  return (
    <header className="h-[78px] bg-white border-b border-[#e4e7ec] flex items-center justify-between px-7">
      <div className="flex items-center gap-5">
        <button className="flex h-10 w-10 items-center justify-center text-[#4b5563] transition-colors hover:text-[#2491ff]">
          <Icon name="menu" className="h-7 w-7" />
        </button>
        
        {pageTitle && (
          <div className="text-lg font-semibold text-[#1f2937] hidden lg:block">
            {pageTitle}
          </div>
        )}
      </div>

      {/* Integrated Search Bar */}
      <div className="flex-1 max-w-xl px-10">
        <div className="relative group">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#0070c0] transition-colors" />
          <input 
            type="text"
            placeholder="ស្វែងរកសេវា ឬព័ត៌មានផ្សេងៗ..."
            className="w-full h-11 pl-12 pr-4 bg-gray-100 border-none rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#0070c0]/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button title="Notifications" className="relative flex h-10 w-10 items-center justify-center text-[#7b8794] transition-colors hover:text-[#2491ff]">
          <Icon name="bell" className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        <button 
          onClick={onNewRequest}
          title="New Request"
          className="flex h-10 w-10 items-center justify-center text-[#2491ff] transition-colors hover:text-[#1d84ea]"
        >
          <Icon name="plusCircle" className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover bg-[#e6eef7]"
          />
          <div className="text-[#4b5563] text-sm font-medium whitespace-nowrap">
            ចាន់ វិជ្ជា
          </div>
        </div>
      </div>
    </header>
  );
}