import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import foodImg from '../assets/Biryani.jpg'
import { FaStopwatch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineDelete } from "react-icons/md";

export default function RecipeItems() {
    const recipes=useLoaderData()
    const [allRecipes,setAllrecipes] = useState()
    let path=window.location.pathname==="/myRecipe" ? true :false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe,setIsFavRecipe] = useState(false)
    console.log(allRecipes)

    useEffect(()=>{
        setAllrecipes(recipes)
    },[recipes])

    const onDelete=async(id)=>{
        await axios.delete(`http://localhost:5000/recipe/${id}`)
            .then((res)=>console.log(res))
        setAllRecipes(recipes=>recipes.filter(recipe=>recipe._id !==id))
        let filterItem = favItems.filter(recipe => recipe._id !==id)
        localStorage.setItem("fav",JSON.stringify(favItems))
    }

    const favRecipe=(item) =>{
        let filterItem=favItems.filter(recipe=>recipe._id !== id)
        favItems=favItems.filter(recipe=>recipe._id ===item._id).length === 0 ?[...favItems,item] : filterItem
        localStorage.setItem("fav",JSON.stringify(favItems))
        setIsFavRecipe(pre=>!pre)
    }

  return (
    <>
     <div className="card-container">
        {
            allRecipes?.map((Item,index)=>{
                return (
                    <div key={index} className="card">
                        <img src={`http://localhost:5000/images/${Item.coverImage}`} width="120px" height="100px"></img>
                        <div className="card-body">
                            <div className="title">{Item.title}</div>
                            <div className="icons">
                                <div className="timer">
                                    <FaStopwatch />{Item.time}
                                </div>
                                {(!path)?<FaHeart onClick={()=>favRecipe(Item)}  
                                    style={{color:(favItems.some(res=>res._id === Item._id))? "green" : ""}}
                                /> :
                                <div className='action'>
                                    <Link to={`/editRecipe/${Item._id}`} className="editIcon"><FaEdit /></Link>
                                    <MdDelete onClick={()=>onDelete(Item._id)} className='deleteIcon' />
                                </div>} 
                            </div>
                        </div>
                    </div>
                )
            })
        }
     </div> 
    </>
  )
}
