import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db'; // Ajuste o caminho conforme necessário

// Função para consultar todos os materiais
export async function GET() {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query('SELECT o.id, o.material_id, o.quantity, o.order_date, m.name FROM orders o JOIN materials m ON o.material_id = m.id');
    await connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



// Função para inserir um novo material
export async function POST(req) {
  try {
    const { material_id, quantity, order_date } = await req.json();
    const connection = await getDbConnection();
    const [result] = await connection.query(
      'INSERT INTO orders (material_id, quantity, order_date, created_at) VALUES (?, ?, ?, NOW())',
      [material_id, quantity, order_date]
    );
    await connection.end();
    return NextResponse.json({ id: result.insertId, material_id, quantity, order_date }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Função para atualizar um material existente
export async function PUT(req) {
  try {

    const { id, material_id, quantity, order_date, created_at } = await req.json();
    const connection = await getDbConnection();
    const [result] = await connection.query(
      'UPDATE orders SET material_id = ?, quantity = ?, order_date = ?, created_at = ?, updated_at = NOW() WHERE id = ?',
      [material_id, quantity, order_date, created_at, id]
    );
    await connection.end();
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ id, material_id, quantity, order_date, created_at });
  } catch (error) {
      console.log(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



