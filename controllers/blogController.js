const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', {title: 'all', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog details' });
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
        })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_update = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, { new: true })
        .then(result => {
            res.redirect(`/blogs/${id}`);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to update blog');
        })
}

const blog_edit_get = (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
    .then(blog => {
      res.render('blogs/edit', { blog, title: 'Edit Blog' });
    })
    .catch(err => {
      console.log(err);
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

// const searchBlogs = async (req, res) => {
//   const query = req.query.q;
//   try {
//     const blogs = await Blog.find({
//       $or: [
//         { title: { $regex: query, $options: 'i' } },
//         { body: { $regex: query, $options: 'i' } }
//       ]
//     });
//     res.render('blogs/index', {
//       blogs,
//       title: `Search results for "${query}"`,
//       query
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).render('404', { title: 'Error' });
//   }
// };


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_update,
    blog_edit_get,
    // searchBlogs
}