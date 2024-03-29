searchbuttom.addEventListener('click',async function(e){
  // ページの更新を防ぐ
  e.preventDefault();

  // 検索ボックスの値を取得
  const searchkey=document.querySelector(".searchkey").value;
  console.log(searchkey);

  // ローカルDBに検索に必要なクエリを作成
  const temp = {
    "title":searchkey,
    "tag":gettags(times)
  };

  // JSON形式に変換
  config = JSON.stringify(temp);
  alert(config)
  const reslocal= await axios.get('http://localhost:4567/memos',config)
  const memos = reslocal.data;

  let memos_array = [];
  if( 0 < memos.length) {
    for(const memo of memos) {
      console.log(memo);
      const posted_at = document.createTextNode(memo.posted_at);
      const title = document.createTextNode(memo.title_name);
      let p_element = document.createElement('p');
      p_element.appendChild(posted_at);
      let p_tag = document.createElement('p');
      p_tag.appendChild(title);
      const div = document.createElement('div');
      div.setAttribute('class', 'memo');
      div.appendChild(p_element);
      div.appendChild(p_tag);
      memos_array.push(div);
      console.log(div);
    }
  }

  const container =document.querySelector('.container');
  memos_array.forEach(memo => {
    container.appendChild(memo);
  });

});