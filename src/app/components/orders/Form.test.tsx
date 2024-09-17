import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Form from '@/app/components/orders/Form'; // Ajuste o caminho conforme necessário
import { fetchOrderById, createOrder, updateOrder } from '@/lib/actions/ordersService';
import { fetchMaterials } from '@/lib/actions/materialsService';


import { Material } from '@/models/Material';
import { Order } from '@/models/Order';

// Mocking the service functions
jest.mock('@/lib/actions/materialsService', () => ({
  fetchMaterials: jest.fn(),
}));

jest.mock('@/lib/actions/ordersService', () => ({
  fetchOrderById: jest.fn(),
  createOrder: jest.fn(),
  updateOrder: jest.fn(),
}));


const mockData: Material[] = [
  { id: 1, name: 'Material A', type: 'Type A', description: 'Description A', thickness: 10, width: 20, height: 30, color: 'Red', manufacturer: 'Manufacturer A', manufacturer_code: 'A001', price: 100, created_at: new Date(), updated_at: new Date() }, 
  { id: 2, name: 'Material B', type: 'Type B', description: 'Description B', thickness: 15, width: 25, height: 35, color: 'Blue', manufacturer: 'Manufacturer B', manufacturer_code: 'B002', price: 150, created_at: new Date(), updated_at: new Date() }
];

const mockDataUpdate: Order = { material_id: 1,quantity: 1, order_date: '2023-09-15' };


const id: string = '1';

const renderComponent = () => { return  render(<Form id={id} />); };

const handleOnSubmitMock = jest.fn();

describe('Form Component', () => {

  beforeEach(() => {

    (fetchMaterials as jest.Mock).mockResolvedValue(mockData);
    (updateOrder as jest.Mock).mockResolvedValue(mockDataUpdate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  it("does not submit an empty form", async () => {

    renderComponent();

    await waitFor(async () => { 

      screen.getByRole("form", { name: "order-form" }).onsubmit = handleOnSubmitMock;

      // Submit the empty form
      fireEvent.click(screen.getByRole('button', { name: /update/i }) );
 
      // Expectations for form submission
      expect(handleOnSubmitMock).not.toHaveBeenCalled();

    })
    
  });


  it("submit an form", async () => {
    
    renderComponent();

    await waitFor(async () => { 

      screen.getByRole("form", { name: "order-form" }).onsubmit = handleOnSubmitMock;
      

      const materialInput = screen.getByRole("form", { name: "order-form" }).querySelector('#material_id') as HTMLInputElement;
      const quantityInput = screen.getByRole("form", { name: "order-form" }).querySelector('#quantity') as HTMLInputElement;
      
      fireEvent.change(materialInput, { target: { value: 1 } });
      fireEvent.change(quantityInput, { target: { value: 1 } });

      expect(materialInput.value).toBe('1');
      expect(quantityInput.value).toBe('1');
      // Submit the empty form
      fireEvent.click(screen.getByRole('button', { name: /update/i }) );
 
      // Expectations for form submission
      expect(handleOnSubmitMock).toHaveBeenCalled();

    })
    
  });

 

  // test('renders loading spinner initially', async () => {
  //   render(<Form />);

  //   expect(document.querySelector('.spinnerContainer')).toBeInTheDocument();

  //   await waitFor(() => expect(screen.queryByTestId('.spinnerContainer')).not.toBeInTheDocument());
  // });

  // test('renders form with materials', async () => {
  //   render(<Form />);

  //   await waitFor(() => {
  //       mockData.forEach((material) => {
  //       expect(screen.getByText(`${material.name} - ${material.type} - $${material.price}`)).toBeInTheDocument();
  //     });
  //   });
  // });

  // test('show create button', async () => {
  //   render(<Form />);

  //   await waitFor(() => {
  //     const createButton = screen.getByText(/Create/i);
  //     expect(createButton).toBeInTheDocument();
  //   });
  
  // });


  // test('show update button', async () => {

  //   const id: string = '1';

  //   render(<Form id={id} />);

  //   await waitFor(() => {
  //     const updateButton = screen.getByText(/Update/i);
  //     expect(updateButton).toBeInTheDocument();
  //   });
  
  // });

  // test('submits form and creates new order', async () => {
   
  //   // Use waitFor para garantir que os elementos estejam disponíveis na tela
  //   await waitFor(async () => {

  //     const materialInput = screen.getByTestId('form').querySelector('#material_id') as HTMLInputElement;
  //     const quantityInput = screen.getByTestId('form').querySelector('#quantity') as HTMLInputElement;
  //     const orderDateInput = screen.getByTestId('form').querySelector('#order_date') as HTMLInputElement;
      
  //     fireEvent.change(materialInput, { target: { value: 1 } });
  //     fireEvent.change(quantityInput, { target: { value: 1 } });

  //     expect(materialInput.value).toBe('1');
  //     expect(quantityInput.value).toBe('1');

  //   });

  //   // const submitButton = screen.getByRole('button', { name: /update/i });

  //   // expect(submitButton).toBeInTheDocument();

  //   //  // Simule o clique no botão de submissão
  //   // await act(async () => {
  //   //   fireEvent.click(submitButton);
  //   // });

  //   // // Verifique se a função de atualização foi chamada
  //   // expect(updateOrder).toHaveBeenCalled();
    


  // });


//   test('loads existing order and updates it', async () => {
//     const mockOrder = { id: 1, material_id: 2, quantity: 10, order_date: '2023-09-10' };
//     (fetchOrderById as jest.Mock).mockResolvedValueOnce(mockOrder);
//     render(<Form id="1" />);

//     await waitFor(() => {
//       expect(screen.getByDisplayValue('10')).toBeInTheDocument();
//       expect(screen.getByDisplayValue('2023-09-10')).toBeInTheDocument();
//     });

//     fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '15' } });
//     fireEvent.click(screen.getByText(/Update/i));

//     await waitFor(() => expect(updateOrder).toHaveBeenCalledWith({
//       ...mockOrder,
//       quantity: 15,
//     }));

//     expect(screen.getByText('Update success')).toBeInTheDocument();
//   });

//   test('shows error notification if submission fails', async () => {
//     (createOrder as jest.Mock).mockRejectedValueOnce(new Error('Submission failed'));
//     render(<Form id={undefined} />);

//     fireEvent.change(screen.getByLabelText(/Material/i), { target: { value: '1' } });
//     fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '5' } });
//     fireEvent.change(screen.getByLabelText(/Order Date/i), { target: { value: '2023-09-15' } });

//     fireEvent.click(screen.getByText(/Create/i));

//     await waitFor(() => expect(createOrder).toHaveBeenCalled());

//     expect(screen.getByText('Submission failed')).toBeInTheDocument();
//   });
});
