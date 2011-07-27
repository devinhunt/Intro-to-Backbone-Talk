/**
 * This is the quick Backbone App that powers a talk about making
 * this app.
 * http://hailpixel.com/backbone-talk
 * 
 * Copyright 2011, Devin Hunt
 * Use it however you want, brah.
 */
 
$(function() {
    
    window.Slide = Backbone.Model.extend({
        // nothing needed for now..
    });
    
    window.SlideCollection = Backbone.Collection.extend({
        model: Slide,
        localStorage: new Store("todos"),           // Using local storage for this example
    });
    
    window.Slides = new SlideCollection();
    
    window.SlideView = Backbone.View.extend({
        tagName: 'section',
        className: 'slide',
        template: _.template('<header><h1><%= title %></h1></header><div class="content"><%= content %></div>'),
        
        initialize: function() {
            this.model.view = this;
            this.model.bind('change', this.render, this);
        },
        
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    window.Presentor = Backbone.View.extend({
        el: $('#container'),
        
        currentSlide: 0,
                
        initialize: function() {
            Slides.bind('add', this.add, this);
            Slides.bind('all', this.render, this);
            $(document).keyup(_.bind(this.onKeyUp, this));
        },
        
        render: function() {
            // reflow the slides
            return this;
        },
        
        add: function(slide) {
            var view = new SlideView({model: slide});
            this.$('#main').append(view.render().el);
        },
        
        onKeyUp: function(event) {
            event.preventDefault();
            if(event.keyCode == 32) {
                this.currentSlide = Math.min(Slides.length, this.currentSlide + 1);
            } else if(event.keyCode == 8) {
                this.currentSlide = Math.max(0, this.currentSlide - 1);
            }
            slide = Slides.models[this.currentSlide];
            //console.log(this.currentSlide, slide, $(slide.view.el).offset());
        }
    });
    
    window.app = new Presentor();
    
    // bootstrap the current page content into the app.
    $('section.slide').each(function(index) {
        var jel = $(this);
        Slides.create({
            title: jel.find('h1').text(), 
            content: jel.find('.content').html()
        });
        jel.remove();
    });
    
    // and run, run like the wind!
    $(window).resize(function(event) {
        var h = $(window).height();
        $('.slide').css({height: h});
    }).resize();
});