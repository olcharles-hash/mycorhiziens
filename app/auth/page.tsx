'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AuthPage() {
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else { setMessage('Connexion réussie ! Redirection...'); setTimeout(()=>window.location.href='/', 1500); }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    if (!fullName || !role || !city) { setError('Merci de remplir tous les champs.'); setLoading(false); return; }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: fullName,
        role,
        city,
        username: email.split('@')[0],
        avatar_color: ['#8B6E4E','#C8A97E','#5C4730','#A0856A'][Math.floor(Math.random()*4)],
        available: true,
      });
      setMessage('Compte créé ! Vérifie ton email pour confirmer ton inscription. 🌱');
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root{--sand:#C8A97E;--sand-light:#E8D5B7;--sand-pale:#F5ECD8;--sand-dark:#8B6E4E;--sand-deep:#5C4730;--ink:#2A1F14;--ink-muted:#6B5840;--cream:#FAF5EC;--warm-white:#FFFDF8;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);}
        .auth-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;}
        .auth-left{background:var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem;position:relative;overflow:hidden;}
        .auth-left-bg{position:absolute;inset:0;opacity:.05;}
        .auth-logo{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:300;color:var(--sand-pale);margin-bottom:1rem;letter-spacing:.05em;}
        .auth-logo-sub{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--sand);margin-bottom:3rem;}
        .auth-quote{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:300;font-style:italic;color:var(--sand-light);max-width:380px;text-align:center;line-height:1.6;margin-bottom:3rem;}
        .auth-features{display:flex;flex-direction:column;gap:1rem;width:100%;max-width:360px;}
        .auth-feature{display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:rgba(200,169,126,.08);border:1px solid rgba(200,169,126,.15);border-radius:4px;}
        .auth-feature-icon{font-size:1.2rem;flex-shrink:0;}
        .auth-feature-text{font-size:.82rem;color:#9A8570;line-height:1.5;}
        .auth-feature-title{font-size:.875rem;font-weight:500;color:var(--sand-light);margin-bottom:.2rem;}

        .auth-right{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem;background:var(--warm-white);}
        .auth-form-wrap{width:100%;max-width:400px;}
        .auth-toggle{display:flex;gap:0;margin-bottom:2.5rem;border:1px solid var(--sand-light);border-radius:4px;overflow:hidden;}
        .auth-toggle-btn{flex:1;padding:.75rem;background:transparent;border:none;font-family:'DM Sans',sans-serif;font-size:.82rem;letter-spacing:.05em;cursor:pointer;color:var(--ink-muted);transition:all .2s;}
        .auth-toggle-btn.active{background:var(--ink);color:var(--sand-pale);}
        .form-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:var(--ink);margin-bottom:.5rem;}
        .form-sub{font-size:.85rem;color:var(--ink-muted);margin-bottom:2rem;line-height:1.5;}
        .form-group{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.25rem;}
        .form-label{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sand-dark);font-weight:500;}
        .form-input{padding:.875rem 1rem;border:1px solid var(--sand-light);background:var(--warm-white);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.9rem;border-radius:4px;outline:none;transition:border-color .2s;}
        .form-input:focus{border-color:var(--sand);}
        .form-input::placeholder{color:var(--ink-muted);opacity:.6;}
        .form-select{padding:.875rem 1rem;border:1px solid var(--sand-light);background:var(--warm-white);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.9rem;border-radius:4px;outline:none;cursor:pointer;appearance:none;}
        .role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;}
        .role-option{padding:.75rem .5rem;border:1px solid var(--sand-light);background:transparent;color:var(--ink-muted);font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:4px;text-align:center;transition:all .2s;}
        .role-option:hover{border-color:var(--sand);color:var(--sand-dark);}
        .role-option.selected{background:var(--ink);color:var(--sand-pale);border-color:var(--ink);}
        .role-option-name{font-weight:500;margin-bottom:.2rem;}
        .role-option-desc{font-size:.7rem;opacity:.7;line-height:1.3;}
        .submit-btn{width:100%;padding:1rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.9rem;letter-spacing:.05em;cursor:pointer;border-radius:4px;transition:background .2s;margin-top:.5rem;}
        .submit-btn:hover:not(:disabled){background:var(--sand-deep);}
        .submit-btn:disabled{opacity:.6;cursor:not-allowed;}
        .form-divider{display:flex;align-items:center;gap:1rem;margin:1.5rem 0;}
        .form-divider-line{flex:1;height:1px;background:var(--sand-light);}
        .form-divider-text{font-size:.75rem;color:var(--ink-muted);}
        .message-box{padding:1rem 1.25rem;border-radius:4px;font-size:.85rem;margin-bottom:1.5rem;line-height:1.5;}
        .message-success{background:#EDF5E8;color:#3B6D11;border:1px solid #C6E0B4;}
        .message-error{background:#FCECEA;color:#A32D2D;border:1px solid #F5B8B5;}
        .back-link{display:block;text-align:center;margin-top:1.5rem;font-size:.82rem;color:var(--ink-muted);text-decoration:none;}
        .back-link:hover{color:var(--sand-dark);}
        @media(max-width:768px){.auth-page{grid-template-columns:1fr;}.auth-left{display:none;}.auth-right{padding:2rem;}}
      `}</style>

      <div className="auth-page">

        {/* LEFT — Branding */}
        <div className="auth-left">
          <svg className="auth-left-bg" viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <g stroke="#C8A97E" strokeWidth="0.8" fill="none">
              <line x1="400" y1="450" x2="150" y2="200"/><line x1="400" y1="450" x2="650" y2="220"/>
              <line x1="400" y1="450" x2="700" y2="500"/><line x1="400" y1="450" x2="550" y2="720"/>
              <line x1="400" y1="450" x2="200" y2="750"/><line x1="400" y1="450" x2="80" y2="580"/>
              <line x1="150" y1="200" x2="60" y2="80"/><line x1="150" y1="200" x2="280" y2="90"/>
              <line x1="650" y1="220" x2="750" y2="90"/><line x1="650" y1="220" x2="780" y2="320"/>
            </g>
            <g fill="#C8A97E">
              <circle cx="400" cy="450" r="5"/><circle cx="150" cy="200" r="3"/><circle cx="650" cy="220" r="3"/>
              <circle cx="700" cy="500" r="3"/><circle cx="550" cy="720" r="3"/><circle cx="200" cy="750" r="3"/>
            </g>
          </svg>

          <div style={{position:'relative',textAlign:'center'}}>
            <div className="auth-logo">Mycorhiziens</div>
            <div className="auth-logo-sub">Un réseau d&apos;humains conscients</div>
            <p className="auth-quote">« Chaque être humain possède en lui du génie. Ensemble, nous le libérons. »</p>
          </div>

          <div className="auth-features">
            <div className="auth-feature">
              <span className="auth-feature-icon">🌱</span>
              <div>
                <div className="auth-feature-title">Rejoindre des projets</div>
                <div className="auth-feature-text">Participez à des initiatives concrètes — terrain, éducation, santé, social.</div>
              </div>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">🗳️</span>
              <div>
                <div className="auth-feature-title">Voter & décider</div>
                <div className="auth-feature-text">Votre voix compte dans l&apos;allocation de la trésorerie communautaire.</div>
              </div>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">🤝</span>
              <div>
                <div className="auth-feature-title">Collaborer</div>
                <div className="auth-feature-text">Connectez-vous avec des membres selon vos compétences et vos passions.</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="auth-right">
          <div className="auth-form-wrap">

            <div className="auth-toggle">
              <button className={`auth-toggle-btn${mode==='login'?' active':''}`} onClick={()=>{setMode('login');setError('');setMessage('');}}>
                Connexion
              </button>
              <button className={`auth-toggle-btn${mode==='signup'?' active':''}`} onClick={()=>{setMode('signup');setError('');setMessage('');}}>
                Inscription
              </button>
            </div>

            {message && <div className="message-box message-success">{message}</div>}
            {error && <div className="message-box message-error">{error}</div>}

            {mode==='login' ? (
              <>
                <h2 className="form-title">Bon retour 🌿</h2>
                <p className="form-sub">Connecte-toi pour accéder au réseau, voter sur les projets et collaborer.</p>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="ton@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Mot de passe</label>
                  <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button className="submit-btn" onClick={handleLogin} disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                <div className="form-divider">
                  <div className="form-divider-line"></div>
                  <span className="form-divider-text">pas encore membre ?</span>
                  <div className="form-divider-line"></div>
                </div>
                <button className="submit-btn" style={{background:'transparent',color:'var(--ink)',border:'1px solid var(--sand-light)'}} onClick={()=>setMode('signup')}>
                  Créer un compte
                </button>
              </>
            ) : (
              <>
                <h2 className="form-title">Rejoindre le réseau 🌱</h2>
                <p className="form-sub">Indique tes informations de base. La communauté confirmera ton rôle par vote.</p>
                <div className="form-group">
                  <label className="form-label">Nom complet</label>
                  <input className="form-input" type="text" placeholder="Prénom Nom" value={fullName} onChange={e=>setFullName(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="ton@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Mot de passe</label>
                  <input className="form-input" type="password" placeholder="8 caractères minimum" value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Ville</label>
                  <input className="form-input" type="text" placeholder="Paris, Lyon, Dakar..." value={city} onChange={e=>setCity(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Rôle souhaité</label>
                  <p style={{fontSize:'.75rem',color:'var(--ink-muted)',marginBottom:'.5rem'}}>La communauté votera pour confirmer ton rôle.</p>
                  <div className="role-grid">
                    {[
                      {id:'Travailleur',desc:'Je construis et exécute'},
                      {id:'Créateur',desc:'J\'innove et propose'},
                      {id:'Leader',desc:'J\'organise et coordonne'},
                    ].map(r=>(
                      <div key={r.id} className={`role-option${role===r.id?' selected':''}`} onClick={()=>setRole(r.id)}>
                        <div className="role-option-name">{r.id}</div>
                        <div className="role-option-desc">{r.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="submit-btn" onClick={handleSignup} disabled={loading}>
                  {loading ? 'Création...' : 'Créer mon compte'}
                </button>
              </>
            )}

            <a href="/" className="back-link">← Retour à l&apos;accueil</a>
          </div>
        </div>

      </div>
    </>
  );
}