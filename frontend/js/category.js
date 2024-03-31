// 該当のカテゴリーがなかった場合に追加する

// カテゴリーに追加するボタンが押されたらイベント発火
const addCategory = document.getElementById('add_category');
addCategory.addEventListener('click', function(event){
  event.preventDefault();

  // フォームに入力された値を取得
  const additional = document.getElementById('additional');
  const additional_category = additional.value;

  // フォームに入力された値をテキストノードに格納
  let new_category = document.createTextNode(additional_category);

  // カテゴリー欄の最後尾にチェックボックスの要素ノードを用意
  const fieldset = document.querySelector('fieldset');
  let label = document.createElement('label');
  label.setAttribute("for", new_category.textContent);
  let input = document.createElement('input');
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "category");
  input.setAttribute("id", new_category.textContent);

  // カテゴリー欄の最後尾に追加のチェックボックスを設置
  label.appendChild(input);
  label.appendChild(new_category);
  fieldset.appendChild(label);
})
