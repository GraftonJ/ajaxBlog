document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js');
  getPosts()
  createPost()
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
          <a href="#view" class="collection-item sidebar-title" data-id="${post.id}">${post.title}</a>
          `
        //Insert the blog post titles in the sidebar through DOM
        sidebar.appendChild(sideTitle)

        //Show blog post clicked in left sidebar
        sideTitle.addEventListener('click', (ev) => {
          let contentArea = document.getElementById('content-area')
          contentArea.innerHTML = ''
          let postID = ev.target.getAttribute('data-id')
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

//Create Post
function createPost() {

  //Create the New Post Area on 'Create Post' Click
  const createLink = document.getElementById('create-post')
  createLink.addEventListener('click', (ev) => {
    let contentArea = document.getElementById('content-area')
    contentArea.innerHTML = ''
    let createContent = document.createElement('div')
    createContent.setAttribute('id', 'create-content')
    createContent.innerHTML = `
      <h2>Create a New Post</h2>
      <form id='create-post-form'>
        <input placeholder="New Post Title Goes Here" id="title" type="text" class="validate" name="title">
        <label for="title">Title</label>
        <textarea placeholder="Write your content here. The text area will expand to fit your content."id="textarea1" class="materialize-textarea" name='content'></textarea>
        <br>
        <input class="waves-effect waves-light btn" type="submit" value="Submit" id="submit-form">
      <form>
    `
    contentArea.appendChild(createContent)

    //Handle the form Submission and Post the Content to the db
      let form = document.getElementById('create-post-form')
      form.addEventListener('submit', (ev) => {
        ev.preventDefault()
        // grab all values from the form
        let postData = {}
        let formElements = ev.target.elements

        for (var i = 0; i < formElements.length; i++) {
          let inputName = formElements[i].name
          if (inputName) {
            postData[inputName] = formElements[i].value
          }
        }

        console.log('postData', postData);

        //axios.post that data to the correct backend route
        axios.post('http://localhost:3000/blog_data', postData)
          .then((response) => {
            // document.getElementById("submit-form").disabled = true
            // let success = document.createElement('p')
            // success.innerHTML = `Successfully added ${response.data[0].title}.<a href='movies.html'>See all movies.</a>`
            // form.appendChild(success)
          })
          .catch((error) => {
            console.log(error)
          })
      })
  })
}


const removePost = () => {
  let contentArea = document.getElementById('content-area')
  let post = document.getElementById('post-content')
  if (post) {
    contentArea.removeChild(post)
    console.log('Remove Message Function');
  }
}
