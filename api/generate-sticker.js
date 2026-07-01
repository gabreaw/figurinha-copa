import OpenAI, { toFile } from 'openai'
import Stripe from 'stripe'
import fs from 'node:fs'
import path from 'node:path'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
  maxDuration: 60,
}

// Reuse one of our own example cards as a layout/style reference image,
// so the model has a concrete template to match instead of only a text
// description. If we happen to have a template for the exact country
// selected, it also gets the jersey/flag right for free.
const TEMPLATE_BY_COUNTRY = {
  Mexico: 'mexico.png',
  Uruguay: 'uruguai.png',
  Portugal: 'portugal.png',
  Argentina: 'argentina.png',
  Germany: 'alemanha.png',
}
const FALLBACK_TEMPLATE = 'uruguai.png'

function loadTemplateImage(country) {
  const filename = TEMPLATE_BY_COUNTRY[country] ?? FALLBACK_TEMPLATE
  const filePath = path.join(process.cwd(), 'src', 'assets', filename)
  return fs.readFileSync(filePath)
}

function buildPrompt({ name, country, dob, height, weight, hasExactTemplate }) {
  return [
    `You are given two images: the first is a reference photo of a child, the second is an example sticker card template.`,
    `Recreate the layout, composition and art style of the template exactly (the oversized background number, color blocking, name plate at the bottom, circular flag badge), but with the child from the first photo instead of the template's photo.`,
    `Keep the child's face and likeness clearly recognizable from the first reference photo.`,
    hasExactTemplate
      ? `Keep the template's jersey and flag as-is, since it already matches ${country}.`
      : `Replace the jersey and flag badge with the ${country} national team's colors and flag instead of the template's.`,
    `Update the name plate text to read "${name}" and "${dob} · ${country}"${height ? ` and height ${height}m` : ''}${weight ? ` and weight ${weight}kg` : ''}.`,
    `Portrait orientation, sharp studio lighting, cheerful smiling expression, high quality print-ready collectible card illustration. Do not include any real brand logos or trademarks.`,
  ].join(' ')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ error: 'Server is missing STRIPE_SECRET_KEY' })
    return
  }
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({ error: 'Server is missing OPENAI_API_KEY' })
    return
  }

  try {
    const { photo, name, dob, country, height, weight, sessionId } = req.body ?? {}

    if (!photo || !name || !country || !sessionId) {
      res.status(400).json({ error: 'Missing photo, name, country or payment session' })
      return
    }

    // Never call OpenAI without confirming, server-side, that this exact
    // Stripe checkout session was actually paid. The client's word alone
    // is not enough — this is the only real gate against someone calling
    // this endpoint directly to generate stickers for free.
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    let session
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId)
    } catch {
      res.status(402).json({ error: 'Invalid payment session' })
      return
    }

    if (session.payment_status !== 'paid') {
      res.status(402).json({ error: 'Payment has not been completed for this order' })
      return
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const base64Data = String(photo).split(',').pop()
    const imageBuffer = Buffer.from(base64Data, 'base64')
    const imageFile = await toFile(imageBuffer, 'photo.png', { type: 'image/png' })

    const templateBuffer = loadTemplateImage(country)
    const templateFile = await toFile(templateBuffer, 'template.png', { type: 'image/png' })
    const hasExactTemplate = country in TEMPLATE_BY_COUNTRY

    const result = await openai.images.edit({
      model: 'gpt-image-1',
      image: [imageFile, templateFile],
      prompt: buildPrompt({ name, country, dob, height, weight, hasExactTemplate }),
      size: '1024x1536',
      quality: 'medium',
    })

    const image = result.data?.[0]?.b64_json
    if (!image) {
      throw new Error('OpenAI returned no image')
    }

    res.status(200).json({ image: `data:image/png;base64,${image}` })
  } catch (err) {
    console.error('generate-sticker error:', err)
    res.status(500).json({ error: 'Failed to generate sticker' })
  }
}
