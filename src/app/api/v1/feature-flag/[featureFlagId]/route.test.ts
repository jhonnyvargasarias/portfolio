import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FeatureFlag } from '@/utils';
import { GET } from './route';

vi.mock('@/utils', () => ({
  FeatureFlag: {
    isEnabled: vi.fn(),
  },
}));

describe('api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(FeatureFlag, 'isEnabled').mockResolvedValue(true);
  });

  describe('v1', () => {
    describe('feature-flag', () => {
      describe('[featureFlagId]', () => {
        describe('GET', () => {
          it('should return a 200 status with isEnabled set to true', async () => {
            const response = await GET(
              new Request('http://localhost:3000/api/v1/feature-flag/1'),
              {
                params: { featureFlagId: '1' },
              },
            );
            const body = await response.json();

            expect(response.status).toBe(200);
            expect(body).toEqual({ isEnabled: true });
          });

          it('should return a 400 error if featureFlagId is not provided', async () => {
            const response = await GET(
              new Request('http://localhost:3000/api/v1/feature-flag/'),
            );
            const body = await response.json();

            expect(response.status).toBe(400);
            expect(body).toStrictEqual({
              error: 'Feature flag ID is required',
            });
          });

          it('should return a 500 status with an error message', async () => {
            const errorMessage = 'Test error';

            vi.spyOn(FeatureFlag, 'isEnabled').mockImplementation(() => {
              throw new Error(errorMessage);
            });

            const response = await GET(
              new Request('http://localhost:3000/api/v1/feature-flag/1'),
              {
                params: { featureFlagId: '1' },
              },
            );
            const body = await response.json();

            expect(response.status).toBe(500);
            expect(body).toEqual({ error: errorMessage });
          });
        });
      });
    });
  });
});
