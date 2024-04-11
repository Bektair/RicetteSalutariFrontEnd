import { useState } from "react";


export default function RecipePicker() {
  const [ recipes, setRecipes ] = useState<string[]>([]) //Recipes should be shown based on category
  const [ foodCategory, setFoodCategory ] = useState('')

  const handleOnChange = (event : any) => {
    setFoodCategory(event.target.value)

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
        
      </div>
    );
  }