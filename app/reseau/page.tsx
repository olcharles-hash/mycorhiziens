'use client';
import { useState } from 'react';

const members = [
  {
    id:'m1', name:'Karim L.', initials:'KL', color:'#8B6E4E',
    role:'Leader', city:'Paris', country:'France', available:true,
    bio:'Stratège et coordinateur de projets depuis 10 ans. Passionné par l\'agriculture régénérative et la gouvernance décentralisée. A mené 3 acquisitions foncières collectives.',
    skills:['Stratégie','Finance','Agriculture','Foncier','ONG'],
    projects:['Achat terrain — Occitanie','Potager collectif — Sahel'],
    joined:'Jan 2025', contributions:12,
    domaines:['terrain','social'],
  },
  {
    id:'m2', name:'Sofia M.', initials:'SM', color:'#C8A97E',
    role:'Créateur', city:'Lyon', country:'France', available:true,
    bio:'Réalisatrice et designer UX. Produit le contenu éducatif de la communauté — vidéos, visuels, documentation. 4 ans d\'expérience en production de contenu en ligne.',
    skills:['Design','Vidéo','Montage','UX','Communication'],
    projects:['Chaîne YouTube — Saison 1','Bibliothèque mobile — Lyon'],
    joined:'Jan 2025', contributions:8,
    domaines:['education'],
  },
  {
    id:'m3', name:'Amine T.', initials:'AT', color:'#5C4730',
    role:'Travailleur', city:'Marseille', country:'France', available:false,
    bio:'Développeur blockchain et maraîcher. Double casquette tech et terrain. Spécialisé en permaculture et régénération des sols. Forme des jeunes au Web3 en Afrique.',
    skills:['Dev web','Blockchain','Permaculture','Maraîchage','Web3'],
    projects:['Achat terrain — Occitanie','Formation numérique — Dakar'],
    joined:'Fév 2025', contributions:6,
    domaines:['terrain','education'],
  },
  {
    id:'m4', name:'Lucie B.', initials:'LB', color:'#A0856A',
    role:'Créateur', city:'Bordeaux', country:'France', available:true,
    bio:'Rédactrice, photographe et coordinatrice de projets culturels. A monté la bibliothèque mobile de Lyon de A à Z. Passionnée par l\'accès à la culture et à l\'éducation.',
    skills:['Rédaction','Photo','Comm','Logistique','Curation'],
    projects:['Bibliothèque mobile — Lyon','Chaîne YouTube — Saison 1'],
    joined:'Jan 2025', contributions:9,
    domaines:['education','social'],
  },
  {
    id:'m5', name:'Ibrahim D.', initials:'IB', color:'#6B5840',
    role:'Créateur', city:'Dakar', country:'Sénégal', available:true,
    bio:'Naturopathe depuis 8 ans. A fondé 2 centres de santé holistique à Dakar. Porteur du projet Hôpital du Bonheur — une vision de la médecine qui traite la source.',
    skills:['Naturopathie','Médecine holistique','Gestion','Web3','Formation'],
    projects:['Hôpital du Bonheur — Pilote','Formation numérique — Dakar'],
    joined:'Mars 2025', contributions:4,
    domaines:['sante','education'],
  },
  {
    id:'m6', name:'Marie C.', initials:'MC', color:'#8B6E4E',
    role:'Travailleur', city:'Toulouse', country:'France', available:true,
    bio:'Ingénieure agronome spécialisée en agroécologie. Accompagne des fermes en transition vers des pratiques régénératives. Passionnée par la souveraineté alimentaire.',
    skills:['Agronomie','Agroécologie','Formation','Terrain','Biologie des sols'],
    projects:['Achat terrain — Occitanie'],
    joined:'Avr 2025', contributions:3,
    domaines:['terrain'],
  },
  {
    id:'m7', name:'Thomas R.', initials:'TR', color:'#C8A97E',
    role:'Leader', city:'Montpellier', country:'France', available:false,
    bio:'Entrepreneur social et ancien banquier. Comprend les deux mondes — la finance traditionnelle et la crypto. Aide la communauté à structurer sa trésorerie décentralisée.',
    skills:['Finance','Crypto','Gouvernance','Droit','Entrepreneuriat'],
    projects:['Potager collectif — Sahel'],
    joined:'Mars 2025', contributions:5,
    domaines:['social','terrain'],
  },
  {
    id:'m8', name:'Aïcha N.', initials:'AN', color:'#5C4730',
    role:'Créateur', city:'Abidjan', country:'Côte d\'Ivoire', available:true,
    bio:'Journaliste et militante pour l\'éducation en Afrique de l\'Ouest. Crée des ponts entre les communautés locales et le mouvement Mycorhizien.',
    skills:['Journalisme','Communication','Réseaux','Afrique','Éducation'],
    projects:['Formation numérique — Dakar'],
    joined:'Avr 2025', contributions:2,
    domaines:['education','social'],
  },
];

const roles = ['tous','Leader','Créateur','Travailleur'];
const domaines = ['tous','terrain','education','sante','social'];

export default function ReseauPage() {
  const [activeRole, setActiveRole] = useState('tous');
  const [activeDomaine, setActiveDomaine] = useState('tous');
  const [activeAvail, setActiveAvail] = useState('tous');
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<typeof members[0]|null>(null);

  const filtered = members.filter(m => {
    const okRole = activeRole === 'tous' || m.role === activeRole;
    const okDomaine = activeDomaine === 'tous' || m.domaines.includes(activeDomaine);
    const okAvail = activeAvail === 'tous' || (activeAvail === 'dispo' ? m.available : !m.available);
    const okSearch = search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) || m.city.toLowerCase().includes(search.toLowerCase());
    return okRole && okDomaine && okAvail && okSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root{--sand:#C8A97E;--sand-light:#E8D5B7;--sand-pale:#F5ECD8;--sand-dark:#8B6E4E;--sand-deep:#5C4730;--ink:#2A1F14;--ink-muted:#6B5840;--cream:#FAF5EC;--warm-white:#FFFDF8;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);}
        .rnav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(255,253,248,0.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(232,213,183,0.4);}
        .rnav-logo{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:300;color:var(--ink);text-decoration:none;letter-spacing:.05em;}
        .rnav-links{display:flex;gap:2rem;list-style:none;}
        .rnav-links a{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);text-decoration:none;}
        .rnav-links a:hover,.rnav-links a.active{color:var(--sand-dark);}
        .rnav-cta{padding:.6rem 1.5rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:2px;text-decoration:none;}

        .page-header{padding:9rem 3rem 3rem;background:var(--warm-white);border-bottom:1px solid var(--sand-light);}
        .page-header-inner{max-width:1200px;margin:0 auto;}
        .page-eyebrow{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--sand);margin-bottom:1rem;font-weight:500;}
        .page-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:300;color:var(--ink);line-height:1.1;margin-bottom:1rem;}
        .page-title em{font-style:italic;color:var(--sand-dark);}
        .page-subtitle{font-size:.95rem;color:var(--ink-muted);line-height:1.7;max-width:520px;}

        .stats-bar{background:var(--ink);padding:1.25rem 3rem;}
        .stats-inner{max-width:1200px;margin:0 auto;display:flex;gap:3rem;align-items:center;}
        .stat-item{display:flex;flex-direction:column;gap:.2rem;}
        .stat-num{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:300;color:var(--sand-light);}
        .stat-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6B5840;}
        .stat-div{width:1px;height:36px;background:#3A2E22;}

        .filters-bar{padding:1.5rem 3rem;background:var(--warm-white);border-bottom:1px solid var(--sand-light);position:sticky;top:67px;z-index:50;}
        .filters-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;}
        .filter-group{display:flex;gap:.5rem;align-items:center;}
        .filter-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand);font-weight:500;}
        .fbtn{padding:.4rem .9rem;border:1px solid var(--sand-light);background:transparent;color:var(--ink-muted);font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:20px;transition:all .2s;}
        .fbtn:hover,.fbtn.active{background:var(--ink);color:var(--sand-pale);border-color:var(--ink);}
        .filter-sep{width:1px;height:20px;background:var(--sand-light);}
        .search-input{padding:.4rem 1rem;border:1px solid var(--sand-light);background:var(--warm-white);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.82rem;border-radius:20px;outline:none;width:200px;transition:border-color .2s;}
        .search-input:focus{border-color:var(--sand);}
        .search-input::placeholder{color:var(--ink-muted);}

        .members-container{max-width:1200px;margin:0 auto;padding:3rem;}
        .members-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;}
        .member-card{background:var(--warm-white);border:1px solid var(--sand-light);border-radius:8px;padding:1.5rem;cursor:pointer;transition:all .25s;display:flex;flex-direction:column;gap:1rem;}
        .member-card:hover{border-color:var(--sand);transform:translateY(-2px);box-shadow:0 8px 32px rgba(139,110,78,.08);}
        .card-top{display:flex;align-items:flex-start;gap:.875rem;}
        .member-avatar{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--warm-white);flex-shrink:0;position:relative;}
        .avail-dot{position:absolute;bottom:1px;right:1px;width:10px;height:10px;border-radius:50%;border:2px solid var(--warm-white);}
        .avail-yes{background:#4CAF50;}
        .avail-no{background:#9E9E9E;}
        .card-info{flex:1;}
        .card-name{font-size:.95rem;font-weight:500;color:var(--ink);margin-bottom:.2rem;}
        .card-role-badge{display:inline-block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--sand-dark);padding:.15rem .5rem;border:1px solid var(--sand-light);border-radius:20px;margin-bottom:.3rem;}
        .card-location{font-size:.75rem;color:var(--ink-muted);}
        .card-bio{font-size:.8rem;color:var(--ink-muted);line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
        .card-skills{display:flex;flex-wrap:wrap;gap:4px;}
        .skill-pill{font-size:10px;padding:2px 8px;background:var(--sand-pale);color:var(--sand-deep);border-radius:20px;}
        .card-footer{display:flex;justify-content:space-between;align-items:center;padding-top:.75rem;border-top:1px solid var(--sand-light);}
        .card-projects{font-size:.72rem;color:var(--ink-muted);}
        .card-joined{font-size:.72rem;color:var(--sand);}

        .no-results{text-align:center;padding:5rem 2rem;color:var(--ink-muted);}
        .no-results p{font-size:.9rem;margin-top:.5rem;}

        .modal-overlay{position:fixed;inset:0;background:rgba(42,31,20,.6);z-index:200;display:flex;align-items:flex-start;justify-content:flex-end;}
        .modal-panel{width:min(620px,95vw);height:100vh;background:var(--warm-white);overflow-y:auto;animation:slideIn .35s cubic-bezier(.4,0,.2,1);}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        .modal-header{padding:2rem 2.5rem;border-bottom:1px solid var(--sand-light);position:sticky;top:0;background:var(--warm-white);z-index:10;}
        .modal-close{position:absolute;top:1.5rem;right:1.5rem;width:32px;height:32px;border:1px solid var(--sand-light);background:transparent;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--ink-muted);font-size:1rem;transition:all .2s;}
        .modal-close:hover{background:var(--sand-pale);}
        .modal-avatar{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.8rem;color:var(--warm-white);margin-bottom:1rem;position:relative;}
        .modal-avail{position:absolute;bottom:2px;right:2px;width:14px;height:14px;border-radius:50%;border:2px solid var(--warm-white);}
        .modal-name{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:var(--ink);margin-bottom:.4rem;}
        .modal-meta{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:.5rem;}
        .modal-role{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand-dark);padding:.2rem .7rem;border:1px solid var(--sand-light);border-radius:20px;}
        .modal-location{font-size:.82rem;color:var(--ink-muted);}
        .modal-avail-text{font-size:.78rem;padding:.2rem .7rem;border-radius:20px;}
        .avail-label-yes{background:#EDF5E8;color:#3B6D11;}
        .avail-label-no{background:#F5F5F5;color:#757575;}
        .modal-content{padding:2rem 2.5rem;}
        .section-h{font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;color:var(--sand);margin-bottom:1rem;margin-top:2rem;font-weight:500;}
        .section-h:first-child{margin-top:0;}
        .bio-text{font-size:.9rem;color:var(--ink-muted);line-height:1.8;}
        .skills-grid{display:flex;flex-wrap:wrap;gap:.5rem;}
        .skill-tag{font-size:.82rem;padding:.35rem .8rem;background:var(--sand-pale);color:var(--sand-deep);border-radius:4px;}
        .projects-list{display:flex;flex-direction:column;gap:.5rem;}
        .project-tag{font-size:.82rem;padding:.5rem 1rem;background:var(--warm-white);border:1px solid var(--sand-light);border-radius:4px;color:var(--ink);}
        .stats-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .mini-stat{background:var(--sand-pale);border-radius:4px;padding:.875rem 1rem;}
        .mini-stat-label{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand);margin-bottom:.3rem;}
        .mini-stat-value{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:300;color:var(--ink);}
        .action-btns{display:flex;gap:.75rem;margin-top:2rem;padding-top:2rem;border-top:1px solid var(--sand-light);}
        .btn-msg{flex:1;padding:.875rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.875rem;cursor:pointer;border-radius:4px;transition:background .2s;}
        .btn-msg:hover{background:var(--sand-deep);}
        .btn-collab{flex:1;padding:.875rem;background:transparent;color:var(--ink);border:1px solid var(--sand-light);font-family:'DM Sans',sans-serif;font-size:.875rem;cursor:pointer;border-radius:4px;transition:all .2s;}
        .btn-collab:hover{border-color:var(--sand);color:var(--sand-dark);}

        @media(max-width:1100px){.members-grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:800px){.rnav{padding:1rem 1.5rem;}.rnav-links{display:none;}.members-grid{grid-template-columns:repeat(2,1fr);}.page-header,.stats-bar,.filters-bar,.members-container{padding-left:1.5rem;padding-right:1.5rem;}.modal-panel{width:100vw;}}
        @media(max-width:500px){.members-grid{grid-template-columns:1fr;}}
      `}</style>

      {/* NAV */}
      <nav className="rnav">
        <a href="/" className="rnav-logo">Mycorhiziens</a>
        <ul className="rnav-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/projets">Projets</a></li>
          <li><a href="/reseau" className="active">Réseau</a></li>
          <li><a href="/tresorerie">Trésorerie</a></li>
        </ul>
        <a href="#" className="rnav-cta">Mon profil</a>
      </nav>

      {/* HEADER */}
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-eyebrow">Communauté</p>
          <h1 className="page-title">Le <em>réseau</em></h1>
          <p className="page-subtitle">Découvrez les membres, leurs compétences et leurs projets. Trouvez un collaborateur, proposez une idée, construisez ensemble.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item"><span className="stat-num">63</span><span className="stat-label">Membres</span></div>
          <div className="stat-div"></div>
          <div className="stat-item"><span className="stat-num">18</span><span className="stat-label">Leaders</span></div>
          <div className="stat-div"></div>
          <div className="stat-item"><span className="stat-num">27</span><span className="stat-label">Créateurs</span></div>
          <div className="stat-div"></div>
          <div className="stat-item"><span className="stat-num">18</span><span className="stat-label">Travailleurs</span></div>
          <div className="stat-div"></div>
          <div className="stat-item"><span className="stat-num">12</span><span className="stat-label">Pays représentés</span></div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters-bar">
        <div className="filters-inner">
          <input
            className="search-input"
            placeholder="Rechercher un membre, une compétence..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />
          <div className="filter-sep"></div>
          <div className="filter-group">
            <span className="filter-label">Rôle</span>
            {roles.map(r=>(
              <button key={r} className={`fbtn${activeRole===r?' active':''}`} onClick={()=>setActiveRole(r)}>
                {r==='tous'?'Tous':r}
              </button>
            ))}
          </div>
          <div className="filter-sep"></div>
          <div className="filter-group">
            <span className="filter-label">Domaine</span>
            {domaines.map(d=>(
              <button key={d} className={`fbtn${activeDomaine===d?' active':''}`} onClick={()=>setActiveDomaine(d)}>
                {d==='tous'?'Tous':d==='terrain'?'Terrain':d==='education'?'Éducation':d==='sante'?'Santé':'Social'}
              </button>
            ))}
          </div>
          <div className="filter-sep"></div>
          <div className="filter-group">
            <span className="filter-label">Dispo</span>
            <button className={`fbtn${activeAvail==='tous'?' active':''}`} onClick={()=>setActiveAvail('tous')}>Tous</button>
            <button className={`fbtn${activeAvail==='dispo'?' active':''}`} onClick={()=>setActiveAvail('dispo')}>Disponible</button>
          </div>
        </div>
      </div>

      {/* MEMBERS GRID */}
      <div className="members-container">
        {filtered.length === 0 ? (
          <div className="no-results">
            <div style={{fontSize:'2rem',marginBottom:'.5rem'}}>🌱</div>
            <p>Aucun membre ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="members-grid">
            {filtered.map(m=>(
              <div key={m.id} className="member-card" onClick={()=>setSelectedMember(m)}>
                <div className="card-top">
                  <div className="member-avatar" style={{background:m.color}}>
                    {m.initials}
                    <div className={`avail-dot ${m.available?'avail-yes':'avail-no'}`}></div>
                  </div>
                  <div className="card-info">
                    <div className="card-name">{m.name}</div>
                    <div className="card-role-badge">{m.role}</div>
                    <div className="card-location">📍 {m.city}, {m.country}</div>
                  </div>
                </div>
                <p className="card-bio">{m.bio}</p>
                <div className="card-skills">
                  {m.skills.slice(0,4).map(s=><span key={s} className="skill-pill">{s}</span>)}
                  {m.skills.length>4 && <span className="skill-pill">+{m.skills.length-4}</span>}
                </div>
                <div className="card-footer">
                  <span className="card-projects">{m.projects.length} projet{m.projects.length>1?'s':''}</span>
                  <span className="card-joined">Depuis {m.joined}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedMember && (
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setSelectedMember(null)}}>
          <div className="modal-panel">
            <div className="modal-header">
              <button className="modal-close" onClick={()=>setSelectedMember(null)}>✕</button>
              <div className="modal-avatar" style={{background:selectedMember.color}}>
                {selectedMember.initials}
                <div className={`modal-avail ${selectedMember.available?'avail-yes':'avail-no'}`}></div>
              </div>
              <div className="modal-name">{selectedMember.name}</div>
              <div className="modal-meta">
                <span className="modal-role">{selectedMember.role}</span>
                <span className="modal-location">📍 {selectedMember.city}, {selectedMember.country}</span>
                <span className={`modal-avail-text ${selectedMember.available?'avail-label-yes':'avail-label-no'}`}>
                  {selectedMember.available?'Disponible pour collaborer':'Actuellement occupé'}
                </span>
              </div>
            </div>

            <div className="modal-content">
              <div className="section-h">À propos</div>
              <p className="bio-text">{selectedMember.bio}</p>

              <div className="section-h">Statistiques</div>
              <div className="stats-row">
                <div className="mini-stat">
                  <div className="mini-stat-label">Contributions</div>
                  <div className="mini-stat-value">{selectedMember.contributions}</div>
                </div>
                <div className="mini-stat">
                  <div className="mini-stat-label">Membre depuis</div>
                  <div className="mini-stat-value" style={{fontSize:'1.1rem'}}>{selectedMember.joined}</div>
                </div>
              </div>

              <div className="section-h">Compétences</div>
              <div className="skills-grid">
                {selectedMember.skills.map(s=><span key={s} className="skill-tag">{s}</span>)}
              </div>

              <div className="section-h">Projets</div>
              <div className="projects-list">
                {selectedMember.projects.map(p=>(
                  <div key={p} className="project-tag">→ {p}</div>
                ))}
              </div>

              <div className="action-btns">
                <button className="btn-msg">✉ Envoyer un message</button>
                <button className="btn-collab">+ Proposer une collaboration</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}