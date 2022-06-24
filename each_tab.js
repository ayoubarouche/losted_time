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

format(window.location.host) ; 

function format(link) {
    let new_link = link ; 


    chrome.storage.sync.get([new_link], function (result) {
        if (result[new_link] == undefined) {
            console.log("the result is empty");
            let time_new = new Date().getTime();
            let value_to_set = {};
            value_to_set[new_link] = {};
            
            value_to_set[new_link]['time'] = time_new;

        //    let current_intervale =  format_time(time_new);
           value_to_set[new_link]['intervale'] = -1;

           // set the value to set in the storage : 
            chrome.storage.sync.set(value_to_set, function () {
                console.log("the sitted time before is :  ");
                console.log(time_new);

            });
        }
    });


}





