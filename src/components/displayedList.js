const DisplayedList = props => {
  const { items, infrequentItems, toggleInfrequent, isInfrequentList } = props;
  debugger

  let listItems = <div className="empty-list">No subscriptions match this criteria.</div>
  if (items.length > 0) {
    listItems = items.map(item => {
      const isInfrequent = isInfrequentList || infrequentItems.findIndex(infreq => infreq.id === item.id) >= 0;

      return <ListItem key={item.id}
        item={item}
        isInfrequent={isInfrequent}
        toggleInfrequent={toggleInfrequent} />
    });
  }

  return(
    <div className="list-items">
      {listItems}
    </div>
  )
}

const ListItem = props => {
  console.log(props)
  const { item, isInfrequent, toggleInfrequent } = props
  const { name, img, category, price, priceCategory } = item;

  const flagClass = isInfrequent ? 'flagged' : '';

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

      <i className={`fas fa-flag item-flag ${flagClass}`} onClick={() => toggleInfrequent(props.item)}></i>
    </div>
  )
}

export default DisplayedList;
