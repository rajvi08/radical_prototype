import React, { useState } from 'react';
import SidePanel from './components/SidePanel';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('Home');

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'Home':
        return <div className="content-placeholder">Home Content</div>;
      case 'Database':
        return <div className="content-placeholder">Database Content</div>;
      case '3D Viewer':
        return <div className="content-placeholder">3D Viewer Content</div>;
      default:
        return <div className="content-placeholder">Home Content</div>;
    }
  };

  return (
    <div className="App">
      <SidePanel activeMenu={activeMenu} onMenuClick={handleMenuClick} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
