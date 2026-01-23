gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



function HorizontalTween() {

    // 횡스크롤 GSAP
    let $sections = $('.section-group').find(' > .section');

    let $ScrollTween = gsap.to($sections, {
        xPercent: -100 * ($sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".section-group",
            pin: true,
            scrub: .5,
            start: "top top",
            end: 17000,
            // markers: true,
        }
    });

    // 텍스트 진입 애니메이션
    $('.fadeInLeft').each(function () {
        gsap.from(this, {
            x: 100,
            opacity: 0,
            duration: 0.7,
            ease: "none",
            scrollTrigger: {
                trigger: this,
                containerAnimation: $ScrollTween,
                start: "left 80%",
                toggleActions: "play none none none",
                // markers: true,
            }
        });
    });

    // 목업 화면 애니메이션
    $('.Leftmotion-b').each(function () {
        gsap.to(this, {
            left: "100%",
            duration: 0.7,
            ease: "none",
            scrollTrigger: {
                trigger: this,
                containerAnimation: $ScrollTween,
                start: "left 80%",
                end: "+=700",
                // markers: true,
                scrub: true,
                once: true,
            }
        });
    });

    $('.Leftmotion-w').each(function () {
        gsap.from(this, {
            right: "100%",
            duration: 0.7,
            ease: "none",
            scrollTrigger: {
                trigger: this,
                containerAnimation: $ScrollTween,
                start: "left 80%",
                end: "+=700",
                // markers: true,
                scrub: true,
                once: true,
            }
        });
    });


    // 커넥트 너비 변경 반응형 카드 위치
    var $windowWidthHalf = ($(window).width() + 17) / 2;
    console.log($windowWidthHalf);

    function updateWindowHalf() {
        $windowWidthHalf = ($(window).width() + 17) / 2;
        console.log($windowWidthHalf);
    }

    $(window).on('resize', function () {
        updateWindowHalf();

        gsap.set('.moveup', { X: $windowWidthHalf });
    });

    // 커넥트 카드 애니메이션
    gsap.from('.moveup', {
        y: '800',
        ease: "none",
        scrollTrigger: {
            trigger: '.moveup',
            containerAnimation: $ScrollTween,
            start: "left 90%",
            end: "center 50%",
            // markers: true,
            scrub: true,
            // once: true,
        }
    });

    // 네비게이션 옵션
    $('header>nav>ul>li>a').on('click', function (e) {
        
        e.preventDefault();

        const index = $(this).data('index');
        const st = $ScrollTween.scrollTrigger;

        console.log($sections.length);

        const scrollPos =
            st.start +
            (st.end - st.start) * (index / ($sections.length - 1));

        gsap.to(window, {
            scrollTo: scrollPos,
            duration: 1,
        });
    });
}

function ScrollBar__init() {
    $(window).on('scroll', function () {
        const $scrollTop = $(window).scrollTop();
        const $docHeight = $(document).height()
        const $winHeight = $(window).height();

        const $startPoint =
            $('.banner').height();

        if ($scrollTop < $startPoint) {
            $('.progras').css('width', '0%');
            $('.prograsbar').removeClass('active');
            return;
        }


        const $maxScroll = $docHeight - $winHeight - $startPoint;
        const $currentScroll = $scrollTop - $startPoint;

        const $scrollPercent = $maxScroll > 0 ? $currentScroll / $maxScroll : 0;

        $('.progras').css('width', ($scrollPercent * 100) + '%');

        $('.prograsbar').addClass('active');
    })
}
function bannerVideo_init() {
    $('.banner_video').on('play', function () {
        $('header').addClass('active')
        $('.banner > div').addClass('active')
    });

    $(window).on('scroll', function () {
        $('header').addClass('active_ef');
    });
}

function Cursor() {
    const $cursor = $('.cursor');
    const $cursorPoint = $('.cursor-point');

    $(window).mousemove(function (e) {
        $cursor.css({
            top: e.clientY,
            left: e.clientX,
        });

        $cursorPoint.css({
            top: e.clientY,
            left: e.clientX,
        });
    });

    $('.need-to-cursor-big').mouseenter(function () {
        $('.cursor').addClass('cursor-big');
        $('.cursor-point').addClass('active');
    });

    $('.need-to-cursor-big').mouseleave(function () {
        $('.cursor').removeClass('cursor-big');
        $('.cursor-point').removeClass('active');
    });

    $('.mockup').mouseenter(function () {
        $('.cursor').addClass('cursor-mockup');
    });

    $('.mockup').mouseleave(function () {
        $('.cursor').removeClass('cursor-mockup');
    });
}

HorizontalTween();
bannerVideo_init();
ScrollBar__init();
Cursor();