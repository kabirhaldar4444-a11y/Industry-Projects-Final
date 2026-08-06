import { useState, useMemo } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { Search } from 'lucide-react';
import type { ProjectData } from '../types';

export default function Projects() {
  const { data, loading, error } = useGoogleSheet();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [budgetSort, setBudgetSort] = useState<string>('default');
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<ProjectData | null>(null);

  // Extract unique categories for the filter
  const categories = useMemo(() => {
    const cats = new Set(data.map(p => p.Category).filter(c => c !== ''));
    return ['All', ...Array.from(cats)].sort();
  }, [data]);

  // Extract unique countries for the filter
  const countries = useMemo(() => {
    const ctrs = new Set(data.map(p => p.Country).filter(c => c !== ''));
    return ['All', ...Array.from(ctrs)].sort();
  }, [data]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    return data.filter(project => {
      // Category filter
      if (selectedCategory !== 'All' && project.Category !== selectedCategory) {
        return false;
      }
      
      // Country filter
      if (selectedCountry !== 'All' && project.Country !== selectedCountry) {
        return false;
      }
      
      // Search filter (searches across multiple fields)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          project.Project.toLowerCase().includes(term) ||
          project.Country.toLowerCase().includes(term) ||
          project.Summary.toLowerCase().includes(term) ||
          project.Location.toLowerCase().includes(term)
        );
      }
      
      return true;
    }).sort((a, b) => {
      // Budget sort
      if (budgetSort === 'high-low') {
        return b.ParsedBudget - a.ParsedBudget;
      } else if (budgetSort === 'low-high') {
        return a.ParsedBudget - b.ParsedBudget;
      }
      return 0; // Default order
    });
  }, [data, selectedCategory, selectedCountry, searchTerm, budgetSort]);

  return (
    <>
      <header className="header">
        <h1>Global <span className="gradient-text">Project Directory</span></h1>
        <p>Explore major infrastructure, energy, and commercial projects from around the world.</p>
      </header>

      <main>
        {error && (
          <div className="empty-state">
            <h3>Error loading data</h3>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching latest project data...</p>
          </div>
        ) : !error && (
          <>
            <div className="glass-panel controls-container">
              <div className="search-bar">
                <Search size={20} />
                <input 
                  type="text" 
                  placeholder="Search by project name, country, or keyword..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters-wrapper">
                <div className="filter-group">
                  <label htmlFor="category-filter">Type of Project:</label>
                  <select 
                    id="category-filter" 
                    className="filter-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="country-filter">Country:</label>
                  <select 
                    id="country-filter" 
                    className="filter-select"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="budget-sort">Budget:</label>
                  <select 
                    id="budget-sort" 
                    className="filter-select"
                    value={budgetSort}
                    onChange={(e) => setBudgetSort(e.target.value)}
                  >
                    <option value="default">Default Order</option>
                    <option value="high-low">Highest to Lowest</option>
                    <option value="low-high">Lowest to Highest</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 500 }}>
                Showing {filteredData.length} {filteredData.length === 1 ? 'project' : 'projects'}
              </p>
              
              {filteredData.length > 0 ? (
                <div className="projects-grid">
                  {filteredData.map((project, idx) => (
                    <ProjectCard 
                      key={`${project.Project}-${idx}`} 
                      project={project} 
                      onReadMore={(p) => setSelectedProjectDetails(p)}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No projects found</h3>
                  <p>Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <ProjectModal 
        project={selectedProjectDetails} 
        onClose={() => setSelectedProjectDetails(null)} 
      />
    </>
  );
}
