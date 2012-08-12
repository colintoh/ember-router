////////////////////////////////
// Naming Convention in Ember.js
////////////////////////////////

// There are certain naming convention that Ember employed so that data are automagically binded to the view and controller.
//
// Lets say you are routing to "posts" and the parameter passed for connectOutlet method is "bomb". Ember will look for the BombView and also BombController object.
// All controllers will have a "content" variable. This content variable will be used for setting values in the BombView.



//////////////////////////////////////////////////
//Create the Namespace and init the routing system
//////////////////////////////////////////////////

App = Ember.Application.create({
  Router: Ember.Router.extend({
    root: Ember.Route.extend({
      index: Em.Route.extend({
        route: '/',
        redirectsTo: 'posts'
      }),
      posts:Em.Route.extend({
        route:'/posts',
        showPost:function(router,event){
          /* I need to pass the context into the post view so i can't use Em.Route.transitionTo()*/
          router.transitionTo('post',event.context);
        },
        connectOutlets:function(router){
          router.get('applicationController').connectOutlet('posts');
        }
      }),
      post:Em.Route.extend({
        /*Dynamic parameters*/
        route:'/post/:name',
        connectOutlets:function(router,post){
          /* This will set the content variable in PostController which is already automagical bind to the PostView */
          router.get('applicationController').connectOutlet('post',post);
        }
      }),
      createPost:Em.Route.extend({
        route:'/create',
        connectOutlets:function(router){
          router.get('applicationController').connectOutlet('createpost');
        },
        save: function(router){
          var name = $('#gg').val();
          var desc = $('#description').val();
          router.get('postsController').pushObjects({'name':name,'desc':desc});
          router.transitionTo('posts');
        }
      }),
      create: Em.Route.transitionTo('createPost'),
      goHome: Em.Route.transitionTo('posts')
    })
  })
});



//////////////////////////////////////////
// Initialize all the controllers and views
//////////////////////////////////////////


// Em.Controller is not in the API, I have no idea why. But I need this for using {{outlet}}
App.ApplicationController = Em.Controller.extend();

// Main Application View
App.ApplicationView = Em.View.extend({
  templateName:'application'
});

// All Post View
App.PostsView = Em.View.extend({
  templateName:'posts'
});

// All Post Controller
App.PostsController = Em.ArrayController.extend({
  content:[]
});

// Single Post View
App.PostView = Em.View.extend({
  templateName:'post'
});

// Single Post Controller
App.PostController = Em.Object.extend();

// Header View
App.HeaderView = Ember.View.extend({
    templateName: 'header'
});

// Create Post View
App.CreatepostView = Em.View.extend({
  templateName:'create-post'
});

// Instantiate all controllers currently available on the namespace and inject them onto a router.
App.initialize();