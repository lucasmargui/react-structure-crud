// Table.test.tsx

import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';

//Components
import Table from '../Table';

// Services
import { fetchOrders } from '@/app/lib/actions/ordersService';

// Models
import { OrderWithMaterial } from '@/app/models/Order';


// Mocking the fetchMaterials function
jest.mock('@/lib/actions/ordersService', () => ({
  fetchOrders: jest.fn(),
}));


const mockData: OrderWithMaterial[] = [
  { id: 1, material_id: 101, quantity: 50, order_date: new Date().toISOString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: 'Wood Panel' },
  { id: 2, material_id: 102, quantity: 30, order_date: new Date().toISOString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: 'Steel Rod' },
  { id: 3, material_id: 103, quantity: 100, order_date: new Date().toISOString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: 'Aluminum Sheet' },
  { id: 4, material_id: 104, quantity: 75, order_date: new Date().toISOString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: 'Glass Pane' },
  { id: 5, material_id: 105, quantity: 20, order_date: new Date().toISOString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: 'Plastic Tube' }
];



beforeEach(() => {
  jest.clearAllMocks();
});

describe('Table Component', () => {

  test('fetches data and renders it correctly', async () => {

    (fetchOrders as jest.Mock).mockResolvedValue(mockData);

    render(<Table />);

     await waitFor(() => {

      expect(screen.getByText('Wood Panel')).toBeInTheDocument(); // Verifica se o dado mockado foi exibido
      expect(screen.getByText('Steel Rod')).toBeInTheDocument(); // Verifica se o dado mockado foi exibido
      expect(screen.getByText('Aluminum Sheet')).toBeInTheDocument(); // Verifica se o dado mockado foi exibido
      expect(screen.getByText('Glass Pane')).toBeInTheDocument(); // Verifica se o dado mockado foi exibido
      expect(screen.getByText('Plastic Tube')).toBeInTheDocument(); // Verifica se o dado mockado foi exibido
    });
  });

  test('should display loading spinner while fetching data', async () => {


    (fetchOrders as jest.Mock).mockResolvedValueOnce(mockData);
  
    render(<Table />);
  
    expect(document.querySelector('.spinnerContainer')).toBeInTheDocument();
  
    await waitFor(() => expect(document.querySelector('.spinnerContainer')).not.toBeInTheDocument());
  });


  test('should filter data based on search input', async () => {
    (fetchOrders as jest.Mock).mockResolvedValueOnce(mockData);

    render(<Table />);

    // Esperar os dados serem carregados
    await waitFor(() => {
      expect(screen.getByText('Wood Panel')).toBeInTheDocument();
    });

    // Filtrar por "Material B"
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Steel Rod' },
    });

    // Verificar que apenas "Material B" está visível
    await waitFor(() => {
      expect(screen.queryByText('Wood Panel')).not.toBeInTheDocument();
      expect(screen.getByText('Steel Rod')).toBeInTheDocument();
    });
  });


});
