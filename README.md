<div align="center">
  <br />
  <a href="https://convit3-digital.vercel.app">
   <img src="./public/logo.svg" alt="Project Banner" style="width: 300px">
  </a>

  <br />
  <div>
    <img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white" alt="next.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" alt="typescript" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff" alt="shadcn" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white" alt="postgresql" />
    <img src="https://img.shields.io/badge/ChatGPT-74aa9c?logo=openai&logoColor=white" alt="chatGpt" />
    <img src="https://img.shields.io/badge/Stripe-5851DD?logo=stripe&logoColor=fff" alt="stripe" />
  </div>

  <h2 align="center">Finance AI System</h2>
  <div align="center">
    Sua solução inteligente para gerenciamento financeiro pessoal. Transforme o controle das suas finanças com nossa plataforma que combina simplicidade e tecnologia avançada.
  </div>
</div>

## 📋 <a name="table">Índice</a>

1. 🤖 [Introdução](#introduction)
2. ⚙️ [Tecnologia Utilizadas](#tech-stack)
3. 🔋 [Funcionalidades](#features)
4. 🤸 [Início Rápido](#quick-start)
5. 🕸️ [Trechos (Código para copiar)](#snippets)

## <a name="introduction">🤖 Introdução</a>

O Finance AI é um aplicativo financeiro inovador, criado para simplificar e potencializar o gerenciamento das finanças pessoais. Desenvolvido com tecnologias avançadas como Next.js, TypeScript, Tailwind CSS, Shadcn, PostgreSQL e Prisma, o Finance AI oferece uma experiência fluida, rápida e segura.
Além de um sistema de assinatura via Stripe, o Finance AI conta com integração de login com Google, permitindo que usuários acessem o app de forma rápida e prática. Com acesso a recursos premium,
os assinantes recebem relatórios financeiros detalhados e personalizados, gerados por inteligência artificial, que fornecem análises preditivas e recomendações personalizadas.

#### 🌐 Acesse em: [https://finance-ai-ruby.vercel.app](https://finance-ai-ruby.vercel.app)

## <a name="tech-stack">⚙️ Tecnologia Utilizadas</a>

- **[Next.js](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org)**
- **[Clerk Authentication](https://clerk.com)**
- **[ShadCN](https://ui.shadcn.com)**
- **[Tailwind CSS](https://tailwindcss.com)**
- **[Prisma ORM](https://www.prisma.io)**
- **[PostgreSQL](https://www.postgresql.org)**
- **[React Hook Form](https://react-hook-form.com)**
- **[Zod](https://zod.dev)**
- **[Stripe](https://stripe.com)**
- **[OpenAI](https://openai.com)**

## <a name="features">🔋 Funcionalidades</a>

👉 **Acesso simplificado**: Faça login rapidamente utilizando Google. Sem complicações, sem senhas.

👉 **Gerenciamento de despesas**: Registre suas despesas com facilidade, adicionando detalhes como descrição, valor e categoria.

👉 **Inteligência Artificial**: Receba relatórios financeiros detalhados e recomendações personalizadas geradas por inteligência artificial.

👉 **Assinatura Premium**: Acesse recursos premium, como relatórios financeiros detalhados e recomendações personalizadas.

👉 **Relatórios em PDF**: Exporte e baixe relatórios financeiros detalhados em formato PDF para análise offline e arquivamento.

## <a name="quick-start">🤸 Quick Start</a>

Siga estas etapas para configurar o projeto localmente na sua máquina.

**Pré-requisitos**

Certifique-se de ter o seguinte instalado em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/pt)
- [Npm](https://www.npmjs.com) (Geralmente instalado com node.js)

**Clonando o Repositório**

```bash
git clone https://github.com/Joclelsonr/finance-ai-nextjs.git
cd finance-ai-nextjs
```

**Instalação**

Instale as dependências do projeto usando npm:

```bash
npm install
```

**Configurar variáveis ​​de ambiente**

Crie um novo arquivo chamado `.env` na raiz do seu projeto e adicione o seguinte conteúdo:

```env
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/database
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=####################
CLERK_SECRET_KEY=####################
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_####################
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=https://billing.stripe.com/p/login
STRIPE_PREMIUM_PRICE_ID=price_####################
STRIPE_SECRET_KEY=sk_test_####################
STRIPE_WEBHOOK_SECRET=whsec_####################
OPENAI_API_KEY=####################
```

**Executando o Projeto**

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar o projeto.

## <a name="snippets">🕸️ Trechos</a>

<details>
  <summary><code>middleware.ts</code></summary>

```typescript
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

</details>

<br />
<br />
<hr />

Sinta-se à vontade para contribuir ou relatar problemas na seção de [issues](https://github.com/Joclelsonr/finance-ai-nextjs/issues).
