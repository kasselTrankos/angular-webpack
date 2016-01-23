export default class TwitterTextFilter{

  constructor () {
    return (input) => {
      return input
        .replace(/[\n\r]/g, '<br />')
        .replace(/\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim, ' <a href="$&" target="blank">$&</a>')
        .replace(/(^|[^\/])(www\.[\S]+(\b|$))/gim, '<a target="_blank" href="http://$2">$2</a>')
        .replace(/@([a-z\d_]+)/ig, ' <a href="http://www.twitter.com/$1" target="blank">@$1</a>')
        .replace(/(^|\s)#(\w+)/g, ' <a href="https://twitter.com/hashtag/$2?src=hash" target="blank">#$2</a>');

    }
  }
}
