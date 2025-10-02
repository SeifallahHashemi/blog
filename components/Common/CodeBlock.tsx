import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import Clipboard from './Clipboard';

interface CodeBlockTypes {
  value: {
    code: string;
    language: string;
    fileName?: string | null;
  };
}

const CodeBlock = ({ value }: CodeBlockTypes) => {
  const { code, language, fileName = 'javascript' } = value;

  return (
    <section className="w-full my-4" dir='ltr'>
      <div className='flex justify-between items-center w-full bg-zinc-50 dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-t-lg px-3 py-4'>
        {fileName && (
          <p className="font-sans font-medium text-sm text-zinc-900 dark:text-zinc-200">
            {fileName}
          </p>
        )}
        <Clipboard content={code} />
      </div>
      <Highlight theme={themes.vsDark} language={language} code={code}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={`${className} tracking-normal border-x border-b dark:border-zinc-800 border-zinc-200 rounded-b-lg text-sm`}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className='text-xs text-zinc-500 dark:text-zinc-400 mr-4 select-none opacity-50'>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} className='text-xs text-zinc-500 dark:text-zinc-400 select-none opacity-50' />
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
