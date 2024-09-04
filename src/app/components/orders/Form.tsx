"use client"

import { useState, useEffect } from 'react';
import { Order } from '@/models/Order';
import LoadingSpinner from '@/app/components/LoadingSpinner';


import { fetchOrderById, createOrder, updateOrder } from '@/lib/actions/ordersService';

import { fetchMaterials} from '@/lib/actions/materialsService';

import { CSSTransition, TransitionGroup } from 'react-transition-group';


import styles from './Form.module.css';
import { Material } from '@/models/Material';

interface FormProps {
    id?: String; 
  }


const Form: React.FC<FormProps> = ({ id }) => {

  const [order, setOrder] = useState<Order | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isNew, setIsNew] = useState<boolean>(!id);


  const formatDateForInput = (isoDate : string | undefined) => {

      const isoDateBase = isoDate ?? new Date().toISOString();

      const date = new Date(isoDateBase);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;

  } 

  useEffect(() => {

    

    const populateSelect = async () => {

      const response = await fetchMaterials();
      if (response) setMaterials(response);
    }

    populateSelect();

    if (id && !isNew) {
      const getOrder = async () => {
        const orderSearchById = await fetchOrderById(id);
    
       
       
        if (orderSearchById) setOrder(orderSearchById);
        setLoading(!loading)
      };
      getOrder();
    } else {
      setOrder({
        material_id: 0,
        quantity: 0,
        order_date: '',
      }
    
    );
    setLoading(!loading)
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (order) {
      setOrder({
        ...order,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (order) {
      setOrder({
        ...order,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (order) {
      if (isNew) {

        setLoading(!loading);

        await createOrder(order);
        
      } else {

        setLoading(!loading);

        await updateOrder(order);

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
                        <h3 className="mb-5 text-uppercase">{isNew ? 'Add New Order' : 'Edit Order'}</h3>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <label htmlFor="name" className="form-label">material_id</label>
                            <select
                              id="material_id"
                              name="material_id"
                              value={order?.material_id}
                              onChange={handleSelectChange}
                              required
                              className="form-control form-control-lg"
                            >
                              <option value="">Select a material</option>
                              {materials.map(material => (
                                <option key={material.id} value={material.id}  >
                                  {material.name} - {material.type} - ${material.price}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="type" className="form-label">quantity</label>
                            <input
                              type="int"
                              id="quantity"
                              name="quantity"
                              value={order?.quantity}
                              onChange={handleChange}
                              placeholder="quantity"
                              required
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <label htmlFor="description" className="form-label">order_date</label>
                            <input
                              type="date"
                              id="order_date"
                              name="order_date"
                              value={formatDateForInput(order?.order_date)}
                              onChange={handleChange}
                              placeholder="order_date"
                              required
                              className="form-control form-control-lg"
                            />
                          </div>
                          
                        </div>

                        <div className="d-flex justify-content-end pt-3">
                          <button type="button" onClick={handleSubmit} className="btn btn-primary">
                            {order?.id ? 'Update' : 'Create'}
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
