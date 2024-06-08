export const isPhoneNumberValid = (phone) => {
  const phoneNumberPattern = /^(010-\d{4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
  return phoneNumberPattern.test(phone);
};

/*    if (!isPhoneNumberValid(data.phoneNumber)) {
  alert("전화번호 형식이 올바르지 않습니다. 올바른 형식: 010-1234-5678 또는 02-123-4567");
  return;
} */
