import { NotesListe } from "./components/NotesListe.js";
import { fetchJson } from "./functions/api.js";
import { myCreateElement } from "./functions/helpers.js";


try{
    const myNotesJSON = await fetchJson('https://jsonplaceholder.typicode.com/todos?_limit=6')
    let myNotesHTML = new NotesListe(myNotesJSON)
    myNotesHTML.appendTo(document.querySelector('.notes.container'))
}catch(err){
    let alert = myCreateElement('div',{
        class:"bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" ,
        role:"alert"
    })
    alert.innerText = 'Server request error -- '  + err
    console.log(err);
    document.body.prepend(alert)
}
