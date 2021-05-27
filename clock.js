var Countdown = {

    init: function () {

        this.$ = {
            days: document.querySelector('.card .days'),
            hours: document.querySelector('.card .hours '),
            minutes: document.querySelector('.card .min '),
            seconds: document.querySelector('.card .sec ')
        },

            this.values = {
                days: 14,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        // Initialize total seconds//
        this.total_seconds = (this.values.days * 86400) + (this.values.hours * 3600) + (this.values.minutes * 60) + this.values.seconds;

        // Animate countdown to the end 
        this.count();
    },

    count: function () {

        var that = this, val = that.values, $ = that.$;

        this.countdown_interval = setInterval(() => {
            if (that.total_seconds !== 0) {
                
                
                if (val.days >= 0 && val.hours === 0) {
                    val.hours = 24;
                    --val.days;
                    that.animation(this.$.days, val.days)

                }
                
                if (val.hours >= 0 && val.minutes === 0) {
                    val.minutes = 60;
                    --val.hours;
                    that.animation(this.$.hours, val.hours)
                }

                if (val.minutes >= 0 && val.seconds === 0) {
                    val.seconds = 60;
                    --val.minutes;
                
                    that.animation(this.$.minutes, val.minutes)
                }

                val.seconds--;

                that.animation(this.$.seconds, val.seconds)
                // Apply the animation to DOM

                --that.total_seconds;

              
            }
            else {
                clearInterval(that.countdown_interval);
            }
        }, 1000);




    },


    animation: function (el, value) {

        var top = el.querySelector('.top');
        var bottom = el.querySelector('.bottom');
        var top_back = el.querySelector('.top-back');
        var back_bottom = el.querySelector('.bottom-back');

        // Before we begin, change the back value

        if (value < 10) {
            value = "0" + value;
        }
        



        top_back.querySelector("div").innerHTML = value;
        
      
        back_bottom.querySelector("div").innerHTML = value;

        // animation 
        
        gsap.to(top, 0.78   , {
            rotationX: '-180deg',
            transformPerspective: 400,
            ease: Power2.easeOut,
            onComplete: () => {
                gsap.set(top, { rotationX: 0 });
                top.querySelector("div").innerHTML = value;
                bottom.querySelector("div").innerHTML = value;
                
                
            }
        });

        gsap.to(top_back, 0.78, {
            rotationX: '0',
            transformPerspective: 400,
            ease: Power2.easeOut,
            clearProps: 'all'
        });

    },
}

Countdown.init()