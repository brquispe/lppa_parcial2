import { auth } from './auth.js';
import { redirect } from './script.js';

const navbar = document.querySelector('#navbar');
if (navbar) {
  navbar.innerHTML = `
  <nav class="navbar" role="navigation">
    <div class="navbar__top">
      <h2>
        <a href="./dashboard.html">
          <span>Dashboard</span>
        </a>
      </h2>

      ${
        auth.isLogged ? 
        `<div class="dropdown">
          <button class="btn" id="btnProfile" type="button" title="${auth.userDetail.email}">
            <span>${auth.userDetail.email}</span>
            <span>&#8964;</span>
          </button>
          <div id="dropdown" class="dropdown__content dropdown__content-hidden">
            <button class="btn" id="btnLogout" type="button" title="Cerrar sesión">
              Cerrar sesión
            </button>
          </div>
        </div>`
        : ''}
      
    </div>
  </nav>
  `
}

navbar?.querySelector('button#btnLogout')?.addEventListener('click', () => {
  auth.logout();
  redirect('login');
});

navbar?.querySelector('button#btnProfile')?.addEventListener('click', (e) => {
  e.currentTarget?.parentElement.querySelector('#dropdown').classList.toggle('dropdown__content-hidden')
})
