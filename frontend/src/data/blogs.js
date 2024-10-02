const blogs = [
  {
    _id: '1',
    title: 'Understanding React Hooks',
    slug: 'understanding-react-hooks',
    author: 'John Doe',
    date: '2024-08-25T00:00:00Z',
    content: 'React Hooks are a way to use state and other React features without writing a class...',
    excerpt: 'Learn how to manage state in React using hooks.',
    categories: ['React', 'JavaScript'],
    tags: ['hooks', 'react', 'frontend'],
    featuredImage: 'https://images.unsplash.com/photo-1573497019410-577b90f28e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MjF8MHwxfGFsbHwxfHx8fHx8fHwxNjU4MzM2MDM3&ixlib=rb-1.2.1&q=80&w=600', // Online image URL
    readingTime: 5,
    views: 10,
    likes: 0,
    comments: [],
    status: 'published',
  },
  {
    _id: '2',
    title: 'A Guide to Node.js',
    slug: 'guide-to-nodejs',
    author: 'Jane Smith',
    date: '2024-09-01T00:00:00Z',
    content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine...',
    excerpt: 'Discover the basics of Node.js and how it works.',
    categories: ['Node.js', 'JavaScript'],
    tags: ['node', 'backend', 'javascript'],
    featuredImage: 'https://images.unsplash.com/photo-1587323995135-33e4cd8b246b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MjF8MHwxfGFsbHwxfHx8fHx8fHwxNjU4MzM2MDM3&ixlib=rb-1.2.1&q=80&w=600', // Online image URL
    readingTime: 6,
    views: 20,
    likes: 0,
    comments: [],
    status: 'published',
  },
  {
    _id: '3',
    title: 'CSS Flexbox Explained',
    slug: 'css-flexbox-explained',
    author: 'Emily Johnson',
    date: '2024-09-10T00:00:00Z',
    content: 'Flexbox is a one-dimensional layout method for laying out items in a row or column...',
    excerpt: 'An introduction to CSS Flexbox and its properties.',
    categories: ['CSS', 'Web Design'],
    tags: ['flexbox', 'css', 'frontend'],
    featuredImage: 'https://images.unsplash.com/photo-1512332108547-333e748b5b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MjF8MHwxfGFsbHwxfHx8fHx8fHwxNjU4MzM2MDM3&ixlib=rb-1.2.1&q=80&w=600', // Online image URL
    readingTime: 4,
    views: 15,
    likes: 0,
    comments: [],
    status: 'published',
  },
  // Add more blog objects as needed
];

export default blogs;
