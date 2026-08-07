<script setup lang="ts">
import Button from 'primevue/button'
import StoreBadges from '@/components/common/StoreBadges.vue'

// TODO: trocar pelos links reais assim que os builds do app estiverem disponíveis.
const links = {
  apk: '#',
  ipa: '#',
}
</script>

<template>
  <main class="gab-container gab-page download-page">
    <h1>Baixar o app ProvaZero</h1>
    <p class="download-page__updated">
      O app ProvaZero é onde você fotografa o cartão-resposta e recebe a correção do gabarito na
      hora. Baixe pela loja do seu celular ou, se preferir, instale diretamente seguindo as
      instruções abaixo.
    </p>

    <section class="gab-card download-page__section">
      <h2>Nas lojas oficiais</h2>
      <p>Baixe o app ProvaZero na Google Play ou na App Store.</p>
      <StoreBadges />
    </section>

    <section class="gab-card download-page__section">
      <h2>Android — instalar o APK diretamente</h2>
      <p>Se preferir não usar a Google Play, instale o APK direto no seu celular Android:</p>
      <ol>
        <li>Baixe o arquivo <strong>.apk</strong> no botão abaixo, pelo navegador do seu celular.</li>
        <li>
          Ao abrir o arquivo baixado, o Android pode pedir permissão para instalar apps de fontes
          desconhecidas. Toque em <strong>Configurações</strong> na mensagem e ative a opção
          <strong>"Permitir desta fonte"</strong> para o navegador ou gerenciador de arquivos usado.
        </li>
        <li>Volte para o arquivo baixado e toque em <strong>Instalar</strong>.</li>
        <li>Ao concluir, abra o app ProvaZero e entre com sua conta.</li>
      </ol>
      <a :href="links.apk" download>
        <Button label="Baixar APK para Android" icon="pi pi-android" />
      </a>
    </section>

    <section class="gab-card download-page__section">
      <h2>iOS — instalar o app via perfil de distribuição</h2>
      <p>
        Se preferir não usar a App Store, instale diretamente por meio de um arquivo
        <strong>.ipa</strong> com um perfil de distribuição enterprise/ad-hoc. É necessário confiar
        no certificado do desenvolvedor antes de conseguir abrir o app:
      </p>
      <ol>
        <li>Baixe o arquivo <strong>.ipa</strong> no botão abaixo, pelo Safari do seu iPhone.</li>
        <li>Quando pedido, toque em <strong>Instalar</strong> para adicionar o app à tela inicial.</li>
        <li>
          Antes de abrir o app pela primeira vez, vá em
          <strong>Ajustes → Geral → VPN e Gerenciamento de Dispositivo</strong>.
        </li>
        <li>
          Em <strong>Apps de Empresa</strong>, toque no perfil do desenvolvedor do ProvaZero e depois
          em <strong>Confiar em "ProvaZero"</strong>.
        </li>
        <li>Volte para a tela inicial e abra o app normalmente.</li>
      </ol>
      <a :href="links.ipa" download>
        <Button label="Baixar app para iOS" icon="pi pi-apple" />
      </a>
    </section>

    <section class="gab-card download-page__section">
      <h2>Problemas para instalar?</h2>
      <p>
        Se o app não abrir mesmo depois de confiar no certificado, ou se a instalação for
        bloqueada, entre em contato pelo e-mail
        <a href="mailto:contato@provazero.app.br">contato@provazero.app.br</a>.
      </p>
    </section>
  </main>
</template>

<style scoped>
.download-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 760px;
  margin: 0 auto;
}

.download-page__updated {
  color: var(--gab-text-muted);
  margin: 0;
}

.download-page__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.download-page__section h2 {
  margin: 0;
  font-size: 1.15rem;
}

.download-page__section ol {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.download-page__section a {
  color: var(--gab-accent);
}

.download-page__section a[download] {
  color: inherit;
  text-decoration: none;
  align-self: flex-start;
}
</style>
