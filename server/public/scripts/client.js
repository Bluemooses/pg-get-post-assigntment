$(document).ready(onReady);
function onReady(){
    console.log("This app uses jQuery");
    $('#add').on('click', addBook);
    getBookStore();
}

//GET BOOKSTORE ROUTER, START WITH AN EMPTY TABLE THEN APPEND THE DATA FROM RESPONSE.
function getBookStore (){
    //start fresh TBody.
    $('#bookTBody').empty(); 
    $.ajax({
        type: 'GET',
        url: '/bookstore'
    }).then(function(response) {
        console.log("Response is:", response);
        for(let i=0; i<response.length; i++){
            let book = response[i];

            console.log(book);
            $('#bookTBody').append(`
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.published}</td>          
                      
            
            `)
        }
    })
}

//AJAX POST, COLLECTS VALUES FROM DOM, POSTS DATAOBJECT AND RELOADS OUR BOOKSTORE
function addBook(){
    let payloadObject = {
        title: $('#title').val(),
        author: $('#author').val(),
        published: $('published').val()
    }
    console.log('Hefty load', payloadObject);

    $.ajax({//AJAX POST to bookstore with payLoad(book) object.
        type: 'POST',
        url: '/bookstore',
        data: payloadObject
    }).then(function (response) {
        //resets and reloads our book store
        $('#title').val(' '),
        $('#author').val(' '),
        $('#published').val(' '),
        getBookStore();
    });

}