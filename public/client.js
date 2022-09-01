

const socket = io()

let name;
let textarea =  document.querySelector('#textarea')
let messageArea =  document.querySelector('.message_area')

do{

    name = prompt(' Enter Your Name : ')

}while(!name);

textarea.addEventListener('keyup', (e) => {

    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){

    let message1 = {
        user : name,
        message : message.trim()
    }

    appendMessage(message1, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    /** Send message to server */
    socket.emit('message', message1)
}

function appendMessage(msg, type){

    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
                <h4>${msg.user}</h4>
                <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)


}

// Receive message from server 

socket.on('message', (msg) => {

    appendMessage(msg, 'incoming')
    scrollToBottom()
})

// SCROLL TO BOTTOM

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}