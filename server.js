// server.js - Servidor HTTP para exibir QR code
import express from 'express';
import QRCode from 'qrcode';

const app = express();
const PORT = process.env.PORT || 3000;

// Variável global para armazenar o QR code atual
let currentQR = null;
let connectionStatus = 'disconnected';

// Rota principal - exibe o QR code
app.get('/', async (req, res) => {
    if (currentQR) {
        try {
            // Gera QR code como Data URL (imagem)
            const qrImage = await QRCode.toDataURL(currentQR);
            
            res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code - iMavyBot WhatsApp</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
        }
        .qr-container {
            background: white;
            padding: 20px;
            border-radius: 15px;
            display: inline-block;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .qr-container img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        .instructions {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
            text-align: left;
        }
        .instructions h2 {
            color: #333;
            font-size: 18px;
            margin-bottom: 15px;
        }
        .instructions ol {
            color: #555;
            line-height: 1.8;
            padding-left: 20px;
        }
        .instructions li {
            margin-bottom: 10px;
        }
        .status {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 20px;
        }
        .status.connected {
            background: #d4edda;
            color: #155724;
        }
        .status.disconnected {
            background: #f8d7da;
            color: #721c24;
        }
        .status.waiting {
            background: #fff3cd;
            color: #856404;
        }
        .auto-refresh {
            margin-top: 20px;
            color: #666;
            font-size: 14px;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .pulse {
            animation: pulse 2s infinite;
        }
    </style>
    <script>
        // Auto-refresh a cada 5 segundos
        setTimeout(() => {
            location.reload();
        }, 5000);
    </script>
</head>
<body>
    <div class="container">
        <h1>🚀 iMavyBot WhatsApp</h1>
        <p class="subtitle">Escaneie o QR Code para conectar</p>
        
        <div class="qr-container">
            <img src="${qrImage}" alt="QR Code WhatsApp" />
        </div>
        
        <div class="status ${connectionStatus === 'connected' ? 'connected' : 'waiting'}">
            ${connectionStatus === 'connected' ? '✅ Conectado' : '⏳ Aguardando conexão...'}
        </div>
        
        <div class="instructions">
            <h2>📱 Como conectar:</h2>
            <ol>
                <li>Abra o WhatsApp no seu celular</li>
                <li>Vá em <strong>Configurações</strong> → <strong>Aparelhos conectados</strong></li>
                <li>Toque em <strong>Conectar um aparelho</strong></li>
                <li>Escaneie o QR Code acima</li>
            </ol>
        </div>
        
        <p class="auto-refresh">🔄 Esta página atualiza automaticamente a cada 5 segundos</p>
    </div>
</body>
</html>
            `);
        } catch (error) {
            res.status(500).send('Erro ao gerar QR code: ' + error.message);
        }
    } else {
        res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code - iMavyBot WhatsApp</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 500px;
        }
        h1 { color: #333; margin-bottom: 20px; }
        p { color: #666; }
    </style>
    <script>
        setTimeout(() => location.reload(), 3000);
    </script>
</head>
<body>
    <div class="container">
        <h1>⏳ Aguardando QR Code...</h1>
        <p>O bot está iniciando. Esta página será atualizada automaticamente.</p>
    </div>
</body>
</html>
        `);
    }
});

// Rota API para obter o QR code como JSON
app.get('/api/qrcode', (req, res) => {
    res.json({
        qr: currentQR,
        status: connectionStatus,
        hasQR: !!currentQR
    });
});

// Rota API para atualizar o QR code (usada pelo bot)
app.post('/api/qrcode', express.json(), (req, res) => {
    currentQR = req.body.qr || null;
    connectionStatus = req.body.status || 'disconnected';
    res.json({ success: true });
});

// Rota de status
app.get('/api/status', (req, res) => {
    res.json({
        status: connectionStatus,
        hasQR: !!currentQR
    });
});

// Inicia o servidor apenas se não estiver no Vercel
if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`🌐 Servidor web rodando em http://localhost:${PORT}`);
        console.log(`📱 Acesse para ver o QR code: http://localhost:${PORT}`);
    });
}

// Exporta funções para uso no index.js
export function setQRCode(qr) {
    currentQR = qr;
    connectionStatus = 'waiting';
    console.log('📱 QR Code atualizado no servidor web');
}

export function setConnectionStatus(status) {
    connectionStatus = status;
    console.log(`📡 Status atualizado: ${status}`);
}

export function getQRCode() {
    return currentQR;
}

export function getConnectionStatus() {
    return connectionStatus;
}

// Exporta o app para uso no Vercel como serverless function
export default app;

