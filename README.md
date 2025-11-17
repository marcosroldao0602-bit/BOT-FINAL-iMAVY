# iMavyBot - Bot WhatsApp

Bot inteligente para WhatsApp usando Baileys, com suporte a IA via Hugging Face e Groq.

## 🚀 Funcionalidades

- Respostas automáticas em grupos do WhatsApp
- Sistema anti-spam com detecção de termos e links
- Sistema de strikes e punições automáticas
- Integração com IA (Hugging Face / Groq)
- Mensagens de boas-vindas automáticas
- Agendamento de mensagens
- Comandos administrativos

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🔧 Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/marcosroldao0602-bit/BOT-FINAL-iMAVY.git
cd BOT-FINAL-iMAVY
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Veja `RAILWAY_SETUP.md` para a lista completa de variáveis

4. Execute o bot:
```bash
npm start
```

5. Escaneie o QR code que aparecerá no terminal com seu WhatsApp

## ☁️ Deploy

### ⚠️ Railway com Plano Limitado?

Se o Railway estiver limitando seu plano, consulte **[DEPLOY_ALTERNATIVAS.md](./DEPLOY_ALTERNATIVAS.md)** para outras opções de deploy gratuitas:
- **Render.com** (Recomendado - fácil)
- **Fly.io** (Melhor para 24/7)
- **Koyeb** (Alternativa simples)
- **VPS** (Máximo controle)

### Deploy no Railway

Para fazer deploy no Railway, consulte o arquivo [RAILWAY_SETUP.md](./RAILWAY_SETUP.md) para instruções detalhadas.

### Resumo rápido:

1. Conecte seu repositório GitHub ao Railway
2. Configure as variáveis de ambiente no painel do Railway
3. O deploy será feito automaticamente
4. Acesse os logs para ver o QR code de autenticação

## 📝 Variáveis de Ambiente

- `HUGGING_FACE_API` - Chave de API do Hugging Face (obrigatória)
- `GROQ_API_KEY` - Chave de API do Groq (ou `OPENROUTER_API_KEY`)
- `ALLOWED_GROUP_NAMES` - Nomes dos grupos autorizados (separados por vírgula)
- `ALLOWED_USER_IDS` - IDs dos usuários autorizados (separados por vírgula)

## 📁 Estrutura do Projeto

```
.
├── functions/          # Funções auxiliares do bot
├── auth_info/         # Credenciais de autenticação (não commitado)
├── index.js           # Arquivo principal
├── package.json       # Dependências e scripts
├── Procfile          # Configuração para Railway
├── railway.json      # Configuração adicional do Railway
├── nixpacks.toml     # Configuração de build do Railway
├── fly.toml          # Configuração para Fly.io
├── render.yaml       # Configuração para Render.com
├── RAILWAY_SETUP.md  # Guia de deploy no Railway
└── DEPLOY_ALTERNATIVAS.md  # Alternativas de deploy
```

## ⚠️ Importante

- O diretório `auth_info/` contém credenciais sensíveis e não deve ser commitado
- Mantenha suas chaves de API seguras e nunca as compartilhe
- No Railway, use Volumes persistentes para o diretório `auth_info/`

## 📄 Licença

ISC

