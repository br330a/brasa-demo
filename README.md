# BRASA. — Hamburgueria artesanal (demonstração)

Site demonstrativo de uma hamburgueria artesanal fictícia, criado para mostrar uma experiência de pedidos online **mobile-first**, com apresentação cinematográfica no desktop.

> **Projeto de portfólio.** O restaurante, os produtos, os preços, as fotos e os dados comerciais são fictícios. Nenhum pedido real é processado.

## Funcionalidades

- Cardápio com 17 produtos, categorias e busca sem diferenciação de acentos.
- Detalhes de produtos com adicionais e retirada de ingredientes (quando aplicável).
- Carrinho persistido no navegador, com edição, remoção, quantidades e cálculo em centavos.
- Checkout para entrega ou retirada, com resumo completo do pedido.
- Mensagem formatada para WhatsApp; na demonstração, sem número configurado, o pedido é apenas copiado.
- Layout mobile-first, painéis de personalização, navegação acessível e seção visual animada no desktop (com respeito a movimento reduzido).

## Tecnologias

React 19, Vite 8, JavaScript, CSS próprio e Node.js Test Runner. Não utiliza backend, banco de dados nem serviços de pagamento.

## Executar localmente

Requer Node.js compatível com a versão de Vite utilizada.

```bash
npm ci
npm run dev
```

Comandos para qualidade:

```bash
npm run test
npm run lint
npm run build
npm run preview
```

## Estrutura

- `src/components/`: apresentação, produtos, carrinho, checkout e animação.
- `src/data/`: catálogo e configuração do negócio demonstrativo.
- `src/hooks/`: estado e persistência do carrinho.
- `src/utils/`: precificação, busca, validação e criação do texto de pedido.
- `src/styles/`: estilos organizados por funcionalidade.
- `public/images/`: fotografias, versões leves para os cartões e camadas do scroll.
- `tests/`: testes de carrinho, cardápio, busca e checkout.

## Como funciona a demonstração

O carrinho utiliza `localStorage`. O checkout não armazena dados de endereço ou nome do comprador no armazenamento permanente. Como `whatsappNumber` está vazio em `src/data/business.js`, o pedido demonstrativo **não é enviado a terceiros**: o visitante pode copiar uma mensagem para experimentar o fluxo.

Em um projeto comercial real, antes de aceitar pedidos será necessário configurar número do restaurante, dados reais, regras de horário, entrega e taxa, políticas de atendimento e confirmar o funcionamento em produção.

## Deploy

Projeto React + Vite estático. A build gera a pasta `dist/`, compatível com Cloudflare Pages e outros serviços estáticos. Se publicar pelo Cloudflare Workers, configure a disponibilização dos assets da pasta `dist/` conforme o fluxo de deploy escolhido.

## Créditos e natureza do projeto

Marca BRASA., cardápio e fotografias são materiais fictícios produzidos para a demonstração. Este site não representa um restaurante em operação.
