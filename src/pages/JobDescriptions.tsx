import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { jobDescriptionCategories, type JobDescriptionItem } from '../data/jobDescriptions';
import { 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  CheckCircle2, 
  GraduationCap, 
  Clock, 
  Wrench, 
  Copy, 
  Check, 
  FileQuestion,
  Search,
  Sparkles
} from 'lucide-react';

export default function JobDescriptions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleParam = searchParams.get('role');

  const [expandedCategory, setExpandedCategory] = useState<string>(() => {
    if (roleParam) {
      for (const cat of jobDescriptionCategories) {
        if (cat.jobs.some(j => j.jobPost.toLowerCase() === roleParam.toLowerCase())) {
          return cat.id;
        }
      }
    }
    return jobDescriptionCategories[0].id;
  });

  const [activeJobPost, setActiveJobPost] = useState<string>(() => {
    if (roleParam) {
      for (const cat of jobDescriptionCategories) {
        const found = cat.jobs.find(j => j.jobPost.toLowerCase() === roleParam.toLowerCase());
        if (found) return found.jobPost;
      }
    }
    return jobDescriptionCategories[0].jobs[0].jobPost;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync role param if changed externally
  useEffect(() => {
    if (roleParam) {
      for (const cat of jobDescriptionCategories) {
        const found = cat.jobs.find(j => j.jobPost.toLowerCase() === roleParam.toLowerCase());
        if (found) {
          setActiveJobPost(found.jobPost);
          setExpandedCategory(cat.id);
          break;
        }
      }
    }
  }, [roleParam]);

  const handleSelectJob = (job: JobDescriptionItem, catId: string) => {
    setActiveJobPost(job.jobPost);
    setExpandedCategory(catId);
    setSearchParams({ role: job.jobPost }, { replace: true });
  };

  // Find active job
  const activeJobData: JobDescriptionItem = useMemo(() => {
    for (const cat of jobDescriptionCategories) {
      const found = cat.jobs.find(j => j.jobPost.toLowerCase() === activeJobPost.toLowerCase());
      if (found) return found;
    }
    return jobDescriptionCategories[0].jobs[0];
  }, [activeJobPost]);

  const activeCategory = useMemo(() => {
    for (const cat of jobDescriptionCategories) {
      if (cat.jobs.some(j => j.jobPost.toLowerCase() === activeJobPost.toLowerCase())) {
        return cat;
      }
    }
    return jobDescriptionCategories[0];
  }, [activeJobPost]);

  // Filter categories and jobs based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return jobDescriptionCategories;
    const q = searchQuery.toLowerCase().trim();

    return jobDescriptionCategories.map(cat => ({
      ...cat,
      jobs: cat.jobs.filter(j => 
        j.jobPost.toLowerCase().includes(q) || 
        j.discipline.toLowerCase().includes(q) ||
        j.keyTechnicalSkills.some(skill => skill.toLowerCase().includes(q)) ||
        j.coreResponsibilities.some(resp => resp.toLowerCase().includes(q))
      )
    })).filter(cat => cat.jobs.length > 0 || cat.categoryName.toLowerCase().includes(q));
  }, [searchQuery]);

  const totalFilteredJobsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.jobs.length, 0);
  }, [filteredCategories]);

  const toggleCategory = (catId: string) => {
    setExpandedCategory(prev => (prev === catId ? '' : catId));
  };

  const handleCopyJD = () => {
    if (!activeJobData) return;
    const text = `Job Title: ${activeJobData.jobPost}
Discipline: ${activeJobData.discipline}
Experience: ${activeJobData.typicalExperience}
Minimum Qualification: ${activeJobData.minimumQualification}

Job Description:
${activeJobData.jobDescription}

Core Responsibilities:
${activeJobData.coreResponsibilities.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Key Technical Skills & Tools:
${activeJobData.keyTechnicalSkills.map(s => `• ${s}`).join('\n')}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleViewInterviews = () => {
    navigate(`/interviews?role=${encodeURIComponent(activeJobData.jobPost)}`);
  };

  return (
    <>
      <header className="header" style={{ marginBottom: '2rem' }}>
        <h1>
          Role <span className="gradient-text">Job Descriptions</span>
        </h1>
        <p>
          Explore comprehensive job descriptions, core responsibilities, key technical skills, 
          and qualifications across 375+ engineering and tech job roles.
        </p>
      </header>

      <main className="interview-container">
        {/* Left Sidebar */}
        <div 
          className="job-sidebar glass-panel" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: 'calc(100vh - 150px)', 
            position: 'sticky', 
            top: '1rem', 
            padding: '1.25rem' 
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 className="sidebar-title" style={{ margin: 0, fontSize: '1.15rem' }}>
                <Briefcase size={20} className="section-icon" />
                Job Roles
              </h3>
              <span className="card-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                {totalFilteredJobsCount} roles
              </span>
            </div>
            
            <div style={{ position: 'relative' }}>
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-secondary)' 
                }} 
              />
              <input 
                type="text" 
                placeholder="Search roles or skills..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem 0.6rem 2.25rem',
                  borderRadius: '10px',
                  border: '1.5px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.35rem' }}>
            {filteredCategories.map(category => {
              const isExpanded = expandedCategory === category.id || searchQuery.trim().length > 0;
              const hasActiveJob = category.jobs.some(j => j.jobPost.toLowerCase() === activeJobPost.toLowerCase());

              return (
                <div key={category.id} className="category-group" style={{ marginBottom: '0.5rem' }}>
                  <button
                    className="category-btn"
                    onClick={() => toggleCategory(category.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 0.85rem',
                      background: hasActiveJob || isExpanded ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                      border: '1px solid',
                      borderColor: hasActiveJob ? 'var(--accent-primary)' : 'var(--border-color)',
                      borderRadius: '10px',
                      color: hasActiveJob || isExpanded ? 'var(--accent-primary)' : 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {category.categoryName}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 500 }}>
                        {category.jobs.length}
                      </span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <ul className="job-list" style={{ marginTop: '0.4rem', marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {category.jobs.map(job => {
                        const isActive = activeJobPost.toLowerCase() === job.jobPost.toLowerCase();
                        return (
                          <li key={job.id}>
                            <button
                              className={`job-btn ${isActive ? 'active' : ''}`}
                              onClick={() => handleSelectJob(job, category.id)}
                              style={{ 
                                padding: '0.5rem 0.75rem', 
                                fontSize: '0.875rem',
                                borderRadius: '8px'
                              }}
                            >
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {job.jobPost}
                              </span>
                              {isActive && <ChevronRight size={15} style={{ flexShrink: 0 }} />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}

            {filteredCategories.length === 0 && (
              <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 1rem' }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>No job roles matched "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Job Content Panel */}
        <div className="job-content glass-panel" style={{ flex: 1, padding: '2rem' }}>
          {/* Header Card */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              paddingBottom: '1.75rem', 
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '2rem' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span 
                    style={{ 
                      color: 'var(--accent-primary)', 
                      fontWeight: 700, 
                      fontSize: '0.85rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em' 
                    }}
                  >
                    {activeCategory.categoryName}
                  </span>
                  <span style={{ color: 'var(--border-color)' }}>•</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    Role #{activeJobData.id}
                  </span>
                </div>
                <h2 style={{ fontSize: '2.25rem', color: 'var(--text-primary)', margin: 0, fontWeight: 800, letterSpacing: '-0.03em' }}>
                  {activeJobData.jobPost}
                </h2>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopyJD}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.6rem 1rem',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: copied ? '#059669' : 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}
                  title="Copy full Job Description"
                >
                  {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied JD!' : 'Copy JD'}</span>
                </button>

                <button
                  onClick={handleViewInterviews}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.1rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <FileQuestion size={16} />
                  <span>Interview Questions</span>
                </button>
              </div>
            </div>

            {/* Quick Meta Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  background: 'rgba(79, 70, 229, 0.08)', 
                  color: 'var(--accent-primary)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid rgba(79, 70, 229, 0.2)'
                }}
              >
                <Clock size={15} />
                <span>Experience: {activeJobData.typicalExperience}</span>
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  background: '#f1f5f9', 
                  color: 'var(--text-secondary)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid var(--border-color)'
                }}
              >
                <GraduationCap size={15} />
                <span>Degree / Diploma Required</span>
              </div>
            </div>
          </div>

          {/* Job Details Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Section 1: Overview / Job Summary */}
            <div className="jd-section">
              <div className="section-title" style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                <Sparkles size={18} className="section-icon" />
                <span>Role Overview</span>
              </div>
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.03), rgba(219, 39, 119, 0.02))',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.35rem',
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  color: '#334155'
                }}
              >
                {activeJobData.jobDescription}
              </div>
            </div>

            {/* Section 2: Core Responsibilities */}
            <div className="jd-section">
              <div className="section-title" style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={18} className="section-icon" />
                <span>Core Responsibilities</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {activeJobData.coreResponsibilities.map((resp, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '1rem 1.25rem',
                      transition: 'transform 0.2s ease, background 0.2s ease'
                    }}
                  >
                    <span 
                      style={{ 
                        background: 'var(--accent-primary)', 
                        color: '#ffffff', 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '0.1rem'
                      }}
                    >
                      {idx + 1}
                    </span>
                    <p style={{ margin: 0, color: '#334155', fontSize: '1rem', lineHeight: '1.6', textTransform: 'capitalize' }}>
                      {resp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Key Technical Skills & Tools */}
            <div className="jd-section">
              <div className="section-title" style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                <Wrench size={18} className="section-icon" />
                <span>Key Technical Skills & Tools</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {activeJobData.keyTechnicalSkills.map((skill, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 & 5: Qualification & Experience Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              
              {/* Minimum Qualification */}
              <div 
                style={{ 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '1.25rem' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.6rem' }}>
                  <GraduationCap size={18} />
                  <span>Minimum Qualification</span>
                </div>
                <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {activeJobData.minimumQualification}
                </p>
              </div>

              {/* Typical Experience */}
              <div 
                style={{ 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '1.25rem' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.6rem' }}>
                  <Clock size={18} />
                  <span>Typical Experience</span>
                </div>
                <p style={{ margin: 0, color: '#0f172a', fontSize: '1.15rem', fontWeight: 700 }}>
                  {activeJobData.typicalExperience}
                </p>
                <p style={{ margin: '0.35rem 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                  Standard industry experience range for {activeJobData.jobPost}.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
