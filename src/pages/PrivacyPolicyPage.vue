<script setup lang="ts">
const lastUpdated = '06 de agosto de 2026'
</script>

<template>
  <main class="gab-container gab-page privacy-page">
    <h1>Política de Privacidade</h1>
    <p class="privacy-page__updated">Última atualização: {{ lastUpdated }}</p>

    <p>
      Esta Política de Privacidade explica como o <strong>ProvaZero</strong> ("ProvaZero", "nós")
      coleta, usa, compartilha e protege os dados pessoais de quem utiliza este site e a conta
      vinculada ao aplicativo de correção de gabaritos, em conformidade com a Lei nº 13.709/2018
      (Lei Geral de Proteção de Dados Pessoais — LGPD).
    </p>

    <section class="gab-card privacy-page__section">
      <h2>1. Quem é o controlador dos dados</h2>
      <p>
        O controlador dos dados pessoais tratados neste site é o <strong>ProvaZero</strong>.
        Dúvidas, solicitações ou exercício de direitos podem ser enviados para
        <a href="mailto:contato@provazero.app.br">contato@provazero.app.br</a>.
      </p>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li><strong>Dados de cadastro:</strong> nome, e-mail e senha (armazenada de forma criptografada).</li>
        <li>
          <strong>Dados de assinatura e pagamento:</strong> plano escolhido, status da assinatura e
          histórico de pagamentos. Os dados do cartão de crédito são processados diretamente pela
          <strong>Stripe</strong> — o ProvaZero não recebe nem armazena o número do cartão.
        </li>
        <li>
          <strong>Dados técnicos de sessão:</strong> tokens de acesso e atualização (JWT), guardados
          no navegador para manter você conectado.
        </li>
      </ul>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>3. Para que usamos seus dados</h2>
      <ul>
        <li>Criar e gerenciar sua conta e autenticação;</li>
        <li>Processar sua assinatura e pagamentos junto à Stripe;</li>
        <li>Enviar comunicações essenciais, como redefinição de senha;</li>
        <li>Cumprir obrigações legais e regulatórias;</li>
        <li>Prevenir fraudes e garantir a segurança da plataforma.</li>
      </ul>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>4. Base legal do tratamento</h2>
      <p>Tratamos seus dados com base nas seguintes hipóteses legais da LGPD (art. 7º):</p>
      <ul>
        <li><strong>Execução de contrato</strong> (art. 7º, V): para viabilizar sua conta e assinatura;</li>
        <li><strong>Consentimento</strong> (art. 7º, I): quando aplicável, como no envio de comunicações opcionais;</li>
        <li><strong>Cumprimento de obrigação legal</strong> (art. 7º, II): registros fiscais e contábeis de pagamento;</li>
        <li><strong>Legítimo interesse</strong> (art. 7º, IX): segurança, prevenção a fraudes e melhoria do serviço.</li>
      </ul>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>5. Com quem compartilhamos seus dados</h2>
      <p>
        Compartilhamos dados estritamente necessários com operadores que nos ajudam a prestar o
        serviço, sempre sob obrigações contratuais de proteção de dados:
      </p>
      <ul>
        <li><strong>Stripe</strong> (processamento de pagamentos e assinaturas);</li>
        <li>Provedor de e-mail transacional (envio de senha temporária em recuperação de conta).</li>
      </ul>
      <p>
        Não vendemos dados pessoais a terceiros. Alguns desses operadores podem processar dados em
        servidores fora do Brasil; nesses casos, exigimos garantias compatíveis com a LGPD.
      </p>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>6. Por quanto tempo guardamos seus dados</h2>
      <p>
        Mantemos seus dados enquanto sua conta estiver ativa e pelo prazo adicional necessário para
        cumprir obrigações legais (ex.: fiscais) ou para o exercício regular de direitos em processos
        judiciais ou administrativos. Após esse período, os dados são eliminados ou anonimizados.
      </p>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>7. Seus direitos como titular</h2>
      <p>Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
      <ul>
        <li>Confirmação da existência de tratamento;</li>
        <li>Acesso aos seus dados;</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
        <li>Portabilidade a outro fornecedor de serviço;</li>
        <li>Eliminação dos dados tratados com base no seu consentimento;</li>
        <li>Informação sobre entidades com quem compartilhamos seus dados;</li>
        <li>Revogação do consentimento, quando aplicável;</li>
        <li>Oposição a tratamento realizado com base em outras hipóteses legais, em caso de descumprimento da LGPD.</li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, entre em contato pelo e-mail
        <a href="mailto:contato@provazero.app.br">contato@provazero.app.br</a>. Você também pode
        editar seu nome e trocar sua senha diretamente em
        <router-link to="/perfil">Meu perfil</router-link>, ou cancelar sua assinatura a qualquer
        momento em <router-link to="/planos">Planos</router-link>.
      </p>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>8. Segurança dos dados</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger seus dados, como criptografia de
        senha, comunicação via HTTPS e controle de acesso por token. Nenhum sistema é
        completamente livre de riscos; caso identifiquemos um incidente de segurança que possa
        afetar seus dados, você será comunicado conforme exigido pela LGPD.
      </p>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>9. Cookies e armazenamento local</h2>
      <p>
        Este site não utiliza cookies de rastreamento ou publicidade. Usamos apenas o armazenamento
        local do navegador (<em>localStorage</em>) para manter você conectado entre visitas, guardando
        seus tokens de sessão. Ao sair da conta ou limpar os dados do navegador, essas informações
        são removidas.
      </p>
    </section>

    <section class="gab-card privacy-page__section">
      <h2>10. Alterações a esta política</h2>
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente. Alterações relevantes serão
        comunicadas por aviso no site ou por e-mail. A data da última atualização está sempre
        indicada no topo desta página.
      </p>
    </section>
  </main>
</template>

<style scoped>
.privacy-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 760px;
  margin: 0 auto;
}

.privacy-page__updated {
  color: var(--gab-text-muted);
  margin: 0;
  font-size: 0.9rem;
}

.privacy-page__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.privacy-page__section h2 {
  margin: 0;
  font-size: 1.15rem;
}

.privacy-page__section ul {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.privacy-page__section a {
  color: var(--gab-accent);
}
</style>
