"use client"

import { useState, useEffect } from 'react';
import { Material } from '@/models/Material';
import LoadingSpinner from '@/app/components/LoadingSpinner';


import { fetchMaterialById, createMaterial, updateMaterial } from '@/lib/actions/materialsService';

import { CSSTransition, TransitionGroup } from 'react-transition-group';


import styles from './Form.module.css';

interface FormProps {
    id?: String; 
  }


const Form: React.FC<FormProps> = ({ id }) => {

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isNew, setIsNew] = useState<boolean>(!id);


  useEffect(() => {

    if (id && !isNew) {
      const getMaterial = async () => {
        const materialSearchById = await fetchMaterialById(id);
    
       
       
        if (materialSearchById) setMaterial(materialSearchById);
        setLoading(!loading)
      };
      getMaterial();
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
    setLoading(!loading)
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (material) {
      setMaterial({
        ...material,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (material) {
      if (isNew) {

        setLoading(!loading);

        await createMaterial(material);
        
      } else {

        setLoading(!loading);

        await updateMaterial(material);

      }

    }
  };

  return (
    <section className="h-100 bg-dark">
    <TransitionGroup>
    <CSSTransition
      key={loading ? 'loading' : 'component'}
      timeout={300}
      classNames={{
        enter: styles['fade-enter'],
        enterActive: styles['fade-enter-active'],
        exit: styles['fade-exit'],
        exitActive: styles['fade-exit-active'],
      }}
    >
      <div>
        {loading ? 

        <LoadingSpinner /> : 
        
        <form onSubmit={handleSubmit}>
          <div className="container py-5 h-100">
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
                        <h3 className="mb-5 text-uppercase">{isNew ? 'Add New Material' : 'Edit Material'}</h3>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={material?.name}
                              onChange={handleChange}
                              placeholder="Name"
                              required
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="type" className="form-label">Type</label>
                            <input
                              type="text"
                              id="type"
                              name="type"
                              value={material?.type}
                              onChange={handleChange}
                              placeholder="Type"
                              required
                              className="form-control form-control-lg"
                            />
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
                              onChange={handleChange}
                              placeholder="Description"
                              required
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="thickness" className="form-label">Thickness</label>
                            <input
                              type="number"
                              id="thickness"
                              name="thickness"
                              value={material?.thickness}
                              onChange={handleChange}
                              placeholder="Thickness"
                              required
                              className="form-control form-control-lg"
                            />
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
                              onChange={handleChange}
                              placeholder="Width"
                              required
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="height" className="form-label">Height</label>
                            <input
                              type="number"
                              id="height"
                              name="height"
                              value={material?.height}
                              onChange={handleChange}
                              placeholder="Height"
                              required
                              className="form-control form-control-lg"
                            />
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
                              onChange={handleChange}
                              placeholder="Color"
                              required
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                            <input
                              type="text"
                              id="manufacturer"
                              name="manufacturer"
                              value={material?.manufacturer}
                              onChange={handleChange}
                              placeholder="Manufacturer"
                              required
                              className="form-control form-control-lg"
                            />
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
                              onChange={handleChange}
                              placeholder="Manufacturer Code"
                              required
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                              type="number"
                              id="price"
                              name="price"
                              value={material?.price}
                              onChange={handleChange}
                              placeholder="Price"
                              required
                              className="form-control form-control-lg"
                            />
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
          </div>
      </form>
        }
      </div>
    </CSSTransition>
  </TransitionGroup>

  </section>

  
  );
};

export default Form;
