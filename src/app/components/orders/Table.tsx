"use client"

import React, { useState, useEffect } from 'react';
import { fetchOrders } from '@/lib/actions/ordersService';

import {

    OrderWithMaterial

} from '@/models/Order';

import styles from './Table.module.css';
import DeleteButton from './DeleteButton';

import Button from '@/app/components/Button';

export default function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const [orders, setOrder] = useState<OrderWithMaterial[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){

        const data = await fetchOrders();
        setOrder(data);
        setLoading(false);
    }

    fetchData();
  }, [query, currentPage]);

  return (
    <div className="mt-4">
            <div className="table-responsive">
                <div className="bg-light rounded p-2 pt-md-0">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Material ID</th>
                                <th>Quantity</th>
                                <th>Order Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={index}>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                    </tr>
                                ))
                            ) : (
                                orders?.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.order_date}</td>
                                        <td>
                                        <div className ="d-flex">
                                            <Button text='View' href={`/orders/${order.id}` } className='btn btn-sm btn-primary me-2'></Button>
                                            <DeleteButton orderId={order.id}></DeleteButton>
                                            <Button text='Edit' href={`/orders/${order.id}/edit`} className='btn btn-sm btn-info me-2'></Button>
                                        </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

  );
}