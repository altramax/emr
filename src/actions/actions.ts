'use server';

import { encodedRedirect } from '@/src/utils/utils';
import { createClient } from '@/src/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
// import { toast } from 'react-toastify';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect('error', '/sign-up', 'Email and password are required');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    );
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const signInAction = async (queryData: any) => {
  const email = queryData.get('email') as string;
  const password = queryData.get('password') as string;

  try {
    const supabase = await createClient();

    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      switch (error.code) {
        case 'AuthApiError':
          if (error.message.includes('Invalid login credentials')) {
            return { response: 'error', message: 'invalid_credentials' };
          }
          return { response: 'error', message: 'auth_api_error' };

        case 'AuthRetryableError':
          return { response: 'error', message: 'network_issue' };

        case 'AuthInvalidCredentialsError':
          return { response: 'error', message: 'invalid_account_credentials' };

        case 'AuthEmailNotConfirmedError':
          return { response: 'error', message: 'email_not_confirmed' };

        default:
          console.error('Unexpected sign-in error:', error.code);
          return { response: 'error', message: 'unexpected_error' };
      }
    }

    if (user) {
      const { data: userRole } = await supabase
        .from('role')
        .select('role')
        .eq('user_id', user?.user?.id)
        .single();

      if (userRole) {
        await supabase.auth.updateUser({
          data: {
            role: userRole?.role,
          },
        });
      }
    }
    return { response: 'success', message: 'signin_successful' };
  } catch (error) {
    if (error) {
      encodedRedirect('error', '/', 'error signing in');
      return { error: error };
    }
  }
};

export const setPasswordAction = async (password: string) => {
  const supabase = await createClient();
  try {
    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { response: 'error', message: 'Invalid session' };
    }

    // Update user password using the server-side client
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error('Error setting password:', error);
      return { response: 'error', message: error.message };
    }
  } catch (error: any) {
    console.error('Server error:', error);
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect('error', '/forgot-password', 'Could not reset password');
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect('error', '/protected/reset-password', 'Passwords do not match');
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect('error', '/protected/reset-password', 'Password update failed');
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return 'success';
};
