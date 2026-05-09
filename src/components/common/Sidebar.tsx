import { Icon } from './Icon';
import logoImage from '../../assets/Logo.png';

interface SidebarProps {
  activePage: 'home' | 'requests' | 'new-request';
  onNavigate: (page: 'home' | 'requests' | 'new-request') => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[68px] bg-white border-r border-[#e4e7ec] flex flex-col items-center transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-[78px] w-full flex items-center justify-center border-b border-[#eef0f3]">
          <img
            src={logoImage}
            alt="Logo"
            className="h-12 w-12 rounded-full object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-6 mt-7 w-full">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`w-full h-14 flex items-center justify-center transition-all ${
              activePage === 'home' 
                ? 'text-[#2ea7ff] bg-[#f7fbff] border-l-4 border-[#2ea7ff]' 
                : 'text-[#7b8794] hover:text-[#2491ff]'
            }`}
          >
            <Icon name="home" className="h-7 w-7" />
          </button>

          <button 
            onClick={() => onNavigate('requests')}
            className={`w-full h-14 flex items-center justify-center transition-all ${
              activePage === 'requests'
                ? 'text-[#2ea7ff] bg-[#f7fbff] border-l-4 border-[#2ea7ff]'
                : 'text-[#7b8794] hover:text-[#2491ff]'
            }`}
          >
            <Icon name="refresh" className="h-6 w-6" />
          </button>
        </div>
      </aside>
    </>
  );
}