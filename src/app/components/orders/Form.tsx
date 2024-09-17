"use client";

// React Hooks
import { useState, useEffect, useRef } from 'react';

// Models
import { Order } from '@/app/models/Order';
import { Material } from '@/app/models/Material';

// Components
import LoadingSpinner from '@/app/components/LoadingSpinner';
import Notification from '@/app/components/Notification';

// Services
import { fetchOrderById, createOrder, updateOrder } from '@/app/lib/actions/ordersService';
import { fetchMaterials } from '@/app/lib/actions/materialsService';

// Transitions
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import transitionstyles from '@/app/components/Transition.module.css';



type NotificationType = 'info' | 'success' | 'error';

interface FormProps {
  id?: string;
}

const Form: React.FC<FormProps> = ({ id }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);
  const nodeRef = useRef(null);


  // Hook useEffect para carregar os dados
  useEffect(() => {

  // Função para inicializar os dados da ordem ou criar nova ordem
  const initializeFormData = async () => {
    try {
      const materialsResponse = await fetchMaterials();
      if (materialsResponse) setMaterials(materialsResponse);

      if (id) {
        const fetchedOrder = await fetchOrderById(id);
        if (fetchedOrder) setOrder(fetchedOrder);
      } else {
        setOrder({ material_id: 0, quantity: 0, order_date: '' });
      }
    } catch (error) {
      setNotification({ message: 'Error loading data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

    initializeFormData();
  }, [id]);

  // Função de validação do formulário
  const validateForm = () => {
    const formErrors: Record<string, string> = {};
    if (!order?.quantity) formErrors.quantity = 'Quantity is required';
    if (!order?.material_id) formErrors.material_id = 'Material is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Função para lidar com mudanças em inputs e selects
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (order) {
      setOrder({ ...order, [e.target.name]: e.target.value });
    }
  };

  // Função para envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !validateForm()) return;

    setLoading(true);

    try {
      if (id) {
        await updateOrder(order);
        setNotification({ message: 'Update success', type: 'info' });
      } else {
        await createOrder(order);
        setOrder({ material_id: 0, quantity: 0, order_date: '' });
        setNotification({ message: 'Created success', type: 'success' });
      }
    } catch (error) {
      setNotification({ message: 'Submission failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Função para formatação de datas (mantida fora do componente)
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10); // Formato YYYY-MM-DD
  };

  return (
    <section className="h-100 bg-dark">
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
      <TransitionGroup>
      <CSSTransition
        key={loading ? 'loading' : 'component'}
        timeout={300}
        nodeRef={nodeRef}
        unmountOnExit
        classNames={{
          enter: transitionstyles['fade-enter'],
          enterActive: transitionstyles['fade-enter-active'],
          exit: transitionstyles['fade-exit'],
          exitActive: transitionstyles['fade-exit-active'],
        }}
      >
          <div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="container py-5 h-100">
                <form onSubmit={handleSubmit} aria-label="order-form">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                      <div className="card card-registration my-4">
                        <div className="row g-0">
                          <div
                            className="col-xl-6 d-none d-xl-block"
                            style={{
                              backgroundImage: "url('https://fastly.picsum.photos/id/307/5000/3333.jpg?hmac=wQFGsFoqFNhjL7Vf3y12D-qiKGUAl-BuhTbFJthHH4I')",
                              backgroundRepeat: "repeat",
                              backgroundSize: "contain",
                              borderTopLeftRadius: ".25rem",
                              borderBottomLeftRadius: ".25rem",
                            }}
                          ></div>
                          <div className="col-xl-6">
                            <div className="card-body p-md-5 text-black">
                              <h3 className="mb-5 text-uppercase">{id ? 'Edit Order' : 'Add New Order'}</h3>

                              <div className="row">
                                <div className="col-md-6 mb-4">
                                  <label htmlFor="material_id" className="form-label">
                                    Material
                                  </label>
                                  <select
                                    id="material_id"
                                    name="material_id"
                                    value={order?.material_id}
                                    onChange={handleInputChange}
                                    
                                    className={`form-control ${errors.material_id ? 'is-invalid' : ''}`}

                                  >
                                    <option value="">Select a material</option>
                                    {materials.map((material) => (
                                      <option key={material.id} value={material.id}>
                                        {material.name} - {material.type} - ${material.price}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.material_id && <div className="text-danger">{errors.material_id}</div>}
                                </div>

                                <div className="col-md-6 mb-4">
                                  <label htmlFor="quantity" className="form-label">
                                    Quantity
                                  </label>
                                  <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={order?.quantity}
                                    onChange={handleInputChange}
                                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                  />
                                  {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6 mb-4">
                                  <label htmlFor="order_date" className="form-label">
                                    Order Date
                                  </label>
                                  <input
                                    type="date"
                                    id="order_date"
                                    name="order_date"
                                    value={order?.order_date ? formatDateForInput(order.order_date) : formatDateForInput(new Date().toString())}
                                    onChange={handleInputChange}
                                    className={`form-control ${errors.order_date ? 'is-invalid' : ''}`}
                                  />
                                  {errors.order_date && <div className="text-danger">{errors.order_date}</div>}
                                </div>
                              </div>

                              <div className="d-flex justify-content-end pt-3">
                                <button type="submit" className="btn btn-primary">
                                  {id ? 'Update' : 'Create'}
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
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </section>
  );
};

export default Form;