export type FeatureFlagAttributes = {
  id: string;
  url?: string;
  path?: string;
  host?: string;
  query?: string;
  deviceType?: 'desktop' | 'mobile';
  browser?: 'chrome' | 'edge' | 'firefox' | 'safari' | 'unknown';
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};
