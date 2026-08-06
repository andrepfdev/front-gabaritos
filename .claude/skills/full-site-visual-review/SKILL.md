---
name: full-site-visual-review
description: Use sempre que uma mudança de tema, design tokens (cor, radius, tipografia, sombra) ou dark mode for feita neste projeto. Garante que a verificação visual cubra todas as páginas do site, não só a página que motivou a mudança.
---

# Revisão visual do site inteiro

Uma mudança de token global (cor, `border-radius`, tipografia, dark mode) afeta
todas as páginas, mesmo que a motivação tenha sido só uma delas. Testar
apenas a página de origem (geralmente a home) e assumir que o resto está
igual é o erro mais comum aqui — já aconteceu de o toggle de tema ser
validado só na landing e as outras páginas ficarem sem revisão.

## Regra

Depois de qualquer mudança em `src/assets/styles/main.css`, `src/theme.ts`,
ou em qualquer componente/estilo compartilhado (`AppHeader`, `AppFooter`,
tokens `--gab-*`, PrimeVue preset), rode a varredura abaixo **antes** de
considerar a tarefa concluída.

## Rotas a cobrir

Todas as rotas definidas em `src/router/index.ts`:

- `/` — landing
- `/login`
- `/registro`
- `/recuperar-senha`
- `/planos`
- `/conta/:userId` — exige sessão autenticada; se não houver uma sessão de
  teste disponível, pelo menos revisar o componente por leitura de código
  (`AccountPage.vue`, `SubscriptionStatusCard.vue`, `PaymentHistoryList.vue`)
  procurando cores hardcoded fora do sistema de tokens
- `/perfil` — mesma ressalva de autenticação
- `/privacidade`
- rota inexistente (404 / `NotFoundPage.vue`)

## Método (validado nesta sessão)

1. Subir o dev server em background e esperar a porta responder:
   ```bash
   npm run dev -- --port 5173 > /tmp/vite-dev.log 2>&1 &
   timeout 30 bash -c 'until curl -sf http://localhost:5173/ >/dev/null; do sleep 1; done'
   ```
2. Usar Playwright (instalado localmente num diretório de scratchpad, não
   como dependência do projeto) para tirar screenshot de cada rota em:
   - `colorScheme: 'light'` e `colorScheme: 'dark'`
   - pelo menos 2 viewports: mobile (390×844) e desktop (1440×900)
   ```js
   const { chromium } = require('playwright');
   const browser = await chromium.launch();
   const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
   await page.goto('http://localhost:5173/planos', { waitUntil: 'networkidle' });
   await page.screenshot({ path: 'planos-dark.png' });
   ```
3. Olhar cada screenshot de verdade (via `Read`), não só confiar que "deve
   ter funcionado" porque o build passou — problemas de contraste, borda
   invisível ou componente PrimeVue que não respeita `--gab-*` só aparecem
   visualmente, não no type-check.
4. Corrigir o que for encontrado, refazer o screenshot da página corrigida
   pra confirmar.
5. Matar o dev server ao terminar: `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill`.

## O que procurar especificamente em dark mode

- Texto sem contraste suficiente contra `--gab-bg`/`--gab-surface` escuros.
- Bordas (`--gab-border`) que desaparecem contra fundos escuros.
- Componentes PrimeVue (`Tag`, `Message`, `ConfirmDialog`, `Toast`) que usam
  cores fixas em vez de tokens do tema — só ficam certos se
  `darkModeSelector: '.gab-dark'` (configurado em `src/main.ts`) estiver de
  fato sendo aplicado no `<html>` (ver `src/stores/theme.ts`).
- Imagens/ilustrações com fundo branco sólido que quebram contra o fundo
  escuro (ex.: fotos sem transparência).
