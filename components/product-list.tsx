import { ProductwithCount } from "pages";
import useSWR from "swr";
import Item from "@components/item";
import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases" | "reservations";
}

interface Record {
  id: number;
  product: ProductwithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const router = useRouter();
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <>
          {kind === "reservations" ? (
            <>
              <Item
                key={record.product.id}
                id={record.product.id}
                title={record.product.name}
                price={record.product.price}
                comments={1}
                hearts={record.product._count.favs}
              />
              <button
                onClick={() => {
                  router.push(`/products/${record.product.id}/postscript`);
                }}
                className={cls(
                  "w-1/2 bg-orange-500 hover:bg-orange-600 text-white border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none py-3 text-base"
                )}
              >
                후기 남기기
              </button>
            </>
          ) : (
            <Item
              key={record.product.id}
              id={record.product.id}
              title={record.product.name}
              price={record.product.price}
              comments={1}
              hearts={record.product._count.favs}
            />
          )}
        </>
      ))}
    </>
  ) : null;
}
