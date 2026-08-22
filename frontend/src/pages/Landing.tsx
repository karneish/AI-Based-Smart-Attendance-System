import { Link, Navigate, useNavigate } from 'react-router-dom'
import { homeForRole, useAuth } from '../auth/AuthContext'
import { Button } from '../components/ui'
import {
  IconArrowRight,
  IconBarChart,
  IconCheckCircle,
  IconFaceScan,
  IconGraduation,
  IconQr,
  IconShield,
  IconSparkles,
} from '../components/Icons'

const FEATURES = [
  {
    icon: <IconQr />,
    title: 'Smart QR Attendance',
    desc: 'Period-wise classroom projector verification with rotating 3-minute tokens — attendance that cannot be spoofed from a hostel bed.',
    points: ['Rotating secure QR tokens', 'Period-wise session tracking', 'Instant absence detection'],
  },
  {
    icon: <IconSparkles />,
    title: 'Personalized Academic Planner',
    desc: 'The intelligent study engine detects your free periods from the timetable and converts them into productive, prioritized study tasks.',
    points: ['Free-period detection', 'AI-prioritized study tasks', 'Assignment & test reminders'],
  },
  {
    icon: <IconBarChart />,
    title: 'Attendance Analytics',
    desc: 'Coordinators get deep section-level insight with shortage warnings long before they become eligibility problems.',
    points: ['Section progress tracking', 'Shortage early warnings', 'Monthly trend reports'],
  },
]

const STATS = [
  { value: '100+', label: 'Students managed' },
  { value: '7', label: 'Periods tracked daily' },
  { value: '3 min', label: 'Secure token rotation' },
  { value: '4', label: 'Role-based portals' },
]

const ROLES = [
  { title: 'Administrator', desc: 'Full control of departments, staff, students, sections & timetables.' },
  { title: 'Attendance Coordinator', desc: 'Institution-wide analytics, section progress & shortage monitoring.' },
  { title: 'Teacher / Faculty', desc: 'One-tap QR sessions, class rosters and subject hubs.' },
  { title: 'Student', desc: 'Scan-to-attend, live attendance percentage & smart planner.' },
]

export default function Landing() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <div className="spinner" />
      </div>
    )
  }

  if (user) {
    return <Navigate to={homeForRole(user.role)} replace />
  }

  return (
    <div className="landing">
      {/* ------------------------------------------------ Navigation */}
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-brand">
            <span className="logo-mark">SA</span>
            <span>
              <span className="landing-brand-title">Smart Academic Companion</span>
              <span className="landing-brand-sub">Institutional College ERP</span>
            </span>
          </Link>
          <nav className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#roles">Portals</a>
          </nav>
          <Button variant="primary" icon={<IconArrowRight />} onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </div>
      </header>

      {/* ------------------------------------------------ Hero */}
      <section className="landing-hero">
        <div className="landing-hero-bg" />
        <div className="landing-hero-inner">
          <span className="academic-year-badge">Academic Year 2026–2027 · Admissions Open</span>
          <h1>
            Smarter attendance.<br />
            <em>Better academic planning.</em>
          </h1>
          <p className="landing-tagline">
            An institutional technology platform built for modern higher education — period-wise projector QR tracking,
            timetable-driven free period detection, and AI-powered study planning in one unified ERP.
          </p>
          <div className="landing-cta-row">
            <Button variant="primary" size="lg" icon={<IconArrowRight />} onClick={() => navigate('/login')}>
              Sign in to Portal
            </Button>
            <a href="#features" className="btn btn-outline btn-lg">
              Explore Features
            </a>
          </div>
          <div className="landing-trust">
            <IconShield />
            <span>JWT-secured access · Role-based portals · Institutional data isolation</span>
          </div>
        </div>

        <div className="landing-stats">
          {STATS.map((s) => (
            <div key={s.label} className="landing-stat">
              <div className="landing-stat-value">{s.value}</div>
              <div className="landing-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Features */}
      <section id="features" className="landing-section">
        <div className="landing-section-head">
          <span className="landing-kicker">Platform Capabilities</span>
          <h2>Everything an institution needs, in one companion</h2>
          <p>
            Purpose-built modules that work together — from the moment a lecturer starts a session to the day analytics
            flag a student at risk.
          </p>
        </div>
        <div className="landing-feature-grid">
          {FEATURES.map((f) => (
            <article key={f.title} className="landing-card">
              <div className="landing-card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <ul>
                {f.points.map((pt) => (
                  <li key={pt}>
                    <IconCheckCircle /> {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Roles */}
      <section id="roles" className="landing-section landing-section-alt">
        <div className="landing-section-head">
          <span className="landing-kicker">Four Portals, One Platform</span>
          <h2>Built for every role on campus</h2>
          <p>Each user sees exactly what they need — nothing more, nothing less.</p>
        </div>
        <div className="landing-role-grid">
          {ROLES.map((r, i) => (
            <article key={r.title} className="landing-role-card">
              <span className="landing-role-num">0{i + 1}</span>
              <div className="landing-role-icon">
                {i === 0 ? <IconGraduation /> : i === 1 ? <IconBarChart /> : i === 2 ? <IconQr /> : <IconFaceScan />}
              </div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Final CTA */}
      <section className="landing-cta">
        <div className="landing-cta-bg" />
        <h2>Ready to modernize your campus?</h2>
        <p>Sign in with your institutional credentials to get started.</p>
        <Button variant="primary" size="lg" icon={<IconArrowRight />} onClick={() => navigate('/login')}>
          Proceed to Sign In
        </Button>
      </section>

      {/* ------------------------------------------------ Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-brand" style={{ opacity: 0.85 }}>
            <span className="logo-mark">SA</span>
            <span>
              <span className="landing-brand-title">Smart Academic Companion</span>
              <span className="landing-brand-sub">Institutional Technology Systems</span>
            </span>
          </div>
          <p>© 2026 Smart Academic Companion · Smarter attendance. Better academic planning.</p>
        </div>
      </footer>
    </div>
  )
}
