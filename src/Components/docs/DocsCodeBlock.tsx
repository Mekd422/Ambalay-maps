import CodeBlock from "../CodeBlock";

type DocsCodeBlockProps = {
  template: string;
  language: string;
  baseUrl?: string;
};

export default function DocsCodeBlock({ template, language, baseUrl = "{BASE_URL}" }: DocsCodeBlockProps) {
  return <CodeBlock code={template.replaceAll("{BASE_URL}", baseUrl)} language={language} />;
}
