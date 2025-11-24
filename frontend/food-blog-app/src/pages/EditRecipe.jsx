
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function EditRecipe() {
//   const [recipeData, setRecipeData] = useState({});
//   const navigate = useNavigate();

// useEffect(()=>)

//   const onHandlechange = (e) => {
//   const { name, type, value, files } = e.target;

//   let val;
//   if (type === "file") {
//     val = files[0]; // ✅ actual file
//   } else if (name === "ingredients" || name === "instructions") {
//     val = value.split(",");
//   } else {
//     val = value;
//   }

//   setRecipeData(prev => ({ ...prev, [name]: val }));
// };


//   const onHandleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Recipe Data before submit:", recipeData);

//     const formData = new FormData();
//     formData.append("title", recipeData.title);
//     formData.append("time", recipeData.time); //
//     formData.append("ingredients", JSON.stringify(recipeData.ingredients)); //
//     formData.append("instructions", JSON.stringify(recipeData.instructions)); //
//     formData.append("coverImage", recipeData.coverImage); //   👈 matches backend

//     try {
//       await axios.post("http://localhost:5000/recipe", formData, {
//         headers: { "Content-Type": "multipart/form-data",
//                     "authorization" :"bearer " +localStorage.getItem("token")
//          }
//       });
//       navigate("/");
//     } catch (err) {
//       console.error("Axios error:", err.response?.data || err.message);
//     }
//   };

//   // 

//   return (
//     <div className="container">
//       <form className="form" onSubmit={onHandleSubmit}>
//         <div className="form-control">
//           <label>Title</label>
//           <input type="text" className="input" name="title" onChange={onHandlechange} />
//         </div>
//         <div className="form-control">
//           <label>Time</label>
//           <input type="text" className="input" name="time" onChange={onHandlechange} />
//         </div>
//         <div className="form-control">
//           <label>Ingredients (comma separated)</label>
//           <textarea className="input-textarea" name="ingredients" rows="5" onChange={onHandlechange}></textarea>
//         </div>
//         <div className="form-control">
//           <label>Instructions (comma separated)</label>
//           <textarea className="input-textarea" name="instructions" rows="5" onChange={onHandlechange}></textarea>
//         </div>
//         <div className="form-control">
//           <label>Recipe Image</label>
//           <input type="file" className="input" name="coverImage" onChange={onHandlechange} />
//         </div>
//         <button type="submit">Edit Recipe</button>
//       </form>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();
  const{id}=useParams()

  useEffect(()=>{
    const getData=async()=>{
      await axios.get(`http://localhost:5000/recipe/${id}`)
      .then(response=>{
        let res=response.data
        setRecipeData({
          title:res.title,
          ingredients:res.ingredients.join(","),
          instructions:res.instructions,
          time:res.time
        })
      })
    }
    getData()
  },[])

  const onHandlechange = (e) => {
  const { name, type, value, files } = e.target;

  let val;
  if (type === "file") {
    val = files[0]; // 
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

    // const formData = new FormData();
    // formData.append("title", recipeData.title);
    // formData.append("time", recipeData.time); //
    // formData.append("ingredients", JSON.stringify(recipeData.ingredients)); //
    // formData.append("instructions", JSON.stringify(recipeData.instructions)); //
    // formData.append("coverImage", recipeData.coverImage); //   👈 matches backend

    // try {
      await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data",
                    "authorization" :"bearer " +localStorage.getItem("token")
         }
      })

      .then(()=>navigate("/myRecipe"))
      // navigate("/");
    // } catch (err) {
      // console.error("Axios error:", err.response?.data || err.message);
    // }
  };

  // 

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input type="text" className="input" name="title" onChange={onHandlechange} value={recipeData.title} />
        </div>
        <div className="form-control">
          <label>Time</label>
          <input type="text" className="input" name="time" onChange={onHandlechange} value={recipeData.time} />
        </div>
        <div className="form-control">
          <label>Ingredients (comma separated)</label>
          <textarea className="input-textarea" name="ingredients" rows="5" onChange={onHandlechange} value={recipeData.ingredients}></textarea>
        </div>
        <div className="form-control">
          <label>Instructions (comma separated)</label>
          <textarea className="input-textarea" name="instructions" rows="5" onChange={onHandlechange} value={recipeData.instructions} ></textarea>
        </div>
        <div className="form-control">
          <label>Recipe Image</label>
          <input type="file" className="input" name="coverImage" onChange={onHandlechange} />
        </div>
        <button type="submit">Edit Recipe</button>
      </form>
    </div>
  );
}
