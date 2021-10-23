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
  // Select entities from top user artists, tracks and genres
  entitiesTop: {
    path: '/entities/top',
    public: false,
  },
  // Search entities for new playlist
  entitiesSearch: {
    path: '/entities/search',
    public: false,
  },
  // Select entities for existing playlist
  entitiesExisting: {
    path: '/entities/existing',
    public: false,
  },
};

export default routes;
