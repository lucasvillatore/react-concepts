import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { usePromoteProduct } from "../hooks/usePromoteProduct";
import type { Product } from "../services/products.api";
import ProductCardView from "./ProductCardView";

interface Props {
  product: Product,
}

export function ProductCard({
  product
}: Props) {
  const {
    toggleProductPromotion,
    loading: promoting,
  } = usePromoteProduct();
  const {
    mutate: deleteProductMutation,
  } = useDeleteProduct();


  return (
    <ProductCardView
      title={product.name}
      category={product.category}
      price={product.price}
      showDeleteButton={true}
      isPromoted={product.isPromoted}
      isPromoting={promoting}
      onPromote={() => toggleProductPromotion(product.id)}
      onDelete={() => deleteProductMutation(product.id)}
    />
  )

}