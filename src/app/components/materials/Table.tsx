"use client";

// React
import React, { useState, useEffect, ChangeEvent, useRef  } from 'react';

// Services
import { fetchMaterials } from '@/app/lib/actions/materialsService';

// Components
import LoadingSpinner from '@/app/components/LoadingSpinner';
import DeleteButton from './DeleteButton';
import Button from '@/app/components/Button';
import DataTable from 'react-data-table-component';

// Transitions
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import transitionstyles from '@/app/components/Transition.module.css';

// Models
import { Material } from '@/app/models/Material';


export default function Table() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredData, setFilteredData] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>("");
  const nodeRef = useRef(null);

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
    // {
    //   name: "Color",
    //   selector: (row: Material) => row.color,
    //   sortable: true,
    // },
    // {
    //   name: "Manufacturer",
    //   selector: (row: Material) => row.manufacturer,
    //   sortable: true,
    // },
    // {
    //   name: "Manufacturer Code",
    //   selector: (row: Material) => row.manufacturer_code,
    //   sortable: true,
    // },
    // {
    //   name: "Price",
    //   selector: (row: Material) => row.price,
    //   sortable: true,
    // },
    // {
    //     name: "Price",
    //     selector: (row: Material) => row.price,
    //     sortable: true,
    // },
    {
     name: "",
      cell: (row: Material) => (
       <Button text='Edit' href={`/materials/${row.id}/edit`} className='btn btn-sm btn-info me-2'></Button>               
      ),
    },
    {
    name: "",
        cell: (row: Material) => (
        <DeleteButton materialId={row.id}></DeleteButton>              
        ),
        style: { width: '200px' },
    }
  ];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = materials.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMaterials();
      setMaterials(data);
      setFilteredData(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
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
        <div className="mt-4" ref={nodeRef}>
            
          {loading ? (
      
            <LoadingSpinner />
    
        
          ) : (
    
            <DataTable
                columns={columns}
                data={filteredData}
                subHeader
                subHeaderComponent={
                <input
                    type="text"
                    placeholder="Search..."
                    className="form-control"
                    value={searchText}
                    onChange={handleSearch}
                />
                }
                pagination
            />
          
          )}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
