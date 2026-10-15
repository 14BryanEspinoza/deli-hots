import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselImage } from "@lib/images";

interface CarouselProps {
  images: CarouselImage[];
}

export const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Keep the toggle in sync with every plugin state change (hover pause,
  // focus stop, reduced motion) instead of tracking it by hand.
  useEffect(() => {
    if (!emblaApi) return;

    const onPlay = () => setIsPlaying(true);
    const onStop = () => setIsPlaying(false);

    emblaApi.on("autoplay:play", onPlay).on("autoplay:stop", onStop);
    return () => {
      emblaApi.off("autoplay:play", onPlay).off("autoplay:stop", onStop);
    };
  }, [emblaApi]);

  // Respect the OS/user reduced-motion preference: do not auto-advance.
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
    <div className="relative mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
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
          className="border-border text-text hover:bg-accent-soft hover:text-text cursor-pointer rounded-md border px-4 py-2 font-bold transition"
          aria-label="Anterior"
        >
          ← Anterior
        </button>
        <button
          type="button"
          onClick={togglePlayback}
          className="border-border text-text hover:bg-accent-soft hover:text-text cursor-pointer rounded-md border px-4 py-2 font-bold transition"
          aria-label={isPlaying ? "Pausar carrusel" : "Reanudar carrusel"}
        >
          {isPlaying ? "⏸ Pausar" : "▶ Reproducir"}
        </button>
        <button
          type="button"
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
