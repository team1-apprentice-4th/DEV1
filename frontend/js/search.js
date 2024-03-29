searchbuttom.addEventListener('click',async function(e){
  // ページの更新を防ぐ
  e.preventDefault();

  // 検索ボックスの値を取得
  const searchkey=document.querySelector(".searchkey").value;
  const search_query = searchkey.split(' ');

  // ローカルDBに検索に必要なクエリを作成
  const temp = {
    "title":search_query,
    "tag":gettags(times)
  };

  //　JSON形式に変換
  config = JSON.stringify(temp);
  alert(config)
  const reslocal= await axios.get('http://localhost:4567/memos',config)
  
});