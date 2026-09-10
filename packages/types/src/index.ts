export interface StoreIdentity {
  key: string;
  name: string;
  domain: string;
}

export interface StoreBranding {
  displayFont: "Instrument Serif";
  interfaceFont: "Manrope";
  logoUrl: string | null;
}

export interface StorefrontConfig extends StoreIdentity {
  description: string;
  indexable: boolean;
  locale: string;
  url: string;
  branding: StoreBranding;
}

export interface Money {
  amount: string;
  currency: string;
}

export interface FrameMeasurements {
  bridgeWidthMm: number;
  lensHeightMm: number | null;
  lensWidthMm: number;
  templeLengthMm: number;
  totalFrameWidthMm: number | null;
}

export interface ApiEnvelope<T> {
  data: T;
  meta?: Record<string, unknown>;
}
