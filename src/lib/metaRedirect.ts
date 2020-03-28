import { Response } from 'express';

const metaRedirect = (res: Response, host: string) => {
  return res.status(200).send(`
    <html>
      <head><meta http-equiv="refresh" content="0; url=${host}" /></head>
      <body></body>
    </html>
  `);
};

export default metaRedirect;
