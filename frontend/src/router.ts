import { Component } from "@angular/core"
import { provideRouter, withHashLocation } from "@angular/router"

export const Paths = {
  Search: "search",
  ExtendedSearch: "extended-search",
  Thesaurus: "thesaurus",
  Show: "show",
  Edit: "edit",
  Create: "create",
  Merge: "merge",
  ChangeHistory: "change-history",
  About: "about",
  Help: "help",
  Home: "",
} as const

const withIdParam = (path: string) => path + "/:id"

@Component({ template: "Stub" })
class Stub {}
export const provideGazetteerRouter = () =>
  provideRouter(
    [
      {
        path: Paths.Search,
        loadComponent: () => import("./search"),
        // TODO SearchCtrl partials/search.html
      },
      {
        path: Paths.ExtendedSearch,
        component: Stub,
        // TODO ExtendedSearchCtrl partials/extendedSearch.html
      },
      {
        path: Paths.Thesaurus,
        component: Stub,

        // TODO ThesaurusCtrl partials/thesaurus.html
      },
      {
        path: withIdParam(Paths.Show),
        component: Stub,

        // TODO partials/show.html PlaceCtrl
      },
      {
        path: withIdParam(Paths.Edit),
        component: Stub,

        // TODO partials/edit.html PlaceCtrl
      },
      {
        path: Paths.Create,
        component: Stub,

        // TODO partials/create.html CreateCtrl
      },
      {
        path: withIdParam(Paths.Merge),
        component: Stub,

        // TODO partials/merge.html MergeCtrl
      },
      {
        path: withIdParam(Paths.ChangeHistory),
        component: Stub,

        // TODO partials/changeHistory.html PlaceCtrl
      },
      {
        path: Paths.About,
        component: Stub,

        // TODO partials/about.html AboutCtrl
      },
      {
        path: Paths.Help,
        component: Stub,

        // TODO partials/help.html HelpCtrl
      },
      {
        path: Paths.Home,
        loadComponent: () => import("./home"),
        // HomeCtrl
        // partials/home.html
      },
      {
        path: "**",
        redirectTo: Paths.Home,
      },
    ],
    withHashLocation(),
  )

// TODO: Original Code has... is this necessary?

// "$locationProvider",
// function ($locationProvider) {
//   $locationProvider.hashPrefix("!");
// },
