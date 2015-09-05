var avatarStoreLarge = new FS.Store.Dropbox("avatarsLarge", {
  key: "hnydu0e0jepbqx0", 
  secret: "hjajidnxmuiycxn", 
  token: "C_jQ_bHIVeYAAAAAAADKpBzUSgUttkcbYpwPGNV2w-qdCxaGlwJ1l7Q5hjZFaNnJ",
})

Avatars = new FS.Collection("avatars", {
  stores: [avatarStoreLarge],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
})

Avatars.allow({
  'insert': function () {
    return true;
  },
  'update': function () {
    return true;
  },
  download:function(){
    return true;
  }
});