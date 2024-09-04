import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db'; // Ajuste o caminho conforme necessário

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const connection = await getDbConnection();
    const [rows] = await connection.query('SELECT * FROM orders WHERE id = ?', [id]);
    await connection.end();
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
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
  
  
  // Função para deletar um material pelo ID
  export async function DELETE(req, { params }) {
    try {

      const { id } = params; 
    
      const connection = await getDbConnection();
      const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [id]);
      await connection.end();
      if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 });
    } catch (error) {
        
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
