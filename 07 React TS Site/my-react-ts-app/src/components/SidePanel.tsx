import React from 'react';
import './SidePanel.css';

interface SidePanelProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ activeMenu, onMenuClick }) => {
  const menuItems = ['Home', 'Database', '3D Viewer'];

  return (
    <div className="side-panel">
      <div className="side-panel-title">
        DT-8131
      </div>
      <nav className="side-panel-nav">
        {menuItems.map((item) => (
          <button
            key={item}
            className={`nav-item ${activeMenu === item ? 'active' : ''}`}
            onClick={() => onMenuClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SidePanel;
