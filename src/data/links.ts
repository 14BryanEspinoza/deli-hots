interface LinksProps {
  url: string;
  label?: string;
  icon?: string;
}

export const linkNavbar: LinksProps[] = [
  { url: import.meta.env.BASE_URL, label: "Inicio", icon: "lucide:house" },
  {
    url: import.meta.env.BASE_URL + "menu/",
    label: "Menú",
    icon: "lucide:utensils-crossed",
  },
  {
    url: import.meta.env.BASE_URL + "orders/",
    label: "Pedidos",
    icon: "lucide:shopping-cart-minus",
  },
  { url: "#contact", label: "Contacto", icon: "lucide:message-circle-more" },
];

export const socialNetworks: LinksProps[] = [
  {
    url: "https://www.linkedin.com/in/14bryanespinoza",
    icon: "simple-icons:linkedin",
  },
  {
    url: "https://github.com/14bryanespinoza",
    icon: "simple-icons:github",
  },
  {
    url: "https://www.facebook.com/14bryanespinoza",
    icon: "simple-icons:facebook",
  },
  {
    url: "https://twitter.com/14bryanespinoza",
    icon: "simple-icons:x",
  },
];

export const linkOthers: LinksProps[] = [
  { url: "#", label: "Términos" },
  { url: "#", label: "Privacidad" },
  { url: "#", label: "Cookies" },
];
