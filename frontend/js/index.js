const searchbuttom=document.querySelector(".searchimg");
const tags = document.querySelectorAll(".tagelement");

  // タグをクリックした際の操作
  let times = {};
  tags.forEach(tag => {
    times[tag.id] = 0;
    tag.addEventListener('click', () => {
      if (times[tag.id] % 2 == 0) {
        tag.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      } else {
        tag.style.backgroundColor = 'rgb(158, 250, 255)';
      }
      times[tag.id]++;
    });
  });

  // 検索をかけるtagの取得
  function gettags(times){
    let searchtag=[];
    tags.forEach(tag => {
      if(times[tag.id]% 2!=0){
        searchtag.push(tag.id);
      }
    });
    return searchtag;
  };

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
    //　JSON形式に変換
    config = JSON.stringify(temp);
    alert(config)
    const reslocal= await axios.get('http://localhost:4567/memos',config)
    
  });

