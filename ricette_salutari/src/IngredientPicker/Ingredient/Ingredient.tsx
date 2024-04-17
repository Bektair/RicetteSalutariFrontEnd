export default function Ingredient({ingredient} : any ) {
    return (
      <div>
        <h2>{ingredient.code}</h2>
        <h3>{ingredient.created_datetime}</h3>
      </div>
    );
  }