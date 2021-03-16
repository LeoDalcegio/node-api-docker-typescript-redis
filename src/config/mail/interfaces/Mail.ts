export interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMailOptions {
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
