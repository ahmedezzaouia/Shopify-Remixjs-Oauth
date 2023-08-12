// app/routes/auth/$.tsx
import {LoaderArgs} from '@remix-run/node';

import {authenticate} from '../shopify.server';

export async function loader({request}: LoaderArgs) {
  console.log("🚀🚀 Authintication start at /auth")
  const admin = await authenticate.admin(request);
  console.log("🚀 loader ~ admin:", admin)
  return null
}