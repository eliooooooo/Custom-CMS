import '../css/style.css';
import './notification.js';
import './admin-panel.js';
import './swiper.js';


document.querySelectorAll('.toggle-input').forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    this.nextElementSibling.style.display = this.checked ? 'block' : 'none';
  });
});