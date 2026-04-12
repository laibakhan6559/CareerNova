import React, { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password validation checks
  const validations = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'/`~]/.test(password),
  };

  const isPasswordValid = Object.values(validations).every(Boolean);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const validCount = Object.values(validations).filter(Boolean).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!isPasswordValid) {
      setError("Please meet all password requirements");
      return;
    }
    
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page signup-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-text">CareerNova</span>
            </div>
            <h1>Create Your Account</h1>
            <p>Join thousands of students planning their future</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label>
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-field">
              <label>
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              <div className="password-strength">
                <div className="strength-bars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={`strength-bar ${validCount >= i ? 'active' : ''}`}
                      style={{ 
                        background: validCount >= i 
                          ? validCount <= 2 ? '#ef4444' 
                          : validCount <= 4 ? '#fbbf24' 
                          : '#22c55e' 
                          : undefined 
                      }}
                    />
                  ))}
                </div>
                <span className="strength-text">
                  {validCount === 0 && "Enter password"}
                  {validCount === 1 && "Very weak"}
                  {validCount === 2 && "Weak"}
                  {validCount === 3 && "Fair"}
                  {validCount === 4 && "Good"}
                  {validCount === 5 && "Strong ✓"}
                </span>
              </div>
            </div>
            
            <div className="form-field">
              <label>
                <span className="label-icon">🔐</span>
                Confirm Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                  className={confirmPassword ? (passwordsMatch ? 'valid-input' : 'invalid-input') : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {confirmPassword && (
                <span className={`match-indicator ${passwordsMatch ? 'valid' : 'invalid'}`}>
                  {passwordsMatch ? "✓ Passwords match" : "✗ Passwords don't match"}
                </span>
              )}
            </div>
            
            <div className="password-requirements">
              <p className="req-title">Password Requirements:</p>
              <div className="req-grid">
                <div className={`req-item ${validations.minLength ? "valid" : ""}`}>
                  <span className="req-icon">{validations.minLength ? "✓" : "○"}</span>
                  8+ characters
                </div>
                <div className={`req-item ${validations.hasUppercase ? "valid" : ""}`}>
                  <span className="req-icon">{validations.hasUppercase ? "✓" : "○"}</span>
                  Uppercase (A-Z)
                </div>
                <div className={`req-item ${validations.hasLowercase ? "valid" : ""}`}>
                  <span className="req-icon">{validations.hasLowercase ? "✓" : "○"}</span>
                  Lowercase (a-z)
                </div>
                <div className={`req-item ${validations.hasNumber ? "valid" : ""}`}>
                  <span className="req-icon">{validations.hasNumber ? "✓" : "○"}</span>
                  Number (0-9)
                </div>
                <div className={`req-item ${validations.hasSpecial ? "valid" : ""}`}>
                  <span className="req-icon">{validations.hasSpecial ? "✓" : "○"}</span>
                  Special (!@#$%)
                </div>
              </div>
            </div>
            
            {error && (
              <div className="auth-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="auth-btn" 
              disabled={loading || !isPasswordValid || !passwordsMatch}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="btn-spinner"></span>
                  Creating account...
                </span>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </div>
        
        <div className="auth-decoration">
          <div className="decoration-bg">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
          <div className="decoration-content">
            <div className="deco-logo">🚀</div>
            <h2>Welcome to CareerNova</h2>
            <p>Your AI-powered career companion for university selection and career guidance.</p>
            <div className="decoration-features">
              <div className="feature">
                <span className="feature-icon">🎓</span>
                <div>
                  <strong>University Finder</strong>
                  <span>Find perfect universities worldwide</span>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">💰</span>
                <div>
                  <strong>Scholarship Search</strong>
                  <span>Discover funding opportunities</span>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">📝</span>
                <div>
                  <strong>Resume Builder</strong>
                  <span>Create professional CVs</span>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🤖</span>
                <div>
                  <strong>AI Guidance</strong>
                  <span>Get personalized recommendations</span>
                </div>
              </div>
            </div>
            <div className="trust-badges">
              <span>🔒 Secure</span>
              <span>⚡ Fast</span>
              <span>💯 Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


