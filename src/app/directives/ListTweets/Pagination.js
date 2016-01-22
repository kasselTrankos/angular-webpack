
export const Pagination = (elm, itemsPerPage, $filter)=>{
  const tweetDiv = angular.element(elm).find('div');
  const div = document.createElement('div');
  div.className='pagination';
  elm.append(div);
  return function(pagination, tweets, data){
    const pages = Pages(data.length, itemsPerPage);
    //buena idea sacada de funcional si no existe ( es NAN), quizas aplicar
    // exists, jijij
    if(pages){
      tweets.call(null, tweetDiv, itemsPerPage, data, $filter);
      pagination.call(null, pages, div);


    }
    console.log(pages);
  }

}
export const htmlTweets = (container, limit, tweets, $filter, begin=0)=>{
  for(var i = begin ; i<parseInt(begin+limit); i++){
    let div = document.createElement('div');
    div.className = 'tweet md-caption';
    let p = document.createElement('p');
    p.innerHTML = $filter('twitterText')(tweets[i].text);
    angular.element(div).append(p);
    angular.element(container).append(div);
  }
}
export const Pages = (items, itemsPerPage)=>{
  return Math.ceil(items/itemsPerPage);
}
export const htmlPagination = (pages, container, showOnly = 5, actual=1)=>{
  ///claro primero elimino// si existe claro(de nuevo exists ayy cuanto sabe ese tio)
  if(container.firstChild) container.removeChild(container.firstChild);
  const ul = document.createElement('ul');
  angular.element(container).append(ul);
  const end = (pages>showOnly) ? showOnly : pages;
  for(let i=1; i<=end; i++){
    let li = document.createElement('li');;
    let a = document.createElement('a');
    if(i===actual) a.className = 'active';
    a.textContent = i;
    angular.element(ul).append(li);
    angular.element(li).append(a);
  }
}
