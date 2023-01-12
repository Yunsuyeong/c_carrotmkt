import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import ProductList from "@components/product-list";
import { cls } from "@libs/client/utils";
import useSWR from "swr";
import { ItemDetailResponse } from "pages/products/[id]";
import { useRouter } from "next/router";

const Reserved: NextPage = () => {
  const router = useRouter();
  return (
    <Layout title="예약내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="reservations" />
      </div>
    </Layout>
  );
};

export default Reserved;
