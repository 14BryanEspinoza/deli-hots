interface FeaturesProps {
  title: string;
  description: string;
  icon: string;
}

export const features: FeaturesProps[] = [
  {
    title: "Ingredientes frescos",
    description:
      "Seleccionamos los mejores ingredientes cada día para que cada plato tenga un sabor auténtico.",
    icon: "lucide:trees",
  },
  {
    title: "Entrega rápida",
    description:
      "Recibe tu pedido caliente y en tiempo récord, directo a tu puerta.",
    icon: "lucide:zap",
  },
  {
    title: "Precio justo",
    description:
      "Comida de calidad a precios accesibles, sin sorpresas ni cargos ocultos.",
    icon: "lucide:tag",
  },
  {
    title: "Gran variedad",
    description:
      "Hot dogs, hamburguesas, pizzas, tacos y más. Siempre hay algo para satisfacer tus antojos.",
    icon: "lucide:grid-2x2",
  },
];
