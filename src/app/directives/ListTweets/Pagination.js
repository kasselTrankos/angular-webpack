
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
      const click = gotoPage(tweetDiv, itemsPerPage, data, $filter, pages, angular.element(div));
      tweets.call(null, tweetDiv, itemsPerPage, data, $filter);
      pagination.call(null, pages, div, click);
    }
  }
}

export const gotoPage = (container, limit, tweets, $filter, pages, div)=>{
  return (page, func)=>{
    cleanContainer(container, 'div');
    cleanContainer(div, 'ul');
    htmlTweets(container, limit, tweets, $filter, parseInt(page-1));
    htmlPagination( pages, div, func, page);

  }
}

export const cleanContainer = (container, name)=>{
  ///claro primero elimino// si existe claro(de nuevo exists ayy cuanto sabe ese tio)
  container.find(name).remove();
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
export const htmlPagination = (pages, container, click, actual=1, showOnly = 10)=>{

  const ul = document.createElement('ul');
  angular.element(container).append(ul);
  if(actual>parseInt(showOnly/2)){
    CreateButton(ul, '«', 1, click);
    CreateButton(ul, '‹', actual, click);
  }


  const pager = parseInt(showOnly+actual);
  let end = (actual<parseInt(showOnly/2)) ? showOnly : actual+parseInt(showOnly/2);
  if(pages<pager) end = pages;

  const first = (actual>=parseInt(showOnly/2))? actual-parseInt(showOnly/2) :  1;
  for(let i=first; i<=end; i++){
    let li = document.createElement('li');;
    let a = document.createElement('a');
    if(i===actual) a.className = 'active';
    a.textContent = i;
    a.addEventListener('click', ()=>{
      click.call(null, i, click);
    });
    angular.element(ul).append(li);
    angular.element(li).append(a);
  }
  if(pages>pager && pager<pages){
    CreateButton(ul, '...', parseInt(actual+showOnly), click);
    CreateButton(ul, '›', actual, click);
    CreateButton(ul, '»', pages, click);
  }
}

export const BeginPagination = ()=>{

}



export const CreateButton = (container, text, next, click)=>{
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.innerHTML = text;
  //no hay sentido debo buscar por que no puedo sumar y restar como variable
  if(text==='›') next++;
  if(text==='‹') next--;
  a.addEventListener('click', ()=>{
    click.call(null, next, click);//no mola reinjectar la funcions,,,,,
  })
  angular.element(container).append(li);
  angular.element(li).append(a);
}
