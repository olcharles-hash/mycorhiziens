'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const domaines = ['terrain', 'education', 'sante', 'social'];
const domaineLabels: Record<string, string> = {
  terrain: 'Terrain', education: 'Éducation', sante: 'Santé', social: 'Social'
};

export default function NouveauProjetPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [domaine, setDomaine] = useState('');
  const [desc, setDesc] = useState('');
  const [budget, setBudget] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tweetUrl, setTweetUrl] = useState('');
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [step3, setStep3] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/auth';
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async () => {
    if (!title || !domaine || !desc || !budget) {
      setError('Merci de remplir tous les champs obligatoires.');
      return;
    }
    setSaving(true);
    setError('');

    const steps = [step1, step2, step3].filter(s => s.trim()).map(s => ({
      title: s,
      meta: 'À définir',
      status: 'todo'
    }));

    const { error: err } = await supabase.from('projets').insert({
      title,
      domaine,
      desc,
      budget: parseInt(budget),
      end_date: endDate,
      tweet_url: tweetUrl,
      steps: JSON.stringify(steps),
      status: 'vote',
      statut: 'vote',
      user_id: user.id,
      spent: 0,
      progress: 0,
      color: domaine === 'terrain' ? '#8B6E4E' : domaine === 'education' ? '#C8A97E' : domaine === 'sante' ? '#5C4730' : '#A0856A',
    });

    if (err) {
      setError('Erreur lors de la création. Réessaie !');
      setSaving(false);
      return;
    }

    setSuccess(true);
    setSaving(false);
  };

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
        .pnav-cta{padding:.6rem 1.5rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:2px;text-decoration:none;}

        .page-wrap{max-width:760px;margin:0 auto;padding:8rem 2rem 4rem;}
        .page-eyebrow{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--sand);margin-bottom:1rem;font-weight:500;}
        .page-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,5vw,3.5rem);font-weight:300;color:var(--ink);line-height:1.1;margin-bottom:.75rem;}
        .page-title em{font-style:italic;color:var(--sand-dark);}
        .page-sub{font-size:.95rem;color:var(--ink-muted);line-height:1.7;margin-bottom:3rem;}

        .form-card{background:var(--warm-white);border:1px solid var(--sand-light);border-radius:8px;padding:2rem;margin-bottom:1.5rem;}
        .form-card-title{font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--sand);margin-bottom:1.5rem;font-weight:500;}
        .form-group{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.25rem;}
        .form-group:last-child{margin-bottom:0;}
        .form-label{font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--sand-dark);font-weight:500;}
        .form-label span{color:var(--ink-muted);font-weight:400;text-transform:none;letter-spacing:0;}
        .form-input{padding:.875rem 1rem;border:1px solid var(--sand-light);background:var(--cream);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.9rem;border-radius:4px;outline:none;transition:border-color .2s;}
        .form-input:focus{border-color:var(--sand);background:var(--warm-white);}
        .form-input::placeholder{color:var(--ink-muted);opacity:.5;}
        .form-textarea{padding:.875rem 1rem;border:1px solid var(--sand-light);background:var(--cream);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.9rem;border-radius:4px;outline:none;resize:vertical;min-height:120px;transition:border-color .2s;line-height:1.6;}
        .form-textarea:focus{border-color:var(--sand);background:var(--warm-white);}
        .form-textarea::placeholder{color:var(--ink-muted);opacity:.5;}
        .form-hint{font-size:.75rem;color:var(--ink-muted);line-height:1.5;}

        .domaine-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;}
        .domaine-option{padding:.875rem .5rem;border:1px solid var(--sand-light);background:transparent;color:var(--ink-muted);font-family:'DM Sans',sans-serif;font-size:.82rem;cursor:pointer;border-radius:4px;text-align:center;transition:all .2s;}
        .domaine-option:hover{border-color:var(--sand);color:var(--sand-dark);}
        .domaine-option.selected{background:var(--ink);color:var(--sand-pale);border-color:var(--ink);}
        .domaine-icon{font-size:1.2rem;margin-bottom:.3rem;}

        .steps-inputs{display:flex;flex-direction:column;gap:.75rem;}
        .step-input-row{display:flex;align-items:center;gap:.75rem;}
        .step-num{width:24px;height:24px;border-radius:50%;background:var(--sand-pale);display:flex;align-items:center;justify-content:center;font-size:.72rem;color:var(--sand-dark);flex-shrink:0;font-weight:500;}

        .info-box{background:var(--sand-pale);border:1px solid var(--sand-light);border-radius:6px;padding:1rem 1.25rem;display:flex;gap:.875rem;align-items:flex-start;margin-bottom:1.5rem;}
        .info-box-icon{font-size:1rem;flex-shrink:0;margin-top:1px;}
        .info-box-text{font-size:.82rem;color:var(--ink-muted);line-height:1.6;}

        .submit-btn{width:100%;padding:1.1rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.95rem;letter-spacing:.05em;cursor:pointer;border-radius:4px;transition:background .2s;}
        .submit-btn:hover:not(:disabled){background:var(--sand-deep);}
        .submit-btn:disabled{opacity:.6;cursor:not-allowed;}
        .error-box{background:#FCECEA;border:1px solid #F5B8B5;color:#A32D2D;padding:1rem 1.25rem;border-radius:4px;font-size:.85rem;margin-bottom:1.5rem;}

        .success-page{text-align:center;padding:4rem 2rem;}
        .success-icon{font-size:3rem;margin-bottom:1.5rem;}
        .success-title{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:300;color:var(--ink);margin-bottom:1rem;}
        .success-sub{font-size:.95rem;color:var(--ink-muted);line-height:1.7;margin-bottom:2rem;max-width:460px;margin-left:auto;margin-right:auto;}
        .success-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
        .btn-primary{padding:.9rem 2rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.875rem;cursor:pointer;border-radius:4px;text-decoration:none;display:inline-block;}
        .btn-secondary{padding:.9rem 2rem;background:transparent;color:var(--ink-muted);border:1px solid var(--sand-light);font-family:'DM Sans',sans-serif;font-size:.875rem;cursor:pointer;border-radius:4px;text-decoration:none;display:inline-block;}

        @media(max-width:700px){.pnav{padding:1rem 1.5rem;}.pnav-links{display:none;}.domaine-grid{grid-template-columns:1fr 1fr;}}
      `}</style>

      <nav className="pnav">
        <a href="/" className="pnav-logo">Mycorhiziens</a>
        <ul className="pnav-links">
          <li><a href="/projets">Projets</a></li>
          <li><a href="/reseau">Réseau</a></li>
          <li><a href="/tresorerie">Trésorerie</a></li>
        </ul>
        <a href="/profil" className="pnav-cta">Mon profil</a>
      </nav>

      <div className="page-wrap">

        {success ? (
          <div className="success-page">
            <div className="success-icon">🌱</div>
            <h1 className="success-title">Projet soumis !</h1>
            <p className="success-sub">Ton projet est maintenant en vote. La communauté va pouvoir le découvrir et voter pour l&apos;approuver. Les Leaders coordonneront l&apos;exécution si le vote est positif.</p>
            <div className="success-btns">
              <a href="/projets" className="btn-primary">Voir les projets</a>
              <a href="/nouveau-projet" className="btn-secondary" onClick={()=>setSuccess(false)}>Proposer un autre projet</a>
            </div>
          </div>
        ) : (
          <>
            <p className="page-eyebrow">Communauté</p>
            <h1 className="page-title">Proposer un <em>nouveau projet</em></h1>
            <p className="page-sub">Ton projet sera soumis au vote de la communauté. Si approuvé, un budget sera alloué depuis la trésorerie et des Leaders coordonneront l&apos;exécution.</p>

            {error && <div className="error-box">{error}</div>}

            <div className="info-box">
              <span className="info-box-icon">💡</span>
              <p className="info-box-text">Conseil : avant de soumettre ici, publie ta proposition sur X avec <strong>#PropositionMyco</strong> pour générer de l&apos;engagement et colle le lien du tweet ci-dessous. Ça booste les chances d&apos;approbation !</p>
            </div>

            {/* INFOS GÉNÉRALES */}
            <div className="form-card">
              <div className="form-card-title">Informations générales</div>

              <div className="form-group">
                <label className="form-label">Titre du projet <span>*</span></label>
                <input className="form-input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex: Potager collectif — Bordeaux"/>
              </div>

              <div className="form-group">
                <label className="form-label">Domaine <span>*</span></label>
                <div className="domaine-grid">
                  {domaines.map(d => (
                    <div key={d} className={`domaine-option${domaine===d?' selected':''}`} onClick={()=>setDomaine(d)}>
                      <div className="domaine-icon">{d==='terrain'?'🌱':d==='education'?'📚':d==='sante'?'🌿':'🤝'}</div>
                      {domaineLabels[d]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description <span>*</span></label>
                <textarea className="form-textarea" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Décris ton projet : l'objectif, pourquoi c'est important, comment ça va changer les choses..."/>
              </div>
            </div>

            {/* BUDGET */}
            <div className="form-card">
              <div className="form-card-title">Budget & planning</div>

              <div className="form-group">
                <label className="form-label">Budget estimé (€) <span>*</span></label>
                <input className="form-input" type="number" value={budget} onChange={e=>setBudget(e.target.value)} placeholder="Ex: 1500"/>
                <span className="form-hint">Ce montant sera prélevé sur la trésorerie communautaire si le vote est approuvé.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Date de fin estimée <span style={{color:'var(--ink-muted)',fontWeight:400,textTransform:'none',letterSpacing:0}}>(optionnel)</span></label>
                <input className="form-input" type="text" value={endDate} onChange={e=>setEndDate(e.target.value)} placeholder="Ex: Juin 2025, Fin 2025..."/>
              </div>
            </div>

            {/* ÉTAPES */}
            <div className="form-card">
              <div className="form-card-title">Étapes principales <span style={{color:'var(--ink-muted)',fontWeight:400,textTransform:'none',letterSpacing:0,fontSize:'.72rem'}}>(optionnel)</span></div>
              <div className="steps-inputs">
                <div className="step-input-row">
                  <div className="step-num">1</div>
                  <input className="form-input" style={{flex:1}} value={step1} onChange={e=>setStep1(e.target.value)} placeholder="Ex: Recherche d'un terrain adapté"/>
                </div>
                <div className="step-input-row">
                  <div className="step-num">2</div>
                  <input className="form-input" style={{flex:1}} value={step2} onChange={e=>setStep2(e.target.value)} placeholder="Ex: Vote et approbation du budget"/>
                </div>
                <div className="step-input-row">
                  <div className="step-num">3</div>
                  <input className="form-input" style={{flex:1}} value={step3} onChange={e=>setStep3(e.target.value)} placeholder="Ex: Lancement et suivi"/>
                </div>
              </div>
            </div>

            {/* TWEET */}
            <div className="form-card">
              <div className="form-card-title">Lien X (Twitter) <span style={{color:'var(--ink-muted)',fontWeight:400,textTransform:'none',letterSpacing:0,fontSize:'.72rem'}}>(optionnel)</span></div>
              <div className="form-group">
                <label className="form-label">URL du tweet de proposition</label>
                <input className="form-input" value={tweetUrl} onChange={e=>setTweetUrl(e.target.value)} placeholder="https://twitter.com/ton_compte/status/..."/>
                <span className="form-hint">Si tu as publié ta proposition sur X, colle le lien ici. Il apparaîtra dans l&apos;onglet Brainstorming du projet.</span>
              </div>
            </div>

            <button className="submit-btn" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Envoi en cours...' : '🌱 Soumettre le projet au vote'}
            </button>
          </>
        )}
      </div>
    </>
  );
}