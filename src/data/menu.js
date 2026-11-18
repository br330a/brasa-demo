// Cardápio e preços fictícios para o projeto demonstrativo BRASA.
// addOnIds limita as personalizações às opções que fazem sentido para cada item.
export const categories = [
  { id: "todos", label: "Todos", description: "Tudo para montar o pedido perfeito." },
  { id: "hamburgueres", label: "Hambúrgueres", description: "Clássicos e criações da casa, feitos com personalidade." },
  { id: "frango", label: "Frango", description: "Crocância e muito sabor em cada mordida." },
  { id: "acompanhamentos", label: "Acompanhamentos", description: "Para dividir ou aproveitar sozinho." },
  { id: "bebidas", label: "Bebidas", description: "Geladas e prontas para acompanhar seu favorito." },
  { id: "sobremesas", label: "Sobremesas", description: "Um final doce no estilo BRASA." },
];

export const addOns = [
  { id: "cheddar-extra", name: "Cheddar extra", price: 4.5 },
  { id: "bacon-extra", name: "Bacon crocante", price: 6.0 },
  { id: "ovo", name: "Ovo", price: 3.5 },
  { id: "molho-extra", name: "Molho da casa", price: 2.5 },
  { id: "calda-chocolate", name: "Calda de chocolate extra", price: 3.0 },
  { id: "sorvete-extra", name: "Bola de sorvete de baunilha", price: 6.0 },
  { id: "chantilly", name: "Chantilly", price: 3.0 },
];

const burgerExtras = ["cheddar-extra", "bacon-extra", "ovo", "molho-extra"];
const veggieExtras = ["cheddar-extra", "ovo", "molho-extra"];

export const products = [
  {
    id: "brasa-double", category: "hamburgueres", name: "Brasa Double",
    description: "Dois smash burgers, cheddar derretido e molho especial da casa.",
    price: 42.9, image: "/images/brasa-hero.webp",
    imageAlt: "Hambúrguer duplo com cheddar derretido no pão brioche",
    highlight: "Assinatura da casa", addOnIds: burgerExtras,
    ingredients: [{ id: "cebola", name: "Cebola" }, { id: "picles", name: "Picles" }, { id: "molho", name: "Molho da casa" }],
  },
  {
    id: "classic-smash", category: "hamburgueres", name: "Classic Smash",
    description: "Smash suculento, queijo, picles e molho cremoso no brioche.",
    price: 32.9, image: "/images/classic-smash.webp",
    imageAlt: "Hambúrguer clássico com queijo e pão brioche", addOnIds: burgerExtras,
    ingredients: [{ id: "picles", name: "Picles" }, { id: "cebola", name: "Cebola" }, { id: "molho", name: "Molho cremoso" }],
  },
  {
    id: "bacon-house", category: "hamburgueres", name: "Bacon House",
    description: "Bacon crocante, cebola caramelizada e cheddar na medida.",
    price: 39.9, image: "/images/bacon-house.webp",
    imageAlt: "Hambúrguer artesanal com bacon e cebola caramelizada", addOnIds: burgerExtras,
    ingredients: [{ id: "cebola", name: "Cebola caramelizada" }, { id: "molho", name: "Molho da casa" }],
  },
  {
    id: "brasa-bbq", category: "hamburgueres", name: "Brasa BBQ",
    description: "Carne na chapa, bacon, onion rings e barbecue defumado.",
    price: 44.9, image: "/images/brasa-bbq.webp", imageAlt: "Hambúrguer com bacon, onion rings e molho barbecue",
    highlight: "Sabor defumado", addOnIds: burgerExtras,
    ingredients: [{ id: "bacon", name: "Bacon" }, { id: "onion", name: "Onion rings" }, { id: "barbecue", name: "Molho barbecue" }],
  },
  {
    id: "jalapeno-fire", category: "hamburgueres", name: "Jalapeño Fire",
    description: "Dois smash burgers, cheddar e jalapeño para quem gosta de ardência.",
    price: 41.9, image: "/images/jalapeno-fire.webp", imageAlt: "Hambúrguer duplo com cheddar e rodelas de jalapeño",
    highlight: "Picante", addOnIds: burgerExtras,
    ingredients: [{ id: "jalapeno", name: "Jalapeño" }, { id: "molho", name: "Molho picante" }],
  },
  {
    id: "onion-melt", category: "hamburgueres", name: "Onion Melt",
    description: "Smash suculento, queijo e cebola dourada lentamente na chapa.",
    price: 37.9, image: "/images/onion-melt.webp", imageAlt: "Hambúrguer com queijo e cebola caramelizada",
    addOnIds: burgerExtras,
    ingredients: [{ id: "cebola", name: "Cebola caramelizada" }, { id: "molho", name: "Molho da casa" }],
  },
  {
    id: "veggie-crispy", category: "hamburgueres", name: "Veggie Crispy",
    description: "Hambúrguer vegetal crocante, cogumelos, alface, tomate e aioli.",
    price: 39.9, image: "/images/veggie-crispy.webp", imageAlt: "Hambúrguer vegetal empanado com alface, tomate e cogumelos",
    highlight: "Vegetariano", addOnIds: veggieExtras,
    ingredients: [{ id: "cogumelos", name: "Cogumelos" }, { id: "alface", name: "Alface" }, { id: "tomate", name: "Tomate" }, { id: "aioli", name: "Aioli" }],
  },
  {
    id: "crispy-chicken", category: "frango", name: "Crispy Chicken",
    description: "Frango empanado crocante, folhas frescas e maionese da casa.",
    price: 35.9, image: "/images/crispy-chicken.webp",
    imageAlt: "Sanduíche de frango crocante com alface e molho", addOnIds: burgerExtras,
    ingredients: [{ id: "alface", name: "Alface" }, { id: "tomate", name: "Tomate" }, { id: "molho", name: "Maionese da casa" }],
  },
  {
    id: "fritas-casa", category: "acompanhamentos", name: "Fritas da Casa",
    description: "Batatas douradas e crocantes, com tempero artesanal.",
    price: 17.9, image: "/images/fritas-casa.webp", imageAlt: "Porção de batatas fritas douradas",
    addOnIds: ["cheddar-extra", "bacon-extra", "molho-extra"], ingredients: [],
  },
  {
    id: "fritas-brasa", category: "acompanhamentos", name: "Fritas BRASA",
    description: "Nossa porção generosa com cheddar cremoso e bacon crocante.",
    price: 28.9, image: "/images/fritas-brasa.webp", imageAlt: "Porção de fritas com cheddar e bacon",
    highlight: "Para compartilhar", addOnIds: ["cheddar-extra", "bacon-extra", "molho-extra"],
    ingredients: [{ id: "cheddar", name: "Cheddar" }, { id: "bacon", name: "Bacon" }],
  },
  {
    id: "onion-rings", category: "acompanhamentos", name: "Onion Rings",
    description: "Anéis de cebola empanados, sequinhos e supercrocantes.",
    price: 22.9, image: "/images/onion-rings.webp", imageAlt: "Anéis de cebola empanados e crocantes",
    addOnIds: ["molho-extra"], ingredients: [],
  },
  {
    id: "cola-gelada", category: "bebidas", name: "Cola Gelada",
    description: "Refrigerante tipo cola, 350 ml, servido bem gelado.",
    price: 8.9, image: "/images/cola-gelada.webp", imageAlt: "Copo de refrigerante tipo cola com gelo",
    addOnIds: [], ingredients: [],
  },
  {
    id: "guarana-lata", category: "bebidas", name: "Guaraná Lata",
    description: "Refrigerante de guaraná, 350 ml, para refrescar o pedido.",
    price: 8.9, image: "/images/guarana-lata.webp", imageAlt: "Lata de refrigerante de guaraná",
    addOnIds: [], ingredients: [],
  },
  {
    id: "limonada-casa", category: "bebidas", name: "Limonada da Casa",
    description: "Limão espremido, gelo e hortelã, 400 ml.",
    price: 12.9, image: "/images/limonada-casa.webp", imageAlt: "Limonada com gelo, limão e hortelã",
    highlight: "Refrescante", addOnIds: [], ingredients: [],
  },
  {
    id: "milkshake-brasa", category: "bebidas", name: "Milk-shake BRASA",
    description: "Milk-shake cremoso de chocolate, 400 ml.",
    price: 19.9, image: "/images/milkshake-brasa.webp", imageAlt: "Milk-shake de chocolate com chantilly",
    addOnIds: ["chantilly", "calda-chocolate"], ingredients: [],
  },
  {
    id: "brownie-brasa", category: "sobremesas", name: "Brownie da BRASA",
    description: "Brownie quentinho com sorvete de baunilha e calda de chocolate.",
    price: 24.9, image: "/images/brownie-brasa.webp", imageAlt: "Brownie de chocolate com sorvete e calda",
    highlight: "Sobremesa da casa", addOnIds: ["calda-chocolate", "sorvete-extra"], ingredients: [],
  },
  {
    id: "petit-gateau", category: "sobremesas", name: "Petit Gâteau",
    description: "Bolinho de chocolate com centro cremoso e sorvete de baunilha.",
    price: 24.9, image: "/images/petit-gateau.webp", imageAlt: "Petit gâteau de chocolate com calda quente",
    addOnIds: ["calda-chocolate", "sorvete-extra"], ingredients: [],
  },
];
