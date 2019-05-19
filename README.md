    * 본 설치과정에는 Git과 NodeJS가 필요합니다. (npm 사용)
    [NodeJS 다운로드]
    https://nodejs.org/ko/download/ 또는 https://downloads.nodesource.com/

    * Chrome에서 개발, 테스트 되었습니다. 가능하면 Chrome에서 이용해주세요

# 1. github 클론

원하는 디렉토리로 이동한 뒤에

    $ git clone https://github.com/Hong-Ki/todo-list.git [project-name]

를 입력해 주세요. [project-name] 대신 원하는 프로젝트명을 넣으시면 됩니다. 입력하지 않으면 기본 폴더 명인 todo-list로 생성됩니다.

# 2. 프로젝트로 이동 & 의존 라이브러리 설치

프로젝트로 이동한 후 의존 라이브러리들을 설치해 주세요.
npm 이나 yarn 중 편하신 걸로 쓰시면 됩니다.

(npm은 npm install 으로, yarn은 yarn 으로 입력)

    $ cd todo-list
    $ npm install || yarn install

# 3. 프로젝트 빌드 및 서버 실행

- create-react-app이 설치 yarn start 또는 npm start를 입력하면, 개발용 서버에서 실행되며, 자동으로 브라우저가 실행됩니다.

npm 사용자라면,

    npm run server

yarn 사용자라면,

    yarn run server

을 입력해 주세요.

# 4. 브라우저 접속

서버가 정상적으로 올라갔다면 아래와 같은 메시지가 보입니다.

    ┌───────────────────────────────────────────────────┐
    │                                                   │
    │   Serving!                                        │
    │                                                   │
    │   - Local:            http://localhost:5000       │
    │   - On Your Network:  http://***.***.***:5000     │
    │                                                   │
    │   Copied local address to clipboard!              │
    │                                                   │
    └───────────────────────────────────────────────────┘

기본 포트는 5000으로 되어있습니다.
브라우저를 실행시키신 후에(Chrome 권장) http://localhost:5000 으로 접속하시면 TodoList를 사용하실 수 있습니다.
