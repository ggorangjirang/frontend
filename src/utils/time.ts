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

//출력: Time (Korea): 19:42:31

export function formatTime(dateString: string) {
  // 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 한국 시간으로 변환 (UTC+9)
  let koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const koreaIsoDateString = koreaDate.toISOString().slice(0, 19); // 초까지만 포함, 밀리초 제거

  // ISO 문자열을 분리하여 날짜와 시간 추출
  const timePart = koreaIsoDateString.split("T")[1];
  // 원하는 형식으로 변환

  return timePart;
}
