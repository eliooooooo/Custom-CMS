(() => {
  // assets/js/main.js
  document.querySelectorAll(".toggle-input").forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
      this.nextElementSibling.style.display = this.checked ? "block" : "none";
    });
  });
})();
