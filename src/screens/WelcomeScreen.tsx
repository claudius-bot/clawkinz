interface WelcomeScreenProps {
  onMember: () => void
  onNewAdoption: () => void
}

export default function WelcomeScreen({ onMember, onNewAdoption }: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      {/* Sky */}
      <div className="welcome-sky">
        <div className="welcome-clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
      </div>

      {/* Hills */}
      <div className="welcome-hills">
        <div className="hill hill-back"></div>
        <div className="hill hill-mid"></div>
        <div className="hill hill-front"></div>
      </div>

      {/* Houses */}
      <div className="welcome-houses">
        <span className="house">🏠</span>
        <span className="house">🏡</span>
        <span className="house">🏘️</span>
        <span className="house">🏰</span>
      </div>

      {/* Main Content */}
      <div className="welcome-content">
        <div className="welcome-logo">
          <div className="logo-text">Clawkinz</div>
          <div className="logo-tagline">Come in and Play!</div>
        </div>

        {/* Cute crabs */}
        <div className="welcome-crabs">
          <span className="crab">🦀</span>
          <span className="crab">🦞</span>
          <span className="crab">🦀</span>
          <span className="crab">🦐</span>
        </div>

        {/* Signpost buttons */}
        <div className="welcome-buttons">
          <div className="signpost-button" onClick={onMember}>
            <div className="signpost-sign">I'M A<br/>MEMBER</div>
            <div className="signpost-pole"></div>
          </div>
          <div className="signpost-button" onClick={onNewAdoption}>
            <div className="signpost-sign">MY FIRST<br/>ADOPTION</div>
            <div className="signpost-pole"></div>
          </div>
        </div>
      </div>

      {/* Flowers */}
      <div className="welcome-flowers">
        <span>🌸</span>
        <span>🌼</span>
        <span>🌺</span>
        <span>🌻</span>
        <span>🌷</span>
        <span>🌸</span>
      </div>
    </div>
  )
}
