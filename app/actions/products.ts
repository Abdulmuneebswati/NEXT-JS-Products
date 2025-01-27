'use server';

import newRequest from '@/config/axiosInstance';
import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';

export type formDataProducts =
  | {
      message: string;
      status: string;
    }
  | undefined;

export async function updateProduct(
  state: formDataProducts,
  formData: FormData,
  productId: string
) {
  try {
    const response = await newRequest.patch(
      `products/${productId}/edit/`,
      formData
    );
    if (response.status === 200) {
      revalidatePath('/product/[id]', 'page');
      return {
        status: 'success',
        message: 'Product updated successfully.',
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: error.response?.data?.detail,
        status: 'error',
      };
    } else {
      return {
        message: 'An unknown error occurred.',
        status: 'error',
      };
    }
  }
}

export const deleteProduct = async (productId: number) => {
  try {
    const response = await newRequest.delete(`products/${productId}/delete/`);
    if (response.status === 204) {
      console.log('11111111');
      revalidatePath('/', 'layout');
    }
  } catch (error) {
    console.log(error);
  }
};
