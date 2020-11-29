import { Component } from 'react';
import ListFilters from './listFilters.js';
import DisplayedList from './displayedList.js';
import '../assets/listContainer.css';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFilter: 'none', // if categoryFilter is enacted eg: 'entertainment'
      priceFilter: 'none', // if priceFilter is enacted eg: { lowerBound: 0, upperBound: 12 }
      nameSortDir: 'none' // if nameSortDir is enacted eg: 'asc' or 'desc'
    }
  }

  handleCategoryFilter = (category) => {
    this.setState({ categoryFilter: category });
  }

  handlePriceFilter = (price) => {
    this.setState({ priceFilter: price });
  }

  handleSort = (nameSortDir) => {
    this.setState({ nameSortDir });
  }

  filter = (items) => {
    // Filter items according to the selected filter(s) saved in this.state
    const { categoryFilter, priceFilter } = this.state;

    return items.filter(item => {
      const categoryIncluded = categoryFilter === 'none' || item.category === categoryFilter;
      const priceIncluded = priceFilter === 'none' || (
        item.price >= JSON.parse(priceFilter).lowerBound && item.price < JSON.parse(priceFilter).upperBound
      );
      return categoryIncluded && priceIncluded;
    })
  }

  sort = (items) => {
    // Sort items by name according to the selected sort direction
    const { nameSortDir } = this.state;

    if (nameSortDir === 'desc') {
      return items.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)); // A-Z
    } else if (nameSortDir === 'asc') {
      return items.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1)); // Z-A
    }
    return items; // Unsorted
  }

  render() {
    const filteredItems = this.filter(this.props.items);
    // const filteredItems = this.props.items.filter(this.filterItem);
    const items = this.sort(filteredItems);

    return (
      <div className="">
        <ListFilters
          handleCategoryFilter={this.handleCategoryFilter}
          handlePriceFilter={this.handlePriceFilter}
          handleSort={this.handleSort} />
        <DisplayedList items={items} />
      </div>
    );
  }
}

export default ListContainer;
