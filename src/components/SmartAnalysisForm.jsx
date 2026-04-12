import React, { useState } from "react";

// Local university suggestions based on field and province (Pakistan)
const localSuggestions = {
  "Computer Science": {
    Punjab: [
      { name: "FAST-NUCES Lahore", detail: "Excellent for CS", merit: "60%+" },
      { name: "COMSATS Lahore", detail: "Good option", merit: "55%+" },
      { name: "University of Lahore", detail: "Private university", merit: "50%+" },
      { name: "UET Lahore", detail: "Top engineering", merit: "70%+" },
      { name: "Punjab University", detail: "Government sector", merit: "55%+" },
      { name: "University of Agriculture Faisalabad", detail: "Best Government University", merit: "55%+" },
    ],
    Sindh: [
      { name: "FAST-NUCES Karachi", detail: "Top CS program", merit: "60%+" },
      { name: "NED University", detail: "Engineering focused", merit: "65%+" },
      { name: "IBA Karachi", detail: "Premium institution", merit: "70%+" },
      { name: "University of Karachi", detail: "Government sector", merit: "50%+" },
      { name: "SZABIST Karachi", detail: "Industry links", merit: "55%+" },
    ],
    "Khyber Pakhtunkhwa (KPK)": [
      { name: "COMSATS Abbottabad", detail: "Beautiful campus", merit: "55%+" },
      { name: "University of Peshawar", detail: "Government sector", merit: "50%+" },
      { name: "IM Sciences Peshawar", detail: "IT focused", merit: "55%+" },
      { name: "GIK Institute", detail: "Top tier", merit: "75%+" },
      { name: "Abdul Wali Khan University", detail: "Affordable", merit: "50%+" },
    ],
    Balochistan: [
      { name: "University of Balochistan", detail: "Main option", merit: "50%+" },
      { name: "BUITEMS Quetta", detail: "Technical university", merit: "55%+" },
      { name: "Sardar Bahadur Khan University", detail: "Emerging", merit: "50%+" },
    ],
    "Gilgit-Baltistan": [
      { name: "Karakoram International University", detail: "Main university", merit: "50%+" },
      { name: "University of Baltistan", detail: "Newer option", merit: "45%+" },
    ],
    "Azad Kashmir": [
      { name: "University of AJK", detail: "Main option", merit: "50%+" },
      { name: "MUST Mirpur", detail: "Science & Tech", merit: "55%+" },
    ],
  },
  "Pre-Engineering": {
    Punjab: [
      { name: "UET Lahore", detail: "Best for engineering", merit: "70%+" },
      { name: "NUST Islamabad", detail: "Top ranked", merit: "75%+" },
      { name: "COMSATS", detail: "Multiple campuses", merit: "60%+" },
      { name: "UMT Lahore", detail: "Private option", merit: "55%+" },
      { name: "University of Lahore", detail: "Affordable", merit: "50%+" },
    ],
    Sindh: [
      { name: "NED University", detail: "Top engineering", merit: "65%+" },
      { name: "Mehran University", detail: "Government sector", merit: "60%+" },
      { name: "SZABIST", detail: "Good private", merit: "55%+" },
      { name: "DHA Suffa", detail: "Emerging", merit: "60%+" },
    ],
  },
  Medical: {
    Punjab: [
      { name: "King Edward Medical", detail: "Top government", merit: "85%+" },
      { name: "Allama Iqbal Medical", detail: "Excellent", merit: "82%+" },
      { name: "Services Institute", detail: "Government", merit: "80%+" },
      { name: "CMH Lahore", detail: "Army medical", merit: "78%+" },
      { name: "Shalamar Medical", detail: "Private", merit: "70%+" },
    ],
    Sindh: [
      { name: "Dow Medical College", detail: "Top in Sindh", merit: "82%+" },
      { name: "Jinnah Sindh Medical", detail: "Government", merit: "80%+" },
      { name: "Aga Khan University", detail: "Premium private", merit: "85%+" },
      { name: "Liaquat National", detail: "Private", merit: "70%+" },
    ],
  },
  Commerce: {
    Punjab: [
      { name: "LUMS", detail: "Top business school", merit: "80%+" },
      { name: "IBA Lahore", detail: "Excellent", merit: "75%+" },
      { name: "Lahore School of Economics", detail: "Economics focused", merit: "70%+" },
      { name: "UMT", detail: "Good BBA", merit: "60%+" },
      { name: "UCP", detail: "Private", merit: "55%+" },
      { name: "University of Agriculture Faisalabad", detail: "Best Government University", merit: "55%+" },
    ],
    Sindh: [
      { name: "IBA Karachi", detail: "Best in Pakistan", merit: "80%+" },
      { name: "SZABIST", detail: "Good for business", merit: "65%+" },
      { name: "CBM Karachi", detail: "Business focused", merit: "60%+" },
      { name: "University of Karachi", detail: "Affordable", merit: "55%+" },
    ],
  },
};

// International university suggestions
const internationalSuggestions = {
  "Computer Science": {
    "United States": [
      { name: "MIT", detail: "Top CS worldwide", requirements: "SAT 1500+, GPA 3.9+" },
      { name: "Stanford University", detail: "Silicon Valley", requirements: "SAT 1480+, GPA 3.8+" },
      { name: "Carnegie Mellon", detail: "Best for AI/ML", requirements: "SAT 1450+, GPA 3.7+" },
      { name: "UC Berkeley", detail: "Public Ivy", requirements: "SAT 1400+, GPA 3.6+" },
      { name: "Georgia Tech", detail: "Great value", requirements: "SAT 1350+, GPA 3.5+" },
    ],
    "United Kingdom": [
      { name: "University of Oxford", detail: "World-class", requirements: "A-Levels AAA, IELTS 7.0+" },
      { name: "University of Cambridge", detail: "Historic excellence", requirements: "A-Levels A*AA, IELTS 7.5+" },
      { name: "Imperial College London", detail: "Tech focused", requirements: "A-Levels AAA, IELTS 6.5+" },
      { name: "University of Edinburgh", detail: "Scottish excellence", requirements: "A-Levels AAB, IELTS 6.5+" },
      { name: "UCL", detail: "Top London uni", requirements: "A-Levels AAB, IELTS 6.5+" },
    ],
    Canada: [
      { name: "University of Toronto", detail: "Top in Canada", requirements: "IELTS 6.5+, 85%+" },
      { name: "University of Waterloo", detail: "Co-op programs", requirements: "IELTS 6.5+, 90%+" },
      { name: "UBC Vancouver", detail: "Beautiful campus", requirements: "IELTS 6.5+, 85%+" },
      { name: "McGill University", detail: "Montreal", requirements: "IELTS 6.5+, 85%+" },
      { name: "University of Alberta", detail: "AI research", requirements: "IELTS 6.5+, 80%+" },
    ],
    Germany: [
      { name: "TU Munich", detail: "Free tuition!", requirements: "TestAS, German B2/English C1" },
      { name: "RWTH Aachen", detail: "Engineering excellence", requirements: "TestAS, German B2" },
      { name: "TU Berlin", detail: "Capital city", requirements: "TestAS, German B2" },
      { name: "KIT Karlsruhe", detail: "Research focused", requirements: "TestAS, German B2" },
      { name: "University of Heidelberg", detail: "Historic", requirements: "TestAS, German B2" },
    ],
    Australia: [
      { name: "University of Melbourne", detail: "Top ranked", requirements: "IELTS 6.5+, 80%+" },
      { name: "UNSW Sydney", detail: "Tech focused", requirements: "IELTS 6.5+, 80%+" },
      { name: "University of Sydney", detail: "Historic", requirements: "IELTS 6.5+, 80%+" },
      { name: "ANU Canberra", detail: "Research leader", requirements: "IELTS 6.5+, 80%+" },
      { name: "Monash University", detail: "Melbourne", requirements: "IELTS 6.5+, 75%+" },
    ],
    China: [
      { name: "Tsinghua University", detail: "China's MIT", requirements: "HSK 4+, 80%+" },
      { name: "Peking University", detail: "Top ranked", requirements: "HSK 4+, 80%+" },
      { name: "Fudan University", detail: "Shanghai", requirements: "HSK 4+, 75%+" },
      { name: "Zhejiang University", detail: "Tech hub", requirements: "HSK 4+, 75%+" },
      { name: "Shanghai Jiao Tong", detail: "Engineering", requirements: "HSK 4+, 75%+" },
    ],
    Malaysia: [
      { name: "University of Malaya", detail: "Top in Malaysia", requirements: "IELTS 5.5+, 65%+" },
      { name: "Taylor's University", detail: "Private option", requirements: "IELTS 5.5+, 60%+" },
      { name: "Sunway University", detail: "Good for intl", requirements: "IELTS 5.5+, 60%+" },
      { name: "UCSI University", detail: "Affordable", requirements: "IELTS 5.5+, 55%+" },
      { name: "Asia Pacific University", detail: "IT focused", requirements: "IELTS 5.5+, 55%+" },
    ],
  },
  "Pre-Engineering": {
    "United States": [
      { name: "MIT", detail: "Best worldwide", requirements: "SAT 1500+, GPA 3.9+" },
      { name: "Stanford", detail: "Innovation hub", requirements: "SAT 1480+, GPA 3.8+" },
      { name: "Georgia Tech", detail: "Excellent value", requirements: "SAT 1350+, GPA 3.5+" },
      { name: "Purdue University", detail: "Engineering tradition", requirements: "SAT 1300+, GPA 3.4+" },
      { name: "University of Michigan", detail: "Top public", requirements: "SAT 1400+, GPA 3.6+" },
    ],
    "United Kingdom": [
      { name: "Imperial College", detail: "Engineering focused", requirements: "A-Levels A*AA, IELTS 6.5+" },
      { name: "University of Cambridge", detail: "Historic", requirements: "A-Levels A*A*A, IELTS 7.0+" },
      { name: "University of Manchester", detail: "Industrial heritage", requirements: "A-Levels AAB, IELTS 6.5+" },
      { name: "University of Edinburgh", detail: "Scottish excellence", requirements: "A-Levels AAB, IELTS 6.5+" },
      { name: "UCL Engineering", detail: "London", requirements: "A-Levels AAA, IELTS 6.5+" },
    ],
    Germany: [
      { name: "TU Munich", detail: "Free, world-class", requirements: "TestAS, German B2" },
      { name: "RWTH Aachen", detail: "Engineering leader", requirements: "TestAS, German B2" },
      { name: "TU Berlin", detail: "Capital city", requirements: "TestAS, German B2" },
      { name: "University of Stuttgart", detail: "Auto industry", requirements: "TestAS, German B2" },
      { name: "TU Dresden", detail: "Eastern Germany", requirements: "TestAS, German B2" },
    ],
    Canada: [
      { name: "University of Toronto", detail: "Engineering", requirements: "IELTS 6.5+, 85%+" },
      { name: "University of Waterloo", detail: "Co-op leader", requirements: "IELTS 6.5+, 90%+" },
      { name: "McGill Engineering", detail: "Montreal", requirements: "IELTS 6.5+, 85%+" },
      { name: "UBC Engineering", detail: "Vancouver", requirements: "IELTS 6.5+, 85%+" },
      { name: "University of Alberta", detail: "Oil & gas", requirements: "IELTS 6.5+, 80%+" },
    ],
  },
  Medical: {
    "United States": [
      { name: "Harvard Medical", detail: "Top worldwide", requirements: "MCAT 520+, GPA 3.9+" },
      { name: "Johns Hopkins", detail: "Medical pioneer", requirements: "MCAT 518+, GPA 3.8+" },
      { name: "Stanford Medicine", detail: "Innovation", requirements: "MCAT 516+, GPA 3.8+" },
      { name: "UCSF", detail: "California", requirements: "MCAT 515+, GPA 3.7+" },
      { name: "Columbia Medical", detail: "New York", requirements: "MCAT 515+, GPA 3.7+" },
    ],
    "United Kingdom": [
      { name: "Oxford Medical", detail: "Historic excellence", requirements: "A-Levels A*AA, BMAT" },
      { name: "Cambridge Medicine", detail: "World-class", requirements: "A-Levels A*A*A, BMAT" },
      { name: "Imperial Medicine", detail: "London", requirements: "A-Levels AAA, BMAT" },
      { name: "UCL Medical", detail: "Research leader", requirements: "A-Levels AAA, UCAT" },
      { name: "King's College London", detail: "NHS links", requirements: "A-Levels AAA, UCAT" },
    ],
    China: [
      { name: "Peking University Health", detail: "MBBS in English", requirements: "IELTS 6.0+, 70%+" },
      { name: "Fudan Medical", detail: "Shanghai", requirements: "IELTS 6.0+, 70%+" },
      { name: "Zhejiang Medical", detail: "Affordable", requirements: "IELTS 5.5+, 65%+" },
      { name: "Wuhan University", detail: "Central China", requirements: "IELTS 5.5+, 65%+" },
      { name: "Xi'an Jiaotong Medical", detail: "Historic", requirements: "IELTS 5.5+, 65%+" },
    ],
    Malaysia: [
      { name: "University of Malaya Medical", detail: "Top", requirements: "IELTS 6.0+, 70%+" },
      { name: "UCSI Medical", detail: "Affordable", requirements: "IELTS 5.5+, 65%+" },
      { name: "Taylor's Medical", detail: "Private", requirements: "IELTS 5.5+, 65%+" },
      { name: "IMU", detail: "International Medical", requirements: "IELTS 6.0+, 70%+" },
      { name: "Manipal Malaysia", detail: "Indian affiliated", requirements: "IELTS 5.5+, 60%+" },
    ],
  },
  Commerce: {
    "United States": [
      { name: "Wharton (UPenn)", detail: "Top business school", requirements: "SAT 1500+, GPA 3.9+" },
      { name: "Harvard Business", detail: "Leadership", requirements: "SAT 1480+, GPA 3.8+" },
      { name: "Stanford GSB", detail: "Innovation", requirements: "SAT 1480+, GPA 3.8+" },
      { name: "MIT Sloan", detail: "Tech + business", requirements: "SAT 1450+, GPA 3.7+" },
      { name: "Columbia Business", detail: "NYC", requirements: "SAT 1450+, GPA 3.7+" },
    ],
    "United Kingdom": [
      { name: "London Business School", detail: "Top in Europe", requirements: "A-Levels AAA, GMAT 700+" },
      { name: "Oxford Saïd", detail: "Historic", requirements: "A-Levels AAA, IELTS 7.0+" },
      { name: "Cambridge Judge", detail: "Prestigious", requirements: "A-Levels AAA, IELTS 7.0+" },
      { name: "LSE", detail: "Economics focused", requirements: "A-Levels A*AA, IELTS 7.0+" },
      { name: "Imperial Business", detail: "London", requirements: "A-Levels AAA, IELTS 7.0+" },
    ],
    Canada: [
      { name: "Rotman (Toronto)", detail: "Top in Canada", requirements: "IELTS 6.5+, 85%+" },
      { name: "Ivey (Western)", detail: "Case method", requirements: "IELTS 6.5+, 85%+" },
      { name: "Schulich (York)", detail: "Diverse", requirements: "IELTS 6.5+, 80%+" },
      { name: "McGill Desautels", detail: "Montreal", requirements: "IELTS 6.5+, 85%+" },
      { name: "Sauder (UBC)", detail: "Vancouver", requirements: "IELTS 6.5+, 80%+" },
    ],
  },
};

// Scholarships data
const scholarships = {
  "United States": [
    { name: "Fulbright Scholarship", type: "Fully Funded" },
    { name: "HEC Scholarship", type: "Partial Funding" },
    { name: "University Merit Awards", type: "Variable" },
  ],
  "United Kingdom": [
    { name: "Chevening Scholarship", type: "Fully Funded" },
    { name: "Commonwealth Scholarship", type: "Fully Funded" },
    { name: "GREAT Scholarships", type: "Partial Funding" },
  ],
  Canada: [
    { name: "Vanier CGS", type: "Fully Funded" },
    { name: "Ontario Graduate Scholarship", type: "Partial" },
    { name: "University Scholarships", type: "Variable" },
  ],
  Germany: [
    { name: "DAAD Scholarship", type: "Fully Funded" },
    { name: "Deutschlandstipendium", type: "€300/month" },
    { name: "Heinrich Böll Foundation", type: "Fully Funded" },
  ],
  Australia: [
    { name: "Australia Awards", type: "Fully Funded" },
    { name: "Research Training Program", type: "Fully Funded" },
    { name: "Destination Australia", type: "$15,000/year" },
  ],
  China: [
    { name: "CSC Scholarship", type: "Fully Funded" },
    { name: "Confucius Institute", type: "Fully Funded" },
    { name: "Provincial Scholarships", type: "Partial" },
  ],
  Malaysia: [
    { name: "Malaysian Technical Cooperation", type: "Fully Funded" },
    { name: "University Scholarships", type: "Variable" },
  ],
};

export default function SmartAnalysisForm() {
  const [activeTab, setActiveTab] = useState("pakistan");
  
  const fieldOptions = ["Medical", "Pre-Engineering", "Computer Science", "Commerce", "Arts"];
  const provinceOptions = ["Punjab", "Sindh", "Khyber Pakhtunkhwa (KPK)", "Balochistan", "Azad Kashmir", "Gilgit-Baltistan"];
  const cityData = {
    Punjab: [
      "Lahore","Faisalabad","Rawalpindi","Multan","Gujranwala","Sialkot","Bahawalpur",
      "Sargodha","Sheikhupura","Rahim Yar Khan","Toba Tek Singh","Jhang","Dera Ghazi Khan","Gujrat",
      "Kasur","Okara","Sahiwal","Chiniot","Mandi Bahauddin","Hafizabad","Khanewal",
      "Pakpattan","Vehari","Attock","Chakwal","Jhelum"
    ],
    Sindh: [
      "Karachi","Hyderabad","Sukkur","Larkana","Nawabshah","Mirpur Khas","Jacobabad",
      "Shikarpur","Khairpur","Dadu","Thatta","Badin","Tando Adam","Umerkot",
      "Ghotki","Matiari","Sanghar"
    ],
    "Khyber Pakhtunkhwa (KPK)": [
      "Peshawar","Mardan","Abbottabad","Mingora","Kohat","Bannu","Dera Ismail Khan",
      "Swabi","Nowshera","Charsadda","Mansehra","Haripur","Batkhela","Timergara",
      "Hangu","Tank","Chitral","Dir"
    ],
    Balochistan: [
      "Quetta","Turbat","Khuzdar","Gwadar","Sibi","Zhob","Loralai","Chaman",
      "Dera Murad Jamali","Panjgur","Nushki","Mastung","Kalat","Hub","Kharan"
    ],
    "Azad Kashmir": [
      "Muzaffarabad","Mirpur","Kotli","Bhimber","Rawalakot","Bagh",
      "Hattian Bala","Haveli","Neelum","Sudhnoti"
    ],
    "Gilgit-Baltistan": [
      "Gilgit","Skardu","Hunza","Chilas","Ghizer","Ghanche",
      "Shigar","Kharmang","Astore","Diamer","Nagar"
    ],
  };
  const countryOptions = ["United States", "United Kingdom", "Canada", "Germany", "Australia", "China", "Malaysia"];

  const [form, setForm] = useState({ name: "", chosenField: "", totalMarks: "", obtainedMarks: "" });
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [intlForm, setIntlForm] = useState({ name: "", chosenField: "", totalMarks: "", obtainedMarks: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onIntlChange = (e) => setIntlForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleProvinceChange = (e) => {
    const selected = e.target.value;
    setSelectedProvince(selected);
    setSelectedCity("");
    setCitiesList(selected ? cityData[selected] || [] : []);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const getStatusInfo = (percentage) => {
    if (percentage >= 80) return { level: "excellent", icon: "🌟", text: "Excellent!", advice: "You qualify for top-tier universities and scholarships!" };
    if (percentage >= 70) return { level: "good", icon: "✅", text: "Good!", advice: "You have many excellent options available." };
    if (percentage >= 60) return { level: "decent", icon: "👍", text: "Decent", advice: "Consider both government and private universities." };
    if (percentage >= 50) return { level: "fair", icon: "📚", text: "Fair", advice: "Many universities accept this range. Consider private options." };
    return { level: "needs-work", icon: "💡", text: "Keep Going!", advice: "Consider diploma programs or skill-based courses." };
  };

  const handlePakistanSubmit = async (e) => {
    e.preventDefault();
    setError(null); setResult(null);
    if (!form.name || !form.totalMarks || !form.obtainedMarks || !selectedProvince || !selectedCity || !form.chosenField) {
      setError("⚠️ Please fill all required fields."); return;
    }
    setLoading(true);
    const percentage = ((form.obtainedMarks / form.totalMarks) * 100).toFixed(2);
    let suggestions = localSuggestions[form.chosenField]?.[selectedProvince] || [
      { name: "COMSATS University", detail: "Multiple campuses", merit: "55%+" },
      { name: "Virtual University", detail: "Online programs", merit: "45%+" },
      { name: "Allama Iqbal Open University", detail: "Flexible learning", merit: "45%+" },
      { name: "University of the Punjab", detail: "Largest university", merit: "55%+" },
      { name: "Bahria University", detail: "Multiple campuses", merit: "50%+" },
    ];
    
    setTimeout(() => {
      setResult({
        type: "pakistan",
        name: form.name,
        field: form.chosenField,
        percentage: parseFloat(percentage),
        location: `${selectedCity}, ${selectedProvince}`,
        status: getStatusInfo(parseFloat(percentage)),
        universities: suggestions,
        tips: [
          "Apply to multiple universities to increase chances",
          "Check each university's last merit",
          "Consider both government and private options",
          "Look for scholarship opportunities",
        ],
      });
      setLoading(false);
    }, 1200);
  };

  const handleInternationalSubmit = async (e) => {
    e.preventDefault();
    setError(null); setResult(null);
    if (!intlForm.name || !intlForm.totalMarks || !intlForm.obtainedMarks || !intlForm.country || !intlForm.chosenField) {
      setError("⚠️ Please fill all required fields."); return;
    }
    setLoading(true);
    const percentage = ((intlForm.obtainedMarks / intlForm.totalMarks) * 100).toFixed(2);
    let suggestions = internationalSuggestions[intlForm.chosenField]?.[intlForm.country] || [
      { name: "Check Rankings", detail: "Country-specific", requirements: "Varies" },
      { name: "Look for Scholarships", detail: "Financial aid", requirements: "Varies" },
    ];
    
    setTimeout(() => {
      setResult({
        type: "international",
        name: intlForm.name,
        field: intlForm.chosenField,
        percentage: parseFloat(percentage),
        country: intlForm.country,
        status: getStatusInfo(parseFloat(percentage)),
        universities: suggestions,
        scholarships: scholarships[intlForm.country] || [],
        nextSteps: [
          "Prepare IELTS/TOEFL (start 6 months early)",
          "Research scholarship deadlines",
          "Prepare strong Statement of Purpose",
          "Get recommendation letters ready",
        ],
      });
      setLoading(false);
    }, 1200);
  };

  const getCountryFlag = (country) => {
    const flags = { "United States": "🇺🇸", "United Kingdom": "🇬🇧", Canada: "🇨🇦", Germany: "🇩🇪", Australia: "🇦🇺", China: "🇨🇳", Malaysia: "🇲🇾" };
    return flags[country] || "🌍";
  };

  return (
    <div className="panel smart-analysis">
      <h3 className="analyzer-title">CareerNova Analyzer</h3>
      <p className="analyzer-subtitle">Get personalized university recommendations based on your marks and preferences.</p>

      <div className="analyzer-tabs">
        <button className={`analyzer-tab ${activeTab === 'pakistan' ? 'active' : ''}`} onClick={() => { setActiveTab('pakistan'); setResult(null); setError(null); }}>🇵🇰 Pakistan</button>
        <button className={`analyzer-tab ${activeTab === 'international' ? 'active' : ''}`} onClick={() => { setActiveTab('international'); setResult(null); setError(null); }}>🌍 International</button>
      </div>

      {/* Pakistan Form */}
      {activeTab === 'pakistan' && (
        <form className="card smart-form" onSubmit={handlePakistanSubmit}>
          <h4 className="form-section-title">🇵🇰 Find Universities in Pakistan</h4>
          <div className="form-grid">
            <label className="full">Name<input className="input" name="name" placeholder="Full name" value={form.name} onChange={onChange} /></label>
            <label className="full">Choose Field
              <select className="input" name="chosenField" value={form.chosenField} onChange={onChange} required>
                <option value="">Select Field</option>
                {fieldOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </label>
            <label>Total Marks<input className="input" name="totalMarks" type="number" placeholder="e.g. 1100" value={form.totalMarks} onChange={onChange} /></label>
            <label>Obtained Marks<input className="input" name="obtainedMarks" type="number" placeholder="e.g. 880" value={form.obtainedMarks} onChange={onChange} /></label>
            <label>Province
              <select className="input" name="province" value={selectedProvince} onChange={handleProvinceChange} required>
                <option value="">Select Province</option>
                {provinceOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </label>
            <label>Interested City
              <select className="input" name="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedProvince}>
                <option value="">Select City</option>
                {selectedProvince && citiesList.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </label>
            <div className="actions-row"><button type="submit" className="analyze-pill" disabled={loading}>{loading ? "Analyzing..." : "Analyze"}</button></div>
          </div>
        </form>
      )}

      {/* International Form */}
      {activeTab === 'international' && (
        <form className="card smart-form" onSubmit={handleInternationalSubmit}>
          <h4 className="form-section-title">🌍 Find Universities Abroad</h4>
          <div className="form-grid">
            <label className="full">Name<input className="input" name="name" placeholder="Full name" value={intlForm.name} onChange={onIntlChange} /></label>
            <label className="full">Choose Field
              <select className="input" name="chosenField" value={intlForm.chosenField} onChange={onIntlChange} required>
                <option value="">Select Field</option>
                {fieldOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </label>
            <label>Total Marks<input className="input" name="totalMarks" type="number" placeholder="e.g. 1100" value={intlForm.totalMarks} onChange={onIntlChange} /></label>
            <label>Obtained Marks<input className="input" name="obtainedMarks" type="number" placeholder="e.g. 880" value={intlForm.obtainedMarks} onChange={onIntlChange} /></label>
            <label className="full">Destination Country
              <select className="input" name="country" value={intlForm.country} onChange={onIntlChange} required>
                <option value="">Select Country</option>
                {countryOptions.map((opt) => <option key={opt} value={opt}>{getCountryFlag(opt)} {opt}</option>)}
              </select>
            </label>
            <div className="actions-row"><button type="submit" className="analyze-pill" disabled={loading}>{loading ? "Analyzing..." : "🌍 Analyze"}</button></div>
          </div>
        </form>
      )}

      {error && <div className="form-error">{error}</div>}

      {/* Enhanced Results Display */}
      {result && (
        <div className="analyzer-result">
          {/* Header Card */}
          <div className="result-header-card">
            <div className="result-user-info">
              <div className="result-avatar">{result.name.charAt(0).toUpperCase()}</div>
              <div className="result-user-details">
                <h3>{result.name}</h3>
                <p>{result.type === 'pakistan' ? `📍 ${result.location}` : `${getCountryFlag(result.country)} ${result.country}`}</p>
              </div>
            </div>
            <div className="result-stats">
              <div className="result-stat">
                <span className="stat-value">{result.percentage}%</span>
                <span className="stat-label">Score</span>
              </div>
              <div className="result-stat">
                <span className="stat-value">{result.field}</span>
                <span className="stat-label">Field</span>
              </div>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`result-status-banner status-${result.status.level}`}>
            <span className="status-icon">{result.status.icon}</span>
            <div className="status-content">
              <strong>{result.status.text}</strong>
              <p>{result.status.advice}</p>
            </div>
          </div>

          {/* Universities Grid */}
          <div className="result-section">
            <h4 className="result-section-title">🎓 Recommended Universities</h4>
            <div className="universities-grid">
              {result.universities.map((uni, i) => (
                <div key={i} className="university-card">
                  <div className="uni-rank">#{i + 1}</div>
                  <div className="uni-info">
                    <h5>{uni.name}</h5>
                    <p className="uni-detail">{uni.detail}</p>
                    <span className="uni-merit">{result.type === 'pakistan' ? `Merit: ${uni.merit}` : uni.requirements}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships (International Only) */}
          {result.type === 'international' && result.scholarships?.length > 0 && (
            <div className="result-section">
              <h4 className="result-section-title">💰 Scholarship Opportunities</h4>
              <div className="scholarships-list">
                {result.scholarships.map((sch, i) => (
                  <div key={i} className="scholarship-item">
                    <span className="sch-name">{sch.name}</span>
                    <span className="sch-type">{sch.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips / Next Steps */}
          <div className="result-section">
            <h4 className="result-section-title">{result.type === 'pakistan' ? '💡 Pro Tips' : '📋 Next Steps'}</h4>
            <div className="tips-list">
              {(result.tips || result.nextSteps)?.map((tip, i) => (
                <div key={i} className="tip-item">
                  <span className="tip-number">{i + 1}</span>
                  <span className="tip-text">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}  

