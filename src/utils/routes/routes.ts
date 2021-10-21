const routes = {
  home: {
    path: '/',
    public: true,
  },
  notFound404: {
    path: '*',
    public: true,
  },
  app: {
    path: '/app',
    public: false,
  },
  // Select hints from top user artists, tracks and genres
  hintsTop: {
    path: '/hints/top',
    public: false,
  },
  // Search hints for new playlist
  hintsSearch: {
    path: '/hints/search',
    public: false,
  },
  // Select Hints for existing playlist
  hintsExisting: {
    path: '/hints/existing',
    public: false,
  },
};

export default routes;
