import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, message, timestamp } = body;

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 });
    }

    const n8nResponse = await fetch('https://paneln8n.koalavirtual.com/webhook/67dddac6-c538-4d9a-81a0-957c34012dfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message, timestamp }),
    });

    if (!n8nResponse.ok) {
      return NextResponse.json({ error: 'Error de respuesta desde el servidor n8n' }, { status: 502 });
    }

    const data = await n8nResponse.json();
    // Ajustar según el formato exacto que devuelva tu nodo de n8n (se asume { reply: '...' })
    return NextResponse.json({ reply: data.reply || data.output || '' });
  } catch (error) {
    console.error('Error en API Proxy:', error);
    return NextResponse.json({ error: 'Error interno del servidor proxy' }, { status: 500 });
  }
}
