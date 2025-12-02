import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="ml-64 transition-all duration-300">
        <Header />
        
        <main className="pt-20 px-6 pb-8">
          <VideoGrid section={activeSection} />
        </main>
      </div>
    </div>
  );
}
