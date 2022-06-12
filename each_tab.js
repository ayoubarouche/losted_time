console.log("hello world");

let url = window.location.host;
console.log(url);


chrome.runtime.sendMessage({
    from :'each_tab' , 
    subject : 'showPageAction'
}) ; 


chrome.runtime.onMessage.addListener((msg , sender , response)=>{
    if((msg.from==='popup') && (msg.subject==='DOMInfo')){
        var domInfo ={
            total:document.querySelectorAll('*').length  , 
            inputs:document.querySelectorAll('inputs').length  , 
            buttons:document.querySelectorAll('button').length
        }; 

        response(domInfo) ;
    }
}) ; 



