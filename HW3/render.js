const apiUrl = 'http://localhost:3000';

async function loadCategories() {
  const response = await fetch(`${apiUrl}/categories`);
  const categories = await response.json();
  
  const categoryList = document.getElementById('category-list');
  categoryList.innerHTML = '';
  
  categories.forEach((category) => {
    const listItem = document.createElement('li');
    listItem.textContent = category.name;
    listItem.onclick = () => loadPosts(category.id);
    categoryList.appendChild(listItem);
  });
}

async function loadPosts(categoryId) {
  const response = await fetch(`${apiUrl}/categories/${categoryId}/posts`);
  const posts = await response.json();
  
  const postList = document.getElementById('post-list');
  postList.innerHTML = '';
  
  posts.forEach((post) => {
    const listItem = document.createElement('li');
    listItem.textContent = post.title;
    listItem.onclick = () => alert(`Content: ${post.content}`);
    postList.appendChild(listItem);
  });
}

async function initialize() {
  await loadCategories();
}

initialize();
