import bugTemplate from '../template/gitlab/bug-report.js'
import cardTemplate from '../template/gitlab/card-desc.js'

const bugBtn = document.getElementById("bug")
const cardBtn = document.getElementById("card")
const optPlatform = document.getElementById('platform')
const errMsg = document.getElementById('error')
const successMsg = document.getElementById('success')

chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    sendReponse('Oke')

    if (message) {
        errMsg.style.display = 'none'
        bugBtn.removeAttribute('disabled')
        cardBtn.removeAttribute('disabled')
    }

    optPlatform.addEventListener("change", (el) => {
        let plt = optPlatform.value
        console.log(plt);
    })
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
        successMsg.style.display = 'block'
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
        successMsg.style.display = 'block'
    })
})