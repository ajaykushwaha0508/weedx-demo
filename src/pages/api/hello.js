// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'GET') {
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  } else {
  }
}

