import { useState } from "react";
import api from "../App/api"
import Ingredient from "./Ingredient/Ingredient";


export default function RecipePicker() {
  const [ recipes, setRecipes ] = useState<string[]>([]) //Recipes should be shown based on category
  const [ foodCategory, setFoodCategory ] = useState('')

  const [ingredients, setIngredient] = useState([])


const getIngredients = () => {
    api
        .get("/api/ingredients/")
        .then((res) => res.data)
        .then((data) => { setIngredient(data); console.log(data) })
        .catch((err) => alert(err))
}
  

  const handleOnChange = (event : any) => {
    setFoodCategory(event.target.value)
    getIngredients();

  }
  const testData = ['Cold brew', 'PotetStuing']

  const filterList = (category : string) => {
    //RemovesOne
    const newRecipes : string[] = []
    newRecipes.splice(0, 1)
    setRecipes(newRecipes)

    setRecipes(testData); //Tvinger til at det bare er disse to
    setRecipes([...testData, 'PotetPizza']); //En til lagt til


  }



    return (
      <div>
        <input onChange={handleOnChange}></input>
        <div>
            <h2>Ingredients</h2>
            {ingredients.map((ingredient)=> 
                <Ingredient ingredient={ingredient}></Ingredient>
            )}
        </div>
      </div>
    );
  }