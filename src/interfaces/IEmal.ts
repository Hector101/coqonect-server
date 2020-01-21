export interface IMailInfo {
  to: string;
  templateId: string;
  dynamic_template_data: IDynamicTemplateDdata;
}

export interface IDynamicTemplateDdata {
  fullName?: string;
  password?: string;
  verificationLink?: string;
  loginPage?: string;
  note?: string;
}
