# World News Aggregator

검색어와 설정된 언론사를 바탕으로 뉴스 리스트를 보여주는 뉴스 검색 어플리케이션입니다.

<img src="./vanilla-world-news.gif" alt="example">

## Setup

Install dependencies

```sh
$ yarn install (or npm install)
```

## Development

```sh
$ yarn start (or npm start)
# visit http://localhost:3000
```

## Skills
- React
- Axios
- Scss

## Features

1. 검색어를 입력할 수 있는 검색창이 있습니다.
2. 검색기간을 설정할 수 있습니다.
3. 검색을 원하는 소스를 선택할 수 있습니다. (다중 선택 가능, 최대 20개)
4. 홈 화면에서는 최신 뉴스를 볼 수 있습니다.
5. 홈 화면의 카테고리를 선택하면 카테고리별 최신 뉴스를 볼 수 있습니다.
6. 검색하는 동안에는 로딩 아이콘이 보입니다.
7. 검색 결과는 인기 순으로 정렬됩니다.
8. 검색 결과는 30개씩 보여지며, 무한 스크롤 형식으로 내용이 추가됩니다.
9. 검색 결과는 카드 형식 / 리스트 형식 중에 선택할 수 있습니다.
10. 검색 결과를 클릭하면 세부 내용이 담긴 모달창이 보여집니다.
11. 모달 창 내 '+more' 부분을 클릭하면 해당 뉴스 url로 이동합니다.
12. 모달 바깥 부분을 클릭하면 모달은 사라집니다.
13. API는 [News API](https://newsapi.org/)를 사용했습니다.
