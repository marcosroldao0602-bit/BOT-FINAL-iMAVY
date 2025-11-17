# Notas sobre Deploy no Vercel

## ⚠️ Avisos Comuns e Soluções

### 1. Aviso sobre `builds` no vercel.json

**Aviso:**
```
WARN! Due to `builds` existing in your configuration file, 
the Build and Development Settings defined in your Project Settings will not apply.
```

**Solução:** ✅ **Corrigido**
- Removido o campo `builds` do `vercel.json`
- O Vercel agora detecta automaticamente os arquivos na pasta `api/` como serverless functions
- Configuração simplificada usando apenas `routes`

### 2. Aviso sobre `engines` no package.json

**Aviso:**
```
Warning: Detected "engines": { "node": ">=18.0.0" } in your package.json 
that will automatically upgrade when a new major Node.js Version is released.
```

**Solução:** ✅ **Corrigido**
- Atualizado para `"22.x"` (Node.js 18.x foi descontinuado no Vercel)
- Isso fixa a versão e evita atualizações automáticas para versões major novas
- O Vercel usará Node.js 22.x

### 3. Avisos de Dependências Deprecated

**Avisos:**
```
npm warn deprecated node-domexception@1.0.0
npm warn deprecated puppeteer@21.11.0: < 24.15.0 is no longer supported
```

**Solução:** ⚠️ **Opcional**
- Esses são avisos, não erros
- O código continuará funcionando
- Para atualizar no futuro:
  ```bash
  npm install puppeteer@latest
  ```
- `node-domexception` é uma dependência transitiva (vem de outra biblioteca)

## ✅ Configuração Atual

O `vercel.json` agora está otimizado:
- Sem campo `builds` (usa detecção automática)
- Rotas configuradas para `/api/index.js`
- Node.js fixado em 22.x (versão atual suportada pelo Vercel)

## 📝 Próximos Passos

1. Faça push das alterações
2. Faça redeploy no Vercel
3. Os avisos devem desaparecer

## 🔍 Verificação

Após o deploy, verifique:
- ✅ Sem avisos sobre `builds`
- ✅ Sem avisos sobre `engines` (ou apenas informativo)
- ⚠️ Avisos de deprecated são normais e não afetam o funcionamento

