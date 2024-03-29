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
  // 検索をかけるtagの取得【Qiita】
  function qiitagettags(times){
    let qiitasearchtag="";
    tags.forEach(tag => {
      if(times[tag.id]% 2!=0){
        qiitasearchtag+=","+tag.id;
      }
    });
    return qiitasearchtag.substring(1);
  };

//検索ボタンをクリックした後の挙動
  searchbuttom.addEventListener('click',async function(e){
    // ページの更新を防ぐ
    e.preventDefault();
    // 検索ボックスの値を取得
    const searchkey=document.querySelector(".searchkey").value;
    //【ローカル検索】
    // ローカルDBに検索に必要なURLを作成 GETリクエスト
    　 const localURL=`http://localhost:4567/memos?title=${searchkey}&tag=${gettags(times)}`
    // ローカルDBの情報を取得
    const reslocal= await axios.get(localURL);
    // 【ここからは高橋さんの実装】
    const memos = reslocal.data;
    let memos_array = [];
    if( 0 < memos.length) {
      for(const memo of memos) {
        // 投稿日時表示
        const posted_at = document.createTextNode(memo.posted_at.split(' ')[0]);
        let a_posted_at = document.createElement('a');
        const post_stamp = document.createTextNode('投稿');
        a_posted_at.classList.add('post_date');
        a_posted_at.appendChild(posted_at);
        a_posted_at.appendChild(post_stamp);
        // 更新日時表示
        const updated_at = document.createTextNode(memo.last_updated_at.split(' ')[0]);
        let a_updated_at = document.createElement('a');
        const update_stamp = document.createTextNode('更新');
        a_updated_at.classList.add('update_date');
        a_updated_at.appendChild(updated_at);
        a_updated_at.appendChild(update_stamp);
        // タイトル表示
        const title = document.createTextNode(memo.title_name);
        let p_title = document.createElement('p');
        p_title.appendChild(title);
        const div = document.createElement('div');
        div.setAttribute('class', 'memo');
        div.appendChild(a_posted_at);
        div.appendChild(a_updated_at);
        div.appendChild(p_title);
        memos_array.push(div);
      }
    }

    // ローカルデータの表示
    const container =document.querySelector('.container');
    memos_array.forEach(memo => {
      container.appendChild(memo);
    });


    //【Qiita検索】
    const queryParam = `title:${searchkey} tag:${qiitagettags(times)}`;
    const page = 1;
    const perPage = 20;
    alert(queryParam);
    const resqiita = await axios.get(`https://qiita.com/api/v2/items?query=${queryParam}&page=${page}&per_page=${perPage}`);
    
    //　検索結果の表示
    for(let qiitadata of resqiita.data){
      const qiitalist=document.querySelector(".qiitalist");
      const qiitali=document.createElement("li");
      const qiitaa=document.createElement("a");
      const qiitaimg=document.createElement("img");
      const qiitadiv=document.createElement("div");
      const qiitatag=document.createElement("p");

      let qiitatitle = qiitadata.title;
      let qiitaurl = qiitadata.url;
      let qiitauserimg=qiitadata.user.profile_image_url;
      let qiitatags=qiitadata.tags[0].name;

      // 確認
      // console.log(qiitatitle);
      // console.log(qiitaurl);
      // console.log(qiitauserimg);
      // console.log(qiitatags);

      // 構成
      qiitalist.appendChild(qiitali);
      qiitali.appendChild(qiitaa);
      qiitaa.appendChild(qiitaimg);
      qiitaa.appendChild(qiitadiv);
      qiitaa.appendChild(qiitatag);

      // クラスを付与
      qiitali.classList.add("qiitaelement");
      qiitaa.classList.add("qiitaelement_a");
      qiitaimg.classList.add("qiitaelement_a_img");
      qiitadiv.classList.add("qiitaTitle");

     //データ挿入
     qiitaa.href=qiitaurl;
     qiitaa.target="_blank";
     qiitaimg.src=qiitauserimg;
     qiitadiv.textContent=qiitatitle;
    };
 
 });

