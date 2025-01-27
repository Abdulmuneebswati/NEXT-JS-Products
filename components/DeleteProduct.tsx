'use client';
import { Button } from './ui/button';
import { deleteProduct } from '@/app/actions/products';

const DeleteProduct = ({ productId }: { productId: number }) => {
  return (
    <Button
      variant={'destructive'}
      onClick={async (e) => {
        e.preventDefault();
        const res = await deleteProduct(productId);
        console.log(res);
      }}
      className='bg-red-300 rounded-[10px]'
    >
      Delete
    </Button>
  );
};

export default DeleteProduct;
