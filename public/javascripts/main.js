document.addEventListener('DOMContentLoaded', () => {
  console.log('Connected to Main.js');
  getPosts()
  createPost()
  homepage()
})

function getPosts() {
  //Set variable for sidebar parent element
  const sidebar = document.getElementById('sidebar')
  //Clear out the sidebar if there is already content there
  sidebar.innerHTML = ''
  //get posts from db
  axios.get('http://localhost:3000/blog_data')
    .then((response) => {
      response.data.forEach((post) => {
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
          <a class="waves-effect waves-light btn" id='delete-button'>Delete</a>
          <a class="waves-effect waves-light btn" id='edit-button'>Edit</a>
        `
          contentArea.appendChild(content)
          //Get the Delete and Edit butotns and assing the post id attribute
          let deleteButton = document.getElementById('delete-button')
          deleteButton.setAttribute('data-id', post.id)
          let editButton = document.getElementById('edit-button')
          editButton.setAttribute('data-id', post.id)
          //Delete Post
          deleteButton.addEventListener('click', (ev) => {
            axios.delete(`http://localhost:3000/blog_data/${postID}`)
              .then((response) => {
                contentArea.innerHTML = ''
                let success = document.createElement('p')
                success.innerHTML = `Successfully deleted the post "${post.title}".`
                contentArea.appendChild(success)
                getPosts()
              })
              .catch((err) => {
                //console.log(err)
              })
          })
          //End of delete post above
          //Edit post
          editButton.addEventListener('click', (ev) => {
            contentArea.innerHTML = ''
            //Create a form with the fields prefield
            let editForm = document.createElement('div')
            editForm.innerHTML = `
              <h2>Edit "${post.title}"</h2>
              <form id='create-post-form'>
                <input id="edit-title" type="text" class="validate" name="title"
                <label for="title">Title</label>
                <textarea placeholder="Write your content here. The text area will expand to fit your content."id="content" class="materialize-textarea" name='content'></textarea>
                <br>
                <input class="waves-effect waves-light btn" type="submit" value="Submit" id="submit-form">
              <form>
            `
            editForm.setAttribute('id', 'edit-form')
            //Append to page
            contentArea.appendChild(editForm)
            //pre-fill with values
            let editTitle = document.getElementById('edit-title')
            editTitle.setAttribute('value', post.title)
            let content = document.getElementById('content')
            content.innerText = post.content
            //On submit, use the patch route to update the content
            let form = document.getElementById('edit-form')
            form.addEventListener('submit', (ev) => {
              ev.preventDefault()
              // grab all values from the form
              let postData = {}
              let formElements = ev.target.elements
              for (var i = 0; i < formElements.length; i++) {
                let inputName = formElements[i].name
                console.log('INPUT NAME>>>>', inputName);
                if (inputName) {
                  postData[inputName] = formElements[i].value
                  console.log('form value>>>', formElements[i].value);
                }
              }
              console.log('postData', postData);
              // axios.patch that data to the correct backend route
              axios.patch(`http://localhost:3000/blog_data/${postID}`, postData)
                .then((response) => {
                  contentArea.innerHTML = ''
                  let success = document.createElement('p')
                  success.innerHTML = `Successfully edited "${response.data[0].title}"`
                  contentArea.appendChild(success)
                  getPosts()
                })
                .catch((error) => {
                  console.log(error)
                })
            })
            //End of submit event listener above
          })
          //End of edit post above
        })
        //End of show post above
      })
      //End of For Each function above
    })
  //End of .the
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
          contentArea.innerHTML = ''
          let success = document.createElement('p')
          success.innerHTML = `Successfully added ${response.data[0].title}.`
          contentArea.appendChild(success)
          getPosts()
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })
}

function homepage() {
  let homeButton = document.getElementById('page-title')
  homeButton.addEventListener('click', (ev) => {
    let contentArea = document.getElementById('content-area')
    contentArea.innerHTML = ''
    let homeContent = document.createElement('div')
    homeContent.innerHTML = `
      <h2>The Law Offices of Bob Loblaw</h2>
      <p>Read Bob Loblaw's Law Blog by clicking Law Blog blog post from the left.<p>
    `
    contentArea.appendChild(homeContent)
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
