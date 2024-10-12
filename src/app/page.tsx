import cx from 'classnames';
import GitHubCalendar from 'react-github-calendar';

import { fetchExperience } from '@/data/fetchExperience';

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

export default async function Home() {
  const experience = await fetchExperience();
  console.log(experience);

  return (
    <div
      className={cx(
        'flex',
        'justify-center',
        'relative',
        'overflow-x-auto',
        'px-4',
        'py-2',
      )}
    >
      <GitHubCalendar username={username} />
    </div>
  );
}
