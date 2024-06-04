import { API_URLS } from "@/constants/apiUrlConfig";
import { getFetch } from "../common";

export interface Product {
  productId: number;
  name: string;
  discountRate: number;
  discountedPrice: number;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface PropductDetail extends Product {
  productImageUrl: string;
  expirationDate: null | string;
  subcategoryName: string;
  categoryName: string;
  description: string;
  descriptionImageUrl: string | null;
  soldOut: boolean;
}

interface Pagable {
  offset: number;
  sort: Sort[];
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface getProductListRequest {
  page?: number;
  size?: number;
}

export interface getProductListResponse {
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
}

export interface getProductListRandomResponse {}

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
