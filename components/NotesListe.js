import { myCreateElement } from "../functions/helpers.js";

export class NotesListe{

  #notes = []
  #NotesList
    constructor(notes){
      this.#notes = notes ;
    }

    appendTo(elem){
         elem.innerHTML = `
         <h1 class="text-lg text-center my-8"> Add Notes</h1>
   
         <form>   
             <div class="relative mb-8">
                
                 <input type="text" name="add-note" class="block w-full p-4 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add note" required>
                 <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
             </div>
         </form>
         <div>
             <button data-filter="all" type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">All</button>
         <button data-filter="planned" type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Planned</button>
         <button data-filter="done" type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Done </button>
         </div>
         
          <!-- List -->
                 <ul id="notes-list" role="list" class="space-y-5 my-7">
                    
                     </ul>
         
         
         `;
         
         this.#NotesList = elem.querySelector('#notes-list');
        
        for( let nota of this.#notes){
           let lis = new NotesListNota(nota)
           lis.appendTo(this.#NotesList)
        }
        elem.querySelector('form').addEventListener('submit',e=> this.#onFormSubmit(e))

        elem.querySelectorAll('[data-filter]').forEach(btn=> btn.addEventListener('click',(e)=> this.#filterNotes(e)))

       

    } //end of appendTo()

    /**
     * 
     * @param {click event} e 
     */

    #filterNotes(e){
      e.preventDefault()
      let selectedFilter = e.target.attributes['data-filter'].nodeValue || 'all';
      let parent = document.querySelector('#notes-list')
      console.log(selectedFilter);
      switch(selectedFilter){
        case  'done':
             parent.classList.remove('sort-by-planned')
             parent.classList.remove('filter-by-all')

             parent.classList.add('sort-by-done')
             break;
        case  'planned':
            parent.classList.remove('sort-by-done')
            parent.classList.remove('filter-by-all')

            parent.classList.add('sort-by-planned')

            break;
        default:
          parent.classList.add('filter-by-all')
          parent.classList.remove('sort-by-done')
          parent.classList.remove('sort-by-planned')

      }
    }


    
/**
 * 
 * @param {Submit form} e 
 */
    #onFormSubmit(e){
      e.preventDefault();
      const myForm = e.currentTarget;
      let textInput = new FormData(myForm).get('add-note').toString().trim()
      if(textInput == '') return;
      let newNote = {
        id: Date.now(),
        title:textInput,
        completed:false
      }
       let newNoteLi =  new NotesListNota(newNote)
        newNoteLi.prependTo(this.#NotesList)
        myForm.reset()


    }

}

class NotesListNota{
   #myLi
     constructor(note){
      const li = myCreateElement('li',{
        class:"flex space-x-3 items-center justify-between w-full"
      })
      const inp = myCreateElement('input',{
        type:"checkbox",
        class:"pr-4 text-base font-normal leading-tight text-gray-500 dark:text-gray-400",
        id:`note-${note.id}`,
        checked:note.completed?'':null
      })
      const p = myCreateElement('p',{
        class:"pr-4"
      })
      
      
      p.innerText = note.title
      const img = myCreateElement('img',{class:"max-w-full  h-6 w-6",src:"./icons8-trash-can.svg",alt:"remove"})
      img.addEventListener('click',(e)=> this.removeNote(e) )
      inp.addEventListener('change',(e)=> this.toggleCheckbox(e.currentTarget) )

      li.append(inp)
      li.append(p)
      li.append(img)
      this.#myLi = li
     // add class 'note-checked' when page load if input.checked is true
      if(inp.checked){
        this.#myLi.classList.add('note-checked')
      }

     }
   /**
    * 
    * @param {HTMLelement} element 
    */
     appendTo(elem){
      elem.append(this.#myLi)
     }
     prependTo(elem){
      elem.prepend(this.#myLi)
     }


     /**
      * 
      * @param {PointerEvent} e 
      */
     removeNote(e){
      e.preventDefault();
      this.#myLi.remove()

     }

     toggleCheckbox(checkbox){
      if(checkbox.checked == true){
        this.#myLi.classList.add('note-checked')
      }else{
        this.#myLi.classList.remove('note-checked')
      }
       
     }
}