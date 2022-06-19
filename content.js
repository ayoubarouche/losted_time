let is_exist = false;


// chrome.runtime.onMessage.addListener((msg, sender, response) => {



//     if ((msg.from === 'popup')) {

//         if (!msg.current_link) {
//             return;
//         }

//         if (msg.subject == 'how_much_time') {
//             chrome.storage.sync.get([msg.current_link],function(result){
//                 response({time:result[msg.current_link]}) ; 
//             });

//         }

//         if(msg.subject=='set_time'){
//             let link = msg.current_link ; 
//             let value_to_set = {} ;
//             value_to_set[link]= let_time ;  
//             let let_time = new Date().getTime() ; 
//             chrome.storage.sync.set({link:let_time}, function(){
//                 response({time:let_time});
//             }) ; 
            
//         }

//         console.log("from the popup");
//         console.log("the request link is : ");

//         let new_link = msg.current_link;
//         // console.log(msg.current_link);
//         // let answer = undefined; 
//         // console.log("the current link is : ") ; 
//         // console.log(msg.current_link); 
//         // if ((answer=get_pages_and_time(msg.current_link)) != undefined) {
//         //     console.log("the link already exist :)");

//         //     console.log("the answer is : ");
//         //     console.log(answer) ;
//         //     response({ time: answer });
//         let new_time;
//         // }
//         // else {
//         //     let date = new Date();
//         //     console.log("register a new link");
//         //     pages_and_time[msg.current_link] = date;
//         //     link = msg.current_link;
//         //     console.log("saving date is : ");
//         //     console.log(date.getTime()) ;  
//         //     save_pages_and_time({link : date.getTime()})
//         //     response({ time: date });
//         // }

//         chrome.storage.sync.get([new_link], function (result) {
//             if (result[new_link] == undefined) {

//                 console.log("the value not exist : ");
//                 console.log(result[new_link]);
//                 is_exist = false;
//             }
//             else {
//                 is_exist = true;
//                 new_time = result[new_link];
//                 console.log("the result is not empty it's contains : ");
//                 console.log(result[new_link]);
//                 response({ time: result[new_link] });
//                 // format_time(result[new_link]) ; 
//             }
//         });

//         if (!is_exist) {
//             console.log("the result is empty");
//             let time_new = new Date().getTime();
//             chrome.storage.sync.set({ new_link: time_new }, function () {
//                 console.log("the sitted time before is :  ");
//                 console.log(time_new);

//             });
//             response({ time: time_new });
//         } else {
//             response({ time: new_time });
//         }


//     }

// });


function save_pages_and_time(website_and_time) {
    chrome.storage.sync.set(website_and_time, function () {
        console.log('Value is set to ');
    });
}

function get_pages_and_time(website) {
    chrome.storage.sync.get(website, function (result) {
        console.log('Value currently is ' + result[website]);
        return result[website];
    });
}