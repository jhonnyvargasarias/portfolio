import { use } from 'react';

import { MaintenanceMode } from '@/domains/site-management';
import { USE_MAINTENANCE_MODE } from '@/constants/feature-flags';

const fetchUseMaintenanceMode = async () => {
  const result = await fetch(
    `${process.env.HOST}/api/v1/feature-flag/${USE_MAINTENANCE_MODE}`,
    {
      method: 'GET',
    },
  );
  const { isEnabled } = await result.json();
  return isEnabled;
};

export default async function Home() {
  const useMaintenanceMode = await fetchUseMaintenanceMode();

  if (useMaintenanceMode) {
    return <MaintenanceMode />;
  }

  return <div>Home</div>;
}
