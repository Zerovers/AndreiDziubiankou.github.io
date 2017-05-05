"use strict"
function DivFactory(){

}

DivFactory.createContainer = function(imgsrc, name, processFunction){
  var container = document.createElement('div');
  container.className = 'container';
  var logo = document.createElement('a');
  logo.className = 'logo';
  logo.href = '#';
  var logoImg = document.createElement('img');
  logoImg.src = imgsrc;
  logoImg.onclick = processFunction;
  logo.appendChild(logoImg);
  var label = document.createElement('a');
  label.href = '#';
  label.className = 'label';
  label.textContent = name;
  label.onclick = processFunction;
  container.appendChild(logo);
  container.appendChild(label);
  return container;
}

DivFactory.createSearchbar = function(){
  var searchbar = document.createElement('div');
  searchbar.className = 'search-bar';
  var searchbarForm = document.createElement('form');
  var inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.required = true;
  inputText.placeholder = 'Name of artist...';
  var submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Search';
  searchbarForm.appendChild(inputText);
  searchbarForm.appendChild(submit);
  searchbarForm.onsubmit = function() {
    var request = new ArtistRequest();
    request.search(this.elements[0].value, null, Handler.processSearch);
    inputText.value = '';
    return false;
  }
  searchbar.appendChild(searchbarForm);
  return searchbar;
}

DivFactory.createPagination = function(currentPage, totalPages, processFunction){
  var firstPage = currentPage - 3;
  var lastPage = currentPage + 3;
  if ( firstPage < 1) {
    lastPage += (-firstPage + 1);
    firstPage = 1;
  }
  if (lastPage > totalPages){
    lastPage = totalPages;
  }
  var pagination = document.createElement('div');
  pagination.className = 'pagination';
  for (var i = firstPage; i <= lastPage; i++){
    var page = null;
    if ( i == currentPage) {
      page = document.createElement('span');

    } else {
      page = document.createElement('a');
      page.href = '#';
      page.onclick = processFunction;
    }
    page.textContent = i;
    page.className = 'page';
    pagination.appendChild(page);
  }
  return pagination;
}

DivFactory.createWrapper = function(name, numberLikes){
  var wrapper =  document.createElement('div');
  wrapper.className = 'wrapper';
  var nameDiv = document.createElement('div');
  nameDiv.className = 'name';
  nameDiv.textContent = name;

  wrapper.appendChild(nameDiv);

  var likesDiv = document.createElement('div');
  likesDiv.className = 'likes';
  for (var i = 0; i < 5; i++){
    var like = document.createElement('a');
    like.href = '#';
    if ( i < numberLikes) {
      like.className = 'like';
    } else {
      like.className = 'dislike';
    }
    likesDiv.appendChild(like);
  }

  wrapper.appendChild(likesDiv);
  return wrapper;
}

DivFactory.createDescription = function(imgsrc){
  var description = document.createElement('div');
  description.className = 'description';
  var img = document.createElement('img');
  img.src = imgsrc;
  description.appendChild(img);
  return description;
}
