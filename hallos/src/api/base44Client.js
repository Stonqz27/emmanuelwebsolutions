import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';
import { localDemoClient } from './localDemoClient';

// Base44 uses a public app identifier, NOT a secret. Authentication tokens remain
// managed by the SDK and should never be embedded in source code.
export const db = import.meta.env.VITE_HALLOS_LOCAL_DEMO === 'true'
  ? localDemoClient
  : createClient({
      appId: appParams.appId,
      ...(appParams.token ? { token: appParams.token } : {}),
    });
export const base44 = db;
export default db;
