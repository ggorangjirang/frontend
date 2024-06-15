// "use client";

// import { useEffect, useState } from "react";

// type Props<T> = {
//   key: string;
//   initialValue: T;
// };

// const useLocalStorage = <T>({ key, initialValue }: Props<T>) => {
//   //상태를 값에 저장한다.
//   // 로직이 한번만 실행되도록 initialState FUNC를 useState에 전달
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }

//     try {
//       const item = window.localStorage.getItem(key);

//       return item ? item : initialValue;
//     } catch (error) {
//       console.log(error);

//       return initialValue;
//     }
//   });

//   const setValue = (value: T | ((val: T) => T)) => {
//     try {
//       //storedValue가 초기 실행 로직 함수인 경우 위 로직을 거친 initialValue 저장
//       //아닐경우 값 저장
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore); // 입력된 값으로 교체

//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, valueToStore as string);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [hasMounted, setHasMounted] = useState(false);

//   //마운트되면 코드 true로 설정
//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   if (hasMounted) return [storedValue, setValue] as const;

//   return [initialValue, setValue] as const;
// };

// export default useLocalStorage;
