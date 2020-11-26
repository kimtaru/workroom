// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// //토큰 값 유무에 따라 페이지 분기

// export default function useAuth(hasToken) {
//   const token = useSelector(
//     (state) => state.userLogin.token,
//   );

//   const history = useHistory();

//   if (hasToken) {
//     if (token === null) {
//       history.push('/login');
//     }
//   } else {
//     if (token !== null) {
//       history.push('/');
//     }
//   }
// }
