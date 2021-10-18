import * as S from './styles';

function Header({ isShowSidebar, setIsShowSidebar }) {
  return (
    <S.Header>
      <S.Button onClick={() => setIsShowSidebar(!isShowSidebar)}>
        Show/Hide
      </S.Button>
      Header
    </S.Header>
  );
}

export default Header;
