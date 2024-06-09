import Image from "next/image";
import CountSpinner from "../input/CountSpinner/CountSpinner";
import { ButtonMedium } from "../Buttons/ButtonIcon";
import { CartItem, deleteCartItems, getCartItems } from "@/apis/cart";
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms/cartState";

type Props = {
  cartItem: CartItem;
  productId: number; // productId 추가
  count: number;
  setCountHandler: (productId: number, value: number) => void;
};

export default function CartItemCard({ cartItem, productId, count, setCountHandler }: Props) {
  const [cart, setCart] = useRecoilState(cartState);

  const onClickDeleteButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await deleteCartItems(cartItem.id);
      //200이면 갱식
      if (response.status === 204) {
        const { data } = await getCartItems();

        setCart({ totalCount: data.totalElements, cartItems: data.content });
      }
    } catch (error) {
      console.error("error : ", error);
    }
  };

  return (
    <div className="last:border-b">
      <div className="grid h-[150px] grid-cols-[1.5fr_3.5fr_1fr_1fr_1fr] gap-2 border-t border-gray-border p-4 text-center align-middle last-of-type:border-b">
        <Image src={`${cartItem.productImageUrl}`} width={120} height={120} alt="img"></Image>
        <div className="flex h-full flex-col items-start justify-start gap-3">
          <div className="text-xl font-bold text-primary">{cartItem.productName}</div>
          {/* TODO <div className="text-gray">설명</div> */}
        </div>
        <CountSpinner
          productId={productId}
          size="medium"
          count={count}
          setCountHandler={setCountHandler}
        ></CountSpinner>
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-price">{cartItem.discountedPrice.toLocaleString()} 원</div>
          <div className="text-gray line-through">{cartItem.price.toLocaleString()} 원</div>
        </div>
        <div className="flex items-center justify-center">
          <ButtonMedium type="button" onClickHandler={onClickDeleteButtonHandler}>
            삭제
          </ButtonMedium>
        </div>
      </div>
    </div>
  );
}
