import React, { useState } from "react";
import universitiesData from "../static/universities_by_province.json";
import worldMap from "../assets/world.png"

const topCountries = [
  { name: "United States", value: 99, flag: "🇺🇸" },
  { name: "India", value: 92, flag: "🇮🇳" },
  { name: "China", value: 89, flag: "🇨🇳" },
  { name: "Russia", value: 85, flag: "🇷🇺" },
  { name: "Japan", value: 82, flag: "🇯🇵" },
  { name: "Germany", value: 80, flag: "🇩🇪" },
  { name: "United Kingdom", value: 78, flag: "🇬🇧" },
  { name: "Brazil", value: 75, flag: "🇧🇷" },
  { name: "France", value: 73, flag: "🇫🇷" },
  { name: "Canada", value: 71, flag: "🇨🇦" },
];

// International Universities Data
const internationalData = {
  "United States": {
    flag: "🇺🇸",
    states: {
      "California": {
        cities: {
          "Los Angeles": ["UCLA", "USC", "Caltech", "LMU Los Angeles"],
          "San Francisco": ["Stanford University", "UC Berkeley", "UCSF", "San Francisco State"],
          "San Diego": ["UC San Diego", "San Diego State University"],
        }
      },
      "New York": {
        cities: {
          "New York City": ["Columbia University", "NYU", "Cornell Tech", "Fordham University"],
          "Ithaca": ["Cornell University"],
          "Buffalo": ["University at Buffalo", "Buffalo State College"],
        }
      },
      "Massachusetts": {
        cities: {
          "Cambridge": ["Harvard University", "MIT"],
          "Boston": ["Boston University", "Northeastern University", "Boston College"],
        }
      },
      "Texas": {
        cities: {
          "Austin": ["University of Texas at Austin", "Texas State University"],
          "Houston": ["Rice University", "University of Houston"],
          "Dallas": ["UT Dallas", "SMU"],
        }
      },
    }
  },
  "United Kingdom": {
    flag: "🇬🇧",
    states: {
      "England": {
        cities: {
          "London": ["Imperial College London", "UCL", "King's College London", "LSE"],
          "Oxford": ["University of Oxford", "Oxford Brookes University"],
          "Cambridge": ["University of Cambridge", "Anglia Ruskin University"],
          "Manchester": ["University of Manchester", "Manchester Metropolitan"],
        }
      },
      "Scotland": {
        cities: {
          "Edinburgh": ["University of Edinburgh", "Heriot-Watt University"],
          "Glasgow": ["University of Glasgow", "University of Strathclyde"],
        }
      },
    }
  },
  "Canada": {
    flag: "🇨🇦",
    states: {
      "Ontario": {
        cities: {
          "Toronto": ["University of Toronto", "York University", "Ryerson University"],
          "Ottawa": ["University of Ottawa", "Carleton University"],
          "Waterloo": ["University of Waterloo", "Wilfrid Laurier University"],
        }
      },
      "British Columbia": {
        cities: {
          "Vancouver": ["UBC", "Simon Fraser University", "BCIT"],
          "Victoria": ["University of Victoria"],
        }
      },
      "Quebec": {
        cities: {
          "Montreal": ["McGill University", "Concordia University", "Université de Montréal"],
        }
      },
    }
  },
  "Australia": {
    flag: "🇦🇺",
    states: {
      "New South Wales": {
        cities: {
          "Sydney": ["University of Sydney", "UNSW", "UTS", "Macquarie University"],
        }
      },
      "Victoria": {
        cities: {
          "Melbourne": ["University of Melbourne", "Monash University", "RMIT"],
        }
      },
      "Queensland": {
        cities: {
          "Brisbane": ["University of Queensland", "QUT", "Griffith University"],
        }
      },
    }
  },
  "Germany": {
    flag: "🇩🇪",
    states: {
      "Bavaria": {
        cities: {
          "Munich": ["TU Munich", "LMU Munich", "Munich Business School"],
        }
      },
      "Berlin": {
        cities: {
          "Berlin": ["TU Berlin", "Humboldt University", "Free University of Berlin"],
        }
      },
      "Baden-Württemberg": {
        cities: {
          "Heidelberg": ["Heidelberg University"],
          "Stuttgart": ["University of Stuttgart"],
        }
      },
    }
  },
  "China": {
    flag: "🇨🇳",
    states: {
      "Beijing": {
        cities: {
          "Beijing": ["Tsinghua University", "Peking University", "BUAA", "Renmin University"],
        }
      },
      "Shanghai": {
        cities: {
          "Shanghai": ["Fudan University", "Shanghai Jiao Tong University", "Tongji University"],
        }
      },
      "Zhejiang": {
        cities: {
          "Hangzhou": ["Zhejiang University", "China Academy of Art"],
        }
      },
    }
  },
  "Malaysia": {
    flag: "🇲🇾",
    states: {
      "Selangor": {
        cities: {
          "Shah Alam": ["UiTM", "UNISEL"],
          "Petaling Jaya": ["Sunway University", "Taylor's University"],
        }
      },
      "Kuala Lumpur": {
        cities: {
          "Kuala Lumpur": ["University of Malaya", "HELP University", "UCSI University"],
        }
      },
      "Penang": {
        cities: {
          "George Town": ["USM", "WAWASAN Open University"],
        }
      },
    }
  },
  "Turkey": {
    flag: "🇹🇷",
    states: {
      "Istanbul": {
        cities: {
          "Istanbul": ["Bogazici University", "Istanbul Technical University", "Koc University", "Sabanci University"],
        }
      },
      "Ankara": {
        cities: {
          "Ankara": ["METU", "Bilkent University", "Hacettepe University"],
        }
      },
    }
  },
};

export default function University() {
  // Pakistan search state
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // International search state
  const [intlCountry, setIntlCountry] = useState("");
  const [intlState, setIntlState] = useState("");
  const [intlCity, setIntlCity] = useState("");
  const [intlStates, setIntlStates] = useState([]);
  const [intlCities, setIntlCities] = useState([]);
  const [intlUniversities, setIntlUniversities] = useState([]);
  const [intlLoading, setIntlLoading] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState("pakistan");

  // Fee structure state
  const [openFeeBox, setOpenFeeBox] = useState(null);

  // Pakistan handlers
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    setDistrict("");

    const provinceData = universitiesData[selectedProvince];
    if (provinceData) {
      const cities = provinceData.map((cityObj) => Object.keys(cityObj)[0]);
      setDistricts(cities);
      setUniversities([]);
    } else {
      setDistricts([]);
      setUniversities([]);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    const provinceData = universitiesData[province];

    setIsLoading(true);

    setTimeout(() => {
      if (provinceData) {
        const districtData = provinceData.find(
          (cityObj) => Object.keys(cityObj)[0] === selectedDistrict
        );
        setUniversities(districtData ? districtData[selectedDistrict] : []);
      } else {
        setUniversities([]);
      }
      setIsLoading(false);
    }, 800);
  };

  // International handlers
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setIntlCountry(country);
    setIntlState("");
    setIntlCity("");
    setIntlUniversities([]);

    if (internationalData[country]) {
      setIntlStates(Object.keys(internationalData[country].states));
      setIntlCities([]);
    } else {
      setIntlStates([]);
      setIntlCities([]);
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setIntlState(state);
    setIntlCity("");
    setIntlUniversities([]);

    if (internationalData[intlCountry]?.states[state]) {
      setIntlCities(Object.keys(internationalData[intlCountry].states[state].cities));
    } else {
      setIntlCities([]);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setIntlCity(city);
    setIntlLoading(true);

    setTimeout(() => {
      const unis = internationalData[intlCountry]?.states[intlState]?.cities[city] || [];
      setIntlUniversities(unis);
      setIntlLoading(false);
    }, 800);
  };

  return (
    <div className="university-page">
      {/* Hero Section */}
      <div className="uni-hero">
        <span className="uni-badge">🎓 University Finder</span>
        <h1 className="uni-title">Find Your Dream University</h1>
        <p className="uni-subtitle">
          Explore top universities in Pakistan and worldwide. Find the perfect institution for your future.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="uni-tabs">
        <button 
          className={`uni-tab ${activeTab === 'pakistan' ? 'active' : ''}`}
          onClick={() => setActiveTab('pakistan')}
        >
          🇵🇰 Pakistan
        </button>
        <button 
          className={`uni-tab ${activeTab === 'international' ? 'active' : ''}`}
          onClick={() => setActiveTab('international')}
        >
          🌍 International
        </button>
      </div>

      {/* Pakistan Search Section */}
      {activeTab === 'pakistan' && (
        <>
          <div className="uni-search-section">
            <h3 className="search-section-title">🇵🇰 Search Pakistani Universities</h3>
            <div className="uni-search-grid">
              <div className="uni-search-field">
                <label>Province / Territory</label>
                <div className="select-wrapper">
                  <select value={province} onChange={handleProvinceChange}>
                    <option value="" disabled>Select Province</option>
                    {Object.keys(universitiesData).map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="uni-search-field">
                <label>City / District</label>
                <div className="select-wrapper">
                  <select value={district} onChange={handleDistrictChange} disabled={!province}>
                    <option value="" disabled>Select City</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pakistan Results */}
          <div className="uni-results">
            {isLoading ? (
              <div className="uni-loading">
                <div className="spinner"></div>
                <p>Finding universities...</p>
              </div>
            ) : universities.length === 0 ? (
              <div className="uni-empty">
                <div className="empty-icon">🔍</div>
                <h3>Search for Universities</h3>
                <p>Select a province and city to see available universities</p>
              </div>
            ) : (
              <div className="uni-list-container">
                <div className="uni-list-header">
                  <h2>Universities in {district}</h2>
                  <span className="uni-count">{universities.length} found</span>
                </div>
                <div className="uni-grid">
                  {universities.map((university, index) => (
                    <div key={index} className="uni-card">
                      <div className="uni-card-icon">🏛️</div>
                      <div className="uni-card-content">
                        <h4>{university}</h4>
                        <span className="uni-location">📍 {district}, {province}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* International Search Section */}
      {activeTab === 'international' && (
        <>
          <div className="uni-search-section">
            <h3 className="search-section-title">🌍 Search International Universities</h3>
            <div className="uni-search-grid three-col">
              <div className="uni-search-field">
                <label>Country</label>
                <div className="select-wrapper">
                  <select value={intlCountry} onChange={handleCountryChange}>
                    <option value="" disabled>Select Country</option>
                    {Object.keys(internationalData).map((country) => (
                      <option key={country} value={country}>
                        {internationalData[country].flag} {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="uni-search-field">
                <label>State / Province</label>
                <div className="select-wrapper">
                  <select value={intlState} onChange={handleStateChange} disabled={!intlCountry}>
                    <option value="" disabled>Select State</option>
                    {intlStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="uni-search-field">
                <label>City</label>
                <div className="select-wrapper">
                  <select value={intlCity} onChange={handleCityChange} disabled={!intlState}>
                    <option value="" disabled>Select City</option>
                    {intlCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* International Results */}
          <div className="uni-results">
            {intlLoading ? (
              <div className="uni-loading">
                <div className="spinner"></div>
                <p>Finding universities...</p>
              </div>
            ) : intlUniversities.length === 0 ? (
              <div className="uni-empty">
                <div className="empty-icon">🌍</div>
                <h3>Search International Universities</h3>
                <p>Select a country, state, and city to explore universities worldwide</p>
              </div>
            ) : (
              <div className="uni-list-container">
                <div className="uni-list-header">
                  <h2>
                    {internationalData[intlCountry]?.flag} Universities in {intlCity}
                  </h2>
                  <span className="uni-count">{intlUniversities.length} found</span>
                </div>
                <div className="uni-grid">
                  {intlUniversities.map((university, index) => (
                    <div key={index} className="uni-card intl">
                      <div className="uni-card-icon">🎓</div>
                      <div className="uni-card-content">
                        <h4>{university}</h4>
                        <span className="uni-location">
                          📍 {intlCity}, {intlState}, {intlCountry}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Global Stats Section */}
      <div className="uni-global-section">
        <div className="uni-global-header">
          <h2>🌍 Global Education Leaders</h2>
          <p>Countries with highest percentage of highly educated population</p>
        </div>
        
        <div className="uni-global-content">
          <div className="uni-rankings">
            {topCountries.map((country, idx) => (
              <div key={country.name} className="rank-item">
                <div className="rank-info">
                  <span className="rank-position">#{idx + 1}</span>
                  <span className="rank-flag">{country.flag}</span>
                  <span className="rank-name">{country.name}</span>
                </div>
                <div className="rank-bar-container">
                  <div 
                    className="rank-bar" 
                    style={{ width: `${country.value}%` }}
                  ></div>
                </div>
                <span className="rank-value">{country.value}%</span>
              </div>
            ))}
          </div>
          
          <div className="uni-map">
            <img
  src={worldMap}
  alt="World Map"
/>
          </div>
        </div>
      </div>

      {/* Fee Structure Section */}
      

          {/* Fee Table under the two boxes */}
          <div className="avg-fee-table-section">
            <h3 className="table-heading">Average Fee Structure of National and International Universities by Field</h3>
            <p className="table-subtitle">Tuition fees are presented in PKR for Pakistani universities and reflect average annual ranges.</p>
            <div className="table-wrapper">
              <table className="avg-fee-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Average Government Fee (PKR)</th>
                    <th>Average Private Fee (PKR)</th>
                    <th>Overall Average Fee (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Computer Science</td><td>70,000 – 120,000</td><td>180,000 – 350,000</td><td>120,000 – 250,000</td></tr>
                  <tr><td>Software Engineering</td><td>75,000 – 130,000</td><td>190,000 – 360,000</td><td>130,000 – 260,000</td></tr>
                  <tr><td>Information Technology</td><td>70,000 – 125,000</td><td>180,000 – 340,000</td><td>125,000 – 245,000</td></tr>
                  <tr><td>Commerce / B.Com</td><td>60,000 – 100,000</td><td>150,000 – 300,000</td><td>100,000 – 200,000</td></tr>
                  <tr><td>Business Administration (BBA)</td><td>65,000 – 110,000</td><td>160,000 – 320,000</td><td>110,000 – 210,000</td></tr>
                  <tr><td>Artificial Intelligence</td><td>80,000 – 130,000</td><td>200,000 – 380,000</td><td>130,000 – 270,000</td></tr>
                  <tr><td>Data Science</td><td>80,000 – 130,000</td><td>200,000 – 380,000</td><td>130,000 – 270,000</td></tr>
                  <tr><td>Engineering</td><td>90,000 – 160,000</td><td>220,000 – 450,000</td><td>150,000 – 300,000</td></tr>
                  <tr><td>Medical</td><td>60,000 – 120,000</td><td>900,000 – 1,500,000</td><td>300,000 – 800,000</td></tr>
                  <tr><td>Law</td><td>45,000 – 85,000</td><td>110,000 – 240,000</td><td>75,000 – 160,000</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="avg-fee-table-section">
  
  <p className="table-subtitle">Average tuition fees are shown in USD for international universities and are based on estimated yearly ranges.</p>

  <div className="table-wrapper">
    <table className="avg-fee-table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Average Government University Fee (USD)</th>
          <th>Average Private University Fee (USD)</th>
          <th>Overall Average Fee (USD)</th>
        </tr>
      </thead>

      <tbody>
        <tr><td>Computer Science</td><td>5,000 – 9,000</td><td>12,000 – 25,000</td><td>8,500 – 17,000</td></tr>
        <tr><td>Software Engineering</td><td>5,500 – 9,500</td><td>13,000 – 26,000</td><td>9,000 – 17,500</td></tr>
        <tr><td>Information Technology</td><td>5,000 – 9,000</td><td>12,000 – 24,000</td><td>8,500 – 16,500</td></tr>
        <tr><td>Commerce / Business</td><td>4,500 – 8,000</td><td>11,000 – 22,000</td><td>7,500 – 15,000</td></tr>
        <tr><td>Business Administration (BBA)</td><td>5,000 – 8,500</td><td>12,000 – 24,000</td><td>8,000 – 16,000</td></tr>
        <tr><td>Artificial Intelligence</td><td>6,000 – 10,000</td><td>14,000 – 28,000</td><td>9,500 – 19,000</td></tr>
        <tr><td>Data Science</td><td>6,000 – 10,000</td><td>14,000 – 28,000</td><td>9,500 – 19,000</td></tr>
        <tr><td>Engineering</td><td>6,500 – 11,000</td><td>15,000 – 30,000</td><td>10,000 – 20,500</td></tr>
        <tr><td>Medical</td><td>8,000 – 15,000</td><td>35,000 – 65,000</td><td>18,000 – 40,000</td></tr>
        <tr><td>Law</td><td>5,000 – 8,500</td><td>12,000 – 23,000</td><td>8,000 – 15,500</td></tr>
      </tbody>
    </table>
  </div>
</div>
        
    </div>
  );
}


