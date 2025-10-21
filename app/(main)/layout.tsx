import DockAnimation from '@/components/Animation/DockAnimation';
import Footer from '@/components/Global/Footer';
import Header from '@/components/Global/Header';
import React from 'react';

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      <DockAnimation />
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
