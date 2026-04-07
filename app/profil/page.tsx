'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('');
  const [available, setAvailable] = useState(true);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/auth'; return; }
      setUser(user);
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (profile) {
        setProfile(profile);
        setFullName(profile.full_name || '');
        setCity(profile.city || '');
        setBio(profile.bio || '');
        setRole(profile.role || '');
        setAvailable(profile.available ?? true);
        setSkills(profile.skills || []);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName,
      city,
      bio,
      role,
      available,
      skills,
      username: user.email?.split('@')[0],
    });
    if (error) setMessage('Erreur lors de la sauvegarde.');
    else { setMessage('Profil mis à jour ! 🌱'); setEditing(false); }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (s: string) => setSkills(skills.filter(sk => sk !== s));

  const initials = fullName ? fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  const colors = ['#8B6E4E', '#C8A97E', '#5C4730', '#A0856A', '#6B5840'];
  const avatarColor = colors[fullName.charCodeAt(0) % colors.length] || '#8B6E4E';

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#FAF5EC',fontFamily:'DM Sans,sans-serif',color:'#6B5840'}}>
      Chargement...
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root{--sand:#C8A97E;--sand-light:#E8D5B7;--sand-pale:#F5ECD8;--sand-dark:#8B6E4E;--sand-deep:#5C4730;--ink:#2A1F14;--ink-muted:#6B5840;--cream:#FAF5EC;--warm-white:#FFFDF8;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);}
        .pnav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(255,253,248,0.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(232,213,183,0.4);}
        .pnav-logo{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:300;color:var(--ink);text-decoration:none;letter-spacing:.05em;}
        .pnav-links{display:flex;gap:2rem;list-style:none;}
        .pnav-links a{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);text-decoration:none;}
        .pnav-links a:hover{color:var(--sand-dark);}
        .logout-btn{padding:.6rem 1.5rem;background:transparent;color:var(--ink-muted);border:1px solid var(--sand-light);font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:2px;transition:all .2s;}
        .logout-btn:hover{border-color:var(--sand);color:var(--sand-dark);}

        .profil-page{max-width:900px;margin:0 auto;padding:8rem 2rem 4rem;}
        .profil-header{display:flex;align-items:flex-start;gap:2rem;margin-bottom:3rem;padding-bottom:3rem;border-bottom:1px solid var(--sand-light);}
        .profil-avatar{width:100px;height:100px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:var(--warm-white);flex-shrink:0;}
        .profil-info{flex:1;}
        .profil-name{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:300;color:var(--ink);margin-bottom:.5rem;}
        .profil-email{font-size:.85rem;color:var(--ink-muted);margin-bottom:.75rem;}
        .profil-meta{display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;}
        .profil-role{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand-dark);padding:.25rem .75rem;border:1px solid var(--sand-light);border-radius:20px;}
        .profil-city{font-size:.82rem;color:var(--ink-muted);}
        .avail-badge{font-size:10px;padding:.25rem .75rem;border-radius:20px;font-weight:500;}
        .avail-yes{background:#EDF5E8;color:#3B6D11;}
        .avail-no{background:#F5F5F5;color:#757575;}
        .profil-actions{display:flex;gap:.75rem;margin-top:1.25rem;}
        .edit-btn{padding:.6rem 1.5rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.82rem;cursor:pointer;border-radius:4px;transition:background .2s;}
        .edit-btn:hover{background:var(--sand-deep);}
        .cancel-btn{padding:.6rem 1.5rem;background:transparent;color:var(--ink-muted);border:1px solid var(--sand-light);font-family:'DM Sans',sans-serif;font-size:.82rem;cursor:pointer;border-radius:4px;transition:all .2s;}
        .cancel-btn:hover{border-color:var(--sand);}

        .profil-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;}
        .profil-section{background:var(--warm-white);border:1px solid var(--sand-light);border-radius:8px;padding:1.5rem;}
        .profil-section-full{grid-column:span 2;}
        .section-title{font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--sand);margin-bottom:1.25rem;font-weight:500;}
        .info-row{display:flex;flex-direction:column;gap:.3rem;margin-bottom:1rem;}
        .info-label{font-size:.75rem;color:var(--ink-muted);}
        .info-value{font-size:.95rem;color:var(--ink);}
        .bio-text{font-size:.9rem;color:var(--ink-muted);line-height:1.8;}
        .skills-wrap{display:flex;flex-wrap:wrap;gap:.5rem;}
        .skill-tag{font-size:.82rem;padding:.35rem .8rem;background:var(--sand-pale);color:var(--sand-deep);border-radius:4px;display:flex;align-items:center;gap:.4rem;}
        .skill-remove{cursor:pointer;color:var(--sand);font-size:.8rem;border:none;background:none;}
        .skill-remove:hover{color:var(--sand-dark);}
        .empty-bio{font-size:.9rem;color:var(--ink-muted);font-style:italic;}

        .form-group{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.25rem;}
        .form-label{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sand-dark);font-weight:500;}
        .form-input{padding:.75rem 1rem;border:1px solid var(--sand-light);background:var(--warm-white);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.9rem;border-radius:4px;outline:none;transition:border-color .2s;}
        .form-input:focus{border-color:var(--sand);}
        .form-textarea{padding:.75rem 1rem;border:1px solid var(--sand-light);background:var(--warm-white);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.9rem;border-radius:4px;outline:none;resize:vertical;min-height:100px;transition:border-color .2s;}
        .form-textarea:focus{border-color:var(--sand);}
        .role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;}
        .role-option{padding:.6rem .5rem;border:1px solid var(--sand-light);background:transparent;color:var(--ink-muted);font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:4px;text-align:center;transition:all .2s;}
        .role-option.selected{background:var(--ink);color:var(--sand-pale);border-color:var(--ink);}
        .avail-toggle{display:flex;gap:.5rem;}
        .avail-btn{flex:1;padding:.6rem;border:1px solid var(--sand-light);background:transparent;font-family:'DM Sans',sans-serif;font-size:.82rem;cursor:pointer;border-radius:4px;transition:all .2s;color:var(--ink-muted);}
        .avail-btn.selected{background:#EDF5E8;color:#3B6D11;border-color:#C6E0B4;}
        .avail-btn.selected-no{background:#F5F5F5;color:#757575;border-color:#E0E0E0;}
        .skill-input-wrap{display:flex;flex-direction:column;gap:.5rem;}
        .skill-hint{font-size:.72rem;color:var(--ink-muted);}
        .save-btn{width:100%;padding:.875rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.9rem;cursor:pointer;border-radius:4px;transition:background .2s;margin-top:.5rem;}
        .save-btn:hover:not(:disabled){background:var(--sand-deep);}
        .save-btn:disabled{opacity:.6;cursor:not-allowed;}
        .message-box{padding:1rem 1.25rem;border-radius:4px;font-size:.85rem;margin-bottom:1.5rem;background:#EDF5E8;color:#3B6D11;border:1px solid #C6E0B4;}

        .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem;}
        .stat-card{background:var(--sand-pale);border-radius:6px;padding:1rem 1.25rem;text-align:center;}
        .stat-num{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:var(--ink);}
        .stat-label{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand);margin-top:.25rem;}

        @media(max-width:700px){.pnav{padding:1rem 1.5rem;}.pnav-links{display:none;}.profil-grid{grid-template-columns:1fr;}.profil-section-full{grid-column:span 1;}.profil-header{flex-direction:column;align-items:center;text-align:center;}.stats-row{grid-template-columns:1fr 1fr;}}
      `}</style>

      <nav className="pnav">
        <a href="/" className="pnav-logo">Mycorhiziens</a>
        <ul className="pnav-links">
          <li><a href="/projets">Projets</a></li>
          <li><a href="/reseau">Réseau</a></li>
          <li><a href="/tresorerie">Trésorerie</a></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Se déconnecter</button>
      </nav>

      <div className="profil-page">

        {message && <div className="message-box">{message}</div>}

        {/* HEADER */}
        <div className="profil-header">
          <div className="profil-avatar" style={{background: avatarColor}}>{initials}</div>
          <div className="profil-info">
            <div className="profil-name">{fullName || 'Nouveau membre'}</div>
            <div className="profil-email">{user?.email}</div>
            <div className="profil-meta">
              {role && <span className="profil-role">{role}</span>}
              {city && <span className="profil-city">📍 {city}</span>}
              <span className={`avail-badge ${available ? 'avail-yes' : 'avail-no'}`}>
                {available ? 'Disponible pour collaborer' : 'Actuellement occupé'}
              </span>
            </div>
            <div className="profil-actions">
              {!editing
                ? <button className="edit-btn" onClick={() => setEditing(true)}>✏️ Modifier mon profil</button>
                : <>
                    <button className="edit-btn" onClick={handleSave} disabled={saving}>{saving ? 'Sauvegarde...' : '✓ Sauvegarder'}</button>
                    <button className="cancel-btn" onClick={() => setEditing(false)}>Annuler</button>
                  </>
              }
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num">0</div>
            <div className="stat-label">Projets rejoints</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">0</div>
            <div className="stat-label">Votes effectués</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{skills.length}</div>
            <div className="stat-label">Compétences</div>
          </div>
        </div>

        {!editing ? (
          /* VIEW MODE */
          <div className="profil-grid">
            <div className="profil-section">
              <div className="section-title">Informations</div>
              <div className="info-row">
                <span className="info-label">Nom complet</span>
                <span className="info-value">{fullName || '—'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Ville</span>
                <span className="info-value">{city || '—'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Rôle</span>
                <span className="info-value">{role || '—'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Disponibilité</span>
                <span className="info-value">{available ? 'Disponible pour collaborer' : 'Actuellement occupé'}</span>
              </div>
            </div>

            <div className="profil-section">
              <div className="section-title">Compétences</div>
              {skills.length > 0
                ? <div className="skills-wrap">{skills.map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
                : <p className="empty-bio">Aucune compétence ajoutée — modifie ton profil !</p>
              }
            </div>

            <div className="profil-section profil-section-full">
              <div className="section-title">Bio</div>
              {bio
                ? <p className="bio-text">{bio}</p>
                : <p className="empty-bio">Tu n&apos;as pas encore de bio — modifie ton profil pour te présenter à la communauté !</p>
              }
            </div>
          </div>
        ) : (
          /* EDIT MODE */
          <div className="profil-grid">
            <div className="profil-section">
              <div className="section-title">Informations</div>
              <div className="form-group">
                <label className="form-label">Nom complet</label>
                <input className="form-input" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Prénom Nom"/>
              </div>
              <div className="form-group">
                <label className="form-label">Ville</label>
                <input className="form-input" value={city} onChange={e => setCity(e.target.value)} placeholder="Paris, Lyon, Dakar..."/>
              </div>
              <div className="form-group">
                <label className="form-label">Rôle souhaité</label>
                <div className="role-grid">
                  {['Travailleur','Créateur','Leader'].map(r => (
                    <div key={r} className={`role-option${role===r?' selected':''}`} onClick={() => setRole(r)}>{r}</div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Disponibilité</label>
                <div className="avail-toggle">
                  <button className={`avail-btn${available?' selected':''}`} onClick={() => setAvailable(true)}>Disponible</button>
                  <button className={`avail-btn${!available?' selected-no':''}`} onClick={() => setAvailable(false)}>Occupé</button>
                </div>
              </div>
            </div>

            <div className="profil-section">
              <div className="section-title">Compétences</div>
              <div className="form-group">
                <div className="skill-input-wrap">
                  <input className="form-input" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Ex: Design, Agriculture..."/>
                  <span className="skill-hint">Appuie sur Entrée pour ajouter</span>
                </div>
              </div>
              <div className="skills-wrap">
                {skills.map(s => (
                  <span key={s} className="skill-tag">
                    {s}
                    <button className="skill-remove" onClick={() => removeSkill(s)}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="profil-section profil-section-full">
              <div className="section-title">Bio</div>
              <div className="form-group">
                <textarea className="form-textarea" value={bio} onChange={e => setBio(e.target.value)} placeholder="Présente-toi à la communauté — qui tu es, ce qui te passionne, ce que tu apportes au réseau..."/>
              </div>
              <button className="save-btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Sauvegarde...' : '✓ Sauvegarder le profil'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}