import { API_URLS } from "@/constants/apiUrlConfig";
import { getFetch } from "../common";

export type Category = {
  categoryId: number;
  categoryName: string;
  subcategoryId: number;
  subcategoryName: string;
};

export type CategoryItem = {
  categoryId: number;
  categoryName: string;
};

export type SubCategoryItem = {
  subCategoryId: number;
  subCategoryName: string;
};

export type Categories = {
  main: CategoryItem[];
  sub: SubCategoryItem[];
};

export type subCategoriesRes = Category[];

export const getSubCategories = async (): Promise<Categories[]> => {
  const categoriesData: Category[] = await getFetch(`${API_URLS.subcategories}`);
  const rebuildedCategories: Array<Categories> = [];

  //set으로 중복되는 main 뽑음
  const main = new Set();

  //mainCategoryId 만 추출
  categoriesData?.map((category) => {
    main.add(category.categoryId);
  });

  //main,sub 형태로 카테고리를 결합하는 코드
  main.forEach((categoryId) => {
    const data = categoriesData?.filter((category) => category.categoryId === categoryId);

    const mainData = data?.map((category) => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
    }));
    const subData = data?.map((category) => {
      return { subCategoryId: category.subcategoryId, subCategoryName: category.subcategoryName };
    });

    rebuildedCategories.push({
      main: mainData,
      sub: subData,
    });
  });

  return rebuildedCategories;
};
