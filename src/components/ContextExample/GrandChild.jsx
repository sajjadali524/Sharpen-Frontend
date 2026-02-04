import React from 'react';
import { useContext } from 'react';
import parentChild from '../../context/ParentChildContext';

const GrandChild = () => {
    const name = useContext(parentChild);
  return (
    <>
        <div>GrandChild</div>
        <p>Hello {name}</p>
        {/* <parentChild.Consumer>
            <p>`hello ${name}`</p>
        </parentChild.Consumer> */}
    </>
  )
}

export default GrandChild;