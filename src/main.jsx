import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FeedbackDetail, {
  loader as feedbackLoader,
} from './routes/FeedbackDetail';
import NotFound from './routes/NotFound';
import Home, { loader as homeLoader } from './routes/Home';

import AddFeedback from './routes/AddFeedback';
import App from './app';
// import { loader as feedbackLoader } from './routes/FeedbackDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, //
        element: <Home />, //
        loader: homeLoader,
      },
      {
        path: 'feedbacks/:feedbackId',
        element: <FeedbackDetail />,
        loader: feedbackLoader,
      },
      {
        path: 'feedbacks/add',
        element: <AddFeedback />,
        // loader: feedbackLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
