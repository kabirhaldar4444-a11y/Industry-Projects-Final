import React, { useMemo } from 'react';
import type { ProjectData } from '../types';
import { X, MapPin, Calendar, DollarSign, Activity, Tag, Info, Navigation, Building2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const { overview, coverageList } = useMemo(() => {
    if (!project.Summary) return { overview: 'No summary available.', coverageList: [] };

    const match = project.Summary.match(/^(.*?)(?:\n+|\s+)?(?:States\s+(?:&|and)\s+Key\s+Cities\s+Covered:?)\s*(.*)$/is);
    if (!match) {
      return { overview: project.Summary.trim(), coverageList: [] };
    }

    const overviewText = match[1].trim() || project.Summary.trim();
    const rawCoverage = match[2].trim();

    const lines = rawCoverage.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const coverageListParsed: { state: string; citiesStr: string; cities: string[] }[] = [];

    lines.forEach(line => {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const state = line.substring(0, colonIdx).trim();
        const citiesStr = line.substring(colonIdx + 1).trim();
        const cities = citiesStr.split(',').map(c => c.trim()).filter(Boolean);
        coverageListParsed.push({ state, citiesStr, cities });
      } else {
        coverageListParsed.push({ state: '', citiesStr: line, cities: [line] });
      }
    });

    return { overview: overviewText, coverageList: coverageListParsed };
  }, [project.Summary]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <div className="card-badge mb-2 inline-block">
            {project.Category || 'Other'}
          </div>
          <h2 className="modal-title">{project.Project}</h2>
          <div className="modal-country">
            <MapPin size={16} />
            <span>{project.Country}</span>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <h4 className="section-title">
              <Building2 size={18} className="section-icon" />
              <span>Project Overview</span>
            </h4>
            <p className="modal-description">{overview}</p>
          </div>

          {coverageList.length > 0 && (
            <div className="modal-section coverage-section">
              <h4 className="section-title">
                <Navigation size={18} className="section-icon" />
                <span>States & Key Cities Covered</span>
              </h4>
              <div className="coverage-container">
                {coverageList.map((item, idx) => (
                  <div key={idx} className="coverage-card">
                    {item.state && (
                      <div className="coverage-state-badge">
                        <MapPin size={13} />
                        <span>{item.state}</span>
                      </div>
                    )}
                    <div className="coverage-cities-list">
                      {item.cities.map((city, cIdx) => (
                        <span key={cIdx} className="city-chip">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.CapacityDetails && (
            <div className="modal-section" style={{ marginTop: '1.5rem' }}>
              <h4 className="section-title">
                <Info size={18} className="section-icon" />
                <span>Capacity & Key Details</span>
              </h4>
              <div className="capacity-card">
                <span>{project.CapacityDetails}</span>
              </div>
            </div>
          )}
          
          <div className="modal-grid" style={{ marginTop: '1.5rem' }}>
            <div className="detail-item glass-item">
              <span className="detail-label">Budget</span>
              <span className="detail-value highlight">
                <DollarSign size={18} />
                {project.Budget || 'N/A'}
              </span>
            </div>
            
            <div className="detail-item glass-item">
              <span className="detail-label">Deadline</span>
              <span className="detail-value">
                <Calendar size={18} />
                {project.Deadline || 'N/A'}
              </span>
            </div>
            
            <div className="detail-item glass-item">
              <span className="detail-label">Area / Length / Scale</span>
              <span className="detail-value">
                <Activity size={18} />
                {project.Area || 'N/A'}
              </span>
            </div>
            
            <div className="detail-item glass-item">
              <span className="detail-label">Location</span>
              <span className="detail-value">
                <MapPin size={18} />
                <span>{project.Location || 'N/A'}</span>
              </span>
            </div>
            
            <div className="detail-item glass-item">
              <span className="detail-label">Category</span>
              <span className="detail-value">
                <Tag size={18} />
                <span>{project.Category || 'N/A'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
