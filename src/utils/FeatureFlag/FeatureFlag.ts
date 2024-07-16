import { GrowthBook } from '@growthbook/growthbook';

import { FeatureFlagAttributes } from './types';

export class FeatureFlag {
  public static readonly defaultAttributes: FeatureFlagAttributes = {
    id: '1',
  } as const;

  static async client() {
    const client = new GrowthBook({
      apiHost: process.env.FEATURE_FLAG_HOST,
      clientKey: process.env.FEATURE_FLAG_CLIENT_KEY,
    });

    const result = await client.init();

    if (!result.success) {
      throw new Error('Failed to initialize Feature Flag client', {
        cause: result.error,
      });
    }

    return client;
  }

  public static async isEnabled(
    flag: string,
    attributes: FeatureFlagAttributes = FeatureFlag.defaultAttributes,
  ) {
    const client = await this.client();

    client.setAttributes({ ...FeatureFlag.defaultAttributes, ...attributes });

    const result = client.isOn(flag);

    client.destroy();
    return result;
  }
}
