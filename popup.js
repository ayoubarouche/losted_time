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
    let link = info.link;
    chrome.runtime.sendMessage(
        {
            from: 'popup',
            subject: 'how_much_time',
            current_link: link

        }, function (response) {
            format_time(response.time);
        });
}



// format the time 

function clock() {
    link_time.setSeconds(link_time.getSeconds() + 1);
    console.log("inside clock ");
    console.log(link_time);
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

    link_time = new Date(time);
    console.log("the time received is : ");
    console.log(link_time.getSeconds());
    let current_time = new Date();
    link_time = new Date(Math.abs(current_time - link_time));
    setInterval(clock, 1000);
    document.getElementById("current_time").textContent = link_time;

}



// chrome.tabs.sendMessage(
//     {
//         from: 'kestar',
//         subject: window.location.host
//     }
// );