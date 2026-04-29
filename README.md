# app-itz-food-frontend

Frontend de FoodApp para la actividad 4.1.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Variables de entorno

Usa `.env.example` como base.

- `VITE_API_BASE_URL`: URL del backend.
- `VITE_AUTH0_DOMAIN`: dominio de Auth0.
- `VITE_AUTH0_CLIENT_ID`: cliente de Auth0.
- `VITE_AUTH0_AUDIENCE`: audiencia/API configurada en Auth0.
- `VITE_AUTH0_CALLBACK_URL`: callback permitido para Auth0.

Si las variables de Auth0 quedan vacias, la app arranca en modo local para poder revisar la interfaz sin login real.
