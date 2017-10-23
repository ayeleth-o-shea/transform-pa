// File Attach
$(function() {
  var wrapper = $(".file_upload"),
    inp = wrapper.find("input"),
    btn = wrapper.find(".button"),
    lbl = wrapper.find("mark");

  // Crutches for the :focus style:
  inp.focus(function() {
    wrapper.addClass("focus");
  }).blur(function() {
    wrapper.removeClass("focus");
  });

  var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

  inp.change(function() {
    var file_name;
    if (file_api && inp[0].files[0])
      file_name = inp[0].files[0].name;
    else
      file_name = inp.val().replace("C:\\fakepath\\", '');

    if (!file_name.length)
      return;

    if (lbl.is(":visible")) {
      lbl.text(file_name);
      btn.text("Выбрать");
    } else
      btn.text(file_name);
  }).change();

});
$(window).resize(function() {
  $(".file_upload input").triggerHandler("change");
});

$(function() {

  initPopup();
  initRatesPopup();
  initChartItemActive();
  initExpandAnswer();
  initCalendar();
  initTimeline();

  function initPopup() {
    if (!$('.fancybox').length) return;

    $(document).on('fancybox.init', '.fancybox', function() {
      var
        defaults = {
          maxWidth: 994,
          autoResize: true,
          padding: 0,
          helpers: {
            media: {},
            overlay: {
              locked: true
            }
          },
          tpl: {
            closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close icon-close" href="javascript:;"><i class="fa fa-times" aria-hidden="true"></i></a>',
            next: '<a title="Далее" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev: '<a title="Назад" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
          }
        },
        $el = $(this),
        group = $el.attr('data-fancybox-group'),
        options = eval('[' + $el.data('fancybox-options') + ']')[0];

      if (group) $el = $('[data-fancybox-group="' + group + '"]');

      $.extend(defaults, options);

      $el.fancybox(defaults);
    });

    $('.fancybox').trigger('fancybox.init');
  }

  function initRatesPopup() {
    $('a[href^=#payments-popup]').click(function() {
      var rateChildren = $(this).closest('.rate'); // берет dom тарифа

      var rateColor = rateChildren.attr('class').split(' ')[1]; // берем класс с цветом
      var rateTitle = rateChildren.find('.rate__title').text(); // берем заголовок
      var ratePrice = rateChildren.find('.rate__price').html(); // берем цену
      var rateUl = rateChildren.find('ul').html(); // берем список

      var popupChildren = $('#payments-popup'); // берем dom попапа

      popupChildren.find('.rate__title').text(rateTitle); //подставляем заголовок
      popupChildren.find('.rate__price').html(ratePrice); //подставляем цену

      // подставляем цвет
      popupChildren.find('.popup-start, .payments-btn')
        .removeClass('blue green yellow orange pink purple')
        .addClass(rateColor);

      // подставляем список
      popupChildren.find('ul').html(rateUl);
    });
  }

  function initChartItemActive() {
    var active = $('.offers__right').find('.chart__item.active');
    active.find('.chart__number').html('<img src="img/chart-active.png" alt="">');

    var needpay = $('.offers__right').find('.chart__item.needpay');
    needpay.find('.chart__number').html('<img src="img/chart-needpay.png" alt="">');

  }

  function initExpandAnswer() {
    $("button.expand-answer").on("click", function() {
      $(".verified .answer, .verified .answer__text").toggleClass("expand");
      if ($(".verified .answer").hasClass('expand')) {
        $("button.expand-answer").text('Свернуть');
      } else {
        $("button.expand-answer").text('Развернуть');
      }
    });
  }

  function initCalendar() {
    $('.calendar__choose').click(function() {
      var myDatepicker = $('.datepicker-here').datepicker().data('datepicker');
      myDatepicker.show();
    })

  }

  function initTimeline() {

    var $frame = $('#basic');
    var $slidee = $frame.children('ul').eq(0);
    var $wrap = $frame.parent();

    // Call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: 'centered',
      smart: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: $wrap.find('.active'),
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      pagesBar: $wrap.find('.pages'),
      activatePageOn: 'click',
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    });

    // Add item
    $wrap.find('.add').on('click', function() {
      $frame.sly('add', '<li>' + $slidee.children().length + '</li>');
    });

    // Remove item
    $wrap.find('.remove').on('click', function() {
      $frame.sly('remove', -1);
    });
  }

});
