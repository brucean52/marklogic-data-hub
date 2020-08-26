declareUpdate();

const content;
const canceledOrders = ['10250', '10255']

var orderCollection;

content
  .forEach(content => {
    const order = content.value;
    const instance = order.envelope.instance;

    if (canceledOrders.includes(instance.OrderID)) {
      const orderUri = xdmp.nodeUri(content);
      const canceledUri = "/cancel/" + sem.uuidString() + orderUri;
      xdmp.documentInsert(canceledUri, content, xdmp.documentGetPermissions(orderUri), orderCollection);
      xdmp.documentDelete(orderUri);
    }
  });
