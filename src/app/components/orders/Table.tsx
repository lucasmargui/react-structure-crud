"use client"

// React
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';

// Services
import { fetchOrders } from '@/app/lib/actions/ordersService';

// Components
import LoadingSpinner from '@/app/components/LoadingSpinner';
import DeleteButton from './DeleteButton';
import Button from '@/app/components/Button';
import DataTable from 'react-data-table-component';

// Transitions
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import transitionstyles from '@/app/components/Transition.module.css';

// Models
import { OrderWithMaterial } from '@/app/models/Order';


export default function Table() {

  const [orders, setOrder] = useState<OrderWithMaterial[]>([]);
  const [filteredData, setFilteredData] = useState<OrderWithMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>("");
  const nodeRef = useRef(null);


  const columns = [
    {
      name: "ID",
      selector: (row: OrderWithMaterial) => row.id || 0,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: OrderWithMaterial) => row.name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row: OrderWithMaterial) => row.quantity,
      sortable: true,
    },
    {
        name: "",
        cell: (row: OrderWithMaterial) => (
        <Button text='Edit' href={`/orders/${row.id}/edit`} className='btn btn-sm btn-info me-2'></Button>               
        ),
    },

    {
        name: "",
        cell: (row: OrderWithMaterial) => (
        <DeleteButton orderId={row.id}></DeleteButton>              
        ),
        style: { width: '200px' },  // Definindo a largura da coluna
    }
  ];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = orders.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    async function fetchData(){

        const data = await fetchOrders();
        setOrder(data);
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
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4">
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
          </div>
        )}
      </div>
    </CSSTransition>
  </TransitionGroup>


    

  );
}