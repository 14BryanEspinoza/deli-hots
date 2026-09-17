interface DataProps {
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

async function getData(): Promise<DataProps[]> {
  try {
    const resp = await fetch("https://devsapihub.com/api-fast-food");

    if (!resp.ok) {
      throw new Error(`Error HTTP: ${resp.status}`);
    }

    const data: DataProps[] = await resp.json();
    return data;
  } catch {
    return [];
  }
}

export const data = await getData();
