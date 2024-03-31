const detail_btn = document.getElementById('detail_button');

// 詳細ボタンを押すと投稿詳細が表示される
detail_btn.addEventListener('click', function(event){
  event.preventDefault();

  // hiddenクラスが外れて投稿詳細が表示される
  const mask = document.getElementById('mask');
  mask.classList.remove('hidden');

  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');

  // 閉じるボタンを押すと投稿詳細が閉じる
  const close_btn = document.getElementById('close_button');
  close_btn.addEventListener('click', function(event){
    event.preventDefault();

    const mask = document.getElementById('mask');
    mask.classList.add('hidden');

    const modal = document.getElementById('modal');
    modal.classList.add('hidden');

  })

  // 黒い部分を押すと投稿詳細が閉じる
  mask.addEventListener('click', function(event){
    event.preventDefault();

    const mask = document.getElementById('mask');
    mask.classList.add('hidden');

    const modal = document.getElementById('modal');
    modal.classList.add('hidden');

  })

})