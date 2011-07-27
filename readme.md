This is the script for a 5 minute presentation on backbone.js

# Hello!
My name is Devin Hunt

I'm a YC alumn that started a company called Habit

Then I was a freelancer

And now.. I've started a company called Lyst

# Anyway...

# In the world of the modern, fancy web, a lot of our rich interaction happend like this:
* User does a thing
* Send a request to the serve
* Get the response
* Update the presentation

# This isn't great
As it can impede flow, slow and make some interfaces feel unresponsive. 

# Wouldn't this be nicer?
* User does a thing 
* Update the local model 
* Update the presentation
* Send a request to the server
* Update the model based on server's state

# Backbone.js makes this easy
Which is why

# I've got a (back)boner for Backbonne.js
Nice

# Backbone.js provides strucute to data rich web apps
This means you get:
    Backbone.Model and Backbone.Collection
    Client side representation of data models with rich enumeration, manipulation
    
    Backbone.View
    Standardize presnetation and interation with the data. Great event handling!
    
    Backbone.Router
    Controller you page state, make your application linkable
    
# And the best part
Is you can pick and choose as needed! 

# So anyway, let's make something already

# Let's say you need to make a presentation app

# Presnetations have slides
Slides for our app will have 
* A title
* HTML content
* Slide index (set automatically by the app)
window.Slide = Backbone.Model.extend({ <-- All our objects are created by extending the base backbone objects
                                       <-- No need to really do anything, this is a generic container
});

# We need a place to store our Slides
Thats where Backbone.Collection comes into play. 
window.SlideList = Backbone.Collection.extend({
    mode: Slide,                    <-- The model this collection creates, stores
    url: '/slides/',                <-- The url on our server that that Slides are synced to
});
Slides = new SlideList();           <-- And let's make a instance of this Slide store

# And now, we can start making slides easily!
firstSlide = Slides.create({
    title: 'Oh wow!',
    content: '<p>This is our very own slide</p>'
});

This is a powerful little statement. What happens here is
* The model is <firstSlide> created.
* It has an attribute 'title' set to 'Oh wow!'
* A ajax POST has be sent to /slides/ to create the resourse on the server
* In time, a response whould come back and the model would be updated as needed 

# So we've got a slide. Let's show it! 
SlideView = Backbone.View.extend({
    tagName: 'section',                                     <-- The type of DOM element we're going to render into
    className: 'slide',                                     <-- It's class. Backbone automatically creates the dom elements we need and store it in this.el
    template: _.template('<header><h1><%= title %></h1></header><div class="content"></div>'),  <-- Our slide template
    
    initialize: function() {
        this.model.view = this;                             <-- Provide a reference on our model to the view that represents it
        this.model.bind('change', this.render, this);       <-- Bind onto Backbone change events to we can automatically update the view to refelect the model
    },
    
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));<-- When render is called, we rerender our template into our DOM element
    }
});

# Oh wow!
This is our very own slide

At this time, open up the console (we're in the browser!) and change some firstSlide properties. 
Since our view is bound to our model, changing it changes the slide. It's a full MVC stack in JS

# So yeah, this whole presentation has been made in the Backbone.js powered app we just discussed. 

# All we need to finish it is a Backbone.View that controls the whole presentation
PresentationApp = Backbone.View.extend({
    el: $('body'),
    
    events: {
        
    },
    
    initialize: function() {
        Slides.bind('add', this.addSlide, this);
        Slides.bind('all', this.addSlide, render);
    },
    
    render: function() {
        
    },
    
    
});