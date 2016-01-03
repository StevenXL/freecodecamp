$(document).ready(function() {
  FCC.fetchAndRenderPosts();
});

FCC = {};
FCC.apiURL = "http://www.freecodecamp.com/news/hot";
FCC.fetchAndRenderPosts = function() {
  var options = {type: "GET", url: FCC.apiURL};
  $.ajax(options)
    .done(function(data) {
      FCC.renderPosts(data);
    })
    .fail(function(data) {
      console.log("AJAX request failed");
    });
};
FCC.renderPosts = function(posts) {
  // FCC.renderPosts is called first in case further data scrubbing is desired
  // in the future before rendering each post.
  posts.forEach(FCC.renderPost);
};
FCC.renderPost = function(post) {
  var htmlSnippet = FCC.renderHtml(post);
  $('#posts').append(htmlSnippet);
};
FCC.renderHtml = function(post) {
  // note use of template string
  return `<div class="panel panel-default panel-primary">
    <div class="panel-heading">
      <a href="${post.link}"><h3 class="panel-title">${post.headline}</h3></a>
    </div>
    <div class="panel-body">
      This post has received ${post.upVotes.length} upvotes.
    </div>
    <div class="panel-footer">
      Posted by: ${post.author.username}
      <img class="pull-right author-image" src="${post.author.picture}">
    </div>
  </div>`
};
