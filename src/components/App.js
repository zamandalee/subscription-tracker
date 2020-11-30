import ListContainer from './listContainer.js';
import '../assets/app.css';

import logo from '../assets/imgs/logo.png';
import audible from '../assets/imgs/audible.png';
import billie from '../assets/imgs/billie.png';
import classpass from '../assets/imgs/classpass.png';
import figma from '../assets/imgs/figma.png';
import headspace from '../assets/imgs/headspace.png';
import hellofresh from '../assets/imgs/hellofresh.png';
import icloud from '../assets/imgs/icloud.png';
import linkedin from '../assets/imgs/linkedin.png';
import netflix from '../assets/imgs/netflix.png';
import prime from '../assets/imgs/prime.png';
import spotify from '../assets/imgs/spotify.png';
import times from '../assets/imgs/times.png';

export const lowPriceObj = { lowerBound: 0, upperBound: 12 };
export const midPriceObj = { lowerBound: 12, upperBound: 30 };
export const highPriceObj = { lowerBound: 30, upperBound: 100 };

const subscriptionList = [
  { id: 1, name: 'Netflix', img: netflix, category: 'streaming', price: 13.99, priceCategory:'mid' },
  { id: 2, name: 'iCloud', img: icloud, category: 'productivity', price: 2.99, priceCategory:'low' },
  { id: 3, name: 'LinkedIn Premium', img: linkedin, category: 'productivity', price: 59.99, priceCategory:'high' },
  { id: 4, name: 'Figma', img: figma, category: 'productivity', price: 12, priceCategory:'mid' },
  { id: 5, name: 'Amazon Prime', img: prime, category: 'ecommerce', price: 12.99, priceCategory:'mid' },
  { id: 6, name: 'Billie', img: billie, category: 'ecommerce', price: 9, priceCategory:'low' },
  { id: 7, name: 'New York Times', img: times, category: 'reading', price: 4, priceCategory:'low' },
  { id: 8, name: 'Headspace', img: headspace, category: 'health', price: 12.99, priceCategory:'mid' },
  { id: 9, name: 'ClassPass', img: classpass, category: 'health', price: 75, priceCategory:'high' },
  { id: 10, name: 'Spotify', img: spotify, category: 'streaming', price: 9.99, priceCategory:'low' },
  { id: 11, name: 'Audible', img: audible, category: 'reading', price: 14.95, priceCategory:'mid' },
  { id: 12, name: 'Hello Fresh', img: hellofresh, category: 'ecommerce', price: 79, priceCategory:'high' },
];

function App() {
  return (
    <div className="app">
      <header className="flex-col-start">
        <div className="flex-start header">
          <img src={logo} alt="logo" />
          <div className="flex-col-start header-text">
            <h1>Subscription Manager</h1>
            <h3>Stay financially empowered — track your ongoing subscription service payments.</h3>
          </div>
        </div>

        <div className="header-bar-container">
          <div className="header-bar"></div>
        </div>
      </header>
      <div>
        <ListContainer items={subscriptionList} />
      </div>
    </div>
  );
}

export default App;
