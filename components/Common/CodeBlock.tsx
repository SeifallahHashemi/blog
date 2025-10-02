import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import Clipboard from './Clipboard';
import { useTheme } from 'next-themes';

interface CodeBlockTypes {
  value: {
    code: string;
    language: string;
    filename?: string | null;
  };
}

const CodeBlock = ({ value }: CodeBlockTypes) => {
  const { code, language, filename = "Javascript" } = value;

  return (
    <section className="w-full my-4" dir='ltr'>
      <div className='flex justify-between items-center w-full bg-zinc-50 dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-t-lg px-3 py-4'>
        {filename && (
          <p className="font-sans font-medium text-sm text-zinc-900 dark:text-zinc-200">
            {filename}
          </p>
        )}
        <Clipboard content={code} />
      </div>
      <Highlight theme={themes.vsDark} language={language} code={code}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={`${className} tracking-normal border-x border-b dark:border-zinc-800 border-zinc-200 rounded-b-lg text-sm`}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className='text-sm text-zinc-500 dark:text-zinc-400 min-w-6 mr-4 inline-flex justify-center items-center select-none opacity-50 font-iranYWR bg-gray-800 border-r border-r-zinc-900'>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} className='text-sm text-zinc-500 dark:text-zinc-400 select-none opacity-50 font-mono' />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </section>
  );
};

export default CodeBlock;
