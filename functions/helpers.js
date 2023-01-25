
 
/**
 * 
 * @param {string} TageName 
 * @param {object} Attributes 
 * @returns HTMLement
 */

export function myCreateElement(TageName,Attributes){
    let myElem =  document.createElement(TageName);
    for(const [key,val] of Object.entries(Attributes)){
      if(val !== null ){
        myElem.setAttribute(key,val)
      }
    }
  return myElem ;

}