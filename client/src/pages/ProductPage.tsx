import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import type { Product } from "../types/product";
import QuantityAdjuster from "../components/QuantityAdjuster";
import WishlistBtn from "../components/WishlistBtn";

import VariantSelector from "../components/VariantSelector";
import AddToCartBtn from "../components/AddToCartBtn";
import BackIcon from "@mui/icons-material/ArrowBackRounded";
import DropDownActive from "@mui/icons-material/KeyboardArrowDownRounded";
import DropDownInactive from "@mui/icons-material/KeyboardArrowRightRounded";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMeasurementsOpen, setIsMeasurementsOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/shop/${id}`);
        const data = res.data.data.product;
        setProduct(data);
        setSelectedImage(data.image ?? data.image);
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="mx-25 my-10">Loading...</p>;
  if (error || !product) return <p className="mx-25 my-10">{error}</p>;

  return (
    <main className="flex flex-col mx-25 my-10 text-left">
      <nav>
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <BackIcon /> Back To Shop
        </button>
      </nav>

      <section className="flex flex-row w-full my-5">
        <section>
          <section>
            <div className="flex flex-col gap-5 w-80">
              <div className="h-80 w-80">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </div>

              <div className="w-full flex gap-3 flex-wrap justify-center">
                {[product.image, ...(product.images ?? [])].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-15 h-15 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? "border-purple-400 border-3"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`view-${i}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section className="flex flex-col pl-10 flex-1 max-w-170">
          <div className="flex flex-col gap-2.5">
            <h1 className="font-semibold text-[24px]">{product.name}</h1>

            <p>{product.description}</p>

            <p>
              Sold by{" "}
              <span className="font-semibold hover:text-purple-500 hover:underline">
                <Link to="/">{product.seller.shopName}</Link>
              </span>
            </p>

            <p className="font-bold text-[32px] py-3">
              ₦{Number(product.price).toLocaleString()}
            </p>

            <div className="flex flex-col gap-5">
              {product.variants?.sizes && (
                <VariantSelector
                  label="Size"
                  options={product.variants.sizes}
                  value={selectedSize}
                  onChange={setSelectedSize}
                />
              )}

              {product.variants?.colors && (
                <VariantSelector
                  label="Color"
                  options={product.variants.colors}
                  value={selectedColor}
                  onChange={setSelectedColor}
                />
              )}
            </div>
          </div>

          <div className="flex flex-row gap-5 align-middle mt-auto">
            <QuantityAdjuster quantity={quantity} onChange={setQuantity} />

            <AddToCartBtn
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
            />

            <WishlistBtn productId={product.id} />
          </div>
        </section>

        <section className="flex flex-col flex-end w-85">
          <h2 className="text-[24px] font-semibold">Product Information</h2>

          <div className="flex flex-col gap-5 my-5">
            <section className="flex flex-col gap-1">
              <div className="font-semibold flex align-middle">
                <p>Features </p>
                <span>
                  <button
                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                    className="cursor-pointer"
                  >
                    {isFeaturesOpen ? <DropDownActive /> : <DropDownInactive />}
                  </button>
                </span>
              </div>

              {isFeaturesOpen && (
                <div>
                  <p>{product.features}</p>
                </div>
              )}
            </section>

            <section className="flex flex-col gap-1">
              <div className="font-semibold flex align-middle">
                <p>Measurements </p>
                <span>
                  <button
                    onClick={() => setIsMeasurementsOpen(!isMeasurementsOpen)}
                    className="cursor-pointer"
                  >
                    {isMeasurementsOpen ? (
                      <DropDownActive />
                    ) : (
                      <DropDownInactive />
                    )}
                  </button>
                </span>
              </div>

              {isMeasurementsOpen && (
                <div>
                  <p>{product.measurements}</p>
                </div>
              )}
            </section>

            <section className="flex flex-col gap-1">
              <div className="font-semibold flex align-middle">
                <p>Materials and Care </p>
                <span>
                  <button
                    onClick={() => setIsMaterialsOpen(!isMaterialsOpen)}
                    className="cursor-pointer"
                  >
                    {isMaterialsOpen ? (
                      <DropDownActive />
                    ) : (
                      <DropDownInactive />
                    )}
                  </button>
                </span>
              </div>

              {isMaterialsOpen && (
                <div>
                  <p>{product.materialsAndCare}</p>
                </div>
              )}
            </section>
          </div>

          <section>Product Rating</section>
        </section>
      </section>
    </main>
  );
};

export default ProductPage;
