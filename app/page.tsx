export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --sand: #C8A97E; --sand-light: #E8D5B7; --sand-pale: #F5ECD8;
          --sand-dark: #8B6E4E; --sand-deep: #5C4730;
          --ink: #2A1F14; --ink-muted: #6B5840; --cream: #FAF5EC; --warm-white: #FFFDF8;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); overflow-x:hidden; }

        nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:1.25rem 3rem; background:rgba(255,253,248,0.92); backdrop-filter:blur(14px); border-bottom:1px solid rgba(232,213,183,0.4); }
        .nav-logo { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:300; color:var(--ink); letter-spacing:.05em; text-decoration:none; }
        .nav-links { display:flex; gap:2rem; list-style:none; }
        .nav-links a { font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-muted); text-decoration:none; transition:color .2s; }
        .nav-links a:hover { color:var(--sand-dark); }
        .nav-cta { padding:.6rem 1.5rem; background:var(--ink); color:var(--sand-pale); border:none; font-family:'DM Sans',sans-serif; font-size:.78rem; letter-spacing:.08em; cursor:pointer; transition:background .3s; border-radius:2px; text-decoration:none; }
        .nav-cta:hover { background:var(--sand-deep); }

        .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; padding:8rem 2rem 6rem; background:var(--warm-white); overflow:hidden; }
        .mycelium-bg { position:absolute; inset:0; width:100%; height:100%; opacity:.07; }
        .logo-mark { width:80px; height:80px; margin-bottom:2.5rem; animation:breathe 4s ease-in-out infinite; }
        @keyframes breathe { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.04);opacity:1} }
        .hero-eyebrow { font-size:11px; font-weight:500; letter-spacing:.25em; text-transform:uppercase; color:var(--sand); margin-bottom:1.5rem; }
        .hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(3.5rem,9vw,7rem); font-weight:300; line-height:1.05; text-align:center; color:var(--ink); margin-bottom:1.75rem; }
        .hero-title em { font-style:italic; color:var(--sand-dark); }
        .hero-subtitle { font-size:1.1rem; font-weight:300; color:var(--ink-muted); max-width:560px; text-align:center; line-height:1.8; margin-bottom:1.25rem; }
        .hero-tagline { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-style:italic; color:var(--sand-dark); margin-bottom:3rem; text-align:center; }
        .hero-cta { display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; }
        .btn-primary { padding:.9rem 2.25rem; background:var(--ink); color:var(--sand-pale); border:none; font-family:'DM Sans',sans-serif; font-size:.875rem; letter-spacing:.06em; cursor:pointer; transition:background .3s; border-radius:2px; }
        .btn-primary:hover { background:var(--sand-deep); }
        .btn-secondary { padding:.9rem 2.25rem; background:transparent; color:var(--ink-muted); border:1px solid var(--sand-light); font-family:'DM Sans',sans-serif; font-size:.875rem; letter-spacing:.06em; cursor:pointer; transition:all .3s; border-radius:2px; }
        .btn-secondary:hover { border-color:var(--sand); color:var(--sand-dark); }
        .scroll-hint { position:absolute; bottom:2.5rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:.5rem; color:var(--sand); font-size:10px; letter-spacing:.2em; text-transform:uppercase; animation:fadeDown 2.5s ease-in-out infinite; }
        @keyframes fadeDown { 0%,100%{opacity:.4;transform:translateX(-50%) translateY(0)} 50%{opacity:.8;transform:translateX(-50%) translateY(5px)} }

        .manifesto { background:var(--ink); padding:4rem 2rem; text-align:center; }
        .manifesto-text { font-family:'Cormorant Garamond',serif; font-size:clamp(1.4rem,3vw,2.2rem); font-weight:300; font-style:italic; color:var(--sand-light); max-width:820px; margin:0 auto; line-height:1.6; }

        .section { padding:7rem 2rem; max-width:1100px; margin:0 auto; }
        .section-label { font-size:10px; letter-spacing:.3em; text-transform:uppercase; color:var(--sand); margin-bottom:1rem; font-weight:500; }
        .section-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.2rem,4vw,3.5rem); font-weight:300; color:var(--ink); line-height:1.15; margin-bottom:1.5rem; }
        .section-title em { font-style:italic; color:var(--sand-dark); }
        .section-body { font-size:1rem; color:var(--ink-muted); line-height:1.85; max-width:560px; }
        .divider { width:40px; height:1px; background:var(--sand-light); margin:2rem 0; }

        .roles-section { background:var(--warm-white); padding:7rem 0; }
        .roles-inner { max-width:1100px; margin:0 auto; padding:0 2rem; }
        .roles-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:3.5rem; background:var(--sand-light); }
        .role-card { background:var(--warm-white); padding:2.75rem; transition:background .3s; }
        .role-card:hover { background:var(--sand-pale); }
        .role-badge { display:inline-block; padding:.25rem .8rem; border:1px solid var(--sand-light); border-radius:20px; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--sand-dark); margin-bottom:1.75rem; }
        .role-icon { width:52px; height:52px; margin-bottom:1.5rem; }
        .role-name { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:400; color:var(--ink); margin-bottom:.75rem; }
        .role-desc { font-size:.875rem; color:var(--ink-muted); line-height:1.75; margin-bottom:1.75rem; }
        .role-traits { list-style:none; display:flex; flex-direction:column; gap:.6rem; }
        .role-traits li { font-size:.8rem; color:var(--sand-dark); display:flex; align-items:center; gap:.6rem; }
        .role-traits li::before { content:''; width:4px; height:4px; background:var(--sand); border-radius:50%; flex-shrink:0; }
        .election-note { margin-top:2.5rem; padding:1.5rem 2rem; border-left:2px solid var(--sand-light); font-size:.875rem; color:var(--ink-muted); line-height:1.75; font-style:italic; }

        .features-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:3.5rem; margin-top:4rem; }
        .feature-item { display:flex; flex-direction:column; gap:.75rem; }
        .feature-num { font-family:'Cormorant Garamond',serif; font-size:2.8rem; font-weight:300; color:var(--sand-light); line-height:1; }
        .feature-title { font-size:1rem; font-weight:500; color:var(--ink); }
        .feature-desc { font-size:.875rem; color:var(--ink-muted); line-height:1.75; }

        .treasury-section { background:var(--ink); padding:7rem 2rem; }
        .treasury-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:7rem; align-items:center; }
        .treasury-section .section-label { color:var(--sand); }
        .treasury-section .section-title { color:var(--sand-pale); }
        .treasury-section .section-body { color:#9A8570; }
        .treasury-section .divider { background:#3A2E22; }
        .treasury-visual { display:flex; flex-direction:column; gap:1rem; }
        .vote-item { background:rgba(200,169,126,.06); border:1px solid rgba(200,169,126,.15); border-radius:4px; padding:1.25rem 1.5rem; display:flex; flex-direction:column; gap:.75rem; }
        .vote-header { display:flex; justify-content:space-between; align-items:flex-start; }
        .vote-project { font-size:.875rem; font-weight:500; color:var(--sand-light); }
        .vote-meta-info { font-size:.72rem; color:#6B5840; margin-top:2px; }
        .vote-amount { font-family:'Cormorant Garamond',serif; font-size:1.1rem; color:var(--sand); }
        .vote-bar-track { height:3px; background:rgba(200,169,126,.15); border-radius:2px; overflow:hidden; }
        .vote-bar-fill { height:100%; background:var(--sand); border-radius:2px; }
        .vote-meta { display:flex; justify-content:space-between; font-size:.72rem; color:#6B5840; }

        .profiles-row { display:flex; flex-wrap:wrap; gap:1rem; margin-top:3rem; }
        .profile-card { background:var(--warm-white); border:1px solid var(--sand-light); border-radius:4px; padding:1.25rem; display:flex; flex-direction:column; gap:.5rem; flex:1; min-width:180px; max-width:240px; transition:border-color .3s; }
        .profile-card:hover { border-color:var(--sand); }
        .profile-avatar { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:1rem; color:var(--warm-white); }
        .profile-name { font-size:.875rem; font-weight:500; color:var(--ink); }
        .profile-role-tag { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--sand-dark); }
        .profile-skills { display:flex; flex-wrap:wrap; gap:4px; margin-top:.25rem; }
        .skill-pill { font-size:10px; padding:2px 8px; background:var(--sand-pale); color:var(--sand-deep); border-radius:20px; }

        .x-section { background:var(--sand-pale); padding:7rem 2rem; }
        .x-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:7rem; align-items:center; }
        .tweet-mockup { background:var(--warm-white); border:1px solid var(--sand-light); border-radius:8px; padding:1.75rem; display:flex; flex-direction:column; gap:1rem; }
        .tweet-header { display:flex; align-items:center; gap:.75rem; }
        .tweet-avatar { width:38px; height:38px; border-radius:50%; background:var(--sand); display:flex; align-items:center; justify-content:center; font-size:.8rem; color:var(--warm-white); font-weight:500; flex-shrink:0; }
        .tweet-author { font-size:.875rem; font-weight:500; color:var(--ink); }
        .tweet-handle { font-size:.75rem; color:var(--ink-muted); }
        .tweet-body { font-size:.9rem; color:var(--ink); line-height:1.65; }
        .tweet-proposal-tag { display:inline-block; padding:.2rem .6rem; background:var(--sand-pale); border:1px solid var(--sand-light); border-radius:3px; font-size:.75rem; color:var(--sand-dark); font-weight:500; }
        .tweet-actions { display:flex; gap:1.5rem; padding-top:.75rem; border-top:1px solid var(--sand-light); flex-wrap:wrap; }
        .tweet-action { font-size:.8rem; color:var(--ink-muted); display:flex; align-items:center; gap:.35rem; cursor:pointer; transition:color .2s; text-decoration:none; }
        .tweet-action:hover { color:var(--sand-dark); }
        .tweet-action-highlight { color:var(--sand-dark); font-weight:500; }

        .cta-section { background:var(--ink); padding:7rem 2rem; text-align:center; display:flex; flex-direction:column; align-items:center; gap:2rem; }

        footer { background:#1A120A; padding:3.5rem 2rem; display:flex; flex-direction:column; align-items:center; gap:.75rem; }
        .footer-logo { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:300; color:var(--sand-pale); letter-spacing:.05em; }
        .footer-sub { font-size:.72rem; color:#4A3828; letter-spacing:.12em; text-transform:uppercase; }
        .footer-quote { font-size:.85rem; color:#3A2E22; font-style:italic; margin-top:.5rem; max-width:520px; text-align:center; line-height:1.6; }
        .footer-author { font-size:.72rem; color:#3A2E22; }

        @media(max-width:768px) {
          nav { padding:1rem 1.5rem; }
          .nav-links { display:none; }
          .roles-grid { grid-template-columns:1fr; }
          .features-grid { grid-template-columns:1fr; }
          .treasury-inner { grid-template-columns:1fr; gap:3rem; }
          .x-inner { grid-template-columns:1fr; gap:3rem; }
          .profile-card { max-width:100%; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">Mycorhiziens</a>
        <ul className="nav-links">
          <li><a href="#roles">Rôles</a></li>
          <li><a href="/projets">Projets</a></li>
          <li><a href="/reseau">Réseau</a></li>
          <li><a href="/tresorerie">Trésorerie</a></li>
        </ul>
        <a href="/auth" className="nav-cta">Rejoindre</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <svg className="mycelium-bg" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g stroke="#8B6E4E" strokeWidth="0.8" fill="none">
            <line x1="720" y1="450" x2="280" y2="180"/><line x1="720" y1="450" x2="1100" y2="200"/>
            <line x1="720" y1="450" x2="1280" y2="500"/><line x1="720" y1="450" x2="960" y2="720"/>
            <line x1="720" y1="450" x2="420" y2="750"/><line x1="720" y1="450" x2="120" y2="600"/>
            <line x1="280" y1="180" x2="100" y2="70"/><line x1="280" y1="180" x2="420" y2="90"/>
            <line x1="1100" y1="200" x2="1260" y2="90"/><line x1="1100" y1="200" x2="940" y2="70"/>
            <line x1="960" y1="720" x2="1140" y2="840"/><line x1="420" y1="750" x2="240" y2="860"/>
          </g>
          <g fill="#8B6E4E">
            <circle cx="720" cy="450" r="6"/>
            <circle cx="280" cy="180" r="3.5"/><circle cx="1100" cy="200" r="3.5"/>
            <circle cx="1280" cy="500" r="3.5"/><circle cx="960" cy="720" r="3.5"/>
            <circle cx="420" cy="750" r="3.5"/><circle cx="120" cy="600" r="3.5"/>
            <circle cx="100" cy="70" r="2.5"/><circle cx="420" cy="90" r="2.5"/><circle cx="940" cy="70" r="2.5"/>
          </g>
        </svg>

        <svg className="logo-mark" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="5" fill="#8B6E4E"/>
          <g stroke="#8B6E4E" strokeWidth="1.4" fill="none">
            <line x1="40" y1="35" x2="40" y2="8"/><line x1="40" y1="45" x2="40" y2="72"/>
            <line x1="35" y1="40" x2="8" y2="40"/><line x1="45" y1="40" x2="72" y2="40"/>
            <line x1="36.5" y1="36.5" x2="17" y2="17"/><line x1="43.5" y1="43.5" x2="63" y2="63"/>
            <line x1="43.5" y1="36.5" x2="63" y2="17"/><line x1="36.5" y1="43.5" x2="17" y2="63"/>
          </g>
          <g fill="#C8A97E" opacity="0.75">
            <circle cx="40" cy="8" r="3"/><circle cx="40" cy="72" r="3"/>
            <circle cx="8" cy="40" r="3"/><circle cx="72" cy="40" r="3"/>
            <circle cx="17" cy="17" r="2.5"/><circle cx="63" cy="63" r="2.5"/>
            <circle cx="63" cy="17" r="2.5"/><circle cx="17" cy="63" r="2.5"/>
          </g>
        </svg>

        <p className="hero-eyebrow">Création d&apos;une société consciente</p>
        <h1 className="hero-title">Les <em>Mycorhiziens</em></h1>
        <p className="hero-subtitle">Comme le mycélium relie les arbres d&apos;une forêt, nous relions des humains engagés pour agir ensemble — là où chacun est le plus utile.</p>
        <p className="hero-tagline">« Chaque être humain possède en lui du génie. »</p>
        <div className="hero-cta">
          <a href="/auth" className="btn-primary">Rejoindre le réseau</a>
          <button className="btn-secondary">En savoir plus</button>
        </div>
        <div className="scroll-hint">
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M6 1v16M1 11l5 6 5-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Découvrir
        </div>
      </section>

      {/* MANIFESTO */}
      <div className="manifesto">
        <p className="manifesto-text">« Le monde ne changera pas par une révolution soudaine — mais par un réseau silencieux et profond, comme les racines sous une forêt. »</p>
      </div>

      {/* ROLES */}
      <section className="roles-section" id="roles">
        <div className="roles-inner">
          <p className="section-label">Les 3 catégories</p>
          <h2 className="section-title">Chacun là où il est <em>le plus puissant</em></h2>
          <p className="section-body">La communauté reconnaît et élit votre rôle selon vos forces naturelles. Vous indiquez votre préférence, le réseau valide. Un badge provisoire, puis définitif — et toujours évolutif.</p>
          <div className="roles-grid">
            <div className="role-card">
              <div className="role-badge">Catégorie 01</div>
              <svg className="role-icon" viewBox="0 0 52 52" fill="none">
                <rect x="8" y="30" width="9" height="16" rx="1" fill="#C8A97E" opacity="0.3"/>
                <rect x="22" y="22" width="9" height="24" rx="1" fill="#C8A97E" opacity="0.6"/>
                <rect x="36" y="12" width="9" height="34" rx="1" fill="#8B6E4E"/>
                <path d="M11 28 L25 20 L39 10" stroke="#C8A97E" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h3 className="role-name">Travailleur</h3>
              <p className="role-desc">L&apos;ossature du réseau. Ceux qui concrétisent les projets, appliquent les décisions et font avancer les choses sur le terrain.</p>
              <ul className="role-traits">
                <li>Exécution et fiabilité</li>
                <li>Compétences techniques ou manuelles</li>
                <li>Suivi et reporting des projets</li>
              </ul>
            </div>
            <div className="role-card">
              <div className="role-badge">Catégorie 02</div>
              <svg className="role-icon" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="22" r="12" stroke="#8B6E4E" strokeWidth="1.5" fill="none"/>
                <path d="M16 22 Q26 8 36 22 Q26 36 16 22Z" fill="#C8A97E" opacity="0.4"/>
                <circle cx="26" cy="22" r="3.5" fill="#8B6E4E"/>
                <path d="M26 34 L26 46" stroke="#C8A97E" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 44 L26 46 L32 44" stroke="#C8A97E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="role-name">Créateur</h3>
              <p className="role-desc">Les poumons du réseau. Ils génèrent les idées, proposent des projets, créent du contenu et insufflent de l&apos;élan dans la communauté.</p>
              <ul className="role-traits">
                <li>Idéation et propositions de projets</li>
                <li>Communication et création de contenu</li>
                <li>Innovation et vision long terme</li>
              </ul>
            </div>
            <div className="role-card">
              <div className="role-badge">Catégorie 03</div>
              <svg className="role-icon" viewBox="0 0 52 52" fill="none">
                <polygon points="26,5 33,20 48,20 36,30 40,45 26,35 12,45 16,30 4,20 19,20" fill="#C8A97E" opacity="0.3" stroke="#8B6E4E" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="26" cy="25" r="5.5" fill="#8B6E4E"/>
              </svg>
              <h3 className="role-name">Leader</h3>
              <p className="role-desc">La direction du réseau. Élus par la communauté, ils ont un poids de vote renforcé et supervisent l&apos;exécution des projets validés collectivement.</p>
              <ul className="role-traits">
                <li>Vote à impact renforcé</li>
                <li>Supervision des opérations</li>
                <li>Élu et réévalué par la communauté</li>
              </ul>
            </div>
          </div>
          <div className="election-note">
            Les badges sont attribués provisoirement à l&apos;inscription selon vos préférences, puis confirmés ou ajustés par vote communautaire. Un rôle peut toujours évoluer — le réseau grandit avec vous.
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="projets">
        <p className="section-label">La plateforme</p>
        <h2 className="section-title">Un écosystème complet <em>pour agir</em></h2>
        <div className="divider"></div>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-num">01</span>
            <h3 className="feature-title">Propositions de projets</h3>
            <p className="feature-desc">Tout membre peut soumettre un projet humanitaire. La communauté débat, vote, et alloue les ressources. Les Leaders coordonnent l&apos;exécution et le suivi.</p>
          </div>
          <div className="feature-item">
            <span className="feature-num">02</span>
            <h3 className="feature-title">Trésorerie décentralisée</h3>
            <p className="feature-desc">Les dons affluent dans une trésorerie crypto transparente. Chaque membre vote sur l&apos;allocation des fonds. Chaque dépense est visible et traçable.</p>
          </div>
          <div className="feature-item">
            <span className="feature-num">03</span>
            <h3 className="feature-title">Réseau de compétences</h3>
            <p className="feature-desc">Un annuaire vivant de profils avec compétences, localisation et disponibilités. Trouvez un collaborateur, lancez un groupe de travail, construisez ensemble.</p>
          </div>
          <div className="feature-item">
            <span className="feature-num">04</span>
            <h3 className="feature-title">Votes & gouvernance</h3>
            <p className="feature-desc">Un système de vote pondéré par rôle. Les Leaders ont plus de poids, mais chaque voix compte. La démocratie participative au service de l&apos;action collective.</p>
          </div>
        </div>
      </section>

      {/* TREASURY */}
      <section className="treasury-section">
        <div className="treasury-inner">
          <div>
            <p className="section-label">Trésorerie</p>
            <h2 className="section-title">La communauté <em>décide</em>, les Leaders <em>agissent</em></h2>
            <div className="divider"></div>
            <p className="section-body">Les dons sont collectés en crypto, la trésorerie est publique. Vous votez sur chaque projet. Les Leaders s&apos;occupent du suivi et du reporting.</p>
          </div>
          <div className="treasury-visual">
            <div className="vote-item">
              <div className="vote-header">
                <div><div className="vote-project">Achat terrain — Provence</div><div className="vote-meta-info">Proposé par @karim.l · Leader</div></div>
                <div className="vote-amount">12 000 €</div>
              </div>
              <div className="vote-bar-track"><div className="vote-bar-fill" style={{width:'84%'}}></div></div>
              <div className="vote-meta"><span>84% pour</span><span>218 votes</span></div>
            </div>
            <div className="vote-item">
              <div className="vote-header">
                <div><div className="vote-project">Bibliothèque mobile — Lyon</div><div className="vote-meta-info">Proposé par @clara.m · Créateur</div></div>
                <div className="vote-amount">850 €</div>
              </div>
              <div className="vote-bar-track"><div className="vote-bar-fill" style={{width:'91%'}}></div></div>
              <div className="vote-meta"><span>91% pour</span><span>203 votes</span></div>
            </div>
            <div className="vote-item">
              <div className="vote-header">
                <div><div className="vote-project">Formation numérique — Dakar</div><div className="vote-meta-info">Proposé par @ibrahim.d · Créateur</div></div>
                <div className="vote-amount">1 200 €</div>
              </div>
              <div className="vote-bar-track"><div className="vote-bar-fill" style={{width:'54%'}}></div></div>
              <div className="vote-meta"><span>54% pour · vote en cours</span><span>98 votes</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section className="section" id="reseau">
        <p className="section-label">Le réseau</p>
        <h2 className="section-title">Des humains, des compétences, <em>une direction</em></h2>
        <p className="section-body">Chaque membre dispose d&apos;un profil avec ses compétences, sa localisation et ses disponibilités. Collaborez, proposez, construisez — ensemble.</p>
        <div className="profiles-row">
          {[
            {i:'KL',c:'#8B6E4E',n:'Karim L.',r:'⬡ Leader · Paris',s:['Stratégie','Finance','Agriculture']},
            {i:'SM',c:'#C8A97E',n:'Sofia M.',r:'✦ Créateur · Lyon',s:['Design','Vidéo','UX']},
            {i:'AT',c:'#5C4730',n:'Amine T.',r:'◆ Travailleur · Marseille',s:['Dev web','Blockchain']},
            {i:'LB',c:'#A0856A',n:'Lucie B.',r:'✦ Créateur · Bordeaux',s:['Rédaction','Comm','Photo']},
          ].map(m => (
            <div key={m.n} className="profile-card">
              <div className="profile-avatar" style={{background:m.c}}>{m.i}</div>
              <div className="profile-name">{m.n}</div>
              <div className="profile-role-tag">{m.r}</div>
              <div className="profile-skills">{m.s.map(s=><span key={s} className="skill-pill">{s}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* X SECTION */}
      <section className="x-section">
        <div className="x-inner">
          <div>
            <p className="section-label">Intégration X (Twitter)</p>
            <h2 className="section-title"><em>Postez</em> votre idée, la communauté vote</h2>
            <div className="divider"></div>
            <p className="section-body">Publiez votre proposition sur X avec le hashtag <strong>#PropositionMyco</strong>, déposez le lien sur la plateforme. La discussion se fait là où vous êtes. Les votes aussi.</p>
          </div>
          <div className="tweet-mockup">
            <div className="tweet-header">
              <div className="tweet-avatar">CL</div>
              <div><div className="tweet-author">Charles L.</div><div className="tweet-handle">@charles.myco · Créateur</div></div>
            </div>
            <div className="tweet-body">
              <span className="tweet-proposal-tag">#PropositionMyco</span><br/><br/>
              Idée : achat collectif d&apos;un terrain de 2ha en Occitanie pour notre premier potager communautaire. Budget : 8 000€. On cultive, on régénère, on nourrit. 🌱
            </div>
            <div className="tweet-actions">
              <span className="tweet-action">♡ 147 pour</span>
              <span className="tweet-action">💬 Commenter sur X</span>
              <span className="tweet-action tweet-action-highlight">→ Voir sur la plateforme</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="rejoindre">
        <p className="section-label" style={{color:'var(--sand)'}}>Rejoindre</p>
        <h2 className="section-title" style={{color:'var(--sand-pale)',textAlign:'center'}}>Prêt à rejoindre <em>le réseau</em> ?</h2>
        <p className="section-body" style={{color:'#9A8570',textAlign:'center',maxWidth:'460px'}}>Indiquez vos compétences et votre préférence de rôle. La communauté vous accueille et vous attribue votre place dans le mycélium humain.</p>
        <div className="hero-cta">
          <button className="btn-primary">Créer mon profil</button>
          <button className="btn-secondary" style={{borderColor:'#3A2E22',color:'#9A8570'}}>Lire le manifeste</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Mycorhiziens</div>
        <div className="footer-sub">Création d&apos;une société consciente · Francophone</div>
        <div className="footer-quote">« En étant inclusifs, nous pourrons vivre en harmonie avec nous-même et notre environnement. Le mouvement Mycorhizien est pour créer une société qui dit OUI à la vie. »</div>
        <div className="footer-author">— Charles Ledoux, fondateur</div>
      </footer>
    </>
  );
}