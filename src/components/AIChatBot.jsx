import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const suggestedQueries = [
  "What fields can I study after FSc Pre-Medical?",
  "Which universities are best for Computer Science?",
  "How to study abroad from Pakistan?",
  "Top international scholarships for Pakistani students?",
  "Best countries to study abroad?",
  "What is IELTS/TOEFL requirement?",
  "How to choose between Engineering and Medical?",
  "What is the scope of AI and Data Science?",
];

const botResponses = {
  "What fields can I study after FSc Pre-Medical?": `After FSc Pre-Medical, you have many excellent options:

🩺 **Medical Fields:**
- MBBS (Medicine & Surgery)
- BDS (Dental Surgery)  
- Pharm D (Pharmacy)
- DPT (Physical Therapy)
- BS Nursing

🔬 **Science Fields:**
- BS Biotechnology
- BS Microbiology
- BS Biochemistry
- BS Psychology
- BS Nutrition & Dietetics

💡 **Tip:** Use our **Advisor** tool to get personalized recommendations based on your marks!`,

  "Which universities are best for Computer Science?": `Top universities for Computer Science:

🇵🇰 **In Pakistan:**
1. LUMS - Lahore
2. NUST - Islamabad
3. FAST-NUCES - Multiple cities
4. COMSATS - Multiple cities
5. GIKI - Topi

🌍 **Internationally:**
1. MIT (USA)
2. Stanford University (USA)
3. University of Oxford (UK)
4. ETH Zurich (Switzerland)
5. University of Toronto (Canada)

📍 Use our **University Finder** to search by city!`,

  "How to study abroad from Pakistan?": `Complete guide to study abroad from Pakistan:

📋 **Step-by-Step Process:**
1. Choose your destination country
2. Research universities & programs
3. Check admission requirements
4. Prepare for standardized tests (IELTS/SAT/GRE)
5. Apply to universities (6-12 months early)
6. Apply for scholarships
7. Get acceptance letter
8. Apply for student visa

📄 **Documents Required:**
- Academic transcripts
- Passport (valid 6+ months)
- English proficiency test scores
- Statement of Purpose (SOP)
- Letters of Recommendation
- Financial documents

💰 **Estimated Costs:**
- Application fees: $50-150 per university
- Test fees: IELTS ($250), GRE ($220)
- Visa fees: $160-500

🎯 Start preparation at least 1-2 years before intake!`,

  "Top international scholarships for Pakistani students?": `Best scholarships for Pakistani students:

🏆 **Fully Funded Scholarships:**

🇺🇸 **USA:**
- Fulbright Scholarship (Masters/PhD)
- Global UGRAD Program (Undergraduate)

🇬🇧 **UK:**
- Chevening Scholarship (Masters)
- Commonwealth Scholarship
- Gates Cambridge Scholarship

🇦🇺 **Australia:**
- Australia Awards Scholarship
- Endeavour Scholarship

🇨🇳 **China:**
- CSC Scholarship (All levels)
- Confucius Institute Scholarship

🇹🇷 **Turkey:**
- Türkiye Burslari (All levels)

🇭🇺 **Hungary:**
- Stipendium Hungaricum

🇲🇾 **Malaysia:**
- Malaysian International Scholarship

📅 **Deadlines:** Most open Sept-Feb
💡 **Tip:** Apply to multiple scholarships!`,

  "Best countries to study abroad?": `Top destinations for Pakistani students:

🇺🇸 **USA**
- World's best universities
- Vast career opportunities
- Expensive but many scholarships
- OPT work visa available

🇬🇧 **United Kingdom**
- 1-year Masters programs
- Historic universities
- Post-study work visa (2 years)

🇨🇦 **Canada**
- Affordable tuition
- Easy PR pathway
- Safe & welcoming
- 3-year post-study work permit

🇦🇺 **Australia**
- High quality education
- Part-time work allowed
- Permanent residency options

🇩🇪 **Germany**
- FREE tuition (public unis)
- Strong engineering programs
- 18-month job seeker visa

🇨🇳 **China**
- Affordable education
- Many scholarships
- Growing economy

🇲🇾 **Malaysia**
- Low cost of living
- No visa hassle
- English programs available

💡 Choose based on budget, career goals & lifestyle!`,

  "What is IELTS/TOEFL requirement?": `English proficiency test requirements:

📝 **IELTS (International English Language Testing System)**
- Score: 0-9 bands
- Valid: 2 years
- Test fee: ~$250
- Duration: 2 hours 45 mins

**Typical Requirements:**
- Undergraduate: 6.0-6.5
- Masters: 6.5-7.0
- PhD: 7.0-7.5
- Top universities: 7.0+

📝 **TOEFL (Test of English as Foreign Language)**
- Score: 0-120 points
- Valid: 2 years
- Test fee: ~$220
- Duration: 3 hours

**Typical Requirements:**
- Undergraduate: 80-90
- Masters: 90-100
- PhD: 100+

📝 **PTE Academic**
- Score: 10-90
- Faster results (2-5 days)
- Computer-based test

📝 **Duolingo English Test**
- Score: 10-160
- Affordable ($59)
- Accepted by 4000+ universities

💡 **Tips:**
- Practice 2-3 months before
- Take mock tests
- Focus on weak areas
- Book test early!`,

  "How to choose between Engineering and Medical?": `Great question! Consider these factors:

⚙️ **Choose Engineering if:**
- You love Math and Physics
- Enjoy problem-solving & building things
- Interested in technology
- Want diverse career options
- Prefer 4-year degree

🩺 **Choose Medical if:**
- Passionate about helping people
- Strong in Biology & Chemistry
- Can handle 5+ years of study
- Ready for long working hours
- Want stable, respected career

🌍 **International Perspective:**
- Engineering: More global mobility
- Medical: License varies by country
- Tech jobs: Easy remote work
- Medical: Higher local demand

🎯 Use our **AI Advisor** for personalized guidance!`,

  "What is the scope of AI and Data Science?": `AI & Data Science has MASSIVE scope globally!

📈 **Job Growth:** 45% increase expected by 2026

💰 **Salary Range:**
🇵🇰 Pakistan:
- Entry: PKR 80K - 150K/month
- Mid: PKR 200K - 400K/month
- Senior: PKR 500K+/month

🌍 International:
- USA: $80K - $200K/year
- UK: £45K - £120K/year
- Canada: CAD 70K - 150K/year
- Germany: €50K - €100K/year

🔥 **Hot Skills:**
- Machine Learning
- Python & R Programming
- Deep Learning
- NLP (Natural Language Processing)
- Cloud Computing (AWS/Azure)

🏢 **Top Employers:**
Google, Microsoft, Meta, Amazon, Apple, IBM, Tesla, OpenAI

Check **Trending Fields** for more insights!`,

  "What career options do I have with low marks?": `Don't worry! Many successful paths don't require high marks:

✅ **Good Options:**
- Graphic Design / UI-UX Design
- Digital Marketing
- Web Development (skill-based)
- Content Writing / Blogging
- Video Editing / Animation

📚 **Degree Programs:**
- BS Mass Communication
- BS Tourism & Hospitality
- BS Fashion Design
- Associate Degrees
- Diploma Programs

🌍 **International Options:**
- Vocational courses in Germany
- Community colleges in USA/Canada
- Diploma programs in Australia
- Skill-based programs in Malaysia

💪 **Remember:** Skills matter more than marks in many fields!`,

  "Best universities in Lahore for BBA?": `Top BBA Universities in Lahore:

🥇 **Premium:**
1. LUMS (Lahore University of Management Sciences)
2. LSE (Lahore School of Economics)
3. UMT (University of Management & Technology)

⭐ **Excellent:**
4. University of Lahore
5. Superior University
6. FAST School of Business
7. Punjab University

💡 **Factors to Consider:**
- HEC Ranking
- Industry connections
- Internship opportunities
- Campus facilities

🔍 Use **University Finder** to explore more options!`,
};

const defaultResponse = `I can help you with:

🎓 **Career Guidance**
- Field selection based on your background
- Career path recommendations

🏛️ **University Information**  
- Best universities by field
- City-wise university search

🌍 **Study Abroad**
- International scholarships
- Country guides
- Visa & admission process

📊 **Trending Fields**
- High-demand careers
- Global job prospects

💡 Try asking one of the suggested questions, or use our **Advisor** tool for personalized AI recommendations!`;

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! 👋 I'm CareerNova AI Assistant. I can help you with career guidance, universities in Pakistan, and studying abroad. What would you like to know?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (query) => {
    const userMessage = query || inputValue.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = botResponses[userMessage] || defaultResponse;
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <span>✕</span>
        ) : (
          <>
            <span className="chat-icon">🤖</span>
            <span className="chat-badge">AI</span>
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">🤖</div>
                <div>
                  <h4>CareerNova AI</h4>
                  <span className="online-status">● Online</span>
                </div>
              </div>
              <button className="chat-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  className={`chat-message ${msg.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.type === "bot" && <span className="msg-avatar">🤖</span>}
                  <div className="msg-content">
                    <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="chat-message bot">
                  <span className="msg-avatar">🤖</span>
                  <div className="msg-content typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Queries */}
            <div className="chat-suggestions">
              <p>Quick questions:</p>
              <div className="suggestions-list">
                {suggestedQueries.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(query)}
                    className="suggestion-btn"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="chat-input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about careers, universities, study abroad..."
                className="chat-input"
              />
              <button
                onClick={() => handleSend()}
                className="chat-send-btn"
                disabled={!inputValue.trim()}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


