let pages_and_time = {};



chrome.runtime.onMessage.addListener((msg, sender, response) => {



    if ((msg.from === 'popup') && (msg.subject === 'how_much_time')) {

        console.log("from the popup");
        console.log("the request link is : ");
        if (!msg.current_link) {
            return;
        }
        console.log(msg.current_link);
        if (pages_and_time[msg.current_link] != undefined) {
            console.log("the link already exist :)");
            response({ time: pages_and_time[msg.current_link] });

        }
        else {
            let date = new Date();
            console.log("register a new link");
            pages_and_time[msg.current_link] = date;
            response({ time: date });
        }


    }

});


function save_pages_and_time(website_and_time) {
    chrome.storage.sync.set(website_and_time, function () {
        console.log('Value is set to ');
    });
}

function get_pages_and_time(website){
    chrome.storage.sync.get([website], function(result) {
        console.log('Value currently is ' +result.website);
        return result.key; 
      });
}