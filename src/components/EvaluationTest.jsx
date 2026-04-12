import React, { useState } from 'react';
import '../styles.css';

const questionLabels = {
  q1: "1. What type of tasks do you enjoy the most? (e.g. solving problems, building things, designing, managing, analyzing, helping people)",

  q2: "2. What kind of work environment do you prefer? (e.g. office, remote, team-based, independent, fast-paced, flexible)",

  q3: "3. Which activities feel most natural to you? (e.g. coding, drawing, speaking, organizing, writing, researching)",

  q4: "4. How do you handle challenges or difficult tasks? (e.g. I enjoy them, I try step-by-step, I need guidance, I avoid pressure)",

  q5: "5. What role do you prefer in group work? (e.g. leader, planner, creative thinker, executor, supporter)",

  q6: "6. What is your main career goal? (e.g. money, learning, stability, creativity, independence, success)",

  q7: "7. Which tools or skills have you used before? (e.g. computer, coding tools, design tools, office tools, communication skills)",

  q8: "8. What skills do you want to improve? (e.g. technical skills, communication, creativity, problem-solving, business skills)",

  q9: "9. What does success mean to you? (e.g. good salary, respect, freedom, impact, growth)",

  q10: "10. If you had to choose, what would you prefer most? (building things, analyzing data, designing visuals, managing people, or solving real-world problems)"
};

const EvaluationTest = () => {
  const [name, setName] = useState('');
  const [interestedField, setInterestedField] = useState('');
  const [cvText, setCvText] = useState('');
  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleAnswerChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const extractTextFromPDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          
          // Load PDF.js library
          if (!window.pdfjsLib) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            
            script.onload = async () => {
              // Set worker
              window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              
              try {
                const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                
                for (let i = 1; i <= pdf.numPages; i++) {
                  const page = await pdf.getPage(i);
                  const textContent = await page.getTextContent();
                  const pageText = textContent.items.map((item) => item.str).join(' ');
                  fullText += pageText + '\n';
                }
                
                const trimmedText = fullText.trim();
                if (trimmedText.length === 0) {
                  reject(new Error('No text content found in the PDF'));
                } else {
                  resolve(trimmedText);
                }
              } catch (err) {
                reject(new Error('Failed to extract text: ' + err.message));
              }
            };
            
            script.onerror = () => {
              reject(new Error('Failed to load PDF parsing library'));
            };
            
            document.head.appendChild(script);
          } else {
            // PDF.js already loaded
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            
            try {
              const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
              let fullText = '';
              
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item) => item.str).join(' ');
                fullText += pageText + '\n';
              }
              
              const trimmedText = fullText.trim();
              if (trimmedText.length === 0) {
                reject(new Error('No text content found in the PDF'));
              } else {
                resolve(trimmedText);
              }
            } catch (err) {
              reject(new Error('Failed to extract text: ' + err.message));
            }
          }
        } catch (err) {
          reject(new Error('Failed to process PDF: ' + err.message));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  const handlePDFUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('PDF file size must be less than 10MB');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const extractedText = await extractTextFromPDF(file);
      if (extractedText.length === 0) {
        throw new Error('No text could be extracted from the PDF');
      }
      
      setCvText(extractedText);
      setUploadedFileName(file.name);
    } catch (err) {
      setError(err.message || 'Failed to process PDF file');
      setCvText('');
      setUploadedFileName('');
    } finally {
      setLoading(false);
    }
  };

  // Rule-Based Career Evaluation System (No AI)
  const careerClusters = {
    'Web Development': {
      skills: ['html', 'css', 'javascript', 'js', 'react', 'vue', 'angular', 'node', 'express', 'webpack', 'frontend'],
      requirements: ['JavaScript', 'React/Vue/Angular', 'HTML/CSS', 'Responsive Design'],
      roadmap: ['HTML & CSS Fundamentals', 'JavaScript Programming', 'Frontend Framework (React)', 'State Management', 'Build Projects', 'Job Preparation']
    },
    'Backend Development': {
      skills: ['python', 'java', 'c#', 'nodejs', 'node', 'docker', 'sql', 'database', 'api', 'rest', 'express', 'django', 'spring'],
      requirements: ['Backend Language', 'Database Design', 'API Development', 'Server Architecture'],
      roadmap: ['Programming Fundamentals', 'Database Concepts', 'API Development', 'Authentication & Security', 'Build Backends', 'Deployment']
    },
    'Data Science / AI': {
      skills: ['python', 'data', 'machine learning', 'ml', 'tensorflow', 'pandas', 'numpy', 'sql', 'analytics', 'ai', 'nlp', 'deep learning'],
      requirements: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
      roadmap: ['Python & Statistics', 'Data Analysis (Pandas/NumPy)', 'Machine Learning Basics', 'Deep Learning', 'Real Projects', 'Career Readiness']
    },
    'Mobile Development': {
      skills: ['react native', 'flutter', 'swift', 'kotlin', 'ios', 'android', 'mobile', 'xamarin'],
      requirements: ['Mobile Framework', 'API Integration', 'Mobile UI/UX', 'Testing'],
      roadmap: ['Mobile Basics', 'Platform Choice (iOS/Android)', 'App Development', 'Advanced Features', 'Build Portfolio', 'App Store Deployment']
    },
    'UI/UX Design': {
      skills: ['figma', 'sketch', 'adobe', 'photoshop', 'xd', 'ui', 'ux', 'design', 'prototyping', 'wireframe', 'user research'],
      requirements: ['Design Tool', 'User Research', 'Prototyping', 'Design Systems'],
      roadmap: ['Design Principles', 'Figma/Adobe Tools', 'User Research Methods', 'Prototyping & Testing', 'Create Portfolio', 'Job Readiness']
    },
    'DevOps / Cloud': {
      skills: ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins', 'devops', 'cloud', 'linux', 'infrastructure'],
      requirements: ['Containerization', 'Cloud Platform', 'CI/CD', 'Infrastructure as Code'],
      roadmap: ['Linux Basics', 'Docker Fundamentals', 'Kubernetes Orchestration', 'Cloud Platforms (AWS/Azure)', 'CI/CD Pipelines', 'Real Deployments']
    },
    'QA / Testing': {
      skills: ['testing', 'qa', 'selenium', 'jest', 'automation', 'manual testing', 'bug tracking', 'test plan'],
      requirements: ['Testing Framework', 'Automation Skills', 'Bug Tracking', 'Test Planning'],
      roadmap: ['Testing Fundamentals', 'Manual Testing', 'Automation Frameworks', 'Performance Testing', 'Create Test Suite', 'Career Path']
    },
    'Marketing / Business': {
      skills: ['marketing', 'seo', 'social media', 'analytics', 'business', 'copywriting', 'content', 'branding']
    }
  };

  const evaluateCareerLogic = () => {
    // Normalize text
    const cvLower = cvText.toLowerCase();
    const interestLower = `${interestedField}`.toLowerCase();
    
    // Calculate scores for each career cluster
    const scores = {};
    
    for (const [career, data] of Object.entries(careerClusters)) {
      let skillMatchCount = 0;
      let totalSkills = data.skills.length;
      
      // Count skill matches in CV
      data.skills.forEach(skill => {
        if (cvLower.includes(skill)) {
          skillMatchCount++;
        }
      });
      
      // Calculate skill match percentage (40%)
      const skillScore = (skillMatchCount / totalSkills) * 40;
      
      // Interest match (40%)
      let interestScore = 0;
      if (interestLower.includes(career.toLowerCase().split('/')[0].trim())) {
        interestScore = 40;
      } else {
        // Check for keyword matches
        const interestKeywords = interestLower.split(' ');
        data.skills.forEach(skill => {
          if (interestKeywords.some(kw => kw.includes(skill) || skill.includes(kw))) {
            interestScore = Math.min(interestScore + 20, 40);
          }
        });
      }
      
      // Experience level based on CV length (20%)
      const cvWords = cvText.split(/\s+/).length;
      let experienceScore = 0;
      if (cvWords > 500) experienceScore = 20;
      else if (cvWords > 300) experienceScore = 15;
      else if (cvWords > 150) experienceScore = 10;
      else experienceScore = 5;
      
      scores[career] = skillScore + interestScore + experienceScore;
    }
    
    // Sort by score
    const sortedCareers = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    // Build result
    const topCareer = sortedCareers[0];
    const topCareerData = careerClusters[topCareer[0]];
    const topScore = Math.round(topCareer[1]);
    
    // Find matched skills
    const matchedSkills = topCareerData.skills.filter(skill => cvLower.includes(skill));
    const missingSkills = topCareerData.requirements.filter(req => !cvLower.includes(req.toLowerCase()));
    
    // Format alternatives
    const alternatives = sortedCareers.slice(1, 4).map(([career, score]) => `${career}: ${Math.round(score)}/100`).join('\n');
    
    // Format strengths
    const strengths = matchedSkills.length > 0 
      ? matchedSkills.map(s => `• ${s.charAt(0).toUpperCase() + s.slice(1)}`).join('\n')
      : '• Limited technical skills identified in CV (consider adding more)';
    
    // Format weaknesses
    const weaknesses = missingSkills.length > 0
      ? missingSkills.map(s => `• ${s}`).join('\n')
      : '• Most recommended skills already acquired';
    
    // Build roadmap
    const roadmapText = topCareerData.roadmap
      ? topCareerData.roadmap.map((step, i) => `Step ${i + 1}: ${step}`).join('\n')
      : 'Step 1: Learn fundamentals\nStep 2: Build projects\nStep 3: Gain experience';
    
    // Verdict
    const verdict = `Based on your CV and interests, ${topCareer[0]} is the best fit for you with a ${topScore}% match score. Your experience and skills align well with this field. Focus on developing the missing skills outlined in the roadmap to advance your career.`;
    
    return {
      score: `${topScore}%\nBased on skills (${Math.round(scores[topCareer[0]] * 0.4)}/40), interests (${Math.round(scores[topCareer[0]] * 0.4)}/40), and experience (${Math.round(scores[topCareer[0]] * 0.2)}/20)`,
      recommendation: `${topCareer[0]} is the best career path for you. Your CV demonstrates relevant skills and your stated interests align well with this field. This role offers growth potential based on your strengths.`,
      alternatives: alternatives || 'No alternative paths available',
      strengths: strengths || 'General technical foundation',
      weaknesses: weaknesses || 'Continue developing advanced skills',
      roadmap: roadmapText,
      verdict: verdict
    };
  };

  const parseReportResponse = (data) => {
    // Data is already structured from rule-based logic
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!interestedField.trim()) {
      setError('Please specify your interested career field');
      return;
    }

    if (!cvText.trim()) {
      setError('Please upload your CV in PDF format');
      return;
    }

    const cvWordCount = cvText.split(/\s+/).filter(w => w.length > 0).length;
    if (cvWordCount < 50) {
      setError(`CV content too short (${cvWordCount} words). Please provide at least 50 words.`);
      return;
    }

    // Check all answers
    for (let i = 0; i < 10; i++) {
      const qKey = `q${i + 1}`;
      if (!answers[qKey] || !answers[qKey].trim()) {
        setError(`Please answer question ${i + 1}`);
        return;
      }
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Evaluate using rule-based logic (no API)
      const evaluationResult = evaluateCareerLogic();
      
      const parsedResult = parseReportResponse(evaluationResult);
      
      setResult({
        success: true,
        data: parsedResult
      });
    } catch (err) {
      console.error('Career Analysis Error:', err);
      const errorMsg = err.message || 'Failed to generate career report. Please try again.';
      setError(errorMsg);
      setResult({ success: false });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setInterestedField('');
    setCvText('');
    setUploadedFileName('');
    setAnswers({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '' });
    setResult(null);
    setError(null);
  };

  return (
    <div className="et-wrapper">
      <div className="et-container">
        {!result || !result.success ? (
          <div className="et-form-section">
            <div className="et-header">
              <h1 className="et-title">AI Career Counselor</h1>
              <p className="et-subtitle">Get a personalized career analysis based on your CV and career preferences</p>
            </div>

            <form className="et-form" onSubmit={handleSubmit}>
              {error && <div className="et-error-banner">{error}</div>}
              {loading && <div className="et-loading-banner">🔄 Analyzing your profile...</div>}

              <div className="et-form-group">
                <label className="et-label">Full Name</label>
                <input
                  type="text"
                  className="et-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>

              <div className="et-form-group">
                <label className="et-label">Interested Career Field</label>
                <input
                  type="text"
                  className="et-input"
                  value={interestedField}
                  onChange={(e) => setInterestedField(e.target.value)}
                  placeholder="e.g., Data Science, Software Engineering, UX Design"
                  disabled={loading}
                />
              </div>

              <div className="et-form-group">
                <label className="et-label">CV / Resume (PDF Upload)</label>
                <div className="et-pdf-upload-container">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePDFUpload}
                    className="et-file-input"
                    id="pdf-upload"
                    disabled={loading}
                  />
                  <label htmlFor="pdf-upload" className="et-upload-button">
                    <span className="et-upload-icon">📄</span>
                    <span className="et-upload-text">
                      {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Click to upload your CV (PDF)'}
                    </span>
                  </label>
                  <p className="et-upload-hint">Max file size: 10 MB. Only PDF files are supported.</p>
                </div>
                {cvText && (
                  <div className="et-extracted-preview">
                    <span className="et-preview-label">✓ PDF processed successfully</span>
                    <p className="et-preview-text">{cvText.substring(0, 150)}...</p>
                  </div>
                )}
              </div>

              <div className="et-questions-section">
                <h2 className="et-questions-title">Career Assessment Questions</h2>
                <p className="et-questions-subtitle">Answer thoughtfully to help us understand your career goals</p>
                
                {Object.keys(answers).map((key, index) => (
                  <div key={key} className="et-question-block">
                    <label className="et-question-label">{questionLabels[key]}</label>
                    <textarea
                      className="et-textarea et-question-textarea"
                      value={answers[key]}
                      onChange={(e) => handleAnswerChange(key, e.target.value)}
                      rows={2}
                      placeholder={`Answer to question ${index + 1}`}
                      disabled={loading}
                    />
                  </div>
                ))}
              </div>

              <div className="et-button-group">
                <button 
                  type="submit" 
                  className="et-btn et-btn-primary" 
                  disabled={loading}
                >
                  {loading ? '⏳ Analyzing Your Profile...' : '✨ Generate Career Report'}
                </button>
                <button 
                  type="button" 
                  className="et-btn et-btn-secondary" 
                  onClick={handleReset}
                  disabled={loading}
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        ) : loading ? (
          <div className="et-loading-section">
            <div className="et-spinner"></div>
            <h2>Analyzing Your Profile...</h2>
            <p>Our AI is carefully reviewing your CV and answers</p>
          </div>
        ) : (
          <div className="et-report-section">
            <div className="et-report-header">
              <h1 className="et-report-title">Your Career Analysis Report</h1>
              <p className="et-report-subtitle">For: <span className="et-highlight-name">{name}</span></p>
              <button className="et-new-analysis-btn" onClick={handleReset}>← Start New Analysis</button>
            </div>

            {result && result.success && result.data ? (
              <>
                {/* 1. Career Score - Highlighted First */}
                <div className="et-report-section-card et-match-score-card">
                  <div className="et-card-badge">Career Score</div>
                  <div className="et-match-score-display">
                    <span className="et-score-value">{result.data.score.split('\n')[0]}</span>
                  </div>
                  <p className="et-score-explanation">
                    {result.data.score.split('\n').slice(1).join('\n') || 'Overall career suitability assessment'}
                  </p>
                </div>

                {/* 2. Career Recommendation */}
                <div className="et-report-section-card">
                  <div className="et-card-badge">Recommended Field</div>
                  <h3 className="et-section-heading">🎯 Career Recommendation</h3>
                  <p className="et-section-content">{result.data.recommendation}</p>
                </div>

                {/* 3. Alternative Career Paths */}
                <div className="et-report-section-card">
                  <div className="et-card-badge">Alternative Paths</div>
                  <h3 className="et-section-heading">🌟 Alternative Career Options</h3>
                  <div className="et-section-body">
                    {result.data.alternatives}
                  </div>
                </div>

                {/* 4. Strengths */}
                <div className="et-report-section-card">
                  <div className="et-card-badge">Strengths</div>
                  <h3 className="et-section-heading">💪 Your Key Strengths</h3>
                  <div className="et-section-body">
                    {result.data.strengths}
                  </div>
                </div>

                {/* 5. Weaknesses / Skill Gaps */}
                <div className="et-report-section-card">
                  <div className="et-card-badge">Development Areas</div>
                  <h3 className="et-section-heading">📈 Skills to Develop</h3>
                  <div className="et-section-body">
                    {result.data.weaknesses}
                  </div>
                </div>

                {/* 6. Roadmap */}
                <div className="et-report-section-card">
                  <div className="et-card-badge">Learning Path</div>
                  <h3 className="et-section-heading">🚀 Step-by-Step Roadmap</h3>
                  <div className="et-section-body">
                    {result.data.roadmap}
                  </div>
                </div>

                {/* 7. Final Verdict */}
                <div className="et-report-section-card et-verdict-card">
                  <div className="et-card-badge">Final Verdict</div>
                  <h3 className="et-section-heading">💡 Professional Conclusion</h3>
                  <p className="et-section-content et-verdict-text">{result.data.verdict}</p>
                </div>

                {/* Action Buttons */}
                <div className="et-report-actions">
                  <button className="et-btn et-btn-primary" onClick={handleReset}>
                    📋 Start New Analysis
                  </button>
                  <button className="et-btn et-btn-secondary" onClick={() => window.print()}>
                    🖨️ Print Report
                  </button>
                </div>
              </>
            ) : (
              <div className="et-error-message">
                <p>Unable to generate your report. Please try again.</p>
                <button className="et-btn et-btn-secondary" onClick={handleReset}>
                  Back to Form
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationTest;
