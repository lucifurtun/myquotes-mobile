import Constants from '../constants';

export default class URL {
  static base = 'https://myquotes.io/api/';
  static quotesUrl = URL.base + 'quotes/';
  static authorsUrl = URL.base + 'authors/';
  static categoriesUrl = URL.base + 'categories/';
  static tagsUrl = URL.base + 'tags/';

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
