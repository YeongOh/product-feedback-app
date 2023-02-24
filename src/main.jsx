import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FeedbackDetail, {
  loader as feedbackLoader,
} from './routes/FeedbackDetail';
import AddFeedback from './routes/AddFeedback';
import NotFound from './routes/NotFound';

import App from './app';
import EditFeedback from './routes/EditFeedback';
import ProtectedRoute from './routes/ProtectedRoute';
import Index, { loader as indexLoader } from './routes/Index';
import Roadmap from './routes/Roadmap';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: indexLoader,
      },
      {
        path: 'roadmap',
        element: <Roadmap />,
        loader: indexLoader,
      },
      {
        path: 'feedbacks/:feedbackId',
        element: <FeedbackDetail />,
        loader: feedbackLoader,
      },
      {
        path: 'feedbacks/:feedbackId/edit',
        element: (
          <ProtectedRoute>
            <EditFeedback />
          </ProtectedRoute>
        ),
        loader: feedbackLoader,
      },
      {
        path: 'feedbacks/add',
        element: (
          <ProtectedRoute>
            <AddFeedback />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
