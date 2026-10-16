import React, { useEffect, useRef, useState } from "react";
import type { CarouselImage } from "@lib/images";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface CarouselProps {
  images: CarouselImage[];
}

export const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onPlay = () => setIsPlaying(true);
    const onStop = () => setIsPlaying(false);

    emblaApi.on("autoplay:play", onPlay).on("autoplay:stop", onStop);
    return () => {
      emblaApi.off("autoplay:play", onPlay).off("autoplay:stop", onStop);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.current.stop();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayback = () => {
    const plugin = emblaApi?.plugins().autoplay;
    if (!plugin) return;

    if (plugin.isPlaying()) {
      plugin.stop();
    } else {
      plugin.play();
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div
              key={`${index}-${img.src}`}
              className="relative aspect-video flex-[0_0_100%]"
            >
              <picture>
                <source
                  type="image/avif"
                  srcSet={img.avif}
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <source
                  type="image/webp"
                  srcSet={img.webp}
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <img
                  src={img.src}
                  alt={img.alt ?? "Imagen de la API"}
                  width={img.width}
                  height={img.height}
                  className="size-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              </picture>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="text-bg bg-accent hover:bg-accent-hover hover:text-bg cursor-pointer rounded-md px-4 py-2 transition hover:scale-105"
          aria-label="Anterior"
        >
          ← Anterior
        </button>

        <button
          type="button"
          onClick={togglePlayback}
          className="text-bg bg-accent hover:bg-accent-hover hover:text-bg cursor-pointer rounded-md px-4 py-2 transition hover:scale-105"
          aria-label={isPlaying ? "Pausar carrusel" : "Reanudar carrusel"}
        >
          {isPlaying ? "⏸ Pausar" : "▶ Reproducir"}
        </button>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="text-bg bg-accent hover:bg-accent-hover hover:text-bg cursor-pointer rounded-md px-4 py-2 transition hover:scale-105"
          aria-label="Siguiente"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};
