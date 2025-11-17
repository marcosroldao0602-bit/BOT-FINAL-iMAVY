# ⚠️ ATENÇÃO - ARQUIVOS SENSÍVEIS

Esta pasta contém as credenciais de autenticação do WhatsApp que mantêm o bot conectado.

## 🔒 Segurança

**IMPORTANTE:** Estes arquivos contêm informações sensíveis de autenticação.

### ⚠️ Se o repositório for PÚBLICO:
- **NÃO** faça commit destes arquivos
- Qualquer pessoa poderá acessar sua sessão do WhatsApp
- Seu WhatsApp pode ser comprometido

### ✅ Se o repositório for PRIVADO:
- Os arquivos podem ser commitados com segurança
- Apenas você e colaboradores autorizados terão acesso

## 📋 O que fazer:

1. **Verifique se o repositório é PRIVADO:**
   - GitHub: Settings → Change repository visibility → Make private

2. **Se for público, remova estes arquivos do git:**
   ```bash
   git rm -r --cached auth_info/
   git commit -m "Remove arquivos sensíveis"
   ```

3. **Use alternativas seguras:**
   - Volumes persistentes nas plataformas de deploy (Render, Fly.io)
   - Variáveis de ambiente (não recomendado para auth_info)
   - Backup manual antes de fazer deploy

## 🔄 Preservação da Sessão

Estes arquivos são essenciais para manter o bot conectado ao WhatsApp sem precisar escanear o QR code novamente.

**Nunca delete esta pasta** sem fazer backup primeiro!

