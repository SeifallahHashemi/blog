import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-light';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import mdx from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import py from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import Clipboard from './Clipboard';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('markdown', mdx);
SyntaxHighlighter.registerLanguage('python', py);
SyntaxHighlighter.registerLanguage('css', css);

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
        <SyntaxHighlighter language={language} style={darkTheme} showLineNumbers wrapLongLines>
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="inline-block dark:hidden w-full **:!m-0 [&_>_pre]:!rounded-t-none [&_>_pre]:!border-x [&_>_pre]:!border-b [&_>_pre]:!border-zinc-200 [&_>_pre]:dark:!border-zinc-900">
        <SyntaxHighlighter language={language} style={lightTheme} showLineNumbers wrapLongLines>
          {code}
        </SyntaxHighlighter>
      </div>
    </section>
  );
};

export default CodeBlock;
