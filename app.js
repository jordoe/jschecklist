function addItem(text) {
    $("#info").append("<div><input class ='check' type='checkbox'><span>" + text + "</span><button class='boton'>Delete</button></div>")    
}

function deleteItem(div){ 
    div.parentElement.removeChild(div);
}

function changeItem(checkboxElement, spanElement){
    var decoration = checkboxElement.checked ? "line-through" : "none";   //checked funciona como un if: si es verdadero, hara lin-through, si no, none
    spanElement.style.textDecoration = decoration;
}

function loadItems(){
    $.ajax({
        method: 'GET',
        url: "http://b68aaba6.ngrok.io/items/"
    }).done(function(data){
        for(var i = 0; i < data.length; i++){
            addItem(data[i].description)
        }
    })
}

function postItem(text){
    $.ajax({
        method: 'POST',
        url: "http://b68aaba6.ngrok.io/items/",
        data: JSON.stringify({"description":text, "checked":false}),
        processData: false,
        headers: {"Content-type":"application/json"}
    })
}

function deleteItem(id){
    $.ajax({
        method: 'DELETE',
        url: "http://b68aaba6.ngrok.io/items/"+id,
    })
}

$(document).ready(function(){
    
    loadItems();

    $("#button").click(function(){
        var text = $("#text").val();
        postItem(text);
        addItem(text);
    })
    
    $("#info").click(function(event){
        var elem = event.target;
        if(elem.className == 'boton'){
            var div = elem.parentElement;
            deleteItem(div);
        }else if (elem.className == 'check'){
            var spanElement = elem.parentElement.childNodes[1];   //[1] porque es el segundo elemento hijo de elem
            changeItem(elem, spanElement);
        }
    })
})