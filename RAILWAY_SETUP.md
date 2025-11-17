# Configuração para Railway

Este documento explica como configurar o bot iMavyBot no Railway.

## Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no painel do Railway:

### Obrigatórias:
- `HUGGING_FACE_API` - Sua chave de API do Hugging Face
- `GROQ_API_KEY` - Sua chave de API do Groq (ou `OPENROUTER_API_KEY`)

### Opcionais:
- `ALLOWED_GROUP_NAMES` - Nomes dos grupos autorizados (separados por vírgula)
- `ALLOWED_USER_IDS` - IDs dos usuários autorizados (separados por vírgula)

## Como Configurar

1. **Crie um novo projeto no Railway:**
   - Acesse [railway.app](https://railway.app)
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Conecte seu repositório GitHub

2. **Configure as variáveis de ambiente:**
   - No painel do projeto, vá em "Variables"
   - Adicione todas as variáveis listadas acima

3. **Deploy:**
   - O Railway detectará automaticamente o `package.json`
   - O build será executado automaticamente
   - O bot iniciará usando o comando definido no `Procfile`

## Primeira Execução

Na primeira execução, o bot gerará um QR code no terminal. Para visualizar:

1. Acesse os logs do Railway no painel
2. Procure pela mensagem "🚨 Escaneie este QR code no WhatsApp:"
3. O QR code será exibido no terminal dos logs
4. Escaneie com seu WhatsApp

**Nota:** Se o QR code não aparecer corretamente nos logs, você pode:
- Verificar os logs completos no Railway
- O QR code será regenerado automaticamente se necessário

## Persistência de Dados

O diretório `auth_info/` contém as credenciais de autenticação do WhatsApp. No Railway, você pode:

1. **Usar um Volume persistente:**
   - No Railway, adicione um Volume
   - Monte-o no diretório `/app/auth_info`

2. **Ou usar variáveis de ambiente:**
   - Exporte as credenciais do `auth_info/` local
   - Configure como variáveis de ambiente (não recomendado para produção)

## Troubleshooting

- **Bot não inicia:** Verifique se todas as variáveis de ambiente estão configuradas
- **QR code não aparece:** Verifique os logs completos no Railway
- **Erro de autenticação:** Delete o diretório `auth_info/` e escaneie o QR code novamente

