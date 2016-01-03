$(document).ready(function() {
  $('#search-icon').on('click', Wikipedia.initiateSearch);
  $('#random').on('click', Wikipedia.initiateRandom);
});

// state
Wikipedia = {};
Wikipedia.searchInitiated = false;
Wikipedia.apiInfo = {'baseUrl': "http://en.wikipedia.org/w/api.php"};

// functions
Wikipedia.initiateSearch = function() {
  if (Wikipedia.searchInitiated) {
  } else {
    Wikipedia.searchInitiated = true;
    Wikipedia.removeLargeMargin();
    Wikipedia.removeSearchPrompt();
    Wikipedia.addSearchInput();
    Wikipedia.setUpSearchInput();
  }
};
Wikipedia.setUpSearchInput = function() {
  $('#search-input').focus();
    Wikipedia.addSearchInputListener();
};
Wikipedia.removeLargeMargin = function() {
  $('#search-icon').removeClass('large-margin');
  $('#search-icon').addClass('small-margin');
};
Wikipedia.removeSearchPrompt = function() {
  $('.initial-prompt').remove();
};
Wikipedia.addSearchInput = function() {
  $('#search-com').find('.col-md-3').append(Wikipedia.searchInput());
};
Wikipedia.searchInput = function() {
  return '<input id="search-input" class="text-center form-control" type="text">'
};
Wikipedia.addSearchInputListener = function() {
  $('#search-input').on('keypress', function(e) {
    var searchQuery = $('#search-input').val();
    if (e.key === "Enter" && searchQuery.length > 0) {
      $('.results').remove();
      Wikipedia.executeSearch(searchQuery);
    }
  });
};
Wikipedia.executeSearch = function(searchQuery) {
  var completeAPI = Wikipedia.apiInfo.preconfiguredUrl() + encodeURIComponent(searchQuery) + "&callback=?";
  Wikipedia.dispatchSearch(completeAPI);
};
Wikipedia.apiInfo.preconfiguredUrl = function() {
  return Wikipedia.apiInfo.baseUrl + "?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
};
Wikipedia.dispatchSearch = function(apiEndpoint) {
  var options = {dataType: "jsonp", type: "GET", url: apiEndpoint};

  $.ajax(options)
    .done(function(data) {
      var results = data.query.pages || data.query.random;
      Wikipedia.renderResults(results);
    })
    .fail(function(data) {
      console.log(data);
    });
};
Wikipedia.renderResults = function(results) {
  $('.container').append('<div class="results"></div>');

  for (page in results) {
    if (results.hasOwnProperty(page)) {
      Wikipedia.renderResult(results[page]);
    }
  }
};
Wikipedia.renderResult = function(result) {
  var htmlSnippet = Wikipedia.resultHtml(result);
  $('.results').append(htmlSnippet);
};
Wikipedia.resultHtml = function(result) {
  return `<div class="panel panel-default">
    <div class="panel-heading">
      <a href="${Wikipedia.pageUrl(result)}"><h3 class="panel-title">${result.title}</h3></a>
    </div>
    <div class="panel-body">
      ${result.extract}
    </div>
  </div>`
};
Wikipedia.pageUrl = function(result) {
  return "http://en.wikipedia.org/?curid=" + result.pageid
};
Wikipedia.initiateRandom = function(e) {
  e.preventDefault();
  Wikipedia.initiateSearch();
  Wikipedia.getRandom();
};
Wikipedia.getRandom = function() {
  var randomApi = "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&format=json"
  Wikipedia.dispatchSearch(randomApi);
};
