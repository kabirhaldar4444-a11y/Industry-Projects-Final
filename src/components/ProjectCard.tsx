import React from 'react';
import type { ProjectData } from '../types';
import { MapPin, Calendar, DollarSign, Activity, Info } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectData;
  onReadMore: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onReadMore }) => {
  return (
    <div className="project-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{project.Project}</h3>
          <div className="card-country">
            <MapPin size={14} />
            <span>{project.Country}</span>
          </div>
        </div>
        <span className="card-badge">{project.Category || 'Other'}</span>
      </div>
      
      <p className="card-summary" title={project.Summary}>
        {project.Summary || 'No summary available.'}
      </p>
      
      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Budget</span>
          <span className="detail-value highlight">
            <DollarSign size={14} />
            {project.Budget || 'N/A'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Deadline</span>
          <span className="detail-value">
            <Calendar size={14} />
            {project.Deadline || 'N/A'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Area / Length / Scale</span>
          <span className="detail-value">
            <Activity size={14} />
            {project.Area || 'N/A'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Location</span>
          <span className="detail-value">
            <MapPin size={14} />
            <span className="truncate">{project.Location || 'N/A'}</span>
          </span>
        </div>

        {project.CapacityDetails && (
          <div className="detail-item" style={{ gridColumn: 'span 2', marginTop: '0.25rem' }}>
            <span className="detail-label">Capacity & Key Details</span>
            <span className="detail-value" style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-secondary)' }}>
              <Info size={14} style={{ minWidth: '14px', marginTop: '2px' }} />
              <span>{project.CapacityDetails}</span>
            </span>
          </div>
        )}
      </div>
      
      <button 
        className="btn-read-more" 
        onClick={() => onReadMore(project)}
      >
        Read Full Project
      </button>
    </div>
  );
};
