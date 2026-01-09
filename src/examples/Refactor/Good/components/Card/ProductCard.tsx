import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { usePromoteProduct } from "../../hooks/usePromoteProduct";
import type { Product } from "../../services/products.api";
import CategoryTag from "../atoms/CategoryTag";
import PriceTag from "../atoms/PriceTag";
import PromotedBadge from "../atoms/PromotedBadge";
import ProductCardFrame from "./ProductCardFrame.view";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const {
    mutate: promote,
    isPending: isPromoting
  } = usePromoteProduct();

  const {
    mutate: remove,
    isPending: isDeleting
  } = useDeleteProduct();

  const isPromoted = product.isPromoted;

  return (
    <ProductCardFrame
      title={product.name}
      variant={isPromoted ? 'promoted' : 'default'}
      actions={[
        <Button
          type="link"
          onClick={() => promote(product.id)}
          loading={isPromoting}
          disabled={isDeleting}
        >
          {isPromoted ? 'Remover Destaque' : 'Promover'}
        </Button>,

        <Button
          danger
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => remove(product.id)}
          loading={isDeleting}
          disabled={isPromoting}
        />
      ]}
    >
      <div style={{ marginTop: 8 }}>
        <PriceTag value={product.price} isLightMode={isPromoted} />
      </div>
      <div style={{ marginTop: 8 }}>
        <CategoryTag label={product.category} />
        {isPromoted && <PromotedBadge />}
      </div>
    </ProductCardFrame>
  );
};
