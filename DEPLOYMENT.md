# Despliegue frontend en Render

Este repo ya incluye `render.yaml` para crear un Static Site en Render.

## Opcion con Blueprint

1. En Render entra a `New` > `Blueprint`.
2. Conecta `https://github.com/HackerChowder69/app-itz-food-frontend`.
3. Render leera `render.yaml`.
4. Cuando pida variables con `sync: false`, pega los valores correctos.

## Valores manuales

- Service type: `Static Site`
- Branch: `main`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Rewrite: `/*` -> `/index.html`
- Node version: `20.19.0`

## Variables requeridas

- `VITE_API_BASE_URL`: URL publica del backend en Render, sin slash final.
- `VITE_AUTH0_DOMAIN`
- `VITE_AUTH0_CLIENT_ID`
- `VITE_AUTH0_CALLBACK_URL`: URL publica del frontend en Render.
- `VITE_AUTH0_AUDIENCE`

Despues de conocer la URL publica del frontend, agregala tambien en Auth0:

- Allowed Callback URLs
- Allowed Logout URLs
- Allowed Web Origins

Si cambias variables `VITE_*`, vuelve a desplegar el Static Site porque Vite las empaqueta durante el build.
