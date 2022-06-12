console.log("hello world");

let url = window.location.host;
console.log(url);


// send the link to the main script : 

chrome.runtime.sendMessage({
    from :'popup' , 
    subject : 'how_much_time',
    current_link : window.location.host  , 

}); 

// if popup asked for the current link time : 

chrome.runtime.onMessage.addListener((msg , sender , response)=>{
    if((msg.from==='popup') && (msg.subject==='link')){
        var domInfo ={
           link:window.location.host
        }; 

        response(domInfo) ;
    }
}) ; 





