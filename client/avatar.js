var avatarStoreLarge = new FS.Store.Dropbox("avatarsLarge");

Avatars = new FS.Collection("avatars", {
  stores: [avatarStoreLarge],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
})