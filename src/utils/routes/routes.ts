const routes = {
  home: {
    path: '/',
    public: true,
  },
  notFound404: {
    path: '*',
    public: true,
  },
  features: {
    path: '/features',
    public: false,
  },
  appPlayer: {
    path: '/app-player',
    public: false,
  },
  // Select items from top user artists, tracks
  topItems: {
    path: '/top',
    public: false,
  },
  // Search items for new playlist
  searchItems: {
    path: '/search',
    public: false,
  },
  // Select items for existing playlist
  existingPlaylists: {
    path: '/existing',
    public: false,
  },
  savedTracks: {
    path: '/saved-tracks',
    public: false,
  },
  userPlaylists: {
    path: '/playlists',
    public: false,
  },
};

export default routes;
