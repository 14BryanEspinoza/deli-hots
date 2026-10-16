import sharp from "sharp";
import { getImage } from "astro:assets";
import type { ImageProps } from "@lib/api";

export interface CarouselImage {
  src: string;
  avif: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
}

const RESPONSIVE_WIDTHS = [640, 1280];
const MAX_FALLBACK_WIDTH = 1280;

const dimensionsCache = new Map<string, { width: number; height: number }>();

async function getRemoteDimensions(
  url: string,
): Promise<{ width: number; height: number }> {
  const cached = dimensionsCache.get(url);
  if (cached) return cached;

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(
      `Failed to read image dimensions for ${url}: HTTP ${resp.status}`,
    );
  }

  const metadata = await sharp(
    new Uint8Array(await resp.arrayBuffer()),
  ).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Image has no intrinsic dimensions: ${url}`);
  }

  const dimensions = { width: metadata.width, height: metadata.height };
  dimensionsCache.set(url, dimensions);
  return dimensions;
}

export async function getCarouselImages(
  images: ImageProps[],
): Promise<CarouselImage[]> {
  return Promise.all(
    images.map(async ({ url, alt }) => {
      const dimensions = await getRemoteDimensions(url);

      const widths = RESPONSIVE_WIDTHS.filter((w) => w < dimensions.width);
      if (widths.length === 0) widths.push(dimensions.width);

      const fallbackWidth = Math.min(MAX_FALLBACK_WIDTH, dimensions.width);
      const fallbackHeight = Math.round(
        (fallbackWidth * dimensions.height) / dimensions.width,
      );

      const [avif, webp, fallback] = await Promise.all([
        getImage({
          src: url,
          format: "avif",
          width: dimensions.width,
          height: dimensions.height,
          widths,
        }),
        getImage({
          src: url,
          format: "webp",
          width: dimensions.width,
          height: dimensions.height,
          widths,
        }),
        getImage({
          src: url,
          format: "jpeg",
          width: fallbackWidth,
          height: fallbackHeight,
        }),
      ]);

      return {
        src: fallback.src,
        avif: avif.srcSet.attribute,
        webp: webp.srcSet.attribute,
        width: fallbackWidth,
        height: fallbackHeight,
        alt,
      };
    }),
  );
}
