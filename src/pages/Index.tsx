import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import ChannelSettings from '@/components/ChannelSettings';
import VideoUpload from '@/components/VideoUpload';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const handleUploadClick = () => {
    setActiveSection('upload');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="ml-64 transition-all duration-300">
        <Header onUploadClick={handleUploadClick} />
        
        <main className="pt-20 px-6 pb-8">
          {activeSection === 'upload' ? (
            <VideoUpload />
          ) : activeSection === 'settings' ? (
            <ChannelSettings />
          ) : (
            <VideoGrid section={activeSection} />
          )}
        </main>
      </div>
    </div>
  );
}