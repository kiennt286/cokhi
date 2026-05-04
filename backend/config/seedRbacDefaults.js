import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import { RBAC_PERMISSIONS, RBAC_ROLES } from "./rbac.js";

export const seedRbacDefaults = async () => {
  for (const permission of RBAC_PERMISSIONS) {
    await Permission.updateOne({ code: permission.code }, { $set: permission }, { upsert: true });
  }

  for (const role of RBAC_ROLES) {
    await Role.updateOne({ name: role.name }, { $set: role }, { upsert: true });
  }
};
