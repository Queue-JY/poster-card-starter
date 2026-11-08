# 포스터 카드

나만의 카드를 만들어서 배포하고 서로 방문하면서 반응을 남긴 후 미션 숫자를 모으면 됩니다.

---

## 0. 준비물

- Node.js ([nodejs.org](https://nodejs.org) → LTS 버전)
- GitHub 계정
- Vercel 계정 (GitHub으로 가입)
- 포스터 이미지 1장 — 세로 2:3, 800×1200px 권장, 2MB 이하
- 당일 배정받은 **자리 번호**

### Node.js 있는지 먼저 확인하세요

이미 깔려 있을 가능성이 높아요. VS Code를 열고 `` Ctrl + ` `` (백틱, 숫자 1 왼쪽) 를 눌러 터미널을 띄운 다음:

```bash
node -v
npm -v
```

`v22.1.0` / `10.7.0` 처럼 버전이 나오면 준비 끝입니다. 숫자만 다르면 괜찮아요.

`command not found` 가 나오면 [nodejs.org](https://nodejs.org) 에서 **LTS** 버튼을 눌러 받고 설치 마법사에서 계속 다음을 누르면 됩니다. `npm` 은 같이 들어오니 따로 설치할 필요 없어요. 설치 후에는 VS Code를 껐다 켜야 인식됩니다.

---

## 1. 내 저장소로 가져오기

### 1-1. 템플릿 복사

제가 디스코드에 공유해드린 GitHub 링크로 들어가서 위쪽 초록색 **Use this template** → **Create a new repository**

이름은 아무거나 괜찮아요. **Public** 으로 두세요. **Create repository** 누르면 내 계정에 복사본이 생깁니다.

> Fork 말고 꼭 **Use this template** 이어야 해요. Vercel은 내가 소유한 저장소만 연결할 수 있어서 남의 저장소에 협업자로 들어가 있으면 배포가 안 됩니다.

### 1-2. 주소 복사

새로 생긴 내 저장소에서 초록색 **Code** → **HTTPS** → 복사 아이콘.

`https://github.com/내계정/내저장소이름.git` 이런 형태예요.

### 1-3. 내 컴퓨터로 내려받기

VS Code를 열고 터미널(`` Ctrl + ` ``)에서 프로젝트를 둘 폴더로 이동한 다음, 아까 복사한 주소로 clone 합니다.

```bash
cd ~/Downloads          # 원하는 위치로
git clone 복사한주소
```

받아지면 그 자리에 내가 정한 이름으로 폴더가 생겨요. **File → Open Folder** 로 그 폴더를 여세요.

폴더를 열고 나면 터미널을 다시 열어주세요(`` Ctrl + ` ``). 이제 터미널 위치가 프로젝트 안으로 맞춰져서 앞으로는 `cd` 할 필요가 없습니다.

> 만약 **git이 없다고 나오면** — 맥은 터미널에 `git --version` 치면 설치 안내창이 뜨고 윈도우는 [git-scm.com](https://git-scm.com) 에서 받으면 됩니다. 설치 후 VS Code 재시작.

> 아니겠지만 **처음 git을 쓰는 거라면** 한 번만 설정해두세요.
> ```bash
> git config --global user.name "내이름"
> git config --global user.email "깃허브에 등록한 이메일"
> ```

### 1-4. 실행해보기

VS Code 터미널(`` Ctrl + ` ``)에서:

```bash
npm install     # 처음 한 번만, 1~2분 걸려요
npm run dev
```

터미널에 뜨는 `http://localhost:5173` 을 `Ctrl` 누른 채 클릭하면 브라우저가 열려요. **POSTER** 라고 적힌 회색 카드가 보이면 성공입니다.

---

## 2. 먼저 배포부터

**아직 코드는 안 고칩니다.** 내 주소부터 만들어놓고 시작할 거예요.

1. [vercel.com](https://vercel.com) → **Continue with GitHub** 으로 로그인
2. 우측 상단 **Create New... → Project**
3. 저장소 목록에서 내 저장소를 찾아 **Import**
4. **Application Preset이 Vite** 인지만 확인하고 (나머지는 건드릴 필요 없어요)
5. **Create Project**

저장소 목록이 비어 있거나 내 저장소가 안 보이면 **Install GitHub App** 또는 **Adjust GitHub App Permissions** 눌러서 **All repositories** 로 바꿔주세요.

30초~1분 지나면 `https://내프로젝트.vercel.app` 주소가 생깁니다.

### 휴대폰으로 확인해보기

휴대폰 브라우저에 두 주소를 차례로 쳐보세요.

| 주소 | 결과 |
|---|---|
| `localhost:5173` | **안 열림** — 내 노트북 안에서만 도는 주소라서 |
| `내프로젝트.vercel.app` | **열림** — 인터넷 서버에 올라가 있으니까 |

이게 '배포했다'의 의미예요.

---

## 3. 내 카드로 바꾸기

고칠 곳은 **딱 두 군데**입니다. 어디인지는 직접 찾아보세요.

<details>
<summary>찾아도 안 보이면 열어보기</summary>

- `src/config.js`
- `public/` 폴더

</details>

### 3-1. 이미지 넣기

`public/` 안에 있는 `poster.jpg` 는 그냥 두고 내 이미지를 **하나 더 추가**하면 됩니다. VS Code 왼쪽 파일 목록의 `public` 폴더에 이미지를 **끌어다 놓으면** 돼요.

```
public/
├── poster.jpg          ← 원래 있던 것, 그대로 둠
└── usagi.jpg        ← 내가 추가한 것
```

그리고 설정 파일에서 어느 쪽을 쓸지 바꿔주세요.

```js
image: "/usagi.jpg",   // 내가 넣은 파일명으로
```

### 3-2. 꼭 지킬 것

| 항목 | 규칙 |
|---|---|
| `id` | 본인 영문 이름, 소문자, 띄어쓰기 없이 — **남과 겹치면 카드가 목록에 안 떠요** |
| `number` | 당일 배정받은 자리 번호 그대로 |
| 이미지 파일명 | **영문으로** (한글은 배포 후 깨집니다) |
| 이미지 경로 | 앞에 슬래시 필수 → `/poster.jpg` |

다 고쳤으면 `npm run dev` 로 확인하고 넘어가세요. 이때 화면 위쪽에 주황색으로 "지금은 로컬 미리보기예요…" 가 뜹니다. **정상이에요.**

---

## 4. git push 하면 끝

VS Code 터미널에서:

```bash
git add .
git commit -m "내 카드로 변경"
git push
```

Vercel에 다시 들어갈 필요 없어요. push하면 알아서 다시 배포됩니다.

30초쯤 뒤에 배포 주소를 새로고침해보세요. Vercel 프로젝트의 **Deployments** 탭에 기록이 한 줄 더 쌓여 있을 거예요.

Vercel이 내 저장소를 계속 보고 있다가 새 코드가 올라오면 자동으로 빌드하고 다시 배포해주는 구조예요. 팀 프로젝트에서 이게 꽤 편한데 누가 언제 push하든 배포된 사이트가 항상 최신이라 배포 담당자를 따로 둘 필요가 없거든요.

---

## 5. 다른 사람 카드는 어떻게 보이는 걸까?

내 사이트 아래쪽에 다른 사람 카드가 떠 있을 거예요. 링크를 주고받은 적도 없는데 어떻게 된 걸까요?

우리 사이트는 13개지만 **바라보는 데이터베이스는 하나**예요. 사이트가 처음 열릴 때 자기 정보를 거기에 보내는데 이때 주소를 `window.location.origin` 으로 넣습니다. 지금 이 페이지가 열려 있는 주소라는 뜻이에요.

| 어디서 열었나 | 동작 |
|---|---|
| 내 노트북 (`npm run dev`) | 등록 **안 함** — 주황색 안내만 뜸 |
| 배포된 사이트 | `https://내프로젝트.vercel.app` 으로 등록 |

로컬에서 등록을 안 하는 이유가 있어요. 만약 `http://localhost:5173` 이 저장되면 다른 사람이 내 카드를 눌렀을 때 **자기 노트북 주소로 가버립니다.** 그래서 로컬에서는 아예 기록하지 않게 막아뒀어요.

> ⚠️ 그래서 **배포한 주소를 직접 한 번 열어야** 내 카드가 다른 사람들 목록에 나타나요. `npm run dev` 로만 확인하고 끝내면 아무에게도 안 보입니다.

링크를 주고받지 않아도 되는 게 이 구조의 핵심이에요. 각자 자기 주소를 자기가 기록하니까요.

화면에는 내 것만 빼고 **번호순으로 전부** 보여줍니다. 13명이 다 배포하면 12개가 1번부터 쭉 깔려요. 미션 카드에 적힌 번호를 바로 찾을 수 있게 하려고 번호순으로 정렬해뒀어요.

> 아직 배포한 사람이 적으면 몇 개만 보입니다. 시간이 지나면서 하나씩 늘어나요.

더 자세한 건 노션에 적어뒀습니다. 정적 사이트인데 어떻게 데이터가 저장되는지, 코드에 키가 그대로 있는데 왜 괜찮은지 같은 내용입니다.

---

## 6. 미션

디스코드에 **자리 번호별 방문 순서**를 올려둘게요.

하단 목록의 카드를 눌러 그 사이트로 이동해서 카드 아래 **반응 버튼**을 누르면 숫자가 하나 나타납니다. 순서대로 반복해서 하단에 나타난 숫자 네 자리를 모아서 디스코드 14기_전체_잡담에 정답을 올려주시면 됩니다.

---

## 7. (보너스) 빌드 없이 배포해보기 — GitHub Pages

시간 남으면 해보세요. **빌드 과정이 없는 배포**는 어떤 건지 비교해볼 수 있어요.

### 7-1. HTML 파일 하나 만들기

아무 폴더에나 `index.html` 을 만들고 이렇게 적습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>내 첫 페이지</title>
    <style>
      body {
        font-family: sans-serif;
        display: grid;
        place-items: center;
        height: 100vh;
        margin: 0;
        background: #f7f3ea;
      }
      h1 { font-size: 48px; margin: 0; }
      p  { color: #6b6355; }
    </style>
  </head>
  <body>
    <div>
      <h1>안녕하세요 👋</h1>
      <p>빌드 없이 배포한 페이지입니다.</p>
    </div>
  </body>
</html>
```

### 7-2. 새 저장소에 올리기

GitHub에서 새 저장소를 만들고 (`hello-page` 같은 이름으로, **Public**), 터미널에서:

```bash
cd 폴더위치
git init
git add .
git commit -m "first page"
git branch -M main
git remote add origin https://github.com/내계정/hello-page.git
git push -u origin main
```

### 7-3. Pages 켜기

저장소 → **Settings** → 왼쪽 메뉴 **Pages** 에서 Source를 **Deploy from a branch**, Branch를 **main / (root)** 로 두고 **Save**.

1~2분 기다리면 주소가 나옵니다.

```
https://내계정.github.io/hello-page/
```

### 무엇이 달랐나요?

| | Vercel + Vite | GitHub Pages |
|---|---|---|
| 빌드 | `npm run build` → `dist` 생성 | **없음** |
| 올라가는 것 | 빌드 결과물 | 내가 쓴 파일 그대로 |
| 설치 | npm 필요 | 아무것도 필요 없음 |
| 적합한 것 | React·Vite 프로젝트 | 순수 HTML·CSS·JS |

포스터 카드는 React로 만들어서 브라우저가 바로 못 읽어요. 그래서 `npm run build` 로 한 번 변환해야 하고 Vercel이 그걸 대신 해준 겁니다. 반면 이 HTML 파일은 브라우저가 그대로 읽을 수 있으니 변환할 게 없죠.

Vercel 설정 화면에 있던 Build Command 칸이 바로 이 차이예요.

---

## 과제

1. 커스텀 기능 하나 추가하기 (hover 효과 / 다크모드 / 애니메이션 자유)
2. `git push` 해서 다시 배포
3. Vercel **Deployments** 탭을 **날짜가 보이게** 캡처해서 제출