// // services/materialService.ts

'use server';

 import { Material } from '../../models/Material';
 
 import { redirect } from 'next/navigation';

 import { isRedirectError } from "next/dist/client/components/redirect";

const API_URL = process.env.API_URL ?? '';
const MODULE = 'materials';

export const fetchMaterials = async () => {

  const response = await fetch(`${API_URL}/${MODULE}`);
  const result: Material[] = await response.json();

  return result;
};

export const fetchMaterialById = async (id: String) => {

  const response = await fetch(`${API_URL}/${MODULE}/${id}`);
  const result = await response.json();

  return result;
};

export const createMaterial = async (material: Omit<Material, 'id' | 'created_at' | 'updated_at'>) => {
  try {
      await fetch(`${API_URL}/${MODULE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(material),
      });
    
  } catch (error) {
    if (isRedirectError(error)) {
      console.error(error);
      throw error;
    }
  
  }
  // } finally {
  //   redirect('/materials');
  // }
};

export const updateMaterial = async (material: Material) => {
  try {

   await fetch(`${API_URL}/${MODULE}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(material),
    });
  
  } catch (error) {
    if (isRedirectError(error)) {
      console.error(error);
      throw error;
    }
    
  } 
  // finally {
  //   redirect('/materials');
  // }

};

export const deleteMaterial = async (id: number | undefined) => {
  
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


