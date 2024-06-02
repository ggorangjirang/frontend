import { API_URLS } from "@/constants/apiUrlConfig";
import { getFetch } from "../common";

export type Review = {
  reviewId: number;
  title: "string";
  content: "string";
  imageUrl: "string";
  emailResponse: "string";
  createdAt: string;
};

export type Product = {
  productId: number;
  name: string;
  discountRate: number;
  discountedPrice: number;
  price: number;
  imageUrl: string;
  stock: number;
};

export type PropductDetail = {
  productImageUrl: string;
  expirationDate: null | string;
  subcategoryName: string;
  categoryName: string;
  description: string;
  descriptionImageUrl: string | null;
  soldOut: boolean;
} & Product;

type Pagable = {
  offset: number;
  sort: Sort[];
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

type Sort = {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
};

type getProductListRequest = {
  page?: number;
  size?: number;
};

export type getProductListResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Product[];
  number: number;
  pagable: Pagable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type getReviewByProductIdRes = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Review[];
  number: number;
  pagable: Pagable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type getProductListRandomResponse = {};

//선착순 한정세일 api
export const getProductListLimitedSaleRandom = async (data?: getProductListRequest): Promise<Product[]> => {
  return getFetch(`${API_URLS.products}/limited-sale/random`);
};

//인기상품 api
export const getProductListBestSellingRandom = async (data?: getProductListRequest): Promise<Product[]> => {
  return getFetch(`${API_URLS.products}/best-selling/random`);
};

//상품 상세
export const getProduct = async (productId: string): Promise<PropductDetail> => {
  return getFetch(`${API_URLS.products}/${productId}`);
};

//상품 리뷰가져오기
export const getProductReview = async (productId: string, page: number = 0, size: number = 3): Promise<Review[]> => {
  const data = await getFetch(`${API_URLS.products}/${productId}/reviews?page=${page}&size=${size}`);
  const { content } = data;
  return content;
};
