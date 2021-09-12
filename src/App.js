import { useState, useEffect } from 'react';
import './App.css';

const getLocalData = () => {
  const lists = localStorage.getItem("todolist");
  if (lists) {
    return JSON.parse(lists);
  } else
    return [];
};

function App() {
  const [Taskinput, setTaskinput] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editItems, setEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  //add item function
  const addItem = () => {
    if (!Taskinput) {
      alert("Please add any task")
    }else if(Taskinput && toggleBtn){
      setItems(
        items.map((currentElement)=>{
          if(currentElement.id === editItems){
          return{...currentElement,name:Taskinput};
          }
          return currentElement;
        })
      );
      setTaskinput("");
      setEditItem(null);
      setToggleBtn(false  );
    }else {
      const newTaskData = {
        id: new Date().getTime().toString(),
        name: Taskinput,
      };
      setItems([...items, newTaskData])
      setTaskinput("");
    }
  };

  //edit  items function
  const editItem = (index) => {
    const item_edited = items.find((currentElement) => {
      return currentElement.id === index;
    });
    setTaskinput(item_edited.name);
    setEditItem(index);
    setToggleBtn(true);
  };

  //Delete item function
  const deleteItem = (index) => {
    const updatedItem = items.filter((currentElement) => {
      return currentElement.id !== index;
    });
    setItems(updatedItem);
  };

  //remove all elements
  const removeAll = () => {
    setItems([]);
  };


  // local storage implementation
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items])

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img className="todologo" src="https://img.icons8.com/fluency/60/000000/tasklist.png" alt="todologo" />
          <figcaption className="caption">TaskBox</figcaption>
        </figure>
        <div className="addItems">
          <input className="inputField"
            type="text"
            placeholder="Add Task here..."
            value={Taskinput}
            onChange={(event) => setTaskinput(event.target.value)}
          />
          {toggleBtn 
          ? <button className="material-icons" className="addBtn" onClick={addItem}>Edit</button> 
          : <button type="button" className="addBtn" onClick={addItem}>Add</button>}
        </div>
        <div className="showItems">
          {
            items.map((currentElement, index) => {
              return (
                <div className="singleItem" key={index}>
                  <h3>{currentElement.name}</h3>
                  <div className="todoBtn">
                    <i className="material-icons"
                      onClick={() => editItem(currentElement.id)}>edit</i>
                    <i className="material-icons"
                      onClick={() => deleteItem(currentElement.id)}>delete</i>
                  </div>
                </div>
              )
            })
          }

        </div>
        <div className="showItems">
          <button className="removeAll"
            onClick={removeAll}>
            <span>Remove All</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
