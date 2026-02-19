import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message, _trap } = body

    // US-G6 — honeypot: if filled, silently reject
    if (_trap) {
      return NextResponse.json({ success: true }) // fake success to fool bots
    }

    // US-G6 — server-side validation
    const errors: Record<string, string> = {}
    if (!name || name.trim().length < 2) errors.name = 'Please enter your full name.'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = 'Please enter a valid email address.'
    if (!message || message.trim().length < 10)
      errors.message = 'Please enter a message (at least 10 characters).'

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 })
    }

    // ── Send email here when ready ──────────────────────────────────────────
    // e.g. using Resend, Nodemailer, or SendGrid:
    //
    // await resend.emails.send({
    //   from: 'noreply@goldentee.com',
    //   to: 'hello@goldentee.com',
    //   subject: `New enquiry from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\n${message}`,
    // })
    // ───────────────────────────────────────────────────────────────────────

    console.log('Contact form submission:', { name, email, phone, message })

    // US-G7 — analytics event can be fired client-side on success
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, errors: { form: 'Something went wrong. Please try again.' } },
      { status: 500 },
    )
  }
}
