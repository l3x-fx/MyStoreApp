import {bootstrapApplication} from '@angular/platform-browser'
import {provideAnimations} from '@angular/platform-browser/animations'
import {importProvidersFrom} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {
    VERSION as MAT_VERSION,
    MatNativeDateModule,
} from '@angular/material/core'
// import {provideRouterStore, routerReducer} from '@ngrx/router-store'
import {appRoutes} from './app/app.routes'
import {AppComponent} from './app/app.component'
import {provideRouter} from '@angular/router'

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideAnimations(),
        importProvidersFrom(),
    ],
})
