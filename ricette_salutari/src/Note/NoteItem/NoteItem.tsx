import { Component, PropsWithChildren } from "react";
import { ThemeContext } from "../../App/App";



export default class NoteItem extends Component {
    themeStyles(dark:boolean){
        return{
            backgroundColor: dark ? '#333' : '#CCC',
            color: dark ? '#CCC' : '#333',
            padding: '2rem',
            margin: '2rem'
        }
    }

    render(){
        return (
            <ThemeContext.Consumer>
                {(darkTheme) => {
                        return <div style={this.themeStyles(darkTheme=='true')}>
                            <section className="NoteItem">
                                { <p>ok</p> }
                            </section>
                        </div>
                }}
            </ThemeContext.Consumer>
        );
    }
}