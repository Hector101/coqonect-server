import { Request } from 'express';

export default (req: Request) => {
  const platform = req.useragent ? req.useragent.platform : 'Unknown';
  const browser = req.useragent ? req.useragent.browser : 'Unknown';

  return {
    platform,
    browser,
  };
};
