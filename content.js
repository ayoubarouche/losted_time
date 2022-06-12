chrome.runtime.onMessage.addListener((msg, sender) => {

    // check the message structure : 
    if((msg.from == 'each_tab') && (msg.subject ==='showPageAction')){
        chrome.pageAction.show(sender.tab.id) ;
    }
});