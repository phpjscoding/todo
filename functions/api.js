export async function fetchJson(url,options={}){
    const headers = {Accept:'application/json',...options.headers}
    const req = await fetch(url,{options,...headers})
    if(req.ok){ return req.json()}
    throw new Error('Request to server failed',{cause:req});
}