searchbuttom.addEventListener('click',async function(e){
  // ページの更新を防ぐ
  e.preventDefault();

  // 検索ボックスの値を取得
  const searchkey=document.querySelector(".searchkey").value;
  
  // ローカルDBに検索に必要なクエリを作成
  const temp = {
    "title":searchkey,
    "tag":gettags(times)
  };

  // JSON形式に変換
  // config = JSON.stringify(temp);
  // alert(config);

  // 検索に合致するローカルデータを取得
  const reslocal= await axios.get(`http://localhost:4567/memos?title=${searchkey}&tag=${gettags(times)}`,config)
  const memos = reslocal.data;

  let memos_array = [];
  if( 0 < memos.length) {
    for(const memo of memos) {
      const posted_at = document.createTextNode(memo.posted_at);
      const title = document.createTextNode(memo.title_name);
      let p_posted_at = document.createElement('p');
      p_posted_at.appendChild(posted_at);
      let p_title = document.createElement('p');
      p_title.appendChild(title);
      const div = document.createElement('div');
      div.setAttribute('class', 'memo');
      div.appendChild(p_posted_at);
      div.appendChild(p_title);
      memos_array.push(div);
    }
  }

  const container =document.querySelector('.container');
  memos_array.forEach(memo => {
    container.appendChild(memo);
  });

});