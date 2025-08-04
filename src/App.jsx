import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white text-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1 className="text-4xl font-bold mb-4">🚧 Website Coming Soon 🚧</h1>
        <p className="text-lg">
          We're updating with the latest functionality.<br />
          Please check back in a few hours!
        </p>
      </div>
    </div>
  );
}

export default App;
