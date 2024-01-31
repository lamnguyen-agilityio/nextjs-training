export const courseOverview = [
  {
    type: 'single' as const,
    title: 'about course',
    content:
      'Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer ac enim pellentesque, adipiscing metus id, pharetra odio. Donec bibendum nunc sit amet tortor scelerisque luctus et sit amet mauris. Suspendisse felis sem, condimentum ullamcorper est sit amet, molestie mollis nulla. Etiam lorem orci, consequat ac magna quis, facilisis vehicula neque.',
  },
  {
    type: 'multiple' as const,
    title: 'What You’ll Learn',
    content: [
      'Setting up the environment',
      'Advanced HTML Practices',
      'Build a portfolio website',
      'Responsive Designs',
      'Understand HTML Programming',
      'Code HTML',
      'Start building beautiful websites',
    ],
  },
  {
    type: 'single' as const,
    title: 'Here Is Exactly What We Cover In This Course',
    content:
      'Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ',
  },
];

// TODO: Implement helper to covert title, content: string => tsx
export const courseSections = [
  {
    title: (
      <p className="text-sm font-medium text-fill-text-dark">
        Html Introduction
      </p>
    ),
    content: (
      <p className="text-xs text-fill-text-main">
        The primary goal of this quick start guide is to introduce you to Unreal
        Engine 4`s (UE4) development environment. By the end of this guide,
        you`ll know how to set up and develop C++ Projects in UE4. This guide
        shows you how to create a new Unreal Engine project, add a new C++ class
        to it, compile the project, and add an instance of a new class to your
        level. By the time you reach the end of this guide, you`ll be able to
        see your programmed Actor floating above a table in the level
      </p>
    ),
  },
  {
    title: (
      <p className="text-sm font-medium text-fill-text-dark">
        Your First webpage
      </p>
    ),
    content: (
      <p className="text-xs text-fill-text-main">
        The primary goal of this quick start guide is to introduce you to Unreal
        Engine 4`s (UE4) development environment. By the end of this guide,
        you`ll know how to set up and develop C++ Projects in UE4. This guide
        shows you how to create a new Unreal Engine project, add a new C++ class
        to it, compile the project, and add an instance of a new class to your
        level. By the time you reach the end of this guide, you`ll be able to
        see your programmed Actor floating above a table in the level
      </p>
    ),
  },
  {
    title: (
      <p className="text-sm font-medium text-fill-text-dark">
        Some Special Tags
      </p>
    ),
    content: (
      <p className="text-xs text-fill-text-main">
        The primary goal of this quick start guide is to introduce you to Unreal
        Engine 4`s (UE4) development environment. By the end of this guide,
        you`ll know how to set up and develop C++ Projects in UE4. This guide
        shows you how to create a new Unreal Engine project, add a new C++ class
        to it, compile the project, and add an instance of a new class to your
        level. By the time you reach the end of this guide, you`ll be able to
        see your programmed Actor floating above a table in the level
      </p>
    ),
  },
  {
    title: (
      <p className="text-sm font-medium text-fill-text-dark">
        Bootstrap Introduction
      </p>
    ),
    content: (
      <p className="text-xs text-fill-text-main">
        The primary goal of this quick start guide is to introduce you to Unreal
        Engine 4`s (UE4) development environment. By the end of this guide,
        you`ll know how to set up and develop C++ Projects in UE4. This guide
        shows you how to create a new Unreal Engine project, add a new C++ class
        to it, compile the project, and add an instance of a new class to your
        level. By the time you reach the end of this guide, you`ll be able to
        see your programmed Actor floating above a table in the level
      </p>
    ),
  },
];

export const courseSrc = 'https://www.youtube.com/embed/E7wJTI-1dvQ"';
export const personName = 'Wayne Patel';
export const role = 'Instructor';
export const createdAt = new Date('December 8, 2023');
export const notification =
  'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus';
export const lessons = [
  {
    id: '1',
    title: 'Intro',
    totalTime: 12000,
    list: [
      {
        name: 'Intro',
        totalVideo: 1,
        time: 12000,
        isDone: false,
      },
    ],
  },
  {
    id: '2',
    title: 'Sketch 3 Basics',
    totalTime: 12000,
    list: [
      {
        name: 'Introduction',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Understanding Artboards',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Using Colors and Graphic Styles',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Creating Text Styles',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: '10 Quick Tips!',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
    ],
  },
  {
    id: '3',
    title: 'Sketch 3 Basics',
    totalTime: 12000,
    list: [
      {
        name: 'Introduction',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Understanding Artboards',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Using Colors and Graphic Styles',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Creating Text Styles',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: '10 Quick Tips!',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
    ],
  },
  {
    id: '4',
    title: 'Sketch 3 Basics',
    totalTime: 12000,
    list: [
      {
        name: 'Introduction',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Understanding Artboards',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Using Colors and Graphic Styles',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: 'Creating Text Styles',
        time: 1000,
        isDone: false,
        totalVideo: 1,
      },
      {
        name: '10 Quick Tips!',
        time: 1000,
        isDone: true,
        totalVideo: 1,
      },
    ],
  },
];

export const categories = [
  { value: '1', label: 'web' },
  { value: '2', label: 'node' },
];
export const instructors = [
  { value: '1', label: 'lam' },
  { value: '2', label: 'tien' },
];
export const courseData = {
  id: '1',
  name: 'web',
  logo: '/',
  categoryName: 'web',
  description: 'lorem',
  instructorName: 'tien',
  instructorAvatar: '/',
  categoryId: '1',
  instructorId: '2',
};

export const courseDetail = {
  announcement:
    'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus',
  faq: [
    {
      content:
        'The primary goal of this quick start guide is to introduce you to Unreal Engine 4`s (UE4) development environment. By the end of this guide,         you`ll know how to set up and develop C++ Projects in UE4. This guide         shows you how to create a new Unreal Engine project, add a new C++ class to it, compile the project, and add an instance of a new class to your level. By the time you reach the end of this guide, you`ll be able to see your programmed Actor floating above a table in the level',
      title: 'Html Introduction',
    },
    {
      content:
        'The primary goal of this quick start guide is to introduce you to Unreal Engine 4`s (UE4) development environment. By the end of this guide,         you`ll know how to set up and develop C++ Projects in UE4. This guide         shows you how to create a new Unreal Engine project, add a new C++ class to it, compile the project, and add an instance of a new class to your level. By the time you reach the end of this guide, you`ll be able to see your programmed Actor floating above a table in the level',
      title: 'Your First webpage',
    },
    {
      content:
        'The primary goal of this quick start guide is to introduce you to Unreal Engine 4`s (UE4) development environment. By the end of this guide,         you`ll know how to set up and develop C++ Projects in UE4. This guide         shows you how to create a new Unreal Engine project, add a new C++ class to it, compile the project, and add an instance of a new class to your level. By the time you reach the end of this guide, you`ll be able to see your programmed Actor floating above a table in the level',
      title: 'Some Special Tags',
    },
    {
      content:
        'The primary goal of this quick start guide is to introduce you to Unreal Engine 4`s (UE4) development environment. By the end of this guide,         you`ll know how to set up and develop C++ Projects in UE4. This guide         shows you how to create a new Unreal Engine project, add a new C++ class to it, compile the project, and add an instance of a new class to your level. By the time you reach the end of this guide, you`ll be able to see your programmed Actor floating above a table in the level',
      title: 'Bootstrap Introduction',
    },
  ],
  overview: [
    {
      content:
        'Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer ac enim pellentesque, adipiscing metus id, pharetra odio. Donec bibendum nunc sit amet tortor scelerisque luctus et sit amet mauris. Suspendisse felis sem, condimentum ullamcorper est sit amet, molestie mollis nulla. Etiam lorem orci, consequat ac magna quis, facilisis vehicula neque.',
      title: 'About Course',
      type: 'single',
    },
    {
      content: [
        'Setting up the environment',
        'Advanced HTML Practices',
        'Build a portfolio website',
        'Responsive Designs',
        'Code HTML',
        'Understand HTML Programming',
        'Start building beautiful websites',
      ],
      title: 'What You’ll Learn',
      type: 'multiple',
    },
    {
      content:
        'Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer ac enim pellentesque, adipiscing metus id, pharetra odio. Donec bibendum nunc sit amet tortor scelerisque luctus et sit amet mauris. Suspendisse felis sem, condimentum ullamcorper est sit amet, molestie mollis nulla. Etiam lorem orci, consequat ac magna quis, facilisis vehicula neque.',
      title: 'Here Is Exactly What We Cover In This Course',
      type: 'single',
    },
  ],
  src: 'https://www.youtube.com/embed/E7wJTI-1dvQ',
};
