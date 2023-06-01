import type { GetFeaturesBySQLParameters, serviceResult } from "@supermap/iclient-ol"
import { FeatureService } from "@supermap/iclient-ol"

/**
 * Wrap iServer getBySql with Promise to escape callback hell
 * @param url iServer base url
 * @param sqlParam GetFeaturesBySQLParameters
 */
export const getFeaturesBySQL = (
  url: string,
  sqlParam: GetFeaturesBySQLParameters
): Promise<Required<serviceResult["result"]>> =>
  new Promise((resolve, reject) => {
    new FeatureService(url).getFeaturesBySQL(sqlParam, ({ result, error, type }) => {
      if (type !== "processCompleted") {
        reject(error)
      } else {
        resolve(result!)
      }
    })
  })
