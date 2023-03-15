import { createRoot } from 'react-dom/client';
import { Offline, Online } from 'react-detect-offline';

import App from './Components/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <div>
    <Online>
      <App />
    </Online>
    <Offline>You are offline right now. Check your connection.</Offline>
  </div>
);
