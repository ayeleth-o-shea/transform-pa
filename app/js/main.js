$(function() {

  initPopup();

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
});

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
