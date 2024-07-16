import { NextResponse } from 'next/server';

import { FeatureFlag } from '@/utils';

type GetParams = {
  featureFlagId: string;
};

export async function GET(request: Request, context?: { params: GetParams }) {
  try {
    const { featureFlagId } = context?.params ?? {};

    if (!featureFlagId) {
      return NextResponse.json(
        { error: 'Feature flag ID is required' },
        { status: 400 },
      );
    }

    const result = await FeatureFlag.isEnabled(featureFlagId);

    return NextResponse.json({ isEnabled: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
