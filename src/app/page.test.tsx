import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  const mockedHost = 'http://localhost:3000';

  beforeAll(() => {
    process.env.HOST = mockedHost;

    global.fetch = vi.fn().mockImplementation(async () => ({
      json: async () => ({ isEnabled: false }),
    }));
  });

  it('renders the Home component', async () => {
    render(await Home());

    await waitFor(() => {
      const homeElement = screen.getByText('Home');
      expect(homeElement).toBeInTheDocument();
    });
  });

  it('renders the MaintenanceMode component when useMaintenanceMode is true', async () => {
    vi.mocked(global.fetch).mockImplementationOnce(
      async () =>
        ({
          json: async () => ({ isEnabled: true }),
        }) as unknown as Response,
    );

    render(await Home());

    await waitFor(() => {
      const maintenanceModeElement = screen.getByText(
        'This page is currently under development.',
      );
      expect(maintenanceModeElement).toBeInTheDocument();
    });
  });

  it('does not render the MaintenanceMode component when useMaintenanceMode is false', async () => {
    vi.mocked(global.fetch).mockImplementationOnce(
      async () =>
        ({
          json: async () => ({ isEnabled: false }),
        }) as unknown as Response,
    );

    render(await Home());

    await waitFor(() => {
      const homeElement = screen.getByText('Home');
      expect(homeElement).toBeInTheDocument();
    });

    const maintenanceModeElement = screen.queryByText(
      'This page is currently under development.',
    );
    expect(maintenanceModeElement).toBeNull();
  });
});
