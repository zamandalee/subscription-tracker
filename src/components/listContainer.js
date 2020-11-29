import { Component } from 'react';
import ListFilters from './listFilters.js';
import DisplayedList from './displayedList.js';
import '../assets/listContainer.css';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      categoryFilter: 'none', // if categoryFilter is enacted eg: 'entertainment'
      priceFilter: 'none', // if priceFilter is enacted eg: { lowerBound: 0, upperBound: 12 }
      nameSortDir: 'none' // if nameSortDir is enacted eg: 'asc' or 'desc'
    }

    this.handleCategoryFilter = this.handleCategoryFilter.bind(this)
    this.handlePriceFilter = this.handlePriceFilter.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.filter = this.filter.bind(this)
    this.sort = this.sort.bind(this)
  }

  handleCategoryFilter(category) {
    this.setState(
      { categoryFilter: category },
      () => { this.setState({ items: this.filter(this.props.items) }) }
    );
  }

  handlePriceFilter(price) {
    this.setState(
      { priceFilter: price },
      () => { this.setState({ items: this.filter(this.props.items) }) }
    );
  }

  handleSort(nameSortDir) {
    this.setState(
      { nameSortDir },
      () => this.setState({ items: this.sort(this.state.items) })
    );
  }

  filter(items) {
    // Filter items according to the selected filter(s) saved in this.state
    const { categoryFilter, priceFilter } = this.state;

    return items.filter(item => {
      const includedCategory = categoryFilter === 'none' || item.category === categoryFilter;
      const includedPrice = priceFilter === 'none' || (
        item.price >= priceFilter.lowerBound && item.price < priceFilter.upperBound
      );
      // debugger
      return includedCategory && includedPrice;
    });
  }

  sort(items) {
    // Sort items by name according to the selected sort direction
    const { nameSortDir } = this.state;

    if (nameSortDir === 'desc') {
      return items.sort((a, b) => (a.name - b.name)); // A-Z
    } else if (nameSortDir === 'asc') {
      debugger
      return items.sort((a, b) => (b.name - a.name)); // Z-A
    }
    return items; // Unsorted
  }

  render() {
    debugger
    return (
      <div className="">
        <ListFilters
          handleCategoryFilter={this.handleCategoryFilter}
          handlePriceFilter={this.handlePriceFilter}
          handleSort={this.handleSort} />
        <DisplayedList items={this.state.items} />
      </div>
    );
  }
}

export default ListContainer;
