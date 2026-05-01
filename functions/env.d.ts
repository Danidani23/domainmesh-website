/**
 * Cloudflare Workers / Pages Functions type declarations.
 * These provide type safety for the Pages Functions runtime environment.
 */

interface KVNamespace {
  get(key: string, options?: { type?: 'text' }): Promise<string | null>;
  get(key: string, options: { type: 'json' }): Promise<unknown>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

interface EventContext<Env, P extends string, Data> {
  request: Request;
  env: Env;
  params: Record<P, string>;
  data: Data;
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type PagesFunction<Env = unknown, P extends string = string, Data extends Record<string, unknown> = Record<string, unknown>> =
  (context: EventContext<Env, P, Data>) => Response | Promise<Response>;
