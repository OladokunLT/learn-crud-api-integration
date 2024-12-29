const BASE_API_URL = "https://jsonplaceholder.typicode.com";
const postContainer = document.querySelector(".post-container");
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch(`${BASE_API_URL}/posts`);
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const posts = await response.json();
  console.log(posts);

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.id = `post-${post.id}`;

    postCard.innerHTML = `
    <p class="post-id">${post.id}</p>
        <h2 class="post-title" id="postTitle">${post.title}</h2>
        <p class="post-body" id="postBody">${post.body}</p>
        <div class="post-btn-group" id="postBtnGroup">
          <button
            class="btn btn-primary"
            id="editBtn"
            onclick="editPost(${post.id})"
          >
            Edit
          </button>
          <button
            class="btn btn-danger"
            id="deleteBtn"
            onclick="deletePost(${post.id})"
          >
            Delete
          </button>
        </div>
    `;
    postContainer.appendChild(postCard);
  });
});

async function deletePost(postId) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );
  if (confirmDelete == false) return;
  try {
    const response = await fetch(`${BASE_API_URL}/posts/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert(`post-${postId} deleted successfully`);
      document.getElementById(`post-${postId}`).remove();
    } else {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error(error);
  }
}

document
  .getElementById("createPostForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("newPostTitle").value;
    const body = document.getElementById("newPostBody").value;

    try {
      const response = await fetch(`${BASE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, userId: 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to create new post");
      }
      const newPost = await response.json();
      alert("new post created successfully");
    } catch (error) {
      console.error(error);
    }
  });

async function editPost(postId) {
  const postTitle = prompt("enter post title");
  const postBody = prompt("enter post body");

  try {
    const response = await fetch(`${BASE_API_URL}/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: 1,
        id: postId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit post");
    }
    const updatedPost = await response.json();
    alert("post updated successfully");
    console.log(updatedPost);
  } catch (error) {
    console.error(error);
  }
}
