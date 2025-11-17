# Alternativas de Deploy - iMavyBot

Como o Railway está com plano limitado, aqui estão alternativas para fazer deploy do bot.

## 🚀 Opções de Deploy Gratuitas

### 1. **Render.com** (Recomendado - Plano Gratuito)

Render oferece plano gratuito com algumas limitações, mas funciona bem para bots.

#### Configuração:

1. **Crie uma conta em [render.com](https://render.com)**

2. **Crie um novo Web Service:**
   - Clique em "New +" > "Web Service"
   - Conecte seu repositório GitHub
   - Selecione o repositório `BOT-FINAL-iMAVY`

3. **Configurações do serviço:**
   - **Name:** `imavybot` (ou qualquer nome)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Free

4. **Variáveis de Ambiente:**
   - Vá em "Environment" e adicione:
     - `HUGGING_FACE_API`
     - `GROQ_API_KEY` (ou `OPENROUTER_API_KEY`)
     - `ALLOWED_GROUP_NAMES` (opcional)
     - `ALLOWED_USER_IDS` (opcional)

5. **Persistência de Dados:**
   - Render não oferece volumes persistentes no plano gratuito
   - **Solução:** Use um serviço de armazenamento externo (Google Drive API, Dropbox API) ou configure para salvar `auth_info/` em um banco de dados

**Nota:** O plano gratuito do Render pode "dormir" após 15 minutos de inatividade. Para bots 24/7, considere upgrade ou outras opções.

---

### 2. **Fly.io** (Plano Gratuito Generoso)

Fly.io oferece plano gratuito com recursos generosos.

#### Configuração:

1. **Instale o Fly CLI:**
   ```bash
   # Windows (PowerShell)
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **Crie um arquivo `fly.toml`:**
   ```toml
   app = "imavybot"
   primary_region = "gru"  # ou outra região próxima

   [build]

   [env]
     PORT = "3000"

   [[services]]
     internal_port = 3000
     protocol = "tcp"
   ```

3. **Faça login e deploy:**
   ```bash
   fly auth login
   fly launch
   fly secrets set HUGGING_FACE_API=your_key
   fly secrets set GROQ_API_KEY=your_key
   fly deploy
   ```

4. **Para volumes persistentes:**
   ```bash
   fly volumes create auth_data --size 1
   # Configure o mount no fly.toml
   ```

---

### 3. **Koyeb** (Plano Gratuito)

Koyeb oferece deploy simples e gratuito.

#### Configuração:

1. **Acesse [koyeb.com](https://www.koyeb.com)**

2. **Crie um novo App:**
   - Conecte seu GitHub
   - Selecione o repositório
   - Build: Auto-detect
   - Run: `node index.js`

3. **Configure variáveis de ambiente** no painel

---

### 4. **Replit** (Para desenvolvimento/testes)

Replit é bom para testes, mas não recomendado para produção 24/7.

1. Acesse [replit.com](https://replit.com)
2. Importe o repositório GitHub
3. Configure as variáveis de ambiente
4. Execute o bot

---

### 5. **VPS (Servidor Virtual Privado)**

Para máxima flexibilidade e controle, use um VPS.

#### Opções de VPS Gratuitas/Low-cost:

- **Oracle Cloud Free Tier** - 2 VMs sempre gratuitas
- **Google Cloud Free Tier** - $300 créditos grátis
- **AWS Free Tier** - 12 meses grátis
- **DigitalOcean** - $4/mês (não gratuito, mas barato)

#### Configuração básica em VPS:

1. **Conecte via SSH:**
   ```bash
   ssh usuario@seu-servidor
   ```

2. **Instale Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone o repositório:**
   ```bash
   git clone https://github.com/marcosroldao0602-bit/BOT-FINAL-iMAVY.git
   cd BOT-FINAL-iMAVY
   npm install
   ```

4. **Configure variáveis de ambiente:**
   ```bash
   nano .env
   # Adicione suas variáveis
   ```

5. **Use PM2 para manter o bot rodando:**
   ```bash
   npm install -g pm2
   pm2 start index.js --name imavybot
   pm2 save
   pm2 startup  # Para iniciar automaticamente no boot
   ```

---

## 📋 Comparação Rápida

| Plataforma | Plano Gratuito | 24/7 | Volumes Persistentes | Dificuldade |
|------------|----------------|------|---------------------|-------------|
| **Render** | ✅ Sim | ⚠️ Dorme após inatividade | ❌ Não (gratuito) | Fácil |
| **Fly.io** | ✅ Sim | ✅ Sim | ✅ Sim | Médio |
| **Koyeb** | ✅ Sim | ⚠️ Limitado | ⚠️ Limitado | Fácil |
| **Replit** | ✅ Sim | ❌ Não | ⚠️ Limitado | Muito Fácil |
| **VPS** | ⚠️ Depende | ✅ Sim | ✅ Sim | Difícil |

---

## 🔧 Solução para Persistência de Dados (auth_info/)

Se a plataforma não oferecer volumes persistentes, você pode:

### Opção 1: Usar Google Drive API
- Salvar `auth_info/` no Google Drive
- Baixar na inicialização do bot

### Opção 2: Usar MongoDB/Supabase
- Converter `auth_info/` para JSON
- Salvar em banco de dados
- Carregar na inicialização

### Opção 3: Usar Variáveis de Ambiente (não recomendado)
- Exportar credenciais como variáveis
- Reconstruir `auth_info/` na inicialização

---

## 🎯 Recomendação

Para produção 24/7:
1. **Fly.io** - Melhor opção gratuita com volumes persistentes
2. **VPS (Oracle Cloud)** - Máximo controle, sempre gratuito
3. **Render** - Fácil, mas pode dormir (ok para testes)

Para desenvolvimento/testes:
- **Replit** ou **Render** são suficientes

---

## 📝 Próximos Passos

1. Escolha uma plataforma
2. Siga as instruções específicas acima
3. Configure as variáveis de ambiente
4. Faça o deploy
5. Acesse os logs para ver o QR code

Se precisar de ajuda com alguma plataforma específica, me avise!

