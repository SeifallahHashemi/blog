import 'server-only';
import { createClient, type ClientConfig, type QueryParams } from 'next-sanity';

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_ACCESS_TOKEN,
  perspective: 'published',
  ignoreBrowserTokenWarning: true,
};

const client = createClient(config);

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T> {
  const cacheOption =
    process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache';
  return client.fetch(query, params, {
    cache: cacheOption,
    next: { tags },
  });
}
