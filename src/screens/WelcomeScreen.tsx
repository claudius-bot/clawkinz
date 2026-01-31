interface WelcomeScreenProps {
  onMember: () => void
  onNewAdoption: () => void
}

export default function WelcomeScreen({ onMember, onNewAdoption }: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      {/* Full background image */}
      <div className="welcome-background">
        <img src="/assets/welcome-background.png" alt="" className="bg-image" />
      </div>
      
      {/* Content overlay */}
      <div className="welcome-content">
        {/* Logo */}
        <div className="logo-container">
          <img src="/assets/logo.png" alt="Clawkinz" className="main-logo" />
          <img src="/assets/banner-tagline.png" alt="Come in and Play!" className="tagline-banner" />
        </div>
        
        {/* Characters */}
        <div className="characters-row">
          <img src="/assets/crab-character.png" alt="Crab friend" className="welcome-crab crab-left" />
          <img src="/assets/crab-walking.png" alt="Crab friend" className="welcome-crab crab-right" />
        </div>
        
        {/* Signpost buttons */}
        <div className="signposts">
          <button className="signpost-btn" onClick={onMember}>
            <img src="/assets/signpost-login.png" alt="Login" />
            <span className="signpost-text">I'M A MEMBER</span>
          </button>
          <button className="signpost-btn" onClick={onNewAdoption}>
            <img src="/assets/signpost-register.png" alt="Register" />
            <span className="signpost-text">MY FIRST ADOPTION</span>
          </button>
        </div>
        
        {/* Bottom navigation buttons */}
        <div className="bottom-nav">
          <button className="nav-pill">
            <span className="nav-icon">📖</span>
            <span>COLLECTIONS CATALOG</span>
          </button>
          <button className="nav-pill">
            <span className="nav-icon">📷</span>
            <span>TAKE A TOUR</span>
          </button>
          <button className="nav-pill">
            <span className="nav-icon">🏪</span>
            <span>STORE LOCATOR</span>
          </button>
        </div>
        
        {/* Footer */}
        <footer className="welcome-footer">
          <p>Clawkinz World is where your plush Clawdbot comes to life!</p>
          <p className="copyright">© 2026 CLAWDBOT • Patent Pending</p>
        </footer>
      </div>
    </div>
  )
}
