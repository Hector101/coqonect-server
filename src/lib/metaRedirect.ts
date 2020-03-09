import { Response, Request } from 'express';

const metaRedirect = (req: Request, res: Response, host: string) => {
  return res.status(200).send(`
    <html>
      <head><meta http-equiv="refresh" content="0; url=${host}${req.originalUrl}" /></head>
      <body></body>
    </html>
  `);
};

export default metaRedirect;
