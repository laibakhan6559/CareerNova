import React, { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              
              <span className="logo-text">CareerNova</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to continue your career journey</p>
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
                  placeholder="Enter your password"
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
            </div>
            
            {error && (
              <div className="auth-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="btn-spinner"></span>
                  Signing in...
                </span>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup">Create one here</Link>
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
            <div className="deco-logo">🎓</div>
            <h2>CareerNova</h2>
            <p>Your AI-powered career companion for university selection and career guidance.</p>
            <div className="decoration-features">
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <div>
                  <strong>Smart Analysis</strong>
                  <span>Get personalized recommendations</span>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🌍</span>
                <div>
                  <strong>Global Universities</strong>
                  <span>Explore options worldwide</span>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">📊</span>
                <div>
                  <strong>Track Progress</strong>
                  <span>Monitor your career journey</span>
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


