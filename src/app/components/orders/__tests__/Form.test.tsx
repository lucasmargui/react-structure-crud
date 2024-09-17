import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '@/app/components/orders/Form'; // Ajuste o caminho conforme necessário
import { fetchMaterials } from '@/app/lib/actions/materialsService';
import { Material } from '@/app/models/Material';

// Mocking the service functions
jest.mock('@/lib/actions/materialsService', () => ({
  fetchMaterials: jest.fn(),
}));

const handleOnSubmitMock = jest.fn();


// Mock data
const mockMaterials: Material[] = [
  { id: 1, name: 'Material A', type: 'Type A', description: 'Description A', thickness: 10, width: 20, height: 30, color: 'Red', manufacturer: 'Manufacturer A', manufacturer_code: 'A001', price: 100, created_at: new Date(), updated_at: new Date() },
  { id: 2, name: 'Material B', type: 'Type B', description: 'Description B', thickness: 15, width: 25, height: 35, color: 'Blue', manufacturer: 'Manufacturer B', manufacturer_code: 'B002', price: 150, created_at: new Date(), updated_at: new Date() }
];

// Render functions
const renderFormUpdate = () => render(<Form id='1' />);
const renderFormCreate = () => render(<Form />);


// Loading State 
// Initial rendering of the form
// Fetch Data
// Validation of Required Fields
// Validation of Empty Fields
// User interaction
// Submit state 


describe('Form Component', () => {
  beforeEach(() => {
    (fetchMaterials as jest.Mock).mockResolvedValue(mockMaterials);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });




// Loading State 

it('renders loading create spinner initially', async () => {
  renderFormCreate();
  expect(document.querySelector('.spinnerContainer')).toBeInTheDocument();
  await waitFor(() => expect(document.querySelector('.spinnerContainer')).not.toBeInTheDocument());
});


// Initial rendering of the form


it('initial create rendering of the form', async () => {

  renderFormCreate();

  await waitFor(() => {

    const materialInput = screen.getByLabelText(/material/i) as HTMLInputElement;
    const quantityInput = screen.getByLabelText(/quantity/i) as HTMLInputElement;
    const createButton = screen.getByText(/Create/i) as HTMLButtonElement;

    expect(materialInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();

  });


});


// Fetch Data

  it('renders form with materials', async () => {
    renderFormCreate();

    await waitFor(() => {
      mockMaterials.forEach(material => {
        expect(screen.getByText(`${material.name} - ${material.type} - $${material.price}`)).toBeInTheDocument();
      });
    });
  });


// Validation of Required Fields


it('should display create error messages when required fields are missing', async () => {
  renderFormCreate();

  await waitFor(() => {
    screen.getByRole("form", { name: "order-form" }).onsubmit = handleOnSubmitMock;
    const createButton = screen.getByText(/Create/i) as HTMLButtonElement;
    fireEvent.click(createButton);

  });

  await waitFor(() => {
    expect(screen.getByText(/Quantity is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Material is required/i)).toBeInTheDocument();
  });

});



  // User Interaction


  it('should interact with dropdown and input fields', async () => {

    renderFormCreate();

    await waitFor(() => {

        const materialInput = screen.getByLabelText('Material') as HTMLInputElement;
        const quantityInput = screen.getByLabelText('Quantity') as HTMLInputElement;

        fireEvent.change(materialInput, { target: { value: '1' } });
        fireEvent.change(quantityInput, { target: { value: '1' } });

        expect(materialInput.value).toBe('1');
        expect(quantityInput.value).toBe('1');

    });



  });


  // Submit State

  it('submits a create form', async () => {

    renderFormCreate();

    await waitFor(() => {

        screen.getByRole("form", { name: "order-form" }).onsubmit = handleOnSubmitMock;

        const materialInput = screen.getByLabelText('Material') as HTMLInputElement;
        const quantityInput = screen.getByLabelText('Quantity') as HTMLInputElement;

        fireEvent.change(materialInput, { target: { value: '1' } });
        fireEvent.change(quantityInput, { target: { value: '1' } });

        expect(materialInput.value).toBe('1');
        expect(quantityInput.value).toBe('1');

        
        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        

    });

    expect(screen.getByText(/Created success/i)).toBeInTheDocument();

    // screen.debug()

  });


});
