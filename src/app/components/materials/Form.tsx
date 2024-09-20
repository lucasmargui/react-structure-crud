"use client"

// React Hooks
import { useState, useEffect, useRef } from 'react';

// Models
import { Material } from '@/app/models/Material';

// Components
import LoadingSpinner from '@/app/components/LoadingSpinner';
import Notification from '@/app/components/Notification';

// Services
import { fetchMaterialById, createMaterial, updateMaterial } from '@/app/lib/actions/materialsService';


type NotificationType = 'info' | 'success' | 'error';

interface FormProps {
    id?: String; 
  }


const Form: React.FC<FormProps> = ({ id }) => {

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);
  const nodeRef = useRef(null);



  useEffect(() => {

    const initializeFormData = async () => {
      try {
        if (id) {
          const materialSearchById = await fetchMaterialById(id);
          if (materialSearchById) setMaterial(materialSearchById); 
        } else {
          setMaterial({
            name: '',
            type: '',
            description: '',
            thickness: 0,
            width: 0,
            height: 0,
            color: '',
            manufacturer: '',
            manufacturer_code: '',
            price: 0,
          }
        );
        }
      } catch (error) {
        setNotification({ message: 'Error loading data', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
  
    initializeFormData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (material) {
      validateForm();
      setMaterial({
        ...material,
        [e.target.name]: e.target.value,
      });
    }
  };


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!material || !validateForm()) return;
  
      setLoading(true);
  
      try {
        if (id) {
          await updateMaterial(material);
          setNotification({ message: 'Update success', type: 'info' });
        } else {
          await createMaterial(material);
          setMaterial({
            name: '',
            type: '',
            description: '',
            thickness: 0,
            width: 0,
            height: 0,
            color: '',
            manufacturer: '',
            manufacturer_code: '',
            price: 0,
          });
          setNotification({ message: 'Created success', type: 'success' });
        }
      } catch (error) {
        setNotification({ message: 'Submission failed', type: 'error' });
      } finally {
        setLoading(false);
      }
    };


const validateForm = () => {

  let formErrors: { [key: string]: string } = {};
  
  if (!material?.name) formErrors.name = "Name is required";
  if (!material?.type) formErrors.type = "Type is required";
  if (!material?.description) formErrors.description = "Description is required";
  if (!material?.thickness) formErrors.thickness = "Thickness is required and must be a number";
  if (!material?.width) formErrors.width = "Width is required and must be a number";
  if (!material?.height) formErrors.height = "Height is required and must be a number";
  if (!material?.color) formErrors.color = "Color is required";
  if (!material?.manufacturer) formErrors.manufacturer = "Manufacturer is required";
  if (!material?.manufacturer_code) formErrors.manufacturer_code = "Manufacturer Code is required";
  if (!material?.price) formErrors.price = "Price is required and must be a number";

  setErrors(formErrors);
  return Object.keys(formErrors).length === 0; // Returns true if no errors
};



  return (
    <section className="h-100 bg-dark">

    {notification && (
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
    )}

    <div>
      {loading ? ( 
          <LoadingSpinner /> 
        ) : (
          <div className="container py-5 h-100" ref={nodeRef}>
            <form onSubmit={handleSubmit}  aria-label="material-form" >
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col">
                  <div className="card card-registration my-4">
                    <div className="row g-0">
                      <div className="col-xl-6 d-none d-xl-block" style={{ 
                        backgroundImage: "url('https://fastly.picsum.photos/id/307/5000/3333.jpg?hmac=wQFGsFoqFNhjL7Vf3y12D-qiKGUAl-BuhTbFJthHH4I')", 
                        backgroundRepeat: "repeat", 
                        backgroundSize: "contain", 
                        borderTopLeftRadius: ".25rem", 
                        borderBottomLeftRadius: ".25rem" 
                      }}>
                      
                      </div>
                      <div className="col-xl-6">
                        <div className="card-body p-md-5 text-black">
                          <h3 className="mb-5 text-uppercase">{!id ? 'Add New Material' : 'Edit Material'}</h3>

                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <label htmlFor="name" className="form-label">Name</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={material?.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>
                            <div className="col-md-6 mb-4">
                              <label htmlFor="type" className="form-label">Type</label>
                              <input
                                type="text"
                                id="type"
                                name="type"
                                value={material?.type}
                                onChange={handleInputChange}
                                placeholder="Type"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.type && <div className="text-danger">{errors.type}</div>}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <label htmlFor="description" className="form-label">Description</label>
                              <input
                                type="text"
                                id="description"
                                name="description"
                                value={material?.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.description && <div className="text-danger">{errors.description}</div>}
                            </div>
                            <div className="col-md-6 mb-4">
                              <label htmlFor="thickness" className="form-label">Thickness</label>
                              <input
                                type="number"
                                id="thickness"
                                name="thickness"
                                value={material?.thickness}
                                onChange={handleInputChange}
                                placeholder="Thickness"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.thickness && <div className="text-danger">{errors.thickness}</div>}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <label htmlFor="width" className="form-label">Width</label>
                              <input
                                type="number"
                                id="width"
                                name="width"
                                value={material?.width}
                                onChange={handleInputChange}
                                placeholder="Width"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.width && <div className="text-danger">{errors.width}</div>}
                            </div>
                            <div className="col-md-6 mb-4">
                              <label htmlFor="height" className="form-label">Height</label>
                              <input
                                type="number"
                                id="height"
                                name="height"
                                value={material?.height}
                                onChange={handleInputChange}
                                placeholder="Height"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.height && <div className="text-danger">{errors.height}</div>}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <label htmlFor="color" className="form-label">Color</label>
                              <input
                                type="text"
                                id="color"
                                name="color"
                                value={material?.color}
                                onChange={handleInputChange}
                                placeholder="Color"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.color && <div className="text-danger">{errors.color}</div>}
                            </div>
                            <div className="col-md-6 mb-4">
                              <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                              <input
                                type="text"
                                id="manufacturer"
                                name="manufacturer"
                                value={material?.manufacturer}
                                onChange={handleInputChange}
                                placeholder="Manufacturer"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.manufacturer && <div className="text-danger">{errors.manufacturer}</div>}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <label htmlFor="manufacturer_code" className="form-label">Manufacturer Code</label>
                              <input
                                type="text"
                                id="manufacturer_code"
                                name="manufacturer_code"
                                value={material?.manufacturer_code}
                                onChange={handleInputChange}
                                placeholder="Manufacturer Code"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.manufacturer_code && <div className="text-danger">{errors.manufacturer_code}</div>}
                            </div>
                            <div className="col-md-6 mb-4">
                              <label htmlFor="price" className="form-label">Price</label>
                              <input
                                type="number"
                                id="price"
                                name="price"
                                value={material?.price}
                                onChange={handleInputChange}
                                placeholder="Price"
                                required
                                className="form-control form-control-lg"
                              />
                              {errors.price && <div className="text-danger">{errors.price}</div>}
                            </div>
                          </div>

                          <div className="d-flex justify-content-end pt-3">
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">
                              {material?.id ? 'Update' : 'Create'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </form>
          </div>
         )
        }
      </div>

  </section>

  
  );
};

export default Form;
