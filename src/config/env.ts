const trimEnvValue = (value: string | undefined) => value?.trim() ?? "";

const normalizeBaseUrl = (value: string | undefined) =>
  trimEnvValue(value).replace(/\/+$/, "");

export const apiBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
export const defaultCallbackUrl = "https://localhost:5173";

export const auth0Config = {
  audience: trimEnvValue(import.meta.env.VITE_AUTH0_AUDIENCE),
  clientId: trimEnvValue(import.meta.env.VITE_AUTH0_CLIENT_ID),
  domain: trimEnvValue(import.meta.env.VITE_AUTH0_DOMAIN),
  redirectUri:
    trimEnvValue(import.meta.env.VITE_AUTH0_CALLBACK_URL) || defaultCallbackUrl,
};

export const isAuthConfigured = Boolean(
  auth0Config.audience &&
    auth0Config.clientId &&
    auth0Config.domain &&
    auth0Config.redirectUri
);

export const authSetupMessage =
  "Auth0 no esta configurado. Revisa frontend/.env y backend/.env para habilitar login y rutas protegidas.";
