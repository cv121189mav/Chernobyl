$(function () {


    /*
     Дополнительные скрипты
     */
    var convert2RUR,
        convert2USD,
        convert2EUR;

    /*var priceOneDayUkr = $('.price-ukr-yellow').text(),
    	priceOneDayUkrRed = $('.price-ukr-red').text(),
    	priceOneDayUkrGreen = $('.price-ukr-green').text();
    
    var priceOneDayIn = $('.price-no-ukr-yellow').text(),
    	priceOneDayInRed = $('.price-no-ukr-red').text(),   
    	priceOneDayInGreen = $('.price-no-ukr-green').text();

    var priceTwoDayUkr = 2777;
    var priceTwoDayIn = 6999;*/


    $.ajax({
        url: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
        type: "GET",
        success: function (data) {
            convert2USD = data[0].sale;
            convert2EUR = data[1].sale;
            if (location.pathname == '/') {
                $(".format__item--one .format__price > span").text(Math.round(prices['oneDay']['ukr']['yellow']*convert2USD) + " UAH");
                $(".format__item--one .format__subprice > span").text(prices['oneDay']['ukr']['yellow']  + ' $');
                $(".format__item--one .format__price > div:eq(0)").text(Math.round((prices['oneDay']['ukr']['yellow'] * convert2USD / 100) * 22) + Math.round(prices['oneDay']['ukr']['yellow'] * convert2USD ) + " UAH");

                $(".format__item--two .format__price > span").text(Math.round(prices['twoDay']['ukr']['yellow']*convert2USD) + " UAH");
                $(".format__item--two .format__subprice > span").text(Math.round(prices['twoDay']['ukr']['yellow']) + ' $');
                $(".format__item--two .format__price > div:eq(0)").text(Math.round(((prices['twoDay']['ukr']['yellow'] * convert2USD / 100) * 17) + Math.round(prices['twoDay']['ukr']['yellow']*convert2USD)) + " UAH");
            } else {
                $(".format__item--one .format__price > span").text(Math.round(prices['oneDay']['in']['yellow']) + " USD");
                $(".format__item--one .format__supprice  div:eq(0)").text(Math.round((prices['oneDay']['in']['yellow'] / 100) * 17) + Math.round(prices['oneDay']['in']['yellow']) + ' USD');
                $(".format__item--one .format__subprice > span").text(Math.round(prices['oneDay']['in']['yellow'] * convert2USD / convert2EUR) + " EUR");
                $(".format__item--one .format__supprice  div:eq(2)").text(Math.round((((prices['oneDay']['in']['yellow'] * convert2USD/ convert2EUR / 100) * 17) + Math.round(prices['oneDay']['in']['yellow']) * convert2USD / convert2EUR)) + ' EUR');

                $(".format__item--two .format__price > span").text(Math.round(prices['twoDay']['in']['yellow']) + " USD");
                $(".format__item--two .format__supprice  div:eq(0)").text(Math.round((((prices['twoDay']['in']['yellow'] / 100) * 17) + prices['twoDay']['in']['yellow'])) + ' USD');
                $(".format__item--two .format__subprice > span").text(Math.round(prices['twoDay']['in']['yellow'] *convert2USD / convert2EUR) + " EUR");
                $(".format__item--two .format__supprice  div:eq(2)").text(Math.round((((prices['twoDay']['in']['yellow'] *convert2USD / convert2EUR / 100) * 17) + prices['twoDay']['in']['yellow']) *convert2USD/ convert2EUR) + ' EUR');
            }

            $('.price-ukr-yellow').text(Math.round(prices['oneDay']['ukr']['yellow']*convert2USD) +' UAH');
            $('.price-no-ukr-yellow').text(Math.round(prices['oneDay']['in']['yellow']*convert2USD) +' UAH');
            $('.price-ukr-yellowUSD').text(Math.round(prices['oneDay']['ukr']['yellow']) + ' USD');
            $('.price-no-ukr-yellowUSD').text(Math.round(prices['oneDay']['in']['yellow']) + ' USD');
            $('.price-ukr-yellowEUR').text(Math.round(prices['oneDay']['ukr']['yellow'] *convert2USD/ convert2EUR) + ' EUR');
            $('.price-no-ukr-yellowEUR').text(Math.round(prices['oneDay']['in']['yellow']  *convert2USD/ convert2EUR) + ' EUR');

            $('.price-ukr-green').text(Math.round(prices['oneDay']['ukr']['green']*convert2USD) +' UAH');
            $('.price-no-ukr-green').text(Math.round(prices['oneDay']['in']['green']*convert2USD) +' UAH');
            $('.price-ukr-greenUSD').text(Math.round(prices['oneDay']['ukr']['green']) + ' USD');
            $('.price-no-ukr-greenUSD').text(Math.round(prices['oneDay']['in']['green']) + ' USD');
            $('.price-ukr-greenEUR').text(Math.round(prices['oneDay']['ukr']['green']*convert2USD / convert2EUR) + ' EUR');
            $('.price-no-ukr-greenEUR').text(Math.round(prices['oneDay']['in']['green']*convert2USD / convert2EUR) + ' EUR');

            $('.price-ukr-red').text(Math.round(prices['oneDay']['ukr']['red']*convert2USD) +' UAH');
            $('.price-no-ukr-red').text(Math.round(prices['oneDay']['in']['red']*convert2USD) +' UAH');
            $('.price-ukr-redUSD').text(Math.round(prices['oneDay']['ukr']['red']) + ' USD');
            $('.price-no-ukr-redUSD').text(Math.round(prices['oneDay']['in']['red']) + ' USD');
            $('.price-ukr-redEUR').text(Math.round(prices['oneDay']['ukr']['red']*convert2USD / convert2EUR) + ' EUR');
            $('.price-no-ukr-redEUR').text(Math.round(prices['oneDay']['in']['red']*convert2USD / convert2EUR) + ' EUR');

            $('.price-ukr').text(Math.round(prices['twoDay']['ukr']['yellow']*convert2USD) +' UAH');
            $('.price-no-ukr').text(Math.round(prices['twoDay']['in']['yellow']*convert2USD) +' UAH');
            $('.price-ukrUSD').text(Math.round(prices['twoDay']['ukr']['yellow']) + ' USD');
            $('.price-no-ukrUSD').text(Math.round(prices['twoDay']['in']['yellow']) + ' USD');
            $('.price-ukrEUR').text(Math.round(prices['twoDay']['ukr']['yellow']*convert2USD / convert2EUR) + ' EUR');
            $('.price-no-ukrEUR').text(Math.round(prices['twoDay']['in']['yellow']*convert2USD / convert2EUR) + ' EUR');
        },
        error: function () {
            console.error('error')
        }
    });

    // console.log(convert2USD);


    $('#countUkroneDay, #countInoneDay, #totalCountoneDay, #countUkrtwoDay, #countIntwoDay, #totalCounttwoDay').on('click', function () {
        var form = $(this).parents('.tour').data('key');
        $(this).val('');
        calculateTotal(prices, form);
    });
    $('#totalCountoneDay, #totalCounttwoDay').on('input propertychange', function () {
        var form = $(this).parents('.tour').data('key');
        $(this).parents('.popup-form__form').find('.popup-form__hidden-inputs').fadeIn();
        $('#countUkr' + form).val('');
        $('#countIn' + form).val('');
        calculateTotal(prices, form);
    });
    $('#countUkroneDay, #countUkrtwoDay').on('input propertychange', function () {
        var form = $(this).parents('.tour').data('key'),
            totalCount = Number($('#totalCount' + form).val());
        if (Number($(this).val()) > totalCount) {
            $(this).val(totalCount);
            $('#countIn' + form).val(0);
        } else {
            $('#countIn' + form).val(totalCount - Number($(this).val()));
        }
        calculateTotal(prices, form);
    });
    $('#countInoneDay, #countIntwoDay').on('input propertychange', function () {
        var form = $(this).parents('.tour').data('key'),
            totalCount = Number($('#totalCount' + form).val());
        if ($(this).val() > totalCount) {
            $(this).val(totalCount);
            $('#countUkr' + form).val(0);
        } else {
            $('#countUkr' + form).val(totalCount - Number($(this).val()));
        }
        calculateTotal(prices, form);
    });


    // $('.btn-for-popup-order--first, .format__item').on('click', function () {

    //     setTimeout(function(){
    //         var t = $('#datepicker-one').find('.red'),
    //             eq = t.index();
    //         console.log(eq);
    //         $('#datepicker-one').find('.day').next().addClass('red');
    //         $('#datepicker-one').find('.today').next().next().addClass('red');
    //         $('#datepicker-one').find('.today').next().next().next().addClass('red');

    //         $('#datepicker-one').find('.today').next().next().next().next().addClass('green');
    //         $('#datepicker-one').find('.today').next().next().next().next().next().addClass('green');
    //         $('#datepicker-one').find('.today').next().next().next().next().next().next().addClass('green');
    //      $('#datepicker-one').find('.today').next().next().next().next().next().next().next().addClass('green');
    //         $('#datepicker-one').find('.today').next().next().next().next().next().next().next().next().addClass('green');
    //         $('#datepicker-one').find('.today').next().next().next().next().next().next().next().next().next().addClass('green');
    //         $('#datepicker-one').find('.today').next().next().next().next().next().next().next().next().next().next().addClass('green');


    // }, 500);
    // });





    function nextMonthPaint() {
        var newMonthDate = $('#datepicker-one td.day.new');

        /*setInterval(function () {
            for(var i = 0; i <= newMonthDate.length; i ++){
                var dayIndex = i.index();
                console.log(dayIndex);
            }
        })*/
    }

    function log($item) {
        console.log($item);
    }


    function Autoplay(id) {
        var id;
        if (document.getElementById(id)) {
            var wrraper = document.getElementById(id);
            var elems = wrraper.getElementsByClassName('format__item');
            currentItem = 2;
            slideInterval = setInterval(AutoPlayElems, 2000);

            function AutoPlayElems() {
                elems[currentItem].classList.remove("active");
                currentItem = (currentItem + 1) % (elems.length);
                elems[currentItem].classList.add("active");
            };
            for (var i = 0; i < elems.length; i++) {
                elems[i].onmouseover = function () {
                    var activeElem = this;
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].classList.remove("active");
                    }
                    ;
                    clearInterval(slideInterval);
                    activeElem.classList.add("active");
                };
                elems[i].onmouseleave = function () {
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].classList.remove("active");
                    }
                    ;
                    elems[2].classList.add("active");
                    slideInterval = setInterval(AutoPlayElems, 2000);
                }
            }
            ;
        }
        ;
    }

    Autoplay('autoplay_items');

    // Добавление атрибута data-price с которого дальше скрипт вытягивает значения для расчета цены
    var priceUkr_oneDay = $('.popup-form__table tbody tr:eq(0) .price-ukr'),
        priceNoUkr_oneDay = $('.popup-form__table tbody tr:eq(0) .price-no-ukr'),
        priceUkr_twoDays = $('.popup-form__table tbody tr:eq(3) .price-ukr'),
        priceNoUkr_twoDays = $('.popup-form__table tbody tr:eq(3) .price-no-ukr');
    priceUkr_oneDay.attr('data-price', priceUkr_oneDay.text().replace(/\s+/g, ''));
    priceNoUkr_oneDay.attr('data-price', priceNoUkr_oneDay.text().replace(/\s+/g, ''));
    priceUkr_twoDays.attr('data-price', priceUkr_twoDays.text().replace(/\s+/g, ''));
    priceNoUkr_twoDays.attr('data-price', priceNoUkr_twoDays.text().replace(/\s+/g, ''));
    // Номера телефонов
    var phone_1 = $('.header__tells-item a:eq(0)'),
        phone_2 = $('.header__tells-item a:eq(2)');
    // В хедере
    phone_1.attr('href', 'tel:' + phone_1.text().replace(/\s+/g, ''));
    phone_2.attr('href', 'tel:' + phone_2.text().replace(/\s+/g, ''));
    // В футере
    $('.header__tells-item a:eq(3)').attr('href', 'tel:' + phone_1.text().replace(/\s+/g, ''));
    $('.header__tells-item a:eq(5)').attr('href', 'tel:' + phone_2.text().replace(/\s+/g, ''));

    // Стили к спискам в описании туров
    $('.format__body ul').attr('class', 'format__body-list');
    $('.format__body-list li').attr('class', 'format__list-item');

//======================================================================================================================

    var rangeSlider = function () {
        var slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');

        slider.each(function () {

            value.each(function () {
                var value = $(this).prev().attr('value');
                $(this).html(value);
                $(this).parents('.popup-calculator__container').find('input[name="people"]').val(value);
            });

            range.on('input', function () {
                $(this).next(value).html(this.value);
                $('#userInput').val($('.range-slider__value').text());
                setPrice();
            });
        });
    };

    rangeSlider();

    $('#userInput').keyup(function () {
        var price = $('.popup-calculator__price');
        $this = $(this);
        $('.range-slider__value').text($this.val());
        setPrice();

        if ($this.val().length == 0) {
            price.text('');
        }
        else if ($this.val() > 30 || $this.val() == 0) {
            swal('Введите количество от 1 до 30', '', 'error');
            price.text('');
        }
    });

    function setPrice() {
        var prices = [434, 245, 216, 169, 145, 139, 131, 125, 115, 105, 99, 97, 95, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77];
        var daysCount = $('.popup-calculator__list-item-number-item--active');
        var peopleCount = $('.range-slider__value');
        var finalPriceWrapper = $('.popup-calculator__price');
        var finalPrice = parseInt(daysCount.text()) * prices[parseInt(peopleCount.html() - 1)];
        $(finalPriceWrapper).text(finalPrice);
    }


    function chooseDays() {
        var day = $('.popup-calculator__list-item-number-item');
        day.each(function () {
            day.on('click', function (e) {
                setPrice();
                e.preventDefault();
                $that = $(this);
                if ($that.hasClass('popup-calculator__list-item-number-item--active')) {
                    return
                } else {
                    $that.parent().find(day).removeClass('popup-calculator__list-item-number-item--active');
                    $that.addClass('popup-calculator__list-item-number-item--active');
                }
            })

        });
    }

    chooseDays();


    $('.opinions__list').owlCarousel({
        loop: true,
        smartSpeed: 800,
        items: 1,
        autoplay:true,
        autoplayTimeout:4000,
        responsive: {
            0: {
                nav: false,
                dots: true
            },
            900: {
                nav: true,
                dots: false
            }
        }

    });


    $("#policy-btn").on("click", function (e) {
        e.preventDefault();
        return $('#policy').arcticmodal();
    });
    $("#otkaz-btn").on("click", function (e) {
        e.preventDefault();
        return $('#otkaz').arcticmodal();
    });

    $(".btn-oferta-link").on("click", function (e) {
        e.preventDefault();
        return $('#oferta').arcticmodal();
    });

    $("#sogl-btn").on("click", function (e) {
        e.preventDefault();
        return $('#sogl').arcticmodal();
    });
    $(".btn-for-popup").on("click", function (e) {
        e.preventDefault();
        return $('#form-in-popup').arcticmodal();
    });
    $(".btn-for-popup-call").on("click", function (e) {
        e.preventDefault();
        return $('#form-in-popup-call').arcticmodal();
    });


    $('.btn-for-popup-order--first').on('click', function (e) {
        e.preventDefault();
        var form = $('#form-in-popup-first');
        return form.arcticmodal();

    });

    $('.btn-for-popup-order--second').on('click', function (e) {
        e.preventDefault();
        var form = $('#form-in-popup-second');
        return form.arcticmodal();
    });

    $('#btn-bron-1').click(function (e) {
        e.preventDefault();
        return $('#bookModal-1').arcticmodal();
    });

    /*$('.btn-book-now').trigger('click', function (e) {
     e.preventDefault();
     $('#boxUserFirstInfo').arcticmodal();
     });*/

    $('.btn-for-popup-order--third').on('click', function (e) {
        e.preventDefault();
        $('#form-in-popup-third').arcticmodal();
        if ($('.popup-calculator__container').hasClass('small')) {
            $('.popup-calculator__container').removeClass('small');
            $('.popup-calculator__content').show();
            $('.popup__form-hidden-order').hide();
        }
    });

    $(".format__item--one").click(function (e) {
        e.preventDefault();
        return $('#form-in-popup-first').arcticmodal();
    });

    $(".format__item--two").click(function (e) {
        e.preventDefault();
        return $('#form-in-popup-second').arcticmodal();
    });

    $(".format__item--three").click(function (e) {
        e.preventDefault();
        $('#form-in-popup-third').arcticmodal();
        if ($('.popup-calculator__container').hasClass('small')) {
            $('.popup-calculator__container').removeClass('small');
            $('.popup-calculator__content').show();
            $('.popup__form-hidden-order').hide();
        }
    });

    $('.popup-calculator__btn').on('click', function (e) {
        e.preventDefault();
        var $that = $(this);
        $that.parents('.popup-calculator__container').addClass('small');
        var daysVal = $that.parents('.popup-calculator__container').find('.popup-calculator__list-item-number-item--active').text();
        var peopleVal = $that.parents('.popup-calculator__container').find('.range-slider__value').text();
        var priceVal = $that.parents('.popup-calculator__container').find('.popup-calculator__price').text();
        $('#price').val(priceVal);

        var dayInput = $that.parents('.popup-calculator__container').find('input[name="days"]');
        var peopleInput = $that.parents('.popup-calculator__container').find('input[name="people"]');
        var priceInput = $that.parents('.popup-calculator__container').find('input[name="price"]');
        var priceInput2 = $that.parents('.popup-calculator__container').find('input[name="price2"]');
        var totalPrice;
        var priceGetResponse = $that.parents('.popup-calculator__container').find('input[name="custom_cost"]');
        var prepayGetResponse = $that.parents('.popup-calculator__container').find('input[name="custom_prepay"]');
        dayInput.val(daysVal);
        peopleInput.val(peopleVal);
        priceInput.val(priceVal);
        priceInput2.val(priceVal);
        totalPrice = +priceVal * +peopleVal;
        priceGetResponse.val(totalPrice + ' usd');
        prepayGetResponse.val(Math.round(totalPrice * 0.35) + ' usd');

        $that.parents('.popup-calculator__content').hide();
        $('.popup__form-hidden-order').fadeIn();
    });


    $('.popup-form__field--textarea').on('input propertychange', function () {
        if ($(this).val() != '') {
            var text = $(this).val();
            $(this).parents('.popup-form__content').find('input[name="message"]').val(text);
        } else $(this).parents('.popup-form__content').find('input[name="message"]').val('Сообщение отсутствует');
    });


// animated phone

    function showPhone() {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 200) {
                $('.callAnimatedIconWrapper').fadeIn();
            }
            else {
                $('.callAnimatedIconWrapper').fadeOut();
            }
        });
    }

    showPhone();

    function EqualHeight(elems) {
        var elems;
        if (document.querySelectorAll(elems)) {
            var elemsArr = document.querySelectorAll(elems);
            var maxHeight = 0;
            for (var i = 0; i < elemsArr.length; i++) {
                maxHeight = Math.max(elemsArr[i].clientHeight, maxHeight);
            }
            ;
            for (i = 0; i < elemsArr.length; i++) {
                elemsArr[i].style.height = maxHeight + 'px';
            }
            ;
        }
        ;
    };
    if ($(window).width() > 810) {
        EqualHeight('.format__body-list');
    }


}); //form actions end
var prices = {
    'oneDay': {
        'ukr': {'yellow': 49, 'red': 59, 'green': 49},
        'in': {'yellow': 99, 'red': 149, 'green': 99}
    },
    'twoDay': {
        'ukr': {'yellow': 116},
        'in': {'yellow': 249}
    }
};

function calculateTotal(prices, form) {
    var price = {},
        countUkr = $('#countUkr' + form).val(),
        countIn = $('#countIn' + form).val(),
        subtotal = 0;

    setTimeout(function () {
        var color = 'yellow';
        if ($('.day.active').hasClass('red')) {
            price.Ukr = prices[form]['ukr']['red'];
            price.In = prices[form]['in']['red'];
            color = 'red';
        } else if ($('.day.active').hasClass('green')) {
            price.Ukr = prices[form]['ukr']['green'];
            price.In = prices[form]['in']['green'];
            color = 'green';
        } else {
            price.Ukr = prices[form]['ukr']['yellow'];
            price.In = prices[form]['in']['yellow'];
        }
        subtotal = Math.round(countUkr * price['Ukr'] + countIn * price['In']);

            $.ajax({
                url: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
                type: "GET",
                success: function (data) {
                    convert2USD = data[0].sale;
                    convert2EUR = data[1].sale;
                    if (location.pathname == '/') {
                        $('.popup-form__price-count span').text(Math.round(subtotal * convert2USD) + ' UAH');
                    } else {
                        $('.popup-form__price-count span').text(subtotal + ' USD / ' + Math.round(subtotal * convert2USD / convert2EUR) + ' EUR');
                    }
                },
                error: function () {
                    console.error('error')
                }
            });

        
        $('.price_color_tab_list').find('.tab_list').removeClass('active');
        $('.tabs_content').removeClass('active');
        $('.price_color_tab_list').find('.'+color).addClass('active');
        $('#'+color).addClass('active');
    }, 300);
}
function calculateKassa(prices, form) {
    var price = {},
        countUkr = $('#countUkr' + form).val(),
        countIn = $('#countIn' + form).val();

    var color = 'yellow';
    if ($('.day.active').hasClass('red')) {
        price.Ukr = prices[form]['ukr']['red']*convert2USD;
        price.In = prices[form]['in']['red']*convert2USD;
    } else if ($('.day.active').hasClass('green')) {
        price.Ukr = prices[form]['ukr']['green']*convert2USD;
        price.In = prices[form]['in']['green']*convert2USD;
    } else {
        price.Ukr = prices[form]['ukr']['yellow']*convert2USD;
        price.In = prices[form]['in']['yellow']*convert2USD;
    }
    subtotal = Math.round(countUkr * price['Ukr'] + countIn * price['In']);

    return subtotal;
}
$("#yellow").addClass('active');
$('.tab_list').click(function(){
	var tab = $(this).data('tab');
	$('.tab_list').removeClass('active');
	$('.tabs_content').removeClass('active');
	$('#'+tab).addClass('active');
	$(this).addClass('active');
});

/*function calculateTotal(prices){
	price = priceType(prices);
	console.log(price.Ukr);
	var countUkr = $('.countUkr').val();
	var countIn = $('.countIn').val();
	
	var subtotal = Math.round(countUkr*price['Ukr']+countIn*price['In']);

	return subtotal;
};*/
(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });

    $('body').on('show', '.arcticmodal-overlay', function () {
        if (($(window).width() > 1024) && ($(window).scrollTop() > 200)) {
            $('.callAnimatedIconWrapper').hide();
        }
    });

    $('body').on('hide', '.arcticmodal-overlay', function () {
        if ($(window).width() > 1024 && ($(window).scrollTop() > 200)) {
            $('.callAnimatedIconWrapper').show();
        }
    });

    // if ($(window).width() < 769) {
    //     $('.popup-form__tour-program-toggle').on('click', function (e) {            
    //         e.preventDefault();
    //         $that = $(this);
    //         var attr = $that.attr('data-name');
    //         var program = $that.parents('.popup-form').find('.mobile-day.popup-form__tour-program-wrapper.' + attr);
    //         $('.mobile-day.popup-form__tour-program-wrapper:not(.' + attr).slideUp();
    //         program.slideToggle();
    //         $that.toggleClass('active');
    //     });
    // } else {
    //     $('.popup-form__tour-program-toggle').on('click', function (e) {
    //         e.preventDefault();
    //         $that = $(this);
    //         var attr = $that.attr('data-name');
    //         var program = $that.parents('.popup-form').find('.mobile-day.popup-form__tour-program-wrapper.' + attr);
    //         $('.mobile-day.popup-form__tour-program-wrapper:not(.' + attr).slideUp();
    //         program.slideToggle();
    //         $that.toggleClass('active');
    //     });
    // }

    // $('.popup-form__tour-program-toggle').on('click', function () {
    //     var dropDown = $(this).parent().next(2);
    //     var $this = $(this);
    //     if ($this.hasClass('active') == false) {
    //         $this.addClass('active');
    //     } else $this.removeClass('active');
    //     $('.popup-form__tour-program-toggle').not($this).removeClass('active');
    //     $('.popup-form__tour-program-wrapper').not(dropDown).slideUp();
    //     dropDown.slideToggle();
    //     return false;
    // });


    $('.popup-form__tour-program-toggle').on('click', function () {
        var dropDown = $(this).data('name');
        if ($('.' + dropDown).hasClass('active')) {
            $('.popup-form__tour-program-toggle').removeClass('active');
            $('.content_program').removeClass('active');
            $('.popup-form__tour-program-content-toggle').css('display', 'block');
            $('.popup-form__tour-program-content-toggle').removeClass('active');
        } else {
            $('.popup-form__tour-program-toggle').removeClass('active');
            $('.content_program').removeClass('active');
            $('.popup-form__tour-program-content-toggle').css('display', 'none');
            $(this).addClass('active');
            $('.' + dropDown).addClass('active');
        }
    });

    $('.popup-form__tour-program-content-toggle').on('click', function () {
        var dropDown = $(this).data('name');
        if ($('[data-name="' + dropDown + '"]').hasClass('active')) {
            $('.popup-form__tour-program-toggle').removeClass('active');
            $('.content_program').removeClass('active');
            $('.popup-form__tour-program-content-toggle').css('display', 'block');
        } else {
            $('.popup-form__tour-program-toggle').removeClass('active');
            $('.content_program').removeClass('active');
            $(this).addClass('active');
            $(this).css('display', 'none');
            $('.' + dropDown).addClass('active');
            $('[data-name="' + dropDown + '"]').addClass('active');
        }
    });

})(jQuery);


//input tell
(function ($) {
    var url = window.location.pathname;
    var loc = (url.split('/')[1] ? url.split('/')[1] : 'ua');
    loc = (loc == 'en' ? 'us' : loc);
    // console.log(loc);
    var wp_url = window.location.origin + "/wp-content/themes/chernobyl/js/utils.js";
    $("input[name='tellView']").intlTelInput({
        geoIpLookup: function (callback) {
            $.get("http://ipinfo.io", function () {
            }, "jsonp").always(function (resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        initialCountry: loc,
        utilsScript: wp_url,
        preferredCountries: ["ua", "ru", "by"],
        separateDialCode: "true"

    });

    var countryData = $.fn.intlTelInput.getCountryData();

    $.each(countryData, function (i, country) {
        if (country.dialCode == "380") {
            country.dialCode = "38";
        }
    });


})(jQuery);


// link to landing
$(document).ready(function () {

    // $('body').on('click','.calls_drop_btn', function () {
    //     $('.calls_drop_box ul :first-child').toggle();
    // });


    $('.btn_land_open').on('click', function () {
        $('.block_landing').addClass('hover hovered');
    });

    $('.block_landing_close').on('click', function () {
        $('.block_landing').removeClass('hover');
    });

//    setTimeout(function() {
//     if ( $('.block_landing').hasClass('hovered') == false ) {
//         $('.block_landing').addClass('hover');
//     }
// },30000);


    $('html,body').click(function (event) {
        var eventInMenu = $(event.target).parents('.block_landing');
        if (!eventInMenu.length) {
            $('.block_landing').removeClass('hover');
        }
    });

    var
        $body = $('body'),
        $window = $(window),
        $footer = $('footer'),
        $header = $('header');


    $.fn.dialog = function () {
        var $this = $(this),
            $dialogWrapper = $('.dialog_wrapper'),
            $dialog = $('.dialog'),
            $dialogBg = $('.dialog_bg'),
            $dialogClose = $('.dialog_close'),
            wPosSet = $window.scrollTop(),
            wPosGet = $body.attr('data-scroll');
        $dialogWrapper.show();
        $dialogBg.show();
        $this.show();
        $body.addClass('dialog_opened');
        // $body.css('top', - wPosSet+'px');
        // $body.attr('data-scroll', wPosSet);
        if ($this.height() > $dialogWrapper.height()) {
            $body.addClass('dialog_scrollable');
        } else {
            $body.addClass('dialog_scrollable');
        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $body.addClass('dialog_scrollable_mobile');
        }
        $dialogClose.on('click', function () {
            $dialog.hide();
            $dialogBg.hide();
            $dialogWrapper.hide();
            $body.removeClass('dialog_opened', 'dialog_scrollable_mobile');
            // $window.scrollTop(wPosSet);
        });
    };


    $('.calls_drop_btn').on('click', function () {
        // $('.calls_drop_box ul').slideToggle()
        $('.calls_drop_box ul').toggleClass('active')
    })


});