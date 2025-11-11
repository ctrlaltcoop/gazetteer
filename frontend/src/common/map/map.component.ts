import { Component, effect, ElementRef, inject, input, signal, viewChild } from "@angular/core"
import { Router } from "@angular/router"
import Leaflet, { FeatureGroup, LeafletMouseEvent, Map } from "leaflet"
import { Paths } from "../../router"
import { MapIcons } from "./map-icons"

export declare interface Place {
  mapType: 'polygonAndMarker' | 'markerChildInvisible' | 'markerChild' | 'polygonParent' | 'mainPolygon',
  prefLocation?: {
    /** Lng, Lat ?? */
    coordinates: [number, number],
    shape: null | [number,number][][][]
  },
  gazId: string
}

export declare type Mode = 'standard'

@Component({
  selector: 'gz-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  places = input<Place[]>()
  highlight = input<{id: string} | undefined>()
  height = input<string>("100%")
  mode = input<Mode>('standard')

  private readonly _mapElement = viewChild.required<ElementRef<HTMLDivElement>>('map')
  private readonly _map = signal<Map | undefined>(undefined)
  private readonly _markersAndShapesLayer = signal <FeatureGroup<unknown> | undefined>(undefined)
  private readonly _router = inject(Router)

  constructor() {
    effect(() => {
      const map = Leaflet.map(this._mapElement().nativeElement).fitWorld()
      Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 2,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map)
      this._map.set(map)
      this._markersAndShapesLayer.set(Leaflet.featureGroup([]).addTo(map))
    })
    effect(() => {
      const map = this._map()
      const markersAndShapesLayer = this._markersAndShapesLayer()
      const places = this.places()

      if (!map || !markersAndShapesLayer)
        return

      markersAndShapesLayer.clearLayers()
      for (const place of places ?? []) {
        if (place.prefLocation) {
          if (place.prefLocation.coordinates && place.mapType != "polygonParent" && place.mapType != "mainPolygon"
            && (place.prefLocation.shape == null || place.mapType == "polygonAndMarker") && place.mapType !== "markerChildInvisible") {
            const icon = place.mapType === "markerChild" ? MapIcons.childIcon : MapIcons.defaultIcon
            markersAndShapesLayer.addLayer(Leaflet.marker(
              [place.prefLocation.coordinates[1], place.prefLocation.coordinates[0]],
              // @ts-expect-error gazId is manually added prop
              {icon, gazId: place.gazId}
            ))
          }

          if (place.prefLocation.shape && place.mapType !== "markerChildInvisible") {
            const shape = place.prefLocation.shape
            const shapeCoordinates = []

            for (let j = 0; j < shape.length; j++) {
              for (let k = 0; k < shape[j].length; k++) {
                const shapePolygonCoordinates = []
                for (let l = 0; l < shape[j][k].length; l++)
                  shapePolygonCoordinates[l] = Leaflet.latLng(shape[j][k][l][1], shape[j][k][l][0])
                shapeCoordinates.push(shapePolygonCoordinates)
              }
            }

            let className = "gazShape"
            if (place["mapType"] == "markerChild")
              className += " highlight"
            else if (place["mapType"] == "polygonParent")
              className += " parent"

            // @ts-expect-error gazId is manually added prop
            const polygon = Leaflet.polygon(shapeCoordinates, { gazId: place.gazId, className: className }).on('click', e => this._markerClick(e))
            markersAndShapesLayer.addLayer(polygon)
          }
        }
      }

      if (markersAndShapesLayer.getLayers().length > 0) {
        map.fitBounds(markersAndShapesLayer.getBounds())
      } else {
        map.fitWorld()
        map.setZoom(2)
      }
    })
    effect(() => {
      const highlight = this.highlight()
      const markersAndShapeLayer = this._markersAndShapesLayer()

      if (!markersAndShapeLayer)
        return

      for (const layer of markersAndShapeLayer.getLayers()) {
        // TODO - Type errors - Override type declaration from Leafet
        // @ts-expect-error gazId is custom property
        if (highlight && layer.options.gazId === highlight.id) {
          // @ts-expect-error _icon is hidden property
          if (layer._icon) {
          // @ts-expect-error _icon is hidden property
            layer._icon.children[0].classList.add("highlight")
          } else {
          // @ts-expect-error _path is hidden property
            layer._path.classList.add("highlight")
          }
        } else {
          // @ts-expect-error _icon is hidden property
          if (layer._icon) {
          // @ts-expect-error _icon is hidden property
            layer._icon.children[0].classList.remove("highlight")
          } else {
          // @ts-expect-error _path is hidden property
            layer._path.classList.remove("highlight")
          }
        }
      }
    })
  }

  private _markerClick(event: LeafletMouseEvent) {
    this._router.navigate([Paths.Show, event.sourceTarget.options.gazId])
  }
}
