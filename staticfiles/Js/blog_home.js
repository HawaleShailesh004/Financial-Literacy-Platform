document.addEventListener('DOMContentLoaded', async function () {
    const blogContainer = document.getElementById('blog-container');

    try {
        const response = await fetch('/blog/api/blogs/');
        const blogs = await response.json();

        blogs.forEach((blog, index) => {
            // Check if blog.image exists and is not empty, otherwise use defaultBlogImage
            const imageSrc = blog.image || defaultBlogImage;
            const blogEl = document.createElement('div');
            blogEl.className = 'blog-post';
            blogEl.innerHTML = `
                <img src="${imageSrc}" alt="Image of ${blog.title}" class="blog-image">
                <div class="blog-content">
                    <h2 class="blog-title">${blog.title}</h2>
                    <p class="blog-description">${blog.description}</p>
                </div>
            `;

            blogEl.addEventListener('click', function() {
             
                // +1 to make the index 1-based
                // Redirect or perform another action here
                window.location.href = '/blog/blog/' + (index+1);
// Example of redirection
            });
            blogContainer.appendChild(blogEl);
        });
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
    }
});
