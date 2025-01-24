import UserButton from '@/components/Products/UserButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import newRequest from '@/config/axiosInstance';
import Link from 'next/link';

export default async function Home() {
  const { data } = await newRequest.get('http://127.0.0.1:8000/api/products/', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3ODEwMzE3LCJpYXQiOjE3Mzc3MjM5MTcsImp0aSI6ImZiNjk4MDhjOTI1ZjQ2ZGI4YjIzY2YxYTNhY2RjOGUxIiwidXNlcl9pZCI6Mn0.i-FSNL4n_viRS1wsK-F0bTE1bzKr52-8UbjbsEpsZwc`, // Replace with your actual token logic
    },
  });

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
