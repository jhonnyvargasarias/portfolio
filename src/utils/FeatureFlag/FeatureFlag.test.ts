import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { FeatureFlag } from './FeatureFlag';
import { GrowthBook } from '@growthbook/growthbook';

const mockedInit = vi
  .fn()
  .mockResolvedValue({ success: true, source: 'source' });
const mockedSetAttributes = vi.fn();
const mockedIsOn = vi.fn().mockReturnValue(true);
const mockedDestroy = vi.fn();

vi.mock('@growthbook/growthbook', () => ({
  GrowthBook: vi.fn().mockImplementation(() => ({
    init: mockedInit,
    setAttributes: mockedSetAttributes,
    isOn: mockedIsOn,
    destroy: mockedDestroy,
  })),
}));

describe('FeatureFlag', () => {
  const mockedHost = 'http://localhost:3000';
  const mockedClientKey = 'mocked-client-key';

  beforeAll(() => {
    process.env.FEATURE_FLAG_HOST = mockedHost;
    process.env.FEATURE_FLAG_CLIENT_KEY = mockedClientKey;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize the client with the correct host and client key', async () => {
      const flagName = 'flag';

      const result = await FeatureFlag.isEnabled(flagName);
      expect(result).toBe(true);

      const MockedGrowthBook = vi.mocked(GrowthBook);
      expect(MockedGrowthBook).toHaveBeenCalledTimes(1);
      expect(MockedGrowthBook).toHaveBeenCalledWith({
        apiHost: mockedHost,
        clientKey: mockedClientKey,
      });

      expect(mockedInit).toHaveBeenCalledTimes(1);
      expect(mockedSetAttributes).toHaveBeenCalledTimes(1);
      expect(mockedSetAttributes).toHaveBeenCalledWith(
        FeatureFlag.defaultAttributes,
      );
      expect(mockedIsOn).toHaveBeenCalledTimes(1);
      expect(mockedIsOn).toHaveBeenCalledWith(flagName);
      expect(mockedDestroy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the client fails to initialize', async () => {
      const errorMessage = 'Failed to initialize Feature Flag client';
      const error = new Error(errorMessage);

      mockedInit.mockResolvedValue({ success: false, error });

      await expect(FeatureFlag.isEnabled('flag')).rejects.toThrow(error);

      expect(mockedInit).toHaveBeenCalledTimes(1);
      expect(mockedSetAttributes).not.toHaveBeenCalled();
      expect(mockedIsOn).not.toHaveBeenCalled();
      expect(mockedDestroy).not.toHaveBeenCalled();
    });
  });
});
