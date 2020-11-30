import { lowPriceObj, midPriceObj, highPriceObj } from './App.js';

const ListFilters = (props) => {
  const { category, price, sortDir, handleCategoryFilter, handlePriceFilter, handleSort } = props;

  return (
    <div className="list-filters">
      <label htmlFor="category">Filter by category:</label>
      <select name="category" value={category} onChange={e => handleCategoryFilter(e.target.value)}>
        <option value="none">All</option>
        <option value="ecommerce">E-commerce</option>
        <option value="health">Health</option>
        <option value="productivity">Productivity</option>
        <option value="reading">Reading</option>
        <option value="streaming">Streaming</option>
      </select>

      <label htmlFor="price">Filter by price:</label>
      <select name="price" value={price} onChange={e => handlePriceFilter(e.target.value)}>
        <option value="none">All</option>
        <option value={JSON.stringify(lowPriceObj)}>$0-11.99</option>
        <option value={JSON.stringify(midPriceObj)}>$12-29.99</option>
        <option value={JSON.stringify(highPriceObj)}>$30+</option>
      </select>

      <label htmlFor="sort">Sort by name:</label>
      <select name="sort" value={sortDir} onChange={e => handleSort(e.target.value)}>
        <option value="none">None</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default ListFilters;

