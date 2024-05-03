import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { APP_ROUTES } from './app.routes'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { SharedModule } from './shared/shared.module'
import { GlobalErrorInterceptor } from './services/global-error-handler.interceptor'

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: GlobalErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
