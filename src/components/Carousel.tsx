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
          className="border-border text-text hover:bg-accent-soft hover:text-text cursor-pointer rounded-md border px-4 py-2 font-bold transition"
          aria-label="Anterior"
        >
          ← Anterior
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="border-border text-text hover:bg-accent-soft hover:text-text cursor-pointer rounded-md border px-4 py-2 font-bold transition"
          aria-label="Siguiente"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};
