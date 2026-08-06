import { useState, useMemo } from 'react';
import { jobCategories } from '../data/jobQuestions';
import { ChevronDown, ChevronRight, Briefcase, ChevronUp } from 'lucide-react';

export default function InterviewQuestions() {
  const [expandedCategory, setExpandedCategory] = useState<string>(jobCategories[0].id);
  const [activeJobTitle, setActiveJobTitle] = useState<string>(jobCategories[0].jobs[0].title);
  const [searchQuery, setSearchQuery] = useState('');

  // Find the currently active job object (which contains the 20 questions)
  const activeJobData = useMemo(() => {
    for (const category of jobCategories) {
      const found = category.jobs.find(j => j.title === activeJobTitle);
      if (found) return found;
    }
    return jobCategories[0].jobs[0];
  }, [activeJobTitle]);

  const activeCategoryName = useMemo(() => {
    for (const category of jobCategories) {
      if (category.jobs.some(j => j.title === activeJobTitle)) {
        return category.categoryName;
      }
    }
    return jobCategories[0].categoryName;
  }, [activeJobTitle]);

  // Filter categories and jobs based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return jobCategories;
    const lowerQuery = searchQuery.toLowerCase();
    
    return jobCategories.map(cat => ({
      ...cat,
      jobs: cat.jobs.filter(job => job.title.toLowerCase().includes(lowerQuery))
    })).filter(cat => cat.categoryName.toLowerCase().includes(lowerQuery) || cat.jobs.length > 0);
  }, [searchQuery]);

  const toggleCategory = (catId: string) => {
    setExpandedCategory(expandedCategory === catId ? '' : catId);
  };

  return (
    <>
      <header className="header" style={{ marginBottom: '2rem' }}>
        <h1>Technical <span className="gradient-text">Interview Questions</span></h1>
        <p>Select your exact role from over 500 engineering and tech job titles to see tailored interview questions.</p>
      </header>

      <main className="interview-container">
        <div className="job-sidebar glass-panel" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 150px)', position: 'sticky', top: '1rem', padding: '1rem' }}>
          
          <div style={{ marginBottom: '1rem' }}>
            <h3 className="sidebar-title" style={{ marginBottom: '0.5rem' }}>
              <Briefcase size={20} />
              Job Roles
            </h3>
            <input 
              type="text" 
              placeholder="Search job titles..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
            {filteredCategories.map(category => (
              <div key={category.id} className="category-group" style={{ marginBottom: '0.5rem' }}>
                <button
                  className="category-btn"
                  onClick={() => toggleCategory(category.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: expandedCategory === category.id || searchQuery ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: expandedCategory === category.id || searchQuery ? 'var(--primary)' : 'var(--text-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {category.categoryName}
                  {expandedCategory === category.id || searchQuery ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {(expandedCategory === category.id || searchQuery) && (
                  <ul className="job-list" style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}>
                    {category.jobs.map(job => (
                      <li key={job.title}>
                        <button
                          className={`job-btn ${activeJobTitle === job.title ? 'active' : ''}`}
                          onClick={() => setActiveJobTitle(job.title)}
                          style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                        >
                          {job.title}
                          {activeJobTitle === job.title ? <ChevronRight size={16} /> : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>No job titles found.</p>
            )}
          </div>
        </div>

        <div className="job-content glass-panel" style={{ height: 'fit-content' }}>
          <div className="content-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {activeCategoryName}
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{activeJobData.title}</h2>
              <span className="question-count">{activeJobData.questions.length} Questions</span>
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
