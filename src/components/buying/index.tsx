"use client";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import { ChangeEvent, useEffect, useState } from "react";
import BoughtElement from "../common/bought";
import { formatNumber } from "@/utils/formatNumber";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { CartItem, getCartItems } from "@/apis/cart";
import { DELIVERY_FEE } from "@/constants";
import { postDeliveries } from "@/apis/deliveries";
import { Delivery, postOrders } from "@/apis/orders";
import { getProduct } from "@/apis/product";

const temp = [
  { title: "상품1", description: "설명1", count: 1, img: "/testImg.png", price: 7000, discount: 5000 },
  { title: "상품2", description: "설명2", count: 2, img: "/testImg.png", price: 5000, discount: 2200 },
];
const box = 3000;
declare const window: typeof globalThis & {
  IMP: any;
  daum: any;
};
const BuyingComponent = () => {
  const router = useRouter();
  const totalPrice = (item: CartItem[]) => item.reduce((sum, item) => sum + item.price, 0);
  const totalDiscount = (item: CartItem[]) => temp.reduce((sum, item) => sum + item.discount, 0);
  const finalPrice = (value: number) => value + DELIVERY_FEE;

  const searchParams = useSearchParams();
  const route = searchParams.get("route");

  const [more, setMore] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("x");

  const [address, setAddress] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [detailAddress, setdetailAddress] = useState("");

  const [cart, setCart] = useState<CartItem[]>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  //initBuying
  useEffect(() => {
    //경로가 카트일 때 상품가져오기
    const initCart = async () => {
      const cartResponse = await getCartItems();
      const cartItems = cartResponse.data.content;

      setCart(cartItems);
    };

    const initProduct = async () => {
      const productId = Number(searchParams.get("productId"));
      const quantity = Number(searchParams.get("count"));
      const productResponse = await getProduct(String(productId!));
      const { discountedPrice, discountRate, price, productImageUrl, name } = productResponse;
      setCart([
        { id: -1, discountedPrice, discountRate, productId, price, productImageUrl, productName: name, quantity },
      ]);
      console.log(productResponse);
    };
    if (route === "cart") initCart();
    if (route === "product") initProduct();
    //계산결과 업데이트
  }, [route]);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 보장
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Daum Postcode script loaded");
      };
    }
  }, []);

  useEffect(() => {
    //cartItem 받아올것
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const onClickAddr = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: { address: string; zipcode: string }) {
          setAddress(data.address);
          setzipcode(data.zipcode);
        },
      }).open();
    } else {
      console.error("Daum Postcode API is not loaded.");
    }
  };

  const onClickPay = async (e: React.FormEvent<HTMLFormElement>) => {
    //결제로직
    try {
      if (selectedValue === "kakao") {
        if (typeof window !== "undefined") {
          const IMP = window.IMP;
          IMP.init("imp27255777");
          // 결제 내역 수정 예정
          IMP.request_pay(
            {
              pg: "kakaopay",
              pay_method: "card",
              name: "노르웨이 회전 의자",
              amount: 100,
              buyer_email: "gildong@gmail.com",
              buyer_name: "홍길동",
              buyer_tel: "010-4242-4242",
              buyer_addr: "서울특별시 강남구 신사동",
              buyer_postcode: "01181",
              m_redirect_url: "/",
            },
            (rsp: { success: boolean }) => {
              if (rsp.success === true) {
                router.push("/bought");
              } else {
                alert("결제에 실패했습니다. 다시 시도해주세요.");
              }
            }
          );
        }
      }
      //오더생성로직

      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      formData.append("zipcode", zipcode);
      formData.append("streetAddress", address);
      formData.append("detailAddress", detailAddress);
      formData.delete("pay");

      const delivery = Object.fromEntries(formData.entries()) as Delivery;
      const orderItems = cart!.map((item) => ({ productId: item.productId, quantity: item.quantity }));

      const data = {
        delivery,
        orderItems: [...orderItems],
      };

      const response = await postOrders(data);
      const orderId = response.data;

      router.push("/bought");
    } catch (err) {
      console.log(err);
      alert("결제과정에 문제가 생겼습니다.");
    }
  };

  return (
    cart && (
      <PageWrapper>
        <form onSubmit={onClickPay}>
          <Script src="https://code.jquery.com/jquery-1.12.4.min.js" strategy="lazyOnload" />
          <Script src="https://cdn.iamport.kr/v1/iamport.js" strategy="lazyOnload" />
          <div className="mt-[64px] flex h-auto w-[1440px] flex-col px-[3%]">
            <p className="mb-[19px] text-texttitle  font-semibold text-primary">주문 목록</p>
            <div className="h-[1px] w-full border border-gray-border" />
            <div>
              {more ? (
                cart.map((product, index) => <BoughtElement item={product} key={index} />)
              ) : (
                <BoughtElement item={cart[0]} />
              )}
            </div>
            <p
              className="cursor-pointer text-center text-textmedium font-medium text-secondary"
              onClick={() => {
                setMore(!more);
              }}
            >
              {more ? "접기" : "더보기"}
            </p>
            <div className="mt-[97px] flex h-auto">
              <p className="text-texttitle font-semibold text-primary">받는 사람 정보</p>
              <input type="checkbox" className="mx-[10px]" checked={isChecked} onChange={handleCheckboxChange} />
              <div className="text-textmedium font-medium leading-[200%] text-secondary">구매자와 정보 동일</div>
            </div>
            <div className="my-[19px] h-[1px] w-full border border-gray-border" />
            <div>
              {/* 이름 구역 */}
              <div className="flex h-[33px] w-full flex-row items-center">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">이름</div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="이름을 입력하세요."
                  className="placeholder-grayborder h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
                />
              </div>
              {/* 전화번호 구역 */}
              <div className="mt-[19px] flex h-[33px] w-full flex-row items-center">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">전화번호</div>
                <input
                  type="text"
                  name="phoneNumber"
                  required
                  placeholder="전화번호를 입력하세요."
                  className="placeholder-grayborder h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
                />
              </div>
              {/* 주소 구역 */}
              <div className="mt-[19px] flex h-auto w-full flex-row">
                <div className="w-[11.8%] text-texttitle font-semibold text-primary">주소</div>
                <div className="w-[88.2%]">
                  <div>
                    <input
                      type="text"
                      disabled
                      required
                      name="zipcode"
                      value={zipcode}
                      className="placeholder-grayborder mb-[19px] mr-[17px] h-[26px] w-[100px] border border-gray-border text-center text-textmedium leading-[26px]"
                    />
                    <button
                      type="button"
                      onClick={onClickAddr}
                      className="placeholder-grayborder mb-[19px] h-[26px] w-[100px] border border-gray-border text-center text-textmedium"
                    >
                      <span className="text-textmedium font-medium leading-[26px] text-secondary">우편번호</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    disabled
                    required
                    name="address"
                    value={address}
                    onClick={onClickAddr}
                    placeholder="기본 주소가 입력됩니다."
                    className="placeholder-grayborder mb-[19px] h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
                  />
                  <input
                    type="text"
                    name="detailAddress"
                    value={detailAddress}
                    onChange={(e) => setdetailAddress(e.target.value)}
                    placeholder="나머지 주소를 입력하세요."
                    className="placeholder-grayborder mb-[19px] h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
                  />
                </div>
              </div>
              {/* 배송 구역 */}
              <div className="flex h-[33px] w-full flex-row items-center">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">배송 요청사항</div>
                <input
                  type="text"
                  name="request"
                  required
                  placeholder="배송 요청사항을 입력하세요."
                  className="placeholder-grayborder h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
                />
              </div>
            </div>
            <div className="mb-[47px] mt-[19px] h-[1px] w-full border border-gray-border" />
            {/* 결제 금액 출력 */}
            <p className="text-texttitle font-semibold text-primary">결제 금액</p>
            <div className="my-[19px] h-[1px] w-full border border-gray-border" />
            <div className="flex flex-col">
              <p className="mb-[19px] text-textmedium font-medium text-gray">
                상품 총 가격: {formatNumber(totalPrice(cart))}원
              </p>
              <p className="mb-[19px] text-textmedium font-medium text-gray">
                할인받은 금액: {formatNumber(totalDiscount(cart))}원
              </p>
              <p className="mb-[19px] text-textmedium font-medium text-gray">배송비: {formatNumber(box)}원</p>
              <p className="text-textbig font-bold text-gray">
                총 결제금액:{" "}
                <span className="text-price">{formatNumber(finalPrice(totalPrice(cart) - totalDiscount(cart)))}원</span>
              </p>
            </div>
            <div className="mb-[47px] mt-[19px] h-[1px] w-full border border-gray-border" />
            {/* 결제 방법 출력 */}
            <p className="text-texttitle font-semibold text-primary">결제 방법</p>
            <div className="my-[19px] h-[1px] w-full border border-gray-border" />
            <div className="flex">
              <input type="radio" name="pay" className="" value="kakao" onChange={handleChange} />
              <span className="ml-[7px] text-textmedium font-medium text-secondary">카카오페이</span>
              <input type="radio" name="pay" className="ml-[20px]" value="x" onChange={handleChange} />
              <span className="ml-[7px] text-textmedium font-medium text-secondary">무통장입금</span>
            </div>
            <div className="my-[19px] h-[1px] w-full border border-gray-border" />
          </div>
          <button
            type="submit"
            className="mb-[175px] h-[38px] w-[318px] cursor-pointer rounded-[12px] border border-none bg-primary text-center text-texttitle font-semibold text-white"
          >
            결제하기
          </button>
        </form>
      </PageWrapper>
    )
  );
};
export default BuyingComponent;
