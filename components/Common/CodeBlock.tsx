import Clipboard from './Clipboard';

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
    </section>
  );
};

export default CodeBlock;
