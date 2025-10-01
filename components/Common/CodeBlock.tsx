import React from 'react'
import Clipboard from './Clipboard';

interface CodeBlockTypes {
    value: {
        code: string;
        language: string;
        fileName?: string | null;
    }
}

const CodeBlock = ({ value }: CodeBlockTypes) => {
    const { code, language, fileName = "javascript" } = value;

  return (
    <section className=''>
        <div>
            {fileName && <p className='font-sans font-medium text-sm text-zinc-900 dark:text-zinc-200'>{fileName}</p>}
            <Clipboard content={code} />
        </div>
    </section>
  )
}

export default CodeBlock