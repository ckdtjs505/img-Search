import Modal from "./modal";

export default class SearchImg {
  constructor(ele, modal, data) {
    this.ele = ele;
    this.modal = modal;
    this.data = data;

    this.render();
    this.bindEventDefault();
  }

  bindEventDefault() {
    // 2020-03-20 모든 img에 클릭시 modal이 나오게 구현하고 싶었는데..
    // 그러기 위해서는 생성자에서 생성한 this.data에 접근해야하는데
    // this가 이벤트가 발생한 지점을 가리키다 보니 this.data값이 없다고 한다.
    // api에서 불러왔던 데이터를 재사용 하고싶은데ㅠ
    // 어떻게 다시 바꿀지 생각해보자.

    // 2020-03-22 api를 재사용하는 방법으로 화살표 함수를 이용하면 된다. 이유 알기
    // modal data를 쉽게 변겅하는 방법을 고민해보자

    // 2020-03-28[토]
    // 기존 img에 동일한 event가 여러번 달리는 오류 해결..
    this.data.results.forEach(ele => {
      // querySelector의 경우 id의 값이 숫자로 시작하는 값을 불러 올 수 없다.
      // 따라서 querySelector => getElementById로 값을 변경 했다.
      const img = document.getElementById(ele.id);
      img.addEventListener("click", () => {
        new Modal(this.ele, this.modal, ele);
      });
    });
  }

  render() {
    this.$resultSearchBox = document.querySelector(".resultImg");
    // 2020-03-19 검색결과를 .result Img에 덮어쓰고 싶었는데..
    // append를 하면 덮어쓰기 보다는 추가가 되었다.
    // szHtml을 만들어서 안에 있는 html을 덮었느는 형식으로 바꿨다.
    // 내가 원하는 모형은 아닌데 ㅠㅠ 이게 맞는지 모르겠다

    // 2020-03-25[화]
    // 무한 스크롤을 위해 append로 변경
    // 왜 이전에 내가 계속 덮어쓰기를 고집했는지 이해가 되지 않는다.

    // 2020-03-26[수]
    // 내가 왜 덮어쓰기를 고집했는지 기억났다. ㅋㅋㅋ
    // 새로 검색했을씨 아래에 계속 append 되는 문제가 있었다.
    // 이러한 문제를 해결하기 위해. 새로검색할때마다 .reseltImg div를 지웠다.

    this.data.results.forEach(ele => {
      const { id, urls } = ele;
      const $li = document.createElement("li");
      $li.innerHTML = `
          <img src="${urls.thumb}" id="${id}" class="img" > </img>
        `;
      this.$resultSearchBox.append($li);
    });
  }
}
