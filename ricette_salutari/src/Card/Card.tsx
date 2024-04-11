import { Component } from "react";
import { ThemeContext } from "../App/App";
import './Card.css';



const Card = (props : React.PropsWithChildren, test:string) => {
   


    return (
      <section>
        { props.children }
        <p>Card</p>
      </section>
    );
  }
  export default Card