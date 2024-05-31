/**
 * [formatDate]
 * YYYY-MM-DD => YYYY년 MM월 DD일 형식으로 변환합니다.
 *
 *  @param dateString 'YYYY-MM-DD` 형식을 사용하세요
 *
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const isoDateString = date.toISOString();

  // YYYY-MM-ddTHH:mm:ss.sssZ 형식에서 원하는 부분 추출
  const year = isoDateString.substring(0, 4);
  const month = isoDateString.substring(5, 7);
  const day = isoDateString.substring(8, 10);

  // YYYY년 M월 dd일 형식으로 반환
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

const inputDateString = "2024-12-31";
const formattedDateString = formatDate(inputDateString);
console.log(formattedDateString); // 출력: "2024년 12월 31일"
