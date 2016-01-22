export const Pagination = (elm)=>{
  console.log(elm);
  var div = document.createElement('div');
  div.setAttribute('layout', 'row');
  div.setAttribute('layout-xs', 'column');
  elm.append(div);
}
export const getPages = (items, itemsPerPage)=>{
  console.log(items.length, itemsPerPage);
  return Math.ceil(items.length/itemsPerPage);
}
