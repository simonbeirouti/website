import { redirect } from 'next/navigation';
import { TeamSettings } from './settings';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import { Fragment } from 'react';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/auth');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  return (
    <Fragment>
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
        Team Settings
      </h1>
      <TeamSettings teamData={teamData} />
    </Fragment>
  );
}
