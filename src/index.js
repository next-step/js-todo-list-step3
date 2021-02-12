/*@jsx Reilly.createElement */
import Reilly from 'reilly';
import ReillyDOM from 'reillyDOM';
import App from './App';
import './style.css';
import configStore from './reducs/configStore';

export const store = configStore();

const rootElement = document.getElementById('root');

ReillyDOM.render(<App />, rootElement);
