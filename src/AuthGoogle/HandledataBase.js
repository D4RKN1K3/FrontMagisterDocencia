import { supabase } from '../supabase';
import Cookies from 'js-cookie';


//Ver los estados al cambiar contraseña
class AuthState {
  constructor() { }

  startListening() {
    throw new Error('startListening method not implemented');
  }
}

class SupaBaseAuthState extends AuthState {
  constructor() {
    super();
  }

  startListening() {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        const access_token = session?.access_token;
        //Guardar en cookies, este access_token es unicamente para el cambio de contraseña, despues eliminar
      }
    });
  }
}

// Funcion para verificar la sesion cuando se inicie sesion con google
class AuthStateSocial {
  constructor() { }

  checkSessionSocial() {
    throw new Error('checkSessionSocial method not implemented');
  }
}

class SupaBaseAuthStateSocial extends AuthStateSocial {
  constructor() {
    super();
  }

  checkSessionSocial() {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          const access_token = session?.access_token;
          const refresh_token = session?.refresh_Token;
          //Guardar en cookies
          Cookies.set('access_token', access_token);
          Cookies.set('refresh_token', refresh_token);
          
          //Redirecion
          window.location.href = '/';
        }
      });
  }
}

class SignOut {
  constructor() { }

  signOut() {
    throw new Error('startListening method not implemented');
  }
}

class SupaBaseSignOut extends SignOut {
  constructor() {
    super();
  }

  async signOut() {
    await supabase.auth.signOut();
  }
}

export {
  SupaBaseAuthState as AuthState,
  SupaBaseAuthStateSocial as AuthStateSocial,
  SupaBaseSignOut as SignOut
};
