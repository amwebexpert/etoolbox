import { jwtDecode, type JwtPayload } from "jwt-decode";
import {
  getErrorMessage,
  isBlank,
  isNotBlank,
  formatUnixTimestamp,
  getCurrentUnixTimestamp,
  isExpiredTimestamp,
  isActiveTimestamp,
} from "@lichens-innovation/ts-common";
import { safeJsonStringify } from "~/utils/json.utils";
import { getResultMaxHeight as getResponsiveMaxHeight, type ResponsiveContext } from "~/utils/responsive.utils";

export interface ExtendedJwtPayload extends JwtPayload {
  [key: string]: unknown;
}

export interface JwtHeader {
  alg: string;
  typ?: string;
  kid?: string;
  [key: string]: unknown;
}

export interface DecodedJwt {
  header: JwtHeader | null;
  payload: ExtendedJwtPayload | null;
  signature: string;
  isValid: boolean;
  error?: string;
}

export interface JwtClaimInfo {
  label: string;
  value: string;
  type: "date" | "text" | "expired" | "valid";
}

export const decodeJwt = (token: string): DecodedJwt => {
  if (isBlank(token)) {
    return {
      header: null,
      payload: null,
      signature: "",
      isValid: false,
      error: "No token provided",
    };
  }

  try {
    const header = jwtDecode<JwtHeader>(token.trim(), { header: true });
    const payload = jwtDecode<ExtendedJwtPayload>(token.trim());
    const parts = token.trim().split(".");
    const signature = parts.length >= 3 ? parts[2] : "";

    return {
      header,
      payload,
      signature,
      isValid: true,
    };
  } catch (e: unknown) {
    return {
      header: null,
      payload: null,
      signature: "",
      isValid: false,
      error: getErrorMessage(e),
    };
  }
};

export const formatJson = (obj: unknown): string => {
  return safeJsonStringify(obj);
};

export const getTokenParts = (token: string): string[] => {
  if (isBlank(token)) return [];
  return token.trim().split(".");
};

export const isTokenExpired = (payload: ExtendedJwtPayload | null): boolean => {
  if (!payload?.exp) return false;
  return isExpiredTimestamp(payload.exp);
};

export const formatTimestamp = (timestamp: number | undefined): string => {
  if (!timestamp) return "N/A";
  return formatUnixTimestamp(timestamp);
};

export const getClaimsInfo = (payload: ExtendedJwtPayload | null): JwtClaimInfo[] => {
  if (!payload) return [];

  const claims: JwtClaimInfo[] = [];

  if (payload.iat) {
    claims.push({
      label: "Issued At (iat)",
      value: formatTimestamp(payload.iat),
      type: "date",
    });
  }

  if (payload.exp) {
    claims.push({
      label: "Expires (exp)",
      value: formatTimestamp(payload.exp),
      type: isExpiredTimestamp(payload.exp) ? "expired" : "valid",
    });
  }

  if (payload.nbf) {
    claims.push({
      label: "Not Before (nbf)",
      value: formatTimestamp(payload.nbf),
      type: isActiveTimestamp(payload.nbf) ? "valid" : "expired",
    });
  }

  if (isNotBlank(payload.sub)) {
    claims.push({
      label: "Subject (sub)",
      value: String(payload.sub),
      type: "text",
    });
  }

  if (isNotBlank(payload.iss)) {
    claims.push({
      label: "Issuer (iss)",
      value: String(payload.iss),
      type: "text",
    });
  }

  if (payload.aud) {
    const audience = Array.isArray(payload.aud) ? payload.aud.join(", ") : String(payload.aud);
    claims.push({
      label: "Audience (aud)",
      value: audience,
      type: "text",
    });
  }

  return claims;
};

const algorithms: Record<string, string> = {
  HS256: "HMAC using SHA-256",
  HS384: "HMAC using SHA-384",
  HS512: "HMAC using SHA-512",
  RS256: "RSASSA-PKCS1-v1_5 using SHA-256",
  RS384: "RSASSA-PKCS1-v1_5 using SHA-384",
  RS512: "RSASSA-PKCS1-v1_5 using SHA-512",
  ES256: "ECDSA using P-256 and SHA-256",
  ES384: "ECDSA using P-384 and SHA-384",
  ES512: "ECDSA using P-521 and SHA-512",
  PS256: "RSASSA-PSS using SHA-256",
  PS384: "RSASSA-PSS using SHA-384",
  PS512: "RSASSA-PSS using SHA-512",
};

export const getAlgorithmDescription = (alg: string | undefined): string => {
  return alg ? (algorithms[alg] ?? "Unknown algorithm") : "Unknown algorithm";
};

export const getResultMaxHeight = (ctx: ResponsiveContext): number => {
  return getResponsiveMaxHeight(ctx);
};

export const getSampleJwt = (): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = getCurrentUnixTimestamp();
  const payload = btoa(
    JSON.stringify({
      sub: "1234567890",
      name: "John Doe",
      email: "john.doe@example.com",
      iat: now - 3600,
      exp: now + 3600,
      iss: "https://example.com",
      aud: "https://api.example.com",
    })
  );
  const signature = "dummySignatureForDemoOnly";
  return `${header}.${payload}.${signature}`;
};

export const SAMPLE_JWT_TOKENS = {
  basic: getSampleJwt(),
  expired: (() => {
    const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const now = getCurrentUnixTimestamp();
    const payload = btoa(
      JSON.stringify({
        sub: "user-expired",
        name: "Expired User",
        iat: now - 7200,
        exp: now - 3600,
        iss: "https://auth.example.com",
      })
    );
    return `${header}.${payload}.expiredSignature`;
  })(),
};
