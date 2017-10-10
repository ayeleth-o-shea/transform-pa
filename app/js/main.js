// $(function() {
//
//   // Inits
//
//   initScroll();
//   initPopup();
//   initTabs();
//   initOwl();
//   initGallerySteps();
//
//   // Functions
//
//   function initScroll() {
//     $('a').click(function() {
//       var elementClick = '#' + $(this).attr('href').split("#")[1]
//       var destination = $(elementClick).offset().top;
//       jQuery('html:not(:animated),body:not(:animated)').animate({
//         scrollTop: destination
//       }, 800);
//       return false;
//     });
//   }
//
//   function initOwl() {
//
//     $('.owl-carousel').owlCarousel({
//       loop: false,
//       margin: 10,
//       nav: true,
//       navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
//       dots: false,
//       items: 4,
//       margin: 50,
//       responsive: {
//         1000: {
//           items: 4
//         }
//       }
//     })
//
//   }
//
//   function initPopup() {
//     if (!$('.fancybox').length) return;
//
//     $(document).on('fancybox.init', '.fancybox', function() {
//       var
//         defaults = {
//           maxWidth: 994,
//           autoResize: true,
//           padding: 0,
//           helpers: {
//             media: {},
//             overlay: {
//               locked: true
//             }
//           },
//           tpl: {
//             closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close icon-close" href="javascript:;"><i class="fa fa-times" aria-hidden="true"></i></a>',
//             next: '<a title="Далее" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
//             prev: '<a title="Назад" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
//           }
//         },
//         $el = $(this),
//         group = $el.attr('data-fancybox-group'),
//         options = eval('[' + $el.data('fancybox-options') + ']')[0];
//
//       if (group) $el = $('[data-fancybox-group="' + group + '"]');
//
//       $.extend(defaults, options);
//
//       $el.fancybox(defaults);
//     });
//
//     $('.fancybox').trigger('fancybox.init');
//   }
//
//   function initTabs() {
//     jQuery.fn.lightTabs = function(options) {
//
//       var createTabs = function() {
//         tabs = this;
//         i = 0;
//
//         showPage = function(i) {
//           $(tabs).children("div").children("div").hide();
//           $(tabs).children("div").children("div").eq(i).show();
//           $(tabs).children("ul").children("li").removeClass("active");
//           $(tabs).children("ul").children("li").eq(i).addClass("active");
//         }
//
//         showPage(0);
//
//         $(tabs).children("ul").children("li").each(function(index, element) {
//           $(element).attr("data-page", i);
//           i++;
//         });
//
//         $(tabs).children("ul").children("li").click(function() {
//           showPage(parseInt($(this).attr("data-page")));
//         });
//       };
//       return this.each(createTabs);
//     };
//
//     $(".tabs").lightTabs();
//   }
//
//   function initGallerySteps() {
//
//     $items = $('.block-past__gallery-item');
//
//     if (!$items.length) return;
//
//     $items.on('click', function() {
//
//       if (!$(this).hasClass('block-past__gallery-item_active')) {
//
//         $items.removeClass('block-past__gallery-item_active');
//         $(this).addClass('block-past__gallery-item_active');
//
//         var left = $(this).closest('.col-3').position('left').left + 15;
//         $('.block-past__arrow').css('left', left);
//
//       }
//
//     })
//
//   }
//
// });
