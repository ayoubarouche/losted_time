const setDOMInfo = info=>{
    document.getElementById('total').textContent = info.total ; 
    document.getElementById('inputs').textContent = info.inputs ; 
    document.getElementById('buttons').textContent = info.buttons ; 
    
} ; 

window.addEventListener('DOMContentLoaded' , ()=>{
    chrome.tabs.query({
        active:true , 
        currentWindow:true
    } , tabs=>{
        chrome.tabs.sendMessage(
            tabs[0].id , 
            {
                from : 'popup' , subject:'DOMInfo'
            } , 
            setDOMInfo 
        ); 
    }); 
});