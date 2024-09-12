import React, { Suspense, lazy as ReactLazy } from 'react';

const AddNewList = ReactLazy(() => import('../Pages/Lists/Add'));
const AddVideo = ReactLazy(() => import('../Pages/Lists/AddVideo'));

const InertiaModals = ({ modal }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {modal && modal.modalName === 'add-list' && <AddNewList />}
    {modal && modal.modalName === 'add-video' && <AddVideo />}
  </Suspense>
);

export default InertiaModals;
