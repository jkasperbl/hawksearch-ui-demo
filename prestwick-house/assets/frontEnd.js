/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/



; (function ($, window, document, undefined) {
    $.fn.doubleTapToGo = function (params) {
        if (!('ontouchstart' in window) &&
			!navigator.msMaxTouchPoints &&
			!navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;

        this.each(function () {
            var curItem = false;

            $(this).on('click', function (e) {
                var item = $(this);
                if (item[0] != curItem[0]) {
                    e.preventDefault();
                    curItem = item;
                }
            });

            $(document).on('click touchstart MSPointerDown', function (e) {
                var resetItem = true,
					parents = $(e.target).parents();

                for (var i = 0; i < parents.length; i++)
                    if (parents[i] == curItem[0])
                        resetItem = false;

                if (resetItem)
                    curItem = false;
            });
        });
        return this;
    };
})(jQuery, window, document);

$(document).ready(function () {
    $('ul.main-nav li.hasChildren').doubleTapToGo();
});

    //Truncate long lists and add toggle link to show hide the hidden ones
    function truncateList(maxShown, linkTextShow, linkTextHide)
    {
        // set default to show
        if (!maxShown)
            maxShown = 5;
	
        // set defaults for link texts
        if (!linkTextShow)
            linkTextShow = "More";
        if (!linkTextHide)
            linkTextHide = "Less";
	
        $('ul.truncated').each(
            function() {
                if ($(this).children('li').length > maxShown)
                {
                    // hide anything after the maxShown item
                    $(this).find("li:gt(" + (maxShown-1) + ")").addClass("is-hidden");
                    // add the View more link
                    var numMore = $(this).find("li:gt(" + (maxShown-1) + ")").length;
                    $(this).append("<li class='truncateToggle'><a href=\"javascript:void(0)\">" + linkTextShow + " (" + numMore + ")</a></li>");
                    // wire up link click event
                    $(this).find('.truncateToggle a').click(function(e){
                        e.preventDefault();
                        if ($(this).closest('ul').find('li.is-hidden').length > 0)
                        {
                            // show items
                            $(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateToggle').removeClass('is-hidden');
                            $(this).html(linkTextHide);
                            $(this).closest('li').addClass('is-active');
                        }
                        else
                        {
                            // hide items
                            var numMore = $(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateToggle').length;
                            $(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateToggle').addClass('is-hidden');
                            $(this).html(linkTextShow + " (" + numMore + ")");
                            $(this).closest('li').removeClass('is-active');
                        }
                    });
                }
            }
        );
    }

    window.onload = function (event) {
        /* ---------
        Equal Height
        --------- */

        var maxHeight = Math.max.apply(null, $(".category-list div.equal-height").map(function () {
            return $(this).outerHeight();
        }).get());
        $('.category-list div.equal-height').css({ height: maxHeight + 'px' });
    }

    //Adjust Product List Items height based on screen width
    $(window).on('load', function() {
    if (screen.width >= 1024) {
            ProductList3Column();
        }
        else if (screen.width >= 480 && screen.width <= 1024) {
            ProductList2Column();
        }
    });

    function ProductList2Column() {
        $('.product-item:nth-child(2n+1)').each(function () {
            var titleMaxHeight = $(this).find('div.equal-height').outerHeight();
            var itemMaxHeight;

            var nextDiv = $(this).next('.product-item');
            var compareTitleHeight;
            var compareItemHeight;

            for (var i = 1; i <= 2; i++) {
                compareTitleHeight = nextDiv.find('div.equal-height').outerHeight();
                if (compareTitleHeight > titleMaxHeight) {
                    titleMaxHeight = compareTitleHeight;
                }
                nextDiv = nextDiv.next('.product-item');
            }

            $(this).find('div.equal-height').css('height', titleMaxHeight + 'px');
            $(this).next('.product-item').find('div.equal-height').css('height', titleMaxHeight + 'px');

            itemMaxHeight = $(this).outerHeight();
            nextDiv = $(this).next('.product-item');

            for (var i = 1; i <= 1; i++) {
                compareItemHeight = nextDiv.outerHeight();
                if (compareItemHeight > itemMaxHeight) {
                    itemMaxHeight = compareItemHeight;
                }
                nextDiv = nextDiv.next('.product-item');
            }

            $(this).css('height', itemMaxHeight + 'px');
            $(this).next('.product-item').css('height', itemMaxHeight + 'px');
        });
    }

    function ProductList3Column() {
        $('.product-item:nth-child(3n+1)').each(function () {
            var titleMaxHeight = $(this).find('div.equal-height').outerHeight();
            var itemMaxHeight;

            var nextDiv = $(this).next('.product-item');
            var compareTitleHeight;
            var compareItemHeight;

            for (var i = 1; i <= 2; i++) {
                compareTitleHeight = nextDiv.find('div.equal-height').outerHeight();
                if (compareTitleHeight > titleMaxHeight) {
                    titleMaxHeight = compareTitleHeight;
                }
                nextDiv = nextDiv.next('.product-item');
            }

            $(this).find('div.equal-height').css('height', titleMaxHeight + 'px');
            $(this).next('.product-item').find('div.equal-height').css('height', titleMaxHeight + 'px');
            $(this).next('.product-item').next('.product-item').find('div.equal-height').css('height', titleMaxHeight + 'px');

            itemMaxHeight = $(this).outerHeight();
            nextDiv = $(this).next('.product-item');

            for (var i = 1; i <= 2; i++) {
                compareItemHeight = nextDiv.outerHeight();
                if (compareItemHeight > itemMaxHeight) {
                    itemMaxHeight = compareItemHeight;
                }
                nextDiv = nextDiv.next('.product-item');
            }
            $(this).css('height', itemMaxHeight + 'px');
            $(this).next('.product-item').css('height', itemMaxHeight + 'px');
            $(this).next('.product-item').next('.product-item').css('height', itemMaxHeight + 'px');
        });
    }

    function FixProductListHeight(y) {
        if (screen.width >= 1024) {
            ProductList3Column();
        }
        else if (screen.width >= 480 && screen.width <= 1024) {
            ProductList2Column();
        }
    }

    window.addEventListener("resize", FixProductListHeight, false);


    $(document).ready(function () {

        $("div.reviews div.tabsContainer").hide();
        $("div.reviews div.tab").hide();
        if ($('.rating0').length) {
            $('#readreviews').html('Be the first to review');
            $("ul.reviews li:last a").addClass("active");
            $("div.reviews div.tabsContainer").hide();
            $("div.reviews div.tab").show();
        }
        else {
            $("ul.reviews li:first a").addClass("active");
            $("div.reviews div.tabsContainer").show();
            $("div.reviews div.tab").hide();
        }

        /*! http://mths.be/placeholder v2.0.7 by @mathias */
        ; (function (f, h, $) { var a = 'placeholder' in h.createElement('input'), d = 'placeholder' in h.createElement('textarea'), i = $.fn, c = $.valHooks, k, j; if (a && d) { j = i.placeholder = function () { return this }; j.input = j.textarea = true } else { j = i.placeholder = function () { var l = this; l.filter((a ? 'textarea' : ':input') + '[placeholder]').not('.placeholder').bind({ 'focus.placeholder': b, 'blur.placeholder': e }).data('placeholder-enabled', true).trigger('blur.placeholder'); return l }; j.input = a; j.textarea = d; k = { get: function (m) { var l = $(m); return l.data('placeholder-enabled') && l.hasClass('placeholder') ? '' : m.value }, set: function (m, n) { var l = $(m); if (!l.data('placeholder-enabled')) { return m.value = n } if (n == '') { m.value = n; if (m != h.activeElement) { e.call(m) } } else { if (l.hasClass('placeholder')) { b.call(m, true, n) || (m.value = n) } else { m.value = n } } return l } }; a || (c.input = k); d || (c.textarea = k); $(function () { $(h).delegate('form', 'submit.placeholder', function () { var l = $('.placeholder', this).each(b); setTimeout(function () { l.each(e) }, 10) }) }); $(f).bind('beforeunload.placeholder', function () { $('.placeholder').each(function () { this.value = '' }) }) } function g(m) { var l = {}, n = /^jQuery\d+$/; $.each(m.attributes, function (p, o) { if (o.specified && !n.test(o.name)) { l[o.name] = o.value } }); return l } function b(m, n) { var l = this, o = $(l); if (l.value == o.attr('placeholder') && o.hasClass('placeholder')) { if (o.data('placeholder-password')) { o = o.hide().next().show().attr('id', o.removeAttr('id').data('placeholder-id')); if (m === true) { return o[0].value = n } o.focus() } else { l.value = ''; o.removeClass('placeholder'); l == h.activeElement && l.select() } } } function e() { var q, l = this, p = $(l), m = p, o = this.id; if (l.value == '') { if (l.type == 'password') { if (!p.data('placeholder-textinput')) { try { q = p.clone().attr({ type: 'text' }) } catch (n) { q = $('<input>').attr($.extend(g(this), { type: 'text' })) } q.removeAttr('name').data({ 'placeholder-password': true, 'placeholder-id': o }).bind('focus.placeholder', b); p.data({ 'placeholder-textinput': q, 'placeholder-id': o }).before(q) } p = p.removeAttr('id').hide().prev().attr('id', o).show() } p.addClass('placeholder'); p[0].value = p.attr('placeholder') } else { p.removeClass('placeholder') } } } (this, document, jQuery));

        /* ------------
        Homepage Slider
        ------------ */

        var slider = $('div.brandtile');
        var slidingElement = $("div.brandtile ul.slider");
        var allSlides = $("div.brandtile ul.slider li");
        var slideWidth = 800;
        var currentSlide = 0;
        var sliderNavContainer = $('ul.button-wrap');
        var currentPosition = 0;

        $(allSlides).each(function (i) {
            if (i == 0) {
                sliderNavContainer.append('<li><a href="#" class="current"></a></li>');
            } else {
                sliderNavContainer.append('<li><a href="#"></a></li>');
            }
        });

        var sliderNavButtons = $("ul.button-wrap a");

        function changeSlide() {
            currentPosition = -(currentSlide * slideWidth);
            $(slidingElement).animate({ left: currentPosition }, 1000);
            sliderNavButtons.removeClass("current");
            sliderNavButtons.filter(":eq(" + currentSlide + ")").addClass("current");
        }

        function nextSlide() {
            currentSlide++;
            if (currentSlide >= allSlides.length) {
                currentSlide = 0;
            }
            changeSlide();
        }

        // Change Slide on Button Click
        $(sliderNavButtons).click(function () {
            currentSlide = $(sliderNavButtons).index($(this));
            changeSlide();
            return false;
        });

        // Automatically Animate
        var sliderInterval = setInterval(nextSlide, 4000);

        // Pause on Hover
        $(slider).hover(function () {
            clearInterval(sliderInterval);
        }, function () {
            sliderInterval = setInterval(nextSlide, 4000);
        });

        // if ( window.matchMedia("(max-width: 700px)").matches ) {
        //     var slideWidth = 400;
        // } else {
        //     var slideWidth = 800;
        // }       

        /* --------------------------------------
        Hover State for Chat Now Button in Header
        -------------------------------------- */

        $("div#header div.middle img.HelpOnClick-icon").mouseenter(function () {
            $("div#header div.middle a.button").addClass("hover");
        }).mouseleave(function () {
            $("div#header div.middle a.button").removeClass("hover");
        });

        /* ---------------------------------
        Toggle Show/Hide for Wishlist Popups
        --------------------------------- */

        $("a.wishlist").click(function () {
            $(this).parent("div.wishlist").toggleClass("show");
        });
        $("div.add-to-wishlist a.icon").click(function () {
            // $("div.wishlist").removeClass("show");
        });
        $("body").each(function () {
            if ($(this).hasClass("iAppsEditMode")) {
                $("div.show-in-editor").addClass("show");
            }
        });

        /* -------------
        Overrides for IE
        ------------- */

        $("table tbody tr:nth-child(even)").addClass("even");
        //$("table tbody tr:nth-child(odd):last-child").addClass("bottom-border");
        $("ul.footer-nav li:nth-child(odd)").addClass("odd");
        $("ul.footer-nav li:nth-child(even)").addClass("even");
        $("ul.category-list li:nth-child(odd)").addClass("odd");
        $("ul.category-list li:nth-child(even)").addClass("even");
        $("ul.category-list li:nth-child(odd):first").css("border-top", "1px solid #e4ddc7");
        $("ul.category-list li:nth-child(even):first").css("border-top", "1px solid #e4ddc7");
        $("input, textarea").placeholder();
        $("div.reviews div.commentsContent div.commentItem:first").addClass("first");
        $("div.reviews div.commentsContent div.commentItem:last").addClass("last");

        /* ------------------
        Show/Hide Review Tabs
        ------------------ */

        // $("div.reviews div.commentsContent").addClass("show");

        $("ul.reviews li:first a").click(function (firstTab) {
            $(this).addClass("active");
            $("ul.reviews li a").not(this).removeClass("active");
            $("div.reviews div.tabsContainer").show();
            $("div.reviews div.tab").hide();
            firstTab.preventDefault();
        });

        $("ul.reviews li:last a").click(function (lastTab) {
            $(this).addClass("active");
            $("ul.reviews li a").not(this).removeClass("active");
            $("div.reviews div.tabsContainer").hide();
            $("div.reviews div.tab").show();
            lastTab.preventDefault();
        });

        /* ---------------------------------------
        Expand/Collapse Sections for Checkout Page
        --------------------------------------- */

        $("div.accordion a.billing").click(function (billing) {
            $("div.billing").addClass("expanded")
            $("h3.billing").addClass("current");
            $("div.shipping").removeClass("expanded");
            $("h3.shipping").removeClass("current");
            $("div.review").removeClass("expanded");
            $("h3.review").removeClass("current");
            billing.preventDefault();
        });

        $("div.accordion a.shipping").click(function (shipping) {
            $("div.shipping").addClass("expanded")
            $("h3.shipping").addClass("current");
            $("div.billing").removeClass("expanded");
            $("h3.billing").removeClass("current");
            $("div.review").removeClass("expanded");
            $("h3.review").removeClass("current");
            shipping.preventDefault();
        });

        $("div.accordion a.review").click(function (review) {
            var nameOnCard = $("input.name-on-card").val();
            if (nameOnCard === undefined)
                nameOnCard = $("#" + hdnCCNameOnCard).val();
       
            var cardType = $("select.card-type option:selected").text();
            if (cardType == '')
                cardType = $("#" + hdnCCType).val();

            var cardNumber = $("input.card-number").val();
            if (cardNumber === undefined)
                cardNumber = $("#" + hdnCCLast4).val();

            var cardMonth = $("select.month option:selected").text();
            if (cardMonth == '')
                cardMonth = $("#" + hdnCCExpirationMonth).val();

            var cardYear = $("select.year option:selected").text();
            if (cardYear == '')
                cardYear = $("#" + hdnCCExpirationYear).val();

            var phone = $("div.billing input.phone").val();
            if (phone === undefined)
                phone = $("#" + hdnPhone).val();

            var address1 = $("div.billing input.street1").val();
            if (address1 === undefined)
                address1 = $("#" + hdnStreet1).val();

            var address2 = $("div.billing input.street2").val();
            if (address2 === undefined)
                address2 = $("#" + hdnStreet2).val();

            var city = $("div.billing input.city").val();
            if (city === undefined)
                city = $("#" + hdnCity).val();

            var state = $("div.billing select.state option:selected").text();
            if (state == '')
                state = $("#" + hdnState).val();

            var zip = $("div.billing input.zip").val();
            if (zip === undefined)
                zip = $("#" + hdnZip).val();

            var country = $("div.billing select.country option:selected").text();
            if (country == '')
                country = $("#" + hdnCountry).val();

            var paymentType = $("div.billing select.payment-method option:selected").text();
            var poNumber = $("div.billing input.po-number").val();

            $("div.review").addClass("expanded")
            $("h3.review").addClass("current");
            $("div.shipping").removeClass("expanded");
            $("h3.shipping").removeClass("current");
            $("div.billing").removeClass("expanded");
            $("h3.billing").removeClass("current");
            review.preventDefault();

            if (paymentType == "Credit Card") {
                $("div.review span.name").css("display", "block");
                $("div.review span.card-name-label").text("Name on Card:");
                $("div.review span.name-on-card").text(nameOnCard);
                $("div.review span.payment-type").text(cardType);
                $("div.review span.card-number-label").text("Card Ending In:");
                if(cardNumber.length > 4)
                    $("div.review span.card-number").text(cardNumber.substr(cardNumber.length - 4));
                else
                    $("div.review span.card-number").text(cardNumber);
                $("div.review span.card-expiration").css("display", "block");
                $("div.review span.expiry-month").text(cardMonth);
                $("div.review span.expiry-year").text(cardYear);
            }

            if (paymentType == "Purchase Order") {
                $("div.review span.name").css("display", "none");
                $("div.review span.payment-type").text("Purchase Order");
                $("div.review span.card-number-label").text("P.O. Number:");
                $("div.review span.card-number").text(poNumber);
                $("div.review span.card-expiration").css("display", "none");
            }

            $("div.review span.phone").text(phone);
            $("div.review span.address1").text(address1);
            $("div.review span.city").text(city);
            $("div.review span.state").text(state);
            $("div.review span.zip").text(zip);
            $("div.review span.country").text(country);

        });

        /* ---------------------
        Free Book Selected State
        --------------------- */

        $("table.free-book tbody tr td ul li").each(function () {
            if ($(this).children(".equal-height").children(".listing").children(".selected").length > 0) {
                $(this).addClass("selected");
            }
        });

    });


    function BuyNowWithQty(Sku, Qty)
    {
        $.ajax({
            type: "POST",
            url: '/CustomWeb/CustomWebService.aspx/AddToCart',
            data: '{sku:"' + Sku + '", quantity:"' + Qty + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    $('#pCartCount').text('(' + response.d + ') items');
                    window.location.href = "/shopping-cart";
                }
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

    function BuyNow(Sku) {
        $.ajax({
            type: "POST",
            url: '/CustomWeb/CustomWebService.aspx/AddToCart',
            data: '{sku:"' + Sku + '", quantity:"' + 1 + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    $('#pCartCount').text('(' + response.d + ') items');
                    window.location.href = "/shopping-cart";
                }
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

    function RestrictSpace(event) {
        if (event.which == 32) {
            return false;
        }
    }


//Tabs Functionality - seen on T8 My Account, REMOVED 6/12
// $(document).ready(function(){
//     $('ul.tabs').each(function(){
        
//         var $active, $content, $links = $(this).find('a');
//         $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
//         $active.addClass('active');
//         $content = $($active.attr('href'));

//         $links.not($active).each(function () {
//             $($(this).attr('href')).hide();
//         });

//         $(this).on('click', 'a', function(e){
//             $active.removeClass('active');
//             $content.hide();

//             $active = $(this);
//             $content = $($(this).attr('href'));

//             $active.addClass('active');
//             $content.show();

//             e.preventDefault();
//         });
//     });
// });
//mobile drawer
$(document).ready(function() {
   drawer({
      mediaQuery: 1024
   });
});

function drawer(options) {
   var opts = options;
   var defaults = {
      mediaQuery: 1024
   };
   var options = $.extend({}, defaults, opts);
   var mediaQuery = options.mediaQuery;

   function mobileHide() {
      if (window.matchMedia('(min-width: ' + mediaQuery + 'px)').matches) {
         $('body').removeClass('is-toggled--drawer');
         $(window).off('resize orientationchange', mobileHide);
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      }
   }

   var $contentItems = $(".drawerItem");
   var contentClass;

   $('.drawer-content').append($contentItems);
   $('.drawerToggle').click(function() {
      var $contentItem = $("*[data-id='" + $(this).attr('data-for') + "']");
      var mobileOnly = false;

      contentClass = "drawer--" + $(this).attr('data-for');

      if ($(this).data('mobile') == true) {
         mobileOnly = true;
      }

      $contentItems.removeClass('is-visible');
      $contentItem.addClass('is-visible');

      if ($('body').hasClass('is-toggled--drawer')) {
         $('body').removeClass('is-toggled--drawer');
         $('html').css('overflow', '');
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      } else {
         $('body').addClass('is-toggled--drawer');
         $('.drawer').addClass(contentClass);
         $('html').css('overflow', 'hidden');
      }

      if (mobileOnly) {
         $(window).on('resize orientationchange', mobileHide);
      }
   });
   $('.drawer-close').click(function() {
      $('body').removeClass('is-toggled--drawer');
      $('html').css('overflow', '');
      setTimeout(function() {
         $('.drawer').removeClass(contentClass);
      }, 350);
   });
   $(document).click(function(event) {
      var $target = $(event.target);
      if ($('body').hasClass('is-toggled--drawer') && !$target.closest('.drawer').length && !$target.is('.drawerToggle')) {
         event.preventDefault();
         $('body').removeClass('is-toggled--drawer');
         $('html').css('overflow', '');
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      }
   });
}

// #### Start HawkSearch ####

if (typeof hawk_config === 'undefined') {
    var hawk_config = {
        AutocompleteProd: 'https://essearchapi-na.hawksearch.com/api/v2/autocomplete',
        AutocompleteTest: 'https://searchapi-test.hawksearch.net/api/v2/autocomplete',
        AutocompleteDev: 'https://searchapi-dev.hawksearch.net/api/v2/autocomplete',
        ClientGuid: 'e3ce9f3f3f0647a89385c9c57b0e68f9',
        IgnoreSpellcheck: false,
        ProductionSiteURL: 'https://www.prestwickhouse.com',
        RecommendationURLProd: 'https://recs-na.hawksearch.com/api/recommendation/v2/',
        RecommendationURLTest: 'https://recs-test.hawksearch.net/api/recommendation/v2/',
        RecommendationURLDev: 'https://recs-dev.hawksearch.net/api/recommendation/v2/',
        SearchPageURLProd: '/search',
        SearchPageURLDev: '/T-26-search.shtml',
        SearchURLProd: 'https://essearchapi-na.hawksearch.com/api/v2/search',
        SearchURLTest: 'https://searchapi-test.hawksearch.net/api/v2/search',
        SearchURLDev: 'https://searchapi-dev.hawksearch.net/api/v2/search',
        TrackingURLProd: 'https://tracking-na.hawksearch.com/api/trackevent',
        TrackingURLTest: 'https://tracking-test.hawksearch.net/api/trackevent',
        TrackingURLDev: 'https://tracking-dev.hawksearch.net/api/trackevent',
        ShowTopPagination: true,
        ShowTopPerPage: true,
        ShowBottomPerPage: false,
        CategoryHeading: 'Top Product Categories',
        ContentHeading: 'Top {0} Content Matches',
        PopularHeading: 'Popular Searches',
        ProductHeading: 'Top {0} Product Matches',
        ViewAllButtonLabel: 'View All Matches',
        ShowViewSwitch: true,
        GridMarkup: '',
        ListMarkup: '',
        ViewType: 'grid'
    };
}

var price_formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

var view_type = getCookie('view_type');
if (!view_type) {
    setCookie('view_type', hawk_config.ViewType, getVisitorExpiry());
} else {
    hawk_config.ViewType = view_type;
}

var autocompleteURL, using_autocomplete, using_search_within, recommendationURL, searchPage, trackingURL;
var isLiveSite = true;
var search_delay = 200;
var searchObject = {};
var openFacets = [];
var searchPageLoaded = false;
var trackingId = '';

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return '';
};

$(document).on('click', 'body', function(event) {
    if (!$(event.target).closest('.searchBox-textField').length) {
        if ($('.searchResults-autocomplete').css('display') == 'block') {
            if ($('.searchResults-autocomplete:hover').length == 0) {
                $('.searchResults-autocomplete').hide();
            }
        }
    }
});

$(document).on('click', '.searchBox-textField', function() {
    if ($(this).val().length >= 2 && $('.searchResults-autocomplete').html().length > 0) {
        $('.searchResults-autocomplete').show();
    }
});

$(document).on('click', '.search-clear', function() {
    $('.searchBox-textField').val('');
    $('.searchResults-autocomplete').hide();
});

$(document).on('click', '.autocomplete-close', function() {
    $('.searchResults-autocomplete').hide();
});

$(document).on('click', '.search-within-clear', function() {
    $('#search_within, #search_within_mobile').val('');
});

$(document).ready(function() {

    if (window.location.protocol + '//' + window.location.hostname == hawk_config.ProductionSiteURL) {
        autocompleteURL = hawk_config.AutocompleteProd;
        searchPage = hawk_config.SearchPageURLProd;
        trackingURL = hawk_config.TrackingURLProd;
        recommendationURL = hawk_config.RecommendationURLProd;
    } else if ((window.location.protocol + '//' + window.location.hostname).indexOf('stage') !== -1) {
        autocompleteURL = hawk_config.AutocompleteTest;
        searchPage = hawk_config.SearchPageURLProd;
        trackingURL = hawk_config.TrackingURLTest;
        recommendationURL = hawk_config.RecommendationURLTest;
    } else if ((window.location.protocol + '//' + window.location.hostname).indexOf('dev') !== -1 || (window.location.protocol + '//' + window.location.hostname).indexOf('local') !== -1) {
        autocompleteURL = hawk_config.AutocompleteDev;
        searchPage = hawk_config.SearchPageURLProd;
        trackingURL = hawk_config.TrackingURLDev;
        recommendationURL = hawk_config.RecommendationURLDev;
    } else {
        autocompleteURL = hawk_config.AutocompleteDev;
        searchPage = hawk_config.SearchPageURLDev;
        trackingURL = hawk_config.TrackingURLDev;
        recommendationURL = hawk_config.RecommendationURLDev;
        isLiveSite = false;
    }

    $('body').on('click', '.searchAccordion', function(event) {
        event.preventDefault();
        $(this).toggleClass('searchAccordionActive');
        if ($(this).hasClass('searchAccordionActive')) {
            $(this).next().slideDown();
            if (!$('.searchAccordionMobile[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').hasClass('searchAccordionActive')) {
                $('.searchAccordionMobile[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').addClass('searchAccordionActive');
                $('.searchAccordionMobile[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').next().slideDown();
            }
            if (!openFacets.includes($(this).attr('data-searchaccordion'))) {
                openFacets.push($(this).attr('data-searchaccordion'));
            }
        } else {
            $(this).next().slideUp();
            if ($('.searchAccordionMobile[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').hasClass('searchAccordionActive')) {
                $('.searchAccordionMobile[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').removeClass('searchAccordionActive');
                $('.searchAccordionMobile[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').next().slideUp();
            }
            if (openFacets.includes($(this).attr('data-searchaccordion'))) {
                openFacets.splice(openFacets.indexOf($(this).attr('data-searchaccordion')), 1);
            }
        }
    });

    $('body').on('click', '.searchAccordionMobile', function(event) {
        event.preventDefault();
        $(this).toggleClass('searchAccordionActive');
        if ($(this).hasClass('searchAccordionActive')) {
            $(this).next().slideDown();
            if (!$('.searchAccordion[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').hasClass('searchAccordionActive')) {
                $('.searchAccordion[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').addClass('searchAccordionActive');
                $('.searchAccordion[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').next().slideDown();
            }
            if (!openFacets.includes($(this).attr('data-searchaccordion'))) {
                openFacets.push($(this).attr('data-searchaccordion'));
            }
        } else {
            $(this).next().slideUp();
            if ($('.searchAccordion[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').hasClass('searchAccordionActive')) {
                $('.searchAccordion[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').removeClass('searchAccordionActive');
                $('.searchAccordion[data-searchaccordion="' + $(this).attr('data-searchaccordion') + '"]').next().slideUp();
            }
            if (openFacets.includes($(this).attr('data-searchaccordion'))) {
                openFacets.splice(openFacets.indexOf($(this).attr('data-searchaccordion')), 1);
            }
        }
    });

    $(document).on('click', '.hawk .searchBox-submit', function(event) {
        event.preventDefault();
        issueSearchRequest();
    });

    $(document).on('keyup', '.hawk .searchBox-textField', function(event) {
        if (event.key === 'Enter') {
            issueSearchRequest();
        }
        if ($('.hawk .searchBox-submit').val() == '') {
            $('.searchResults-autocomplete').hide();
        }
    });

    $(document).on('input', '.hawk .searchBox-textField', function() {
        if ($(window).width() >= 768) {
            if (using_autocomplete) {
                clearTimeout(using_autocomplete);
            }
            using_autocomplete = setTimeout(function() {
                var autocomplete = {
                    ClientGuid: hawk_config.ClientGuid,
                    Keyword: $('.hawk .searchBox-textField').val(),
                    DisplayFullResponse: true
                };
                if (autocomplete.Keyword.length >= 2) {
                    $('.mloader').css('display', 'block');
                    $.ajax({
                        url: autocompleteURL,
                        type: "POST",
                        headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=UTF-8'},
                        data: JSON.stringify(autocomplete),
                        dataType: 'json',
                        success: function (data) {
                            $('.searchResults-autocomplete').html('<button title="Close (Esc)" type="button" class="autocomplete-close">×</button>');
                            var markup = '';
                            if (typeof data.Popular !== 'undefined') {
                                if (data.Popular.length > 0) {
                                    markup += '<div class="autocomplete-container">';
                                    markup += '<h3>' + hawk_config.PopularHeading + '</h3>';
                                    data.Popular.forEach(function(popular) {
                                        var resultURL = popular.Url;
                                        if (resultURL[0] != '/') resultURL = '/' + resultURL;
                                        if (!isLiveSite) {
                                            resultURL = hawk_config.ProductionSiteURL + resultURL;
                                        }
                                        markup += '<div class="autocomplete-result"><a data-suggest-type="1" href="' + resultURL + '">' + popular.Value + '</a></div>';
                                    });
                                    markup += '</div>';
                                }
                            }
                            if (typeof data.Categories !== 'undefined') {
                                if (data.Categories.length > 0) {
                                    markup += '<div class="autocomplete-container">';
                                    markup += '<h3>' + hawk_config.CategoryHeading + '</h3>';
                                    data.Categories.forEach(function(category) {
                                        var resultURL = category.Url;
                                        if (resultURL[0] != '/') resultURL = '/' + resultURL;
                                        if (!isLiveSite) {
                                            resultURL = hawk_config.ProductionSiteURL + resultURL;
                                        }
                                        markup += '<div class="autocomplete-result"><a data-suggest-type="2" href="' + resultURL + '">' + category.Value + '</a></div>';
                                    });
                                    markup += '</div>';
                                }
                            }
                            if (typeof data.Content !== 'undefined') {
                                if (data.Content.length > 0) {
                                    markup += '<div class="autocomplete-container">';
                                    markup += '<h3>' + hawk_config.ContentHeading.replace('{0}', data.Content.length) + '</h3>';
                                    data.Content.forEach(function(content) {
                                        var resultURL = content.Url;
                                        if (resultURL[0] != '/') resultURL = '/' + resultURL;
                                        if (!isLiveSite) {
                                            resultURL = hawk_config.ProductionSiteURL + resultURL;
                                        }
                                        markup += '<div class="autocomplete-result"><a data-suggest-type="4" href="' + resultURL + '">' + content.Value + '</a></div>';
                                    });
                                    markup += '</div>';
                                }
                            }
                            if (typeof data.Products !== 'undefined') {
                                if (data.Products.length > 0) {
                                    markup += '<div class="autocomplete-container">';
                                        markup += '<h3>' + hawk_config.ProductHeading.replace('{0}', data.Products.length) + '</h3>';
                                        data.Products.forEach(function(product) {
                                            var productURL = '';
                                            var image_thumbnail = '';
                                            var description = '';
                                            var price = 0;
                                            var retail_price = 0;
                                            var price_reduced = false;
                                            var media_format = '';
                                            if (typeof product.Results !== 'undefined') {
                                                if (typeof product.Results.Document !== 'undefined') {
                                                    if (typeof product.Results.Document.url !== 'undefined') {
                                                        productURL = product.Results.Document.url;
                                                        if (Array.isArray(productURL)) {
                                                            productURL = productURL[0];
                                                        }
                                                        if (productURL[0] != '/') productURL = '/' + productURL;
                                                        if (!isLiveSite) {
                                                            productURL = hawk_config.ProductionSiteURL + productURL;
                                                        }
                                                    }
                                                    if (typeof product.Results.Document.thumb_image_link !== 'undefined') {
                                                        image_thumbnail = product.Results.Document.thumb_image_link;
                                                        if (Array.isArray(image_thumbnail)) {
                                                            image_thumbnail = image_thumbnail[0];
                                                        }
                                                        if (image_thumbnail[0] != '/') image_thumbnail = '/' + image_thumbnail;
                                                        if (!isLiveSite) {
                                                            image_thumbnail = hawk_config.ProductionSiteURL + image_thumbnail;
                                                        }
                                                    }
                                                }
                                            }
                                            if (typeof product.Results.Document.shortdescription !== 'undefined') {
                                                description = product.Results.Document.shortdescription;
                                                if (Array.isArray(description)) {
                                                    description = description.join(' ');
                                                }
                                                if (!Array.isArray(description) && description.length > 200) {
                                                    description = description.substring(0, 197) + '...';
                                                }
                                                description = description.replace(/&nbsp;/g, ' ');
                                            }
                                            if (typeof product.Results.Document.price !== 'undefined') {
                                                price = product.Results.Document.price;
                                                if (Array.isArray(price)) {
                                                    price = price[0];
                                                }
                                            }
                                            if (typeof product.Results.Document.paperback_pb !== 'undefined') {
                                                if (product.Results.Document.paperback_pb == '1') {
                                                    price = product.Results.Document.price25;
                                                    price_reduced = true;
                                                    if (Array.isArray(price)) {
                                                        price = price[0];
                                                    }
                                                }
                                            }
                                            if (typeof product.Results.Document.retail_price !== 'undefined') {
                                                retail_price = product.Results.Document.retail_price;
                                                if (Array.isArray(retail_price)) {
                                                    retail_price = retail_price[0];
                                                }
                                            }
                                            if (typeof product.Results.Document.media_format !== 'undefined') {
                                                media_format = product.Results.Document.media_format;
                                                if (Array.isArray(media_format)) {
                                                    media_format = media_format[0];
                                                }
                                                if (media_format == 'ACD') media_format = 'Audio CD';
                                                if (media_format == 'AUD') media_format = 'Audiocassette';
                                                if (media_format == 'BND') media_format = 'Bundle';
                                                if (media_format == 'CAT') media_format = 'Catalogue';
                                                if (media_format == 'CDR') media_format = 'CD-ROM Reproducible';
                                                if (media_format == 'CMT') media_format = 'Component';
                                                if (media_format == 'DVD') media_format = 'DVD Movie';
                                                if (media_format == 'HBK') media_format = 'Hardcover';
                                                if (media_format == 'OBS') media_format = 'Obsolete';
                                                if (media_format == 'ONL') media_format = 'Online Resources';
                                                if (media_format == 'OTH') media_format = 'Other';
                                                if (media_format == 'PBK') media_format = 'Paperback';
                                                if (media_format == 'PCT') media_format = 'Picture Book';
                                                if (media_format == 'PDF') media_format = 'Downloadable PDF File';
                                                if (media_format == 'PST') media_format = 'Poster';
                                                if (media_format == 'RPD') media_format = 'Reproducible';
                                                if (media_format == 'SFT') media_format = 'Software';
                                                if (media_format == 'VHS') media_format = 'VHS Movie';
                                            }

                                            markup += '<a data-suggest-type="3" href="' + productURL + '">';
                                                markup += '<div class="row autocomplete-result autocomplete-product">';
                                                    markup += '<div class="column xsm-4">';
                                                    if (image_thumbnail != '') {
                                                        markup += '<div class="autocomplete-thumb img_link">';
                                                            markup += '<img src="' + image_thumbnail + '" alt="' + product.ProductName + '">';
                                                        markup += '</div>';
                                                    }
                                                    markup += '</div>';
                                                    markup += '<div class="column xsm-20">';
                                                        markup += '<h3>' + product.ProductName + '</h3>';
                                                        markup += '<div class="rslt-content media-format"><p>' + media_format + '</p></div>';
                                                        markup += '<div class="rslt-price rslt-autocomplete"><p>';
                                                        if (price_reduced) markup += '<strike><strong>Retail Price:</strong> ' + price_formatter.format(retail_price) + '</strike><br>';
                                                        if (price_reduced) markup += '<span class="rslt-price-sale"><strong>Our Price:</strong> ' + price_formatter.format(price);
                                                        else markup += '<strong>Our Price:</strong> ' + price_formatter.format(price);
                                                        if (price_reduced) markup += ' or less</span>';
                                                        markup += '</p></div>';
                                                    markup += '</div>';
                                                markup += '</div>';
                                            markup += '</a>';
                                        });
                                }
                            }
                            if (markup !== '') {
                                if (typeof hawk_config.ViewAllButtonLabel !== 'undefined') {
                                    markup += '<div class="autocomplete-view-all"><a href="' + searchPage + '?searchText=' + encodeURIComponent($('.hawk .searchBox-textField').val()) + '" data-searchterm="' + $('.hawk .searchBox-textField').val() + '">' + hawk_config.ViewAllButtonLabel + '</a></div>';
                                }
                            } else {
                                markup += '<div class="results-error-none"><p class="error-text">We didn\'t find any results with your keywords.</p></div>';
                            }
                            $('.searchResults-autocomplete').append(markup);
                            $('.searchResults-autocomplete').show();
                            $('.mloader').css('display', 'none');
                        },
                        error: function() {
                            $('.mloader').css('display', 'none');
                        }
                    });
                }
            }, search_delay);
        }
    });

    $(document).on('click', '.hawk-campaign', function() {

        buildTrackingRequest('BannerImpression', $(this));

    });

    $(document).on('click', '.add2Cart', function() {

        buildTrackingRequest('Add2Cart');

    });

    $(document).on('click', '.add2CartInline', function() {

        buildTrackingRequest('Add2Cart', $(this), 'inline');

    });

    buildTrackingRequest('PageLoad');

    if (window.location.pathname == '/checkout/order-confirmation') {

        buildTrackingRequest('Sale');

    }

    function issueSearchRequest() {
        if (window.location.href.indexOf(searchPage) !== -1) {
            searchObject.Keyword = $('.hawk .searchBox-textField').val();
            new searchResultsPage().issueSearch(true, true, true, true, 1);
            $('.searchResults-autocomplete').hide();
            window.history.pushState('', '', window.location.origin + window.location.pathname + '?searchText=' + encodeURIComponent(searchObject.Keyword));
        } else {
            window.location.href = searchPage + '?searchText=' + $('.hawk .searchBox-textField').val();
        }
    }

});

function searchResultsPage(includePagination, includeFacets, includeTabs) {

    if ($.isEmptyObject(hawk_config)) {
        throw 'Configuration appears to be empty';
    } else if (typeof hawk_config.ProductionSiteURL === 'undefined') {
        throw 'Missing Production Site URL';
    } else if (typeof hawk_config.ClientGuid === 'undefined') {
        throw 'Missing Client Guid';
    }

    var activeTab, currentPageNum, numResultsPerPage, numTotalPages, numTotalResults, searchURL, defaultErrorText;

    if (window.location.protocol + '//' + window.location.hostname == hawk_config.ProductionSiteURL) {
        searchURL = hawk_config.SearchURLProd;
    } else if ((window.location.protocol + '//' + window.location.hostname).indexOf('stage') !== -1) {
        searchURL = hawk_config.SearchURLTest;
        searchObject.IsInPreview = true;
    } else if ((window.location.protocol + '//' + window.location.hostname).indexOf('design') !== -1) {
        searchURL = hawk_config.SearchURLDev;
        searchObject.IsInPreview = true;
        isLiveSite = false;
    } else {
        searchURL = hawk_config.SearchURLDev;
        searchObject.IsInPreview = true;
    }

    if (typeof hawk_config.ShowTopPerPage === 'undefined') {
        hawk_config.ShowTopPerPage = true;
    }
    if (typeof hawk_config.ShowBottomPerPage === 'undefined') {
        hawk_config.ShowBottomPerPage = true;
    }
    if (typeof hawk_config.ShowTopPagination === 'undefined') {
        hawk_config.ShowTopPagination = true;
    }
    if (typeof hawk_config.showBottomPagination === 'undefined') {
        hawk_config.showBottomPagination = true;
    }
    if (typeof hawk_config.showTopSort === 'undefined') {
        hawk_config.showTopSort = true;
    }
    if (typeof hawk_config.showBottomSort === 'undefined') {
        hawk_config.showBottomSort = true;
    }

    searchObject.ClientData = {};
    searchObject.ClientData.PreviewBuckets = [];
    searchObject.ClientGuid = hawk_config.ClientGuid;
    searchObject.FacetSelections = {};
    searchObject.IgnoreSpellcheck = hawk_config.IgnoreSpellcheck;
    searchObject.is100CoverageTurnedOn = false;

    defaultErrorText = $('.results-error .error-text').html();

    window.onpopstate = function(event) {
        if (!event.state) {
            searchObject.Keyword = getUrlParameter('searchText');
            issueSearch(true, true, true, true, 1);
        }
    };
    function tabsMarkup(tabs, fieldName) {
        tabs.forEach(function(tab) {
            if (activeTab == tab.Value) {
                $('.searchResults-tabs').append('<li class="searchResult-tab isActive" data-tabname="' + tab.Value + '" data-fieldname="' + fieldName + '"><strong>' + tab.Label + '</strong> (' + tab.Count + ')</li>');

            } else {
                $('.searchResults-tabs').append('<li class="searchResult-tab" data-tabname="' + tab.Value + '" data-fieldname="' + fieldName + '"><strong>' + tab.Label + '</strong> (' + tab.Count + ')</li>');
            }
        });
    }
    function paginationMarkup() {
        var markup = '<nav class="pagination"><ul>';
        if (currentPageNum > 1) {
            markup += '<li class="pag-prev"><a data-pageno="' + (currentPageNum - 1) + '">&lt; Prev Page</a></li>';
        } else {
            //markup += '<li class="prev inactive"><a>&lt; Prev Page</a></li>';
        }
        if (currentPageNum < 5) {
            var pageCount = numTotalPages;
            if (numTotalPages >= 5) pageCount = 5;
            for (var i = 1; i <= pageCount; i++) {
                if (currentPageNum != i) {
                    markup += '<li><a data-pageno="' + i + '">' + i + '</a></li>';
                } else {
                    markup += '<li><a class="active" data-pageno="' + i + '">' + i + '</a></li>';
                }
            }
        } else {
            for (var j = currentPageNum - 2; j <= currentPageNum; j++) {
                if (j >= 1) {
                    if (currentPageNum != j) {
                        markup += '<li><a data-pageno="' + j + '">' + j + '</a></li>';
                    } else {
                        markup += '<li><a class="active" data-pageno="' + j + '">' + j + '</a></li>';
                    }
                }
            }
            for (var k = currentPageNum + 1; k <= currentPageNum + 2; k++) {
                if (k <= numTotalPages) {
                    if (currentPageNum != k) {
                        markup += '<li><a data-pageno="' + k + '">' + k + '</a></li>';
                    } else {
                        markup += '<li><a class="active" data-pageno="' + k + '">' + k + '</a></li>';
                    }
                }
            }
        }
        if (currentPageNum < numTotalPages) {
            markup += '<li><a class="next" data-pageno="' + (currentPageNum + 1) + '">Next Page &gt;</a></li>';
        } else {
            //markup += '<li class="next inactive"><a class="next">Next Page &gt;</a></li>';
        }
        markup += '</ul></nav>';
        if (hawk_config.ShowTopPagination) $('.searchResults-pagination-top').html(markup);
        if (hawk_config.showBottomPagination) $('.searchResults-pagination-bottom').html(markup);
    }
    function perPageMarkup(items) {
        $('.searchResults-perpage-top').empty();
        $('.searchResults-perpage-bottom').empty();
        var markup = '';
        items.forEach(function(item) {
            if (item.Selected == true) {
                numResultsPerPage = item.PageSize;
                markup += '<option selected value="' + item.PageSize + '">' + item.Label + '</option>';
            } else {
                markup += '<option value="' + item.PageSize + '">' + item.Label + '</option>';
            }
        });
        if (markup != '') {
            if (hawk_config.ShowTopPerPage) $('.searchResults-perpage-top').append('<span class="top-perpage-label" for="top-perpage">Show:</span><select name="top-perpage" id="top-perpage">' + markup + '</select>');
            if (hawk_config.ShowBottomPerPage) $('.searchResults-perpage-bottom').append('<span class="bottom-perpage-label" for="bottom-perpage">Show:</span><select name="bottom-perpage" id="bottom-perpage">' + markup + '</select>');
        }
    }
    function sortByMarkup(items) {
        $('.searchResults-sortby-top').empty();
        $('.searchResults-sortby-bottom').empty();
        var markup = '';
        items.forEach(function(item) {
            if (item.Selected == true) {
                markup += '<option selected value="' + item.Value + '">' + item.Label + '</option>';
            } else {
                markup += '<option value="' + item.Value + '">' + item.Label + '</option>';
            }
        });
        if (hawk_config.showTopSort) $('.searchResults-sortby-top').append('<span class="top-sort-label" for="top-sort">Sort by:</span><select name="top-sort" id="top-sort">' + markup + '</select>');
        if (hawk_config.showBottomSort) $('.searchResults-sortby-bottom').append('<span class="bottom-sort-label"for="bottom-sort">Sort by:</span><select name="bottom-sort" id="bottom-sort">' + markup + '</select>');
    }
    function updateFacets(data) {
        if (typeof data.Facets !== 'undefined') {
            $('.facetsContainer-list, .facetsContainer-list-mobile').empty();
            data.Facets.forEach(function(facet) {
                if (facet.Name !== "Tabs") {
                    if (facet.FacetType === 'checkbox') {
                        var isActive = '';
                        if (openFacets.includes(facet.Name)) {
                            isActive = ' searchAccordionActive';
                        }
                        var desktopMarkup = '<button class="searchAccordion' + isActive + '" data-searchaccordion="' + facet.Name + '">' + facet.Name + '<i class="icon-caret-down"></i></button>';
                        var mobileMarkup = '<button class="searchAccordionMobile' + isActive + '" data-searchaccordion="' + facet.Name + '">' + facet.Name + '<i class="icon-caret-down"></i></button>';
                        if (isActive != '') { 
                            desktopMarkup += '<div class="searchAccordionPanel" style="display: block;">';
                            mobileMarkup += '<div class="searchAccordionPanel" style="display: block;">';
                            desktopMarkup += '<div class="facetValueContainer" style="padding-bottom: 20px;"><a href="#" class="reset_facet" data-facet-name="' + facet.Field + '">Remove ' + facet.Name + ' Filters</a></div>';
                            mobileMarkup += '<div class="facetValueContainer" style="padding-bottom: 20px;"><a href="#" class="reset_facet" data-facet-name="' + facet.Field + '">Remove ' + facet.Name + ' Filters</a></div>';
                        } else {
                            desktopMarkup += '<div class="searchAccordionPanel">';
                            mobileMarkup += '<div class="searchAccordionPanel">';
                        }
                        var i = 0;
                        facet.Values.forEach(function(facetValue) {
                            var facetLabel = facetValue.Label;
                            if (facet.Name == 'Format') {
                                if (facetValue.Value == 'ACD') facetLabel = 'Audio CD';
                                if (facetValue.Value == 'AUD') facetLabel = 'Audiocassette';
                                if (facetValue.Value == 'BND') facetLabel = 'Bundle';
                                if (facetValue.Value == 'CAT') facetLabel = 'Catalogue';
                                if (facetValue.Value == 'CDR') facetLabel = 'CD-ROM Reproducible';
                                if (facetValue.Value == 'CMT') facetLabel = 'Component';
                                if (facetValue.Value == 'DVD') facetLabel = 'DVD Movie';
                                if (facetValue.Value == 'HBK') facetLabel = 'Hardcover';
                                if (facetValue.Value == 'OBS') facetLabel = 'Obsolete';
                                if (facetValue.Value == 'ONL') facetLabel = 'Online Resources';
                                if (facetValue.Value == 'OTH') facetLabel = 'Other';
                                if (facetValue.Value == 'PBK') facetLabel = 'Paperback';
                                if (facetValue.Value == 'PCT') facetLabel = 'Picture Book';
                                if (facetValue.Value == 'PDF') facetLabel = 'Downloadable PDF File';
                                if (facetValue.Value == 'PST') facetLabel = 'Poster';
                                if (facetValue.Value == 'RPD') facetLabel = 'Reproducible';
                                if (facetValue.Value == 'SFT') facetLabel = 'Software';
                                if (facetValue.Value == 'VHS') facetLabel = 'VHS Movie';
                            }
                            if (facet.FacetType === 'checkbox') {
                                if (facetValue.Selected) {
                                    desktopMarkup += '<div class="facetValueContainer"><input data-facetname="' + facet.Field + '" type="checkbox" checked id="' + facet.FacetId + '_' + i + '" name="' + facet.FacetId + '_' + i + '" value="' + facetValue.Value + '" /> ';
                                    mobileMarkup += '<div class="facetValueContainer"><input data-facetname="' + facet.Field + '" type="checkbox" checked id="' + facet.FacetId + '_' + i + '_mobile" name="' + facet.FacetId + '_' + i + '_mobile" value="' + facetValue.Value + '" /> ';
                                } else {
                                    desktopMarkup += '<div class="facetValueContainer"><input data-facetname="' + facet.Field + '" type="checkbox" id="' + facet.FacetId + '_' + i + '" name="' + facet.FacetId + '_' + i + '" value="' + facetValue.Value + '" /> ';
                                    mobileMarkup += '<div class="facetValueContainer"><input data-facetname="' + facet.Field + '" type="checkbox" id="' + facet.FacetId + '_' + i + '_mobile" name="' + facet.FacetId + '_' + i + '_mobile" value="' + facetValue.Value + '" /> ';
                                }
                                desktopMarkup += '<label for="' + facet.FacetId + '_' + i + '">' + facetLabel + ' (' + facetValue.Count + ')</label></div>';
                                mobileMarkup += '<label for="' + facet.FacetId + '_' + i + '_mobile">' + facetLabel + ' (' + facetValue.Count + ')</label></div>';
                            }
                            i++;
                        });
                        desktopMarkup += '</div>';
                        mobileMarkup += '</div>';
                        $('.facetsContainer-list').append(desktopMarkup);
                        $('.facetsContainer-list-mobile').append(mobileMarkup);
                        $('.searchAccordion').each(function() {
                            if ($(this).hasClass('searchAccordionActive')) {
                                $(this).next().show();
                            }
                        });
                    }
                }
            });
        }
    }
    function updateFacetValues() {
        searchObject.PageNo = 1;
        $('.searchResult-tab').each(function() {
            if ($(this).hasClass('isActive')) {
                searchObject.FacetSelections[$(this).attr('data-fieldname')] = [$(this).attr('data-tabname')];
            }
        });
        $('.facetValueContainer input[type="checkbox"]').each(function() {
            var facetName = $(this).attr('data-facetname');
            var facetValue = $(this).val();
            var existingArray;
            if ($(this).is(':checked')) {
                if (searchObject.FacetSelections.hasOwnProperty(facetName)) {
                    existingArray = searchObject.FacetSelections[facetName];
                    if (!existingArray.includes(facetValue)) {
                        existingArray.push(facetValue);
                    }
                    searchObject.FacetSelections[facetName] = existingArray;
                } else {
                    searchObject.FacetSelections[facetName] = [facetValue];
                }
            } else {
                if (searchObject.FacetSelections.hasOwnProperty(facetName)) {
                    existingArray = searchObject.FacetSelections[facetName];
                    if (existingArray.includes(facetValue)) {
                        existingArray.splice(existingArray.indexOf(facetValue), 1);
                    }
                    searchObject.FacetSelections[facetName] = existingArray;
                }
            }
        });
    }
    function updatePaginationSortPerPage(data) {
        if (typeof data.Pagination !== 'undefined') {
            if (typeof data.Pagination.NofPages !== 'undefined') {
                numTotalPages = data.Pagination.NofPages;
            } else {
                numTotalPages = 1;
            }
            if (typeof data.Pagination.CurrentPage !== 'undefined') {
                currentPageNum = data.Pagination.CurrentPage;
            } else {
                currentPageNum = 1;
            }
            if (typeof data.Pagination.Items !== 'undefined') {
                perPageMarkup(data.Pagination.Items);
            } else {
                numResultsPerPage = 5;
            }
            if (typeof data.Pagination.NofResults !== 'undefined') {
                numTotalResults = data.Pagination.NofResults;
            } else {
                numTotalResults = 0;
            }
            var startingResult = 1;
            if (currentPageNum > 1) {
                startingResult = (((currentPageNum - 1) * numResultsPerPage) + 1);
            }
            var pageResultsNumber = (currentPageNum * numResultsPerPage);
            if (pageResultsNumber > numTotalResults) {
                pageResultsNumber = numTotalResults;
            }
            if (numTotalResults > 0) {
                $('.searchResults-results-numbers').html(startingResult + '-' + pageResultsNumber + ' of ' + numTotalResults + ' results');
            } else {
                $('.searchResults-results-numbers').html('0 results');
            }
        }
        paginationMarkup(data);
        if (typeof data.Sorting !== 'undefined') {
            sortByMarkup(data.Sorting.Items);
        }
    }
    function updateSearchResults(data) {
        if (typeof data.Results === 'undefined') {
            $('.results-error-none').show();
            $('.results-error').hide();
        } else if (data.Results.length === 0) {
            $('.results-error-none').show();
            $('.results-error').hide();
        } else {
            if (hawk_config.ViewType == 'list') {
                $('.rslt-products').html('<ul class="lst-rslt-searchResults"></ul>');
            } else {
                $('.rslt-products').html('<ul class="lst-rslt-searchResults row"></ul>');
            }
            $('.results-error-none').hide();
            $('.results-error').hide();
            if (typeof data.DidYouMean !== 'undefined') {
                var markup = '';
                var firstProduct = false;
                $('.results-error .error-text').html(defaultErrorText);
                data.DidYouMean.forEach(function(dym) {
                    if (!firstProduct) {
                        markup += '<a href="#" class="did_you_mean" data-dym="' + dym + '">' + dym + '</a>';
                        firstProduct = true;
                    } else {
                        markup += ', <a href="#" class="did_you_mean" data-dym="' + dym + '">' + dym + '</a>';
                    }
                });

                $('.results-error .error-text').html($('.results-error .error-text').text().replace('{0}', markup));
                $('.results-error').show();
            }

            hawk_config.ListMarkup = '';
            hawk_config.GridMarkup = '';

            var standard_list_markup = '';
            var standard_grid_markup = '';
            var featured_list_markup = '';
            var featured_grid_markup = '';

            data.Results.forEach(function(searchResult) {

                var list_markup = '';
                var grid_markup = '';
                var type = '';
                var featured = false;
                var title = '';
                var docId = '';
                var price = 0;
                var retail_price = 0;
                var price_reduced = false;
                var link = '#';
                var image = '';
                var subhead = '';
                var media_format = '';
                var description = '';
                var flag_text = '';

                if (typeof searchResult.Document.type !== 'undefined') {
                    type = searchResult.Document.type;
                }

                if (typeof searchResult.Document.title !== 'undefined') {
                    title = searchResult.Document.title;
                }

                if (typeof searchResult.Document.featured !== 'undefined') {
                    if (searchResult.Document.featured[0] === 'true') {
                        featured = true;
                    }
                }

                if (typeof searchResult.DocId !== 'undefined') {
                    docId = searchResult.DocId;
                }

                if (typeof searchResult.Document.price !== 'undefined') {
                    price = searchResult.Document.price;
                    if (Array.isArray(price)) {
                        price = price[0];
                    }
                }

                if (typeof searchResult.Document.retail_price !== 'undefined') {
                    retail_price = searchResult.Document.retail_price;
                    if (Array.isArray(retail_price)) {
                        retail_price = retail_price[0];
                    }
                }

                if (typeof searchResult.Document.paperback_pb !== 'undefined') {
                    if (searchResult.Document.paperback_pb == '1') {
                        price = searchResult.Document.price25;
                        price_reduced = true;
                        if (Array.isArray(price)) {
                            price = price[0];
                        }
                    }
                }

                if (typeof searchResult.Document.url !== 'undefined') {
                    link = searchResult.Document.url;
                    if (Array.isArray(link)) {
                        link = link[0];
                    }
                    if (link.indexOf('http') == -1) {
                        if (link[0] != '/') link = '/' + link;
                        if (!isLiveSite) {
                            link = hawk_config.ProductionSiteURL + link;
                        }
                    }
                }

                if (typeof searchResult.Document.image_link !== 'undefined') {
                    image = searchResult.Document.image_link;
                    if (Array.isArray(image)) {
                        image = image[0];
                    }
                    if (image.indexOf('http') == -1) {
                        if (image[0] != '/') image = '/' + image;
                        if (!isLiveSite) {
                            image = hawk_config.ProductionSiteURL + image;
                        }
                    }
                } else {
                    image = '/Image%20Library/Template%20Images/no-image-available.jpg';
                }

                if (typeof searchResult.Document.subhead !== 'undefined') {
                    subhead = searchResult.Document.subhead;
                    if (Array.isArray(subhead)) {
                        subhead = subhead.join(' ');
                    }
                    if (!Array.isArray(subhead) && subhead.length > 300) {
                        subhead = subhead.substring(0, 297) + '...';
                    }
                    subhead = subhead.replace(/&nbsp;/g, ' ');
                }

                if (typeof searchResult.Document.media_format !== 'undefined') {
                    media_format = searchResult.Document.media_format;
                    if (Array.isArray(media_format)) {
                        media_format = media_format[0];
                    }
                    if (media_format == 'ACD') media_format = 'Audio CD';
                    if (media_format == 'AUD') media_format = 'Audiocassette';
                    if (media_format == 'BND') media_format = 'Bundle';
                    if (media_format == 'CAT') media_format = 'Catalogue';
                    if (media_format == 'CDR') media_format = 'CD-ROM Reproducible';
                    if (media_format == 'CMT') media_format = 'Component';
                    if (media_format == 'DVD') media_format = 'DVD Movie';
                    if (media_format == 'HBK') media_format = 'Hardcover';
                    if (media_format == 'OBS') media_format = 'Obsolete';
                    if (media_format == 'ONL') media_format = 'Online Resources';
                    if (media_format == 'OTH') media_format = 'Other';
                    if (media_format == 'PBK') media_format = 'Paperback';
                    if (media_format == 'PCT') media_format = 'Picture Book';
                    if (media_format == 'PDF') media_format = 'Downloadable PDF File';
                    if (media_format == 'PST') media_format = 'Poster';
                    if (media_format == 'RPD') media_format = 'Reproducible';
                    if (media_format == 'SFT') media_format = 'Software';
                    if (media_format == 'VHS') media_format = 'VHS Movie';
                }

                if (typeof searchResult.Document.description !== 'undefined') {
                    description = searchResult.Document.description;
                    if (Array.isArray(description)) {
                        description = description.join(' ');
                    }
                    var dom = new DOMParser().parseFromString(description, 'text/html');
                    description = dom.body.textContent;
                    if (!Array.isArray(description) && description.length > 300) {
                        description = description.substring(0, 297).trim() + '...';
                    }
                    description = description.replace(/&nbsp;/g, ' ');
                    description = description.replace(/\.[s]*/g, ". ");
                    if (getUrlParameter('searchText') != undefined && getUrlParameter('searchText') != '') {
                        var splitSearch = getUrlParameter('searchText').split(' ');
                        splitSearch.forEach(function(term) {
                            description = description.replace(new RegExp('(' + escapeRegExp(term) + ')', 'ig'), '<strong>$1</strong>');
                        });
                    }
                }

                if (typeof searchResult.Document.flag_text !== 'undefined') {
                    flag_text = searchResult.Document.flag_text;
                    if (Array.isArray(flag_text)) {
                        flag_text = flag_text[0];
                    }
                    flag_text = flag_text.replace(/ /g, '&nbsp;');
                }
        
                list_markup = '<a data-unique-id="' + docId + '" href="' + link + '">';
                list_markup += '<div class="row rslt-product rslt-product-list">';
                grid_markup = '<div class="rslt-product">';

                if (flag_text !== '') {
                    if (featured) {
                        list_markup += '<div class="tag"><span>Featured</span></div>';
                        grid_markup += '<div class="tag"><span>Featured</span></div>';
                    } else {
                        list_markup += '<div class="tag"><span>' + flag_text + '</span></div>';
                        grid_markup += '<div class="tag"><span>' + flag_text + '</span></div>';
                    }
                } else if (featured) {
                    list_markup += '<div class="tag"><span>Featured</span></div>';
                    grid_markup += '<div class="tag"><span>Featured</span></div>';
                }

                list_markup += '<div class="column xsm-6">';
                list_markup += '<img src="' + image + '" alt="' + title + '">';
                list_markup += '</div>';
                list_markup += '<div class="column xsm-18">';
                list_markup += '<h3>' + title + '</h3>';
                list_markup += '<div class="rslt-content subhead">' + subhead + '</div>';
                list_markup += '<div class="rslt-content media-format"><p>' + media_format + '</p></div>';
                list_markup += '<div class="rslt-description"><p>' + description + '</p></div>';
                list_markup += '<div class="rslt-price rslt-price-list">';
                if (price_reduced) list_markup += '<strike><strong>Retail Price:</strong> ' + price_formatter.format(retail_price) + '</strike><br>';
                list_markup += '<strong>Our Price:</strong> ' + price_formatter.format(price);
                if (price_reduced) list_markup += ' or less';
                list_markup += '</div>';
                list_markup += '</div></div>';
                list_markup += '</a>';

                grid_markup += '<div class="rslt-product-container"><a data-unique-id="' + docId + '" href="' + link + '">';
                grid_markup += '<h3>' + title + '</h3>';
                grid_markup += '<div class="rslt-content subhead">' + subhead + '</div>';
                grid_markup += '<div class="rslt-content media-format flexible"><p>' + media_format + '</p></div>';
                grid_markup += '<div class="image_container">';
                grid_markup += '<img src="' + image + '" width="100" height="140" alt="' + title + '">';
                grid_markup += '</div>';
                grid_markup += '<div class="rslt-price">' + price_formatter.format(price);
                if (price_reduced) grid_markup += ' or less';
                grid_markup += '</div>';
                grid_markup += '</div></a></div>';

                if (featured) {
                    featured_list_markup = '<li class="searchResult-item promoted-result">' + list_markup + '</li>';
                    featured_grid_markup = '<li class="searchResult-item med-8 promoted-result">' + grid_markup + '</li>';
                } else {
                    standard_list_markup = '<li class="searchResult-item">' + list_markup + '</li>';
                    standard_grid_markup = '<li class="searchResult-item xsm-24 sm-12 med-8">' + grid_markup + '</li>';
                }

                hawk_config.ListMarkup += featured_list_markup + standard_list_markup;
                hawk_config.GridMarkup += featured_grid_markup + standard_grid_markup;
                if (hawk_config.ViewType == 'list') {
                    $('.lst-rslt-searchResults').append(featured_list_markup);
                    $('.lst-rslt-searchResults').append(standard_list_markup);
                } else {
                    $('.lst-rslt-searchResults').append(featured_grid_markup);
                    $('.lst-rslt-searchResults').append(standard_grid_markup);
                }
            });
        }
        if (typeof data.Merchandising != 'undefined') {
            if (typeof data.Merchandising.Items !== 'undefined') {
                if (data.Merchandising.Items.length > 0) {
                    var zoneData = {};
                    data.Merchandising.Items.forEach(function(merchandisingItem) {
                        if (typeof $('#' + merchandisingItem.Zone) !== 'undefined') {
                            var html = '';
                            if (merchandisingItem.ContentType == 'image') {
                                html = '<a';
                                if (merchandisingItem.ForwardUrl != '') html += ' href="' + merchandisingItem.ForwardUrl + '"';
                                if (merchandisingItem.Target != '') html += ' target="' + merchandisingItem.Target + '"';
                                if (merchandisingItem.Title != '') html += ' title="' + merchandisingItem.Title + '"';
                                html += ' class="hawk-campaign" data-banner-id="' + merchandisingItem.BannerId + '"';
                                if (merchandisingItem.CampaignId != '') html += ' data-campaign-id="' + merchandisingItem.CampaignId + '"';
                                html += '>';
                                var altTag = '';
                                if (merchandisingItem.AltTag != '') altTag = ' alt="' + merchandisingItem.AltTag + '" ';
                                if (merchandisingItem.ImageUrl != '') html += '<img src="' + merchandisingItem.ImageUrl + '"' + altTag + '/>';
                                html += '</a>';
                            } else if (merchandisingItem.ContentType == 'custom') {
                                html = merchandisingItem.Output;
                            }
                            if (html != '') {
                                if (typeof zoneData[merchandisingItem.Zone] == 'undefined') zoneData[merchandisingItem.Zone] = html;
                                else zoneData[merchandisingItem.Zone] += html;
                            }
                        }
                    });
                    $.each(zoneData, function(key, value) {
                        $('#' + key).html(value);
                    });
                }
            }
        }
    }
    function updateTabs(data) {
        $('.searchResults-tabs-container').empty();
        if (typeof data.Facets !== 'undefined') {
            data.Facets.forEach(function(facet) {
                if (facet.Name === "Tabs") {
                    if (typeof facet.Values !== 'undefined') {
                        $('.searchResults-tabs-container').html('<ul class="searchResults-tabs"></ul>');
                        tabsMarkup(facet.Values, facet.Field);
                    }
                }
            });
        }
    }
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    this.issueSearch = function issueSearch(updatePaginationAndSort, includeFacets, includeTabs, updateResults, searchType) {
        $('.mloader').css('display', 'block');
        $.ajax({
            url: searchURL,
            type: "POST",
            headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=UTF-8'},
            data: JSON.stringify(searchObject),
            dataType: 'json',
            success: function (data) {
                if (searchObject.Keyword.length >= 1) {
                    $('.search-header').text(searchObject.Keyword);
                    $('.mobile-search-results').text(searchObject.Keyword);
                } else {
                    $('.search-header').text('Search Results');
                }
                if (data.Redirect.Location !== undefined) {
                    window.location.href = data.Redirect.Location;
                }
                if (includeFacets) updateFacets(data);
                if (includeTabs) updateTabs(data);
                if (updatePaginationAndSort) updatePaginationSortPerPage(data);
                if (updateResults) updateSearchResults(data);
                if (typeof data.Results !== 'undefined') {
                    if (data.Results.length > 0) {
                        if (hawk_config.ShowViewSwitch) {
                            $('.searchResults-list-grid').empty();
                            if (hawk_config.ViewType == 'list') {
                                $('.searchResults-list-grid').append('<span class="top-listgrid-label" for="top-listgrid">View:</span><select name="top-listgrid" id="top-listgrid"><option value="list" selected>List</option><option value="Grid">Grid</option></select>');
                            } else {
                                $('.searchResults-list-grid').append('<span class="top-listgrid-label" for="top-listgrid">View:</span><select name="top-listgrid" id="top-listgrid"><option value="list">List</option><option value="Grid" selected>Grid</option></select>');
                            }
                        }
                    }
                }
                if ($('.facetsContainer-list').html() === '') {
                    $('.stateFacetAccordion').css('border-bottom', 'none');
                } else {
                    $('.stateFacetAccordion').css('border-bottom', '1px solid #abb8c1');
                }
                trackingId = data.TrackingId;
                $('.search-results-sidebar, .srch-results').each(function() {
                    $(this).css('padding-top', '1em');
                });
                $('.search-results-sidebar .section:not(:empty)').first().css('padding-top', 0);
                //$('.srch-results .section:not(:empty)').first().css('padding-top', 0);
                jQuery.fn.cleanWhitespace = function() {
                    this.contents().filter(
                        function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); })
                        .remove();
                    return this;
                };
                $('.campaignZone').cleanWhitespace();
                $('.mloader').css('display', 'none');
                buildTrackingRequest('Search', null, searchType);
            },
            error: function() {
                $('.mloader').css('display', 'none');
            }
        });
    };
    if (!searchPageLoaded) {
        $('body').on('change', '.facetValueContainer select', function() {
            searchObject.FacetSelections = {};
            updateFacetValues();
            issueSearch(true, true, true, true, 2);
        });
        $('body').on('click', '.reset_facet', function() {
            var categoryToRemove = $(this).attr('data-facet-name');
            $.each(searchObject.FacetSelections, function(key, value) {
                if (categoryToRemove == key) {
                    delete searchObject.FacetSelections[key];
                }
            });
            issueSearch(true, true, true, true, 2);
        });
        $('body').on('change', '#top-listgrid', function() {
            if ($(this).val() == 'list') {
                $('.lst-rslt-searchResults').html(hawk_config.ListMarkup);
                hawk_config.ViewType = 'list';
                if ($('.lst-rslt-searchResults').hasClass('row')) $('.lst-rslt-searchResults').removeClass('row');
            } else {
                $('.lst-rslt-searchResults').html(hawk_config.GridMarkup);
                hawk_config.ViewType = 'grid';
                if (!$('.lst-rslt-searchResults').hasClass('row')) $('.lst-rslt-searchResults').addClass('row');
            }
            setCookie('view_type', hawk_config.ViewType, getVisitorExpiry());
        });
        $('body').on('keyup', '#search_within', function() {
            if (using_search_within) {
                clearTimeout(using_search_within);
            }
            using_search_within = setTimeout(function() {
                searchObject.SearchWithin = $('#search_within').val();
                issueSearch(true, true, true, true, 2);
            }, search_delay);
        });
        $('body').on('change', '#top-perpage, #bottom-perpage', function() {
            searchObject.MaxPerPage = parseInt($(this).val());
            issueSearch(true, true, true, true, 2);
        });
        $('body').on('change', '#top-sort, #bottom-sort', function() {
            searchObject.SortBy = $(this).val();
            issueSearch(true, true, true, true, 2);
        });
        $('body').on('click', '.autocomplete-view-all a', function(event) {
            event.preventDefault();
            searchObject.FacetSelections = {};
            searchObject.Keyword = $(this).attr('data-searchterm');
            window.history.pushState('', '', window.location.origin + window.location.pathname + '?searchText=' + encodeURIComponent(searchObject.Keyword));
            $('.mfp-close').trigger('click');
            $('.searchResults-autocomplete').hide();
            issueSearch(true, true, true, true, 1);
        });
        $('body').on('click', '.did_you_mean', function() {
            searchObject.Keyword = $(this).attr('data-dym');
            window.history.pushState('', '', window.location.origin + window.location.pathname + '?searchText=' + encodeURIComponent(searchObject.Keyword));
        });
        $('body').on('click', '.facetValueContainer input[type="checkbox"]', function() {
            searchObject.FacetSelections = {};
            if ($(this).attr('id').indexOf('_mobile') !== -1) {
                var name = $(this).attr('id');
                name = name.replace('_mobile', '');
                $('#' + name).prop('checked', $(this).prop('checked'));
            } else {
                $('#' + $(this).attr('id') + '_mobile').prop('checked', $(this).prop('checked'));
            }
            updateFacetValues();
            issueSearch(true, true, true, true, 2);
        });
        $('body').on('click', '.pagination ul li a', function() {
            searchObject.PageNo = parseInt($(this).attr('data-pageno'));
            issueSearch(true, true, true, true, 2);
        });
        $('body').on('click', '.searchResult-tab', function() {
            if (!$(this).hasClass('isActive')) {
                $('.searchResult-tab').removeClass('isActive');
                $(this).addClass('isActive');
                activeTab = $(this).attr('data-tabname');
                searchObject.FacetSelections = {};
                searchObject.FacetSelections[$(this).attr('data-fieldname')] = [$(this).attr('data-tabname')];
                updateFacetValues();
                issueSearch(true, true, false, true, 2);
            } else {
                $('.searchResult-tab').removeClass('isActive');
                activeTab = '';
                searchObject.FacetSelections = {};
                updateFacetValues();
                issueSearch(true, true, true, true, 2);
            }
        });
        $('body').on('click', '.autocomplete-container a', function() {
            buildTrackingRequest('AutocompleteClick', $(this));
        });
        $('body').on('click', '.lst-rslt-searchResults a', function() {
            buildTrackingRequest('Click', $(this));
        });
        $(document).ready(function () {
            searchObject.Keyword = getUrlParameter('searchText');
            $('.hawk .searchBox-textField').val(getUrlParameter('searchText'));
            if (searchObject.Keyword === '') {
                $('.searchResults-autocomplete').hide();
            }
            issueSearch(includePagination, includeFacets, includeTabs, true, 1);
            $('.mloader').css('display', 'none');
        });
        searchPageLoaded = true;
    }
}

function buildTrackingRequest(eventType, link, subType) {

    var eventData = {};
    var dispatchEvent = true;

    if (eventType == 'PageLoad') {

        eventData.RequestPath = window.location.pathname;
        eventData.ViewportHeight = window.innerHeight;
        eventData.ViewportWidth = window.innerWidth;
        if (window.location.search != '') {
            eventData.Qs = window.location.search.substring(1);
        }
        eventData.PageTypeId = 5;
        if ($('.productDetail').length == 1) {
            eventData.PageTypeId = 1;
        } else if ($('.shoppingCart').length == 1) {
            eventData.PageTypeId = 3;
        } else if ($('.orderConfirmation').length == 1) {
            eventData.PageTypeId = 4;
        }

    } else if (eventType == 'Add2Cart') {

        var price;
        if (subType == 'inline') {
            if ($(link).attr('data-unique-id') != 'undefined' && $(link).attr('data-unique-id') != '') {
                price = $(link).attr('data-price');
                if (price.indexOf('$') === 0) {
                    price = price.substring(1);
                }
                eventData.Price = parseFloat(price);
                eventData.UniqueId = $(link).attr('data-unique-id');
                eventData.Quantity = parseInt($('.productQuantity[data-unique-id="' + eventData.UniqueId + '"]').length);
                if (!eventData.Quantity >= 1) dispatchEvent = false;
            } else {
                dispatchEvent = false;
            }
        } else {
            if ($('span[data-product-detail="sku-code"]') != 'undefined' && $('span[data-product-detail="sku-code"]').text() != '') {
                price = $('span[data-product-detail="price"]').text();
                if (price.indexOf('$') === 0) {
                    price = price.substring(1);
                }
                eventData.Price = parseFloat(price);
                eventData.Quantity = parseInt($('.productDetail-quantity').val());
                eventData.UniqueId = $('span[data-product-detail="sku-code"]').text();
            } else {
                dispatchEvent = false;
            }
        }
        eventData.Currency = 'USD';

    } else if (eventType == 'BannerImpression') {

        eventData.TrackingId = trackingId;
        eventData.BannerId = $(link).attr('data-banner-id');
        eventData.CampaignId = $(link).attr('data-campaign-id');

    } else if (eventType == 'Sale') {

        var subTotal = $('.order-summary').attr('data-subtotal');
        if (subTotal.indexOf('$') === 0) {
            subTotal = subTotal.substring(1);
        }
        eventData.SubTotal = parseFloat(subTotal);

        var tax = $('.order-summary').attr('data-tax');
        if (tax.indexOf('$') === 0) {
            tax = tax.substring(1);
        }
        eventData.Tax = parseFloat(tax);

        var total = $('.order-summary').attr('data-total');
        if (total.indexOf('$') === 0) {
            total = total.substring(1);
        }
        eventData.Total = parseFloat(total);

        var itemList = [];
        $('.cartItemContainer .cartItem').each(function() {
            if ($(this).attr('data-unique-id') != undefined && $(this).attr('data-unique-id') != '') {
                itemList.push({
                    UniqueId: $(this).attr('data-unique-id'),
                    ItemPrice: parseFloat($(this).attr('data-price').replace('$', '')),
                    Quantity: parseInt($(this).attr('data-quantity'))
                });
            }
        });
        eventData.ItemList = itemList;
        var orderNo = $('.orderNo').text();
        eventData.OrderNo = orderNo.replace('Order #', '');
        eventData.Currency = 'USD';

    } else if (eventType == 'Click') {

        if ($(link).attr('data-unique-id') != 'undefined' && $(link).attr('data-unique-id') != '') {
            eventData.TrackingId = trackingId;
            eventData.Url = $(link).attr('href');
            eventData.UniqueId = $(link).attr('data-unique-id');
        } else {
            dispatchEvent = false;
        }

    } else if (eventType == 'Search') {

        eventData.TrackingId = trackingId;
        eventData.TypeId = parseInt(subType);
        if (subType == 1) {
            eventData.QueryId = getQueryId(true);
        } else {
            eventData.QueryId = getQueryId(false);
        }
        eventData.RequestPath = window.location.pathname;
        eventData.ViewportHeight = window.innerHeight;
        eventData.ViewportWidth = window.innerWidth;
        if (window.location.search != '') {
            eventData.Qs = window.location.search.substring(1);
        }

    } else if (eventType == 'AutocompleteClick') {

        eventData.Keyword = $('.searchBox-textField').val();
        eventData.Name = $(link).text();
        eventData.SuggestType = parseInt($(link).attr('data-suggest-type'));
        eventData.Url = $(link).attr('href');

        if (isNaN(eventData.SuggestType)) dispatchEvent = false;

    }

    var trackingData = {
        'ClientGuid': hawk_config.ClientGuid,
        'VisitId': getVisitId(),
        'VisitorId': getVisitorId(),
        'EventType': eventType,
        'EventData': btoa(JSON.stringify(eventData))
    };

    if (dispatchEvent) {
        var trackingRequest = $.ajax({ 
            url: trackingURL, 
            headers: {'Content-Type': 'application/json'}, 
            method: 'POST', 
            dataType: 'json', 
            data: JSON.stringify(trackingData)
        });

        trackingRequest.done(function () { 
            if (eventType == 'Sale') {
                if ($('.orderNo').length == 1 && getCookie('last_order_number') != $('.orderNo').text()) {
                    setCookie('last_order_number', $('.orderNo').text(), getVisitorExpiry());
                    clearVisitId();
                }
            }
        }); 

        trackingRequest.fail(function () { 
            if (eventType == 'Sale') clearVisitId();
        });
    }

}

function clearVisitId() {
    setCookie('visit_id', '', 'Thu, 01 Jan 1970 00:00:01 GMT');
}

function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getQueryId(regenerateId) {
    var query_id = getCookie('query_id');
    if (!query_id || regenerateId) {
        query_id = createUUID();
    }
    setCookie('query_id', query_id, getVisitorExpiry());
    return query_id;
}

function getVisitorId() {
    var visitor_id = getCookie('visitor_id');
    if (!visitor_id) {
        visitor_id = createUUID();
    }
    setCookie('visitor_id', visitor_id, getVisitorExpiry());
    return visitor_id;
}

function getVisitId() {
    var visit_id = getCookie('visit_id');
    if (!visit_id) {
        visit_id = createUUID();
    }
    this.setCookie('visit_id', visit_id, getVisitExpiry());
    return visit_id;
}

function getVisitorExpiry() {
    var d = new Date();
    d.setTime(d.getTime() + (360 * 24 * 60 * 60 * 1000));
    return d.toGMTString();
}

function getVisitExpiry() {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

function setCookie(name, value, expiry) {
    var expires;
    if (expiry) {
        expires = "; expires=" + expiry;
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// #### End HawkSearch ####
var main = function() {
	"use strict";
	
	$(".gallery").hide();
	
	$("#sample").on("click", function(event) {
		$(".gallery").fadeIn(750);
	});
	
	$(".closeGallery").on("click", function(event) {
		$(".gallery").hide();
	});
	
	$(".shadow").on("click", function (event) {
		$(".gallery").hide();
	});
};

$(document).ready(main);
/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.10.0.min
 ================================================================================*/
 (function(b){b.fn.bPopup=function(z,F){function M(){a.contentContainer=b(a.contentContainer||c);switch(a.content){case "iframe":var d=b('<iframe class="b-iframe" '+a.iframeAttr+"></iframe>");d.appendTo(a.contentContainer);r=c.outerHeight(!0);s=c.outerWidth(!0);A();d.attr("src",a.loadUrl);k(a.loadCallback);break;case "image":A();b("<img />").load(function(){k(a.loadCallback);G(b(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:A(),b('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(c,d,e){k(a.loadCallback,d);G(b(this))}).hide().appendTo(a.contentContainer)}}function A(){a.modal&&b('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+t}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);D();c.data("bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?f.scrollLeft()+u:-1*(v+s):l(!(!a.follow[0]&&m||g)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?f.scrollTop()+w:x+-1*r:n(!(!a.follow[1]&&p||g)),"z-index":a.zIndex+t+1}).each(function(){a.appending&&b(this).appendTo(a.appendTo)});H(!0)}function q(){a.modal&&b(".b-modal."+c.data("id")).fadeTo(a.speed,0,function(){b(this).remove()});a.scrollBar||b("html").css("overflow","auto");b(".b-modal."+e).unbind("click");f.unbind("keydown."+e);h.unbind("."+e).data("bPopup",0<h.data("bPopup")-1?h.data("bPopup")-1:null);c.undelegate(".bClose, ."+a.closeClass,"click."+e,q).data("bPopup",null);clearTimeout(I);H();return!1}function J(d){w=y.innerHeight||h.height();u=y.innerWidth||h.width();if(B=E())clearTimeout(K),K=setTimeout(function(){D();d=d||a.followSpeed;c.dequeue().each(function(){g?b(this).css({left:v,top:x}):b(this).animate({left:a.follow[0]?l(!0):"auto",top:a.follow[1]?n(!0):"auto"},d,a.followEasing)})},50)}function G(d){var b=d.width(),e=d.height(),f={};a.contentContainer.css({height:e,width:b});e>=c.height()&&(f.height=c.height());b>=c.width()&&(f.width=c.width());r=c.outerHeight(!0);s=c.outerWidth(!0);D();a.contentContainer.css({height:"auto",width:"auto"});f.left=l(!(!a.follow[0]&&m||g));f.top=n(!(!a.follow[1]&&p||g));c.animate(f,250,function(){d.show();B=E()})}function N(){h.data("bPopup",t);c.delegate(".bClose, ."+a.closeClass,"click."+e,q);a.modalClose&&b(".b-modal."+e).css("cursor","pointer").bind("click",q);O||!a.follow[0]&&!a.follow[1]||h.bind("scroll."+e,function(){B&&c.dequeue().animate({left:a.follow[0]?l(!g):"auto",top:a.follow[1]?n(!g):"auto"},a.followSpeed,a.followEasing)}).bind("resize."+e,function(){J()});a.escClose&&f.bind("keydown."+e,function(a){27==a.which&&q()})}function H(d){function b(e){c.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){L(d)})}switch(d?a.transition:a.transitionClose||a.transition){case "slideIn":b({left:d?l(!(!a.follow[0]&&m||g)):f.scrollLeft()-(s||c.outerWidth(!0))-C});break;case "slideBack":b({left:d?l(!(!a.follow[0]&&m||g)):f.scrollLeft()+u+C});break;case "slideDown":b({top:d?n(!(!a.follow[1]&&p||g)):f.scrollTop()-(r||c.outerHeight(!0))-C});break;case "slideUp":b({top:d?n(!(!a.follow[1]&&p||g)):f.scrollTop()+w+C});break;default:c.stop().fadeTo(a.speed,d?1:0,function(){L(d)})}}function L(b){b?(N(),k(F),a.autoClose&&(I=setTimeout(q,a.autoClose))):(c.hide(),k(a.onClose),a.loadUrl&&(a.contentContainer.empty(),c.css({height:"auto",width:"auto"})))}function l(a){return a?v+f.scrollLeft():v}function n(a){return a?x+f.scrollTop():x}function k(a,e){b.isFunction(a)&&a.call(c,e)}function D(){x=p?a.position[1]:Math.max(0,(w-c.outerHeight(!0))/2-a.amsl);v=m?a.position[0]:(u-c.outerWidth(!0))/2;B=E()}function E(){return w>c.outerHeight(!0)&&u>c.outerWidth(!0)}b.isFunction(z)&&(F=z,z=null);var a=b.extend({},b.fn.bPopup.defaults,z);a.scrollBar||b("html").css("overflow","hidden");var c=this,f=b(document),y=window,h=b(y),w=y.innerHeight||h.height(),u=y.innerWidth||h.width(),O=/OS 6(_\d)+/i.test(navigator.userAgent),C=200,t=0,e,B,p,m,g,x,v,r,s,K,I;c.close=function(){q()};c.reposition=function(a){J(a)};return c.each(function(){b(this).data("bPopup")||(k(a.onOpen),t=(h.data("bPopup")||0)+1,e="__b-popup"+t+"__",p="auto"!==a.position[1],m="auto"!==a.position[0],g="fixed"===a.positionStyle,r=c.outerHeight(!0),s=c.outerWidth(!0),a.loadUrl?M():A())})};b.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:'scrolling="no" frameborder="0"',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);

// Magnific Popup v1.0.0 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom+fastclick
(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isIE7=b.indexOf("MSIE 7.")!==-1,n.isIE8=b.indexOf("MSIE 8.")!==-1,n.isLowIE=n.isIE7||n.isIE8,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(a,c){if(c===undefined||c===!1)return!0;e=a.split("_");if(e.length>1){var d=b.find(j+"-"+e[0]);if(d.length>0){var f=e[1];f==="replaceWith"?d[0]!==c[0]&&d.replaceWith(c):f==="img"?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(j+"-"+a).html(c)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H="ajax",I,J=function(){I&&a(document.body).removeClass(I)},K=function(){J(),n.req&&n.req.abort()};a.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(H),I=n.st.ajax.cursor,w(b+"."+H,K),w("BeforeChange."+H,K)},getAjax:function(b){I&&a(document.body).addClass(I),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};y("ParseAjax",f),n.appendContent(a(f.data),H),b.finished=!0,J(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var L,M=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=n.st.image,d=".image";n.types.push("image"),w(g+d,function(){n.currItem.type==="image"&&c.cursor&&a(document.body).addClass(c.cursor)}),w(b+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),r.off("resize"+j)}),w("Resize"+d,n.resizeImage),n.isLowIE&&w("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){L&&clearInterval(L),L=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(L),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,y("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.el&&b.el.find("img").length&&(i.alt=b.el.find("img").attr("alt")),b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:M(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(L&&clearInterval(L),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var N,O=function(){return N===undefined&&(N=document.createElement("p").style.MozTransform!==undefined),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return O()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var P="iframe",Q="//about:blank",R=function(a){if(n.currTemplate[P]){var b=n.currTemplate[P].find("iframe");b.length&&(a||(b[0].src=Q),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(b+"."+P,function(){R()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var S=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery",e=Boolean(a.fn.mfpFastClick);n.direction=!0;if(!c||!c.enabled)return!1;u+=" mfp-gallery",w(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),s.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),w("UpdateStatus"+d,function(a,b){b.text&&(b.text=T(b.text,n.currItem.index,n.items.length))}),w(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?T(c.tCounter,e.index,f):""}),w("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),f=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m),g=e?"mfpFastClick":"click";d[g](function(){n.prev()}),f[g](function(){n.next()}),n.isIE7&&(x("b",d[0],!1,!0),x("a",d[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),n.container.append(d.add(f))}}),w(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),w(b+d,function(){s.off(d),n.wrap.off("click"+d),n.arrowLeft&&e&&n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=S(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=S(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=S(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),y("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,y("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=n.st.retina,b=a.ratio;b=isNaN(b)?b():b,b>1&&(w("ImageHasSize."+U,function(a,c){c.img.css({"max-width":c.img[0].naturalWidth/b,width:"100%"})}),w("ElementParse."+U,function(c,d){d.src=a.replaceSrc(d,b)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){r.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g=a(this),h;if(c){var i,j,k,l,m,n;g.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,r.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0];if(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)l=!0,d()}).on("touchend"+f,function(a){d();if(l||n>1)return;h=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){h=!1},b),e()})})}g.on("click"+f,function(){h||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&r.off("touchmove"+f+" touchend"+f)}}(),A()})
//Hook up generic modals
$(document).ready(function() {
	$('.openPopup[modalType!="iframe"]').each(function(){
		var popupType = $(this).attr('popupType');
		var prependId = '#form1';
		if ($('#form1').length == 0)
			prependId = 'body';
		if (!popupType || popupType == "")
			popupType = 'inline';
		$(this).magnificPopup({
			type: popupType,
			midClick: true,
			prependTo: prependId,
			focus: $(this).attr('data-mfp-focus')
		}); 
	});
});
/*

	Example of how to use matchMedia.
	The matchMedia legacy code has been removed, because this 
	funcitonality is now included in vanilla JavaScript.


	The below statement checks to see if 
	the screen is currently 500px or smaller.

	if ( window.matchMedia("(max-width: 500px)").matches ) {
		do something
	}

*/
//mobile filter drawer
(function($) {
    $.fn.filterToggle = function() {
        waitForFinalEvent(
            function() {
                function closeFilters() {
                    $('body').removeClass('mobileFilterDrawer-open');
                    $('.mobileFilterDrawerMask').remove();
                }

                function openFilters() {
                    $('body').addClass('mobileFilterDrawer-open');
                    if (!$('.mobileFilterDrawerMask').length) {
                        $('body').append($("<div></div>").addClass('mobileFilterDrawerMask'));
                    }
                }
                if (window.matchMedia("(max-width: 641px)").matches) {

                    $('.js-mobileFilterDrawerToggle').click(function() {
                        openFilters();
                    });

                    $('.mobileFilterDrawer-close').click(function() {
                        closeFilters();
                    });

                    $(document).delegate('.mobileFilterDrawerMask','click',function() {
                        closeFilters();
                    });

                } else {
                    closeFilters();
                }
            }, 200, "filterToggleResize");
    };
})(jQuery);
$(window).bind('load resize orientationchange', $.fn.filterToggle);

/*******************************************************************
This is the function to add toggles for nav items that have children.
If this is going in a mobile Drawer the mediaQuery needs to match the 
 mediaQuery used in the drawer function.
*******************************************************************/

$(document).ready(function() {
  $('.navMain li.hasChildren, .navUtil li.hasChildren').subToggle({
    mediaQuery: 1024
  });
});

//jQuery function for adding sub toggles
(function($) {
  $.fn.subToggle = function(options) {
    var opts = options;
    return this.each(function() {
      var defaults = {
        mediaQuery: 1024
      };
      var options = $.extend({}, defaults, opts);

      var $this = $(this);
      var mediaQuery = options.mediaQuery;

      addRemoveToggle($this, mediaQuery);

      $(window).on('resize orientationchange', function() {
        addRemoveToggle($this, mediaQuery);
      });
    });
  }
}(jQuery));

//Function to add/remove toggles
//This is called by the plugin above this.
function addRemoveToggle(element, mediaQuery) {
  if (!window.matchMedia('(min-width: ' + mediaQuery + 'px)').matches) {
    if (element.find('.navMain-mobile-subToggle').length <= 0) {
      element.prepend('<span class="navMain-mobile-subToggle" />');
    }
  } else {
    element.find('.navMain-mobile-subToggle').remove();
  }
}

//Document delegation for mobils sub toggles.
//Delegating this event prevents us from having to wire this up each time the toggle is added. 
$(document).on('click', '.navMain-mobile-subToggle', function(event) {
  event.stopPropagation();
  if (!$(this).closest('li').hasClass('is-active')) {
    $('.navMain-mobile li.is-active').removeClass('is-active');
    $(this).closest('li').addClass('is-active');
  } else {
    $('.navMain-mobile li.is-active').removeClass('is-active');
  }
});

//Document delegation for links with no destination (act as a sub toggle).
$(document).on('click', '.navMain-mobile li.hasChildren', function(event) {
  if ($(this).find('a').attr('href') === "javascript:void(0)") {
    event.preventDefault();
    $('.navMain-mobile li.hasChildren').not($(this)).removeClass('is-active');
    $(this).toggleClass('is-active');
  }
});

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-borderradius-opacity-rgba-cssanimations-generatedcontent-csstransitions-input-inputtypes-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;
window.Modernizr = function(a, b, c) {
      function B(a) { j.cssText = a }

      function C(a, b) {
         return B(n.join(a + ";") + (b || "")) }

      function D(a, b) {
         return typeof a === b }

      function E(a, b) {
         return !!~("" + a).indexOf(b) }

      function F(a, b) {
         for (var d in a) {
            var e = a[d];
            if (!E(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 }
         return !1 }

      function G(a, b, d) {
         for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : D(f, "function") ? f.bind(d || b) : f }
         return !1 }

      function H(a, b, c) {
         var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + p.join(d + " ") + d).split(" ");
         return D(b, "string") || D(b, "undefined") ? F(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), G(e, b, c)) }

      function I() { e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++) t[c[d]] = c[d] in k;
            return t.list && (t.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), t }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), s[a[d]] = !!e;
            return s }("search tel url email datetime date month week time datetime-local number range color".split(" ")) }
      var d = "2.6.2",
         e = {},
         f = !0,
         g = b.documentElement,
         h = "modernizr",
         i = b.createElement(h),
         j = i.style,
         k = b.createElement("input"),
         l = ":)",
         m = {}.toString,
         n = " -webkit- -moz- -o- -ms- ".split(" "),
         o = "Webkit Moz O ms",
         p = o.split(" "),
         q = o.toLowerCase().split(" "),
         r = {},
         s = {},
         t = {},
         u = [],
         v = u.slice,
         w, x = function(a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"),
               m = b.body,
               n = m || b.createElement("body");
            if (parseInt(d, 10))
               while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i },
         y = function(b) {
            var c = a.matchMedia || a.msMatchMedia;
            if (c) return c(b).matches;
            var d;
            return x("@media " + b + " { #" + h + " { position: absolute; } }", function(b) { d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute" }), d },
         z = {}.hasOwnProperty,
         A;!D(z, "undefined") && !D(z.call, "undefined") ? A = function(a, b) {
         return z.call(a, b) } : A = function(a, b) {
         return b in a && D(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function(b) {
         var c = this;
         if (typeof c != "function") throw new TypeError;
         var d = v.call(arguments, 1),
            e = function() {
               if (this instanceof e) {
                  var a = function() {};
                  a.prototype = c.prototype;
                  var f = new a,
                     g = c.apply(f, d.concat(v.call(arguments)));
                  return Object(g) === g ? g : f }
               return c.apply(b, d.concat(v.call(arguments))) };
         return e }), r.touch = function() {
         var c;
         return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : x(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) { c = a.offsetTop === 9 }), c }, r.rgba = function() {
         return B("background-color:rgba(150,255,150,.5)"), E(j.backgroundColor, "rgba") }, r.borderradius = function() {
         return H("borderRadius") }, r.opacity = function() {
         return C("opacity:.55"), /^0.55$/.test(j.opacity) }, r.cssanimations = function() {
         return H("animationName") }, r.csstransitions = function() {
         return H("transition") }, r.generatedcontent = function() {
         var a;
         return x(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) { a = b.offsetHeight >= 3 }), a };
      for (var J in r) A(r, J) && (w = J.toLowerCase(), e[w] = r[J](), u.push((e[w] ? "" : "no-") + w));
      return e.input || I(), e.addTest = function(a, b) {
            if (typeof a == "object")
               for (var d in a) A(a, d) && e.addTest(d, a[d]);
            else { a = a.toLowerCase();
               if (e[a] !== c) return e;
               b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b }
            return e }, B(""), i = k = null,
         function(a, b) {
            function k(a, b) {
               var c = a.createElement("p"),
                  d = a.getElementsByTagName("head")[0] || a.documentElement;
               return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild) }

            function l() {
               var a = r.elements;
               return typeof a == "string" ? a.split(" ") : a }

            function m(a) {
               var b = i[a[g]];
               return b || (b = {}, h++, a[g] = h, i[h] = b), b }

            function n(a, c, f) { c || (c = b);
               if (j) return c.createElement(a);
               f || (f = m(c));
               var g;
               return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g }

            function o(a, c) { a || (a = b);
               if (j) return a.createDocumentFragment();
               c = c || m(a);
               var d = c.frag.cloneNode(),
                  e = 0,
                  f = l(),
                  g = f.length;
               for (; e < g; e++) d.createElement(f[e]);
               return d }

            function p(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                  return r.shivMethods ? n(c, a, b) : b.createElem(c) }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
                  return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")' }) + ");return n}")(r, b.frag) }

            function q(a) { a || (a = b);
               var c = m(a);
               return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a }
            var c = a.html5 || {},
               d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
               e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
               f, g = "_html5shiv",
               h = 0,
               i = {},
               j;
            (function() {
               try {
                  var a = b.createElement("a");
                  a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function() { b.createElement("a");
                     var a = b.createDocumentFragment();
                     return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined" }() } catch (c) { f = !0, j = !0 } })();
            var r = { elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", shivCSS: c.shivCSS !== !1, supportsUnknownElements: j, shivMethods: c.shivMethods !== !1, type: "default", shivDocument: q, createElement: n, createDocumentFragment: o };
            a.html5 = r, q(b) }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.mq = y, e.testProp = function(a) {
            return F([a]) }, e.testAllProps = H, e.testStyles = x, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + u.join(" ") : ""), e }(this, this.document),
   function(a, b, c) {
      function d(a) {
         return "[object Function]" == o.call(a) }

      function e(a) {
         return "string" == typeof a }

      function f() {}

      function g(a) {
         return !a || "loaded" == a || "complete" == a || "uninitialized" == a }

      function h() {
         var a = p.shift();
         q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1) }, 0) : (a(), h()) : q = 0 }

      function i(a, c, d, e, f, i, j) {
         function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { "img" != a && m(function() { t.removeChild(l) }, 50);
               for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } }
         var j = j || B.errorTimeout,
            l = b.createElement(a),
            o = 0,
            r = 0,
            u = { t: d, s: c, e: f, a: i, x: j };
         1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() { k.call(this, r) }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l)) }

      function j(a, b, c, d, f) {
         return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this }

      function k() {
         var a = B;
         return a.loader = { load: j, i: 0 }, a }
      var l = b.documentElement,
         m = a.setTimeout,
         n = b.getElementsByTagName("script")[0],
         o = {}.toString,
         p = [],
         q = 0,
         r = "MozAppearance" in l.style,
         s = r && !!b.createRange().compareNode,
         t = s ? l : n.parentNode,
         l = a.opera && "[object Opera]" == o.call(a.opera),
         l = !!b.attachEvent && !l,
         u = r ? "object" : l ? "script" : "img",
         v = l ? "script" : u,
         w = Array.isArray || function(a) {
            return "[object Array]" == o.call(a) },
         x = [],
         y = {},
         z = { timeout: function(a, b) {
               return b.length && (a.timeout = b[0]), a } },
         A, B;
      B = function(a) {
         function b(a) {
            var a = a.split("!"),
               b = x.length,
               c = a.pop(),
               d = a.length,
               c = { url: c, origUrl: c, prefixes: a },
               e, f, g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c }

         function g(a, e, f, g, h) {
            var i = b(a),
               j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() { k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2 }))) }

         function h(a, b) {
            function c(a, c) {
               if (a) {
                  if (e(a)) c || (j = function() {
                     var a = [].slice.call(arguments);
                     k.apply(this, a), l() }), g(a, j, b, 0, h);
                  else if (Object(a) === a)
                     for (n in m = function() {
                           var b = 0,
                              c;
                           for (c in a) a.hasOwnProperty(c) && b++;
                           return b }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l() } : j[n] = function(a) {
                        return function() {
                           var b = [].slice.call(arguments);
                           a && a.apply(this, b), l() } }(k[n])), g(a[n], j, b, n, h)) } else !c && l() }
            var h = !!a.test,
               i = a.load || a.both,
               j = a.callback || f,
               k = j,
               l = a.complete || f,
               m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i) }
         var i, j, l = this.yepnope.loader;
         if (e(a)) g(a, 0, l, 0);
         else if (w(a))
            for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
         else Object(a) === a && h(a, l) }, B.addPrefix = function(a, b) { z[a] = b }, B.addFilter = function(a) { x.push(a) }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
         var k = b.createElement("script"),
            l, o, e = e || B.errorTimeout;
         k.src = a;
         for (o in d) k.setAttribute(o, d[o]);
         c = j ? h : c || f, k.onreadystatechange = k.onload = function() {!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function() { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n) }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
         var e = b.createElement("link"),
            j, c = i ? h : c || f;
         e.href = a, e.rel = "stylesheet", e.type = "text/css";
         for (j in d) e.setAttribute(j, d[j]);
         g || (n.parentNode.insertBefore(e, n), m(c, 0)) } }(this, document), Modernizr.load = function() { yepnope.apply(window, [].slice.call(arguments, 0)) };

//toggle user nav on mobile
function mobileUserToggle(el) {
   var $this = $(el);
   if (window.matchMedia("(max-width: 1023px)").matches) {
      $this.toggleClass('is-active');
   } else {
      $this.removeClass('is-active');
   }
}

$(document).ready(function() {
   $(document).on('click', '.navUser', function() {
      mobileUserToggle($(this));
   });

   $(window).on('resize orientationchange', function() {
      $('.navUser').removeClass('is-active');
   });
});

//counters for cartitems
jQuery(document).ready(function() {
    $('.productTools-counter-control--add, .cartItem-actions-counter-control--add').click(function() {
        var $input = $(this).prev('.productTools-counter-display, .cartItem-actions-counter-display');

        var step = parseInt($input.data("step"));
        if (!step) {
            step = 1;
        }

        var max = parseInt($input.data("max"));
        if (!max) {
            max = 9999;
        }

        var currentValue = parseInt($input.val());
        if (parseFloat(currentValue) >= 0) {
            var newVal = currentValue + step;
            if (newVal > max)
                newVal = max;
            $input.val(newVal);
        }
    });

    $('.productTools-counter-control--subtract, .cartItem-actions-counter-control--subtract').click(function() {
        var $input = $(this).next('.productTools-counter-display, .cartItem-actions-counter-display');

        var step = parseInt($input.data("step"));
        if (!step) {
            step = 1;
        }

        var currentValue = parseInt($input.val());
        if (parseFloat(currentValue) > 1) {
            var newVal = currentValue - step;
            if (newVal <= 0)
                newVal = 1;
            $input.val(newVal);
        }
    });
});


/* Instructions:
1. Define the main element you want moved (theElement)
2. Define the container you want the element moved to (destination: '.destinationContainer')
3. Define the breakpoint at which you want the element moved in pixels (mediaQuery: 1000) 
    3a. This is optional - the default is 1023
4. Define the modifier class you want added to the element while it is moved (movedClass: 'someClassName')
    4a. This is optional - the default is 'is-moved'
    5. Define whether you would like the element to be prepended (added to beginning)
    or appended (added to end) of destination container

FULL EXAMPLE:
$('.navCallout').retach({
    destination:'.globals-mobile', 
    mediaQuery: 641,
    movedClass: 'navCallout-mobile',
    prependAppend: 'prepend'
});

Let's break this down:

//.navCallout is what we want to move around
$('.navCallout').retach({

    //We specify that the element should be moved to the div with the class of .globals-mobile
    destination: '.globals-mobile',

    //This element should be moved while screen width is LESS THAN 641px wide
    mediaQuery: 641,

    //We add the class of "navCallout-mobile" to the element while it is moved from it's original location
    movedClass: 'navCallout-mobile',

    //instead of appending the element to the container, we will prepend it
    prependAppend: 'prepend'
});

HEADER SPECIFIC EXAMPLE:
Let's say different headers have different elements and we want some to appear in the global-mobiles drawer

    //for the element we want to move, just add the classname of the appropriate header
    $('.headerMain--franchise .locSearch').retach({
        destination:'.globals-mobile', 
        mediaQuery: 641,
        movedClass: 'locSearch-mobile',
        prependAppend: 'prepend'
    });

*/


$(document).ready(function() {
  //attach main nav items to the main mobile nav in the drawer
  $('.navMain > ul > li').retach({
    destination: '.navMain-mobile > ul',
    mediaQuery: 1024

  });
  //attach util nav items to the main mobile nav in the drawer
  $('.navUtil > ul > li:last-child').retach({
    destination: '.navMain-mobile > ul',
    movedClass: 'navUtil-mobile-lastChild',
    mediaQuery: 1024
  });
  $('.navUtil > ul > li').retach({
    destination: '.navMain-mobile > ul',
    movedClass: 'navUtil-mobile',
    mediaQuery: 1024
  });
  //send the filters to the drawer on mobile
  $('.filters').retach({
    destination: '.filters-mobile',
    mediaQuery: 641
  });
  $('.logoMain').retach({
    destination: '.headerMain-mainZone01',
    prependAppend: 'prepend'
  });   
  $('.searchBoxContainer').retach({
    destination: '.headerMain-mainZone02',
    movedClass: 'searchBox-mobile',    
  });  
  $('.cartStatus').retach({
    destination: '.headerMain-mainZone02',
  });  
  
});



(function($) {
  $.fn.retach = function(options) {
    var defaults = {
      destination: 'body',
      mediaQuery: 1023,
      movedClass: 'is-moved',
      prependAppend: 'append'
    };
    var options = $.extend({}, defaults, options);

    var $items = this;
    var $destination = $(options.destination);
    var mediaQuery = options.mediaQuery;
    var movedClass = options.movedClass;
    var $prependAppend = options.prependAppend;
    var currenOrientation = "portrait";
    var orientationChanged = false;

    if (window.innerHeight > window.innerWidth) {
        currenOrientation = "landscape";
    }

    var placeholderID = Math.floor((Math.random() * 10000) + 1) + Math.floor((Math.random() * 10000) + 1);
    var $placeholder = $('<i class="placeholder" data-placeholderID="' + placeholderID + '" />');

    function moveItems() {
      if ($('i[data-placeholderID="' + placeholderID + '"]').length <= 0) {
        $items.first().before($placeholder);
      }
      if (window.matchMedia("(max-width: " + mediaQuery + "px)").matches) {
        if ($prependAppend == 'append') {
          $destination.append($items);
        } else {
          $destination.prepend($items);
        }

        $items.addClass(movedClass);
      } else {
        $placeholder.after($items);
        $items.removeClass(movedClass);
      }
    }

    moveItems();
    $(window).bind('orientationchange',function(e) {
          //only need to do for android
          var newOrientation;
          if(window.innerHeight > window.innerWidth){
              newOrientation = "landscape";
          }
          else{
              newOrientation = "portrait";
          }
          if(newOrientation != orientation)
          {
              orientation = newOrientation;
              orientationChanged = true;
          }
          else
          orientationChanged = false;
    });
    $(window).resize(function() {
        //android browsers fire resize when keyboard opens, so we can assume if text box has focus we dont want to fire
        //the move items function
        var isAndroid = (/Android/i.test(navigator.userAgent));
        if($(document.activeElement).prop('type') !== 'text' && !isAndroid || orientationChanged) {
            moveItems();
            orientationChanged = false;
        }
    });
    return $items;
  }
}(jQuery));

/*Small hack to fix secondary nav. As of now, the class "selected" gets added not only to direct parent LI of the current page link, but
also to the parent of that UL if it is a second or third level link. This adds the class of lastSelected to the actual current page LI*/
$(document).ready( function() {
	$(".navSecondary ul li.selected:last").addClass("lastSelected");
});
//secondary nav toggle
jQuery(document).ready(function($) {
	$('.navSecondary-breadcrumb li').first().prepend('<span class="navSecondaryToggle"></span>');
	$('.navSecondaryToggle').click(function() {
		$(this).toggleClass('is-active');
		$('.navSecondary').toggleClass('is-active');
	});
});

//make nav stick to top
$(document).ready(function() {
    if (!$('.headerMain--stripped').length) {
        var topDistance = $(window).scrollTop();
        var navbarHeight = $('.headerMain-main').outerHeight();
        var utilbarHeight = $('.headerMain-util').outerHeight();
        var headerHeight = navbarHeight + utilbarHeight;

        var utilFirst = false;

        if ($('.headerMain-util').index() < $('.headerMain-main').index()) {
            utilFirst = true;
        }

        $(window).scroll(function() {
            var lastPosition = $(this).scrollTop();
            if (lastPosition > topDistance) {
                // I have scrolled down
                if ($(window).scrollTop() > headerHeight) {
                    // I have scrolled past the header
                    $('body').removeClass('js-headerFixed--down').addClass('js-headerFixed--up');
                    $('.pageWrap').css('padding-top', navbarHeight);
                    $('a.backToTop').addClass('backToTop--scrolled');
                } else {
                    $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    $('.pageWrap').css('padding-top', '');
                    $('a.backToTop').removeClass('backToTop--scrolled');                    
                }
            } else if (lastPosition + 2 < topDistance) {
                // I have scrolled up
                if (utilFirst) {
                    //The utility header is before the main header in the DOM
                    if ($(window).scrollTop() >= utilbarHeight) {
                        $('body').addClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    } else {
                        $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                        $('.pageWrap').css('padding-top', '');
                        $('a.backToTop').removeClass('backToTop--scrolled');                    
                    }
                } else {
                    //The utility header is after the main header in the DOM
                    if ($(window).scrollTop() >= 1) {
                        $('body').addClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    } else {
                        $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                        $('.pageWrap').css('padding-top', '');
                    }
                }
            }
            topDistance = lastPosition;
        });
    }
});


// Responsive tabs/accordion. Basically just adds class .is-active to first tab on load and then any tab clicked on. you show and hide the proceeding content through the css
// Responsive behavior is in the CSS
 
$(document).ready(function() {    

$('.tabs li a:not(:first)').addClass('inactive');
$('.tabsContainer').hide();
$('.tabsContainer:first').show();
    
$('.tabs li a').click(function(){
    var t = $(this).attr('id');
  if($(this).hasClass('inactive')){ //this is the start of our condition 
    $('.tabs li a').addClass('inactive');           
    $(this).removeClass('inactive');
    
    $('.tabsContainer').hide();
    $('#'+ t + 'C').fadeIn('slow');
 }
});

});
//globally show and hide elements on click
//USAGE: <a href="" class="hiddenTriggerClick">show stuff when this is clicked</a><div class="hiddenContent>I will show when that link over there is clicked</div>
$(document).ready(function() {
    $(".toggleLink").click(function(event) {
		targetClickShowHide(this);
		event.preventDefault();
		if ($(this).text() == $(this).data("text-swap")) {
			$(this).text($(this).data("text-original"));
		  } else {
			$(this).data("text-original", $(this).text());
			$(this).text($(this).data("text-swap"));
		  }		
        });
    })
//globally show and hide elements on hover. We change the hover to click on touchscreen devices
//USAGE: <a href="" class="hiddenTriggerHover">show stuff when this is hovered over</a><div class="hiddenContent>I will show when that link over there is hovered over</div>
$(document).ready(function () {
    //see if we are dealing with a touchscreen device
    if ("ontouchstart" in document.documentElement) {
        //if so, show .hiddenContent on click
        $('.toggleLink--hover').click(function (event) {
			targetClickShowHide(this);
			event.preventDefault();
        });
    } else {
        //if not a touchscreen, show .hiddenContent on hover
        $('.toggleLink--hover').hover(function () {
			targetClickShowHide(this);
        });
    }
});
function targetClickShowHide(sender)
{
	
	function nextInDOM(_selector, _subject) {
		var next = getNext(_subject);
		while(next.length != 0) {
			var found = searchFor(_selector, next);
			if(found != null) return found;
			next = getNext(next);
		}
		return null;
	}
	function getNext(_subject) {
		if(_subject.next().length > 0) return _subject.next();
		return getNext(_subject.parent());
	}
	function searchFor(_selector, _subject) {
		if(_subject.is(_selector)) return _subject;
		else {
			var found = null;
			_subject.children().each(function() {
				found = searchFor(_selector, $(this));
				if(found != null) return false;
			});
			return found;
		}
		return null; 
	}	
	$(sender).toggleClass("is-active");
	var hiddenElement = nextInDOM('.toggleLinkTarget', $(sender));
	if (hiddenElement.length > 0)
		$(hiddenElement[0]).toggleClass('is-hidden');
}
// utility function to allow for the waiting of multi fired events to finish before executing
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();