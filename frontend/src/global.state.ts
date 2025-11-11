import { createPropertySelectors, State } from '@ngxs/store'
import { Mode } from './common/map/map.component'


interface GlobalStateModel {
  showMap: boolean
  showHeader: boolean
  showNavbarSearch: boolean
  viewClass: string
  pageTitle: string
  title?: string;
  subtitle: string
  isFocused: boolean;
  geoSearch: boolean;
  activePlaces: [];
  alerts: [];
  loading: number;
  zoom: number;
  mapMode: Mode;
  scrollPosition: number;
}

@State<GlobalStateModel>({
  name: 'global',
  defaults: {
    showMap: false, // TODO - Make page metadata
    showHeader: false,
    showNavbarSearch: false,
    viewClass: '',
    pageTitle: 'iDAI.gazetteer', // TODO - Make page metadata
    subtitle: '', // TODO - Make page metadata
    isFocused: false,
    geoSearch: false,
    activePlaces: [],
    alerts: [],
    loading: 0,
    mapMode: 'standard',
    zoom: 2,
    scrollPosition: 0
  }
})
export class GlobalState {
  static slices = createPropertySelectors<GlobalStateModel>(GlobalState)
}
