/*@jsx Reilly.createElement */
import Reilly from 'reilly';
import ReillyDOM from 'reillyDOM';
import './sass/index.scss';
import App from './App';
import configStore from './reducs/configStore';

export const store = configStore();

const rootElement = document.getElementById('root');

ReillyDOM.render(<App />, rootElement);
