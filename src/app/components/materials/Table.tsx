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

export default function Table() {
  const [materials, setMaterials] = useState<Material[] | null>(null);
  const [loading, setLoading] = useState(true);

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
                      {materials?.length ? (
                        materials.map((material) => (
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
                              <div className="d-flex">
                                <DeleteButton materialId={material.id} />
                                <Button
                                  text="Edit"
                                  href={`/materials/${material.id}/edit`}
                                  className="btn btn-sm btn-info me-2"
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={11} className="text-center">
                            No materials found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
