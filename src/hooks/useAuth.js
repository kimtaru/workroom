import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//토큰 값 유무에 따라 페이지 분기

export default function useAuth(hasToken) {
  const token = useSelector((state) => state.user.token);

  const history = useHistory();

  if (hasToken) {
    if (token === null) {
      history.push('/auth/login');
    } //true 일 경우 토큰의 유무를 검사, 토큰이 없으면 로그인화면으로 이동시키기
  } else {
    if (token !== null) {
      history.push('/');
    }
    // false일 경우 토큰의 유무를 검사 토큰이 있으면 메인화면으로 이동 시키기(로그인화면에 적용하기)
  }
}
