import { useState } from 'react';
import type { PageType } from './types';
import NewRequestPage from './pages/NewRequestPage';
import RequestsPage from './pages/RequestsPage';
import Sidebar from './components/common/Sidebar';
import TopNavbar from './components/common/TopNavbar';
import HomePage from './pages/HomePage';
import GlobalAlert from './components/common/GlobalAlert';
import { useAlert } from './context/AlertContext';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { showAlert } = useAlert();

  const getPageTitle = () => {
    switch (activePage) {
      case 'new-request':
        return 'បង្កើតពាក្យស្នើសុំថ្មី';
      case 'requests':
        return 'បញ្ជីពាក្យស្នើសុំ';
      default:
        return '';
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'new-request':
        return (
          <NewRequestPage 
            onBack={() => setActivePage('home')}
            onComplete={() => {
              setActivePage('home');
              showAlert('ពាក្យស្នើសុំត្រូវបានបញ្ជូនដោយជោគជ័យ!', 'success');
            }}
          />
        );
      case 'requests':
        return (
          <RequestsPage 
            onBack={() => setActivePage('home')}
          />
        );
      default:
        return (
          <HomePage 
            onNavigate={setActivePage}
            onNewRequest={() => setActivePage('new-request')}
          />
        );
    }
  };

  return (
    <div className="h-screen w-full bg-[#eef1f7] flex overflow-hidden">
      <GlobalAlert />
      <Sidebar 
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar 
          pageTitle={getPageTitle()}
          onNewRequest={() => setActivePage('new-request')}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}