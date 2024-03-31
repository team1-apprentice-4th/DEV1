// チェックが入ったカテゴリー情報を取得
function get_checked_category (){
  // 追加されたカテゴリーを含める
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

  // ローカルDBに検索に必要なクエリを作成
  const temp = {
    "error":error,
    "category":get_checked_category(),
    "detail":detail,
    "solution":solution,
  };
  // // JSON形式に変換
  config = JSON.stringify(temp);
  try {

    const reslocal = await axios.post('http://localhost:4567/memos', config);

    alert('保存完了しました');
    // 画面遷移
    window.location.href = 'index.html';
  } catch (error) {

    console.error('保存に失敗しました:', error);
    alert('保存に失敗しました');
  }
});
