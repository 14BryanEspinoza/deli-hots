# Deli's Hots

> Landing page y aplicación de pedidos para el restaurante de comida rápida **Deli's Hots**, desarrollada con **Astro 7** (SSG + islas de React), Tailwind CSS v4, consumo de API REST externa y despliegue automático a GitHub Pages.

![Preview](/public/preview.png)

---

## 🚀 Demo en vivo

**<https://14bryanespinoza.github.io/deli-hots/>**

---

## ✨ Características

- **Astro 7** — Static Site Generation (SSG) con View Transitions (`<ClientRouter />`) y alto rendimiento.
- **React 19 + Embla Carousel** — Isla interactiva de React con carrusel infinito y autoplay para exhibir imágenes del menú.
- **Tailwind CSS v4** — Configuración CSS-first mediante `@theme`, tipografía JetBrains Mono y design tokens personalizados.
- **Integración con API REST** — Consumo asíncrono del catálogo de productos desde `https://devsapihub.com/api-fast-food`.
- **Formulario de Pedidos** — Interfaz interactiva de pedidos online con selección de productos dinámicos y validación HTML5.
- **astro-icon + Lucide & Simple Icons** — Iconos SVG optimizados integrados en el sistema de diseño.
- **Sharp** — Optimización automática de imágenes en build (AVIF, WebP y responsive `srcset`/`sizes`).
- **@astrojs/sitemap** — Generación automática de `sitemap.xml` + `robots.txt` para SEO.
- **TypeScript strict** — Tipado estricto en componentes, modelos de datos y respuestas de la API.
- **ESLint + Prettier** — Linting y formateo unificado con plugins oficiales de Astro y Tailwind CSS.
- **Husky + lint-staged** — Pre-commit hooks para garantizar la calidad del código antes de cada commit.
- **GitHub Pages via Actions** — Deploy automático en cada push a la rama `main`.

---

## 📁 Estructura del proyecto

```text
src/
├── assets/              # Assets estáticos de imágenes (favicon.png)
├── components/          # Componentes reutilizables (Cards, Carousel, Form, Input, Link, Navbar, Products)
├── data/                # Datos estructurados y enlaces (features.ts, links.ts)
├── icons/               # Iconos adicionales del proyecto
├── layouts/             # Secciones y layouts (Layouts, Hero, Features, Gallery, Footer)
├── lib/                 # Servicios y llamadas a la API REST (api.ts)
├── metadata/            # Configuración SEO y Open Graph (metadata.ts)
├── pages/               # Rutas de la aplicación (index.astro, menu.astro, orders.astro)
└── styles/              # Estilos globales y tokens de diseño (global.css)
public/
├── favicon.png          # Favicon público (/deli-hots/favicon.png)
└── preview.png          # Imagen Open Graph / Twitter Card
```

---

## 🛠️ Comandos

```bash
# Instalar dependencias (pnpm)
pnpm install

# Desarrollo local (http://localhost:4321/deli-hots/)
pnpm dev

# Build de producción (genera dist/)
pnpm build

# Preview del build local
pnpm preview

# Lint + solución automática
pnpm lint
pnpm lint:fix

# Formato
pnpm format
pnpm format:check

# Verificación de tipos TypeScript y Astro
pnpm check
```

> **Node requerido:** ≥ 22.12.0 (configurado en `package.json` y workflow CI)

---

## 🌐 Despliegue

El sitio se publica automáticamente en **GitHub Pages** vía Actions al hacer push a `main`:

1. **Job `build`** — `withastro/action@v6` (Node 22) → `pnpm install` + `pnpm build` → sube `dist/` como artifact.
2. **Job `deploy`** — `actions/deploy-pages@v4` → publica el artifact en el entorno `github-pages`.

URL final: **<https://14bryanespinoza.github.io/deli-hots/>**

> La configuración de base path en `astro.config.mjs`:

```js
{
  site: "https://14bryanespinoza.github.io/deli-hots/",
  base: "/deli-hots/",
  build: { assets: "assets" }
}
```

---

## 🧱 Componentes principales

| Componente       | Tipo               | Descripción                                                                                            |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| `Layouts.astro`  | Layout             | Shell HTML principal, meta tags SEO, Open Graph, ClientRouter (View Transitions), Navbar y Skip link.  |
| `Navbar.astro`   | Componente         | Header responsive con logo, toggle para menú mobile y detección de ruta activa.                        |
| `Hero.astro`     | Layout             | Sección de bienvenida con llamado a la acción (CTA) e isla interactiva con carrusel de productos.      |
| `Features.astro` | Layout             | Sección descriptiva de las ventajas y propuesta de valor de Deli's Hots.                               |
| `Gallery.astro`  | Layout             | Galería grid de productos del menú consumidos desde la API (soporta rango `init` y `final`).           |
| `Footer.astro`   | Layout             | Pie de página con redes sociales, menú de navegación, dirección, teléfonos, horarios y legal.          |
| `Cards.astro`    | Componente         | Tarjetas informativas con icono y efecto hover.                                                        |
| `Carousel.tsx`   | Componente (React) | Carrusel dinámico interactivo con Embla Carousel (autoplay, loop y navegación manual).                 |
| `Form.astro`     | Componente         | Formulario interactivo para realizar pedidos con selector dinámico cargado de la API REST.             |
| `Input.astro`    | Componente         | Campo de entrada reutilizable con estilos unificados y soporte de validación nativa HTML5.             |
| `Link.astro`     | Componente         | Componente de enlace accesible con soporte para iconos, estado activo y skip links.                    |
| `Products.astro` | Componente         | Tarjeta individual de producto con optimización de imagen via `<Picture />`, precio y botón de pedido. |

---

## 📦 Módulos y Datos (`src/data/`, `src/lib/`, `src/metadata/`)

- **`metadata.ts`** — Configuración global de SEO, Open Graph, Twitter Card e imagen preview.
- **`features.ts`** — Beneficios principales (_Fresh ingredients_, _Fast delivery_, _Fair price_, _Wide variety_).
- **`links.ts`** — Definición de enlaces para Navbar, redes sociales (LinkedIn, GitHub, Facebook, X) y enlaces legales.
- **`api.ts`** — Módulo cliente asíncrono para el consumo de datos de comida rápida desde `https://devsapihub.com/api-fast-food`.

---

## ♿ Accesibilidad

- **Skip link** ("Skip to Main Content") al inicio del body para navegación con teclado.
- **HTML5 semántico** (`header`, `main`, `section`, `footer`, `nav`, `form`, `fieldset`, `legend`).
- Atributos `alt` descriptivos en imágenes y soporte de fallbacks.
- Navegación por teclado clara con anillos de enfoque visibles (`:focus-visible`).
- Etiquetas `aria-label` en controles de navegación y botones interactivos.

---

## ⚡ Performance & Optimización

| Optimización             | Implementación                                                      | Impacto                          |
| ------------------------ | ------------------------------------------------------------------- | -------------------------------- |
| **Imágenes AVIF + WebP** | `<Picture formats={['avif','webp']} />` via Sharp                   | Reducción significativa de peso  |
| **Consumo Dinámico API** | Carga asíncrona en build time con tipado TypeScript                 | Zero latencia en runtime         |
| **Islas de React**       | Componente `Carousel.tsx` hidratado sólo en cliente (`client:load`) | Minimal JavaScript enviado       |
| **View Transitions**     | Transiciones suaves entre rutas con `<ClientRouter />`              | Experiencia de navegación fluida |
| **Lazy loading**         | `loading="lazy"` + `decoding="async"` en productos                  | Carga eficiente bajo demanda     |
| **Sitemap + robots**     | Integración oficial `@astrojs/sitemap`                              | Indexación optimizada SEO        |

---

## 🔧 Stack técnico

| Herramienta         | Versión    | Uso                                                                 |
| ------------------- | ---------- | ------------------------------------------------------------------- |
| Astro               | 7.x        | SSG, enrutamiento, islas y optimización de assets                   |
| React               | 19.x       | Componente interactivo de carrusel                                  |
| Tailwind CSS        | 4.x        | Estilos utility-first y design tokens vía `@tailwindcss/vite`       |
| Embla Carousel      | 8.x        | Carrusel interactivo táctil y con autoplay (`embla-carousel-react`) |
| astro-icon          | 1.x        | Iconos SVG (Lucide y Simple Icons)                                  |
| @astrojs/sitemap    | 3.x        | Generación automática de `sitemap.xml`                              |
| Sharp               | 0.35.x     | Procesamiento y conversión de imágenes en build                     |
| TypeScript          | 5.x        | Tipado estricto en componentes y API                                |
| ESLint              | 10.x       | Linting de código (plugins para Astro y Tailwind)                   |
| Prettier            | 3.x        | Formateador de código                                               |
| Husky / lint-staged | 9.x / 17.x | Automation de git pre-commit hooks                                  |

---

## 📝 Licencia

MIT — libre para uso personal y educativo.
