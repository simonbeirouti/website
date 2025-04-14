import { redirect } from 'next/navigation';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import AccountInformation from './account-information';
import AccountDeletion from './account-deletion';
import PasswordChange from './password';
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
        Settings
      </h1>
      <AccountInformation />
      <PasswordChange />
      <AccountDeletion />
    </Fragment>
  );
}
