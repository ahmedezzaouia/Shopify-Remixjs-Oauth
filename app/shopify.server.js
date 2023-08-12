// app/shopify.server.js
import '@shopify/shopify-app-remix/adapters/node';
import {LATEST_API_VERSION, shopifyApp} from '@shopify/shopify-app-remix';
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";


const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  appUrl: process.env.SHOPIFY_APP_URL,
  scopes: ['read_products'],
  apiVersion: LATEST_API_VERSION,
  authPathPrefix: '/auth',
  sessionStorage: new PrismaSessionStorage(prisma),

});
export default shopify;
export const authenticate = shopify.authenticate;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
