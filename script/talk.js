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
        initialize: function() {
            if(! this.get('title')) {
                this.set({title: 'Default Title'});
            }
        }
    });
    
    window.SlideCollection = Backbone.Collection.extend({
        model: Slide,
        localStorage: new Store("todos"),           // Using local storage for this example
    });
    
    window.Slides = new SlideCollection();
    
    window.SlideView = Backbone.View.extend({
        tagName: 'section',
        className: 'slide',
        template: _.template('<header><h1><%= title %></h1></header><div class="content"><%= content %></div><div class="counter"></div>'),
        
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
        
        events: {
            'click' : 'advance'
        },
                
        initialize: function() {
            Slides.bind('add', this.add, this);
            Slides.bind('all', this.render, this);
        },
        
        render: function() {
            $('.slide-counter .current').text(this.currentSlide + 1);
            $('.slide-counter .total').text(Slides.length);
        },
        
        add: function(slide) {
            var view = new SlideView({model: slide});
            this.$('#main').append(view.render().el);
        },
        
        advance: function(event) {
            this.currentSlide = Math.min(Slides.length, this.currentSlide + 1);
            slide = Slides.models[this.currentSlide];
            $('html, body').scrollTop($(slide.view.el).offset().top);
            this.render();
        },        
    });
    
    window.app = new Presentor();
    
    // bootstrap the current page content into the app.
    $('section.slide').each(function(index) {
        var jel = $(this);
        Slides.create({
            title: jel.find('header h1').text(), 
            content: jel.find('.content').html()
        });
        jel.remove();
    });
    
    // and run, run like the wind!
    // $(window).resize(function(event) {
    //     var h = $(window).height();
    //     $('.slide').css({height: h});
    // }).resize();
});