import { auth } from './auth.js';
import { dialogs } from './modal.js';
import { API_URL, redirect } from './script.js';

if (!auth.isLogged) {
  redirect('login');
  throw new Error('You must be logged in')
}

fetch(`${API_URL}/users`)
  .then((data) => data.json())
  .then((users) => {
    renderUsers(users.data);
  })
  .catch(error => {
    dialogs.show('No se pudo obtener los usuarios', 'error')
  });

function renderUsers(users) {
  const table = document.createElement('table');
  table.classList.add('table')
  table.innerHTML = `
    <caption>Usuarios</caption>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Nombre de usuario</th>
        <th>Teléfono</th>
        <th>Correo electrónico</th>
        <th>Sitio web</th>
        <th>Compañía</th>
        <th>Dirección</th>
      </tr>
    </thead>

    <tbody>
      ${users.map((user) => {
        return `<tr>
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.phone}</td>
          <td>${user.email}</td>
          <td><a href="https://www.${user.website}">${user.website}</a></td>
          <td>
            <details>
              <summary>${user.company.name}</summary>
              <div>
                <p><strong>Catchphrase: </strong>${user.company.catchPhrase}</p>
                <p><strong>BS: </strong>${user.company.bs}</p>
              </div>
            </details>
          </td>
          <td>
            <details>
              <summary>${user.address.street} ${user.address.suite}</summary>
              <p><strong>Ciudad: </strong>${user.address.city}</p>
              <p><strong>Código postal: </strong>${user.address.zipcode}</p>
              <p><strong>Latitud: </strong>${user.address.geo.lat}</p>
              <p><strong>Longitud: </strong>${user.address.geo.lng}</p>
            </details>
          </td>
        </tr>`;
      }).join('')}
    </tbody> 
  `;
  document.querySelector('body>main').appendChild(table);
}
