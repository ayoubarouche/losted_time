let link;
let link_time;
// asking for the current link from the each tab script : 

window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                from: 'popup', subject: 'link'
            },
            function (info) {
                format(info);

            }
        );
    });
});


// function to get the current time frome the content ( main script )

function format(info) {
    let new_link = info.link;


    chrome.storage.sync.get([new_link], function (result) {
        if (result[new_link] == undefined) {
            console.log("the result is empty");
            let time_new = new Date().getTime();
            let value_to_set = {};
            value_to_set[new_link] = {};
            
            value_to_set[new_link]['time'] = time_new;

           let current_intervale =  format_time(time_new);
           value_to_set[new_link]['intervale'] = current_intervale;

           // set the value to set in the storage : 
            chrome.storage.sync.set(value_to_set, function () {
                console.log("the sitted time before is :  ");
                console.log(time_new);

            });
        }
        else {
            console.log("the result is not empty it's contains : ");
            console.log(result[new_link]);
            // response({time:result[new_link]});
            
            let current_intervale = format_time(result[new_link]['time']);
            result[new_link]['intervale'] = current_intervale ; 
            // update the current intervale : 
            chrome.storage.sync.set(result, function () {
                console.log("the sitted time before is :  ");
                console.log(time_new);

            });
            // format_time(result[new_link]) ; 
        }
    });


}



// format the time 

function clock() {
    link_time.setSeconds(link_time.getSeconds() + 1);
    // console.log("inside clock ");
    // console.log(link_time);
    let hrs = link_time.getHours();
    let mins = link_time.getMinutes();
    let secs = link_time.getSeconds();
    hrs = hrs < 10 ? `0${hrs}` : hrs;
    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;

    let time = `${hrs}:${mins}:${secs}`;

    document.getElementById("clock").innerText = time;
}



function format_time(time) {
    // console.log("the current time is : ") ; 
    // console.log(time);
    link_time = new Date(time);
    // console.log("the time received is : ");
    // console.log(link_time.getSeconds());
    let current_time = new Date();
    link_time = new Date(Math.abs(current_time - link_time));
    let intervale = setInterval(clock, 1000);

    // save the intervale to clear it when we want that : 

    // chrome.tabs.query({
    //     active: true,
    //     currentWindow: true
    // }, tabs => {
    //     chrome.tabs.sendMessage(
    //         tabs[0].id,
    //         {
    //             from: 'popup', subject: 'link'
    //         },
    //         function (info) {

    //             let value_to_add = {};
    //             let_intervale = info.link+info.link ; 
    //             value_to_add[info.link] = intervale ;

    //             chrome.storage.sync.set(value_to_add , function(){

    //             }) ; 
    //             // format(info);
    //         }
    //     );
    // });


    // document.getElementById("current_time").textContent = link_time;
    return intervale ; 

}



function reset_timer(current_link) {

    console.log("you clicked reset ");
    console.log("the link to remove is : ");
    console.log(current_link);
    // first we need to clear the intervale : 

    chrome.storage.sync.get([current_link] , function(result){
        clearInterval(result[current_link]['intervale']) ; 
    }) ; 

    // then we want to remove the full link : 
    chrome.storage.sync.remove(current_link, function () {
        console.log("the value is removed don't worry !");
    });

}

document.getElementById("reset").addEventListener("click", function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                from: 'popup', subject: 'link'
            },
            function (info) {
                reset_timer(info.link);
                // format(info);
            }
        );
    });

});
// chrome.tabs.sendMessage(
//     {
//         from: 'kestar',
//         subject: window.location.host
//     }
// );