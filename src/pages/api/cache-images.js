import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  try {
    const imageUrl = req.query.url; // Get the image URL from query parameters

    // Fetch the image from the external source
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert response body to an ArrayBuffer, then to a Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set the content type and cache headers
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    // Send the image buffer as the response
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(500).json({ error: 'Failed to fetch and cache the image.' });
  }
}
