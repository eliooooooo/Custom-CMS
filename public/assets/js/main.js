// import AdminToolbar from './admintoolbar.js';

import '../css/style.css';
// import './login.js';


document.querySelectorAll('.toggle-input').forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    this.nextElementSibling.style.display = this.checked ? 'block' : 'none';
  });
});