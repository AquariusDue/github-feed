"use strict";

var rePushEvent = /(\w+\/)/g;

var githubFeedData = $.ajax({
  url: github_object.ajax_url,
  type: 'get',
  data: {
    action: 'github_display_feed'
  }
})
.done(function(data) {
  var githubParsedData = JSON.parse(data);
  for (var githubFeedCount = 0; githubFeedCount <= 3; githubFeedCount++) {
    if (githubParsedData[githubFeedCount]["type"]) {
      $('.github-widget').append('<div class="github-profile-summary ' + githubFeedCount + '">');
      $('.github-profile-summary.' + githubFeedCount).append('<div class="github-time ' + githubFeedCount + '">');
      $('.github-time.' + githubFeedCount).append('<time class="' + githubFeedCount + '">' + moment(githubParsedData[githubFeedCount]["created_at"]).fromNow() + '</time>');
      if (githubParsedData[githubFeedCount]["type"] == "WatchEvent") {
        $('.github-profile-summary.' + githubFeedCount).append('<div class="github-activity ' + githubFeedCount + '">');
        $('.github-activity.' + githubFeedCount).append('<p>' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["actor"]["login"] + '">' + githubParsedData[githubFeedCount]["actor"]["login"] + '</a>' + ' starred ' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["repo"]["name"] + '">' + githubParsedData[githubFeedCount]["repo"]["name"] + '</a>' + '</p>')
      } else if (githubParsedData[githubFeedCount]["type"] == "CreateEvent" && githubParsedData[githubFeedCount]["payload"]["ref"] !== null) {
        $('.github-profile-summary.' + githubFeedCount).append('<div class="github-activity ' + githubFeedCount + '">');
        $('.github-activity.' + githubFeedCount).append('<p>' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["actor"]["login"] + '">' + githubParsedData[githubFeedCount]["actor"]["login"] + '</a>' + ' created branch ' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["repo"]["name"] + '/tree/' + githubParsedData[githubFeedCount]["payload"]["ref"] + '">' + githubParsedData[githubFeedCount]["payload"]["ref"] + '</a>' + ' at ' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["repo"]["name"] + '">' + githubParsedData[githubFeedCount]["repo"]["name"] + '</a>' + '</p>');
      } else if (githubParsedData[githubFeedCount]["type"] == "CreateEvent" && githubParsedData[githubFeedCount]["payload"]["ref"] == null) {
        $('.github-profile-summary.' + githubFeedCount).append('<div class="github-activity ' + githubFeedCount + '">');
        $('.github-activity.' + githubFeedCount).append('<p>' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["actor"]["login"] + '">' + githubParsedData[githubFeedCount]["actor"]["login"] + '</a>' + ' created repository ' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["repo"]["name"] + '">' + githubParsedData[githubFeedCount]["repo"]["name"] + '</a>' + '</p>');
      } else if (githubParsedData[githubFeedCount]["type"] == "PushEvent") {
        $('.github-profile-summary.' + githubFeedCount).append('<div class="github-activity ' + githubFeedCount + '">');
        $('.github-activity.' + githubFeedCount).append('<p>' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["actor"]["login"] + '">' + githubParsedData[githubFeedCount]["actor"]["login"] + '</a>' + ' pushed to ' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["repo"]["name"] + '/tree/' + githubParsedData[githubFeedCount]["payload"]["ref"].replace(rePushEvent, "") + '">' + githubParsedData[githubFeedCount]["payload"]["ref"].replace(rePushEvent, "") + '</a>' + ' at ' + '<a href="https://github.com/' + githubParsedData[githubFeedCount]["repo"]["name"] + '">' + githubParsedData[githubFeedCount]["repo"]["name"] + '</a>' + '</p>');
        $('.github-profile-summary.' + githubFeedCount).append('<div class="github-details ' + githubFeedCount + '">');
        $('.github-details.' + githubFeedCount).append('<a class="github-profile-picture" href="https://github.com/' + githubParsedData[githubFeedCount]["actor"]["login"] + '">' + '<img src="' + githubParsedData[githubFeedCount]["actor"]["avatar_url"] + '">');
        $('.github-details.' + githubFeedCount).append('<ul class="github-commit-list ' + githubFeedCount + '">');
        for (var githubFeedCommitCount = 0; githubFeedCommitCount < githubParsedData[githubFeedCount]["payload"]["commits"].length; githubFeedCommitCount++) {
          $('.github-commit-list.' + githubFeedCount).append('<li class="github-commit ' + githubFeedCommitCount + '">');
          $('.github-commit.' + githubFeedCommitCount).append('<a href="https://github.com/' + githubParsedData[githubFeedCount]["repo"]["name"] + '/commit/' + githubParsedData[githubFeedCount]["payload"]["commits"][githubFeedCommitCount]["sha"] + '">' + '<code>' + githubParsedData[githubFeedCount]["payload"]["commits"][githubFeedCommitCount]["sha"].slice(0, 6) + '</code>' + '</a>');
          $('.github-commit.' + githubFeedCommitCount).append('<p class="github-commit-message ib">' + githubParsedData[githubFeedCount]["payload"]["commits"][githubFeedCommitCount]["message"] + '</p>');
        }
      }
    } else {
      console.log(githubParsedData[githubFeedCount]["type"]);
    }
  }
})
