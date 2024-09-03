// src/app/materials/page.tsx

import { Material } from '../../models/Material'
import axios from 'axios';

import Button from '@/app/components/Button';
import Title from '@/app/components/materials/Title';
import Table from '@/app/components/materials/Table';

import styles from './page.module.css';

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 10;

  return (
    <div className={styles.main}>
      <Title />
      <Button text='Create Material' href={`/materials/create` } className='btn btn-success me-2'></Button>
      <Table query={query} currentPage={currentPage} />
    </div>
  );
};


