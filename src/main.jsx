import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FeedbackDetail from './routes/FeedbackDetail';
import NotFound from './routes/NotFound';
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'feedback/:feedbackId',
        element: <FeedbackDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
