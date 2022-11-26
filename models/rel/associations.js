module.exports = associations = (models) => {
  // one to many relationship between users and posts
  // with users having many posts and posts belonging to a single user
  models.users.hasMany(models.posts, {
    foreignKey: { name: 'author_id' },
    as: 'userPosts'
  });
  models.posts.belongsTo(models.users, { 
    as: 'postAuthor',
    foreignKey: 'author_id'
  });

  // one to many relationship between users and comments
  // with users having many comments and comments belonging to a single user
  models.users.hasMany(models.comments, {
    foreignKey: 'user_id',
    as: 'userComments'
  });
  models.comments.belongsTo(models.users, {
    foreignKey: 'user_id',
    as: 'commentAuthor'
  });

  // one to many relationship between groups and posts
  // with groups having many posts and posts belonging to a single group
  models.posts.belongsTo(models.groups, {
    foreignKey: 'parent_id',
    as: 'parentGroup'
  });
  models.groups.hasMany(models.posts, {
    foreignKey: 'parent_id',
    as: 'groupPosts',
  });

  // one to many relationship between posts and comments
  // with posts having many comments and comments belonging to a single post
  models.posts.hasMany(models.comments, {
    foreignKey: 'post_id',
    as: 'postComments'
  });
  models.comments.belongsTo(models.posts, {
    foreignKey: 'post_id',
    as: 'parentPost'
  });

  // many to many relationship between groups and users
  // with groups having many users and users being in many groups
  models.groups.belongsToMany(models.users, {
    through: models.group_membership,
    foreignKey: 'group_id',
    as: 'members'
  });
  models.users.belongsToMany(models.groups, {
    through: models.group_membership,
    foreignKey: 'user_id',
    as: 'groups'
  });

  // many to many relationship between users
  // with users being frinds with many users 
  // and those users having many friends
  models.users.belongsToMany(models.users, {
    through: models.friends,
    as: 'friends_i_added',
    foreignKey: 'sender_id'
  });
  models.users.belongsToMany(models.users, {
    through: models.friends,
    as: 'friends_added_me',
    foreignKey: 'receiver_id'
  });

  models.users.belongsToMany(models.users, {
    through: models.friend_requests,
    as: 'sent_requests',
    foreignKey: 'sender_id'
  });
  models.users.belongsToMany(models.users, {
    through: models.friend_requests,
    as: 'recived_requests',
    foreignKey: 'receiver_id'
  });
}