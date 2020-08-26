declareUpdate();

const content;
let count = 0;

content
  .sort((a, b) => { return a.value.envelope.instance.Order.ShipVia - b.value.envelope.instance.Order.ShipVia })
  .forEach(content => {
    let contentValue = content.value.toObject();
    let priorityGroup = '';

    if (count < 3 ) {
      priorityGroup = 'A'
    } else if ( count < 6 ) {
      priorityGroup = 'B'
    } else {
      priorityGroup = 'C'
    }
    
    contentValue.envelope.headers.priorityGroup = priorityGroup;
    content.value = contentValue;
    count++;
  });
