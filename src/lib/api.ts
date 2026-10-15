import { z } from "zod";

export interface DataProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface ImageProps {
  url: string;
  alt: string;
}

const API_URL = "https://devsapihub.com/api-fast-food";

const dataSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string().min(1),
    price: z.number(),
    image: z.url(),
    category: z.string().min(1),
  }),
);

async function getData(): Promise<DataProps[]> {
  const resp = await fetch(API_URL);

  if (!resp.ok) {
    throw new Error(
      `API de productos no disponible (${API_URL}): HTTP ${resp.status}`,
    );
  }

  let payload: unknown;
  try {
    payload = await resp.json();
  } catch {
    throw new Error(`La API de productos no devolvió JSON válido (${API_URL})`);
  }

  const parsed = dataSchema.safeParse(payload);

  if (!parsed.success) {
    const details = parsed.error.issues
      .slice(0, 5)
      .map((issue) => `${issue.path.join(".") || "(raíz)"}: ${issue.message}`)
      .join("; ");

    throw new Error(`Esquema inválido en la API de productos: ${details}`);
  }

  return parsed.data;
}

export const data = await getData();
