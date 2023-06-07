const getId = () =>{
    const url = window.location.href;
    const parts = url.split('/');
    const cartId = parts[parts.length - 1];
    return cartId
};
const createCartButton = () =>{
    const conteinerCart = document.getElementById('conteinerCart') 
    let aCart = '';
    aCart +=  `
    <a href='/products' class="btn btn-lg btn-outline-primary">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
    </a>  `
    conteinerCart.innerHTML = aCart
};
const deleteProduct = async (prodId) =>{
    try {
        const userCartId = getId()
        const response = await fetch(`/carts/${userCartId}/${prodId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            await response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
        location.reload();
    } catch (error) {
        console.log(error)
    }
}
const addProduct = async (prodId) =>{
    try {
        const userCartId = getId()
        const response = await fetch(`/carts/${userCartId}/${prodId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            await response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
        location.reload();
    } catch (error) {
        console.log(error)
    }
};
createCartButton()