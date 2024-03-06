import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'
import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart') //ye home.ejs me button ko class di vi hai, aur ye addToCart isme saare buttons as a array aajayenge
let cartCounter = document.querySelector('#cartCounter') //ye layout.ejs me id di vi hai

function updateCart(pizza) { //isme apn ajax call krenge aur uske liye apn use krenge library axios
    axios.post('/update-cart', pizza).then(res => {
        //console.log(res)
        cartCounter.innerText = res.data.totalQty //top right me jo total items added to cart h vo
        new Noty({ //ye noty ek package install kia h
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();        
    })
}


//adding eventListener to button
addToCart.forEach( (btn) =>{
    btn.addEventListener('click' , (e) =>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)  //ye function upar define kia va h
        //console.log(pizza)
    })
})    

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 3000)
}



// Change order status
let statuses = document.querySelectorAll('.status_line') //ye class di vi h saari li ko
let hiddenInput = document.querySelector('#hiddenInput') //ye id singleOrder.ejs me h
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed') //ye dono lines purane vale status ko htadegi aur phir niche se naye vale status ka create kregi
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status //aise apn ne likha va h data-status="order_placed", isko access krne k liye .dataset.status likhte h
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) { //order.status jo db me h
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time) //isse vo li ke andar last me likha va aajayega
           if(status.nextElementSibling) { //ye point krega next li ko aur apne ko usko orange krna h
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}


updateStatus(order);


// Socket
let socket = io()

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}
let adminAreaPath = window.location.pathname //this is the url /admin/orders and it is string
if(adminAreaPath.includes('admin')) { //agar string me admin h mtlab ye admin page h
    initAdmin(socket)
    socket.emit('join', 'adminRoom') //isme ek hi room bnega admin room
}


socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})
