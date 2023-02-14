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
import Home, { loader as homeLoader } from './routes/Home';

import App from './app';
import EditFeedback from './routes/EditFeedback';
// import { loader as feedbackLoader } from './routes/FeedbackDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: 'feedbacks/:feedbackId',
        element: <FeedbackDetail />,
        loader: feedbackLoader,
      },
      {
        path: 'feedbacks/:feedbackId/edit',
        element: <EditFeedback />,
      },
      {
        path: 'feedbacks/add',
        element: <AddFeedback />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
