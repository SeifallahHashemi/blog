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
    <section className="">
      <div>
        {fileName && (
          <p className="font-sans font-medium text-sm text-zinc-900 dark:text-zinc-200">
            {fileName}
          </p>
        )}
        <Clipboard content={code} />
      </div>
      <Highlight theme={themes.dracula} language={language} code={code}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={className}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
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
