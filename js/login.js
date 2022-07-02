import { auth } from './auth.js';
import { Form } from './forms.js';
import { dialogs } from './modal.js';
import { redirect } from './script.js';

if (auth.isLogged) {
  redirect('dashboard');
}

const frmLoginRef = document.getElementById('frmLogin');
const frmLogin = new Form(frmLoginRef);

frmLogin.onSubmit = async () => {
  try {
    dialogs.show('...')
    await auth.login(frmLogin.data);
    dialogs.hideDialog()
    redirect('dashboard');
    dialogs.show('Bienvenido, '+frmLogin.data.email)
  } catch (error) {
    dialogs.show('Hubo un problema', 'error')
    frmLogin.setError('email', 'Credenciales erróneas')
    frmLogin.setError('password', 'Credenciales erróneas')
  }
}
