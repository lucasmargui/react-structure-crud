// Table.test.tsx

import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Table from './Table';
import { fetchMaterials } from '@/lib/actions/materialsService';

import { Material } from '@/models/Material';

// Mocking the fetchMaterials function
jest.mock('@/lib/actions/materialsService', () => ({
  fetchMaterials: jest.fn(),
}));


const mockData: Material[] = [
  { id: 1, name: 'Material A', type: 'Type A', description: 'Description A', thickness: 10, width: 20, height: 30, color: 'Red', manufacturer: 'Manufacturer A', manufacturer_code: 'A001', price: 100, created_at: new Date(), updated_at: new Date() }, 
  { id: 2, name: 'Material B', type: 'Type B', description: 'Description B', thickness: 15, width: 25, height: 35, color: 'Blue', manufacturer: 'Manufacturer B', manufacturer_code: 'B002', price: 150, created_at: new Date(), updated_at: new Date() }
];


beforeEach(() => {
  jest.clearAllMocks();
});

describe('Table Component', () => {

  test('fetches data and renders it correctly', async () => {

    (fetchMaterials as jest.Mock).mockResolvedValue(mockData);

    render(<Table />);

     await waitFor(() => {

      expect(screen.getByText('Material A')).toBeInTheDocument(); // Verifica se o dado mockado foi exibido
      expect(screen.getByText('Material B')).toBeInTheDocument(); // Verifica se o dado mockado foi exibido
    });
  });

  test('should display loading spinner while fetching data', async () => {


    (fetchMaterials as jest.Mock).mockResolvedValueOnce(mockData);
  
    render(<Table />);
  
    expect(document.querySelector('.spinnerContainer')).toBeInTheDocument();
  
    await waitFor(() => expect(document.querySelector('.spinnerContainer')).not.toBeInTheDocument());
  });


  test('should filter data based on search input', async () => {
    (fetchMaterials as jest.Mock).mockResolvedValueOnce(mockData);

    render(<Table />);

    // Esperar os dados serem carregados
    await waitFor(() => {
      expect(screen.getByText('Material A')).toBeInTheDocument();
    });

    // Filtrar por "Material B"
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Material B' },
    });

    // Verificar que apenas "Material B" está visível
    await waitFor(() => {
      expect(screen.queryByText('Material A')).not.toBeInTheDocument();
      expect(screen.getByText('Material B')).toBeInTheDocument();
    });
  });


});
