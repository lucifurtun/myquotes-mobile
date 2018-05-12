import Constants from '../constants';

export default class URL {
  static base = 'https://myquotes.io/api/';
  static quotesUrl = 'https://myquotes.io/api/quotes/';
  static authorsUrl = 'https://myquotes.io/api/authors/';
  static categoriesUrl = 'https://myquotes.io/api/categories/';
  static tagsUrl = 'https://myquotes.io/api/tags/';

  filter = null;

  constructor() {
    this.filter = null
  }

  quotes(page) {
    let url = URL.quotesUrl + '?page_size=' + Constants.quotesPerPage + '&page=' + page
    if (this.filter) {
      url += this.filter
    }

    return url
  }

  updateFilter(newFilter) {
    if (this.filter) {
      this.filter += newFilter
    } else {
      this.filter = newFilter
    }
  }

  updateFilterUrl(properties, propertyType) {
    let filterUrl = ''

    properties.forEach( function(property) {
      if (property.isSelected) {
        filterUrl += '&' + propertyType + '=' + property.id
      }
    });

    if (filterUrl !== '') {
      this.updateFilter(filterUrl)
      return true
    }

    return false
  }

}
