var searchTerm = '';
var nextPageToken = '';

$(document).ready(function() {

$(function(){
  $('#search-header').submit(function(event){
    event.preventDefault();
    $('.result').empty();
    searchTerm = '';
    searchTerm += $('#query-header').val();
    getRequest(searchTerm);
    $('#query-header').val('');
  });
});

$(function(){
  $('#search').submit(function(event){
    event.preventDefault();
    $('.body-main-wrap').hide();
    searchTerm += $('#query').val();
    $('#search-header').show();
    getRequest(searchTerm);
    $('.get-more').show();
  });
});

$(function(){
  $('.get-more').click(function(event){
    event.preventDefault();
    console.log('button pressed');
    getRequest(searchTerm, nextPageToken);
  });
});

$('#logo').click( function(){
  location.reload(true);
});

$('#search-header').hide();
$('.get-more').hide();

});

function getRequest(searchableString, pageToken){
  var key = 'AIzaSyB4nXx6bcBZjW467eSU1Q0b_LBkdl7d8qs';
  var params = {
    part: 'snippet',
    key: key,
    q: searchableString,
    maxResults: 8,
    pageToken: pageToken,
    order: 'viewCount'
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    showResults(data.items);
    nextPageToken = (data.nextPageToken);
    console.log(nextPageToken);
  });
}

function showResults(results){
  $.each(results, function(index, value){
    var channelHref = 'http://www.youtube.com/channel/';
    var videoHref = 'http://www.youtube.com/watch?v=';
    var embededHref = 'http://www.youtube.com/embed/';
    var html = $('#template').html()
      .replace(/{{title}}/g, value.snippet.title)
      .replace(/{{channel}}/g, value.snippet.channelTitle)
      .replace(/{{hrefChannel}}/g, (channelHref + value.snippet.channelId))
      .replace(/{{imageSource}}/g, value.snippet.thumbnails.high.url)
      .replace(/{{href}}/g, (videoHref + value.id.videoId))
      .replace(/{{embedSource}}/g, embededHref + value.id.videoId);
      $('.results-wrap').append(html);
  });
}



