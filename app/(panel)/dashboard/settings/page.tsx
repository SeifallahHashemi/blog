import SettingsForm from '@/components/Auth/SettingsForm';
import { getUser } from '@/utils/supabase/queries';
import React from 'react';

const SettingsPage = async () => {
  const { id } = await getUser();
  return <SettingsForm userId={id} />;
};

export default SettingsPage;
