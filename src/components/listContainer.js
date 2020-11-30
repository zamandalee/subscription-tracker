import { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import ListFilters from './listFilters.js';
import SubscriptionList from './subscriptionList.js';
import '../assets/listContainer.css';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFilter: 'none', // if categoryFilter is enacted eg: 'entertainment'
      priceFilter: 'none', // if priceFilter is enacted eg: { lowerBound: 0, upperBound: 12 }
      nameSortDir: 'none', // if nameSortDir is enacted eg: 'asc' or 'desc'
      infrequentItems: [],
      displayedList: 'all'
    }
  }

  // Filtering and sorting:
  handleCategoryFilter = category => {
    this.setState({ categoryFilter: category });
  }

  handlePriceFilter = price => {
    this.setState({ priceFilter: price });
  }

  handleSort = nameSortDir => {
    this.setState({ nameSortDir });
  }

  filter = items => {
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

  sort = items => {
    // Sort items by name according to the selected sort direction
    const { nameSortDir } = this.state;

    if (nameSortDir === 'desc') {
      return items.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)); // A-Z
    } else if (nameSortDir === 'asc') {
      return items.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1)); // Z-A
    }
    return items; // Unsorted
  }

  // Marking infrequent:
  toggleInfrequent = item => {
    const { infrequentItems } = this.state;
    const infrequentIdx = infrequentItems.findIndex(infreq => infreq.id === item.id)

    if (infrequentIdx >= 0) {
      // Currently marked infrequent, remove from infrequent list
      this.setState({ infrequentItems: infrequentItems.filter(infreq => infreq.id !== item.id) })
    } else {
      // Not currently marked infrequent, add to infrequent list
      this.setState({ infrequentItems: infrequentItems.concat(item) })
    }
  }

  // Selecting a list tab:
  handleSelectList = listName => {
    this.setState({ displayedList: listName });
  }

  renderSelectedList = items => {
    // Render either the filters and all subscriptions, or the infrequently used subscriptions and their summed cost
    const { categoryFilter, priceFilter, nameSortDir, infrequentItems, displayedList } = this.state;

    if (displayedList === 'all') {
      return (
        <div>
          <ListFilters
            category={categoryFilter}
            price={priceFilter}
            sortDir={nameSortDir}
            handleCategoryFilter={this.handleCategoryFilter}
            handlePriceFilter={this.handlePriceFilter}
            handleSort={this.handleSort} />
          <SubscriptionList
            items={items}
            infrequentItems={infrequentItems}
            toggleInfrequent={this.toggleInfrequent} />
        </div>
      )
    } else {
      const infreqCost = infrequentItems.reduce((total, item) => total + item.price, 0);
      return (
        <div>
          <SubscriptionList
            items={infrequentItems}
            infrequentItems={infrequentItems}
            toggleInfrequent={this.toggleInfrequent}
            isInfrequentList={true} />
          <div className="infreq-cost"><span className="mid-navy">Total cost: </span>${infreqCost} / month</div>
        </div>
      )
    }
  }

  render() {
    const filteredItems = this.filter(this.props.items);
    const items = this.sort(filteredItems);

    const allSelectedClass = this.state.displayedList === 'all' ? 'selected' : ''
    const infreqSelectedClass = this.state.displayedList === 'infrequent' ? 'selected' : ''

    return (
      <div className="">
        <div className="flex-start list-tabs">
          <Tooltip title="All subscriptions" arrow>
            <div className={`list-tab shorter-tab ${allSelectedClass}`}
              onClick={() => this.handleSelectList('all')}>
              All</div>
          </Tooltip>
          <Tooltip title="Subscriptions marked infrequently used — consider cancelling!" arrow>
            <div className={`list-tab ${infreqSelectedClass}`}
              onClick={() => this.handleSelectList('infrequent')}>
              Infrequently used</div>
          </Tooltip>
        </div>

        {this.renderSelectedList(items)}
      </div>
    );
  }
}

export default ListContainer;
