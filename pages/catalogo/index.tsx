import ButtonLink from '@/components/ButtonLink';
import { VENDEDORA_JESSICA_LINK } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { Kalam } from 'next/font/google';
import Image from 'next/image';

const NEXT_PUBLIC_BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

interface ProductSize {
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  sizes?: ProductSize[];
  marketing: {
    photos?: string[];
    description?: string;
  };
}

interface ProductsResponse {
  docs: Product[];
}

export default function Catalogo() {
  const { data, isLoading, isError } = useQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/products');

      if (!res.ok) throw new Error('Erro ao buscar produtos');

      return res.json();
    },
  });

  function getProductUrl(imagePath: string) {
    return `${NEXT_PUBLIC_BUCKET_URL}/${imagePath}`;
  }

  function formatPrice(price: number) {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function formatSizesLabel(sizes?: ProductSize[]) {
    if (!sizes?.length) return '-';
    return sizes.map((s) => s.name).join(', ');
  }

  if (isLoading) {
    return (
      <main
        className={`flex items-center justify-center min-h-screen bg-[#FFE0E1] ${kalam.className}`}
      >
        <p>Carregando...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main
        className={`flex items-center justify-center min-h-screen bg-[#FFE0E1] ${kalam.className}`}
      >
        <p>Erro ao carregar produtos</p>
      </main>
    );
  }

  return (
    <main
      className={`mx-auto w-full md:w-[70%] min-h-screen ${kalam.className}`}
    >
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-3xl mb-8 font-normal">Catálogo</h1>

        {data?.docs.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.docs.map((product) => (
              <div
                key={product._id}
                className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col justify-between"
              >
                {product.marketing.photos?.length && (
                  <img
                    src={getProductUrl(product.marketing.photos[0])}
                    alt={product.name}
                    className="w-auto h-100 object-cover m-2 rounded-1"
                  />
                )}

                <div className="px-6 py-4 flex flex-col items-center">
                  <div className="font-bold text-xl mb-2">{product.name}</div>
                  {(product?.sizes?.length || 0) > 0 && (
                    <div className="font-bold text-md mb-2">
                      Tamanhos: {formatSizesLabel(product.sizes)}
                    </div>
                  )}
                  <p className="text-gray-700 text-base line-clamp-4">
                    {product.marketing.description}
                  </p>
                </div>

                <div className="px-6 pt-4 pb-2 flex justify-center items-end gap-2">
                  <span
                    className="font-bold text-xl text-rose-500"
                  >
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div className="flex justify-center mb-8">
                  <ButtonLink href={VENDEDORA_JESSICA_LINK}>
                    <span>Comprar</span>
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg">Nenhum produto encontrado</p>
        )}
      </div>
    </main>
  );
}
