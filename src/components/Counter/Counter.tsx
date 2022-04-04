import React, { FC, useState } from 'react';

const Counter: FC = () => {
const [count, setCount] = useState<number>(0);

return <div>
  <p data-testid="counter">Count: {count}</p>
  <div>
    <button data-testid="increment" onClick={() => setCount(prev => prev + 1)}>+</button>
    <button data-testid="decrement" onClick={() => setCount(prev => prev - 1)} disabled>-</button>
  </div>
</div>
}

export default Counter;