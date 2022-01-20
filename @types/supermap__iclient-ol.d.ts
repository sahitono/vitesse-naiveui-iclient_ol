declare module "@supermap/iclient-ol" {
  import type TileGrid from "ol/tilegrid"
  import Observable from "ol/Observable"
  import TileImage from "ol/source/TileImage"
  import type olFeature from "ol/Feature"
  import type { Extent } from "ol/extent"
  import type { Options as TileImageOptions } from "ol/source/TileImage"

  export class LonLat {
    constructor(lon?: number, lat?: number, location?: number[])
    lon: number
    lat: number
    static fromArray(array: number[]): LonLat
    static fromString(str: string): LonLat
    add(lon: number, lat: number): LonLat
    clone(): LonLat
    destroy(): void
    equals(ll: LonLat): boolean
    toShortString(): string
    toString(): string
    wrapDateLine(maxExtent: Bounds): LonLat
  }
  export class Size {
    constructor(w: number, h: number)
    w: number
    h: number
    clone(): Size
    destroy(): void
    equals(s: Size): boolean
    toString(): string
  }

  export class Pixel {
    constructor(x: number, y: number, mode: string)
    static Mode: string // TODO: change this into enum
    x: number
    y: number
    add(x: number, y: number): Pixel
    clone(): Pixel
    destroy(): void
    distanceTo(px: Pixel): number
    equals(p: Pixel): boolean
    toString(): string
  }

  export class Bounds {
    constructor(left?: number, bottom?: number, right?: number, top?: number, array?: number[])
    left: number
    bottom: number
    right: number
    top: number
    array: number[]
    centerLonlat: LonLat
    name: string
    value: string
    static fromArray(bbox: number[], reverseAxisOrder: boolean): Bounds
    static fromSize(size: Size): Bounds
    static fromString(str: string, reverseAxisOrder: boolean): Bounds
    static oppositeQuadrant(quadrant: string): string
    add(x: number, y: number): Bounds
    clone(): Bounds
    contains(x: number, y: number, inclusive: boolean): boolean
    containsBounds(bounds: Bounds, partial: boolean, inclusive: boolean): boolean
    containsLonLat(ll: LonLat, options?: { inclusive?: boolean; woldBounds?: Bounds }): boolean
    containsPixel(p: Pixel): boolean
    destroy(): void
    determineQuadrant(lonlat: LonLat): string
    equals(bounds: Bounds): boolean
    extend(object: LonLat | Bounds): void
  }

  class Geometry {
    bounds: Bounds
    id: string
    // eslint-disable-next-line no-use-before-define
    parent: Geometry
    SRID: number
    calculateBounds(): void
    clearBounds(): void
    clone(): Geometry
    destroy(): void
    extendBounds(newBounds: Bounds): Bounds
    getArea(): number
    getBounds(): Bounds
    getVertices(nodes: boolean): number[]
    setBounds(bounds: Bounds): void
  }
  export namespace Geometry {
    export class Point extends Geometry {
      constructor(x: number, y: number, id: string)
      x: number
      y: number
      tag: string
      toShortString(): string
    }
    export class Collection extends Geometry {
      constructor(components: Array<Geometry>)
      components: Array<Geometry>
      componentTypes: string[]
      addComponent(component: Geometry, index: number): boolean
      addComponents(components: Array<Geometry>): boolean
      getComponentsString(): string
      removeComponent(component: Geometry): boolean
      removeComponents(components: Array<Geometry>): boolean
    }

    export class MultiPoint extends Collection {
      constructor(components: Array<Point>)
      addPoint(point: Point, index: number): void
      removePoint(point: Point): void
    }

    export class Curve extends MultiPoint {
      constructor(components: Array<Point>)
    }

    export class LineString extends Curve {
      constructor(points: number[], id: string)
      static calculateCircle(points: Array<Point>): Array<Point>
      static createLineEPS(points: Array<Point>): Array<Point>
      getSortedSegments(): Array<Record<string, any>>
    }

    export class LinearRing extends LineString {
      constructor(points: Array<Point>)
    }
    export class Polygon extends Collection {
      constructor(components: LinearRing)
    }

    export class GeoText extends Geometry {
      constructor(x: number, y: number, text: string)
      x: number
      y: number
      text: string
      getCentroid(): Point
      getLabelPxBoundsByLabel(
        locationPixel: Record<string, number>,
        labelWidth: string,
        labelHeight: string,
        style: Record<string, any>
      ): Bounds

      getLabelPxBoundsByText(locationPixel: Record<string, number>, style: Record<string, any>): Bounds
      getLabelPxSize(style: Record<string, any>): Record<string, any>
      getTextCount(text: string): Record<string, any>
    }
    export class MultiLineString extends Collection {
      constructor(components: Array<LineString>)
    }
    export class MultiPolygon extends Collection {
      constructor(components: Array<Polygon>)
    }
    export class Rectangle extends Geometry {
      constructor(x: number, y: number, width: number, height: number)
      x: number
      y: number
      width: number
      height: number
    }
  }

  export class Layer {
    constructor(name: string, options: Record<string, any>)
  }

  class Feature {
    constructor(layer: Layer, lonlat: LonLat, data: Record<string, any>)
    data: Record<string, any>
    id: string
    layer: Layer
    lonlat: LonLat
  }
  export namespace Feature {
    export class Vector {
      constructor(geometry: Geometry, attributes: Record<string, any>, style: Record<string, any>)
      geometry: Geometry
      attributesObject: Record<string, any>
      style: Record<string, any>
      fid: string
      bounds: Bounds
      id: string
      lonlat: Lonlat
      state: string
      url: string
      toState(state: string): void
    }
  }

  export enum JoinType {
    INNERJOIN = "INNERJOIN",
    LEFTJOIN = "LEFTJOIN"
  }

  interface JoinItemOptions {
    foreignTableName: string
    joinFilter: string
    JoinType: JoinType
  }

  export enum EngineType {
    IMAGEPLUGINS = "IMAGEPLUGINS",
    OGC = "OGC",
    ORACLEPLUS = "ORACLEPLUS",
    SDBPLUS = "SDBPLUS",
    SQLPLUS = "SQLPLUS",
    UDB = "UDB"
  }

  interface DatasourceConnectionInfoOptions {
    alias: string
    dataBase: string
    connect?: boolean
    driver?: string
    engineType?: EngineType | string
    exclusive?: string
    OpenLinkTable?: boolean
    password?: string
    readOnly?: boolean
    user?: string
  }
  export class DatasourceConnectionInfo implements DatasourceConnectionInfoOptions {
    alias: string
    dataBase: string
    connect?: boolean
    driver?: string
    engineType?: EngineType | string
    exclusive?: string
    OpenLinkTable?: boolean
    password?: string
    readOnly?: boolean
    user?: string
    constructor(options: DatasourceConnectionInfoOptions)

    destroy(): void
  }

  export class JoinItem {
    constructor(options: JoinItemOptions)
  }

  interface LinkItemOptions {
    datasourceConnectionInfo: DatasourceConnectionInfo
    foreignKeys: string[]
    foreignTable: string[]
    linkFields: string[]
    linkFilter: string
    name: string
    primaryKeys: string[]
  }

  export class LinkItem implements LinkItemOptions {
    datasourceConnectionInfo: DatasourceConnectionInfo
    foreignKeys: string[]
    foreignTable: string[]
    linkFields: string[]
    linkFilter: string
    name: string
    primaryKeys: string[]
    constructor(options: LinkItemOptions)
    destroy(): void
  }

  interface FilterParameterOptions {
    attributeFilter: string
    name: string
    joinItems?: JoinItem[]
    linkItems?: LinkItem[]
    ids?: Array<string>
    orderBy?: string
    grooupBy?: string
    fields?: Array<string>
  }

  export class FilterParameter implements FilterParameterOptions {
    attributeFilter: string
    name: string
    joinItems: JoinItem[]
    linkItems: LinkItem[]
    ids: Array<string>
    orderBy: string
    grooupBy: string
    fields: Array<string>
    constructor(options: FilterParameterOptions)
    destroy(): void
  }

  interface TileSuperMapRestOptions extends TileImageOptions {
    url: string
    serverType?: any
    redirect?: boolean
    transparent?: boolean
    cacheEnabled?: boolean
    prjCoordSys?: Record<string, number>
    layersID?: string
    clipRegionEnabled?: boolean
    clipRegion?: Geometry
    overlapDisplayedOptions?: any
    tileversion?: string
    tileProxy?: string
    format?: string
  }

  export class TileSuperMapRest extends TileImage {
    constructor(options: TileSuperMapRestOptions)
    static createTileGrid(
      extent: number,
      maxZoom: number,
      minZoom: number,
      tileSize: number,
      origin: number
    ): void

    static optionsFromMapJSON(url: string, mapJSONObj: Record<string, any>): void
    changeTilesVersion(): void
    createLayerUrl(): void
    getALlRequestParams(): void
    getFullRequestUrl(): void
  }

  export enum QueryOption {
    ATTRIBUTE = "ATTRIBUTE",
    ATTRIBUTEANDGEOMETRY = "ATTRIBUTEANDGEOMETRY",
    GEOMETRY = "GEOMETRY"
  }
  export enum GeometryType {
    LINE = "LINE",
    LINEM = "LINEM",
    POINT = "POINT",
    REGION = "REGION",
    POINTEPS = "POINTEPS",
    LINEEPS = "LINEEPS",
    REGIONEPS = "REGIONEPS",
    ELLIPSE = "ELLIPSE",
    CIRCLE = "CIRCLE",
    TEXT = "TEXT",
    RECTANGLE = "RECTANGLE",
    UNKNOWN = "UNKNOWN"
  }

  export enum SpatialQueryMode {
    CONTAIN = "CONTAIN",
    CROSS = "CROSS",
    DISJOINT = "DISJOINT",
    INTERSECT = "INTERSECT",
    NONE = "NONE",
    OVERLAP = "OVERLAP",
    TOUCH = "TOUCH",
    WITHIN = "WITHIN"
  }

  export enum ServerType {
    ISERVER = "ISERVER",
    IPORTAL = "IPORTAL",
    ONLINE = "ONLINE"
  }

  interface ServiceBaseOptions {
    proxy?: string
    serverType?: ServerType
    withCredentials?: boolean
    crossOrigin?: boolean
    headers?: Record<string, any>
  }

  export class ServiceBase extends Observable {
    constructor(url: string, options?: ServiceBaseOptions)
  }

  interface QueryParametersOption {
    queryParams: Array<FilterParameter>
    customParams?: string
    queryOption?: QueryOption
    prjCoordSys?: Record<string, any>
    expectCount?: number
    networkType?: GeometryType
    returnCustomResult?: boolean
    startRecord?: number
    holdTime?: number
    returnFeatureWithFieldCaption?: boolean
  }

  export class QueryParameters {
    constructor(options: QueryParametersOption)
    queryParams: Array<FilterParameter>
    customParams?: string
    queryOption?: QueryOption
    prjCoordSys?: Record<string, any>
    expectCount?: number
    networkType?: GeometryType
    returnCustomResult?: boolean
    startRecord?: number
    holdTime?: number
    returnFeatureWithFieldCaption?: boolean
    destroy(): void
  }

  interface QueryByGeometryParametersOptions extends QueryParametersOption {
    geometry: Record<string, any>
    returnContent?: boolean
  }
  export class QueryByGeometryParameters extends QueryParameters {
    constructor(options: QueryByGeometryParametersOptions, spatialQueryMode?: SpatialQueryMode)
    geometry: Record<string, any>
    returnContent?: boolean
    SpatialQueryMode?: SpatialQueryMode
  }

  interface QueryByBoundsParametersOptions extends QueryParametersOption {
    bounds: Bounds | Extent
    returnContent?: boolean
  }

  export class QueryByBoundsParameters extends QueryParameters {
    constructor(options: QueryByBoundsParametersOptions)
    bounds: Bounds | Extent
    returnContent?: boolean
  }

  export interface QueryByDistanceParametersOptions extends QueryParametersOption {
    geometry: Record<string, any>
    distance?: number
    isNearest?: boolean
  }
  export class QueryByDistanceParameters extends QueryParameters {
    constructor(options: QueryByDistanceParametersOptions)
    geometry: Record<string, any>
    distance?: number
    isNearest?: boolean
  }

  export interface QueryBySQLParametersOptions extends QueryParametersOption {
    queryParams: Array<FilterParameter>
  }
  export class QueryBySQLParameters extends QueryParameters {
    constructor(options: QueryBySQLParametersOptions)
    queryParams: Array<FilterParameter>
  }

  export enum DataFormat {
    GEOJSON = "GEOJSON",
    ISERVER = "ISERVER"
  }

  export interface serviceResult {
    result?: Record<string, any>
    object: Record<string, any>
    type: string
    element: Record<string, any>
  }
  export function RequestCallback(serviceResult: serviceResult): void

  export class QueryService extends ServiceBase {
    queryByBounds(
      params: QueryByBoundsParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void

    queryByDistance(
      params: QueryByDistanceParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void

    queryByGeometry(
      params: QueryByGeometryParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void

    queryBySQL(
      params: QueryBySQLParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void

    destroy(): void
  }

  export interface GetFeaturesParametersBaseOptions {
    datasetNames: string[]
    returnContent?: boolean
    fromIndex?: number
    toIndex?: number
    maxFeatures?: number
  }
  export class GetFeaturesParametersBase {
    constructor(options: GetFeaturesParametersBaseOptions)
    datasetNames: string[]
    returnContent: boolean
    fromIndex: number
    toIndex: number
    aggregations: Record<string, any>
    returnCountOnly: boolean
    maxFeatures: number
    destroy(): void
  }

  export interface GetFeaturesBySQLParametersOptions extends GetFeaturesParametersBaseOptions {
    queryParameter: FilterParameter
  }
  export class GetFeaturesBySQLParameters {
    constructor(options: GetFeaturesBySQLParametersOptions)
  }

  export enum EditType {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
  }
  export interface EditFeaturesParametersOptions {
    features: Array<Record<string, any>> | Array<olFeature> | Array<Feature.Vector>
    dataSetName: string
    dataSourceName: string
    returnContent?: boolean
    editType?: EditType
    IDs?: Array<string | number>
  }
  export class EditFeaturesParameters {
    constructor(options: EditFeaturesParametersOptions)
    dataSetName: string
    dataSourceName: string
    editType: EditType
    features: Array<Record<string, any>> | Array<olFeature> | Array<Feature.Vector>
    IDs: Array<string | number>
    isUseBatch: boolean
    returnContent: boolean
    destroy(): void
    toJsonParameters(params: EditFeaturesParameters): Record<string, any>
  }

  export class FeatureService extends ServiceBase {
    getFeaturesBySQL(
      params: GetFeaturesBySQLParameters,
      callback: typeof RequestCallback,
      resultFormat?: DataFormat
    ): void

    editFeatures(params: EditFeaturesParameters, callback: typeof RequestCallback): void
  }
}
