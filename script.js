document.addEventListener('DOMContentLoaded', function() {
  const template = document.getElementById('sidebar-template');
  const sidebarContent = template.content;

  document.querySelectorAll('.sidebar-container').forEach(container => {
    const clone = document.importNode(sidebarContent, true);
    container.appendChild(clone);
  });
});
function highlightActiveLink() {
    const links = document.querySelectorAll('.sidebar__list__link');
    const currentHash = window.location.hash;

    links.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === currentHash) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('DOMContentLoaded', highlightActiveLink);

  window.addEventListener('hashchange', highlightActiveLink);