export interface Material {
    id?: number;
    name: string;
    type: string;
    description: string;
    thickness: number;
    width: number;
    height: number;
    color: string;
    manufacturer: string;
    manufacturer_code: string;
    price: number;
    created_at?: Date;
    updated_at?: Date;
  }