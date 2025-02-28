import { expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { Card } from './Card';

it('matches snapshot', () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
