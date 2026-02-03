import React, { useState } from 'react'

const App = () => {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const addItems = () => {
    setItems(prev => [...prev, inputText]);
    setInputText('')
  };

  const handleDelete = (i) => {
    setItems(items.filter((val, index) => (
      i !== index
    )));
  };

  const handleUpdate = (i) => {
    setInputText(items[i]);
    setEditIndex(i)
    setIsUpdate(true)
  };

  const updateItems = () => {
    setItems(items.map((item, index) => index === editIndex ? inputText : item))
    setInputText("")
  }

  return (
    <div className='p-4'>
      <div>
        <input type='text' placeholder='enter item' value={inputText} onChange={(e) => setInputText(e.target.value)}  />
        {isUpdate ? <button onClick={updateItems}>update</button>  : <button onClick={addItems}>Add</button>}
      </div>
      <div>
        {items?.map((item, index) => {
          return(
            <div key={index} className='flex space-x-10'>
              <p>{item}</p>
              <div className='space-x-2'>
                <button onClick={() => handleUpdate(index)}>Update</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;