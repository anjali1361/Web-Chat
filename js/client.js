const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('swiftly.mp3');

//when a new user joined

const append =(message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }


}

form.addEventListener('submit',(e)=>{
    e.preventDefault();//prevents reloading
    const message = messageInput.value;
    if(message != ""){
        append(`You: ${message}`,'right')
        socket.emit('send',message);//telling the server to fire the corresponding event written inside index.js
    }
    messageInput.value =""

})

const name = prompt("Enter your name to join");
if(name != null){
    socket.emit('new-user-joined',name)//link to server event('new-user-joined and fires it's callback)
}


socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right')
})
socket.on('receive', message=>{
    if(message.name != null){
        append(`${message.name}: ${message.message}`,'left')
    }
})

//listening disconnect event
socket.on('left', name=>{
    if(name != null){
        append(`${name} left the chat`,'right')
    }
  
})


