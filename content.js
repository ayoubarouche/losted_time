let pages_and_time = {};



chrome.runtime.onMessage.addListener((msg, sender, response) => {



    if ((msg.from === 'popup') && (msg.subject === 'how_much_time')) {

        console.log("from the popup");
        console.log("the request link is : ");
        if ( ! msg.current_link){
            return ; 
        }
        console.log(msg.current_link);
        if (pages_and_time[msg.current_link] != undefined) {
            console.log("the link already exist :)");
            response({ time: pages_and_time[msg.current_link] });
            
        }
        else {
            let date = new Date();
             console.log("register a new link");
             pages_and_time[msg.current_link] = date ; 
            response({ time: date });
        }


    }

});