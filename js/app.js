$(document).ready(function() {

$(function(){
  $('#search').submit(function(event){
    event.preventDefault();
    $('.body-main-wrap').hide();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
    $('#query').val('');
  });
});

function getRequest(searchableString){
  var key = 'AIzaSyB4nXx6bcBZjW467eSU1Q0b_LBkdl7d8qs';
  var params = {
    part: 'snippet',
    key: key,
    q: searchableString,
    maxResults: 10,
    order: 'viewCount'
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    showResults(data.items);
  });
}

function showResults(results){
  $.each(results, function(index, value){
    var channelHref = 'https://www.youtube.com/channel/';
    var videoHref = 'https://www.youtube.com/watch?v=';
    var html = $('#template').html()
      .replace(/{{title}}/g, value.snippet.title)
      .replace(/{{channel}}/g, value.snippet.channelTitle)
      .replace(/{{hrefChannel}}/g, (channelHref + value.snippet.channelId))
      .replace(/{{imageSource}}/g, value.snippet.thumbnails.high.url)
      .replace(/{{href}}/g, (videoHref + value.id.videoId));
      $('.results-wrap').append(html);
  });
}

$('#logo').click( function(){
  location.reload(true);
});

















});