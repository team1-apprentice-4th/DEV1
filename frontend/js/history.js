async function gethistory(){ 
  
    // 前回の検索結果をクリアする
    let memos_container = document.querySelector(".container");
    memos_container.replaceChildren();
    // 【ローカル検索】
    
    // ローカルDBに検索に必要なURLを作成 GETリクエスト
    const historyURL=`http://localhost:4567/history`
    
    
    // ローカルDBの情報を取得
    const reslocal= await axios.get(historyURL);
    console.log(reslocal);
   
    //【ここからは高橋さんの実装】
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
        // メモごとのクラスとIDを付与
        const div = document.createElement('div');
        div.setAttribute('class', 'memo');
        div.setAttribute('id', memo.memo_id);
        // データ挿入
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
    });
    
}

gethistory()
   
