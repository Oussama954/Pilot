import { useState } from 'react';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Counter App
        </h1>
        
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 mb-8">
          <div className="text-center">
            <p className="text-white text-lg mb-2">Current Count</p>
            <p className="text-white text-7xl font-bold">{count}</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={increment}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Increment (+1)
          </button>
          
          <button
            onClick={decrement}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Decrement (-1)
          </button>
          
          <button
            onClick={reset}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Click the buttons to change the counter value
        </div>
      </div>
    </div>
  );
}