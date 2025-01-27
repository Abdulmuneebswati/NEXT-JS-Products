import DeleteProduct from '@/components/DeleteProduct';
import UserButton from '@/components/Products/UserButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import newRequest from '@/config/axiosInstance';
import { verifySession } from '@/lib/dal';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
const getProducts = async () => {
  try {
    const response = await newRequest.get('products/');
    return response;
  } catch (error) {
    console.log(error, '++++++++');
  }
};
export default async function Home() {
  const { data } = await getProducts();
  const { user } = await verifySession();

  return (
    <div className='p-10'>
      <h1 className=''>Products</h1>
      <div className='flex gap-5 mt-4 w-auto'>
        {data &&
          data.map(
            (product: {
              id: number;
              name: string;
              description: string;
              price: string;
              stock: string;
              owner: {
                id: number;
                name: string;
              };
            }) => {
              const isOwner = user?.id === product?.owner?.id;
              return (
                <div
                  key={product.id}
                  className=''
                >
                  <Link
                    href={`/product/${product.id}`}
                    className='w-[30%]'
                  >
                    <Card>
                      <div className='flex w-full pr-4 pt-4 justify-end'>
                        {isOwner && <DeleteProduct productId={product.id} />}
                      </div>
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='flex  items-center justify-between '>
                          <UserButton
                            ownerId={product?.owner?.id}
                            ownerName={product?.owner?.name}
                          />
                          <p>Price:{product?.price ?? ''}</p>
                        </div>
                        <div className=''>
                          Available Items:{product?.stock ?? ''}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}
