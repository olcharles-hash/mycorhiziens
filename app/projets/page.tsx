'use client';
import { useState } from 'react';

const projects = [
  {
    id:'terrain1', statut:'en-cours', domaine:'terrain', color:'#8B6E4E',
    title:'Achat terrain — Occitanie', status:'En cours', statusClass:'status-en-cours',
    desc:`Acquisition collective d'un terrain de 2 hectares en Occitanie pour établir notre premier espace communautaire. L'objectif est de régénérer les sols dégradés, d'installer un potager nourricier et de créer un espace d'expérimentation pour de nouvelles pratiques agricoles durables.\n\nLe terrain servira également de lieu de rencontre physique pour les membres de la région.`,
    progress:68, budget:12000, spent:8160, remaining:3840, startDate:'Jan 2025', endDate:'Juin 2025',
    steps:[
      {title:'Identification et analyse du terrain', meta:'Complété — Fév 2025', status:'done'},
      {title:'Vote communautaire pour approbation du budget', meta:'Complété — Fév 2025', status:'done'},
      {title:'Négociation et signature du compromis de vente', meta:'Complété — Mars 2025', status:'done'},
      {title:'Analyse des sols et plan de régénération', meta:'En cours — Karim L. + Amine T.', status:'active'},
      {title:'Premières plantations et installation du compost', meta:'À faire — Mai 2025', status:'todo'},
      {title:'Construction abri et système irrigation', meta:'À faire — Juin 2025', status:'todo'},
    ],
    kanban:{ todo:['Installation panneau solaire','Clôture naturelle périmètre','Semis automne'], active:['Analyse sol (résultats attendus 15 mai)','Plan de plantation définitif'], done:['Compromis signé','Vote budgétaire','Analyse cadastrale','Transport matériel compost'] },
    team:[
      {initials:'KL',color:'#8B6E4E',name:'Karim L.',role:'Leader du projet',exp:'5 ans en gestion de projets agricoles. A mené 3 acquisitions foncières collectives en France.',skills:['Stratégie','Foncier','Agriculture']},
      {initials:'SM',color:'#C8A97E',name:'Sofia M.',role:'Créateur — Communication',exp:'Responsable de la documentation et des mises à jour communautaires.',skills:['Design','Vidéo','Comm']},
      {initials:'AT',color:'#5C4730',name:'Amine T.',role:'Travailleur — Terrain',exp:'Maraîcher expérimenté, spécialisé en permaculture et régénération des sols.',skills:['Permaculture','Maraîchage','Blockchain']},
    ],
    expenses:[
      {name:'Étude notariale et frais juridiques', date:'Fév 2025', amount:'1 200 €', paid:true},
      {name:'Analyse de sol (laboratoire)', date:'Mars 2025', amount:'380 €', paid:true},
      {name:'Acompte sur compromis de vente', date:'Mars 2025', amount:'5 000 €', paid:true},
      {name:'Matériel de compostage initial', date:'Avr 2025', amount:'640 €', paid:true},
      {name:'Clôture naturelle (haie bocagère)', date:'Mai 2025', amount:'1 400 €', paid:false},
      {name:'Installation système irrigation', date:'Juin 2025', amount:'1 800 €', paid:false},
      {name:'Construction abri bois', date:'Juin 2025', amount:'1 000 €', paid:false},
    ],
    tweets:[
      {av:'KL',author:'Karim L.',handle:'@karim.myco',text:'On vient de signer le compromis pour le terrain en Occitanie 🌱 2ha à régénérer. Premier chantier participatif en mai — qui est disponible pour venir planter ? #ProjetTerrain #Mycorhiziens',likes:84,replies:23},
      {av:'SM',author:'Sofia M.',handle:'@sofia.myco',text:'Idée : documenter le projet en time-lapse de mai à décembre. On verrait la transformation du terrain mois par mois. #PropositionMyco',likes:112,replies:34},
    ]
  },
  {
    id:'edu1', statut:'en-cours', domaine:'education', color:'#C8A97E',
    title:'Chaîne YouTube — Saison 1', status:'En cours', statusClass:'status-en-cours',
    desc:`Production d'une première saison de 12 vidéos éducatives diffusées sur la chaîne YouTube communautaire. Chaque épisode traite d'un sujet pratique : construction naturelle, permaculture, autonomie alimentaire, méditation, jeûne.\n\nObjectif : 10 000 abonnés à la fin de la saison.`,
    progress:83, budget:1400, spent:1050, remaining:350, startDate:'Déc 2024', endDate:'Mai 2025',
    steps:[
      {title:'Définition du plan éditorial S1', meta:'Complété — Déc 2024', status:'done'},
      {title:'Tournage épisodes 1 à 4', meta:'Complété — Jan 2025', status:'done'},
      {title:'Publication épisodes 1-4', meta:'Complété — Fév 2025', status:'done'},
      {title:'Tournage épisodes 5 à 8', meta:'Complété — Mars 2025', status:'done'},
      {title:'Publication épisodes 5-8', meta:'En cours — Sofia M.', status:'active'},
      {title:'Tournage et publication épisodes 9-12', meta:'À faire — Mai 2025', status:'todo'},
    ],
    kanban:{ todo:['Épisode 9 — Jeûne','Épisode 10 — Construction en paille','Épisode 11 — Fermentation','Épisode 12 — Bilan S1'], active:['Montage épisode 7','Montage épisode 8'], done:['Épisode 1','Épisode 2','Épisode 3','Épisode 4','Épisode 5','Épisode 6'] },
    team:[
      {initials:'SM',color:'#C8A97E',name:'Sofia M.',role:'Créateur — Réalisatrice',exp:'Réalisatrice et monteuse vidéo. 4 ans d\'expérience en production de contenu éducatif.',skills:['Vidéo','Montage','UX']},
      {initials:'LB',color:'#A0856A',name:'Lucie B.',role:'Créateur — Rédaction',exp:'Script-writer et photographe. Rédige les scripts de chaque épisode.',skills:['Rédaction','Photo','Script']},
    ],
    expenses:[
      {name:'Matériel de tournage', date:'Déc 2024', amount:'420 €', paid:true},
      {name:'Logiciel de montage', date:'Déc 2024', amount:'180 €', paid:true},
      {name:'Déplacements tournages', date:'Jan-Mar 2025', amount:'290 €', paid:true},
      {name:'Musiques libres de droits', date:'Jan 2025', amount:'160 €', paid:true},
      {name:'Miniatures et graphismes', date:'À venir', amount:'350 €', paid:false},
    ],
    tweets:[
      {av:'SM',author:'Sofia M.',handle:'@sofia.myco',text:'L\'épisode 6 sur la permaculture vient de passer les 5 000 vues en 48h 🙏 Merci à tous ! #Mycorhiziens',likes:203,replies:67},
    ]
  },
  {
    id:'sante1', statut:'vote', domaine:'sante', color:'#5C4730',
    title:'Hôpital du Bonheur — Pilote', status:'En vote', statusClass:'status-vote',
    desc:`Création d'une plateforme en ligne regroupant des praticiens de médecine alternative et holistique : naturopathes, hygiénistes, acupuncteurs.\n\nObjectif : rendre accessible une médecine qui traite la source des maladies et non les symptômes.`,
    progress:67, budget:3200, spent:0, remaining:3200, startDate:'En attente vote', endDate:'Fin 2025',
    steps:[
      {title:'Définition du cahier des charges', meta:'Complété — Ibrahim D.', status:'done'},
      {title:'Vote communautaire (en cours)', meta:'67% pour — 142/212 votes', status:'active'},
      {title:'Recrutement des premiers praticiens', meta:'À faire — post-vote', status:'todo'},
      {title:'Développement de la plateforme', meta:'À faire — 3 mois', status:'todo'},
    ],
    kanban:{ todo:['Développement plateforme','Recrutement praticiens','Tests utilisateurs'], active:['Vote communautaire en cours','Cahier des charges v2'], done:['Cahier des charges v1','Étude de marché'] },
    team:[
      {initials:'IB',color:'#5C4730',name:'Ibrahim D.',role:'Créateur — Porteur du projet',exp:'Naturopathe depuis 8 ans. A fondé 2 centres de santé holistique.',skills:['Naturopathie','Gestion','Web3']},
    ],
    expenses:[],
    tweets:[
      {av:'IB',author:'Ibrahim D.',handle:'@ibrahim.myco',text:'Proposition : créer le premier Hôpital du Bonheur en ligne. Traiter la source, pas les symptômes. Votez ici 👇 #PropositionMyco',likes:312,replies:89},
    ]
  },
  {
    id:'social1', statut:'termine', domaine:'social', color:'#A0856A',
    title:'Bibliothèque mobile — Lyon', status:'Terminé', statusClass:'status-termine',
    desc:`Bibliothèque itinérante dans 3 quartiers de Lyon avec 400 ouvrages sur l'autonomie, la santé naturelle et le développement personnel.\n\nRésultats : 240 livres empruntés en 6 semaines, 3 ateliers de lecture, 47 nouveaux membres.`,
    progress:100, budget:850, spent:823, remaining:27, startDate:'Jan 2025', endDate:'Mars 2025',
    steps:[
      {title:'Sélection des 400 ouvrages', meta:'Complété', status:'done'},
      {title:'Achat et réception des livres', meta:'Complété', status:'done'},
      {title:'Tournée dans les 3 quartiers', meta:'Complété — 6 semaines', status:'done'},
      {title:'Ateliers de lecture communautaires', meta:'Complété — 3 ateliers', status:'done'},
    ],
    kanban:{ todo:[], active:[], done:['Sélection livres','Achat ouvrages','Tournée quartier 1','Tournée quartier 2','Tournée quartier 3','3 ateliers lecture'] },
    team:[
      {initials:'LB',color:'#A0856A',name:'Lucie B.',role:'Leader du projet',exp:'A coordonné l\'ensemble de la logistique et sélectionné les 400 ouvrages.',skills:['Logistique','Curation','Comm']},
    ],
    expenses:[
      {name:'Achat ouvrages (400 livres)', date:'Jan 2025', amount:'520 €', paid:true},
      {name:'Aménagement étagères véhicule', date:'Jan 2025', amount:'180 €', paid:true},
      {name:'Impression flyers', date:'Fév 2025', amount:'78 €', paid:true},
      {name:'Rafraîchissements ateliers', date:'Fév-Mar 2025', amount:'45 €', paid:true},
    ],
    tweets:[
      {av:'LB',author:'Lucie B.',handle:'@lucie.myco',text:'Projet bibliothèque mobile Lyon : TERMINÉ ✅ 240 livres empruntés, 3 ateliers, 47 nouveaux membres. Merci à toute l\'équipe 🙏 #Mycorhiziens',likes:387,replies:94},
    ]
  },
];

export default function ProjetsPage() {
  const [activeStatut, setActiveStatut] = useState('tous');
  const [activeDomaine, setActiveDomaine] = useState('tous');
  const [viewMode, setViewMode] = useState<'grid'|'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0]|null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [planView, setPlanView] = useState<'list'|'kanban'>('list');
  const [showAllExpenses, setShowAllExpenses] = useState(false);

  const filtered = projects.filter(p => {
    const okStatut = activeStatut === 'tous' || p.statut === activeStatut;
    const okDomaine = activeDomaine === 'tous' || p.domaine === activeDomaine;
    return okStatut && okDomaine;
  });

  const openProject = (p: typeof projects[0]) => {
    setSelectedProject(p);
    setActiveTab('overview');
    setPlanView('list');
    setShowAllExpenses(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root { --sand:#C8A97E;--sand-light:#E8D5B7;--sand-pale:#F5ECD8;--sand-dark:#8B6E4E;--sand-deep:#5C4730;--ink:#2A1F14;--ink-muted:#6B5840;--cream:#FAF5EC;--warm-white:#FFFDF8; }
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);}
        .pnav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(255,253,248,0.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(232,213,183,0.4);}
        .pnav-logo{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:300;color:var(--ink);text-decoration:none;letter-spacing:.05em;}
        .pnav-links{display:flex;gap:2rem;list-style:none;}
        .pnav-links a{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);text-decoration:none;}
        .pnav-links a:hover,.pnav-links a.active{color:var(--sand-dark);}
        .pnav-cta{padding:.6rem 1.5rem;background:var(--ink);color:var(--sand-pale);border:none;font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:2px;text-decoration:none;}
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
        .filters-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:2rem;flex-wrap:wrap;}
        .filter-group{display:flex;gap:.5rem;align-items:center;}
        .filter-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand);font-weight:500;}
        .fbtn{padding:.4rem .9rem;border:1px solid var(--sand-light);background:transparent;color:var(--ink-muted);font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:20px;transition:all .2s;}
        .fbtn:hover,.fbtn.active{background:var(--ink);color:var(--sand-pale);border-color:var(--ink);}
        .filter-sep{width:1px;height:20px;background:var(--sand-light);}
        .view-toggle{margin-left:auto;display:flex;gap:.25rem;}
        .vbtn{padding:.4rem .7rem;border:1px solid var(--sand-light);background:transparent;cursor:pointer;border-radius:4px;color:var(--ink-muted);font-size:.8rem;transition:all .2s;}
        .vbtn.active{background:var(--ink);color:var(--sand-pale);border-color:var(--ink);}
        .projects-container{max-width:1200px;margin:0 auto;padding:3rem;}
        .projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        .projects-grid.list-view{grid-template-columns:1fr;}
        .project-card{background:var(--warm-white);border:1px solid var(--sand-light);border-radius:6px;overflow:hidden;cursor:pointer;transition:all .25s;display:flex;flex-direction:column;}
        .project-card:hover{border-color:var(--sand);transform:translateY(-2px);box-shadow:0 8px 32px rgba(139,110,78,.08);}
        .list-view .project-card{flex-direction:row;}
        .card-color-bar{height:3px;width:100%;}
        .list-view .card-color-bar{width:4px;height:auto;flex-shrink:0;}
        .card-body{padding:1.5rem;flex:1;display:flex;flex-direction:column;gap:.75rem;}
        .card-meta{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;}
        .card-domain{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand);font-weight:500;}
        .card-status{font-size:10px;padding:.2rem .6rem;border-radius:20px;font-weight:500;}
        .status-en-cours{background:#EDF5E8;color:#3B6D11;}
        .status-vote{background:#FEF3E2;color:#854F0B;}
        .status-termine{background:#E6F1FB;color:#185FA5;}
        .card-title{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:400;color:var(--ink);line-height:1.2;}
        .card-desc{font-size:.82rem;color:var(--ink-muted);line-height:1.65;flex:1;}
        .progress-bar-track{height:2px;background:var(--sand-light);border-radius:2px;overflow:hidden;}
        .progress-bar-fill{height:100%;border-radius:2px;}
        .progress-meta{display:flex;justify-content:space-between;font-size:.72rem;color:var(--ink-muted);}
        .card-footer{display:flex;align-items:center;justify-content:space-between;padding-top:.75rem;border-top:1px solid var(--sand-light);}
        .card-team{display:flex;}
        .team-av-sm{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:500;color:var(--warm-white);border:2px solid var(--warm-white);margin-left:-6px;}
        .team-av-sm:first-child{margin-left:0;}
        .card-budget{font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--sand-dark);}
        .modal-overlay{position:fixed;inset:0;background:rgba(42,31,20,.6);z-index:200;display:flex;align-items:flex-start;justify-content:flex-end;}
        .modal-panel{width:min(780px,95vw);height:100vh;background:var(--warm-white);overflow-y:auto;display:flex;flex-direction:column;animation:slideIn .35s cubic-bezier(.4,0,.2,1);}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        .modal-header{padding:2rem 2.5rem 1.5rem;border-bottom:1px solid var(--sand-light);position:sticky;top:0;background:var(--warm-white);z-index:10;}
        .modal-close{position:absolute;top:1.5rem;right:1.5rem;width:32px;height:32px;border:1px solid var(--sand-light);background:transparent;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--ink-muted);font-size:1rem;transition:all .2s;}
        .modal-close:hover{background:var(--sand-pale);}
        .modal-domain{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand);margin-bottom:.75rem;font-weight:500;}
        .modal-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:var(--ink);line-height:1.15;margin-bottom:.75rem;}
        .modal-tabs{display:flex;border-bottom:1px solid var(--sand-light);padding:0 2.5rem;background:var(--warm-white);position:sticky;top:130px;z-index:9;overflow-x:auto;}
        .mtab{padding:.875rem 1.25rem;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s;white-space:nowrap;}
        .mtab.active{color:var(--sand-dark);border-bottom-color:var(--sand-dark);}
        .modal-content{padding:2rem 2.5rem;flex:1;}
        .section-h{font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;color:var(--sand);margin-bottom:1rem;margin-top:2rem;font-weight:500;}
        .overview-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:2rem;}
        .ov-stat{background:var(--sand-pale);border-radius:4px;padding:1rem 1.25rem;}
        .ov-stat-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand);margin-bottom:.4rem;}
        .ov-stat-value{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:300;color:var(--ink);}
        .desc-block{font-size:.9rem;color:var(--ink-muted);line-height:1.8;}
        .planning-toggle{display:flex;gap:.5rem;margin-bottom:1.5rem;}
        .pbtn{padding:.4rem 1rem;border:1px solid var(--sand-light);background:transparent;font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:4px;transition:all .2s;color:var(--ink-muted);}
        .pbtn.active{background:var(--ink);color:var(--sand-pale);border-color:var(--ink);}
        .steps-list{display:flex;flex-direction:column;gap:.75rem;}
        .step-item{display:flex;align-items:flex-start;gap:1rem;padding:1rem 1.25rem;background:var(--warm-white);border:1px solid var(--sand-light);border-radius:4px;}
        .step-icon{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:11px;}
        .step-done-icon{background:#EDF5E8;}
        .step-active-icon{background:#FEF3E2;}
        .step-todo-icon{background:var(--sand-pale);}
        .step-text{flex:1;}
        .step-title{font-size:.875rem;font-weight:500;color:var(--ink);margin-bottom:.2rem;}
        .step-meta{font-size:.75rem;color:var(--ink-muted);}
        .step-tag{font-size:10px;padding:.15rem .5rem;border-radius:20px;white-space:nowrap;}
        .tag-done{background:#EDF5E8;color:#3B6D11;}
        .tag-active{background:#FEF3E2;color:#854F0B;}
        .tag-todo{background:var(--sand-pale);color:var(--sand-deep);}
        .kanban-board{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
        .kanban-col{background:var(--sand-pale);border-radius:6px;padding:1rem;}
        .kanban-col-title{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand-dark);margin-bottom:.75rem;font-weight:500;}
        .kanban-card{background:var(--warm-white);border:1px solid var(--sand-light);border-radius:4px;padding:.875rem;margin-bottom:.5rem;font-size:.82rem;color:var(--ink);line-height:1.5;}
        .team-list{display:flex;flex-direction:column;gap:1rem;}
        .team-member{display:flex;align-items:flex-start;gap:1rem;padding:1.25rem;background:var(--warm-white);border:1px solid var(--sand-light);border-radius:6px;}
        .member-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--warm-white);flex-shrink:0;}
        .member-info{flex:1;}
        .member-name{font-size:.95rem;font-weight:500;color:var(--ink);margin-bottom:.2rem;}
        .member-role{font-size:.78rem;color:var(--sand-dark);margin-bottom:.4rem;}
        .member-exp{font-size:.78rem;color:var(--ink-muted);line-height:1.55;}
        .member-skills{display:flex;flex-wrap:wrap;gap:4px;margin-top:.5rem;}
        .skill-pill{font-size:10px;padding:2px 8px;background:var(--sand-pale);color:var(--sand-deep);border-radius:20px;}
        .msg-btn{padding:.45rem 1rem;border:1px solid var(--sand-light);background:transparent;font-family:'DM Sans',sans-serif;font-size:.75rem;cursor:pointer;border-radius:4px;color:var(--ink-muted);transition:all .2s;white-space:nowrap;}
        .msg-btn:hover{border-color:var(--sand);color:var(--sand-dark);}
        .budget-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem;}
        .budget-card{background:var(--sand-pale);border-radius:4px;padding:1rem 1.25rem;}
        .budget-card-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sand);margin-bottom:.4rem;}
        .budget-card-value{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:300;color:var(--ink);}
        .budget-bar-track{height:6px;background:var(--sand-light);border-radius:4px;overflow:hidden;margin-bottom:1.5rem;}
        .budget-bar-fill{height:100%;background:var(--sand-dark);border-radius:4px;}
        .expense-header{display:grid;grid-template-columns:1fr 100px 80px 90px;gap:1rem;padding:.5rem 1rem;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--sand);border-bottom:1px solid var(--sand-light);margin-bottom:.5rem;}
        .expense-item{display:grid;grid-template-columns:1fr 100px 80px 90px;gap:1rem;padding:.75rem 1rem;border-bottom:1px solid rgba(232,213,183,.5);font-size:.82rem;color:var(--ink-muted);align-items:center;}
        .expense-name{color:var(--ink);}
        .exp-status{font-size:10px;padding:.2rem .5rem;border-radius:20px;}
        .exp-paid{background:#EDF5E8;color:#3B6D11;}
        .exp-pending{background:#FEF3E2;color:#854F0B;}
        .show-more-btn{margin-top:1rem;padding:.6rem 1.25rem;border:1px solid var(--sand-light);background:transparent;font-family:'DM Sans',sans-serif;font-size:.78rem;cursor:pointer;border-radius:4px;color:var(--ink-muted);width:100%;}
        .show-more-btn:hover{border-color:var(--sand);color:var(--sand-dark);}
        .tweet-feed{display:flex;flex-direction:column;gap:1rem;}
        .tweet-card{background:var(--warm-white);border:1px solid var(--sand-light);border-radius:6px;padding:1.25rem;transition:border-color .2s;}
        .tweet-card:hover{border-color:var(--sand);}
        .tweet-top{display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;}
        .tweet-av{width:36px;height:36px;border-radius:50%;background:var(--sand);display:flex;align-items:center;justify-content:center;font-size:.75rem;color:var(--warm-white);font-weight:500;flex-shrink:0;}
        .tweet-author{font-size:.875rem;font-weight:500;color:var(--ink);}
        .tweet-handle{font-size:.72rem;color:var(--ink-muted);}
        .tweet-body{font-size:.875rem;color:var(--ink);line-height:1.6;}
        .tweet-footer{display:flex;gap:1.5rem;margin-top:.75rem;padding-top:.75rem;border-top:1px solid var(--sand-light);font-size:.75rem;color:var(--ink-muted);}
        .empty-state{text-align:center;padding:4rem 2rem;color:var(--ink-muted);font-size:.9rem;}
        @media(max-width:900px){.pnav{padding:1rem 1.5rem;}.pnav-links{display:none;}.projects-grid{grid-template-columns:1fr;}.page-header,.stats-bar,.filters-bar,.projects-container{padding-left:1.5rem;padding-right:1.5rem;}.modal-panel{width:100vw;}.kanban-board{grid-template-columns:1fr;}.overview-grid,.budget-summary{grid-template-columns:1fr 1fr;}}
      `}</style>

      {/* NAV */}
      <nav className="pnav">
        <a href="/" className="pnav-logo">Mycorhiziens</a>
        <ul className="pnav-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/projets" className="active">Projets</a></li>
          <li><a href="#">Réseau</a></li>
          <li><a href="#">Trésorerie</a></li>
        </ul>
        <a href="#" className="pnav-cta">Mon profil</a>
      </nav>

      {/* HEADER */}
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-eyebrow">Communauté</p>
          <h1 className="page-title">Projets <em>en cours</em></h1>
          <p className="page-subtitle">Suivez l&apos;avancement de chaque initiative, les équipes, les budgets et les résultats.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item"><span className="stat-num">12</span><span className="stat-label">Projets actifs</span></div>
          <div className="stat-div"></div>
          <div className="stat-item"><span className="stat-num">4</span><span className="stat-label">En vote</span></div>
          <div className="stat-div"></div>
          <div className="stat-item"><span className="stat-num">7</span><span className="stat-label">Terminés</span></div>
          <div className="stat-div"></div>
          <div className="stat-item"><span className="stat-num">38 400 €</span><span className="stat-label">Budget total alloué</span></div>
          <div className="stat-div"></div>
          <div className="stat-item"><span className="stat-num">63</span><span className="stat-label">Membres impliqués</span></div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters-bar">
        <div className="filters-inner">
          <div className="filter-group">
            <span className="filter-label">Statut</span>
            {['tous','en-cours','vote','termine'].map(s => (
              <button key={s} className={`fbtn${activeStatut===s?' active':''}`} onClick={()=>setActiveStatut(s)}>
                {s==='tous'?'Tous':s==='en-cours'?'En cours':s==='vote'?'En vote':'Terminés'}
              </button>
            ))}
          </div>
          <div className="filter-sep"></div>
          <div className="filter-group">
            <span className="filter-label">Domaine</span>
            {['tous','terrain','education','sante','social'].map(d => (
              <button key={d} className={`fbtn${activeDomaine===d?' active':''}`} onClick={()=>setActiveDomaine(d)}>
                {d==='tous'?'Tous':d==='terrain'?'Terrain':d==='education'?'Éducation':d==='sante'?'Santé':'Social'}
              </button>
            ))}
          </div>
          <div className="view-toggle">
            <button className={`vbtn${viewMode==='grid'?' active':''}`} onClick={()=>setViewMode('grid')}>⊞</button>
            <button className={`vbtn${viewMode==='list'?' active':''}`} onClick={()=>setViewMode('list')}>☰</button>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="projects-container">
        <div className={`projects-grid${viewMode==='list'?' list-view':''}`}>
          {filtered.map(p => (
            <div key={p.id} className="project-card" onClick={()=>openProject(p)}>
              <div className="card-color-bar" style={{background:p.color}}></div>
              <div className="card-body">
                <div className="card-meta">
                  <span className="card-domain">{p.domaine}</span>
                  <span className={`card-status ${p.statusClass}`}>{p.status}</span>
                </div>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-desc">{p.desc.split('\n')[0]}</p>
                <div>
                  <div className="progress-bar-track"><div className="progress-bar-fill" style={{width:`${p.progress}%`,background:p.color}}></div></div>
                  <div className="progress-meta"><span>{p.progress}% complété</span><span>{p.endDate}</span></div>
                </div>
                <div className="card-footer">
                  <div className="card-team">
                    {p.team.slice(0,3).map(m=>(
                      <div key={m.name} className="team-av-sm" style={{background:m.color}}>{m.initials}</div>
                    ))}
                  </div>
                  <span className="card-budget">{p.budget.toLocaleString('fr')} €</span>
                  <span style={{fontSize:'.8rem',color:'var(--sand)'}}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setSelectedProject(null)}}>
          <div className="modal-panel">
            <div className="modal-header">
              <button className="modal-close" onClick={()=>setSelectedProject(null)}>✕</button>
              <p className="modal-domain">{selectedProject.domaine}</p>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <span className={`card-status ${selectedProject.statusClass}`}>{selectedProject.status}</span>
            </div>

            <div className="modal-tabs">
              {['overview','planning','team','budget','brainstorm'].map(tab=>(
                <div key={tab} className={`mtab${activeTab===tab?' active':''}`} onClick={()=>setActiveTab(tab)}>
                  {tab==='overview'?'Vue d\'ensemble':tab==='planning'?'Planning':tab==='team'?'Équipe':tab==='budget'?'Budget':'Brainstorming'}
                </div>
              ))}
            </div>

            <div className="modal-content">

              {/* OVERVIEW */}
              {activeTab==='overview' && (
                <div>
                  <div className="overview-grid">
                    <div className="ov-stat"><div className="ov-stat-label">Budget alloué</div><div className="ov-stat-value">{selectedProject.budget.toLocaleString('fr')} €</div></div>
                    <div className="ov-stat"><div className="ov-stat-label">Dépensé</div><div className="ov-stat-value">{selectedProject.spent.toLocaleString('fr')} €</div></div>
                    <div className="ov-stat"><div className="ov-stat-label">Début</div><div className="ov-stat-value" style={{fontSize:'1.2rem'}}>{selectedProject.startDate}</div></div>
                    <div className="ov-stat"><div className="ov-stat-label">Échéance</div><div className="ov-stat-value" style={{fontSize:'1.2rem'}}>{selectedProject.endDate}</div></div>
                  </div>
                  <div className="section-h">Description</div>
                  <p className="desc-block">{selectedProject.desc.replace(/\n/g,'\n\n')}</p>
                  <div className="section-h">Avancement</div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'.82rem',color:'var(--ink-muted)',marginBottom:'.5rem'}}>
                    <span>{selectedProject.progress}% complété</span>
                    <span>{selectedProject.steps.filter(s=>s.status==='done').length}/{selectedProject.steps.length} étapes</span>
                  </div>
                  <div className="progress-bar-track" style={{height:'6px'}}><div className="progress-bar-fill" style={{width:`${selectedProject.progress}%`,background:selectedProject.color}}></div></div>
                </div>
              )}

              {/* PLANNING */}
              {activeTab==='planning' && (
                <div>
                  <div className="planning-toggle">
                    <button className={`pbtn${planView==='list'?' active':''}`} onClick={()=>setPlanView('list')}>Liste</button>
                    <button className={`pbtn${planView==='kanban'?' active':''}`} onClick={()=>setPlanView('kanban')}>Kanban</button>
                  </div>
                  {planView==='list' && (
                    <div className="steps-list">
                      {selectedProject.steps.map((s,i)=>(
                        <div key={i} className="step-item">
                          <div className={`step-icon step-${s.status}-icon`}>{s.status==='done'?'✓':s.status==='active'?'●':'○'}</div>
                          <div className="step-text">
                            <div className="step-title">{s.title}</div>
                            <div className="step-meta">{s.meta}</div>
                          </div>
                          <span className={`step-tag tag-${s.status}`}>{s.status==='done'?'Fait':s.status==='active'?'En cours':'À faire'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {planView==='kanban' && (
                    <div className="kanban-board">
                      {(['todo','active','done'] as const).map(col=>(
                        <div key={col} className="kanban-col">
                          <div className="kanban-col-title">{col==='todo'?'À faire':col==='active'?'En cours':'Terminé'} ({selectedProject.kanban[col].length})</div>
                          {selectedProject.kanban[col].map((item,i)=><div key={i} className="kanban-card">{item}</div>)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TEAM */}
              {activeTab==='team' && (
                <div className="team-list">
                  {selectedProject.team.map((m,i)=>(
                    <div key={i} className="team-member">
                      <div className="member-avatar" style={{background:m.color}}>{m.initials}</div>
                      <div className="member-info">
                        <div className="member-name">{m.name}</div>
                        <div className="member-role">{m.role}</div>
                        <div className="member-exp">{m.exp}</div>
                        <div className="member-skills">{m.skills.map(s=><span key={s} className="skill-pill">{s}</span>)}</div>
                      </div>
                      <button className="msg-btn">✉ Message</button>
                    </div>
                  ))}
                </div>
              )}

              {/* BUDGET */}
              {activeTab==='budget' && (
                <div>
                  <div className="budget-summary">
                    <div className="budget-card"><div className="budget-card-label">Budget total</div><div className="budget-card-value">{selectedProject.budget.toLocaleString('fr')} €</div></div>
                    <div className="budget-card"><div className="budget-card-label">Dépensé</div><div className="budget-card-value">{selectedProject.spent.toLocaleString('fr')} €</div></div>
                    <div className="budget-card"><div className="budget-card-label">Restant</div><div className="budget-card-value">{selectedProject.remaining.toLocaleString('fr')} €</div></div>
                  </div>
                  <div className="budget-bar-track"><div className="budget-bar-fill" style={{width:`${selectedProject.budget>0?Math.round(selectedProject.spent/selectedProject.budget*100):0}%`}}></div></div>
                  {selectedProject.expenses.length===0
                    ? <div className="empty-state">Aucune dépense enregistrée pour l&apos;instant.</div>
                    : <>
                        <div className="expense-header"><span>Libellé</span><span>Date</span><span>Montant</span><span>Statut</span></div>
                        {(showAllExpenses ? selectedProject.expenses : selectedProject.expenses.slice(0,4)).map((e,i)=>(
                          <div key={i} className="expense-item">
                            <span className="expense-name">{e.name}</span>
                            <span>{e.date}</span>
                            <span style={{fontWeight:500}}>{e.amount}</span>
                            <span><span className={`exp-status ${e.paid?'exp-paid':'exp-pending'}`}>{e.paid?'Payé':'En attente'}</span></span>
                          </div>
                        ))}
                        {selectedProject.expenses.length>4 && (
                          <button className="show-more-btn" onClick={()=>setShowAllExpenses(!showAllExpenses)}>
                            {showAllExpenses?'Voir moins ↑':`Voir toutes les dépenses (${selectedProject.expenses.length}) ↓`}
                          </button>
                        )}
                      </>
                  }
                </div>
              )}

              {/* BRAINSTORM */}
              {activeTab==='brainstorm' && (
                <div>
                  <p style={{fontSize:'.85rem',color:'var(--ink-muted)',marginBottom:'1.5rem',lineHeight:1.6}}>Les discussions autour de ce projet, directement depuis X. Cliquez pour voir la conversation complète.</p>
                  <div className="tweet-feed">
                    {selectedProject.tweets.map((t,i)=>(
                      <div key={i} className="tweet-card">
                        <div className="tweet-top">
                          <div className="tweet-av">{t.av}</div>
                          <div><div className="tweet-author">{t.author}</div><div className="tweet-handle">{t.handle}</div></div>
                          <span style={{marginLeft:'auto',fontSize:'.8rem',color:'var(--sand-light)'}}>𝕏 →</span>
                        </div>
                        <div className="tweet-body">{t.text}</div>
                        <div className="tweet-footer">
                          <span>♡ {t.likes}</span>
                          <span>💬 {t.replies} réponses</span>
                          <span style={{marginLeft:'auto',color:'var(--sand)'}}>Voir sur X →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
