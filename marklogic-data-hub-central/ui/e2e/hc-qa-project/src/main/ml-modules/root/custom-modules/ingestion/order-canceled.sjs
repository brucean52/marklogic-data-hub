declareUpdate();

var canceledOrders = ['10250', '10255']
var uris; // an array of URIs (may only be one) being processed
var content; // an array of objects for each document being processed
var options; // the options object passed to the step by DHF
var flowName; // the name of the flow being processed
var stepNumber; // the index of the step within the flow being processed; the first step has a step number of 1
var step; // the step definition object


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
