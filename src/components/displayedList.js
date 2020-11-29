const DisplayedList = props => {
  let listItems = <div className="empty-list">No subscriptions match these criteria — try adjusting the filters to see more results! </div>

  if (props.items.length > 0) {
    listItems = props.items.map(item => (
      <ListItem key={item.id} item={item} />
    ));
  }

  return(
    <div className="list-items">
      {listItems}
    </div>
  )
}

const ListItem = props => {
  const { name, img, category, price, priceCategory } = props.item;
  return (
    <div className="flex-between list-item">
      <div className="flex-start">
        <img className="item-logo" src={img} alt={`${name} logo`} />
        <div className="flex-col-start item-text">
          <div className="item-name">{name}</div>
          <div className="flex item-tags">
            <div className={`item-tag ${category}-cat`}>{category}</div>
            <div className={`item-tag ${priceCategory}-price`}>${price} / month</div>
          </div>
        </div>
      </div>

      <i className="fas fa-flag item-flag"></i>
    </div>
  )
}

export default DisplayedList;
