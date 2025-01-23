import { LoginFormSchema, FormState } from '@/app/lib/definitions';
import axios from 'axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';



export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  try {
    const { data } = await axios.post('/api/login', {
      username,
      password,
    });
    toast.success('Login successful!');
    // Handle successful login (e.g., update state or redirect)
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(
        error.response?.data?.errors || 'An unexpected error occurred.'
      );
    } else {
      toast.error('An unknown error occurred.');
    }
  }
}

