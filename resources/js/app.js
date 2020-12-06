const { update } = require("../../app/models/menu");
import axios from 'axios'
import Noty from 'noty'
const Order = require("../../app/models/order")
import moment from 'moment'
// this is client side code
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');
function updateCart(pizza) {
    // we can use ajax to fatch API
    // But we are using axios library to send ajax request
    axios.post('/update-cart', pizza).then(res => {

        console.log(res)
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: "success",
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
            // layout:"topLeft"
        }).show();
    }).catch(err => {
        new Noty({
            type: "error",
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
            // layout:"topLeft"
        }).show();
    })
}
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
        console.log(pizza);
    })
})

const alertMSg = document.querySelector('#success-alert')
if (alertMSg) {
    setTimeout(() => {
        alertMSg.remove()
    }, 2000)
}

// const { generateCodeFrame } = require("vue-template-compiler")

// import axios from 'axios'

function initadmin(socket) {
    const ordertablebody = document.querySelector('#orderTableBody')
    let orders = []
    let markup

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        ordertablebody.innerHTML = markup
    }).catch(err => {
        console.log(err);
    })

    function renderItems(items) {
        let parsedItem = Object.values(items)
        return parsedItem.map((menuItem) => {
            return `
            <p>${menuItem.item.name} - ${menuItem.qty}</p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr>
                <td class="border px-4 py-2 text-green-900">
                    <p>${order._id}</p>
                    <div>${renderItems(order.items)}</div>
                </td>
                <td class="border px-4 py-2">${order.customerId.name}</td>
                 <td class="border px-4 py-2">${order.phone}</td>
                <td class="border px-4 py-2">${order.address}</td>
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-64">
                        <form action="/admin/order/status" method="POST">
                            <input type="hidden" name="orderId" value="${order._id}">
                            <select name="status" onchange="this.form.submit()"
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="order_placed"
                                    ${order.status === 'order_placed' ? 'selected' : ''}>
                                    Placed</option>
                                <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>
                                    Confirmed</option>
                                <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>
                                    Prepared</option>
                                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>
                                    Delivered
                                </option>
                                <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>
                                    Completed
                                </option>
                            </select>
                        </form>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </td>
                <td class="border px-4 py-2">
                    ${moment(order.createdAt).format('hh:mm A')}
                </td>
                <td class="border px-4 py-2">
                    ${order.paymentStatus ? 'paid' : 'Not paid'}
                </td>
            </tr>
        `
        }).join('')
    }
    socket.on('orderPlaced',(order)=>{
        new Noty({
            type: "success",
            timeout: 1000,
            text: 'New Order Placed',
            progressBar: false,
            // layout:"topLeft"
        }).show();
        orders.unshift(order)
        ordertablebody.innerHTML=''
        ordertablebody.innerHTML=generateMarkup(orders)
    })
}






// Change orders status
let statuses = document.querySelectorAll('.status_line')
console.log(statuses)
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
let time = document.createElement('small')



order = JSON.parse(order)
console.log(order)
function updateStatus(order) {
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProp === order.status) {
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            stepCompleted = false
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })
}
updateStatus(order)

let socket = io()
initadmin(socket)
// join
if (order) {
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath=window.location.pathname
console.log(adminAreaPath)

if(adminAreaPath.includes('admin')){
    socket.emit('join','adminRoom')
}


socket.on('orderUpdated',(data)=>{
    const updatedOrder={...order}
    updatedOrder.updatedAt=moment().format()
    updatedOrder.status=data.status
    updateStatus(updatedOrder)
    new Noty({
        type: "success",
        timeout: 1000,
        text: 'Status Updated Successfully',
        progressBar: false,
        // layout:"topLeft"
    }).show();
    console.log(data)
})

