export class InvalidApiKeyError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid or unrecognized API key');
    this.name = 'InvalidApiKeyError';
    Error.captureStackTrace?.(this, InvalidApiKeyError);
  }
}

export class ModelNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Requested model not found');
    this.name = 'ModelNotFoundError';
    Error.captureStackTrace?.(this, ModelNotFoundError);
  }
}

export class RateLimitError extends Error {
  constructor(message?: string) {
    super(message ?? 'Rate limit exceeded');
    this.name = 'RateLimitError';
    Error.captureStackTrace?.(this, RateLimitError);
  }
}

export class UpstreamError extends Error {
  constructor(message?: string) {
    super(message ?? 'Upstream service error');
    this.name = 'UpstreamError';
    Error.captureStackTrace?.(this, UpstreamError);
  }
}
