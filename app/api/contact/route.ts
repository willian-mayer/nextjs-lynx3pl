// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend('e_DL2KsfHg_3Cfv6eHPnqHSjFk9F3CKQ1Xd');

export async function POST(request: NextRequest) {
  try {
    // 1. Obtener datos del formulario
    const body = await request.json();
    const { name, email, message, interests, captchaToken } = body;

    // 2. Validar que todos los campos estén presentes
    if (!name || !email || !message || !captchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Validar Cloudflare Turnstile
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: '0x4AAAAAACLRfpJBzIrzTt-fS4VItzIKxEk',
          response: captchaToken,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: 'Captcha validation failed' },
        { status: 400 }
      );
    }

    // 4. Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 5. Preparar contenido del email
    const interestsText = interests && interests.length > 0 
      ? interests.join(', ') 
      : 'None';

    const emailBody = `You received a new message from your website:

═══════════════════════════════════
Name: ${name}
Email: ${email}
Interests: ${interestsText}
═══════════════════════════════════

Message:
${message}

═══════════════════════════════════
This message was sent from the Lynx3PL contact form.`;

    // 6. Enviar email con Resend
    const { data, error } = await resend.emails.send({
      from: 'Lynx3PL Website <noreply@lynx3pl.com>',
      to: ['info@lynx3pl.com'],
      subject: `New Contact Form - ${name}`,
      text: emailBody,
      replyTo: email,
    });

    // 7. Verificar si hubo error
    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    // 8. Retornar respuesta exitosa
    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}