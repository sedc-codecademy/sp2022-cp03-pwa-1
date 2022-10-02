// DOM Elements

let getStartedButton = document.querySelectorAll(".activate");

let mainPage = document.querySelector(".main-page");
let html = document.querySelector("html");

// Vars

// Func for creating HTML DOM Elements

let createElements = (initObj) => {
    var element = document.createElement(initObj.Tag);
    for (var prop in initObj) {
        if (prop === "childNodes") {
            initObj.childNodes.forEach(function (node) { node.appendChild(element); });
        }
        else if (prop === "attributes") {
            initObj.attributes.forEach(function (attr) { element.setAttribute(attr.key, attr.value) });
        }
        else element[prop] = initObj[prop];
    }
    return element;
};

let swiperSlides = [];
let headerDiv = [];
let messageDiv = [];
let imageDiv = [];



getStartedButton.forEach((item) => {
    item.addEventListener("click", function () {

        mainPage.classList.toggle("hidden");
        html.classList.toggle("htmlSet");

        //left div

        let appLogIn = createElements({ Tag: "div", classList: "appLogIn", childNodes: [html] });
        let leftDiv = createElements({ Tag: "div", classList: "sliderShow", childNodes: [appLogIn] });
        let swiperForLogIn = createElements({ Tag: "div", classList: "swiper-log-in", childNodes: [leftDiv] });
        let swiperWrapper = createElements({ Tag: "div", classList: "swiper-wrapper log-in-wrapper", childNodes: [swiperForLogIn] });
        const swiperPagination = createElements({ Tag: "div", classList: "swiper-pagination", childNodes: [leftDiv] })

        for (let i = 0; i < 4; i++) {
            swiperSlides.push(createElements({ Tag: "div", classList: "swiper-slide slides-log-in", childNodes: [swiperWrapper] }));
        };

        for (let i = 0; i < swiperSlides.length; i++) {
            headerDiv.push(createElements({ Tag: "div", classList: "logIn-header-div gap", childNodes: [swiperSlides[i]] }));
            messageDiv.push(createElements({ Tag: "div", classList: "logIn-message-div gap", childNodes: [swiperSlides[i]] }));
            imageDiv.push(createElements({ Tag: "div", classList: "logIn-image-div gap", childNodes: [swiperSlides[i]] }));
        };

        // main log in & sign up tab right div
        let rightDiv = createElements({ Tag: "div", classList: "log-in-div", childNodes: [appLogIn] });

        let swiperRight = createElements({ Tag: "div", classList: "right-swiper", childNodes: [rightDiv] });
        let swiperWrapperRight = createElements({ Tag: "div", classList: "swiper-wrapper wrapper-right", childNodes: [swiperRight] });


        let swiperSlidesRightAtZero = createElements({ Tag: "div", classList: "swiper-slide slides-other", childNodes: [swiperWrapperRight] });
        let swiperSlidesRightAtOne = createElements({ Tag: "div", classList: "swiper-slide slides-other", childNodes: [swiperWrapperRight] });




        let logInTab = createElements({ Tag: "div", classList: "log-in-tab", childNodes: [swiperSlidesRightAtZero] });
        let logInMainTab = createElements({ Tag: "div", classList: "log-in-main-tab", childNodes: [logInTab] });
        let logInMainTabHeader = createElements({ Tag: "div", classList: "log-in-main-tab-header", childNodes: [logInMainTab] });
        let logInMainTabForm = createElements({ Tag: "div", classList: "log-in-main-tab-form", childNodes: [logInMainTab] });

        logInMainTabHeader.innerHTML = `<h2>Sign in<h2/>`
        logInMainTabForm.innerHTML = `
            <form id="login-form">
                <p>
                <input type="text" id="username" name="username" placeholder="Username" required><i class="validation"><span></span><span></span></i>
                </p>
                <p>
                <input type="password" id="password" name="password" placeholder="Password" required><i class="validation"><span></span><span></span></i>
                </p>
                <p>
                <input type="submit" id="login" value="Login">
                </p>
            </form>
            <div id="create-account-wrap">
                <p>Not a member? <a href="#" data-slide="2">Create Account</a><p>
            </div>`

        // sign up tab

        let rightDivSingUp = createElements({ Tag: "div", classList: "sign-up-div", childNodes: [swiperSlidesRightAtOne] });
        let singUpTab = createElements({ Tag: "div", classList: "sign-up-tab", childNodes: [rightDivSingUp] });
        let signUpMainTab = createElements({ Tag: "div", classList: "sign-up-main-tab", childNodes: [singUpTab] });
        let backToLogIn = createElements({ Tag: "div", classList: "back-to-log", childNodes: [signUpMainTab] });
        let signUpMainTabHeader = createElements({ Tag: "div", classList: "sign-up-main-tab-header", childNodes: [signUpMainTab] });
        let signUpMainTabForm = createElements({ Tag: "div", classList: "sign-up-main-tab-form", childNodes: [signUpMainTab] });
        backToLogIn.innerHTML = `<a href="#" data-slide="0"><img src="./media/logIn-media/icons8-left-50.png"></a>`
        signUpMainTabHeader.innerHTML = `<h2>Sign up<h2/>`
        signUpMainTabForm.innerHTML = `
        <form id="signUp-form">
            <p>
            <input type="text" id="signup-username" name="signup-username" placeholder="Username" required><i class="validation"><span></span><span></span></i>
            </p>
            <p>
            <input type="password" id="signup-password" name="signup-password" placeholder="Password" required><i class="validation"><span></span><span></span></i>
            </p>
            <p>
            <input type="email" id="signup-email" name="signup-email" placeholder="Email Address" required><i class="validation"><span></span><span></span></i>
            </p>
            <p>
            <input type="submit" id="signup-login" value="Sign up">
            </p>
        </form>`

        // swiper-slide [0]

        headerDiv[0].innerHTML = `<h1>Mange your day</h1>`
        messageDiv[0].innerHTML = `<p>From groceries to picking up the kids, we help you remember it all, anytime, anywhere.</p>`
        imageDiv[0].innerHTML = `<img src="./media/logIn-media/4703428.jpg">`

        // swiper-slide [1]

        headerDiv[1].innerHTML = `<h1>Get anything done</h1>`
        messageDiv[1].innerHTML = `<p>Create your perfect daily routine that works for you.</p>`
        imageDiv[1].innerHTML = `<img src="./media/logIn-media/4905798.jpg">`

        // swiper-slide [2]

        headerDiv[2].innerHTML = `<h1>Never forget a thing</h1>`
        messageDiv[2].innerHTML = `<p>Easily add reminders for daily, weekly or monthly commitments.</p>`
        imageDiv[2].innerHTML = `<img src="./media/logIn-media/6334182.jpg">`

        // swiper-slide [2]

        headerDiv[3].innerHTML = `<h1>Live Strategically</h1>`
        messageDiv[3].innerHTML = `<p>Focus on the things that matter to you unlock your true potential</p>`
        imageDiv[3].innerHTML = `<img src="./media/logIn-media/5243332.jpg">`



        const logInSwiper = new Swiper('.swiper-log-in', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            keyboardControl: true,
            grabCursor: false,
            centeredSlides: true,
            slidesPerView: 'auto',
            initialSlide: 0,
            allowTouchMove: true,
            speed: 800,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 7000,
            },
            effect: 'fade',

        });


        const SignUpSwiper = new Swiper('.right-swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            keyboardControl: false,
            grabCursor: false,
            centeredSlides: true,
            slidesPerView: 'auto',
            initialSlide: 0,
            allowTouchMove: false,
            speed: 800,
            effect: 'flip',

        });

        document.onkeydown = function (evt) {
            evt = evt || window.event;
            if (evt.key == "Escape") {
                mainPage.classList.remove("hidden");
                html.classList.remove("htmlSet");
                appLogIn.remove()
                swiperSlides = [];
                headerDiv = [];
                messageDiv = [];
                imageDiv = [];
            }
        };
        (function ($) {
            "use strict";
            // navigation
            $('a[data-slide]').click(function (e) {
                e.preventDefault();
                SignUpSwiper.slideTo($(this).data('slide'));
            });
        })(jQuery);

    })


})
