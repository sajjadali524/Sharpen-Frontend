import React, { useCallback, useState } from 'react'
import ShowCounter from './ShowCounter';

const Counter = () => {
  const [counter, setCounter] = useState(0);


  const incCount = () => {
    setCounter(prev => prev + 1);
  };

  const decCount = () => {
    setCounter(prev => prev - 1);
  };

  const helpHandler = useCallback(() => {
    console.log("help clicked");
  }, []);

  return (
    <div className='p-4'>
      <button onClick={incCount}>+</button>
      <button onClick={decCount}>-</button>
      <button onClick={helpHandler}>Help</button>

      <ShowCounter counter={counter} onHelp={helpHandler} />
    </div>
  );
};

export default Counter;