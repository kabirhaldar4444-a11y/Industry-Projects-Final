import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { jobCategories } from '../data/jobQuestions';
import { 
  ChevronDown, 
  ChevronRight, 
  Briefcase, 
  ChevronUp, 
  FileText, 
  Copy, 
  Check, 
  Search 
} from 'lucide-react';

export default function InterviewQuestions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleParam = searchParams.get('role');

  const [expandedCategory, setExpandedCategory] = useState<string>(() => {
    if (roleParam) {
      for (const cat of jobCategories) {
        if (cat.jobs.some(j => j.title.toLowerCase() === roleParam.toLowerCase())) {
          return cat.id;
        }
      }
    }
    return jobCategories[0].id;
  });

  const [activeJobTitle, setActiveJobTitle] = useState<string>(() => {
    if (roleParam) {
      for (const cat of jobCategories) {
        const found = cat.jobs.find(j => j.title.toLowerCase() === roleParam.toLowerCase());
        if (found) return found.title;
      }
    }
    return jobCategories[0].jobs[0].title;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync role param if changed externally
  useEffect(() => {
    if (roleParam) {
      for (const cat of jobCategories) {
        const found = cat.jobs.find(j => j.title.toLowerCase() === roleParam.toLowerCase());
        if (found) {
          setActiveJobTitle(found.title);
          setExpandedCategory(cat.id);
          break;
        }
      }
    }
  }, [roleParam]);

  const handleSelectJob = (title: string, catId: string) => {
    setActiveJobTitle(title);
    setExpandedCategory(catId);
    setSearchParams({ role: title }, { replace: true });
  };

  // Find the currently active job object (which contains the 20 questions)
  const activeJobData = useMemo(() => {
    for (const category of jobCategories) {
      const found = category.jobs.find(j => j.title.toLowerCase() === activeJobTitle.toLowerCase());
      if (found) return found;
    }
    return jobCategories[0].jobs[0];
  }, [activeJobTitle]);

  const activeCategoryName = useMemo(() => {
    for (const category of jobCategories) {
      if (category.jobs.some(j => j.title.toLowerCase() === activeJobTitle.toLowerCase())) {
        return category.categoryName;
      }
    }
    return jobCategories[0].categoryName;
  }, [activeJobTitle]);

  // Filter categories and jobs based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return jobCategories;
    const lowerQuery = searchQuery.toLowerCase().trim();
    
    return jobCategories.map(cat => ({
      ...cat,
      jobs: cat.jobs.filter(job => job.title.toLowerCase().includes(lowerQuery))
    })).filter(cat => cat.categoryName.toLowerCase().includes(lowerQuery) || cat.jobs.length > 0);
  }, [searchQuery]);

  const totalFilteredJobsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.jobs.length, 0);
  }, [filteredCategories]);

  const toggleCategory = (catId: string) => {
    setExpandedCategory(expandedCategory === catId ? '' : catId);
  };

  const handleCopyQuestions = () => {
    if (!activeJobData) return;
    const text = `Technical Interview Questions for ${activeJobData.title} (${activeCategoryName}):\n\n` +
      activeJobData.questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleViewJD = () => {
    navigate(`/job-descriptions?role=${encodeURIComponent(activeJobData.title)}`);
  };

  return (
    <>
      <header className="header" style={{ marginBottom: '2rem' }}>
        <h1>Technical <span className="gradient-text">Interview Questions</span></h1>
        <p>Select your exact role from over 500 engineering and tech job titles to see tailored interview questions.</p>
      </header>

      <main className="interview-container">
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
                placeholder="Search job titles..." 
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
              const hasActiveJob = category.jobs.some(j => j.title.toLowerCase() === activeJobTitle.toLowerCase());

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
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                        const isActive = activeJobTitle.toLowerCase() === job.title.toLowerCase();
                        return (
                          <li key={job.title}>
                            <button
                              className={`job-btn ${isActive ? 'active' : ''}`}
                              onClick={() => handleSelectJob(job.title, category.id)}
                              style={{ 
                                padding: '0.5rem 0.75rem', 
                                fontSize: '0.875rem',
                                borderRadius: '8px'
                              }}
                            >
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {job.title}
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
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
                No job titles found.
              </p>
            )}
          </div>
        </div>

        <div className="job-content glass-panel" style={{ flex: 1, padding: '2rem', height: 'fit-content' }}>
          <div className="content-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.25rem' }}>
                  {activeCategoryName}
                </span>
                <h2 style={{ fontSize: '2.25rem', margin: 0, fontWeight: 800, letterSpacing: '-0.03em' }}>{activeJobData.title}</h2>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopyQuestions}
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
                    transition: 'all 0.2s ease'
                  }}
                  title="Copy all questions"
                >
                  {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy Questions'}</span>
                </button>

                <button
                  onClick={handleViewJD}
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
                  <FileText size={16} />
                  <span>Job Description</span>
                </button>

                <span className="question-count">{activeJobData.questions.length} Questions</span>
              </div>
            </div>
          </div>
          
          <div className="questions-list">
            {activeJobData.questions.map((q, idx) => (
              <div key={idx} className="question-item">
                <span className="question-number">{idx + 1}.</span>
                <p className="question-text">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
