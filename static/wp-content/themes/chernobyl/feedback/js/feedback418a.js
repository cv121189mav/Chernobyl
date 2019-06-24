// Additional scripts
if (location.pathname == '/pl/') {
    var wp_url = window.location.origin + "/wp-content/themes/chernobyl/feedback/index_pl.php";
    var lang = 'pl'
} else if (location.pathname == '/en/') {
    var wp_url = window.location.origin + "/wp-content/themes/chernobyl/feedback/index_en.php";
    var lang = 'en'
} else if (location.pathname == '/de/') {
    var wp_url = window.location.origin + "/wp-content/themes/chernobyl/feedback/index_de.php";
    var lang = 'de'
} else {
    var wp_url = window.location.origin + "/wp-content/themes/chernobyl/feedback/index.php";
    var lang = 'ru'
}

function cf7Send(formName, form4db) {
    var inputName = $('#' + formName + '-form-name').val(),
        inputTel = $('#' + formName + '-form-tel').val(),
        inputMail = $('#' + formName + '-form-email').val(),
        inputMessage = $('#' + formName + '-form-question').val(),
        dialCode = $('.selected-dial-code:eq(0)').text(),
        inputDate = $('#' + formName + '-form-date').text();
    $('#' + formName + '-name').val(inputName);
    $('#' + formName + '-tel').val(inputTel);
    $('#' + formName + '-email').val(inputMail);
    $('#' + formName + '-date').val(inputDate);
    if (formName == '1d') {
        $('#1d-date').val($('#nextTourOne').text());
    }
    if (formName == '2d') {
        $('#2d-date').val($('#nextTourTwo').text());
    }

    var currentDate = new Date();
    var dd = currentDate.getDate();
    var mm = currentDate.getMonth() + 1; //January is 0!
    var yyyy = currentDate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    currentDate = yyyy + '-' + mm + '-' + dd;

    /*$.ajax({
     url: window.location.origin + "/wp-content/themes/chernobyl/feedback/clientData.php",
     type: "POST",
     data: {
     name: inputName,
     email: inputMail,
     phone: dialCode + inputTel,
     form: form4db,
     message: inputMessage,
     date: currentDate
     },
     success: function (data) {
     }
     });*/
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (typeof haystack[i] == 'object') {
            if (arrayCompare(haystack[i], needle)) return true;
        } else {
            if (haystack[i] == needle) return true;
        }
    }
    return false;
}

window.isset = function (v) {
    if (typeof(v) == 'object' && v == 'undefined') {
        return false;
    } else if (arguments.length === 0) {
        return false;
    } else {
        var buff = arguments[0];
        for (var i = 0; i < arguments.length; i++) {
            if (typeof(buff) === 'undefined' || buff === null) return false;
            buff = buff[arguments[i + 1]];
        }
    }
    return true;
};

function myconf() {
    var cf = $.Deferred();
    $.ajax({
        type: 'POST',
        url: wp_url,
        dataType: 'json',
        data: 'act=cfg',
        success: function (answer) {
            cf.resolve(answer.configs);
        }
    });
    return cf;
}

var mcf = myconf();

mcf.done(function (conf) {

    $(document).ready(function () {
        (function () {
            var fb = $('.feedback');
            if (fb.length > 0) {
                fb.each(function () {
                    var form = $(this).closest('form'), name = form.attr('name');
                    if (isset(conf[name]) && isset(conf[name].cfg.antispamjs)) {
                        $(form).prepend('<input type="text" name="' + conf[name].cfg.antispamjs + '" value="tesby" style="display:none;">');
                    }
                });
            }
        })();
    });


    /**
     * Отправка форм.
     *
     */

    function feedback(vars, type) { // obj and id
        var bt = $(vars.form).find('.feedback');
        var btc = bt.clone();
        var bvc = bt.val();
        var cfg = conf[vars.act].cfg;
        if (lang == 'ru') {
            $.jGrowl.defaults.closerTemplate = '<div>Закрыть все</div>';
        }
        if (lang == 'en') {
            $.jGrowl.defaults.closerTemplate = '<div>Close all</div>';
        }
        if (lang == 'de') {
            $.jGrowl.defaults.closerTemplate = '<div>Alle schließen</div>';
        }
        if (lang == 'pl') {
            $.jGrowl.defaults.closerTemplate = '<div>Zamknij wszystko</div>';
        }
        $.ajax({
            type: 'POST',
            url: wp_url,
            cache: false,
            dataType: 'json',
            data: 'act=' + vars.act + '&' + vars.data,
            beforeSend: function () {
                //$(bt).val('');
                $(bt).prop("disabled", true);
                $(bt).addClass('loading');
                $(bt).addClass('loading');
            },
            success: function (answer) {
                /*if (isset(cfg.notify) && !/none/i.test(cfg.notify)) {
                    if (/color/i.test(cfg.notify)) {
                        $(vars.form).find('input[type=text]:visible,input[type=tel]:visible,input[type=email]:visible, textarea:visible, select:visible').css({'border-color': '#fff'}, 300);
                        $(vars.form).find('.popup-form__field').css({'border-color': '#e4e4e4'}, 300);
                        $(vars.form).find('.black').css({'border-color': '#000'}, 300);


                        if (isset(answer.errors)) {
                            $.each(answer.errors, function (k, val) {
                                var reg = /[a-z]/i;
                                if (reg.test(k)) {
                                    var e = $(vars.form).find('[name=' + k + ']');
                                    if (e.length == 1) {
                                        $(e).removeClass("validate_success");
                                        $(e).css({'border-color': '#FF532E'}, 100);
                                    }
                                }
                            });
                        }
                        if (isset(answer.infos)) {
                            var li = '', $inf = $('<ul>', {id: 'feedback-infolist'});
                            $.each(answer.infos, function (k, val) {
                                li += '<li>' + val + '</li>';
                            });

                            $inf.html(li);

                            $.arcticmodal('close');

                            if (/modal/i.test(cfg.notify)) {
                                var m = $('<div class="box-modal" id="feedback-modal-box" />');
                                m.html($inf);
                                m.prepend('<div class="modal-close arcticmodal-close">X</div>');
                                $.arcticmodal({content: m});
                            }
                            //bt.replaceWith($inf);

                            /!* setInterval(function(){
                             //$('#feedback-inf-box').replaceWith(btc);
                             $('#feedback-modal-box').arcticmodal('close');
                             }, 4000);*!/
                        }

                    }

                    if (/textbox/i.test(cfg.notify)) {
                        if (isset(answer.errors)) {
                            if (type == "btn-bron" || type == "btn-bron-2" || type == "individual") {
                                if (type !== "individual") {
                                    var dateVal = vars.form.find('[name="date"]').val();
                                    if (!dateVal.length)
                                        $('.modal_date').dialog();
                                    else
                                        $('.modal_data').dialog();
                                }
                            } else {
                                $.each(answer.errors, function (k, val) {
                                    if (window.location.pathname == '/') {
                                        $.jGrowl(val, {theme: 'error', header: 'Ошибка!', life: 3000});
                                    }
                                    if (window.location.pathname == '/en/') {
                                        $.jGrowl(val, {theme: 'error', header: 'Error!', life: 3000});
                                    }
                                    if (window.location.pathname == '/pl/') {
                                        $.jGrowl(val, {theme: 'error', header: 'Błąd!', life: 3000});
                                    }

                                });
                            }
                        }
                        if (isset(answer.infos)) {
                            $.each(answer.infos, function (k, val) {
                            });
                        }
                    }
                }

                $(bt).prop("disabled", false);
                $(bt).removeClass('loading');*/
                //$(bt).val(bvc);

                if (isset(answer.ok) && answer.ok == 1) {
                    var li = '', $inf = $('<ul>', {id: 'feedback-infolist'});
                    $.each(answer.infos, function (k, val) {
                        li += '<li>' + val + '</li>';
                    });

                    $inf.html(li);

                    $.arcticmodal('close');

                    if (/modal/i.test(cfg.notify)) {
                        var m = $('<div class="box-modal" id="feedback-modal-box" />');
                        m.html($inf);
                        m.prepend('<div class="modal-close arcticmodal-close">X</div>');
                        $.arcticmodal({content: m});
                    }

                    var msg = $('form[name=' + vars.act + ']').serialize();
                    $.ajax({
                        type: 'POST',
                        url: 'https://app.getresponse.com/add_subscriber.html',
                        data: msg,
                        xhrFields: {withCredentials: true},
                        complete: function () {
                            // setTimeout(function () {
                            // ПОЛУЧИТЬ БИЛЕТ В ПОДАРОК
                            if (vars.act == 'form-1') {
                                var formName = 'ticket';
                                cf7Send(formName, 'Получить билет');
                                $('#chernobyltime_ticket').trigger('click');
                                dataLayer.push({'event': 'FormPDF'});
                                setTimeout(function () {
                                    window.location.pathname = window.location.pathname + "/thank-you-ticket";
                                }, 100);
                            }
                            // ЗАКАЗАТЬ ЗВОНОК (ХЕДЕР И ФУТЕР)
                            if (vars.act == 'form-2') {
                                formName = 'call';
                                cf7Send(formName, 'Заказ звонка');
                                window.location.pathname = window.location.pathname + "/thank-you-call";
                            }
                            // ФОРМА ЗАДАЙ ЛЮБОЙ ВОПРОС В ФОРМЕ
                            if (vars.act == 'form-4') {
                                formName = 'question';
                                cf7Send(formName, "Форма задай любой вопрос");
                                dataLayer.push({'event': 'FormQuestion'});
                                setTimeout(function () {
                                    $('#chernobyltime_question').trigger('click');
                                }, 100);
                                window.location.pathname = window.location.pathname + "/thank-you-question";
                            }
                            // ФОРМА ПОД ПОЛУЧИ 25% СКИДКУ ПРИ ЗАКАЗЕ ЗА 30 ДНЕЙ
                            if (vars.act == 'form-5') {
                                formName = '30d';
                                cf7Send(formName, "Скидка 25% при заказе за 30дн");
                                dataLayer.push({'event': 'FormGet25'});
                                setTimeout(function () {
                                    $('#chernobyltime_30_d').trigger('click');
                                }, 100);
                                window.location.pathname = window.location.pathname + "/thank-you-30d";
                            }
                            // ИНДИВИДУАЛЬНАЯ ЭКСКУРСИЯ
                            if (vars.act == 'form-6') {
                                var formName = 'ind';
                                cf7Send(formName, "Индивидуальная экскурсия");
                                setTimeout(function () {
                                    $('#chernobyltime_ind').trigger('click');
                                }, 100);
                                dataLayer.push({'event': 'FormVIP'});
                                window.location.pathname = window.location.pathname + "/thank-you-order";
                            }
                            // ОДНОДНЕВНАЯ И ДВУХДНЕВНАЯ
                            if (vars.act == 'form-7' || vars.act == 'form-3') {

                                var api_url = window.location.origin + '/wp-content/themes/chernobyl/api2.php';
                                var price = parseInt($('.popup-form__price-count>span').text());
                                var priceUSD = parseInt($('.popup-form__price-count>span').text().split('/')[0]);
                                var priceEUR = parseInt($('.popup-form__price-count>span').text().split('/')[1]);
                                var ticketsCount;
                                if (lang == 'en' || lang == 'pl' || lang == 'de') {
                                    price = priceUSD + ' USD / ' + priceEUR + ' EUR'
                                }

                                // One-day cf7form
                                if (vars.act == 'form-3') {
                                    ticketsCount = $('.popup-form__field--count--main:eq(0)').val();
                                    formName = '1d';
                                    if (lang == 'en' || lang == 'pl' || lang == 'de') {
                                        $('#1d-cost').val(priceUSD + ' USD or ' + priceEUR + ' EUR');
                                        $('#1d-prepay').val(Math.round(priceUSD * 0.35) + ' USD or ' + Math.round(priceEUR * 0.35) + ' EUR');
                                    } else {
                                        price = parseInt($('.popup-form__price-count>span').text());
                                        $('#1d-cost').val(price + ' UAH');
                                        $('#1d-prepay').val(Math.round(price * 0.35) + ' UAH');
                                    }
                                    dataLayer.push({'event': 'FormComfort'});
                                    cf7Send(formName, "Однодневная экскурсия");
                                }

                                // Two-days cf7form
                                if (vars.act == 'form-7') {
                                    ticketsCount = $('.popup-form__field--count--main:eq(1)').val();
                                    formName = '2d';
                                    if (lang == 'en' || lang == 'pl' || lang == 'de') {
                                        $('#2d-cost').val(priceUSD + ' USD or ' + priceEUR + ' EUR');
                                        $('#2d-prepay').val(Math.round(priceUSD * 0.35) + ' USD or ' + Math.round(priceEUR * 0.35) + ' EUR');
                                    } else {
                                        price = parseInt($('.popup-form__price-count>span').text());
                                        $('#2d-cost').val(price + ' UAH');
                                        $('#2d-prepay').val(Math.round(price * 0.35) + ' UAH');
                                    }
                                    dataLayer.push({'event': 'FormExclusive'});
                                    cf7Send(formName, "Двухдневная экскурсия");
                                }

                                // Contact form 7 send trigger
                                setTimeout(function () {
                                    $('#chernobyltime_order_1').trigger('click');
                                    $('#chernobyltime_order_2').trigger('click');
                                }, 100);

                                // Prices for check 25% and 100% booking
                                if (lang == 'en' || lang == 'pl' || lang == 'de') {
                                    $('#full-payment').text(price);
                                    $('#advance-payment').text(Math.round(priceUSD * 0.35) + ' USD / ' + Math.round(priceEUR * 0.35) + ' EUR');
                                } else {
                                    $('#full-payment').text(price + ' UAH');
                                    $('#advance-payment').text(Math.round(price * 0.35) + ' UAH');
                                }

                                // Modal with price check trigger
                                $('#btn-bron-1').trigger('click');

                                // Confirm
                                $('#btn-pay').click(function () {
                                    var priceIn = 0;
                                    // Ckeck price for liqpay
                                    var id = $('input[name=bron]:checked').next().attr("for");
                                    id = id.charAt(id.length - 1);
                                    if (id == 1 || id == 2) {
                                        var $form = (formName == '1d' ? 'oneDay' : 'twoDay');
                                        // console.log(prices);
                                        if (id == 1) {
                                            price = calculateKassa(prices, $form);
                                            // if (lang == 'en' || lang == 'pl' || lang == 'de') {
                                                // if (formName == '1d') {
                                                    // price = 1999 * ticketsCount; 
                                                    // if ($('.day.active').hasClass('red')) {
                                                    //     priceIn = prices['oneDay']['in']['red'];
                                                    // } else if ($('.day.active').hasClass('green')) {
                                                    //     priceIn = prices['oneDay']['in']['green'];
                                                    // } else {
                                                    //     priceIn = prices['oneDay']['in']['yellow'];
                                                    // }
                                                    // price = calculateKassa(prices, 'oneDay');
                                                    // price = priceIn * ticketsCount; 
                                                // } else {
                                                //     priceIn = prices['twoDay']['in']['yellow'];
                                                //     price = priceIn * ticketsCount;
                                                // }

                                            // } else {
                                            //     price = parseInt($('#full-payment').text());
                                            // }
                                            // console.log(price);
                                            // ajaxSend(price);
                                        }
                                        if (id == 2) {
                                            price = Math.round(calculateKassa(prices, $form) * 0.35);
                                            // if (lang == 'en' || lang == 'pl' || lang == 'de') {
                                            //     if (formName == '1d') {
                                            //         if ($('.day.active').hasClass('red')) {
                                            //             priceIn = prices['oneDay']['in']['red'];
                                            //         } else if ($('.day.active').hasClass('green')) {
                                            //             priceIn = prices['oneDay']['in']['green'];
                                            //         } else {
                                            //             priceIn = prices['oneDay']['in']['yellow'];
                                            //         }
                                            //         price = priceIn * ticketsCount * 0.25;
                                            //     } else {
                                            //         priceIn = prices['twoDay']['in']['yellow'];
                                            //         price = priceIn * ticketsCount * 0.25;
                                            //     }
                                            // } else {
                                            //     price = parseInt($('#advance-payment').text());
                                            // }
                                            // ajaxSend(price);
                                        }
                                        
                                        var pay_email = $('#' + formName + '-form-email').val();
                                        ajaxSend(price, pay_email);
                                    } else {
                                        window.location.pathname = window.location.pathname + "/thank-you-order";
                                    }
                                });

                                function ajaxSend(sendPrice, pay_email) {
                                    $.ajax({
                                        url: api_url,
                                        type: "POST",
                                        data: {
                                            pricePHP: sendPrice,
                                            lang: location.pathname,
                                            pay_email: pay_email
                                        },
                                        success: function (data) {
                                            // $('.hidden').html(data);
                                            // $('#liqpaySend').trigger('click');
                                            location.href = data;
                                        },
                                        error: function () {
                                            console.error('error')
                                        }
                                    });
                                }
                            }
                            // }, 1000);
                        },
                        error: function () {
                            console.error('error');
                        }
                    });

                    // $(vars.form)[0].reset();
                } else {
                    if (lang == 'pl') {
                        swal('SPRAWDŹ PRAWIDŁOWE DANE', '', 'error');
                    } else if (lang == 'en') {
                        swal('CHECK THE CORRECTNESS OF DATA', '', 'error');
                    } else if (lang == 'de') {
                        swal('PRÜFEN SIE DIE RICHTIGEN DATEN', '', 'error');
                    } else if (lang == 'ru') {
                        swal('ПРОВЕРЬТЕ ПРАВИЛЬНОСТЬ ДАННЫХ', '', 'error');
                    }
                    $(bt).prop("disabled", false);
                    $(bt).removeClass('loading');
                }
            }
        });

    }

    $(document).on('mouseenter mouseover', '.feedback', function () {


        var form = $(this).closest('form'), name = form.attr('name');
        if (isset(conf[name]) && isset(conf[name].cfg.antispamjs)) {
            $('input[name=' + conf[name].cfg.antispamjs + ']').val('');
        }
    });


    /**
     * Обработчик кнопки форм.
     * Кнопка должна быть внутри тегов <form> c классом .feedback
     * будет отправлено любое кол-во полей, кроме файлов
     *
     */

    $(document).on('click', '.feedback', function () {
        var form = $(this).closest('form'),
            name = form.attr('name'),
            obj = {};
        //getting tell number
        var $tellValue = form.find("input[name='tellView']").intlTelInput("getNumber");
        form.find("input[name='tell']").val($tellValue);
        // add icon check
        //tell number

        obj.form = form;
        obj.act = name;
        obj.data = $(form).serialize();

        feedback(obj, $(this).attr("id"));

        return false;
    });

    var oneDay = $("#btn-bron").closest('form');
    var twoDay = $("#btn-bron-2").closest('form');
    var individual = $("#individual").closest('form');

    oneDay.find("input").blur(validate);
    twoDay.find("input").blur(validate);
    individual.find("input").blur(validate);

    function validate() {
        var $this = $(this);
        var value = $(this).val();
        var exec = function (check) {
            if (check) {
                $this.removeAttr("style");
                $this.addClass("validate_success")
            } else {
                $this.removeAttr("style");
                $this.removeClass("validate_success");
                $this.css("border-color", "rgb(255, 83, 46)")
            }
        };

        if ($this.attr("type") === "tel") {
            if (!isNaN(parseInt($this.val())) && value.length > 5) exec(true);
            else exec(false);

        } else if ($this.attr('type') === 'email') {
            var check = false;
            for (var i = 0; i < value.length; i++) {
                if (value[i] === "@" && value.length > 4) {
                    check = true
                }
            }

            if (check)
                exec(true);
            else
                exec(false);

        } else {
            if (value.length > 0) {
                if ($this.attr('people') == 'uk') {
                    $this.parents('form').find('[people="en"]').removeAttr("style").addClass('validate_success');
                } else if ($this.attr('people') == 'en') {
                    $this.parents('form').find('[people="uk"]').removeAttr("style").addClass('validate_success');
                }
                exec(true);
            } else {
                exec(false);
            }
        }

    }

}); // done


$(function () {
    $('#1d-form-tel,#2d-form-tel').parent().append('<div class="ico_checked"></div>');
});
