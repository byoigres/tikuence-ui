import React, { Suspense, lazy as ReactLazy } from 'react';

const AddNewList = ReactLazy(() => import('../Pages/Lists/Add'));
const AddVideo = ReactLazy(() => import('../Pages/Lists/AddVideo'));
const ViewList = ReactLazy(() => import('../Pages/Lists/View'));

const InertiaModals = ({ modal }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {modal && modal.modalName === 'add-list' && <AddNewList />}
    {modal && modal.modalName === 'add-video' && <AddVideo />}
    {modal && modal.modalName === 'view-list' && <ViewList />}
  </Suspense>
);

export default InertiaModals;
