import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-light';
import Clipboard from './Clipboard';

interface CodeBlockTypes {
  value: {
    code: string;
    language: string;
    filename?: string | null;
  };
}

const CodeBlock = async ({ value }: CodeBlockTypes) => {
  const { code, language, filename = 'Javascript' } = value;

  return (
    <section className="w-full my-4" dir="ltr">
      <div className="flex justify-between items-center w-full bg-zinc-50 dark:bg-[#141414] border border-zinc-200 dark:border-zinc-900 rounded-t-lg px-3 py-4">
        {filename && (
          <p className="font-sans font-medium text-sm text-zinc-900 dark:text-zinc-200">
            {filename}
          </p>
        )}
        <Clipboard content={code} />
      </div>
      <div className="hidden dark:inline-block w-full **:!m-0 [&_>_pre]:!rounded-t-none [&_>_pre]:!border-x [&_>_pre]:!border-b [&_>_pre]:!border-zinc-200 [&_>_pre]:dark:!border-zinc-900">
        <SyntaxHighlighter language={language} style={darkTheme}>
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="inline-block dark:hidden w-full **:!m-0 [&_>_pre]:!rounded-t-none [&_>_pre]:!border-x [&_>_pre]:!border-b [&_>_pre]:!border-zinc-200 [&_>_pre]:dark:!border-zinc-900">
        <SyntaxHighlighter language={language} style={lightTheme}>
          {code}
        </SyntaxHighlighter>
      </div>
    </section>
  );
};

export default CodeBlock;
