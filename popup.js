import bugTemplate from '../template/bug-report.js'
import cardTemplate from '../template/card-desc.js'

const bugBtn = document.getElementById("bug")
const cardBtn = document.getElementById("card")
const optPlatform = document.getElementById('platform')

optPlatform.addEventListener("change", (el) => {
    console.log(optPlatform.value);
})

chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    sendReponse('Oke')
    bugBtn.addEventListener('click', async (el) => {
        let queryOptions = { active: true, currentWindow: true };
        let tab = await chrome.tabs.query(queryOptions);
        const msg = bugTemplate
        await chrome.tabs.sendMessage(
            tab[0].id,
            {message: msg, el: message}, (res) => {
                console.log(res);
            }
        )
    })

    cardBtn.addEventListener('click', async (el) => {
        let queryOptions = { active: true, currentWindow: true };
        let tab = await chrome.tabs.query(queryOptions);

        const msg = cardTemplate
        await chrome.tabs.sendMessage(
            tab[0].id,
            {message: msg, el: message}, (res) => {
                console.log(res);
            }
        )
    })
})