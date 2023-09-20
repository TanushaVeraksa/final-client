import React, { createContext, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ReviewStore from './store/ReviewStore';
import CommentStore from './store/CommentStore';
import TagStore from './store/TagStore';
import './i18n';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value = {{
        user: new UserStore(),
        review: new ReviewStore(),
        comment: new CommentStore(),
        tag: new TagStore()
    }}>
      <Suspense fallback="...loading">
        <App />
      </Suspense>
    </Context.Provider>
  </React.StrictMode>
);

