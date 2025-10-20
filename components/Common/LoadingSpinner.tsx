import { createPortal } from 'react-dom';

const LoadingSpinner = () => {
  return createPortal(
    <section className="fixed inset-0 flex items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-xs">
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
    </section>,
    document.body
  );
};

export default LoadingSpinner;
