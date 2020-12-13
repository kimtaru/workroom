export function checkEmail(email) {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (regExp.test(email)) {
    return true;
  } else {
    return false;
  }
}

export function checkPwd(pwd) {
  const num = pwd.search(/[0-9]/g);
  const eng = pwd.search(/[a-z]/gi);
  if (pwd.length < 8) {
    return false; //8자리 이상인지
  } else if (pwd.search(/\s/) !== -1) {
    return false; //공백이 있는지
  } else if (num < 0 || eng < 0) {
    return false; //영문, 숫자 혼합되었는지
  } else {
    return true;
  }
}

/*
   6자리 인증키 생성 
  */
export function generateKey() {
  function random(n1, n2) {
    return parseInt(Math.random() * (n2 - n1 + 1)) + n1;
  }
  let value = '';
  for (let i = 0; i < 6; i++) {
    value += random(0, 9);
  }
  return value;
}
