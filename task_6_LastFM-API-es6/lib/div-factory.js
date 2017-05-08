"use strict"
class DivFactory {

  static createContainer(imgsrc, name, processFunction) {
    let container = document.createElement('div');
    container.className = 'container';
    let logo = document.createElement('a');
    logo.className = 'logo';
    logo.href = '#';
    let logoImg = document.createElement('img');
    logoImg.src = imgsrc;
    logoImg.onclick = processFunction;
    logo.appendChild(logoImg);
    let label = document.createElement('a');
    label.href = '#';
    label.className = 'label';
    label.textContent = name;
    label.onclick = processFunction;
    container.appendChild(logo);
    container.appendChild(label);
    return container;
  }

  static createSearchbar() {
    let searchbar = document.createElement('div');
    searchbar.className = 'search-bar';
    let searchbarForm = document.createElement('form');
    let inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.required = true;
    inputText.placeholder = 'Name of artist...';
    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Search';
    searchbarForm.appendChild(inputText);
    searchbarForm.appendChild(submit);
    searchbarForm.onsubmit = () => {
      let request = new ArtistRequest();
      request.search(searchbarForm.elements[0].value, null, Handler.processSearch);
      inputText.value = '';
      return false;
    }
    searchbar.appendChild(searchbarForm);
    return searchbar;
  }

  static createPagination(currentPage, totalPages, processFunction) {
    let firstPage = currentPage - 3;
    let lastPage = currentPage + 3;
    if (firstPage < 1) {
      lastPage += (-firstPage + 1);
      firstPage = 1;
    }
    if (lastPage > totalPages) {
      lastPage = totalPages;
    }
    let pagination = document.createElement('div');
    pagination.className = 'pagination';
    for (let i = firstPage; i <= lastPage; i++) {
      let page = null;
      if (i == currentPage) {
        page = document.createElement('span');

      } else {
        page = document.createElement('a');
        page.href = '#';
        page.onclick = ()=> {
          processFunction(page);
        };
      }
      page.textContent = i;
      page.className = 'page';
      pagination.appendChild(page);
    }
    return pagination;
  }

  static createWrapper(name, numberLikes) {
    let wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    let nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = name;

    wrapper.appendChild(nameDiv);

    let likesDiv = document.createElement('div');
    likesDiv.className = 'likes';
    for (let i = 0; i < 5; i++) {
      let like = document.createElement('a');
      like.href = '#';
      if (i < numberLikes) {
        like.className = 'like';
      } else {
        like.className = 'dislike';
      }
      likesDiv.appendChild(like);
    }

    wrapper.appendChild(likesDiv);
    return wrapper;
  }

  static createDescription(imgsrc) {
    let description = document.createElement('div');
    description.className = 'description';
    let img = document.createElement('img');
    img.src = imgsrc;
    description.appendChild(img);
    return description;
  }
}
