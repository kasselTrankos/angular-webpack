//////////////falta pues ahora entrar al socket, por lo que veo:
// - necesito que cuando por socket añade un nuevo tweet, update sin cambiar de página
// - mas limpio y elegante codigo
// - buscar reducir variables
export const Pagination = (...args)=>{
  const [elm, itemsPerPage, showOnly, $filter] = args;
  const ItemsPerPage = itemsPerPage || 10;
  const ShowOnly = showOnly || 10;
  const tweetDiv = angular.element(elm).find('div');
  const div = document.createElement('div');
  div.className='pagination';
  elm.append(div);
  return function(pagination, tweets, data){
    const pages = Pages(data.length, itemsPerPage);
    //buena idea sacada de funcional si no existe ( es NAN), quizas aplicar
    // exists, jijij
    if(pages){
      const click = gotoPage(tweetDiv, ItemsPerPage, data, $filter, pages, angular.element(div), ShowOnly);
      tweets.call(null, tweetDiv, ItemsPerPage, data, $filter);
      pagination.call(null, pages, div, click, 1, ShowOnly);
    }
  }
}

export const gotoPage = (container, limit, tweets, $filter, pages, div, showOnly)=>{
  return (page, func)=>{
    cleanContainer(container, 'div');
    cleanContainer(div, 'ul');
    let next = (page<1) ? 0 : parseInt(page-1);
    if(next>pages) next = pages;
    htmlTweets(container, limit, tweets, $filter, next);
    htmlPagination( pages, div, func, page, showOnly);

  }
}

export const cleanContainer = (container, name)=>{
  ///claro primero elimino// si existe claro(de nuevo exists ayy cuanto sabe ese tio)
  container.find(name).remove();
}

export const htmlTweets = (container, limit, tweets, $filter, begin=0)=>{
  const start = parseInt(begin*limit);
  let end = parseInt((++begin)*limit);
  if(end>tweets.length) end = tweets.length;
  console.log(start, end);
  for(var i = start  ; i<end; i++){
    let div = document.createElement('div');
    div.className = 'tweet md-caption';
    let p = document.createElement('p');
    let img = document.createElement('img');
    //console.log(tweets[i], ' oque pasa?');
    img.setAttribute('src', tweets[i].user.profile_image_url);
    img.className = 'circle';
    p.innerHTML = $filter('twitterText')(tweets[i].text);

    angular.element(div).append(img);
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
  ///aqui debo revisar esta logica llevarla a otro lado
  // este metodo contiene demasiada responsabilidad
  const pager = parseInt((showOnly/2)+actual);
  let end = (actual<parseInt(showOnly/2)) ? showOnly : actual+parseInt(showOnly/2);
  if(pages<pager) end = pages;
  let first = (actual>=parseInt(showOnly/2))? parseInt(actual-parseInt(showOnly/2)) :  1;
  if(pages<pager) first = pages-showOnly;
  if(first<=1) first = 1;

  HtmlPrevButtons(ul, actual, showOnly, first, click);
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
  HtmlNextButtons(ul, actual, showOnly, pages, click);
}

export const HtmlNextButtons = (...args)=>{
  const [ul, actual, showOnly, pages, click] = args;
  let next = cloneNumber(actual);
  const pager = Pager(actual, showOnly);
  if(pages>pager && pager<pages && pages>showOnly){
    CreateButton(ul, '...', NextBlockPager(actual, showOnly), click);
    CreateButton(ul, '›', ++next, click);
    CreateButton(ul, '»', pages, click);
  }
}
export const HtmlPrevButtons = (...args)=>{
  const [ul, actual, showOnly, first, click] = args;
  let next = cloneNumber(actual);
  if(actual>MiddleCounter(showOnly)+1 && first>1){
    CreateButton(ul, '«', 1, click);
    CreateButton(ul, '‹', --next, click);
    CreateButton(ul, '...', parseInt(actual-showOnly), click);
  }
}
export const MiddleCounter = (showOnly)=>parseInt(showOnly/2);
export const cloneNumber = (value)=> Number(value);
export const Pager = (actual, showOnly)=> parseInt((showOnly/2)+actual);
export const NextBlockPager = (actual, showOnly)=>parseInt(actual+showOnly);

export const CreateButton = (...args)=>{
  const [container, text, next, click] = args;
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.innerHTML = text;
  a.addEventListener('click', ()=>{
    click.call(null, next, click);//no mola reinjectar la funcions,,,,,
  })
  angular.element(container).append(li);
  angular.element(li).append(a);
}
