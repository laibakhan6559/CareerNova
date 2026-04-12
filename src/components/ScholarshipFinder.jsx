import React, { useState, useMemo } from "react";

// Comprehensive Scholarship Database
const scholarshipsData = [
  // USA Scholarships
  {
    id: 1,
    name: "Fulbright Scholarship",
    country: "United States",
    type: "Fully Funded",
    amount: "Full Tuition + Stipend",
    deadline: "May 2026",
    fields: ["All Fields"],
    eligibility: ["Bachelor's degree", "2 years work experience", "TOEFL/IELTS required"],
    description: "Prestigious scholarship for graduate studies in the USA. Covers tuition, living expenses, airfare, and health insurance.",
    link: "https://foreign.fulbrightonline.org/",
    featured: true,
  },
  {
    id: 2,
    name: "USAID Merit Scholarship",
    country: "United States",
    type: "Fully Funded",
    amount: "Full Tuition + Living",
    deadline: "March 2026",
    fields: ["Agriculture", "Education", "Health", "Energy"],
    eligibility: ["Pakistani citizen", "Bachelor's degree", "Under 35 years"],
    description: "For Pakistani students to pursue Master's degrees in priority fields at US universities.",
    link: "https://www.usaid.gov/",
    featured: true,
  },
  // UK Scholarships
  {
    id: 3,
    name: "Chevening Scholarship",
    country: "United Kingdom",
    type: "Fully Funded",
    amount: "Full Tuition + £1200/month",
    deadline: "November 2026",
    fields: ["All Fields"],
    eligibility: ["2 years work experience", "Bachelor's degree", "Return to home country"],
    description: "UK government's global scholarship programme for future leaders. Covers full tuition, living costs, and travel.",
    link: "https://www.chevening.org/",
    featured: true,
  },
  {
    id: 4,
    name: "Commonwealth Scholarship",
    country: "United Kingdom",
    type: "Fully Funded",
    amount: "Full Tuition + Stipend",
    deadline: "December 2026",
    fields: ["All Fields"],
    eligibility: ["Commonwealth citizen", "Bachelor's degree", "Cannot afford UK study"],
    description: "For students from Commonwealth countries to study Master's or PhD in UK.",
    link: "https://cscuk.fcdo.gov.uk/",
    featured: false,
  },
  {
    id: 5,
    name: "GREAT Scholarships",
    country: "United Kingdom",
    type: "Partial",
    amount: "£10,000",
    deadline: "Various",
    fields: ["Science", "Engineering", "Business", "Arts"],
    eligibility: ["Pakistani citizen", "Bachelor's degree", "Meet university requirements"],
    description: "Joint scholarship by British Council and UK universities for Pakistani students.",
    link: "https://study-uk.britishcouncil.org/scholarships",
    featured: false,
  },
  // Germany Scholarships
  {
    id: 6,
    name: "DAAD Scholarship",
    country: "Germany",
    type: "Fully Funded",
    amount: "€934-1200/month",
    deadline: "October 2026",
    fields: ["All Fields"],
    eligibility: ["Bachelor's degree", "2 years work experience for some programs", "Language proficiency"],
    description: "German Academic Exchange Service scholarship for international students. Multiple programs available.",
    link: "https://www.daad.de/",
    featured: true,
  },
  {
    id: 7,
    name: "Deutschlandstipendium",
    country: "Germany",
    type: "Partial",
    amount: "€300/month",
    deadline: "Various",
    fields: ["All Fields"],
    eligibility: ["Enrolled in German university", "Academic excellence", "Social engagement"],
    description: "Merit-based scholarship for students at German universities.",
    link: "https://www.deutschlandstipendium.de/",
    featured: false,
  },
  // China Scholarships
  {
    id: 8,
    name: "CSC Scholarship (Chinese Government)",
    country: "China",
    type: "Fully Funded",
    amount: "Full Tuition + ¥3000/month",
    deadline: "January-April 2026",
    fields: ["All Fields"],
    eligibility: ["Under 35 for Master's", "Under 40 for PhD", "Good health"],
    description: "Chinese Government Scholarship covers tuition, accommodation, stipend, and medical insurance.",
    link: "https://www.campuschina.org/",
    featured: true,
  },
  {
    id: 9,
    name: "Confucius Institute Scholarship",
    country: "China",
    type: "Fully Funded",
    amount: "Full Coverage",
    deadline: "March 2026",
    fields: ["Chinese Language", "Chinese Culture", "Education"],
    eligibility: ["HSK level required", "Non-Chinese citizen", "Good health"],
    description: "For students interested in Chinese language and culture studies.",
    link: "https://www.chinese.cn/",
    featured: false,
  },
  // Australia Scholarships
  {
    id: 10,
    name: "Australia Awards Scholarship",
    country: "Australia",
    type: "Fully Funded",
    amount: "Full Tuition + AUD 3000/fortnight",
    deadline: "April 2026",
    fields: ["All Fields"],
    eligibility: ["Pakistani citizen", "Bachelor's degree", "2 years work experience"],
    description: "Australian Government scholarship for students from developing countries.",
    link: "https://www.australiaawardspakistan.org/",
    featured: true,
  },
  {
    id: 11,
    name: "Destination Australia",
    country: "Australia",
    type: "Partial",
    amount: "AUD 15,000/year",
    deadline: "Various",
    fields: ["All Fields"],
    eligibility: ["International student", "Study in regional Australia"],
    description: "Scholarship to encourage international students to study in regional Australia.",
    link: "https://www.education.gov.au/destination-australia",
    featured: false,
  },
  // Canada Scholarships
  {
    id: 12,
    name: "Vanier Canada Graduate Scholarship",
    country: "Canada",
    type: "Fully Funded",
    amount: "CAD 50,000/year",
    deadline: "November 2026",
    fields: ["Health", "Natural Sciences", "Engineering", "Social Sciences"],
    eligibility: ["PhD students", "Academic excellence", "Research potential"],
    description: "Canada's most prestigious scholarship for doctoral students.",
    link: "https://vanier.gc.ca/",
    featured: true,
  },
  {
    id: 13,
    name: "Lester B. Pearson Scholarship",
    country: "Canada",
    type: "Fully Funded",
    amount: "Full Tuition + Living",
    deadline: "November 2026",
    fields: ["All Fields"],
    eligibility: ["International students", "Academic excellence", "Leadership"],
    description: "University of Toronto's scholarship for outstanding international students.",
    link: "https://future.utoronto.ca/pearson/",
    featured: false,
  },
  // Malaysia Scholarships
  {
    id: 14,
    name: "Malaysian Technical Cooperation Programme",
    country: "Malaysia",
    type: "Fully Funded",
    amount: "Full Coverage",
    deadline: "April 2026",
    fields: ["Technical Fields", "Social Sciences"],
    eligibility: ["Government nominated", "Under 45 years", "Working professional"],
    description: "Malaysian government scholarship for students from developing countries.",
    link: "https://mtcp.kln.gov.my/",
    featured: false,
  },
  // Turkey Scholarships
  {
    id: 15,
    name: "Türkiye Burslari (Turkey Scholarship)",
    country: "Turkey",
    type: "Fully Funded",
    amount: "Full Tuition + 800-1100 TRY/month",
    deadline: "February 2026",
    fields: ["All Fields"],
    eligibility: ["Under 21 for Bachelor's", "Under 30 for Master's", "Under 35 for PhD"],
    description: "Turkish Government scholarship covering tuition, accommodation, and monthly stipend.",
    link: "https://turkiyeburslari.gov.tr/",
    featured: true,
  },
  // Pakistan Local Scholarships
  {
    id: 16,
    name: "HEC Need-Based Scholarship",
    country: "Pakistan",
    type: "Partial",
    amount: "PKR 100,000-200,000/year",
    deadline: "Rolling",
    fields: ["All Fields"],
    eligibility: ["Pakistani citizen", "Family income < 45,000/month", "Enrolled in HEC university"],
    description: "Higher Education Commission scholarship for deserving Pakistani students.",
    link: "https://www.hec.gov.pk/",
    featured: false,
  },
  {
    id: 17,
    name: "PEEF Scholarship (Punjab)",
    country: "Pakistan",
    type: "Partial",
    amount: "Full Tuition",
    deadline: "August 2026",
    fields: ["All Fields"],
    eligibility: ["Punjab domicile", "Low income family", "Merit-based"],
    description: "Punjab Educational Endowment Fund scholarship for students in Punjab.",
    link: "https://www.peef.org.pk/",
    featured: false,
  },
  {
    id: 18,
    name: "Ehsaas Undergraduate Scholarship",
    country: "Pakistan",
    type: "Fully Funded",
    amount: "Full Tuition + Stipend",
    deadline: "Rolling",
    fields: ["All Fields"],
    eligibility: ["Pakistani citizen", "Family income < 45,000/month", "Enrolled in public university"],
    description: "Government of Pakistan scholarship for undergraduate students from low-income families.",
    link: "https://ehsaas.hec.gov.pk/",
    featured: true,
  },
  // Additional International
  {
    id: 19,
    name: "Erasmus Mundus Joint Masters",
    country: "Europe (Multiple)",
    type: "Fully Funded",
    amount: "€1400/month + Tuition",
    deadline: "January 2026",
    fields: ["All Fields"],
    eligibility: ["Bachelor's degree", "English proficiency", "Strong academic record"],
    description: "EU-funded scholarship for Master's programs across multiple European universities.",
    link: "https://erasmus-plus.ec.europa.eu/",
    featured: true,
  },
  {
    id: 20,
    name: "Korean Government Scholarship (KGSP)",
    country: "South Korea",
    type: "Fully Funded",
    amount: "Full Coverage + 900,000 KRW/month",
    deadline: "February 2026",
    fields: ["All Fields"],
    eligibility: ["Under 25 for Bachelor's", "Under 40 for Master's/PhD", "Good health"],
    description: "Korean Government scholarship covering Korean language training, tuition, and living expenses.",
    link: "https://www.studyinkorea.go.kr/",
    featured: true,
  },
  // Additional Science Scholarships
  {
    id: 21,
    name: "Endeavour Leadership Program",
    country: "Australia",
    type: "Fully Funded",
    amount: "AUD 272,500 total",
    deadline: "June 2026",
    fields: ["Science", "Research", "Engineering", "Technology"],
    eligibility: ["Postgraduate research", "Academic excellence", "Leadership qualities"],
    description: "Australian Government scholarship for high-achieving international students in research and science fields.",
    link: "https://www.education.gov.au/endeavour",
    featured: false,
  },
  {
    id: 22,
    name: "Australia APEC Women in Research",
    country: "Australia",
    type: "Partial",
    amount: "AUD 10,000",
    deadline: "September 2026",
    fields: ["Science", "Technology", "Research"],
    eligibility: ["Female researchers", "APEC member country", "STEM field"],
    description: "Fellowship for women in STEM from APEC economies to undertake research in Australia.",
    link: "https://www.science.org.au/",
    featured: false,
  },
  {
    id: 23,
    name: "CSIRO Research Scholarship",
    country: "Australia",
    type: "Fully Funded",
    amount: "AUD 35,000/year + fees",
    deadline: "Rolling",
    fields: ["Science", "Research", "Environmental Science", "Technology"],
    eligibility: ["PhD students", "Research excellence", "Science background"],
    description: "Australia's national science agency scholarship for doctoral research in cutting-edge science.",
    link: "https://www.csiro.au/",
    featured: false,
  },
  {
    id: 24,
    name: "Gates Cambridge Scholarship",
    country: "United Kingdom",
    type: "Fully Funded",
    amount: "Full Tuition + £18,000/year",
    deadline: "October 2026",
    fields: ["Science", "Engineering", "Medical", "Social Sciences"],
    eligibility: ["Outstanding academics", "Leadership potential", "Any nationality except UK"],
    description: "Prestigious scholarship for exceptional students to pursue postgraduate study at Cambridge.",
    link: "https://www.gatescambridge.org/",
    featured: true,
  },
  {
    id: 25,
    name: "Rhodes Scholarship",
    country: "United Kingdom",
    type: "Fully Funded",
    amount: "Full Coverage",
    deadline: "August 2026",
    fields: ["All Fields"],
    eligibility: ["Age 19-25", "Bachelor's degree", "Leadership & character"],
    description: "World's oldest international scholarship for study at Oxford University.",
    link: "https://www.rhodeshouse.ox.ac.uk/",
    featured: true,
  },
  {
    id: 26,
    name: "MEXT Scholarship",
    country: "Japan",
    type: "Fully Funded",
    amount: "¥143,000/month + tuition",
    deadline: "April 2026",
    fields: ["Science", "Engineering", "Medicine", "All Fields"],
    eligibility: ["Under 35 years", "Bachelor's for Master's", "Good health"],
    description: "Japanese Government scholarship covering tuition, living expenses, and airfare.",
    link: "https://www.mext.go.jp/",
    featured: true,
  },
  {
    id: 27,
    name: "Swiss Government Excellence Scholarship",
    country: "Switzerland",
    type: "Fully Funded",
    amount: "CHF 1,920/month",
    deadline: "December 2026",
    fields: ["Science", "Research", "Arts", "All Fields"],
    eligibility: ["Master's or PhD", "Under 35", "Strong academic record"],
    description: "For researchers and artists from abroad who wish to pursue research or study in Switzerland.",
    link: "https://www.sbfi.admin.ch/",
    featured: false,
  },
  {
    id: 28,
    name: "Schwarzman Scholars",
    country: "China",
    type: "Fully Funded",
    amount: "Full Tuition + Living",
    deadline: "September 2026",
    fields: ["Business", "Economics", "International Studies", "Science Policy"],
    eligibility: ["Age 18-28", "Bachelor's degree", "Leadership experience"],
    description: "One-year Master's program at Tsinghua University preparing future global leaders.",
    link: "https://www.schwarzmanscholars.org/",
    featured: false,
  },
  {
    id: 29,
    name: "University of Melbourne Graduate Research",
    country: "Australia",
    type: "Fully Funded",
    amount: "AUD 37,000/year + fees",
    deadline: "October 2026",
    fields: ["Science", "Engineering", "Medical", "Research"],
    eligibility: ["Research degree applicants", "Academic excellence", "Research proposal"],
    description: "Scholarship for international students pursuing research degrees at University of Melbourne.",
    link: "https://scholarships.unimelb.edu.au/",
    featured: false,
  },
  {
    id: 30,
    name: "UNSW Scientia PhD Scholarship",
    country: "Australia",
    type: "Fully Funded",
    amount: "AUD 50,000/year",
    deadline: "Rolling",
    fields: ["Science", "Engineering", "Technology", "Research"],
    eligibility: ["PhD applicants", "Outstanding research potential", "First-class honors"],
    description: "Premium scholarship for exceptional PhD candidates at UNSW Sydney.",
    link: "https://www.unsw.edu.au/",
    featured: false,
  },
];

const countries = ["All", "United States", "United Kingdom", "Germany", "China", "Australia", "Canada", "Malaysia", "Turkey", "Pakistan", "Europe (Multiple)", "South Korea", "Japan", "Switzerland"];
const fields = ["All Fields", "Computer Science", "Engineering", "Medical", "Business", "Arts", "Science", "Education", "Agriculture", "Health"];
const types = ["All", "Fully Funded", "Partial"];

export default function ScholarshipFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedField, setSelectedField] = useState("All Fields");
  const [selectedType, setSelectedType] = useState("All");
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [openGuide, setOpenGuide] = useState(null);

  const filteredScholarships = useMemo(() => {
    return scholarshipsData.filter((scholarship) => {
      const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === "All" || scholarship.country === selectedCountry;
      // Improved field matching - "All Fields" scholarships match any filter
      const matchesField = selectedField === "All Fields" || 
        scholarship.fields.includes("All Fields") || 
        scholarship.fields.some(f => 
          f.toLowerCase().includes(selectedField.toLowerCase()) ||
          selectedField.toLowerCase().includes(f.toLowerCase())
        );
      const matchesType = selectedType === "All" || scholarship.type === selectedType;
      
      return matchesSearch && matchesCountry && matchesField && matchesType;
    });
  }, [searchTerm, selectedCountry, selectedField, selectedType]);

  const displayedScholarships = showSaved 
    ? scholarshipsData.filter(s => savedScholarships.includes(s.id))
    : filteredScholarships;

  // Generate helpful message based on filters
  const getNoResultsMessage = () => {
    if (showSaved && savedScholarships.length === 0) {
      return {
        icon: "💝",
        title: "No Saved Scholarships Yet",
        message: "Click the bookmark icon ☆ on any scholarship to save it for later. Your saved scholarships will appear here!",
        suggestion: "Browse scholarships and save the ones that interest you."
      };
    }
    
    if (selectedCountry !== "All" && selectedField !== "All Fields" && selectedType !== "All") {
      return {
        icon: "🎯",
        title: `No ${selectedType} Scholarships Found`,
        message: `We couldn't find ${selectedType.toLowerCase()} scholarships for ${selectedField} in ${selectedCountry}.`,
        suggestion: "Try selecting 'All' for Type or Field to see more options, or check other countries."
      };
    }
    
    if (selectedCountry !== "All" && selectedField !== "All Fields") {
      return {
        icon: "📚",
        title: `Limited Options for ${selectedField}`,
        message: `${selectedCountry} may not have specific ${selectedField} scholarships in our database.`,
        suggestion: "Most scholarships accept 'All Fields'. Try selecting 'All Fields' or explore other countries."
      };
    }
    
    if (selectedCountry !== "All") {
      return {
        icon: "🌍",
        title: `Exploring ${selectedCountry} Scholarships`,
        message: `No scholarships match your current filters for ${selectedCountry}.`,
        suggestion: "Try adjusting your field or funding type filter to see available options."
      };
    }
    
    if (searchTerm) {
      return {
        icon: "🔎",
        title: `No Results for "${searchTerm}"`,
        message: "We couldn't find scholarships matching your search term.",
        suggestion: "Try different keywords like country names, 'fully funded', or specific scholarship names."
      };
    }
    
    return {
      icon: "🔍",
      title: "No Scholarships Found",
      message: "Your current filter combination didn't match any scholarships.",
      suggestion: "Try broadening your search by selecting 'All' for some filters."
    };
  };

  const toggleSave = (id) => {
    setSavedScholarships(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const featuredScholarships = scholarshipsData.filter(s => s.featured);

  return (
    <div className="scholarship-finder">
      {/* Hero Section */}
      <div className="scholarship-hero">
        <span className="scholarship-badge">💰 Scholarship Finder</span>
        <h1 className="scholarship-title">Find Your Perfect Scholarship</h1>
        <p className="scholarship-subtitle">
          Discover fully-funded and partial scholarships from around the world. 
          Filter by country, field, and funding type to find opportunities that match your profile.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="scholarship-stats">
        <div className="stat-item">
          <span className="stat-number">{scholarshipsData.length}</span>
          <span className="stat-label">Scholarships</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{countries.length - 1}</span>
          <span className="stat-label">Countries</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{scholarshipsData.filter(s => s.type === "Fully Funded").length}</span>
          <span className="stat-label">Fully Funded</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{savedScholarships.length}</span>
          <span className="stat-label">Saved</span>
        </div>
      </div>

      {/* Featured Scholarships Carousel */}
      <div className="featured-section">
        <h2 className="section-title">⭐ Featured Scholarships</h2>
        <div className="featured-carousel">
          {featuredScholarships.slice(0, 4).map((scholarship) => (
            <div key={scholarship.id} className="featured-card">
              <div className="featured-badge">{scholarship.type}</div>
              <h3>{scholarship.name}</h3>
              <p className="featured-country">{scholarship.country}</p>
              <p className="featured-amount">{scholarship.amount}</p>
              <p className="featured-deadline">⏰ Deadline: {scholarship.deadline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="scholarship-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-row">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="filter-select"
          >
            {countries.map((country) => (
              <option key={country} value={country}>{country === "All" ? "🌍 All Countries" : country}</option>
            ))}
          </select>

          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="filter-select"
          >
            {fields.map((field) => (
              <option key={field} value={field}>{field === "All Fields" ? "📚 All Fields" : field}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            {types.map((type) => (
              <option key={type} value={type}>{type === "All" ? "💰 All Types" : type}</option>
            ))}
          </select>

          <button 
            className={`saved-toggle ${showSaved ? 'active' : ''}`}
            onClick={() => setShowSaved(!showSaved)}
          >
            {showSaved ? '📋 All' : `🔖 Saved (${savedScholarships.length})`}
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-header">
        <h3>{showSaved ? 'Saved Scholarships' : `${displayedScholarships.length} Scholarships Found`}</h3>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="scholarships-grid">
        {displayedScholarships.length > 0 ? (
          displayedScholarships.map((scholarship) => (
            <div key={scholarship.id} className="scholarship-card">
              <div className="card-header">
                <div className="card-badges">
                  <span className={`type-badge ${scholarship.type === 'Fully Funded' ? 'fully-funded' : 'partial'}`}>
                    {scholarship.type}
                  </span>
                  {scholarship.featured && <span className="featured-tag">⭐ Featured</span>}
                </div>
                <button 
                  className={`save-btn ${savedScholarships.includes(scholarship.id) ? 'saved' : ''}`}
                  onClick={() => toggleSave(scholarship.id)}
                  aria-label={savedScholarships.includes(scholarship.id) ? "Remove from saved" : "Save scholarship"}
                >
                  {savedScholarships.includes(scholarship.id) ? '🔖' : '☆'}
                </button>
              </div>

              <h3 className="scholarship-name">{scholarship.name}</h3>
              
              <div className="scholarship-meta">
                <span className="meta-item">🌍 {scholarship.country}</span>
                <span className="meta-item">💵 {scholarship.amount}</span>
              </div>

              <p className="scholarship-description">{scholarship.description}</p>

              <div className="scholarship-fields">
                {scholarship.fields.slice(0, 3).map((field, i) => (
                  <span key={i} className="field-tag">{field}</span>
                ))}
              </div>

              <div className="eligibility-section">
                <h4>📋 Eligibility:</h4>
                <ul>
                  {scholarship.eligibility.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <div className="deadline">
                  <span className="deadline-icon">⏰</span>
                  <span>Deadline: <strong>{scholarship.deadline}</strong></span>
                </div>
                <a 
                  href={scholarship.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="apply-btn"
                >
                  Apply Now →
                </a>
              </div>
            </div>
          ))
        ) : (
          (() => {
            const noResultsInfo = getNoResultsMessage();
            return (
              <div className="no-results">
                <span className="no-results-icon">{noResultsInfo.icon}</span>
                <h3>{noResultsInfo.title}</h3>
                <p>{noResultsInfo.message}</p>
                <p className="no-results-suggestion">💡 {noResultsInfo.suggestion}</p>
                {showSaved && (
                  <button 
                    className="browse-btn"
                    onClick={() => setShowSaved(false)}
                  >
                    Browse All Scholarships →
                  </button>
                )}
                {!showSaved && (selectedCountry !== "All" || selectedField !== "All Fields" || selectedType !== "All") && (
                  <button 
                    className="reset-btn"
                    onClick={() => {
                      setSelectedCountry("All");
                      setSelectedField("All Fields");
                      setSelectedType("All");
                      setSearchTerm("");
                    }}
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            );
          })()
        )}
      </div>

      {/* How to Apply Section */}
      <div className="how-to-apply-section">
        <h2 className="section-title">🎓 How to Apply to International Universities</h2>
        <p className="how-to-subtitle">
          Complete step-by-step guides for applying to universities abroad. Click on any level to expand the detailed guide.
        </p>

        <div className="application-guides-grid">
          {/* Bachelor Guide */}
          <div className={`guide-card ${openGuide === 'bachelor' ? 'open' : ''}`}>
            <div
              className="guide-header"
              onClick={() => setOpenGuide(openGuide === 'bachelor' ? null : 'bachelor')}
            >
              <div className="guide-icon">🎓</div>
              <div className="guide-info">
                <h3>How to Apply for Bachelor (Undergraduate)</h3>
                <p>Complete guide for international bachelor's programs</p>
              </div>
              <div className="guide-arrow">{openGuide === 'bachelor' ? '▲' : '▼'}</div>
            </div>

            {openGuide === 'bachelor' && (
              <div className="guide-content">
                <div className="step">
                  <h4>STEP 1 – Choosing a country</h4>
                  <p>Research countries like UK, USA, Canada, Germany, Australia based on your budget, language preferences, and career goals. Consider factors like cost of living, job opportunities, and post-study work visas.</p>
                </div>

                <div className="step">
                  <h4>STEP 2 – Finding universities</h4>
                  <p>Use university ranking websites (QS, THE, US News), official university websites, and education fairs. Look for universities that offer your desired program and have good acceptance rates for international students.</p>
                </div>

                <div className="step">
                  <h4>STEP 3 – Checking eligibility requirements</h4>
                  <p>Review academic requirements (high school grades, subjects), language proficiency (IELTS/TOEFL), and any specific program prerequisites. Some programs may require entrance exams like SAT or foundation courses.</p>
                </div>

                <div className="step">
                  <h4>STEP 4 – Required documents</h4>
                  <ul>
                    <li>✅ Passport copy (valid for at least 6 months)</li>
                    <li>✅ Academic certificates (high school diploma)</li>
                    <li>✅ Result cards / transcripts (grade 9-12)</li>
                    <li>✅ IELTS/TOEFL scores (if required)</li>
                    <li>✅ CV/Resume (optional for bachelor's)</li>
                    <li>✅ Statement of Purpose (SOP) - 500-800 words</li>
                    <li>✅ Recommendation Letters (1-2 from teachers)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 5 – Document attestation process</h4>
                  <ul>
                    <li>✅ School/College attestation of certificates</li>
                    <li>✅ Education board attestation (IBCC for Pakistan)</li>
                    <li>✅ Foreign Office attestation</li>
                    <li>✅ Embassy attestation (if required by country)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 6 – Apply to the university FIRST</h4>
                  <p>Submit your university application 6-12 months before intake. Pay application fees and upload all required documents. Track your application status regularly.</p>
                </div>

                <div className="step">
                  <h4>STEP 7 – Wait for offer letter</h4>
                  <p>Universities take 2-8 weeks to process applications. You may receive conditional offer (with conditions like IELTS) or unconditional offer. Some universities offer scholarships automatically with admission.</p>
                </div>

                <div className="step">
                  <h4>STEP 8 – Apply for scholarships AFTER receiving offer letter</h4>
                  <p>Most international scholarships require university admission first. Apply to government scholarships, university scholarships, and external funding options.</p>
                </div>

                <div className="step">
                  <h4>STEP 9 – Visa process</h4>
                  <ul>
                    <li>✅ Prepare visa documents (offer letter, financial proof, accommodation)</li>
                    <li>✅ Pay visa fee (varies by country)</li>
                    <li>✅ Book embassy appointment</li>
                    <li>✅ Attend visa interview (prepare well)</li>
                    <li>✅ Visa approval (takes 2-8 weeks)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 10 – After visa approval</h4>
                  <ul>
                    <li>✅ Book flight tickets</li>
                    <li>✅ Prepare travel documents (visa, passport, tickets)</li>
                    <li>✅ Travel to university</li>
                    <li>✅ Complete registration and start studies</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Master Guide */}
          <div className={`guide-card ${openGuide === 'master' ? 'open' : ''}`}>
            <div
              className="guide-header"
              onClick={() => setOpenGuide(openGuide === 'master' ? null : 'master')}
            >
              <div className="guide-icon">🎓</div>
              <div className="guide-info">
                <h3>How to Apply for Master (Graduate)</h3>
                <p>Complete guide for international master's programs</p>
              </div>
              <div className="guide-arrow">{openGuide === 'master' ? '▲' : '▼'}</div>
            </div>

            {openGuide === 'master' && (
              <div className="guide-content">
                <div className="step">
                  <h4>STEP 1 – Choosing a country</h4>
                  <p>Select countries like UK, Germany, Canada, Australia, Netherlands based on research opportunities, industry connections, and funding availability. Consider tuition fees, living costs, and work permit options.</p>
                </div>

                <div className="step">
                  <h4>STEP 2 – Finding universities</h4>
                  <p>Check university rankings, program-specific rankings, and research output. Look for universities with strong faculty in your field, good facilities, and active industry partnerships.</p>
                </div>

                <div className="step">
                  <h4>STEP 3 – Checking eligibility requirements</h4>
                  <p>Review bachelor's degree requirements (minimum GPA), work experience (0-2 years preferred), language scores (IELTS 6.5-7.0, TOEFL 90-100), and GRE/GMAT scores for business programs.</p>
                </div>

                <div className="step">
                  <h4>STEP 4 – Required documents</h4>
                  <ul>
                    <li>✅ Passport copy (valid for at least 6 months)</li>
                    <li>✅ Academic certificates (bachelor's degree)</li>
                    <li>✅ Result cards / transcripts (all semesters)</li>
                    <li>✅ IELTS/TOEFL scores</li>
                    <li>✅ CV/Resume (1-2 pages, highlight experience)</li>
                    <li>✅ Statement of Purpose (SOP) - 800-1000 words</li>
                    <li>✅ Recommendation Letters (2-3 from professors/supervisors)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 5 – Document attestation process</h4>
                  <ul>
                    <li>✅ University attestation of bachelor's degree</li>
                    <li>✅ Higher Education Commission (HEC) attestation</li>
                    <li>✅ Foreign Office attestation</li>
                    <li>✅ Embassy attestation (required for most countries)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 6 – Apply to the university FIRST</h4>
                  <p>Submit applications 8-12 months before intake. Some universities have rolling admissions. Prepare for interviews or entrance exams if required.</p>
                </div>

                <div className="step">
                  <h4>STEP 7 – Wait for offer letter</h4>
                  <p>Processing time varies from 2-12 weeks. Conditional offers may require higher language scores or additional qualifications.</p>
                </div>

                <div className="step">
                  <h4>STEP 8 – Apply for scholarships AFTER receiving offer letter</h4>
                  <p>Apply to DAAD (Germany), Chevening (UK), Commonwealth, university-specific scholarships, and research funding. Many scholarships require separate applications.</p>
                </div>

                <div className="step">
                  <h4>STEP 9 – Visa process</h4>
                  <ul>
                    <li>✅ Prepare visa documents (offer letter, scholarship proof, financial statements)</li>
                    <li>✅ Pay visa fee (higher for work permits)</li>
                    <li>✅ Book embassy appointment</li>
                    <li>✅ Attend visa interview (explain study plans clearly)</li>
                    <li>✅ Visa approval (takes 4-12 weeks)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 10 – After visa approval</h4>
                  <ul>
                    <li>✅ Book flight tickets</li>
                    <li>✅ Prepare travel documents</li>
                    <li>✅ Travel to university</li>
                    <li>✅ Complete registration and orientation</li>
                    <li>✅ Start studies and explore part-time work options</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* PhD Guide */}
          <div className={`guide-card ${openGuide === 'phd' ? 'open' : ''}`}>
            <div
              className="guide-header"
              onClick={() => setOpenGuide(openGuide === 'phd' ? null : 'phd')}
            >
              <div className="guide-icon">🎓</div>
              <div className="guide-info">
                <h3>How to Apply for PhD (Doctorate)</h3>
                <p>Complete guide for international PhD programs</p>
              </div>
              <div className="guide-arrow">{openGuide === 'phd' ? '▲' : '▼'}</div>
            </div>

            {openGuide === 'phd' && (
              <div className="guide-content">
                <div className="step">
                  <h4>STEP 1 – Choosing a country</h4>
                  <p>Select countries like Germany, UK, Canada, Australia, Netherlands for strong research infrastructure, funding opportunities, and academic excellence. Consider PhD duration (3-4 years) and living costs.</p>
                </div>

                <div className="step">
                  <h4>STEP 2 – Finding universities</h4>
                  <p>Research university research rankings, find supervisors whose work aligns with your interests, and check PhD project availability. Contact potential supervisors before applying.</p>
                </div>

                <div className="step">
                  <h4>STEP 3 – Checking eligibility requirements</h4>
                  <p>Review master's degree requirements (minimum GPA), research experience, publications (preferred), language proficiency (higher scores often required), and GRE scores (sometimes required).</p>
                </div>

                <div className="step">
                  <h4>STEP 4 – Required documents</h4>
                  <ul>
                    <li>✅ Passport copy (valid for at least 6 months)</li>
                    <li>✅ Academic certificates (bachelor's + master's degrees)</li>
                    <li>✅ Result cards / transcripts (all degrees)</li>
                    <li>✅ IELTS/TOEFL scores (higher bands required)</li>
                    <li>✅ CV/Resume (2-3 pages, detailed research experience)</li>
                    <li>✅ Statement of Purpose (SOP) - 1000-1500 words</li>
                    <li>✅ Recommendation Letters (3 from professors/supervisors)</li>
                    <li>✅ Research Proposal (3-5 pages, detailed methodology)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 5 – Document attestation process</h4>
                  <ul>
                    <li>✅ University attestation of all degrees</li>
                    <li>✅ Higher Education Commission (HEC) attestation</li>
                    <li>✅ Foreign Office attestation</li>
                    <li>✅ Embassy attestation (mandatory for most countries)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 6 – Apply to the university FIRST</h4>
                  <p>Submit applications 10-15 months before intake. Contact supervisors early, prepare for interviews, and submit research proposals. Some programs require entrance exams.</p>
                </div>

                <div className="step">
                  <h4>STEP 7 – Wait for offer letter</h4>
                  <p>Processing can take 2-16 weeks. Conditional offers may require additional qualifications or funding proof.</p>
                </div>

                <div className="step">
                  <h4>STEP 8 – Apply for scholarships AFTER receiving offer letter</h4>
                  <p>Apply to research scholarships, university funding, government scholarships (DAAD, CSC), and international funding bodies. Many PhD positions in Europe are funded.</p>
                </div>

                <div className="step">
                  <h4>STEP 9 – Visa process</h4>
                  <ul>
                    <li>✅ Prepare visa documents (offer letter, funding proof, supervisor letter)</li>
                    <li>✅ Pay visa fee (research/student visa)</li>
                    <li>✅ Book embassy appointment</li>
                    <li>✅ Attend visa interview (explain research plans in detail)</li>
                    <li>✅ Visa approval (takes 6-16 weeks)</li>
                  </ul>
                </div>

                <div className="step">
                  <h4>STEP 10 – After visa approval</h4>
                  <ul>
                    <li>✅ Book flight tickets</li>
                    <li>✅ Prepare travel documents</li>
                    <li>✅ Travel to university</li>
                    <li>✅ Complete registration and meet supervisor</li>
                    <li>✅ Start research work and settle in</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="scholarship-tips">
        <h2 className="section-title">💡 Scholarship Application Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">📅</span>
            <h4>Apply Early</h4>
            <p>Start applications 6-8 months before deadline</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📝</span>
            <h4>Strong SOP</h4>
            <p>Write a compelling Statement of Purpose</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📄</span>
            <h4>Documents Ready</h4>
            <p>Keep all documents scanned and organized</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🎯</span>
            <h4>Multiple Applications</h4>
            <p>Apply to 5-10 scholarships for better chances</p>
          </div>
        </div>
      </div>

      
    </div>
  );
}



