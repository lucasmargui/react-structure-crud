import { NextResponse } from 'next/server';
import { getDbConnection } from '@/app/lib/db'; // Ajuste o caminho conforme necessário

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const connection = await getDbConnection();
    const [rows] = await connection.query('SELECT * FROM materials WHERE id = ?', [id]);
    await connection.end();
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

  
  // Função para deletar um material pelo ID
  export async function DELETE(req, { params }) {
    try {

      const { id } = params; 
    
      const connection = await getDbConnection();
      const [result] = await connection.query('DELETE FROM materials WHERE id = ?', [id]);
      await connection.end();
      if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Material not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Material deleted successfully' }, { status: 200 });
    } catch (error) {
        
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
