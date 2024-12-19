import { News } from '@prisma/client'

export const news: News[] = [
  {
    id: '9f78a5d8-58f6-4f9b-92a5-7a88e4d8d9d1',
    title: 'Breaking News: Major Event in Tech World',
    content:
      'A significant breakthrough has taken place in the tech industry...',
    thumbnail:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'breaking-news-major-event-tech-world',
    isPublished: true,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    id: 'a54b14e6-0d0d-41c8-a529-7a13b67e39e3',
    title: 'Top 10 Coding Practices',
    content:
      'Here are the top 10 coding practices that every developer should know...',
    thumbnail:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'top-10-coding-practices',
    isPublished: false,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    id: '1cbb5c17-ef0f-4b15-9832-dfe6349f0b3c',
    title: 'AI in Medicine: A New Era',
    content: 'AI applications in medicine are rapidly advancing, offering...',
    thumbnail:
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'ai-in-medicine-new-era',
    isPublished: true,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    id: '2e8b4c0b-48d6-4697-a3a3-8f6d65bc7f28',
    title: 'Climate Change and Technology',
    content: 'As the effects of climate change grow, technology steps in...',
    thumbnail:
      'https://images.unsplash.com/photo-1668097613572-40b7c11c8727?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'climate-change-technology',
    isPublished: false,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    id: '8f56ab7c-89c3-418e-9d8e-9f6b65fd8e9c',
    title: 'Advances in Renewable Energy',
    content: 'Renewable energy technologies are advancing rapidly...',
    thumbnail:
      'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'advances-renewable-energy',
    isPublished: true,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    id: '4c9a3b9d-0d5c-4b4f-a82f-b3c2e6c8a4a5',
    title: 'Space Exploration Milestones',
    content: 'The space exploration industry has reached new heights...',
    thumbnail:
      'https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'space-exploration-milestones',
    isPublished: false,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    id: '7d65a7f6-2d4c-41f9-8f6e-3d7b9e3d9f7a',
    title: 'Understanding Blockchain',
    content:
      'Blockchain technology has gained prominence in various industries...',
    thumbnail:
      'https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'understanding-blockchain',
    isPublished: true,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    id: '3a7c9d6f-4b9a-4f8e-9c3a-6f5d3c8a1e7b',
    title: 'Tech Innovations in Education',
    content: 'Education is being transformed by innovative technologies...',
    thumbnail:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'tech-innovations-education',
    isPublished: false,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    id: 'b4a1e9c7-2d3f-4a6b-a3e7-1e9b7f8c6d7a',
    title: 'Medical Technology Breakthroughs',
    content: 'Breakthroughs in medical technology are paving the way for...',
    thumbnail:
      'https://images.unsplash.com/photo-1514416432279-50fac261c7dd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'medical-technology-breakthroughs',
    isPublished: true,
    publishedAt: new Date('2024-10-01T10:30:00Z'),
    createdAt: new Date('2024-09-30T09:00:00Z'),
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
]

export const featuredNews = {
  id: 'd9c8b7e5-2f3d-4a6b-a1c7-7e9b8f6d4c7a',
  title: 'Future of Quantum Computing',
  content: 'Quantum computing promises to revolutionize the future...',
  thumbnail:
    'https://images.unsplash.com/photo-1568209865332-a15790aed756?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  slug: 'future-quantum-computing',
  isPublished: true,
  publishedAt: new Date('2024-10-01T10:30:00Z'),
  createdAt: new Date('2024-09-30T09:00:00Z'),
  updatedAt: new Date('2024-10-01T10:00:00Z'),
}
