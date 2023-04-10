window.addEventListener('blur', () => {    
    const activeElement = document.activeElement;
    if (activeElement) {
        let textarea = document.getElementById(activeElement.id)
        chrome.runtime.sendMessage({ id: activeElement.id, cursor: textarea.selectionStart } , (res) => { });
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    sendReponse('executed')
    let textarea = document.getElementById(message.el.id)
    textarea.value += message.message
})