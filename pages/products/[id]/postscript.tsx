import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@prisma/client";

interface postScriptForm {
  postscript: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<postScriptForm>();
  return (
    <Layout canGoBack title="PostScript">
      <form className="p-4 space-y-4">
        <TextArea
          required
          register={register("postscript", { required: true })}
          name="postscript"
          label="postscript"
        />
        <Button text="Leave" />
      </form>
    </Layout>
  );
};

export default Upload;
