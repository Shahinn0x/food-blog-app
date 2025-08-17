// import React from 'react'
// import { useState } from 'react'
// import { useNavigate } from "react-router-dom";
// import axios from "axios";




// export default function AddFoodRecipe() {
  
//   const [recipeData, setRecipeData]=useState({})
//   const navigate = useNavigate()
//   const onHandlechange=(e)=>{
//     // console.log(e.target.files[0])
//     let val =(e.target.name==="ingredients") ? e.target.value.split(","): (e.target.name==="file")? e.target.files[0]:e.target.value
//     setRecipeData(pre=>({...pre,[e.target.name]:val}))

//   }
//   const onHandleSubmit=async(e)=>{
//     e.preventDefault()
//     console.log(recipeData)
//     await axios.post("http://localhost:5000/recipe",recipeData,{
//       header:{
//         'Content-Type':'multipart/form-data'
//       }
//     })
//     .then(()=>navigate("/"))
//   }
//   return (
//     <>
//         <div className="container">
//             <form action="" className="form" onSubmit={onHandleSubmit}>
//                 <div className="form-control">
//                   <label>Title</label>
//                   <input type="text" className="input" name="title" onChange={onHandlechange}></input>
//                 </div>
//                 <div className="form-control">
//                   <label>Time</label>
//                   <input type="text" className="input" name="time"  onChange={onHandlechange}></input>
//                 </div>
//                 <div className="form-control">
//                   <label>Ingredients</label>
//                   <textarea type="text" className="input-textarea" name="ingredients" rows='5' onChange={onHandlechange}></textarea>
//                 </div>
//                   <div className="form-control">
//                   <label>Instructions</label>
//                   <textarea type="text" className="input-textarea" name="instructions" rows="5" onChange={onHandlechange}></textarea>
//                 </div>
//                 <div className="form-control">
//                   <label>Recipe Image</label>
//                   <input type="file" className="input" name="file"  onChange={onHandlechange}></input>
//                 </div>
//                 <button type="submit">Add Recipe</button>
                
//             </form>
//         </div>
//     </>
//   )
// }


// 

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandlechange = (e) => {
  const { name, type, value, files } = e.target;

  let val;
  if (type === "file") {
    val = files[0]; // ✅ actual file
  } else if (name === "ingredients" || name === "instructions") {
    val = value.split(",");
  } else {
    val = value;
  }

  setRecipeData(prev => ({ ...prev, [name]: val }));
};


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log("Recipe Data before submit:", recipeData);

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time); //
    formData.append("ingredients", JSON.stringify(recipeData.ingredients)); //
    formData.append("instructions", JSON.stringify(recipeData.instructions)); //
    formData.append("coverImage", recipeData.coverImage); //   👈 matches backend

    try {
      await axios.post("http://localhost:5000/recipe", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/");
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
    }
  };

  // 

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input type="text" className="input" name="title" onChange={onHandlechange} />
        </div>
        <div className="form-control">
          <label>Time</label>
          <input type="text" className="input" name="time" onChange={onHandlechange} />
        </div>
        <div className="form-control">
          <label>Ingredients (comma separated)</label>
          <textarea className="input-textarea" name="ingredients" rows="5" onChange={onHandlechange}></textarea>
        </div>
        <div className="form-control">
          <label>Instructions (comma separated)</label>
          <textarea className="input-textarea" name="instructions" rows="5" onChange={onHandlechange}></textarea>
        </div>
        <div className="form-control">
          <label>Recipe Image</label>
          <input type="file" className="input" name="coverImage" onChange={onHandlechange} />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
