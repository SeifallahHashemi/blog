import React from 'react';

const StudioLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <main style={{ direction: 'ltr' }}>{children}</main>;
};

export default StudioLayout;
