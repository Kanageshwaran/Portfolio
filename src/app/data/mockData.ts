export interface Course {
  id: string;
  name: string;
  description: string;
  tools: string[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  courses: Course[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  githubLink: string;
}

export const subjects: Subject[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    description: 'Programming, algorithms, and software development',
    icon: '💻',
    courses: [
      {
        id: 'cs101',
        name: 'CS 101: Introduction to Programming',
        description: 'Fundamentals of programming using Python',
        tools: ['Python', 'Git', 'VS Code'],
      },
      {
        id: 'cs201',
        name: 'CS 201: Data Structures',
        description: 'Arrays, linked lists, trees, and graphs',
        tools: ['Java', 'JUnit', 'IntelliJ'],
      },
      {
        id: 'cs301',
        name: 'CS 301: Algorithms',
        description: 'Algorithm design and analysis techniques',
        tools: ['C++', 'CMake', 'GDB'],
      },
    ],
  },
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Calculus, linear algebra, and statistics',
    icon: '📐',
    courses: [
      {
        id: 'math201',
        name: 'MATH 201: Calculus II',
        description: 'Integration techniques and applications',
        tools: ['MATLAB', 'Wolfram Alpha'],
      },
      {
        id: 'math301',
        name: 'MATH 301: Linear Algebra',
        description: 'Vector spaces and matrix theory',
        tools: ['Python', 'NumPy', 'Jupyter'],
      },
    ],
  },
  {
    id: 'english',
    name: 'English',
    description: 'Literature analysis and academic writing',
    icon: '📚',
    courses: [
      {
        id: 'eng201',
        name: 'ENG 201: Literary Analysis',
        description: 'Critical reading and interpretation',
        tools: ['MLA Format', 'Google Docs'],
      },
      {
        id: 'eng301',
        name: 'ENG 301: Academic Writing',
        description: 'Research and argumentation skills',
        tools: ['APA Format', 'Zotero', 'Grammarly'],
      },
    ],
  },
];

export const courseAssignments: Record<string, Assignment[]> = {
  cs101: [
    {
      id: 'a1',
      title: 'Assignment 1: Hello World Program',
      description: 'Create a basic Python program that prints "Hello World" and demonstrates variable usage',
      githubLink: 'https://github.com/example/cs101-assignment1',
    },
    {
      id: 'a2',
      title: 'Assignment 2: Calculator Application',
      description: 'Build a command-line calculator with basic arithmetic operations',
      githubLink: 'https://github.com/example/cs101-assignment2',
    },
    {
      id: 'a3',
      title: 'Assignment 3: Text File Parser',
      description: 'Develop a program to read and analyze text files',
      githubLink: 'https://github.com/example/cs101-assignment3',
    },
  ],
  cs201: [
    {
      id: 'a1',
      title: 'Assignment 1: Linked List Implementation',
      description: 'Implement a singly linked list with add, remove, and search operations',
      githubLink: 'https://github.com/example/cs201-assignment1',
    },
    {
      id: 'a2',
      title: 'Assignment 2: Binary Search Tree',
      description: 'Create a BST with insertion, deletion, and traversal methods',
      githubLink: 'https://github.com/example/cs201-assignment2',
    },
  ],
  cs301: [
    {
      id: 'a1',
      title: 'Assignment 1: Sorting Algorithms',
      description: 'Implement and compare quicksort, mergesort, and heapsort',
      githubLink: 'https://github.com/example/cs301-assignment1',
    },
  ],
  math201: [
    {
      id: 'a1',
      title: 'Problem Set 1: Integration Techniques',
      description: 'Solve integration problems using substitution and integration by parts',
      githubLink: 'https://github.com/example/math201-problemset1',
    },
  ],
  math301: [
    {
      id: 'a1',
      title: 'Problem Set 1: Matrix Operations',
      description: 'Perform matrix multiplication and compute eigenvalues',
      githubLink: 'https://github.com/example/math301-problemset1',
    },
  ],
  eng201: [
    {
      id: 'a1',
      title: 'Essay 1: Shakespearean Tragedy',
      description: 'Analyze the themes of power and ambition in Macbeth',
      githubLink: 'https://github.com/example/eng201-essay1',
    },
  ],
  eng301: [
    {
      id: 'a1',
      title: 'Research Paper: Climate Change Communication',
      description: 'Examine rhetorical strategies in climate change discourse',
      githubLink: 'https://github.com/example/eng301-research',
    },
  ],
};

export const activities = [
  {
    id: '1',
    title: 'Research Assistant',
    description: 'Machine Learning lab, working on neural network optimization',
  },
  {
    id: '2',
    title: 'Teaching Assistant',
    description: 'CS 101, helping students with programming fundamentals',
  },
  {
    id: '3',
    title: 'Hackathon Organizer',
    description: 'Annual university hackathon with 200+ participants',
  },
  {
    id: '4',
    title: 'Student Government',
    description: 'Technology committee member, improving campus IT infrastructure',
  },
];
