// // services/orderService.ts

'use server';

 import { Order, OrderWithMaterial } from '../../models/Order';
 
 import { redirect } from 'next/navigation';

 import { isRedirectError } from "next/dist/client/components/redirect";

const API_URL = process.env.API_URL ?? '';
const MODULE = 'orders'; 

export const fetchOrders = async () => {

  const response = await fetch(`${API_URL}/${MODULE}`);
  const result: OrderWithMaterial[] = await response.json();

  return result;
};

export const fetchOrderById = async (id: String) => {

  const response = await fetch(`${API_URL}/${MODULE}/${id}`);
  const result = await response.json();

  return result;
};

export const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
  try {
      await fetch(`${API_URL}/${MODULE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
    
  } catch (error) {
    if (isRedirectError(error)) {
      console.error(error);
      throw error;
    }
    
  } finally {
    redirect('/orders');
  }
};

export const updateOrder = async (order: Order) => {
  try {

   await fetch(`${API_URL}/${MODULE}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
  
  } catch (error) {
    if (isRedirectError(error)) {
      console.error(error);
      throw error;
    }
    
  } finally {
    redirect('/orders');
  }

};

export const deleteOrder = async (id: number | undefined) => {
  
  try {

  await fetch(`${API_URL}/${MODULE}/${id}`, {
    method: 'DELETE',
  });

  } catch (error) {
    if (isRedirectError(error)) {
      console.error(error);
      throw error;
    }
    
  } 
};


