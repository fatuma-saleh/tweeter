$(document).ready(function() {

const $timeAgo = timeago.format(new Date()); 
let $timeAgoComponent = $('article footer section.time-ago');
$timeAgoComponent.text($timeAgo);

});