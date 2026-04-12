import React, { useState, useRef } from "react";

// Resume templates
const templates = [
  { id: "modern", name: "Modern", color: "#3b82f6", description: "Clean and contemporary design" },
  { id: "professional", name: "Professional", color: "#059669", description: "Traditional corporate style" },
  { id: "creative", name: "Creative", color: "#8b5cf6", description: "Stand out with unique design" },
  { id: "minimal", name: "Minimal", color: "#6b7280", description: "Simple and elegant" },
];

// Tips for each section
const sectionTips = {
  personal: "Keep contact info professional. Use a professional email address.",
  objective: "Tailor your objective to each job. Keep it 2-3 sentences max.",
  education: "List most recent education first. Include GPA if above 3.0.",
  experience: "Use action verbs. Quantify achievements when possible.",
  skills: "Match skills to job requirements. Include both technical and soft skills.",
  projects: "Highlight relevant projects. Include technologies used and your role.",
  certifications: "List relevant certifications. Include dates and issuing organizations.",
  languages: "Be honest about proficiency levels. Include any certifications.",
};

export default function ResumeBuilder() {
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [activeSection, setActiveSection] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const resumeRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    objective: "",
    education: [
      { id: 1, degree: "", institution: "", year: "", gpa: "", description: "" },
    ],
    experience: [
      { id: 1, title: "", company: "", duration: "", description: "" },
    ],
    skills: {
      technical: "",
      soft: "",
      tools: "",
    },
    projects: [
      { id: 1, name: "", description: "", technologies: "", link: "" },
    ],
    certifications: [
      { id: 1, name: "", issuer: "", date: "" },
    ],
    languages: [
      { id: 1, language: "", proficiency: "Intermediate" },
    ],
  });

  const updatePersonal = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updateObjective = (value) => {
    setResumeData((prev) => ({ ...prev, objective: value }));
  };

  const updateSkills = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
    }));
  };

  const updateArrayItem = (section, id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayItem = (section, template) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template, id: Date.now() }],
    }));
  };

  const removeArrayItem = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const handlePrint = () => {
    const printContent = resumeRef.current;
    const printWindow = window.open('', '', 'height=800,width=800');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${resumeData.personal.fullName || 'Resume'} - CV</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; line-height: 1.6; padding: 40px; }
            .resume-preview { max-width: 800px; margin: 0 auto; }
            .resume-header { text-align: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid ${templates.find(t => t.id === activeTemplate)?.color || '#3b82f6'}; }
            .resume-name { font-size: 28px; font-weight: 700; color: ${templates.find(t => t.id === activeTemplate)?.color || '#3b82f6'}; margin-bottom: 8px; }
            .resume-contact { font-size: 13px; color: #6b7280; }
            .resume-contact span { margin: 0 8px; }
            .resume-section { margin-bottom: 20px; }
            .section-title { font-size: 16px; font-weight: 700; color: ${templates.find(t => t.id === activeTemplate)?.color || '#3b82f6'}; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
            .resume-objective { font-size: 14px; color: #4b5563; font-style: italic; }
            .edu-item, .exp-item, .project-item, .cert-item { margin-bottom: 14px; }
            .edu-header, .exp-header, .project-header { display: flex; justify-content: space-between; align-items: baseline; }
            .edu-degree, .exp-title, .project-name { font-weight: 600; font-size: 14px; }
            .edu-institution, .exp-company { color: #6b7280; font-size: 13px; }
            .edu-year, .exp-duration { font-size: 12px; color: #9ca3af; }
            .description { font-size: 13px; color: #4b5563; margin-top: 4px; }
            .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
            .skill-category h4 { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
            .skill-category p { font-size: 12px; color: #6b7280; }
            .languages-list { display: flex; gap: 20px; flex-wrap: wrap; }
            .language-item { font-size: 13px; }
            .language-item strong { color: #374151; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "objective", label: "Objective", icon: "🎯" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "certifications", label: "Certifications", icon: "📜" },
    { id: "languages", label: "Languages", icon: "🌐" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <div className="form-section">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={resumeData.personal.fullName}
                  onChange={(e) => updatePersonal("fullName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={resumeData.personal.email}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                  placeholder="john@email.com"
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={resumeData.personal.phone}
                  onChange={(e) => updatePersonal("phone", e.target.value)}
                  placeholder="+92 300 1234567"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={resumeData.personal.location}
                  onChange={(e) => updatePersonal("location", e.target.value)}
                  placeholder="Lahore, Pakistan"
                />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  value={resumeData.personal.linkedin}
                  onChange={(e) => updatePersonal("linkedin", e.target.value)}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div className="form-group">
                <label>Portfolio/Website</label>
                <input
                  type="url"
                  value={resumeData.personal.portfolio}
                  onChange={(e) => updatePersonal("portfolio", e.target.value)}
                  placeholder="johndoe.com"
                />
              </div>
            </div>
          </div>
        );

      case "objective":
        return (
          <div className="form-section">
            <div className="form-group full-width">
              <label>Career Objective / Professional Summary</label>
              <textarea
                value={resumeData.objective}
                onChange={(e) => updateObjective(e.target.value)}
                placeholder="A motivated Computer Science graduate seeking to leverage programming skills and problem-solving abilities in a challenging software development role..."
                rows={4}
              />
              <span className="char-count">{resumeData.objective.length}/300 characters</span>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="form-section">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="repeater-item">
                <div className="repeater-header">
                  <h4>Education #{index + 1}</h4>
                  {resumeData.education.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeArrayItem("education", edu.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Degree/Certificate *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateArrayItem("education", edu.id, "degree", e.target.value)}
                      placeholder="BS Computer Science"
                    />
                  </div>
                  <div className="form-group">
                    <label>Institution *</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateArrayItem("education", edu.id, "institution", e.target.value)}
                      placeholder="FAST-NUCES Lahore"
                    />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateArrayItem("education", edu.id, "year", e.target.value)}
                      placeholder="2020 - 2024"
                    />
                  </div>
                  <div className="form-group">
                    <label>GPA/Grade</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateArrayItem("education", edu.id, "gpa", e.target.value)}
                      placeholder="3.5/4.0"
                    />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Description (Optional)</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateArrayItem("education", edu.id, "description", e.target.value)}
                    placeholder="Relevant coursework, achievements, activities..."
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <button
              className="add-btn"
              onClick={() => addArrayItem("education", { degree: "", institution: "", year: "", gpa: "", description: "" })}
            >
              + Add Education
            </button>
          </div>
        );

      case "experience":
        return (
          <div className="form-section">
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="repeater-item">
                <div className="repeater-header">
                  <h4>Experience #{index + 1}</h4>
                  {resumeData.experience.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeArrayItem("experience", exp.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateArrayItem("experience", exp.id, "title", e.target.value)}
                      placeholder="Software Developer Intern"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateArrayItem("experience", exp.id, "company", e.target.value)}
                      placeholder="Tech Company Ltd."
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateArrayItem("experience", exp.id, "duration", e.target.value)}
                      placeholder="Jun 2023 - Aug 2023"
                    />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Description *</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateArrayItem("experience", exp.id, "description", e.target.value)}
                    placeholder="• Developed web applications using React.js&#10;• Collaborated with team on API integrations&#10;• Improved system performance by 20%"
                    rows={4}
                  />
                </div>
              </div>
            ))}
            <button
              className="add-btn"
              onClick={() => addArrayItem("experience", { title: "", company: "", duration: "", description: "" })}
            >
              + Add Experience
            </button>
          </div>
        );

      case "skills":
        return (
          <div className="form-section">
            <div className="form-group full-width">
              <label>Technical Skills</label>
              <textarea
                value={resumeData.skills.technical}
                onChange={(e) => updateSkills("technical", e.target.value)}
                placeholder="Python, JavaScript, React, Node.js, SQL, Git..."
                rows={2}
              />
            </div>
            <div className="form-group full-width">
              <label>Soft Skills</label>
              <textarea
                value={resumeData.skills.soft}
                onChange={(e) => updateSkills("soft", e.target.value)}
                placeholder="Communication, Teamwork, Problem-solving, Leadership..."
                rows={2}
              />
            </div>
            <div className="form-group full-width">
              <label>Tools & Technologies</label>
              <textarea
                value={resumeData.skills.tools}
                onChange={(e) => updateSkills("tools", e.target.value)}
                placeholder="VS Code, Figma, Jira, AWS, Docker..."
                rows={2}
              />
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="form-section">
            {resumeData.projects.map((project, index) => (
              <div key={project.id} className="repeater-item">
                <div className="repeater-header">
                  <h4>Project #{index + 1}</h4>
                  {resumeData.projects.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeArrayItem("projects", project.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Project Name *</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateArrayItem("projects", project.id, "name", e.target.value)}
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div className="form-group">
                    <label>Technologies Used</label>
                    <input
                      type="text"
                      value={project.technologies}
                      onChange={(e) => updateArrayItem("projects", project.id, "technologies", e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Link</label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => updateArrayItem("projects", project.id, "link", e.target.value)}
                      placeholder="github.com/username/project"
                    />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateArrayItem("projects", project.id, "description", e.target.value)}
                    placeholder="Brief description of the project, your role, and key achievements..."
                    rows={3}
                  />
                </div>
              </div>
            ))}
            <button
              className="add-btn"
              onClick={() => addArrayItem("projects", { name: "", description: "", technologies: "", link: "" })}
            >
              + Add Project
            </button>
          </div>
        );

      case "certifications":
        return (
          <div className="form-section">
            {resumeData.certifications.map((cert, index) => (
              <div key={cert.id} className="repeater-item">
                <div className="repeater-header">
                  <h4>Certification #{index + 1}</h4>
                  {resumeData.certifications.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeArrayItem("certifications", cert.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid three-col">
                  <div className="form-group">
                    <label>Certification Name *</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateArrayItem("certifications", cert.id, "name", e.target.value)}
                      placeholder="AWS Cloud Practitioner"
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuing Organization</label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateArrayItem("certifications", cert.id, "issuer", e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => updateArrayItem("certifications", cert.id, "date", e.target.value)}
                      placeholder="Dec 2023"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="add-btn"
              onClick={() => addArrayItem("certifications", { name: "", issuer: "", date: "" })}
            >
              + Add Certification
            </button>
          </div>
        );

      case "languages":
        return (
          <div className="form-section">
            {resumeData.languages.map((lang, index) => (
              <div key={lang.id} className="repeater-item compact">
                <div className="repeater-header">
                  <h4>Language #{index + 1}</h4>
                  {resumeData.languages.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeArrayItem("languages", lang.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid two-col">
                  <div className="form-group">
                    <label>Language *</label>
                    <input
                      type="text"
                      value={lang.language}
                      onChange={(e) => updateArrayItem("languages", lang.id, "language", e.target.value)}
                      placeholder="English"
                    />
                  </div>
                  <div className="form-group">
                    <label>Proficiency</label>
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateArrayItem("languages", lang.id, "proficiency", e.target.value)}
                    >
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Basic">Basic</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="add-btn"
              onClick={() => addArrayItem("languages", { language: "", proficiency: "Intermediate" })}
            >
              + Add Language
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="resume-builder">
      {/* Hero Section */}
      <div className="resume-hero">
        <span className="resume-badge">📝 Resume Builder</span>
        <h1 className="resume-title">Build Your Professional Resume</h1>
        <p className="resume-subtitle">
          Create a stunning resume in minutes. Choose a template, fill in your details, and download as PDF.
        </p>
      </div>

      {/* Template Selection */}
      <div className="template-section">
        <h2 className="section-heading">🎨 Choose Your Template</h2>
        <p className="template-intro">Select a design that best represents your professional style</p>
        <div className="templates-grid">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-card ${activeTemplate === template.id ? "active" : ""}`}
              onClick={() => setActiveTemplate(template.id)}
              style={{ "--template-color": template.color }}
            >
              {activeTemplate === template.id && <span className="selected-badge">✓ Selected</span>}
              <div className="template-preview">
                {/* Mini Resume Preview */}
                <div className="mini-resume" style={{ borderTopColor: template.color }}>
                  {/* Header */}
                  <div className="mini-header" style={{ background: template.id === 'creative' ? template.color : 'transparent' }}>
                    <div className="mini-avatar" style={{ background: template.color }}></div>
                    <div className="mini-name-area">
                      <div className="mini-name" style={{ background: template.color }}></div>
                      <div className="mini-contact"></div>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="mini-body">
                    <div className="mini-section">
                      <div className="mini-section-title" style={{ background: template.color }}></div>
                      <div className="mini-line"></div>
                      <div className="mini-line short"></div>
                    </div>
                    <div className="mini-section">
                      <div className="mini-section-title" style={{ background: template.color }}></div>
                      <div className="mini-line"></div>
                      <div className="mini-line medium"></div>
                      <div className="mini-line short"></div>
                    </div>
                    {template.id !== 'minimal' && (
                      <div className="mini-section">
                        <div className="mini-section-title" style={{ background: template.color }}></div>
                        <div className="mini-skills">
                          <span style={{ background: `${template.color}30`, borderColor: template.color }}></span>
                          <span style={{ background: `${template.color}30`, borderColor: template.color }}></span>
                          <span style={{ background: `${template.color}30`, borderColor: template.color }}></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="template-info">
                <h4 style={{ color: activeTemplate === template.id ? template.color : 'inherit' }}>{template.name}</h4>
                <p>{template.description}</p>
                <div className="template-color-indicator">
                  <span className="color-dot" style={{ background: template.color }}></span>
                  <span className="color-name">Theme Color</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Builder Area */}
      <div className="builder-container">
        {/* Sidebar Navigation */}
        <div className="builder-sidebar">
          <h3>Sections</h3>
          <nav className="section-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`section-btn ${activeSection === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="section-icon">{section.icon}</span>
                <span className="section-label">{section.label}</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-actions">
            <button className="preview-btn" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? "✏️ Edit" : "👁️ Preview"}
            </button>
            <button className="download-btn" onClick={handlePrint}>
              📥 Download PDF
            </button>
          </div>
        </div>

        {/* Form Area */}
        <div className="builder-main">
          {!showPreview ? (
            <>
              <div className="form-header">
                <h2>{sections.find((s) => s.id === activeSection)?.icon} {sections.find((s) => s.id === activeSection)?.label}</h2>
                <div className="tip-box">
                  <span className="tip-icon">💡</span>
                  <p>{sectionTips[activeSection]}</p>
                </div>
              </div>
              {renderSection()}
            </>
          ) : (
            <div className="preview-container">
              <h2>📄 Resume Preview</h2>
              <div 
                className="resume-preview" 
                ref={resumeRef}
                style={{ "--accent-color": templates.find((t) => t.id === activeTemplate)?.color }}
              >
                {/* Resume Header */}
                <div className="resume-header">
                  <h1 className="resume-name">{resumeData.personal.fullName || "Your Name"}</h1>
                  <div className="resume-contact">
                    {resumeData.personal.email && <span>📧 {resumeData.personal.email}</span>}
                    {resumeData.personal.phone && <span>📱 {resumeData.personal.phone}</span>}
                    {resumeData.personal.location && <span>📍 {resumeData.personal.location}</span>}
                  </div>
                  <div className="resume-links">
                    {resumeData.personal.linkedin && <span>🔗 {resumeData.personal.linkedin}</span>}
                    {resumeData.personal.portfolio && <span>🌐 {resumeData.personal.portfolio}</span>}
                  </div>
                </div>

                {/* Objective */}
                {resumeData.objective && (
                  <div className="resume-section">
                    <h3 className="section-title">Objective</h3>
                    <p className="resume-objective">{resumeData.objective}</p>
                  </div>
                )}

                {/* Education */}
                {resumeData.education.some((e) => e.degree) && (
                  <div className="resume-section">
                    <h3 className="section-title">Education</h3>
                    {resumeData.education.filter((e) => e.degree).map((edu) => (
                      <div key={edu.id} className="edu-item">
                        <div className="edu-header">
                          <div>
                            <span className="edu-degree">{edu.degree}</span>
                            <span className="edu-institution"> - {edu.institution}</span>
                          </div>
                          <span className="edu-year">{edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}</span>
                        </div>
                        {edu.description && <p className="description">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience.some((e) => e.title) && (
                  <div className="resume-section">
                    <h3 className="section-title">Experience</h3>
                    {resumeData.experience.filter((e) => e.title).map((exp) => (
                      <div key={exp.id} className="exp-item">
                        <div className="exp-header">
                          <div>
                            <span className="exp-title">{exp.title}</span>
                            <span className="exp-company"> at {exp.company}</span>
                          </div>
                          <span className="exp-duration">{exp.duration}</span>
                        </div>
                        {exp.description && <p className="description">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {(resumeData.skills.technical || resumeData.skills.soft || resumeData.skills.tools) && (
                  <div className="resume-section">
                    <h3 className="section-title">Skills</h3>
                    <div className="skills-grid">
                      {resumeData.skills.technical && (
                        <div className="skill-category">
                          <h4>Technical</h4>
                          <p>{resumeData.skills.technical}</p>
                        </div>
                      )}
                      {resumeData.skills.soft && (
                        <div className="skill-category">
                          <h4>Soft Skills</h4>
                          <p>{resumeData.skills.soft}</p>
                        </div>
                      )}
                      {resumeData.skills.tools && (
                        <div className="skill-category">
                          <h4>Tools</h4>
                          <p>{resumeData.skills.tools}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resumeData.projects.some((p) => p.name) && (
                  <div className="resume-section">
                    <h3 className="section-title">Projects</h3>
                    {resumeData.projects.filter((p) => p.name).map((project) => (
                      <div key={project.id} className="project-item">
                        <div className="project-header">
                          <span className="project-name">{project.name}</span>
                          {project.technologies && <span className="project-tech">({project.technologies})</span>}
                        </div>
                        {project.description && <p className="description">{project.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications */}
                {resumeData.certifications.some((c) => c.name) && (
                  <div className="resume-section">
                    <h3 className="section-title">Certifications</h3>
                    {resumeData.certifications.filter((c) => c.name).map((cert) => (
                      <div key={cert.id} className="cert-item">
                        <span className="cert-name">{cert.name}</span>
                        {cert.issuer && <span className="cert-issuer"> - {cert.issuer}</span>}
                        {cert.date && <span className="cert-date"> ({cert.date})</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages */}
                {resumeData.languages.some((l) => l.language) && (
                  <div className="resume-section">
                    <h3 className="section-title">Languages</h3>
                    <div className="languages-list">
                      {resumeData.languages.filter((l) => l.language).map((lang) => (
                        <span key={lang.id} className="language-item">
                          <strong>{lang.language}</strong>: {lang.proficiency}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



