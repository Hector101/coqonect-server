import { Response } from 'express';

const metaRedirect = (res: Response, url: string) => res.status(200).send(`
  <html>
    <head><meta http-equiv="refresh" content="0; url=${ url }" /></head>
    <body></body>
  </html>
`);

export default metaRedirect;
