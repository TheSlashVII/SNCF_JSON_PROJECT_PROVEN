import './App.css'

import Spanish from "./Spanish.tsx";


export let lang = 0;
export function changeLanguage(currentLang:number) {
    if (currentLang === 0) {
        lang = 1;
    } else {
        lang = 0;
    }
}
// import {useState} from "react";
function App() {

    return (
        <div><Spanish/></div>
    )


    // const [language, setLanguage] = useState("French");



}

export default App
