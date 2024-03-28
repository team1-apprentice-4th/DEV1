const postbuttom=document.querySelector("button");
let checkboxes = document.querySelectorAll("input[name=category]");
let checkedboxes = document.querySelectorAll("input[name=category]:checked");

// チェックが入ったチェックボックスを取得
function getcheckedboxes (){
  // 追加されたチェックボックスを含める
  let checkboxes = document.querySelectorAll("input[name=category]");
  let checked_category = [];
  if( 0 < checkboxes.length) {
    for(const element of checkboxes) {
      if(element.checked) {
        checked_category.push(element.id);
      }
    }
    return checked_category;
  }
}

postbuttom.addEventListener('click',async function(e){
  // ページの更新を防ぐ
  e.preventDefault();
  // フォームの値を取得
  const error = document.querySelector("#error").value;
  const detail = document.querySelector("#detail").value;
  const solution = document.querySelector("#solution").value;

  // ローカルDBに検索に必要なクエリを作成
  const temp = {
    "error":error,
    "category":getcheckedboxes(),
    "detail":detail,
    "solution":solution
  };
  // // JSON形式に変換
  config = JSON.stringify(temp);
  alert(config)
  const reslocal= await axios.post('http://localhost:4567/search',config)
  
});
