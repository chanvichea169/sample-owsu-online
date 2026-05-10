import { Icon } from './Icon';
import profileImage from '../../assets/profile.png';

interface TopNavbarProps {
  pageTitle?: string;
  onNewRequest?: () => void;
  onMenuClick?: () => void;
}

export default function TopNavbar({ pageTitle, onNewRequest, onMenuClick }: TopNavbarProps) {
  return (
    <header className="h-[78px] bg-white border-b border-[#e4e7ec] flex items-center justify-between px-4 sm:px-6 lg:px-7">
      {/* Left Section - Menu Button & Page Title */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 flex-shrink-0">
        <button 
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center text-[#4b5563] transition-colors hover:text-[#2491ff] flex-shrink-0"
          aria-label="Menu"
        >
          <Icon name="menu" className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
        
        {pageTitle && (
          <div className="text-base sm:text-lg font-semibold text-[#1f2937] hidden sm:block">
            {pageTitle}
          </div>
        )}
      </div>

      {/* Search Bar - Responsive visibility and sizing */}
      <div className="hidden md:block flex-1 max-w-md lg:max-w-xl px-2 sm:px-4">
        <div className="relative group">
          <Icon 
            name="search" 
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-[#0070c0] transition-colors" 
          />
          <input 
            type="text"
            placeholder="ស្វែងរកសេវា..."
            className="w-full h-9 sm:h-11 pl-9 sm:pl-12 pr-3 sm:pr-4 bg-gray-100 border-none rounded-lg sm:rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#0070c0]/20 focus:outline-none transition-all placeholder:text-xs sm:placeholder:text-sm"
          />
        </div>
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-shrink-0">
        {/* Notification Button */}
        <button 
          title="Notifications" 
          className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center text-[#7b8794] transition-colors hover:text-[#2491ff] flex-shrink-0"
          aria-label="Notifications"
        >
          <Icon name="bell" className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* New Request Button */}
        <button 
          onClick={onNewRequest}
          title="New Request"
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center text-[#2491ff] transition-colors hover:text-[#1d84ea] flex-shrink-0"
          aria-label="New Request"
        >
          <Icon name="plusCircle" className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-2 sm:gap-2 lg:gap-3 border-l pl-2 sm:pl-3 lg:pl-6 border-[#e4e7ec]">
          <img
            src={profileImage}
            alt="Profile"
            className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full object-cover bg-[#e6eef7] flex-shrink-0"
          />
          <div className="text-[#4b5563] text-xs lg:text-sm font-medium whitespace-nowrap hidden sm:block">
            ចាន់ វិជ្ជា
          </div>
        </div>
      </div>
    </header>
  );
}