"use client"

import React, { useState, useEffect } from 'react';
import { fetchMaterials } from '@/lib/actions/materialsService';

import {

  Material,

} from '@/models/Material';

import styles from './Table.module.css';
import DeleteButton from './DeleteButton';

import Button from '@/app/components/Button';

export default function Table() {

  const [materials, setMaterial] = useState<Material[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){

        const data = await fetchMaterials();
        setMaterial(data);
        setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="mt-4">
            <div className="table-responsive">
                <div className="bg-light rounded p-2 pt-md-0">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                            <th className={styles.thId}>ID</th>
                            <th className={styles.thName}>Name</th>
                            <th className={styles.thType}>Type</th>
                            <th className={styles.thDescription}>Description</th>
                            <th className={styles.thThickness}>Thickness</th>
                            <th className={styles.thWidth}>Width</th>
                            <th className={styles.thHeight}>Height</th>
                            <th className={styles.thColor}>Color</th>
                            <th className={styles.thManufacturer}>Manufacturer</th>
                            <th className={styles.thPrice}>Price</th>
                            <th className={styles.thActions}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 7 }).map((_, index) => (
                                    <tr key={index}>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                        <td className={styles.skeleton}></td>
                                    </tr>
                                ))
                            ) : (
                                materials?.map((material) => (
                                    <tr key={material.id}>
                                        <td>{material.id}</td>
                                        <td>{material.name}</td>
                                        <td>{material.type}</td>
                                        <td>{material.description}</td>
                                        <td>{material.thickness}</td>
                                        <td>{material.width}</td>
                                        <td>{material.height}</td>
                                        <td>{material.color}</td>
                                        <td>{material.manufacturer}</td>
                                        <td>{material.price}</td>
                                        <td>
                                        <div className ="d-flex">
                                            <DeleteButton materialId={material.id}></DeleteButton>
                                            <Button text='Edit' href={`/materials/${material.id}/edit`} className='btn btn-sm btn-info me-2'></Button>
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