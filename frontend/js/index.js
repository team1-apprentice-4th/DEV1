const searchbuttom=document.querySelector(".searchimg");
const tags = document.querySelectorAll(".tagelement");
const history = document.querySelector(".history");
  

  // タグをクリックした際の操作
  let times = {};
  tags.forEach(tag => {
    times[tag.id] = 0;
    tag.addEventListener('click', () => {
      if (times[tag.id] % 2 == 0) {
        tag.style.backgroundColor = 'rgb(158, 250, 255)';
      } else {
        tag.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
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

    // 前回の検索結果をクリアする
    let memos_container = document.querySelector(".container");
    memos_container.replaceChildren();

    // // 検索ボックスの値を取得
    const searchkey=document.querySelector(".searchkey").value;


    // // 【ローカル検索】
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
        // 技術カテゴリー
        const tech_categories = [];
        if (0 < memo.tech_category.length) {
          memo.tech_category.forEach(category => {
            const tech_category = document.createTextNode(category);
            let a_tech_category = document.createElement('a');
            a_tech_category.classList.add('tech_category');
            a_tech_category.appendChild(tech_category);
            tech_categories.push(a_tech_category);
          })
        }
        // タイトル表示
        const title = document.createTextNode(memo.title_name);
        let p_title = document.createElement('p');
        p_title.appendChild(title);
        // メモごとのクラスとIDを付与
        const div = document.createElement('div');
        div.setAttribute('class', 'memo');
        div.setAttribute('id', memo.memo_id);
        // データ挿入
        div.appendChild(a_posted_at);
        div.appendChild(a_updated_at);
        for(let i = 0; i < tech_categories.length ;i++){
          div.appendChild(tech_categories[i]);
        }
        div.appendChild(p_title);
        memos_array.push(div);
      }
    }

    // ローカルデータの表示
    const container =document.querySelector('.container');
    memos_array.forEach(memo => {
      container.appendChild(memo);
    });

    // ローカルデータの詳細表示
    memos_array.forEach(memo => {
      memo.addEventListener('click', function(e){
        e.preventDefault();
        
        // 背景が暗くなる
        const mask = document.getElementById('mask');
        mask.classList.remove('hidden');

        // 白い画面が出てくる
        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');

        // モーダルウインドウの表示
        memos.forEach(element => {
          const memo_id = Number(memo['id']);
          if (element.memo_id === memo_id) {
            // 投稿日時の表示
            const posted_at = document.createTextNode(element.posted_at.split(' ')[0]);
            let a_posted_at = document.createElement('a');
            a_posted_at.classList.add('post_date');
            const post_stamp = document.createTextNode('投稿');
            a_posted_at.appendChild(posted_at);
            a_posted_at.appendChild(post_stamp);
            // 更新日時の表示
            const updated_at = document.createTextNode(element.last_updated_at.split(' ')[0]);
            let a_updated_at = document.createElement('a');
            a_updated_at.classList.add('update_date');
            const update_stamp = document.createTextNode('更新');
            a_updated_at.appendChild(updated_at);
            a_updated_at.appendChild(update_stamp);
            // 技術カテゴリーの表示
            const tech_categories = [];
            if (0 < element.tech_category.length) {
            element.tech_category.forEach(category => {
                const tech_category = document.createTextNode(category);
                let a_tech_category = document.createElement('a');
                a_tech_category.classList.add('tech_category');
                a_tech_category.appendChild(tech_category);
                tech_categories.push(a_tech_category);
              })
            }
            // タイトルの表示
            const title = document.createTextNode(element.title_name);
            let p_title = document.createElement('p');
            p_title.classList.add('memo_title');
            p_title.appendChild(title);
            // 詳細の表示
            const detail = document.createTextNode(element.detail);
            let p_detail = document.createElement('p');
            p_detail.appendChild(detail);
            // 解決法の表示
            const solution = document.createTextNode(element.solution);
            let p_solution = document.createElement('p');
            p_solution.appendChild(solution);
            // メモごとのクラスとIDを付与
            const div = document.createElement('div');
            div.setAttribute('class', 'modal_memo');
            div.setAttribute('id', memo_id);
            // データ挿入
            div.appendChild(a_posted_at);
            div.appendChild(a_updated_at);
            for(let i = 0; i < tech_categories.length ;i++){
              div.appendChild(tech_categories[i]);
            }
            div.appendChild(p_title);
            div.appendChild(p_detail);
            div.appendChild(p_solution);
            const display = document.querySelector('.display');
            display.appendChild(div);
          }
        })

        // 黒い部分を押すと投稿詳細が閉じる
        mask.addEventListener('click', function(event){
          event.preventDefault();

          const display = document.querySelector('.display');
          display.innerHTML = '';

          const mask = document.getElementById('mask');
          mask.classList.add('hidden');

          const modal = document.getElementById('modal');
          modal.classList.add('hidden');
        })

        // 閉じるボタンを押すと投稿詳細が閉じる
        const close_btn = document.getElementById('close_button');
        close_btn.addEventListener('click', function(event){
          event.preventDefault();

          const display = document.querySelector('.display');
          display.innerHTML = '';

          const mask = document.getElementById('mask');
          mask.classList.add('hidden');

          const modal = document.getElementById('modal');
          modal.classList.add('hidden');

        })

      })
    })


    //【Qiita検索】
    const queryParam = `title:${searchkey} tag:${qiitagettags(times)}`;
    const page = 1;
    const perPage = 20;
    const resqiita = await axios.get(`https://qiita.com/api/v2/items?query=${queryParam}&page=${page}&per_page=${perPage}`);
    console.log(resqiita);
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

