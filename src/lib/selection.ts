import type { DataProps } from "@lib/api";

const FEATURED_LIMIT = 8;
const CAROUSEL_LIMIT = 24;

export function pickFeatured(
  products: DataProps[],
  limit = FEATURED_LIMIT,
): DataProps[] {
  const featured: DataProps[] = [];

  for (const item of products) {
    if (featured.length >= limit) break;
    featured.push(item);
  }

  return featured;
}

export function pickCarousel(
  products: DataProps[],
  limit = CAROUSEL_LIMIT,
): DataProps[] {
  const queues = new Map<string, DataProps[]>();

  for (const item of products) {
    const bucket = queues.get(item.category);
    if (bucket) {
      bucket.push(item);
    } else {
      queues.set(item.category, [item]);
    }
  }

  const picked: DataProps[] = [];
  const categories = [...queues.values()];

  while (picked.length < limit && categories.some((q) => q.length > 0)) {
    for (const queue of categories) {
      if (picked.length >= limit) break;

      const next = queue.shift();
      if (next) picked.push(next);
    }
  }

  return picked;
}
