(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  var input = document.querySelector("#photos");
  var previews = document.querySelector("#upload-previews");
  if (input && previews) {
    input.addEventListener("change", function () {
      previews.innerHTML = "";
      var files = Array.prototype.slice.call(input.files || []);
      if (!files.length) {
        previews.hidden = true;
        return;
      }
      previews.hidden = false;
      files.slice(0, 6).forEach(function (file) {
        if (!file.type.match(/^image\//)) return;
        var img = document.createElement("img");
        img.alt = file.name;
        img.src = URL.createObjectURL(file);
        previews.appendChild(img);
      });
    });
  }

  var form = document.querySelector("#quote-form");
  var success = document.querySelector("#form-success");
  if (form && success) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
