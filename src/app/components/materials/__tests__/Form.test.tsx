import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '@/app/components/materials/Form'; // Ajuste o caminho conforme necessário


const handleOnSubmitMock = jest.fn();

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

  afterEach(() => {
    jest.clearAllMocks();
  });




// Loading State 

it('renders loading create spinner initially', async () => {
  renderFormCreate();
  await waitFor(() => expect(document.querySelector('.spinnerContainer')).not.toBeInTheDocument());
});


// Initial rendering of the form

it('initial create rendering of the form', async () => {

  renderFormCreate();

  await waitFor(() => {

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const typeInput = screen.getByLabelText(/type/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/description/i) as HTMLInputElement;
    const thicknessInput = screen.getByLabelText(/thickness/i) as HTMLInputElement;
    const widthInput = screen.getByLabelText(/width/i) as HTMLInputElement;
    const heightInput = screen.getByLabelText(/height/i) as HTMLInputElement;
    const colorInput = screen.getByLabelText(/color/i) as HTMLInputElement;
    const manufacturerInput = screen.getByLabelText('Manufacturer', { selector: 'input#manufacturer' }) as HTMLInputElement;
    const manufacturerCodeInput = screen.getByLabelText('Manufacturer Code', { selector: 'input#manufacturer_code' }) as HTMLInputElement;
    const priceInput = screen.getByLabelText(/price/i) as HTMLInputElement;
    const createButton = screen.getByText(/create/i) as HTMLButtonElement;
  
    expect(nameInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(thicknessInput).toBeInTheDocument();
    expect(widthInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();
    expect(colorInput).toBeInTheDocument();
    expect(manufacturerInput).toBeInTheDocument();
    expect(manufacturerCodeInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();

  });


});


// Validation of Required Fields


it('should display create error messages when required fields are missing', async () => {
  renderFormCreate();

  await waitFor(() => {
    screen.getByRole("form", { name: "material-form" }).onsubmit = handleOnSubmitMock;
    const createButton = screen.getByText(/Create/i) as HTMLButtonElement;
    fireEvent.click(createButton);

  });

  await waitFor(() => {
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Type is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Thickness is required and must be a number/i)).toBeInTheDocument();
    expect(screen.getByText(/Width is required and must be a number/i)).toBeInTheDocument();
    expect(screen.getByText(/Height is required and must be a number/i)).toBeInTheDocument();
    expect(screen.getByText(/Color is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Manufacturer is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Manufacturer Code is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Price is required and must be a number/i)).toBeInTheDocument();
    
  });

});

// User Interaction

it('should interact with dropdown and input fields', async () => {

  renderFormCreate();

  await waitFor(() => {

        // Obtém os elementos de input
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const typeInput = screen.getByLabelText(/type/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/description/i) as HTMLInputElement;
    const thicknessInput = screen.getByLabelText(/thickness/i) as HTMLInputElement;
    const widthInput = screen.getByLabelText(/width/i) as HTMLInputElement;
    const heightInput = screen.getByLabelText(/height/i) as HTMLInputElement;
    const colorInput = screen.getByLabelText(/color/i) as HTMLInputElement;
    const manufacturerInput = screen.getByLabelText('Manufacturer', { selector: 'input#manufacturer' }) as HTMLInputElement;
    const manufacturerCodeInput = screen.getByLabelText('Manufacturer Code', { selector: 'input#manufacturer_code' }) as HTMLInputElement;
    const priceInput = screen.getByLabelText(/price/i) as HTMLInputElement;

    // Simula mudanças nos valores dos inputs
    fireEvent.change(nameInput, { target: { value: 'Material Name' } });
    fireEvent.change(typeInput, { target: { value: 'Wood' } });
    fireEvent.change(descriptionInput, { target: { value: 'High-quality wood material' } });
    fireEvent.change(thicknessInput, { target: { value: '5' } });
    fireEvent.change(widthInput, { target: { value: '200' } });
    fireEvent.change(heightInput, { target: { value: '300' } });
    fireEvent.change(colorInput, { target: { value: 'Brown' } });
    fireEvent.change(manufacturerInput, { target: { value: 'WoodCorp' } });
    fireEvent.change(manufacturerCodeInput, { target: { value: 'WC123' } });
    fireEvent.change(priceInput, { target: { value: '100' } });

    // Verifica se os valores foram corretamente atualizados
    expect(nameInput.value).toBe('Material Name');
    expect(typeInput.value).toBe('Wood');
    expect(descriptionInput.value).toBe('High-quality wood material');
    expect(thicknessInput.value).toBe('5');
    expect(widthInput.value).toBe('200');
    expect(heightInput.value).toBe('300');
    expect(colorInput.value).toBe('Brown');
    expect(manufacturerInput.value).toBe('WoodCorp');
    expect(manufacturerCodeInput.value).toBe('WC123');
    expect(priceInput.value).toBe('100');

  });



});


  // Submit State

  it('submits a create form', async () => {

    renderFormCreate();

    await waitFor(() => {

        screen.getByRole("form", { name: "material-form" }).onsubmit = handleOnSubmitMock;

        // Obtém os elementos de input
        const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
        const typeInput = screen.getByLabelText(/type/i) as HTMLInputElement;
        const descriptionInput = screen.getByLabelText(/description/i) as HTMLInputElement;
        const thicknessInput = screen.getByLabelText(/thickness/i) as HTMLInputElement;
        const widthInput = screen.getByLabelText(/width/i) as HTMLInputElement;
        const heightInput = screen.getByLabelText(/height/i) as HTMLInputElement;
        const colorInput = screen.getByLabelText(/color/i) as HTMLInputElement;
        const manufacturerInput = screen.getByLabelText('Manufacturer', { selector: 'input#manufacturer' }) as HTMLInputElement;
        const manufacturerCodeInput = screen.getByLabelText('Manufacturer Code', { selector: 'input#manufacturer_code' }) as HTMLInputElement;
        const priceInput = screen.getByLabelText(/price/i) as HTMLInputElement;

        // Simula mudanças nos valores dos inputs
        fireEvent.change(nameInput, { target: { value: 'Material Name' } });
        fireEvent.change(typeInput, { target: { value: 'Wood' } });
        fireEvent.change(descriptionInput, { target: { value: 'High-quality wood material' } });
        fireEvent.change(thicknessInput, { target: { value: '5' } });
        fireEvent.change(widthInput, { target: { value: '200' } });
        fireEvent.change(heightInput, { target: { value: '300' } });
        fireEvent.change(colorInput, { target: { value: 'Brown' } });
        fireEvent.change(manufacturerInput, { target: { value: 'WoodCorp' } });
        fireEvent.change(manufacturerCodeInput, { target: { value: 'WC123' } });
        fireEvent.change(priceInput, { target: { value: '100' } });

        // Verifica se os valores foram corretamente atualizados
        expect(nameInput.value).toBe('Material Name');
        expect(typeInput.value).toBe('Wood');
        expect(descriptionInput.value).toBe('High-quality wood material');
        expect(thicknessInput.value).toBe('5');
        expect(widthInput.value).toBe('200');
        expect(heightInput.value).toBe('300');
        expect(colorInput.value).toBe('Brown');
        expect(manufacturerInput.value).toBe('WoodCorp');
        expect(manufacturerCodeInput.value).toBe('WC123');
        expect(priceInput.value).toBe('100');

        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        

    });


    expect(screen.getByText(/Created success/i)).toBeInTheDocument();
    
  });


});
