(function () {
  var post = null;

	Template.post_page.created = function () {
		post = Posts.findOne(Session.get('selectedPostId'));
	}

	Template.post_page.helpers({
		post: function(){
			return post;
		},
		body_formatted: function(){
			var converter = new Markdown.Converter();
			var html_body=converter.makeHtml(this.body);
			return html_body.autoLink();
		},
		canComment: function(){
			return canComment(Meteor.user());
		},
		canView: function(){
			return canView(Meteor.user());
		}
	}); 

	Template.post_page.rendered = function(){
		document.title = post.headline;
		if((scrollToCommentId=Session.get('scrollToCommentId')) && !this.rendered && $('#'+scrollToCommentId).exists()){
			scrollPageTo('#'+scrollToCommentId);
			Session.set('scrollToCommentId', null);
			this.rendered=true;
		}
	}
}());