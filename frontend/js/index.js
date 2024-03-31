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

  // 前回の検索結果をクリアする
  let memos_container = document.querySelector(".container");
  memos_container.replaceChildren();

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
          const posted_at = document.createTextNode(element.posted_at.split(' ')[0] + '投稿');
          let div_posted_at = document.createElement('div'); // div要素を使用
          div_posted_at.classList.add('post_date');
          div_posted_at.appendChild(posted_at);

          // 更新日時の表示
          const updated_at = document.createTextNode(element.last_updated_at.split(' ')[0] + '更新');
          let div_updated_at = document.createElement('div'); // div要素を使用
          div_updated_at.classList.add('update_date');
          div_updated_at.appendChild(updated_at);

          // 日付情報を含むコンテナ
          let dateContainer = document.createElement('div');
          dateContainer.classList.add('date_container');
          dateContainer.appendChild(div_posted_at);
          dateContainer.appendChild(div_updated_at);

          // 編集ボタンの追加
          let editButton = document.createElement('div');
          editButton.classList.add('edit_modal');
          editButton.textContent = '編集';

          // 削除ボタンの追加
          let deleteButton = document.createElement('div');
          deleteButton.classList.add('delete_modal');
          deleteButton.textContent = '削除';

          let dataUpdateContainer = document.createElement('div');
          dataUpdateContainer.classList.add('data_update_container');

          // 編集・削除ボタンをdataUpdateContainerに追加
          dataUpdateContainer.appendChild(editButton);
          dataUpdateContainer.appendChild(deleteButton);

          // 上部セクションのコンテナ
          let modalUpperSection = document.createElement('div');
          modalUpperSection.classList.add('modal_upper_section');
          modalUpperSection.appendChild(dateContainer);
          modalUpperSection.appendChild(dataUpdateContainer);

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
          div.setAttribute('id', element.memo_id); // memo_idをelementから取得するように修正

          // データ挿入
          div.appendChild(modalUpperSection); // modalUpperSectionを追加
          div.appendChild(p_title);
          div.appendChild(p_detail);
          div.appendChild(p_solution);

          // モーダルウインドウにメモを追加
          const display = document.querySelector('.display');
          display.appendChild(div);

          // 編集ボタンのクリックイベントリスナー
          editButton.addEventListener('click', function() {
            let inputTitle = document.createElement('input');
            inputTitle.type = 'text';
            inputTitle.value = element.title_name;
            p_title.replaceWith(inputTitle);

            // 詳細の編集
            let inputDetail = document.createElement('textarea'); // 詳細はより長いテキストが予想されるためtextareaを使用
            inputDetail.value = element.detail;
            p_detail.replaceWith(inputDetail);

            // 解決法の編集
            let inputSolution = document.createElement('textarea'); // 解決法も同様にtextareaを使用
            inputSolution.value = element.solution;
            p_solution.replaceWith(inputSolution);

            // 「保存」ボタンを追加して、変更を保存する処理を実装
            let saveButton = document.createElement('button');
            saveButton.textContent = '保存';
            div.appendChild(saveButton);

            // 保存ボタンのクリックイベントリスナー
            saveButton.addEventListener('click', async function() {
              // ローカルDBに検索に必要なクエリを作成
              const temp = {
                "title": inputTitle.value,
                "detail": inputDetail.value,
                "solution": inputSolution.value,
              };
              // // JSON形式に変換
              config = JSON.stringify(temp);

              try {
                // PUTリクエストでデータを送信（URLの末尾にmemo_idを付加）
                console.log(config);
                const response = await axios.put(`http://localhost:4567/memos/${element.memo_id}`, config);

                // 保存が完了したらモーダルを閉じてリストをクリア
                document.getElementById('mask').classList.add('hidden');
                document.getElementById('modal').classList.add('hidden');
                document.querySelector('.display').innerHTML = '';
                document.querySelector('.container').innerHTML = ''; // メモのリストをクリア

                alert('保存完了しました');
              } catch (error) {
                console.error('保存に失敗しました:', error);
                alert('保存に失敗しました');
              }
            });

          });

          // 削除ボタンのクリックイベントリスナー
          deleteButton.addEventListener('click', function() {
            console.log('test')
            // 確認ダイアログの表示
            const isConfirmed = confirm(`本当に${element.title_name}を削除しますか？`);

            if (isConfirmed) {
              // OKがクリックされた場合、APIを実行して削除処理を行う
              axios.delete(`http://localhost:4567/memos/${element.memo_id}`)
                .then(response => {
                  console.log('削除されたデータ:', response.data);
                  alert('削除完了しました');
                  // 削除が完了したらモーダルを閉じてリストをクリア
                  document.getElementById('mask').classList.add('hidden');
                  document.getElementById('modal').classList.add('hidden');
                  document.querySelector('.display').innerHTML = '';
                  document.querySelector('.container').innerHTML = ''; // メモのリストを再読み込みする必要がある
                })
                .catch(error => {
                  console.error('削除に失敗しました:', error);
                  alert('削除に失敗しました');
                });
            } else {
              // キャンセルがクリックされた場合、何もせずに元のモーダル表示を維持する
              // 必要に応じて、特定の処理をここに追加
            }
          });

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
