const searchbuttom=document.querySelector(".searchimg");
const tags = document.querySelectorAll(".tagelement");


/*タグをクリックした際の操作*/
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

/*検索ボタンをクリックした際の操作*/
 function createLocal(key){
  const config={
    params:{
      q:key,
      tag:times
    }
  };
 };
  searchbuttom.addEventListener('click',async function(e){
    e.preventDefault();
    // 検索ボックスの値を取得
    const searchkey=document.querySelector(".searchkey").value;
    // ローカルDBに検索に必要なクエリを作成
    createLocal(searchkey);
    const reslocal= await axios.get('フロントエンド作成',config)
  });

