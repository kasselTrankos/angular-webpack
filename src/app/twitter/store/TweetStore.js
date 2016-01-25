export const TweetStore =(data)=>{
  const store = data;
  return {
    append: (item)=>{
      console.log(item, ' element added to front page');
      store.unshift(item);
    },
    remove: (data)=>{

    }
  }
}
