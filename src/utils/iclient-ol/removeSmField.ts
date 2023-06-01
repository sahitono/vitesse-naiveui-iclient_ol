const SMFIELDS = ["SMAREA", "SMGEOMETRY", "SMID", "SMPERIMETER", "SMUSERID", "USERID", "geometry"] as const

/**
 * This will remove SM default field. useful if you don't need it to be displayed on table.
 */
export function removeSmField(prop: Record<string, string>) {
  return _.omit(prop, SMFIELDS)
}
