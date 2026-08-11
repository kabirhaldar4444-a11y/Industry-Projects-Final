import { Outlet, NavLink } from 'react-router-dom';
import { Building2, FolderKanban, FileQuestion, FileText } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="app-container">
      <nav className="navbar glass-panel">
        <div className="navbar-content">
          <div className="nav-brand">
            <div className="brand-logo">
              <Building2 size={24} className="logo-icon" />
            </div>
            <span className="brand-text">IndustryConnect</span>
          </div>
          <div className="nav-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              <FolderKanban size={18} />
              <span>Projects</span>
            </NavLink>
            <NavLink 
              to="/interviews" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <FileQuestion size={18} />
              <span>Interview Questions</span>
            </NavLink>
            <NavLink 
              to="/job-descriptions" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <FileText size={18} />
              <span>Job Descriptions</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
