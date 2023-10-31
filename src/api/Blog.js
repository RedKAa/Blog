import axios from "axios";
import request from '../utils/requestServer';
import { getUserInfo } from "../utils/utils";

const URL = import.meta.env.VITE_URL;

const authUser = getUserInfo();

// export const getBlogs = async (p = 1, filters) => {
//   try {
//     //const res = await axios.get(`${URL}/posts?page=${p}`);
//     const res = await axios({
//       url: `${URL}/posts`,
//       method: "GET",
//       params: { page: p, ...filters },
//     });
//     return res;
//   } catch (e) {
//     return e;
//   }
// };



export const getBlogs = (p = 1, filters) => {
  return request.get('/posts', {
    params: {
      page: p,
      ...filters
    },
    useCache: true,
  });
};

// export const getBlog = async (id) => {
//   try {
//     const res = await axios.get(`${URL}/posts/${id}`);
//     return res;
//   } catch (e) {
//     return e;
//   }
// };
export const getBlog = (postId) => {
  return request.get(`/posts`, {
    params: {
      id: postId,
    },
  });
};
// export const allBlogsOfUser = async (id) => {
//   try {
//     const res = await axios.get(`${URL}/posts/user/${id}`);
//     return res;
//   } catch (e) {
//     return e;
//   }
// };
export const allBlogsOfUser = (id) => {
  return request.get(`/posts`, {
    params: {
      authorId: id,
    },
  });
};

// export const getPostBySlug = async (slug) => {
//   try {
//     const res = await axios.get(`${URL}/posts/slug/${slug}`);
//     return res;
//   } catch (e) {
//     return e;
//   }
// };

export const getPostBySlug = (id) => {
  return request.get(`/posts`, {
    params: {
      authorId: id,
    },
  });
};


// export const createBlog = async (data) => {
//   const { token } = JSON.parse(localStorage.getItem("current_user"));
//   try {
//     const res = await axios.post(`${URL}/posts`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res;
//   } catch (e) {
//     return e;
//   }
// };

export const createBlog = (newPost) => {
  return request.post(`/posts`, {
    data: {
      ...newPost,
      authorId:authUser.id
    },
  });
}

// export const updateBlog = async (slug, data) => {
//   const { token } = JSON.parse(localStorage.getItem("current_user"));
//   try {
//     const res = await axios.patch(`${URL}/posts/${slug}`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res;
//   } catch (e) {
//     return e;
//   }
// };

export const updateBlog = (postId, updatePost) => {
  console.log('updatePostById', updatePost);
  return request.put(`/posts/${postId}`, {
    data: {
      ...updatePost
    },
  });
}

// export const RemoveBlog = async (id) => {
//   const { token } = JSON.parse(localStorage.getItem("current_user"));
//   try {
//     const doc = axios.delete(`${URL}/posts/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return doc;
//   } catch (e) {
//     return e;
//   }
// };

export const RemoveBlog = (postId) => {
  return request.delete(`/posts/${postId}`);
}


// export const nbrPostsOfUser = async (id) => {
//   try {
//     const res = await axios.get(`${URL}/posts/nbr-posts-user/` + id);
//     return res;
//   } catch (e) {
//     return e;
//   }
// };


// export const nbrPostsByTag = async (id) => {
//   try {
//     const res = await axios.get(`${URL}/posts/nbr-posts-tag/` + id);
//     return res;
//   } catch (e) {
//     return e;
//   }
// };

export const allBlogByTag = (id) => {
  return request.get(`/posts`, {
    params: {
      tagId: id,
    },
  });
};