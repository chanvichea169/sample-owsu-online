import { Icon } from './Icon';
import logoImage from '../../assets/Logo.png';

interface SidebarProps {
  activePage: 'home' | 'requests' | 'new-request';
  onNavigate: (page: 'home' | 'requests' | 'new-request') => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[68px] bg-white border-r border-[#e4e7ec] flex flex-col items-center">
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
  );
}