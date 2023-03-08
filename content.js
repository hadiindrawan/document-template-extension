window.addEventListener('blur', () => {
    if (document.activeElement.hasAttribute('id') || !document.activeElement.hasAttribute('name'))
        chrome.runtime.sendMessage({id: document.activeElement.id}, (res) => {})
    else if (!document.activeElement.hasAttribute('id') || document.activeElement.hasAttribute('name'))
        chrome.runtime.sendMessage({name: document.activeElement.name}, (res) => {})
    else if (document.activeElement.hasAttribute('id') && document.activeElement.hasAttribute('name'))
        chrome.runtime.sendMessage({id: document.activeElement.id}, (res) => {})
})

chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    sendReponse('executed')
    if(Object.keys(message.el) == 'id')
        document.getElementById(message.el.id).value = message.message
    else 
        document.getElementsByName(message.el.name).value = message.message

})