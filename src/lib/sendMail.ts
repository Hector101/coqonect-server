import sendgrid from '@sendgrid/mail';

// Interface
import { IMailInfo, IDynamicTemplateDdata } from '../interfaces/IEmal';

sendgrid.setApiKey((process.env.SENDGRID_API_KEY as string));

const sendMail = (mailInfo: IMailInfo): any => {
  return sendgrid.send({ ...mailInfo, from: `"CoQonect.com" <${process.env.SENDGRID_SIGNUP_FROM_EMAIL}>` });
};

const sendToEmail = (email: string) => {
  return (templateId: string, dynamicTemplateDdata: IDynamicTemplateDdata) =>
    sendMail({
      to: email,
      templateId,
      dynamic_template_data: { ...dynamicTemplateDdata },
    });
};

export default sendToEmail;
