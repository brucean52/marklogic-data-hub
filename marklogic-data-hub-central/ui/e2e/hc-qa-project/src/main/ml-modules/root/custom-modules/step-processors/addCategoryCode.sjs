var contentArray;

contentArray.forEach(content => {
  // The entity-services-mapping step results in "value" being a node, so must call toObject first
  const contentValue = content.context.value.toObject();

  const employeeID = parseInt(contentValue.envelope.attachments.envelope.instance.EmployeeID);
  
  contentValue.envelope.headers.categoryCode = employeeID > 3 ? 'B' : 'A';

  content.context.value = contentValue;
})
