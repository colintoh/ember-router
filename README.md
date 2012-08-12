
Naming Convention in Ember.js
=============================

There are certain naming convention that Ember employed so that views are automagically binded to the controllers.

Lets say you are routing to "/bomb" and the parameter passed for connectOutlet method is "bomb". Ember will look for the BombView and also BombController object.


The In-built "content" Variable for Controllers
=================
All controllers will have a "content" variable. This content variable will be used for setting values in the BombView.

Passing dynamic parameters
======

Let's say we want to build a URL that is #/post/:postname

In order to pass the _:postname_ parameter, we will call router.transitionTo('post',_context_)

_context_ refers to the object that contains the variable postname.