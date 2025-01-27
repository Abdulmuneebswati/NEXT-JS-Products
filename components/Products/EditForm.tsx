// import { updateProduct } from '@/app/actions/products';
'use client';
import Form from 'next/form';
import React, { useActionState, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { formDataProducts, updateProduct } from '@/app/actions/products';
import { toast } from 'sonner';
const EditForm = ({
  isOwner,
  data,
  productId,
}: {
  isOwner: boolean;
  data: {
    name: string;
    description: string;
    price: string;
    stock: string;
    owner: {
      id: number;
      name: string;
      email: string;
    };
  };
  productId: string;
}) => {
  const [isChanged, setIsChanged] = useState(false);
  const [formState, setFormState] = useState({
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
  });
  useEffect(() => {
    const hasChanges =
      formState.name !== data.name ||
      formState.description !== data.description ||
      formState.price !== data.price ||
      formState.stock !== data.stock;
    setIsChanged(hasChanges);
  }, [formState, data]);
  const [state, action, pending] = useActionState(
    (state: formDataProducts, formData: FormData) =>
      updateProduct(state, formData, productId),
    undefined
  );

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
    } else if (state?.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Form
      action={action}
      className='space-y-4'
    >
      {/* Name */}
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Product Name
        </label>
        {!isOwner ? (
          <p className='mt-1 text-gray-800'>{data.name}</p>
        ) : (
          <input
            type='text'
            name='name'
            id='name'
            required
            defaultValue={formState.name}
            onChange={handleInputChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          Description
        </label>
        {!isOwner ? (
          <p className='mt-1 text-gray-800'>{formState.description}</p>
        ) : (
          <textarea
            name='description'
            id='description'
            rows={4}
            required
            defaultValue={formState.description}
            onChange={handleInputChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          ></textarea>
        )}
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor='price'
          className='block text-sm font-medium text-gray-700'
        >
          Price
        </label>
        {!isOwner ? (
          <p className='mt-1 text-gray-800'>{formState.price}</p>
        ) : (
          <input
            type='number'
            step='0.01'
            name='price'
            id='price'
            required
            onChange={handleInputChange}
            defaultValue={formState.price}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        )}
      </div>

      {/* Stock */}
      <div>
        <label
          htmlFor='stock'
          className='block text-sm font-medium text-gray-700'
        >
          Stock
        </label>
        {!isOwner ? (
          <p className='mt-1 text-gray-800'>{formState.stock}</p>
        ) : (
          <input
            type='number'
            name='stock'
            id='stock'
            defaultValue={formState.stock}
            onChange={handleInputChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        )}
      </div>

      {/* Owner Info */}
      <div>
        <p className='text-sm text-gray-500'>
          <strong>Owner:</strong> {data.owner.name} ({data.owner.email})
        </p>
      </div>

      {/* Submit Button */}
      <div>
        {isOwner && (
          <Button
            type='submit'
            disabled={!isChanged || pending}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isChanged
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Update Product
          </Button>
        )}
      </div>
    </Form>
  );
};

export default EditForm;
