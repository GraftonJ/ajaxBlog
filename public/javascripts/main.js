document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js');
  getPosts()
})

function getPosts() {
  axios.get('http://localhost:3000/blog_data')
    .then((response) => {
      response.data.forEach((post) => {
        //Set variable for sidebar parent element
        const sidebar = document.getElementById('sidebar')
        //Create links of blog post titles in the left sidebar
        let sideTitle = document.createElement('a')
        sideTitle.innerHTML = `
          <a href="#!" class="collection-item sidebar-title" data-id="${post.id}">${post.title}</a>
          `
        //Insert the blog post titles in the sidebar through DOM
        sidebar.appendChild(sideTitle)

      //Show blog post clicked in left sidebar
      sideTitle.addEventListener('click', (ev) => {
        removePost()
        let postID = ev.target.getAttribute('data-id')
        console.log(postID);
        let contentArea = document.getElementById('content-area')
        let content = document.createElement('div')
        content.setAttribute('id', 'post-content')
        content.innerHTML = `
          <h2>${post.title}</h2><br>
          <p>${post.content}</p>
        `
        contentArea.appendChild(content)
      })
    })
  })
}
//End of get Posts Function above

const removePost = () => {
    let contentArea = document.getElementById('content-area')
    let post = document.getElementById('post-content')
    if (post) {
      contentArea.removeChild(post)
      console.log('Remove Message Function');
    }
  }
