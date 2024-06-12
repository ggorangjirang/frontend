import { API_URLS } from "@/constants/apiUrlConfig";
import { getFetch } from "../common";

export type Review = {
  reviewId: number;
  title: string;
  content: string;
  imageUrl: string;
  emailResponse: string;
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

export type ProductDetail = {
  productImageUrl: string;
  expirationDate: null | string;
  subcategoryName: string;
  categoryName: string;
  description: string;
  descriptionImageUrl: string | null;
  soldOut: boolean;
} & Product;

export type Pageable = {
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

export type getProductListResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Product[];
  number: number;
  pageable: Pageable;
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
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type getProductListRandomResponse = {};

//선착순 한정세일 api
export const getProductListLimitedSaleRandom = async (): Promise<Product[]> => {
  return getFetch(`${API_URLS.products}/limited-sale/random`);
};

//인기상품 api
export const getProductListBestSellingRandom = async (): Promise<Product[]> => {
  return getFetch(`${API_URLS.products}/best-selling/random`);
};

//상품 상세
export const getProduct = async (productId: string): Promise<ProductDetail> => {
  return getFetch(`${API_URLS.products}/${productId}`);
};

//상품 리뷰가져오기
export const getProductReview = async (productId: string, page: number = 0, size: number = 3): Promise<Review[]> => {
  const data = await getFetch(`${API_URLS.products}/${productId}/reviews?page=${page}&size=${size}`);
  const { content } = data;
  return content;
};

//메인 카테고리 상품 리스트
export const getMainProductList = async (
  categoryId: string,
  page: number = 0,
  size: number = 16
): Promise<getProductListResponse> => {
  return getFetch(`${API_URLS.products}/category/${categoryId}?page=${page}&size=${size}`);
};

//서브 카테고리 상품 리스트
export const getSubProductList = async (
  subCategoryId: string,
  page: number = 0,
  size: number = 16
): Promise<getProductListResponse> => {
  return getFetch(`${API_URLS.products}/subcategory/${subCategoryId}?page=${page}&size=${size}`);
};
