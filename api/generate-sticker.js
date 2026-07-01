import OpenAI, { toFile } from 'openai'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
  maxDuration: 60,
}

function buildPrompt({ name, country, dob, height, weight }) {
  return [
    `Turn the child in the reference photo into a collectible football/soccer sticker card, in the style of an official World Cup sticker album.`,
    `Keep the child's face and likeness clearly recognizable from the reference photo.`,
    `Dress them in a ${country} national team jersey with the team's traditional colors.`,
    `Card design: a bold, oversized number as a background graphic, vibrant color background matching the ${country} team colors, a small circular ${country} flag emblem badge, and a clean name plate at the bottom with the text "${name}" and "${dob} · ${country}"${height ? ` and height ${height}m` : ''}${weight ? ` and weight ${weight}kg` : ''}.`,
    `Portrait orientation, sharp studio lighting, cheerful smiling expression, high quality print-ready collectible card illustration. Do not include any real brand logos or trademarks.`,
  ].join(' ')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({ error: 'Server is missing OPENAI_API_KEY' })
    return
  }

  try {
    const { photo, name, dob, country, height, weight } = req.body ?? {}

    if (!photo || !name || !country) {
      res.status(400).json({ error: 'Missing photo, name or country' })
      return
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const base64Data = String(photo).split(',').pop()
    const imageBuffer = Buffer.from(base64Data, 'base64')
    const imageFile = await toFile(imageBuffer, 'photo.png', { type: 'image/png' })

    const result = await openai.images.edit({
      model: 'gpt-image-1',
      image: imageFile,
      prompt: buildPrompt({ name, country, dob, height, weight }),
      size: '1024x1536',
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
