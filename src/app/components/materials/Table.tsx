"use client";

import React, { useState, useEffect } from 'react';
import { fetchMaterials } from '@/lib/actions/materialsService';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import transitionstyles from '@/app/components/Transition.module.css';
import { Material } from '@/models/Material';
import styles from './Table.module.css';
import DeleteButton from './DeleteButton';
import Button from '@/app/components/Button';
import DataTable from "react-data-table-component";

export default function Table() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "ID",
      selector: (row: Material) => row.id || 0,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Material) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: Material) => row.type,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Material) => row.description,
      sortable: false,
    },
    {
      name: "Thickness",
      selector: (row: Material) => row.thickness,
      sortable: true,
    },
    {
      name: "Width",
      selector: (row: Material) => row.width,
      sortable: true,
    },
    {
      name: "Height",
      selector: (row: Material) => row.height,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row: Material) => row.color,
      sortable: true,
    },
    {
      name: "Manufacturer",
      selector: (row: Material) => row.manufacturer,
      sortable: true,
    },
    {
      name: "Manufacturer Code",
      selector: (row: Material) => row.manufacturer_code,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Material) => row.price,
      sortable: true,
    },
    {
        name: "Price",
        selector: (row: Material) => row.price,
        sortable: true,
    },
    {
     name: "Actions",
      cell: (row: Material) => (
        <div> 
               <DeleteButton materialId={row.id}></DeleteButton>
               <Button text='Edit' href={`/materials/${row.id}/edit`} className='btn btn-sm btn-info me-2'></Button>
        </div>
      ),
    }
  ];

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMaterials();
      setMaterials(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition
        key={loading ? 'loading' : 'component'}
        timeout={300}
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
            <div className="mt-4">
             <DataTable columns={columns} data={materials} />
            </div>
          )}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
