async function getData() {
  const response = await fetch("item.json");
  const data = await response.json();
  return data;
}

async function main() {
  const postsData = await getData();
  let currentPage = 1;
  let rows = 10;

  function displayList(paginationData, rowPerPage, page) {
    const posts = document.querySelector('.posts');
    posts.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = paginationData.slice(start, end);

    paginatedData.forEach((el) => {
      const post = document.createElement("div");
      post.classList.add("post");
      post.innerText = `${el.name}`;
      posts.appendChild(post);
    })
  } 

  function displayPagination(arrData, rowPerPage) {
    const pagination = document.querySelector('.pagination');
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const pagination__list = document.createElement("ul");
    pagination__list.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const button = displayPaginationBtn(i + 1);
      pagination__list.appendChild(button)
    }
    pagination.appendChild(pagination__list)
  } 

  function displayPaginationBtn(page) {
    const button = document.createElement("li");
    button.classList.add('pagination__item')
    button.innerText = page

    if (currentPage == page) button.classList.add('pagination__item--active');

    button.addEventListener('click', () => {
      currentPage = page
      displayList(postsData, rows, currentPage)

      let current_btn = document.querySelector('li.pagination__item--active');
      current_btn.classList.remove('pagination__item--active');

      button.classList.add('pagination__item--active');
    })

    return button;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();