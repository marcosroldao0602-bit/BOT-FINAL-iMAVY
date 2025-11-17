# Deploy no Vercel - iMavyBot

## ⚠️ Importante sobre Vercel

O Vercel é otimizado para aplicações web e serverless functions. Para bots que precisam rodar 24/7, o Vercel pode não ser ideal porque:

- **Serverless functions têm timeout** (máximo 60 segundos no plano gratuito)
- **Bots precisam rodar continuamente**, não como funções event-driven
- **O Vercel pode "dormir"** funções não utilizadas

**Recomendação:** Use o Vercel apenas para exibir o QR code via web. Para o bot em si, use:
- **Render.com** (melhor opção gratuita)
- **Fly.io** (24/7 garantido)
- **VPS** (máximo controle)

## 🚀 Como fazer deploy no Vercel (apenas para QR code)

### Opção 1: Deploy apenas do servidor web (Recomendado)

1. **Crie um repositório separado** apenas com os arquivos do servidor web:
   - `server.js`
   - `package.json` (com dependências mínimas)
   - `vercel.json`

2. **Ou faça deploy do projeto completo:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

3. **Configure variáveis de ambiente no Vercel:**
   - Acesse o painel do Vercel
   - Vá em Settings > Environment Variables
   - Adicione as variáveis necessárias

4. **Acesse a URL do Vercel** para ver o QR code

### Opção 2: Usar Vercel + Outra plataforma

1. **Deploy do bot em Render/Fly.io** (onde o bot roda 24/7)
2. **Deploy do servidor web no Vercel** (apenas para exibir QR code)
3. **O bot envia o QR code para o servidor Vercel via API**

## 📋 Configuração

### Arquivos necessários:

- `vercel.json` - Configuração do Vercel
- `server.js` - Servidor web para exibir QR code
- `api/index.js` - Serverless function wrapper

### Variáveis de Ambiente no Vercel:

Não são necessárias variáveis específicas para o servidor web, mas você pode configurar:
- `PORT` - Porta do servidor (opcional, Vercel define automaticamente)

## 🔧 Como funciona

1. O bot roda em outra plataforma (Render, Fly.io, etc.)
2. Quando o QR code é gerado, o bot envia para o servidor Vercel via API
3. Você acessa a URL do Vercel no navegador
4. A página exibe o QR code atualizado automaticamente
5. Você escaneia o QR code com seu WhatsApp

## 📱 Acessando o QR code

Após o deploy no Vercel, você receberá uma URL como:
```
https://seu-projeto.vercel.app
```

Acesse essa URL no navegador para ver o QR code.

## 🔄 Atualização automática

A página atualiza automaticamente a cada 5 segundos para mostrar o QR code mais recente.

## ⚠️ Limitações do Vercel

- **Timeout:** Funções serverless têm limite de tempo de execução
- **Cold start:** Primeira requisição pode ser lenta
- **Não é ideal para bots 24/7:** Use para exibir QR code apenas

## 💡 Solução Recomendada

Para produção, use:
1. **Render.com** ou **Fly.io** para rodar o bot 24/7
2. **Vercel** apenas para exibir o QR code (opcional)

Ou simplesmente acesse os logs da plataforma onde o bot está rodando para ver o QR code no terminal.

