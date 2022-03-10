const addcard = document.querySelector('[class = add-card]');
const overlayBG = document.querySelector('[class = overlay-bg]');
const overlayFull = document.querySelector('[class = full-overlay]');
const cardWrapper = document.querySelector('[class = card-wrapper]');
const editableTitle = document.querySelector('[class = editable-title]');
const editableDesc = document.querySelector('[class = editable-desc]');
const editableYear = document.querySelector('[class = editable-year]');
const editableAuthor = document.querySelector('[class = editable-author]');
const editableComment = document.querySelector('[class = editable-comment]');
const deleteCardBtn = document.querySelector('[class = delete-button]');
const editableImage = document.querySelector('[class = editable-image]');
const editImageButton = document.querySelector('[class = big-edit-button]');
const reviewStars = [document.getElementById("star-1"),document.getElementById("star-2"),document.getElementById("star-3"),document.getElementById("star-4"),document.getElementById("star-5")];

var currentCard = -1;
var cardsLoaded = [];
//document.querySelector('[class = editable-title]').innerHTML = localStorage["title"] || "Your title goes here"

function Card(id,title,author,year,description,comment,rating,img){
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.description = description;
    this.comment = comment;
    this.rating = rating;
    this.img = img;
}
//const myCard = new Card("0","The great title","the author","1994","This is the description of the epic card thing")
//document.querySelector('[class = editable-title]').innerHTML = myCard.title;

function overlayClose(){
    overlayFull.style.display = 'none';
    overlayBG.style.display = 'none';
    //Refresh the Small card
    cardsLoaded[currentCard].title = editableTitle.textContent;
    cardsLoaded[currentCard].description = editableDesc.textContent;
    cardsLoaded[currentCard].year = editableYear.textContent;
    cardsLoaded[currentCard].author = editableAuthor.textContent;
    cardsLoaded[currentCard].comment = editableComment.textContent;
    cardsLoaded[currentCard].img = editableImage.src;
    //Image goes here
    
    let card = document.getElementById(currentCard);
    let cardImage = card.childNodes[0];
    cardImage.src = cardsLoaded[currentCard].img;
    let cardChildren = card.childNodes[2].childNodes;
    cardChildren[0].textContent = cardsLoaded[currentCard].title;
    cardChildren[1].textContent = cardsLoaded[currentCard].description;
    $(card).insertAfter(addcard);

    saveCards();

}
function overlayOpen(cardID){

    currentCard = cardID;
    editableTitle.textContent = cardsLoaded[cardID].title;
    editableDesc.textContent = cardsLoaded[cardID].description;
    editableYear.textContent = cardsLoaded[cardID].year;
    editableAuthor.textContent = cardsLoaded[cardID].author;
    editableComment.textContent = cardsLoaded[cardID].comment;
    editableImage.src = cardsLoaded[cardID].img;
    overlayBG.style.display = 'block';
    overlayFull.style.display = 'block';
    //Set the stars visuals
    //Fix card visuals 
    if (currentCard != -1){
        for(let i = cardsLoaded[currentCard].rating-1; i > -1; i--){
            reviewStars[i].src = "images/star-full.png"
        }
        for(let i = cardsLoaded[currentCard].rating; i < 5; i++){
            reviewStars[i].src = "images/star.png"
        }
    }
}

function createCard(){
    //Create actual card
    let pos = 0;
    if (cardsLoaded.length == 0){
        pos = 0;
    }else{
        pos = cardsLoaded.length;
    }
    cardsLoaded.push(new Card(pos,"Title"+String(pos),"Author","Year","Description","Comment",3,'images/provisional.jpg'))

    //Visual elements
    let divCard = document.createElement('div');
    divCard.classList.add("card");
    divCard.id = pos;
    cardWrapper.appendChild(divCard);
    let imageCard = document.createElement('img');
    imageCard.classList.add('imagecard');
    imageCard.src = cardsLoaded[pos].img;
    divCard.appendChild(imageCard);
    let editButton = document.createElement('img');
    editButton.src = "images/edit.png";
    editButton.classList.add("edit-button");
    editButton.addEventListener('click',function(){overlayOpen(pos);});
    divCard.appendChild(editButton);
    let cardOverlay = document.createElement('div');
    cardOverlay.classList.add("card-overlay");
    cardOverlay.id = "overlay";
    divCard.appendChild(cardOverlay);
    let h2 = document.createElement('h2');
    h2.id = "title";
    h2.textContent = cardsLoaded[pos].title;
    cardOverlay.appendChild(h2);
    let p = document.createElement('p');
    p.id = p;
    p.textContent = cardsLoaded[pos].description;
    cardOverlay.appendChild(p);

    overlayOpen(pos);
}
function checkContent(type,yellowChar,orangeChar,redChar,maxLength){
    //Colors
    if(document.activeElement === type){
        let str = type.textContent;
        if (str.length > yellowChar){
            type.style.color = '#ffcc00';
            if(str.length > orangeChar){
                type.style.color = '#ff6600';
                if (str.length > redChar){
                    type.style.color = '#ff0000';
                }
            }
        }else{
            type.style.color = 'black';
        }
        //Fix string
        if (str.length > maxLength){
            let finalstr = str.substring(0,maxLength);
            type.textContent = finalstr
        }
        else if (str.trim() == ""){
            type.textContent = ".";
        }
    }
}
function getImage() {
    var files = editImageButton.files;
    if (files.length > 0) {
      getBase64(files[0]);
    }
  };

function saveCards(){
    localStorage[currentCard] = JSON.stringify(cardsLoaded[currentCard]);
    console.log("saved current card")
}
function loadCards(){
    for(let i = 0; i < localStorage.length; i++){
        cardsLoaded[i] = JSON.parse(localStorage[i]);
        console.log("loaded card"+i)
        drawCard(i);
        let card = document.getElementById(i);
        $(card).insertAfter(addcard);
    }
}
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        editableImage.src = reader.result;
        cardsLoaded[currentCard].img = reader.result;
        editImageButton.value = null;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 function drawCard(card){
     //Visual elements
    let divCard = document.createElement('div');
    divCard.classList.add("card");
    divCard.id = card;
    cardWrapper.appendChild(divCard);
    let imageCard = document.createElement('img');
    imageCard.classList.add('imagecard');
    imageCard.src = cardsLoaded[card].img;
    divCard.appendChild(imageCard);
    let editButton = document.createElement('img');
    editButton.src = "images/edit.png";
    editButton.classList.add("edit-button");
    editButton.addEventListener('click',function(){overlayOpen(card);});
    divCard.appendChild(editButton);
    let cardOverlay = document.createElement('div');
    cardOverlay.classList.add("card-overlay");
    cardOverlay.id = "overlay";
    divCard.appendChild(cardOverlay);
    let h2 = document.createElement('h2');
    h2.id = "title";
    h2.textContent = cardsLoaded[card].title;
    cardOverlay.appendChild(h2);
    let p = document.createElement('p');
    p.id = p;
    p.textContent = cardsLoaded[card].description;
    cardOverlay.appendChild(p);
 }
//#region The 1-5 Review stars
/*reviewStars[4].addEventListener('click',function(){
    this.src = "images/star-hover.png";
});*/


for(let i = 0; i < reviewStars.length; i++){
    reviewStars[i].addEventListener('mouseover',function(){
        if (this.src != "images/star-hover.png"){
            this.src = "images/star-hover.png";
            var ii = i;
        }
        for(let i = ii+1; i < reviewStars.length; i++){
            reviewStars[i].src = "images/star.png";
        }
        for(let i = ii; i > -1; i--){
            reviewStars[i].src = "images/star-hover.png"
        }
    });
    reviewStars[i].addEventListener('mouseout',function(){
        ii = i;
        for(let i = ii; i > -1; i--){
            reviewStars[i].src = "images/star.png"
        }
    });
    reviewStars[i].addEventListener('click',function(){
        this.src = "images/star-full.png";
        ii = i;
        for(let i = ii+1; i < reviewStars.length; i++){
            reviewStars[i].src = "images/star.png";
        }
        for(let i = ii; i > -1; i--){
            reviewStars[i].src = "images/star-full.png"
            //cardsLoaded[currentCard].rating = i;
        }
        cardsLoaded[currentCard].rating = i+1;
    });
}
//#endregion

setInterval(function(){
    //Checks the edited contents are correct
    checkContent(editableTitle,30,40,49,50);
    checkContent(editableAuthor,12,16,21,22);
    checkContent(editableDesc,100,113,134,135);
    checkContent(editableComment,80,100,109,110);
    //Saves a card inside localStorage (debug, fix later)
    //localStorage["card"] = JSON.stringify(myCard);
   
    //Fix card visuals 
    if (currentCard != -1){
        for(let i = cardsLoaded[currentCard].rating-1; i > -1; i--){
            reviewStars[i].src = "images/star-full.png"
        }
    }

    //Check for images
    getImage();

})

//Reset text colors on unfocus
editableTitle.addEventListener("focusout",function(){
    this.textContent = this.textContent.replace(/(\r\n|\n|\r)/gm,"");
    this.style.color = "black";
})
editableDesc.addEventListener("focusout",function(){
    this.textContent = this.textContent.replace(/(\r\n|\n|\r)/gm,"");
    this.style.color = "black";
})
editableAuthor.addEventListener("focusout",function(){
    this.textContent = this.textContent.replace(/(\r\n|\n|\r)/gm,"");
    this.style.color = "black";
})
editableComment.addEventListener("focusout",function(){
    this.textContent = this.textContent.replace(/(\r\n|\n|\r)/gm,"");
    this.style.color = "black";
})
//CHECK IF YEAR IS CORRECT
editableYear.addEventListener("focusout",function(){
    let strYear = editableYear.textContent;
    let strYearConversion = strYear.replace(/\D/g, '');
    if (strYearConversion.length > 4){
        strYearConversion = strYearConversion.substring(0,4);
    }
    if (strYearConversion.length == 0){
        strYearConversion = "1994";
    }
    editableYear.textContent = strYearConversion;
    this.textContent = this.textContent.replace(/(\r\n|\n|\r)/gm,"");
})