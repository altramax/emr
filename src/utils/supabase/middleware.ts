import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const user = await supabase.auth.getUser();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const pathname = request.nextUrl.pathname;

    if (!session && pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // reinject role into usermetadata when token refreshes
    if (session && !user?.data?.user?.user_metadata?.role) {
      const { data: userRole } = await supabase
        .from('role')
        .select('role')
        .eq('user_id', user?.data?.user?.id)
        .single();

      if (userRole) {
        await supabase.auth.updateUser({
          data: {
            role: userRole.role,
          },
        });
      }
    }

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
