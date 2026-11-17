// Dados inteiramente fictícios para o projeto demonstrativo BRASA.
export const categories = [
  { id: "todos", label: "Todos" },
  { id: "hamburgueres", label: "Hambúrgueres" },
  { id: "frango", label: "Frango" },
];

export const products = [
  {
    id: "brasa-double",
    category: "hamburgueres",
    name: "Brasa Double",
    description: "Dois smash burgers, cheddar derretido e molho especial da casa.",
    price: 42.9,
    image: "/images/brasa-hero.webp",
    imageAlt: "Hambúrguer duplo de carne com cheddar em pão brioche",
    highlight: "Assinatura da casa",
  },
  {
    id: "classic-smash",
    category: "hamburgueres",
    name: "Classic Smash",
    description: "Smash suculento, queijo, picles e molho cremoso no brioche.",
    price: 32.9,
    image: "/images/classic-smash.webp",
    imageAlt: "Hambúrguer clássico com queijo em fundo claro",
  },
  {
    id: "bacon-house",
    category: "hamburgueres",
    name: "Bacon House",
    description: "Bacon crocante, cebola caramelizada e cheddar na medida.",
    price: 39.9,
    image: "/images/bacon-house.webp",
    imageAlt: "Hambúrguer de carne com bacon e cebola caramelizada",
  },
  {
    id: "crispy-chicken",
    category: "frango",
    name: "Crispy Chicken",
    description: "Frango empanado crocante, folhas frescas e maionese da casa.",
    price: 35.9,
    image: "/images/crispy-chicken.webp",
    imageAlt: "Sanduíche de frango crocante com alface e molho",
  },
];
