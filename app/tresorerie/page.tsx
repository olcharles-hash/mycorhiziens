'use client';
import { useState } from 'react';

const transactions = [
  { id:'t1', project:'Achat terrain — Occitanie', category:'Terrain', amount:12000, spent:8160, remaining:3840, progress:68, color:'#8B6E4E', status:'en-cours',
    expenses:[
      {name:'Étude notariale', date:'Fév 2025', amount:1200, paid:true},
      {name:'Analyse de sol', date:'Mars 2025', amount:380, paid:true},
      {name:'Acompte vente', date:'Mars 2025', amount:5000, paid:true},
      {name:'Matériel compostage', date:'Avr 2025', amount:640, paid:true},
      {name:'Transport matériaux', date:'Avr 2025', amount:540, paid:true},
      {name:'Clôture bocagère', date:'Mai 2025', amount:1400, paid:false},
      {name:'Système irrigation', date:'Juin 2025', amount:1800, paid:false},
      {name:'Construction abri', date:'Juin 2025', amount:1000, paid:false},
    ]
  },
  { id:'t2', project:'Chaîne YouTube — Saison 1', category:'Éducation', amount:1400, spent:1050, remaining:350, progress:83, color:'#C8A97E', status:'en-cours',
    expenses:[
      {name:'Matériel tournage', date:'Déc 2024', amount:420, paid:true},
      {name:'Logiciel montage', date:'Déc 2024', amount:180, paid:true},
      {name:'Déplacements', date:'Jan-Mar 2025', amount:290, paid:true},
      {name:'Musiques libres', date:'Jan 2025', amount:160, paid:true},
      {name:'Miniatures & graphismes', date:'À venir', amount:350, paid:false},
    ]
  },
  { id:'t3', project:'Hôpital du Bonheur — Pilote', category:'Santé', amount:3200, spent:0, remaining:3200, progress:0, color:'#5C4730', status:'vote',
    expenses:[]
  },
  { id:'t4', project:'Bibliothèque mobile — Lyon', category:'Social', amount:850, spent:823, remaining:27, progress:97, color:'#A0856A', status:'termine',
    expenses:[
      {name:'Achat ouvrages', date:'Jan 2025', amount:520, paid:true},
      {name:'Aménagement véhicule', date:'Jan 2025', amount:180, paid:true},
      {name:'Impression flyers', date:'Fév 2025', amount:78, paid:true},
      {name:'Rafraîchissements ateliers', date:'Fév-Mar 2025', amount:45, paid:true},
    ]
  },
  { id:'t5', project:'Formation numérique — Dakar', category:'Éducation', amount:1200, spent:480, remaining:720, progress:40, color:'#C8A97E', status:'en-cours',
    expenses:[
      {name:'Déplacement Dakar A/R', date:'Avr 2025', amount:380, paid:true},
      {name:'Location salle ateliers 1&2', date:'Avr 2025', amount:100, paid:true},
      {name:'Location salle ateliers 3-5', date:'Mai-Juin 2025', amount:150, paid:false},
      {name:'Déplacement retour', date:'Juin 2025', amount:380, paid:false},
      {name:'Certificats & clôture', date:'Juin 2025', amount:190, paid:false},
    ]
  },
  { id:'t6', project:'Potager collectif — Sahel', category:'Terrain', amount:2400, spent:0, remaining:2400, progress:0, color:'#8B6E4E', status:'vote',
    expenses:[]
  },
];

const dons = [
  {name:'Marie C.', initials:'MC', color:'#8B6E4E', amount:500, date:'Avr 2025', message:'Pour le terrain en Occitanie 🌱'},
  {name:'Anonyme', initials:'??', color:'#C8A97E', amount:250, date:'Avr 2025', message:''},
  {name:'Thomas R.', initials:'TR', color:'#5C4730', amount:1000, date:'Mars 2025', message:'Pour les projets en Afrique'},
  {name:'Lucie B.', initials:'LB', color:'#A0856A', amount:150, date:'Mars 2025', message:'Continuez ! ✊'},
  {name:'Anonyme', initials:'??', color:'#C8A97E', amount:75, date:'Fév 2025', message:''},
  {name:'Ibrahim D.', initials:'IB', color:'#6B5840', amount:300, date:'Fév 2025', message:'Pour l\'hôpital du bonheur'},
];

const totalBudget = transactions.reduce((s,t)=>s+t.amount,0);
const totalSpent = transactions.reduce((s,t)=>s+t.spent,0);
const totalRemaining = totalBudget - totalSpent;
const totalDons = dons.reduce((s,d)=>s+d.amount,0);

export default function TresoreriePage() {
  const [activeTab, setActiveTab] = useState<'projets'|'dons'|'historique'>('projets');
  const [expandedProject, setExpandedProject] = useState<string|null>(null);
  const [activeFilter, setActiveFilter] = useState('tous');

  const filtered = transactions.filter(t =>
    activeFilter === 'tous' || t.status === activeFilter
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root{--sand:#C8A97E;--sand-light:#E8D5B7;--sand-pale:#F5ECD8;--sand-dark:#8B6E4E;--sand-deep:#5C4730;--ink:#2A1F14;--ink-muted:#6B5840;--cream:#FAF5EC;--warm-white:#FFFDF8;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);}
        .tnav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(255,253,248,0.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(232,213,183,0.4);}
        .tnav-logo{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:300;color:var(--ink);text-decoration:none;letter-spacing:.05em;}
        .tnav-links{display:flex;gap:2rem;list-style:none;}
        .tnav-links a{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);text-decoration:none;}
        .tnav-links a:hover,.tnav-links a.active{color:var(--sand-dark);}
        .tnav-cta{padding:.6rem 1.5rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:2px;text-decoration:none;}

        .page-header{padding:9rem 3rem 3rem;background:var(--warm-white);border-bottom:1px solid var(--sand-light);}
        .page-header-inner{max-width:1200px;margin:0 auto;}
        .page-eyebrow{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--sand);margin-bottom:1rem;font-weight:500;}
        .page-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:300;color:var(--ink);line-height:1.1;margin-bottom:1rem;}
        .page-title em{font-style:italic;color:var(--sand-dark);}
        .page-subtitle{font-size:.95rem;color:var(--ink-muted);line-height:1.7;max-width:520px;}

        .summary-bar{background:var(--ink);padding:2rem 3rem;}
        .summary-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
        .summary-card{display:flex;flex-direction:column;gap:.4rem;}
        .summary-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6B5840;}
        .summary-value{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:300;color:var(--sand-light);}
        .summary-sub{font-size:.75rem;color:#4A3828;}
        .summary-divider{width:1px;background:#3A2E22;align-self:stretch;}

        .global-bar-section{background:var(--ink);padding:0 3rem 2rem;}
        .global-bar-inner{max-width:1200px;margin:0 auto;}
        .global-bar-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6B5840;margin-bottom:.75rem;}
        .global-bar-track{height:8px;background:#3A2E22;border-radius:4px;overflow:hidden;}
        .global-bar-fill{height:100%;background:var(--sand);border-radius:4px;transition:width .8s ease;}

        .page-tabs{padding:0 3rem;background:var(--warm-white);border-bottom:1px solid var(--sand-light);display:flex;gap:0;max-width:100%;}
        .ptab{padding:1.25rem 2rem;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s;}
        .ptab.active{color:var(--sand-dark);border-bottom-color:var(--sand-dark);}
        .ptab:hover{color:var(--ink);}

        .page-content{max-width:1200px;margin:0 auto;padding:3rem;}

        .filters-row{display:flex;gap:.5rem;margin-bottom:2rem;flex-wrap:wrap;}
        .filter-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand);font-weight:500;align-self:center;margin-right:.5rem;}
        .fbtn{padding:.4rem .9rem;border:1px solid var(--sand-light);background:transparent;color:var(--ink-muted);font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:20px;transition:all .2s;}
        .fbtn:hover,.fbtn.active{background:var(--ink);color:var(--sand-pale);border-color:var(--ink);}

        .project-row{background:var(--warm-white);border:1px solid var(--sand-light);border-radius:6px;margin-bottom:1rem;overflow:hidden;transition:border-color .2s;}
        .project-row:hover{border-color:var(--sand);}
        .project-row-header{padding:1.5rem;cursor:pointer;display:flex;align-items:center;gap:1.25rem;}
        .row-color{width:4px;height:48px;border-radius:2px;flex-shrink:0;}
        .row-info{flex:1;}
        .row-title{font-size:.95rem;font-weight:500;color:var(--ink);margin-bottom:.3rem;}
        .row-category{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand);}
        .row-progress{width:200px;}
        .row-progress-track{height:4px;background:var(--sand-light);border-radius:2px;overflow:hidden;margin-bottom:.3rem;}
        .row-progress-fill{height:100%;border-radius:2px;}
        .row-progress-label{font-size:.72rem;color:var(--ink-muted);text-align:right;}
        .row-amounts{display:flex;gap:1.5rem;text-align:right;}
        .amount-block{display:flex;flex-direction:column;gap:.2rem;}
        .amount-label{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand);white-space:nowrap;}
        .amount-value{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:300;color:var(--ink);}
        .row-status{font-size:10px;padding:.2rem .6rem;border-radius:20px;font-weight:500;white-space:nowrap;}
        .status-en-cours{background:#EDF5E8;color:#3B6D11;}
        .status-vote{background:#FEF3E2;color:#854F0B;}
        .status-termine{background:#E6F1FB;color:#185FA5;}
        .row-toggle{font-size:.8rem;color:var(--sand);transition:transform .2s;}
        .row-toggle.open{transform:rotate(180deg);}

        .expenses-panel{border-top:1px solid var(--sand-light);background:var(--sand-pale);}
        .expenses-header{display:grid;grid-template-columns:1fr 120px 100px 90px;gap:1rem;padding:.75rem 1.5rem;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand);border-bottom:1px solid var(--sand-light);}
        .expense-row{display:grid;grid-template-columns:1fr 120px 100px 90px;gap:1rem;padding:.75rem 1.5rem;border-bottom:1px solid rgba(232,213,183,.4);font-size:.82rem;color:var(--ink-muted);align-items:center;}
        .expense-row:last-child{border-bottom:none;}
        .expense-name{color:var(--ink);}
        .exp-badge{font-size:10px;padding:.2rem .5rem;border-radius:20px;}
        .exp-paid{background:#EDF5E8;color:#3B6D11;}
        .exp-pending{background:#FEF3E2;color:#854F0B;}
        .no-expenses{padding:2rem;text-align:center;font-size:.85rem;color:var(--ink-muted);font-style:italic;}

        .dons-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
        .don-card{background:var(--warm-white);border:1px solid var(--sand-light);border-radius:6px;padding:1.25rem;display:flex;flex-direction:column;gap:.75rem;}
        .don-top{display:flex;align-items:center;gap:.875rem;}
        .don-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:.9rem;color:var(--warm-white);flex-shrink:0;}
        .don-name{font-size:.875rem;font-weight:500;color:var(--ink);}
        .don-date{font-size:.72rem;color:var(--ink-muted);}
        .don-amount{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:300;color:var(--sand-dark);}
        .don-message{font-size:.8rem;color:var(--ink-muted);font-style:italic;line-height:1.5;}

        .don-cta{background:var(--ink);border-radius:8px;padding:3rem;text-align:center;margin-top:2rem;}
        .don-cta-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:var(--sand-pale);margin-bottom:.75rem;}
        .don-cta-sub{font-size:.9rem;color:#9A8570;margin-bottom:1.5rem;line-height:1.6;}
        .don-btn{padding:1rem 2.5rem;background:var(--sand);color:var(--ink);border:none;font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:500;cursor:pointer;border-radius:4px;transition:background .2s;}
        .don-btn:hover{background:var(--sand-light);}

        .histo-list{display:flex;flex-direction:column;gap:.5rem;}
        .histo-item{display:grid;grid-template-columns:1fr 150px 120px 100px 90px;gap:1rem;padding:1rem 1.25rem;background:var(--warm-white);border:1px solid var(--sand-light);border-radius:4px;font-size:.82rem;align-items:center;}
        .histo-header{display:grid;grid-template-columns:1fr 150px 120px 100px 90px;gap:1rem;padding:.5rem 1.25rem;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand);margin-bottom:.25rem;}
        .histo-name{color:var(--ink);font-weight:500;}
        .histo-project{color:var(--ink-muted);font-size:.78rem;}

        @media(max-width:900px){
          .tnav{padding:1rem 1.5rem;}.tnav-links{display:none;}
          .summary-inner{grid-template-columns:1fr 1fr;gap:1.5rem;}
          .summary-divider{display:none;}
          .page-header,.summary-bar,.global-bar-section,.page-tabs,.page-content{padding-left:1.5rem;padding-right:1.5rem;}
          .dons-grid{grid-template-columns:1fr 1fr;}
          .row-progress,.row-amounts{display:none;}
          .histo-item,.histo-header{grid-template-columns:1fr 100px 90px;}
        }
      `}</style>

      {/* NAV */}
      <nav className="tnav">
        <a href="/" className="tnav-logo">Mycorhiziens</a>
        <ul className="tnav-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/projets">Projets</a></li>
          <li><a href="/reseau">Réseau</a></li>
          <li><a href="/tresorerie" className="active">Trésorerie</a></li>
        </ul>
        <a href="#" className="tnav-cta">Mon profil</a>
      </nav>

      {/* HEADER */}
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-eyebrow">Finances</p>
          <h1 className="page-title">La <em>trésorerie</em></h1>
          <p className="page-subtitle">Transparence totale sur les fonds de la communauté. Chaque euro alloué, dépensé et restant — visible par tous les membres.</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="summary-bar">
        <div className="summary-inner">
          <div className="summary-card">
            <div className="summary-label">Budget total alloué</div>
            <div className="summary-value">{totalBudget.toLocaleString('fr')} €</div>
            <div className="summary-sub">Sur {transactions.length} projets votés</div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-card">
            <div className="summary-label">Total dépensé</div>
            <div className="summary-value">{totalSpent.toLocaleString('fr')} €</div>
            <div className="summary-sub">{Math.round(totalSpent/totalBudget*100)}% du budget utilisé</div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-card">
            <div className="summary-label">Restant disponible</div>
            <div className="summary-value">{totalRemaining.toLocaleString('fr')} €</div>
            <div className="summary-sub">Réservé aux projets en cours</div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-card">
            <div className="summary-label">Total des dons reçus</div>
            <div className="summary-value">{totalDons.toLocaleString('fr')} €</div>
            <div className="summary-sub">{dons.length} donateurs ce trimestre</div>
          </div>
        </div>
      </div>

      {/* GLOBAL BAR */}
      <div className="global-bar-section">
        <div className="global-bar-inner">
          <div className="global-bar-label">Utilisation globale du budget</div>
          <div className="global-bar-track">
            <div className="global-bar-fill" style={{width:`${Math.round(totalSpent/totalBudget*100)}%`}}></div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="page-tabs">
        {(['projets','dons','historique'] as const).map(tab=>(
          <div key={tab} className={`ptab${activeTab===tab?' active':''}`} onClick={()=>setActiveTab(tab)}>
            {tab==='projets'?'Par projet':tab==='dons'?'Dons reçus':'Historique complet'}
          </div>
        ))}
      </div>

      <div className="page-content">

        {/* PAR PROJET */}
        {activeTab==='projets' && (
          <div>
            <div className="filters-row">
              <span className="filter-label">Statut</span>
              {['tous','en-cours','vote','termine'].map(f=>(
                <button key={f} className={`fbtn${activeFilter===f?' active':''}`} onClick={()=>setActiveFilter(f)}>
                  {f==='tous'?'Tous':f==='en-cours'?'En cours':f==='vote'?'En vote':'Terminés'}
                </button>
              ))}
            </div>
            {filtered.map(t=>(
              <div key={t.id} className="project-row">
                <div className="project-row-header" onClick={()=>setExpandedProject(expandedProject===t.id?null:t.id)}>
                  <div className="row-color" style={{background:t.color}}></div>
                  <div className="row-info">
                    <div className="row-title">{t.project}</div>
                    <div className="row-category">{t.category}</div>
                  </div>
                  <div className="row-progress">
                    <div className="row-progress-track"><div className="row-progress-fill" style={{width:`${t.progress}%`,background:t.color}}></div></div>
                    <div className="row-progress-label">{t.progress}% utilisé</div>
                  </div>
                  <div className="row-amounts">
                    <div className="amount-block">
                      <span className="amount-label">Alloué</span>
                      <span className="amount-value">{t.amount.toLocaleString('fr')} €</span>
                    </div>
                    <div className="amount-block">
                      <span className="amount-label">Dépensé</span>
                      <span className="amount-value">{t.spent.toLocaleString('fr')} €</span>
                    </div>
                    <div className="amount-block">
                      <span className="amount-label">Restant</span>
                      <span className="amount-value">{t.remaining.toLocaleString('fr')} €</span>
                    </div>
                  </div>
                  <span className={`row-status status-${t.status}`}>
                    {t.status==='en-cours'?'En cours':t.status==='vote'?'En vote':'Terminé'}
                  </span>
                  <span className={`row-toggle${expandedProject===t.id?' open':''}`}>▼</span>
                </div>
                {expandedProject===t.id && (
                  <div className="expenses-panel">
                    {t.expenses.length===0
                      ? <div className="no-expenses">Aucune dépense enregistrée — en attente d&apos;approbation du vote.</div>
                      : <>
                          <div className="expenses-header"><span>Libellé</span><span>Date</span><span>Montant</span><span>Statut</span></div>
                          {t.expenses.map((e,i)=>(
                            <div key={i} className="expense-row">
                              <span className="expense-name">{e.name}</span>
                              <span>{e.date}</span>
                              <span style={{fontWeight:500}}>{e.amount.toLocaleString('fr')} €</span>
                              <span><span className={`exp-badge ${e.paid?'exp-paid':'exp-pending'}`}>{e.paid?'Payé':'En attente'}</span></span>
                            </div>
                          ))}
                        </>
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* DONS */}
        {activeTab==='dons' && (
          <div>
            <div className="dons-grid">
              {dons.map((d,i)=>(
                <div key={i} className="don-card">
                  <div className="don-top">
                    <div className="don-avatar" style={{background:d.color}}>{d.initials}</div>
                    <div>
                      <div className="don-name">{d.name}</div>
                      <div className="don-date">{d.date}</div>
                    </div>
                  </div>
                  <div className="don-amount">{d.amount.toLocaleString('fr')} €</div>
                  {d.message && <div className="don-message">&ldquo;{d.message}&rdquo;</div>}
                </div>
              ))}
            </div>
            <div className="don-cta">
              <div className="don-cta-title">Contribuer à la trésorerie</div>
              <p className="don-cta-sub">Chaque don est alloué par vote communautaire. Vous décidez où va votre argent. Transparence totale, traçabilité blockchain.</p>
              <button className="don-btn">Faire un don en crypto</button>
            </div>
          </div>
        )}

        {/* HISTORIQUE */}
        {activeTab==='historique' && (
          <div className="histo-list">
            <div className="histo-header"><span>Libellé</span><span>Projet</span><span>Date</span><span>Montant</span><span>Statut</span></div>
            {transactions.flatMap(t=>
              t.expenses.map((e,i)=>({...e, project:t.project, color:t.color, key:`${t.id}-${i}`}))
            ).sort((a,b)=>a.paid===b.paid?0:a.paid?1:-1).map(e=>(
              <div key={e.key} className="histo-item">
                <div>
                  <div className="histo-name">{e.name}</div>
                  <div className="histo-project">{e.project}</div>
                </div>
                <span style={{fontSize:'.78rem',color:'var(--ink-muted)'}}>{e.project.split('—')[0].trim()}</span>
                <span style={{fontSize:'.82rem',color:'var(--ink-muted)'}}>{e.date}</span>
                <span style={{fontWeight:500,fontFamily:'\'Cormorant Garamond\',serif',fontSize:'1.1rem'}}>{e.amount.toLocaleString('fr')} €</span>
                <span><span className={`exp-badge ${e.paid?'exp-paid':'exp-pending'}`}>{e.paid?'Payé':'En attente'}</span></span>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}