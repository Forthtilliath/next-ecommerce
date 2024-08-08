"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { createProduct, updateProduct } from "../../_actions/products";
import { Product } from "@prisma/client";
import Image from "next/image";

type Props = {
  product?: Product | null;
};
export function ProductForm({ product }: Props) {
  const [error, action] = useFormState(
    product ? updateProduct.bind(null, product.id) : createProduct,
    {}
  );
  const [priceInCents, setPriceInCents] = useState(product?.priceInCents ?? 0);

  return (
    <form className="space-y-8" action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">Name*</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name}
        />
        {error.name && <p className="text-destructive">{error.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents*</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || 0)}
        />
        <div className="text-muted-foreground">
          {formatCurrency(priceInCents / 100)}
        </div>
        {error.priceInCents && (
          <p className="text-destructive">{error.priceInCents}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {error.description && (
          <p className="text-destructive">{error.description}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File{!product && "*"}</Label>
        <Input type="file" id="file" name="file" required={product === null} />
        {product && <p className="text-muted-foreground">{product.filePath}</p>}
        {error.file && <p className="text-destructive">{error.file}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image{!product && "*"}</Label>
        <Input
          type="file"
          id="image"
          name="image"
          required={product === null}
        />
        {product && (
          <Image
            src={product.imagePath}
            alt="product"
            width={400}
            height={400}
          />
        )}
        {error.image && <p className="text-destructive">{error.image}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
