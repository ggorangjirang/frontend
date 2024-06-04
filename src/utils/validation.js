export const isPhoneNumberValid = (phone) => {
  const phoneNumberPattern = /^(010-\d{4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
  return phoneNumberPattern.test(phone);
};
