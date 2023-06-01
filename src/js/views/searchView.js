class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement['search'].value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement['search'].value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
