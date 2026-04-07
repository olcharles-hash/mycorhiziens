import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { type, to, data } = await request.json();

    let subject = '';
    let html = '';

    const baseStyle = `
      font-family: 'Georgia', serif;
      background: #FAF5EC;
      color: #2A1F14;
      padding: 0;
      margin: 0;
    `;

    const containerStyle = `
      max-width: 600px;
      margin: 0 auto;
      background: #FFFDF8;
      border: 1px solid #E8D5B7;
    `;

    const headerStyle = `
      background: #2A1F14;
      padding: 2rem 2.5rem;
      text-align: center;
    `;

    const bodyStyle = `
      padding: 2.5rem;
    `;

    const footerStyle = `
      background: #F5ECD8;
      padding: 1.5rem 2.5rem;
      text-align: center;
      border-top: 1px solid #E8D5B7;
    `;

    const btnStyle = `
      display: inline-block;
      padding: 0.875rem 2rem;
      background: #2A1F14;
      color: #F5ECD8;
      text-decoration: none;
      border-radius: 4px;
      font-family: sans-serif;
      font-size: 0.9rem;
      margin-top: 1.5rem;
    `;

    if (type === 'welcome') {
      subject = '🌱 Bienvenue dans les Mycorhiziens !';
      html = `
        <div style="${baseStyle}">
          <div style="${containerStyle}">
            <div style="${headerStyle}">
              <h1 style="color: #C8A97E; font-size: 1.8rem; font-weight: 300; margin: 0; letter-spacing: 0.05em;">Mycorhiziens</h1>
              <p style="color: #8B6E4E; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; margin: 0.5rem 0 0;">Un réseau d'humains conscients</p>
            </div>
            <div style="${bodyStyle}">
              <h2 style="font-size: 1.5rem; font-weight: 300; color: #2A1F14; margin-bottom: 1rem;">Bienvenue, ${data.name} 🌿</h2>
              <p style="color: #6B5840; line-height: 1.8; font-family: sans-serif; font-size: 0.95rem;">Tu fais maintenant partie du réseau Mycorhizien. Comme le mycélium relie les arbres d'une forêt, nous relions des humains engagés pour agir ensemble.</p>
              <p style="color: #6B5840; line-height: 1.8; font-family: sans-serif; font-size: 0.95rem; margin-top: 1rem;">Ton rôle souhaité — <strong>${data.role}</strong> — sera confirmé par vote de la communauté. Tu recevras une notification dès que ce sera fait.</p>
              <p style="color: #6B5840; line-height: 1.8; font-family: sans-serif; font-size: 0.95rem; margin-top: 1rem;">En attendant, explore les projets en cours, vote pour ceux qui te tiennent à cœur et connecte-toi avec d'autres membres.</p>
              <div style="text-align: center;">
                <a href="https://mycorhiziens.vercel.app/projets" style="${btnStyle}">Découvrir les projets →</a>
              </div>
            </div>
            <div style="${footerStyle}">
              <p style="font-family: sans-serif; font-size: 0.78rem; color: #8B6E4E; margin: 0;">« Chaque être humain possède en lui du génie. »</p>
              <p style="font-family: sans-serif; font-size: 0.72rem; color: #A0856A; margin: 0.5rem 0 0;">mycorhiziens.vercel.app</p>
            </div>
          </div>
        </div>
      `;
    }

    else if (type === 'new_vote') {
      subject = `🗳️ Nouveau vote — ${data.projectTitle}`;
      html = `
        <div style="${baseStyle}">
          <div style="${containerStyle}">
            <div style="${headerStyle}">
              <h1 style="color: #C8A97E; font-size: 1.8rem; font-weight: 300; margin: 0; letter-spacing: 0.05em;">Mycorhiziens</h1>
            </div>
            <div style="${bodyStyle}">
              <h2 style="font-size: 1.5rem; font-weight: 300; color: #2A1F14; margin-bottom: 1rem;">Un projet a besoin de ton vote 🗳️</h2>
              <p style="color: #6B5840; line-height: 1.8; font-family: sans-serif; font-size: 0.95rem;">Le projet <strong>${data.projectTitle}</strong> est maintenant ouvert au vote communautaire.</p>
              <div style="background: #F5ECD8; border: 1px solid #E8D5B7; border-radius: 4px; padding: 1.25rem; margin: 1.5rem 0;">
                <p style="font-family: sans-serif; font-size: 0.82rem; color: #6B5840; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.15em;">Budget demandé</p>
                <p style="font-family: Georgia, serif; font-size: 1.5rem; color: #2A1F14; margin: 0;">${data.budget} €</p>
              </div>
              <p style="color: #6B5840; line-height: 1.8; font-family: sans-serif; font-size: 0.95rem;">${data.desc}</p>
              <div style="text-align: center;">
                <a href="https://mycorhiziens.vercel.app/projets" style="${btnStyle}">Voter maintenant →</a>
              </div>
            </div>
            <div style="${footerStyle}">
              <p style="font-family: sans-serif; font-size: 0.72rem; color: #A0856A; margin: 0;">mycorhiziens.vercel.app</p>
            </div>
          </div>
        </div>
      `;
    }

    else if (type === 'project_approved') {
      subject = `✅ Projet approuvé — ${data.projectTitle}`;
      html = `
        <div style="${baseStyle}">
          <div style="${containerStyle}">
            <div style="${headerStyle}">
              <h1 style="color: #C8A97E; font-size: 1.8rem; font-weight: 300; margin: 0; letter-spacing: 0.05em;">Mycorhiziens</h1>
            </div>
            <div style="${bodyStyle}">
              <h2 style="font-size: 1.5rem; font-weight: 300; color: #2A1F14; margin-bottom: 1rem;">Ton projet a été approuvé ! 🎉</h2>
              <p style="color: #6B5840; line-height: 1.8; font-family: sans-serif; font-size: 0.95rem;">La communauté a voté pour approuver <strong>${data.projectTitle}</strong>. Un budget de <strong>${data.budget} €</strong> a été alloué depuis la trésorerie.</p>
              <p style="color: #6B5840; line-height: 1.8; font-family: sans-serif; font-size: 0.95rem; margin-top: 1rem;">Les Leaders vont prendre contact avec toi prochainement pour coordonner l'exécution du projet.</p>
              <div style="text-align: center;">
                <a href="https://mycorhiziens.vercel.app/projets" style="${btnStyle}">Voir le projet →</a>
              </div>
            </div>
            <div style="${footerStyle}">
              <p style="font-family: sans-serif; font-size: 0.72rem; color: #A0856A; margin: 0;">mycorhiziens.vercel.app</p>
            </div>
          </div>
        </div>
      `;
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'Mycorhiziens <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ success: true, id: emailData?.id });

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}