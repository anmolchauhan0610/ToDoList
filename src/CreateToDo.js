import React, { useEffect, useState } from 'react'
import "./ToDo.css"



// get data from local storage......
const getlocalItems = () =>{
     let list = localStorage.getItem("list")

     if(list){
       return JSON.parse(localStorage.getItem("list"));
     }else{
       return[];
     }
}

const CreateToDo = () => {

const [inputData,setInputData] = useState("")
const [items,setItems] = useState(getlocalItems());
const [toggleSubmit,setToggleSubmit] = useState(true);
const [isEditItem,setIsEditItem] = useState(null);


const addItem = () =>{
  console.log(items);
  if(!inputData){
    alert("please fill the data"); 
  }else if(inputData && !toggleSubmit){
    console.log("edit the item",toggleSubmit,isEditItem);
    setItems(
      items.map((elem)=>{
         if(elem.id===isEditItem){
                 return{...elem,name:inputData};
        }
        return elem;
      })
      )
       setToggleSubmit(true);
       setInputData("");
       setIsEditItem(null);

 }else{
    const   allInputData = {id: new Date().getTime().toString(),name:inputData}
    setItems([...items,allInputData]);
    setInputData("")
  }
  
} 


const deleteItem = (index) =>{
  // console.log(id);
     const updateditems = items.filter((elem,ind)=>{
            return index!== elem.id;
              
     });
     setItems(updateditems);
}

const editItem = (id) =>{
    let newEditItem = items.find((elem)=>{
       return elem.id===id;
     });
     console.log(newEditItem );
     setInputData(newEditItem.name);
     setIsEditItem(newEditItem.id);
     setToggleSubmit(false);

    
}

const removeall = () =>{ 
    setItems([]);
}


// .......add data to local storage......
useEffect(() =>{
   localStorage.setItem("list",JSON.stringify(items));
},[items]);
 
return (
  <>
  <div className='outer_box'>
    <h3>React ToDo App</h3>
    <p> Add New ToDo</p>
    <div className='inner_box'>
    <input className='inputbox'
    type="text"
    placeholder='Write Here.....'
    value={inputData}
    onChange={(e)=> setInputData(e.target.value)} />
      {
        toggleSubmit?<button className=' btn addbtn' onClick={addItem}>Add</button>:
        <button className='btn addbtn' onClick={addItem }>Edit</button>
      }
      
     </div>
     </div>
  <div className='showitems'> 
      {
       items.map((elem,ind)=>{
              return(
                <div className='eachitem   d-flex justify-content-between'    key={elem.id}>
                <h4>{elem.name}</h4>
                <div>   
                <button className='btn editbtn' onClick={ ()=>editItem (elem.id)}>Edit</button>
                <button className='btn delbtn' onClick={ ()=>deleteItem (elem.id)}>delete</button>  
                </div>
                 </div>
       )
       })
     }
     </div> 
    

    <div className='showitems1'>
      <button className='btn rembtn' onClick={removeall}>Remove All</button>
    </div>
      
    </>
  )
}

export default CreateToDo;