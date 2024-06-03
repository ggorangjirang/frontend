import { API_URLS } from "@/constants/apiUrlConfig";
import { getFetch } from "../common";

export type Category = {
  subcategoryId: 0;
  subcategoryName: "string";
  categoryId: 0;
  categoryName: "string";
};

export type subCategoriesRes = Category[];

export const getSubCategories = async (): Promise<subCategoriesRes> => {
  return getFetch(`${API_URLS.subcategories}`);
};
