$(document).ready(onReady);
function onReady() {
    console.log("This app uses jQuery");
    $('#add2').on('click', addMag);
    $('#add').on('click', addBook);
    getBookStore();
    getMag();  
}

//GET BOOKSTORE ROUTER, START WITH AN EMPTY TABLE THEN APPEND THE DATA FROM RESPONSE.
function getBookStore() {
    //start fresh TBody.
    $('#bookTBody').empty();
    $.ajax({
        type: 'GET',
        url: '/bookstore'
    }).then(function (response) {
        console.log("Response is:", response);
        for (let i = 0; i < response.length; i++) {
            let book = response[i];

            console.log(book);
            $('#bookTBody').append(`
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.published}</td> 
                <td><button class="deleteBook" data-id="${book.id}">X</button></td>
        
            `)
        }

    });
}
//AJAX POST, COLLECTS VALUES FROM DOM, POSTS DATAOBJECT AND RELOADS OUR BOOKSTORE
function addBook() {
    let payloadObject = {
        title: $('#title').val(),
        author: $('#author').val(),
        published: $('#published').val()
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

function getMag() {
    //start fresh TBody.
    $('.magazineTBody').empty();
    $.ajax({
        type: 'GET',
        url: '/magazines',
    }).then(function (response) {
        console.log("Response is:", response);
        for (let i = 0; i < response.length; i++) {
            let magazine = response[i];
            console.log(magazine);
            $('.magazineTBody').append(`
            
                <td>${magazine.magtitle}</td>
                <td>${magazine.issueNumber}</td>
                <td>${magazine.published}</td>        
            `)
        }
    });
}



function addMag() {
    //loading up a new dataObject
    let payloadObject = {
        magtitle: $('#magtitle').val(),
        issuesNumber: $('#issueNumber').val(),
        pages: $('#pages').val()
    }
    console.log("Incoming magLoad", payloadObject);

    $.ajax({
        type: 'POST',
        url: '/magazines',
        data: payloadObject
    }).then(function (response) {
        $('#magtitle').val(' ');
        $('#issueNumber').val(' ');
        $('#pages').val(' ');
        getMag();
    });
    getMag();
}

