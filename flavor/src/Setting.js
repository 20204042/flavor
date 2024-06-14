import { Link } from 'react-router-dom';

const Setting = () => {
  return (
    <div>
      <style>
        {`
          .flavor_logo {
            display: block;
            margin: 0 auto;
            margin-top: -10px;
          }

          .setting-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }

          /* 섹션 타이틀 스타일 */
          .title {
            font-size: 35px;
            margin-bottom: 20px;
            font-weight: bold;
            margin-top: -10px;
          }

          h2 {
            margin-bottom: 10px;
          }

          /* 각 섹션 스타일 */
          section {
            margin-bottom: 30px;
          }

          /* 질문 스타일 */
          p {
            margin-bottom: 3px;
          }

          /* 답변 스타일 */
          p strong {
            color: #ff6480; /* 파란색, 혹은 선택한 색상으로 변경 가능 */
            font-weight: bold;
          }

          /* 링크 스타일 */
          a {
            color: #ffb4bc; /* 초록색, 혹은 선택한 색상으로 변경 가능 */
            text-decoration: none;
            font-weight: bold;
            margin-left: 10px;
          }

          a:hover {
            text-decoration: underline;
          }

        `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      <div className="setting-container">
        <div className="title">도움말 및 지원</div>

        <section>
          <h2>자주 묻는 질문 (FAQ)</h2>
          <p><strong>Q: FLAVOR는 무엇을 의미하나요?</strong></p>
          <p>A: FLAVOR는 '맛'을 의미합니다. 또한, '멋'이라는 뜻도 있어서, 우리는 사용자들에게 다양하고 특별한 맛집을 소개함으로써 그들이 특별한 경험과 멋진 맛을 찾을 수 있도록 돕고자 합니다.</p>
          <br />
          <p><strong>Q: 왜 FLAVOR 웹사이트를 만들었나요?</strong></p>
          <p>A: FLAVOR는 사용자들이 다양한 음식을 탐험하고 맛집을 발견하는 데 도움을 주기 위해 만들어졌습니다. 우리는 지루한 일상에서 벗어나 새로운 맛과 경험을 찾고자 하는 이들을 위해 다양한 맛집 정보를 제공하고, 더 나은 식사 경험을 만들기 위해 노력하고 있습니다.</p>
          <br />
          <p><strong>Q: FLAVOR에서 어떤 서비스를 제공하나요?</strong></p>
          <p>A: 주요 서비스로는 맛집 추천, 음식 리뷰, 그리고 특별한 게임 등을 통해 새로운 맛과 경험을 찾을 수 있습니다. 뿐만 아니라, 웹사이트의 커뮤니티에 참여하여 다른 음식 애호가들과 소통하며 솔직한 의견을 공유할 수 있습니다.</p>
        </section>

        <section>
          <h2>피드백 제공</h2>
          <p>웹사이트에 대한 피드백이나 개선 제안이 있으면 언제든지 알려주세요. 소중한 의견을 기다립니다.</p>
          <a href="/suggestlist/createpostforms">피드백 제공하기</a>
        </section>

        <p>버전: 1.0.0</p>
        <p>&copy; 2023 맛집 추천 웹사이트 FLAVOR. 모든 권리 보유됨.</p>
      </div>
    </div>
  );
};

export default Setting;
