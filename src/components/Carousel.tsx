import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { ImageProps } from "@lib/api";

interface CarouselProps {
  images: ImageProps[];
}

export const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div key={index} className="relative aspect-video flex-[0_0_100%]">
              <img
                src={img.url}
                alt={img.alt ?? "Imagen de la API"}
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="cursor-pointer rounded-md border border-border px-4 py-2 font-bold text-text transition hover:bg-accent-soft hover:text-text"
          aria-label="Previous"
        >
          ← Previous
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="cursor-pointer rounded-md border border-border px-4 py-2 font-bold text-text transition hover:bg-accent-soft hover:text-text"
          aria-label="Next"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
