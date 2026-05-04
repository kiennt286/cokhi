export const RBAC_PERMISSIONS = [
  { code: "products.read", description: "View products" },
  { code: "products.write", description: "Create and update products" },
  { code: "posts.read", description: "View posts" },
  { code: "posts.write", description: "Create and update posts" },
  { code: "users.manage", description: "Manage users and roles" },
];

export const RBAC_ROLES = [
  {
    name: "super_admin",
    permissions: RBAC_PERMISSIONS.map((item) => item.code),
  },
  {
    name: "editor",
    permissions: ["products.read", "products.write", "posts.read", "posts.write"],
  },
];
