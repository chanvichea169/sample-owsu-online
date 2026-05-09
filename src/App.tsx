import { useState } from 'react';
import type { PageType } from './types';
import NewRequestPage from './pages/NewRequestPage';
import RequestsPage from './pages/RequestsPage';
import Sidebar from './components/common/Sidebar';
import TopNavbar from './components/common/TopNavbar';
import HomePage from './pages/HomePage';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');

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
              // Optional: Show success message or refresh data
              console.log('Request completed successfully');
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
      <Sidebar 
        activePage={activePage}
        onNavigate={setActivePage}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar 
          pageTitle={getPageTitle()}
          onNewRequest={() => setActivePage('new-request')}
        />
        
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}