module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd2fc620ae81c7517227d9d2ee1059b70'),
  },
});
