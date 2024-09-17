export interface Order {
  id?: number;                
  material_id: number;       
  quantity: number;          
  order_date: string;       
  created_at?: string;       
  updated_at?: string;       
}


export interface OrderWithMaterial {
  id?: number;                
  material_id: number;       
  quantity: number;          
  order_date: string;        
  created_at?: string;     
  updated_at?: string;       
  // TABLE MATERIALS
  name: string;
}
