import React, { Suspense, lazy as ReactLazy } from 'react';

const AddNewList = ReactLazy(() => import('../Pages/Lists/Add'));

const InertiaModals = ({ modal }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {modal && modal.modalName === 'add-list' && <AddNewList />}
  </Suspense>
);

export default InertiaModals;
