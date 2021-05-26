// import $ from "jquery";
const Script = ($) => {
    var onFocus = /** @class */ (function () {
    function onFocus() {
      var $this = this;
      $this.run = $this.init();
    }
    onFocus.prototype.init = function () {
      var $this = this;
      $(document).ready(function () {
        $this.addFocusClass();
        $this.keyUpObserve();
        $this.clickLink();
      });
      return 0;
    };
    onFocus.prototype.addFocusClass = function () {
      $(".form-control")
        .focus(function () {
          $(this).prev().addClass("on-focus");
        })
        .focusout(function () {
          $(".form-label").removeClass("on-focus");
        });
    };
    onFocus.prototype.keyUpObserve = function () {
      $(".form-control").keyup(function () {
        if ($(this).val().length > 0) {
          $(this).prev().addClass("filled");
        } else {
          $(this).prev().removeClass("filled");
        }
      });
    };
    onFocus.prototype.clickLink = function () {
      $(".link").click(function () {
        var open = $(this).data("open");
        var close = $(this).data("close");
        $("#" + close).animate(
          {
            opacity: 0,
            top: +100,
          },
          500,
          function () {
            $(this).removeClass("open").addClass("close").removeAttr("style");
            $("#" + open)
              .removeClass("close")
              .addClass("open");
          }
        );
      });
    };
    return onFocus;
  })();
  var run = new onFocus();
};

export default Script;
