// import { updatePost } from '@/app/actions/posts';
import EditForm from '@/components/Products/EditForm';
import newRequest from '@/config/axiosInstance';
import { getUser, verifySession } from '@/lib/dal';
const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const { data } = await newRequest.get(`products/${id}/`);
  const { user } = await verifySession();

  const { data: userData } = await getUser(user?.id);

  const isOwner = userData?.id === data?.owner?.id;

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-xl p-8 bg-white shadow-md rounded-lg'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-6'>
          {isOwner ? 'Edit' : 'View'} Product
        </h1>
        <EditForm
          isOwner={isOwner}
          data={data}
          productId={id}
        />
      </div>
    </div>
  );
};

export default Product;
