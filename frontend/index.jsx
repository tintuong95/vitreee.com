import {createRoot} from 'react-dom/client';
import App from './App';

import './index.css';
import {CustomRouter, history} from './src/router/CustomerRouter';
import {ConfigProvider} from 'antd';
import {Provider} from 'react-redux';
import store from './src/store';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(
	<CustomRouter history={history}>
		<Provider store={store}>
			<ConfigProvider
				theme={{
					token: {
						fontFamily:
							'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
						borderRadius: 5,
					},
				}}>
				<App />
			</ConfigProvider>{' '}
		</Provider>
	</CustomRouter>
);
