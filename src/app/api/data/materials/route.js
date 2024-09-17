import { NextResponse } from 'next/server';
import { getDbConnection } from '@/app/lib/db'; // Ajuste o caminho conforme necessário

// Função para consultar todos os materiais
export async function GET() {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query('SELECT * FROM materials');
    await connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Função para inserir um novo material
export async function POST(req) {
  try {
    const { name, type, description, thickness, width, height, color, manufacturer, manufacturer_code, price } = await req.json();
    const connection = await getDbConnection();
    const [result] = await connection.query(
      'INSERT INTO materials (name, type, description, thickness, width, height, color, manufacturer, manufacturer_code, price, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
      [name, type, description, thickness, width, height, color, manufacturer, manufacturer_code, price]
    );
    await connection.end();
    return NextResponse.json({ id: result.insertId, name, type, description, thickness, width, height, color, manufacturer, manufacturer_code, price }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// Função para atualizar um material existente
export async function PUT(req) {
  try {
    const { id, name, type, description, thickness, width, height, color, manufacturer, manufacturer_code, price, created_at } = await req.json();
    const connection = await getDbConnection();
    const [result] = await connection.query(
      'UPDATE materials SET name = ?, type = ?, description = ?, thickness = ?, width = ?, height = ?, color = ?, manufacturer = ?, manufacturer_code = ?, price = ?, created_at = ?, updated_at = NOW() WHERE id = ?',
      [name, type, description, thickness, width, height, color, manufacturer, manufacturer_code, price, created_at, id]
    );
    await connection.end();
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }
    return NextResponse.json({ id, name, type, description, thickness, width, height, color, manufacturer, manufacturer_code, price, created_at });
  } catch (error) {
      console.log(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



