import { API_BASE_URL } from "../data/config";

export type ApiFieldErrors = Record<string, string[]>;

export class ApiValidationError extends Error {
  errors: ApiFieldErrors;

  constructor(errors: ApiFieldErrors) {
    super("Validation failed");
    this.name = "ApiValidationError";
    this.errors = errors;
  }
}

export class ApiRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

export async function postJson<T = unknown>(
  path: string,
  body: T
): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiRequestError(0, "network");
  }

  if (response.status === 422) {
    const data = (await response.json().catch(() => ({}))) as {
      errors?: ApiFieldErrors;
    };
    const errors: ApiFieldErrors =
      data && typeof data === "object" && data.errors ? data.errors : {};
    throw new ApiValidationError(errors);
  }

  if (response.status === 429) {
    throw new ApiRequestError(429, "rate-limited");
  }

  if (!response.ok) {
    throw new ApiRequestError(response.status, "server-error");
  }

  return response.json();
}
